import "../../css/searchBar.css";
import { useForm } from "@inertiajs/inertia-react";

const SearchBar = ({ hideForm }) => {
  const { data, setData, get, processing } = useForm({
    query: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    get(`/books/${data.query}`);
  };

  return (
    <div className="search-container">
      <form className="relative-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by title or author..."
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
