import "../../css/navbar.css";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";

const Navbar = () => {
  const { url, props } = usePage();
  const { auth } = props;

  return (
    <header>
      <nav>
        <ul>
          <li className="logo">
            <Link href="/">
              <img src="/images/bookworm_logo.png" width={50} height={50} />
            </Link>
          </li>
          <li>
            <Link
              href="/books"
              className={url === "/books" ? "active-navlink" : ""}
            >
              Books
            </Link>
          </li>
          {auth.user?.is_librarian == 1 && (
            <>
              <li>
                <Link
                  href="/users"
                  className={url === "/users" ? "active-navlink" : ""}
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/issues"
                  className={url === "/issues" ? "active-navlink" : ""}
                >
                  Requests
                </Link>
              </li>
            </>
          )}
          {!auth.user && (
            <li>
              <Link
                href="/register-form"
                className={url === "/register-form" ? "active-navlink" : ""}
              >
                Registration
              </Link>
            </li>
          )}
          {auth.user && (
            <li className="profile-link">
              <Link
                href="/profile"
                className={url === "/profile" ? "active-navlink" : ""}
              >
                <span className="material-symbols-outlined">
                  settings_account_box
                </span>
                <span className="tooltip">Profile</span>
              </Link>
            </li>
          )}
          {auth.user && (
            <li>
              <Link href="/logout">
                <span className="material-symbols-outlined">logout</span>
                <span className="tooltip">Logout</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
