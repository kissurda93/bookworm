import "../../css/loginForm.css";
import { useForm } from "@inertiajs/inertia-react";

const LoginForm = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Email
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
        />
        {errors.email && <p className="input-error">{errors.email}</p>}
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
      <button type="submit" disabled={processing}>
        LogIn
      </button>
      <div className="credentials">
        <p>Test accounts credentials</p>
        <p>email: testuser@email.com</p>
        <p>password: testuser</p>
        <p>email: testlibrarian@email.com</p>
        <p>password: testlibrarian</p>
      </div>
    </form>
  );
};

export default LoginForm;
