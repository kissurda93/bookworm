import "../../css/issueController.css";
import { timeStampToDateString } from "../helpers";

const IssueController = ({ issue, hideContainer }) => {
  return (
    <div
      className="issue-controller"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        <p>Title: {issue.book.title}</p>
        <p>Author: {issue.book.author}</p>
        <p>Request date: {timeStampToDateString(issue.created_at)}</p>
        <p>Expire date: {timeStampToDateString(issue.expire_date)}</p>
        {issue.issued_at != null && (
          <p>Issued at: {timeStampToDateString(issue.issued_at)}</p>
        )}
        {issue.returned_at != null && (
          <p>Returned at: {timeStampToDateString(issue.returned_at)}</p>
        )}
        {issue.fine != null && <p className="fine">Fine: {issue.fine}</p>}
      </div>
      <div className="issue-button-container">
        {issue.issued_at == null && <button autoFocus>Issue</button>}
        {issue.issued_at != null && issue.returned_at == null && (
          <button autoFocus>Return</button>
        )}
      </div>
    </div>
  );
};

export default IssueController;
