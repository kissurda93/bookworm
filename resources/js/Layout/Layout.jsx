import "../../css/layout.css";
import "../Components/Navbar";
import NavBar from "../Components/Navbar";
import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { flash } = usePage().props;

  const backgroundSwitcher = () => {
    const currentUrl = window.location.href;
    const welcomePage = import.meta.env.VITE_APP_URL;

    if (currentUrl === welcomePage) {
      document.body.style.background =
        'url("/images/background.jpg") var(--color5) no-repeat';
      document.body.style.backgroundBlendMode = "luminosity";
      document.body.style.backgroundSize = "cover";
    } else {
      document.body.style.background =
        'url("/images/book_background_small.jpg") var(--color5) repeat-y';
      document.body.style.backgroundBlendMode = "luminosity";
    }
  };

  useEffect(() => {
    backgroundSwitcher();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      flash.message = null;
    }, 500);
  }, [flash.message]);

  return (
    <>
      <NavBar />
      {flash.message && (
        <div className={flash.message.error ? "bad-message" : "good-message"}>
          <p>{flash.message.text}</p>
        </div>
      )}
      <div className="content">{children}</div>
    </>
  );
};

export default Layout;
