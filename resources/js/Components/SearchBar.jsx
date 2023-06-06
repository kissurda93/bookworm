import "../../css/searchBar.css";
import { useForm } from "@inertiajs/inertia-react";

const SearchBar = ({ hideForm = null, subject }) => {
  const { data, setData, get, processing } = useForm({
    query: "",
  });

  const setPlaceholderText = () => {
    switch (subject) {
      case "book":
        return "Search by title or author..";

      case "user":
        return "Search by name or email..";

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (subject) {
      case "book":
        get(`/books/${data.query}`);
        break;

      case "user":
        get(`/users/${data.query}`);
        break;

      default:
        break;
    }
  };

  return (
    <div className="search-container">
      <form
        className="relative-container"
        id="searchForm"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={setPlaceholderText()}
          value={data.query}
          onChange={(e) => setData("query", e.target.value)}
        />
        <button type="submit" disabled={processing} onFocus={hideForm}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
