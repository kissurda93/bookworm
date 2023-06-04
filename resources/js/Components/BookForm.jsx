import "../../css/bookForm.css";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { useRef } from "react";

const BookForm = ({ hideForm, book = null }) => {
  const fileInput = useRef();
  const { auth } = usePage().props;
  const { data, setData, patch, post, errors, processing } = useForm({
    title: book?.title ?? "",
    author: book?.author ?? "",
    stock: book?.stock ?? 0,
  });

  const prepareFileUpload = () => {
    if (fileInput.current.files.length !== 0) {
      setData((prev) => ({
        ...prev,
        image: fileInput.current.files[0],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    prepareFileUpload();

    if (auth.user.is_librarian == 1) {
      if (!book) {
        post("/new-book", {
          onSuccess: () => {
            hideForm();
          },
        });
      } else {
        patch(`/update-book/${book.id}`, {
          onSuccess: () => {
            hideForm();
          },
        });
      }
    }
  };

  return (
    <form
      className="book-form"
      id="bookForm"
      onSubmit={handleSubmit}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!book ? <h2>New book</h2> : <h2>Edit book</h2>}
      <label>
        Title
        <input
          type="text"
          value={data.title}
          onChange={(e) => {
            setData("title", e.target.value);
          }}
          autoFocus
        />
        {errors.title && <p className="input-error">{errors.title}</p>}
      </label>
      <label>
        Author
        <input
          type="text"
          value={data.author}
          onChange={(e) => {
            setData("author", e.target.value);
          }}
        />
        {errors.author && <p className="input-error">{errors.author}</p>}
      </label>
      <label>
        Image
        <input
          ref={fileInput}
          type="file"
          onChange={(e) => {
            setData("image", e.target.files[0]);
          }}
        />
        {errors.image && <p className="input-error">{errors.image}</p>}
      </label>
      <label>
        Stock
        <input
          type="number"
          value={data.stock}
          onChange={(e) => {
            setData("stock", e.target.value);
          }}
        />
        {errors.stock && <p className="input-error">{errors.stock}</p>}
      </label>
      <button type="submit" disabled={processing}>
        {!book ? "Add" : "Update"}
      </button>
    </form>
  );
};

export default BookForm;
