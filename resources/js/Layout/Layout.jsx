import "../../css/layout.css";
import "../Components/Navbar";
import NavBar from "../Components/Navbar";
import Message from "../Components/Message";

const Layout = ({ children }) => {
  const currentUrl = window.location.href;
  const welcomePage = import.meta.env.VITE_APP_URL;

  return (
    <div
      className={
        currentUrl === welcomePage
          ? "welcome-page-background-image"
          : "default-background-image"
      }
    >
      <NavBar />
      <Message />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
