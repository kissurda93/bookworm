import "../../css/searchBar.css";
import { useForm } from "@inertiajs/inertia-react";

const SearchBar = ({ link, hideForm = null, placeholder = null }) => {
  const { data, setData, get, processing } = useForm({
    query: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    get(`${link}${data.query}`);
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
          placeholder={placeholder ?? "Search..."}
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
