import "../../css/newPasswordForm.css";
import { useForm } from "@inertiajs/inertia-react";
import Layout from "../Layout/Layout";

const NewPasswordForm = ({ token }) => {
  const { data, setData, patch, errors, processing } = useForm({
    password: "",
    password_confirmation: "",
    new_password_token: token,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data.token);
    if (data.new_password_token) {
      patch("/set-new-password");
    }
  };

  return (
    <Layout>
      {token && (
        <div className="new-password-form-container">
          <form onSubmit={handleSubmit}>
            <h3>Set your new password</h3>
            <label>
              Password
              <input
                type="password"
                value={data.password}
                onChange={(e) => {
                  setData("password", e.target.value);
                }}
                autoFocus
                required
              />
              {errors.password && (
                <p className="input-error">{errors.password}</p>
              )}
            </label>
            <label>
              Password Confirmation
              <input
                type="password"
                value={data.password_confirmation}
                onChange={(e) => {
                  setData("password_confirmation", e.target.value);
                }}
                required
              />
            </label>
            <button type="submit" disabled={processing}>
              Update
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default NewPasswordForm;
