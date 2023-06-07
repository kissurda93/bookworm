import "../../css/users.css";
import Layout from "../Layout/Layout";
import Paginater from "../Components/Paginater";
import SearchBar from "../Components/SearchBar";
import { Link } from "@inertiajs/inertia-react";
import { timeStampToDateString } from "../helpers";

const Users = ({ users }) => {
  return (
    <Layout>
      <SearchBar link={"/users/"} placeholder="Search by name or email..." />
      <div className="user-table-container">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Email verified at</th>
              <th>Role</th>
              <th>Deleted at</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.data.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{timeStampToDateString(user.email_verified_at)}</td>
                  <td>{user.is_librarian == 1 ? "Librarian" : "User"}</td>
                  <td>{timeStampToDateString(user.deleted_at)}</td>
                  <td>
                    <Link href={`/user/${user.id}`}>
                      <span className="material-symbols-outlined">
                        tab_move
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Paginater page_links={users.links} />
    </Layout>
  );
};

export default Users;
