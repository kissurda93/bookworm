import "../../css/userDetails.css";
import Layout from "../Layout/Layout";
import { timeStampToDateString } from "../helpers";
import IssueController from "../Components/IssueController";
import { useState } from "react";

const UserDetails = ({ user }) => {
  const [issueController, setIssueController] = useState({
    issue: {},
    show: false,
  });

  const showIssueController = (issue) => {
    setIssueController(() => ({
      issue,
      show: true,
    }));
  };

  const hideIssueController = () => {
    setIssueController(() => ({
      show: false,
    }));
  };

  const handleStyleChange = (issue) => {
    if (issue.retrieved != null) {
      return "retrieved";
    }

    if (issue.fine != null) {
      return "expired";
    }
  };

  return (
    <Layout>
      <div className="user-details-container">
        <h2>Details of {user.name}</h2>
        <div>
          <div
            className="user-details"
            tabIndex={0}
            onFocus={hideIssueController}
          >
            <h3>User details</h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>
              Email verified at:{" "}
              {user.email_verified_at == null
                ? "Not verified"
                : timeStampToDateString(user.email_verified_at)}
            </p>
            <p>Role: {user.is_librarian == 1 ? "Librarian" : "User"}</p>
            <p>Account created at: {timeStampToDateString(user.created_at)}</p>
            {user.deleted_at != null && (
              <p>
                Account deleted at: {timeStampToDateString(user.deleted_at)}
              </p>
            )}
          </div>
          {issueController.show && (
            <div className="overlay" onClick={hideIssueController}>
              <IssueController
                issue={issueController.issue}
                hideContainer={hideIssueController}
              />
            </div>
          )}
          <div className="issues">
            <h3>User requests</h3>
            <ul>
              {user.issues.length == 0
                ? "No request found"
                : user.issues.map((issue) => (
                    <li
                      key={issue.id}
                      className={handleStyleChange(issue)}
                      tabIndex={0}
                      onClick={() => {
                        showIssueController(issue);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          showIssueController(issue);
                        }
                      }}
                      onFocus={hideIssueController}
                    >
                      <p>Title: {issue.book.title}</p>
                      <p>Author: {issue.book.author}</p>
                      <p>
                        Request date: {timeStampToDateString(issue.created_at)}
                      </p>
                      <p>
                        Expire date: {timeStampToDateString(issue.expire_date)}
                      </p>
                      {issue.issued_at != null && (
                        <p>Issued: {timeStampToDateString(issue.issued_at)}$</p>
                      )}
                      {issue.returned_at != null && (
                        <p>
                          Returned at:{" "}
                          {timeStampToDateString(issue.returned_at)}$
                        </p>
                      )}
                      {issue.fine != null && <p>Fine: {issue.fine}$</p>}
                    </li>
                  ))}
            </ul>
          </div>
          <div className="legend">
            <h4>Legend</h4>
            <ul>
              <li>Active request</li>
              <li>Expired request</li>
              <li>Retrieved request</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetails;
