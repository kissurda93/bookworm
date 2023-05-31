import "../../css/forgottenPassEmailForm.css";
import { useForm } from "@inertiajs/inertia-react";

const ForgottenPassEmailForm = ({ hideForm }) => {
  const { data, setData, errors, processing, post } = useForm({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/forgotten-password-create-link", {
      onSuccess: () => {
        hideForm();
      },
    });
  };

  return (
    <form
      className="email-form"
      onSubmit={handleSubmit}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <p>
        We will send you a link to your email address, which will direct you to
        change your password
      </p>
      <label>
        Email
        <input
          type="email"
          value={data.email}
          onChange={(e) => {
            setData("email", e.target.value);
          }}
          required
          autoFocus
        />
        {errors.email && <p className="input-error">{errors.email}</p>}
      </label>
      <button type="submit" disabled={processing}>
        Send Link
      </button>
    </form>
  );
};

export default ForgottenPassEmailForm;
