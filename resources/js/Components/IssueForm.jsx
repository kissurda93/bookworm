import "../../css/issueForm.css";
import { useForm, usePage } from "@inertiajs/inertia-react";

const IssueForm = ({ bookId, bookTitle, hideForm }) => {
  const { data, setData, post, errors, processing } = useForm({
    month: "",
  });
  const { user } = usePage().props.auth;

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/new-issue/${user.id}/${bookId}`, {
      onSuccess: () => {
        hideForm();
      },
    });
  };

  return (
    <form
      className="issue-form"
      onSubmit={handleSubmit}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <p>How long are you requesting the "{bookTitle}" book for?</p>
      <label>
        Month:
        <select
          value={data.month}
          onChange={(e) => {
            setData("month", e.target.value);
            console.log(data);
          }}
          autoFocus
          required
        >
          <option value={null}>Select month</option>
          <option value={1}>1 month</option>
          <option value={2}>2 month</option>
          <option value={3}>3 month</option>
        </select>
        {errors.month && <p className="input-error">{errors.month}</p>}
      </label>
      <button type="submit" disabled={processing}>
        Request
      </button>
    </form>
  );
};

export default IssueForm;
