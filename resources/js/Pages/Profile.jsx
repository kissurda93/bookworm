import "../../css/profile.css";
import Layout from "../Layout/Layout";
import PasswordForm from "../Components/PasswordForm";
import DeleteAccountButton from "../Components/DeleteAccountButton";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { useState } from "react";

const Profile = () => {
  const { user } = usePage().props.auth;
  const { data, setData, patch, errors, processing } = useForm({
    name: user.name,
    email: user.email,
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name != user.name || data.email != user.email) {
      patch(`/update-user/${user.id}`);
    }
  };

  const renderIssueList = () =>
    user.issues.map((issue) => {
      if (issue.retrieved != null) {
        return;
      }

      return (
        <li
          className={issue.fine != null ? "issue expired-issue" : "issue"}
          key={issue.id}
        >
          <p>Book title: {issue.book.title}</p>
          <p>Request date: {issue.request_date}</p>
          <p>Expire date: {issue.expire_date}</p>
          <p>Issued: {issue.issued != null ? issue.issued : "Not yet"}</p>
          {issue.fine != null && <p>Fine: {issue.fine} $</p>}
        </li>
      );
    });

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
              autoFocus
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
          <button
            type="submit"
            disabled={processing}
            onFocus={() => {
              setShowPasswordForm(false);
            }}
          >
            Update
          </button>
        </form>
        {showPasswordForm && (
          <div className="overlay" onClick={() => setShowPasswordForm(false)}>
            <PasswordForm hideForm={() => setShowPasswordForm(false)} />
          </div>
        )}
        <div className="profile-buttons-container">
          <button
            onClick={() => {
              setShowPasswordForm(true);
            }}
            onFocus={() => {
              setShowPasswordForm(false);
            }}
          >
            Change Password
          </button>

          <DeleteAccountButton id={user.id} />
        </div>
        <div className="issue-container">
          <h2>Issues</h2>
          {user.issues.length !== 0 ? (
            <ul>{renderIssueList()}</ul>
          ) : (
            <p className="no-issue">No issue found!</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
