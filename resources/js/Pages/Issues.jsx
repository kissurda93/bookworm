import "../../css/issues.css";
import Layout from "../Layout/Layout";

const Issues = ({ issues }) => {
  return (
    <Layout>
      <div>{JSON.stringify(issues)}</div>
    </Layout>
  );
};

export default Issues;
