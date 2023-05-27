import "../../css/welcome.css";
import Layout from "../Layout/Layout";
import LoginForm from "../Components/LoginForm";
import { usePage } from "@inertiajs/inertia-react";

const Welcome = () => {
  const { auth } = usePage().props;
  return (
    <Layout>
      <div className="welcome-container">
        <h1>Welcome in the BookWorm Library</h1>
        <div className="qoute">
          <q>In the end, we`ll all become stories.</q>
          <span>Margaret Atwood</span>
        </div>
        {!auth.user && <LoginForm />}
      </div>
    </Layout>
  );
};

export default Welcome;
