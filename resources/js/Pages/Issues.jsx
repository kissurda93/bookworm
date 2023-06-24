import "../../css/issues.css";
import Layout from "../Layout/Layout";
import SearchBar from "../Components/SearchBar";
import Paginater from "../Components/Paginater";
import { timeStampToDateString } from "../helpers";
import IssueController from "../Components/IssueController";
import { useState } from "react";

const Issues = ({ issues }) => {
  const [issueController, setIssueController] = useState({
    issue: null,
    user: null,
    show: false,
  });

  const showModal = (issue, user) => {
    setIssueController(() => ({
      issue,
      user,
      show: true,
    }));
  };

  const hideModal = () => {
    setIssueController(() => ({
      show: false,
    }));
  };

  return (
    <Layout>
      <SearchBar
        link={"/issues/"}
        placeholder="Search by book title..."
        hideForm={hideModal}
      />
      {issueController.show && (
        <div className="overlay" onClick={hideModal}>
          <IssueController
            user={issueController.user}
            issue={issueController.issue}
            hideContainer={hideModal}
          />
        </div>
      )}
      <div className="issue-table-container">
        <h2>Requests</h2>
        <table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Book title</th>
              <th>Book author</th>
              <th>Request date</th>
              <th>Expire date</th>
              <th>Issued at</th>
              <th>Returned at</th>
              <th>Fine</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.data.length == 0 ? (
              <tr>
                <td>No request found</td>
              </tr>
            ) : (
              issues.data.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.user.name}</td>
                  <td>{issue.book.title}</td>
                  <td>{issue.book.author}</td>
                  <td>{timeStampToDateString(issue.created_at)}</td>
                  <td>{timeStampToDateString(issue.expire_date)}</td>
                  <td>{timeStampToDateString(issue.issued_at)}</td>
                  <td>{timeStampToDateString(issue.returned_at)}</td>
                  <td>{issue.fine}</td>
                  <td>
                    {issue.returned_at == null && (
                      <span
                        className="material-symbols-outlined"
                        tabIndex={0}
                        onFocus={hideModal}
                        onClick={() => {
                          showModal(issue, issue.user);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            showModal(issue, issue.user);
                          }
                        }}
                      >
                        branding_watermark
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Paginater page_links={issues.links} />
    </Layout>
  );
};

export default Issues;
