import { useForm } from "@inertiajs/inertia-react";

const IssueButton = ({ issueID, bookName, userName, hideContainer }) => {
  const { patch, processing } = useForm({
    actionType: "issue",
  });

  const handleClick = () => {
    patch(`/updateIssue/${issueID}`, {
      onBefore: () =>
        confirm(`Will you issue the "${bookName}" book to ${userName}`),

      onSuccess: () => {
        hideContainer();
      },
    });
  };

  return (
    <button onClick={handleClick} disabled={processing}>
      Issue
    </button>
  );
};

export default IssueButton;
