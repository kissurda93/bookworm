import { useForm } from "@inertiajs/inertia-react";

const ReturnButton = ({ issueID, bookName, userName, hideContainer }) => {
  const { patch, processing } = useForm({
    actionType: "return",
  });

  const handleClick = () => {
    patch(`/updateIssue/${issueID}`, {
      onBefore: () =>
        confirm(`${userName} is returned the "${bookName}" book?`),

      onSuccess: () => {
        hideContainer();
      },
    });
  };

  return (
    <button disabled={processing} onClick={handleClick}>
      Return
    </button>
  );
};

export default ReturnButton;
