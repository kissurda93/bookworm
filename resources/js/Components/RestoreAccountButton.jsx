import { useForm } from "@inertiajs/inertia-react";

const RestoreAccountButton = ({ id, name }) => {
  const { get, processing } = useForm({});

  const handleClick = () => {
    get(`/restore/${id}`, {
      onBefore: () =>
        confirm(`Are you sure you want to restore ${name}'s account?`),
    });
  };

  return (
    <button onClick={handleClick} disabled={processing}>
      Restore account
    </button>
  );
};

export default RestoreAccountButton;
