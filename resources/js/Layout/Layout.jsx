import "../../css/layout.css";
import "../Components/Navbar";
import NavBar from "../Components/Navbar";
import Message from "../Components/Message";
import { usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const currentPath = window.location.pathname;
  const [showMessage, setShowMessage] = useState(false);
  const { flash } = usePage().props;

  const hideMessage = () => setShowMessage(() => false);

  useEffect(() => {
    if (!showMessage && flash.message) {
      setShowMessage(() => true);
    }
  }, [flash.message]);

  return (
    <div
      onClick={() => hideMessage()}
      className={
        currentPath === "/"
          ? "welcome-page-background-image"
          : "default-background-image"
      }
    >
      <NavBar />
      {showMessage && <Message message={flash.message} />}
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
