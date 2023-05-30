import "../../css/layout.css";
import "../Components/Navbar";
import NavBar from "../Components/Navbar";
import Message from "../Components/Message";
import { useEffect } from "react";

const Layout = ({ children }) => {
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

  return (
    <>
      <NavBar />
      <Message />
      <div className="content">{children}</div>
    </>
  );
};

export default Layout;
