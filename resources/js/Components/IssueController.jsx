import "../../css/issueController.css";
import { timeStampToDateString } from "../helpers";
import IssueButton from "./IssueButton";
import ReturnButton from "./ReturnButton";

const IssueController = ({ issue, user, hideContainer }) => {
  return (
    <div
      className="issue-controller"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        <h3>Request #{issue.id}</h3>
        <p>User name: {user.name}</p>
        <p>Book title: {issue.book.title}</p>
        <p>Book author: {issue.book.author}</p>
        <p>Request date: {timeStampToDateString(issue.created_at)}</p>
        <p>Expire date: {timeStampToDateString(issue.expire_date)}</p>
        {issue.issued_at != null && (
          <p>Issued at: {timeStampToDateString(issue.issued_at)}</p>
        )}
        {issue.returned_at != null && (
          <p>Returned at: {timeStampToDateString(issue.returned_at)}</p>
        )}
        {issue.fine != null && <p className="fine">Fine: {issue.fine}$</p>}
      </div>
      <div className="issue-button-container">
        {issue.issued_at == null && (
          <IssueButton
            issueID={issue.id}
            bookName={issue.book.title}
            userName={user.name}
            hideContainer={hideContainer}
          />
        )}
        {issue.issued_at != null && issue.returned_at == null && (
          <ReturnButton
            issueID={issue.id}
            bookName={issue.book.title}
            userName={user.name}
            hideContainer={hideContainer}
          />
        )}
      </div>
    </div>
  );
};

export default IssueController;
