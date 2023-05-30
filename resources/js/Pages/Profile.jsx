import "../../css/profile.css";
import Layout from "../Layout/Layout";
import { usePage, useForm } from "@inertiajs/inertia-react";

const Profile = () => {
  const { user } = usePage().props.auth;
  const { data, setData, patch, errors, processing } = useForm({
    name: user.name,
    email: user.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name != user.name || data.email != user.email) {
      patch(`/update-user/${user.id}`);
    }
  };

  const issueList = () =>
    user.issues.map((issue) => (
      <li className="issue">
        <p>Issue date: {issue.issue_date}</p>
        <p>Expire date: {issue.expire_date}</p>
        <p>Fine: {issue.fine}</p>
        <p>Issued: {issue.issued}</p>
        <p>Retrieved: {issue.retrieved}</p>
      </li>
    ));

  return (
    <Layout>
      <div className="profile-container">
        <form onSubmit={handleSubmit} className="user-update-form">
          <h2>Personal info</h2>
          <label>
            Name
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && <p className="input-error">{errors.name}</p>}
          </label>
          <label>
            Email
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            {errors.email && <p className="input-error">{errors.email}</p>}
          </label>
          <button type="submit" disabled={processing}>
            Update
          </button>
        </form>
        <div className="issue-container">
          <h2>Issues</h2>
          {user.issues.length !== 0 ? (
            <ul>{issueList()}</ul>
          ) : (
            <p className="no-issue">No issue found!</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
