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
      Delete
    </button>
  );
};

export default DeleteBookButton;
