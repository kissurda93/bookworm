import "../../css/registrationForm.css";
import { useForm } from "@inertiajs/inertia-react";
import Layout from "../Layout/Layout";

const RegistrationForm = () => {
  const { data, setData, post, errors, processing } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/registration");
  };

  return (
    <Layout>
      <div className="register-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <label>
            Name
            <input
              type="text"
              required
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && <p className="input-error">{errors.name}</p>}
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
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
            {errors.password && (
              <p className="input-error">{errors.password}</p>
            )}
          </label>
          <label>
            Password confirmation
            <input
              type="password"
              required
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
            />
            {errors.password_confirmation && (
              <p className="input-error">{errors.password_confirmation}</p>
            )}
          </label>
          <button type="submit" disabled={processing}>
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegistrationForm;
