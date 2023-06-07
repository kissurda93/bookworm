import "../../css/navbar.css";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";

const Navbar = () => {
  const { auth } = usePage().props;

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <img src="/images/bookworm_logo.png" width={60} height={60} />
            </Link>
          </li>
          <li>
            <Link href="/books">Books</Link>
          </li>
          {auth.user?.is_librarian == 1 && (
            <>
              <li>
                <Link href="/users">Users</Link>
              </li>
              <li>
                <Link href="/issues">Requests</Link>
              </li>
            </>
          )}
          {!auth.user && (
            <li>
              <Link href="/register-form">Registration</Link>
            </li>
          )}
          {auth.user && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {auth.user && (
            <li>
              <Link href="/logout">Logout</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
