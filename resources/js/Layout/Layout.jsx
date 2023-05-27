import "../../css/layout.css";
import "../Components/Navbar";
import NavBar from "../Components/Navbar";
import { usePage } from "@inertiajs/inertia-react";

const Layout = ({ children }) => {
  const { flash } = usePage().props;

  return (
    <>
      <NavBar />
      {flash.message && <div className="message">{flash.message}</div>}
      <div className="content">{children}</div>
    </>
  );
};

export default Layout;
