import { useForm, usePage } from "@inertiajs/inertia-react";

const DeleteBookButton = ({ id }) => {
  const { auth } = usePage().props;
  const { delete: destroy, processing } = useForm({});

  const handleClick = () => {
    if (auth.user.is_librarian == 1) {
      destroy(`/delete-book/${id}`, {
        onBefore: () => confirm("Are you sure you want to delete the book?"),
      });
    }
  };

  return (
    <button disabled={processing} onClick={handleClick}>
      <span className="material-symbols-outlined">delete</span>
      <span className="tooltip">Delete</span>
    </button>
  );
};

export default DeleteBookButton;
