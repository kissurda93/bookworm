import "../../css/loginForm.css";
import { useForm } from "@inertiajs/inertia-react";
import ForgottenPassEmailForm from "../Components/ForgottenPassEmailForm";
import { useState } from "react";

const LoginForm = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            autoFocus
          />
          {errors.email && <p className="input-error">{errors.email}</p>}
        </label>
        <label>
          Password
          <input
            type="password"
            required
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
          />
          {errors.password && <p className="input-error">{errors.password}</p>}
        </label>
        <button
          type="submit"
          disabled={processing}
          onFocus={() => {
            setShowEmailForm(false);
          }}
        >
          LogIn
        </button>
      </form>
      {showEmailForm && (
        <div className="overlay" onClick={() => setShowEmailForm(false)}>
          <ForgottenPassEmailForm
            hideForm={() => {
              setShowEmailForm(false);
            }}
          />
        </div>
      )}
      <button
        className="forgotted-pass-button"
        onFocus={() => {
          setShowEmailForm(false);
        }}
        onClick={() => {
          setShowEmailForm(true);
        }}
      >
        Forgot your password?
      </button>
      <div className="credentials">
        <p>Test accounts credentials</p>
        <p>email: testuser@email.com</p>
        <p>password: testuser</p>
        <p>email: testlibrarian@email.com</p>
        <p>password: testlibrarian</p>
      </div>
    </div>
  );
};

export default LoginForm;
