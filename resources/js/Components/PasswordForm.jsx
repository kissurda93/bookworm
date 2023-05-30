import "../../css/passwordForm.css";
import { useForm, usePage } from "@inertiajs/inertia-react";

const PasswordForm = ({ hideForm }) => {
  const { user } = usePage().props.auth;
  const { data, setData, patch, errors, processing } = useForm({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    patch(`/update-password/${user.id}`, {
      onSuccess: hideForm(),
    });
  };

  return (
    <div
      className="password-form-container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Old Password
          <input
            type="password"
            value={data.old_password}
            onChange={(e) => setData("old_password", e.target.value)}
            autoFocus
          />
          {errors.old_password && (
            <p className="input-error">{errors.old_password}</p>
          )}
        </label>
        <label>
          Password
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
          />
          {errors.password && <p className="input-error">{errors.password}</p>}
        </label>
        <label>
          Password confirmation
          <input
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
          />
          {errors.password_confirmation && (
            <p className="input-error">{errors.password_confirmation}</p>
          )}
        </label>
        <button type="submit" disabled={processing}>
          Update
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
