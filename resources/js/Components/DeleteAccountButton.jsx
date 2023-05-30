import { useForm } from "@inertiajs/inertia-react";

const DeleteAccountButton = ({ id }) => {
  const { processing, delete: destroy } = useForm({});

  const handleDelete = () => {
    destroy(`/delete-user/${id}`, {
      onBefore: () => confirm("Are you sure you want to delete yout account?"),
    });
  };

  return (
    <button onClick={handleDelete} disabled={processing}>
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
