import "../../css/books.css";
import Layout from "../Layout/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { useReducer } from "react";
import Paginater from "../Components/Paginater";
import SearchBar from "../Components/SearchBar";
import IssueForm from "../Components/IssueForm";
import DeleteBookButton from "../Components/DeleteBookButton";
import BookUpdateForm from "../Components/BookForm";
import { booksPageModalsReducer } from "../helpers";
import { Link } from "@inertiajs/inertia-react";

const Books = ({ books }) => {
  const { auth } = usePage().props;
  const initialModalState = {
    issueForm: {
      id: null,
      title: null,
      show: false,
    },
    bookForm: {
      book: null,
      show: false,
    },
  };
  const [modal, dispatch] = useReducer(
    booksPageModalsReducer,
    initialModalState
  );

  const showIssueForm = (id, title) => {
    dispatch({ type: "showIssueForm", id, title });
  };

  const showBookForm = (book = null) => {
    dispatch({ type: "showBookForm", book });
  };

  const hideModal = () => {
    dispatch({ type: "hideEverything" });
  };

  return (
    <Layout>
      <div className="book-list-top-container">
        {books && (
          <SearchBar
            hideForm={hideModal}
            link={"/books/"}
            placeholder="Search by title or author..."
          />
        )}
        {auth.user?.is_librarian == 1 && (
          <button
            className="new-book-button"
            onClick={() => {
              showBookForm();
            }}
          >
            <span className="material-symbols-outlined">library_add</span>
            <span className="tooltip">New book</span>
          </button>
        )}
      </div>
      {modal.issueForm.show && (
        <div className="overlay" onClick={hideModal}>
          <IssueForm
            hideForm={hideModal}
            bookId={modal.issueForm.id}
            bookTitle={modal.issueForm.title}
          />
        </div>
      )}
      {modal.bookForm.show && (
        <div className="overlay" onClick={hideModal}>
          <BookUpdateForm book={modal.bookForm.book} hideForm={hideModal} />
        </div>
      )}
      {books && (
        <>
          <ul className="book-list">
            {books.data.map((book) => (
              <li key={book.id}>
                <img src={book.imageLink} width={300} height={300} />
                <div className="book-info">
                  <p>Title: {book.title}</p>
                  <p>Author: {book.author}</p>
                  {book.stock == 0 && (
                    <p className="out-stock">Out of stock!</p>
                  )}

                  <div className="book-button-container">
                    {auth.user && book.stock !== 0 && (
                      <button
                        onClick={() => {
                          showIssueForm(book.id, book.title);
                        }}
                        onFocus={hideModal}
                      >
                        <span className="material-symbols-outlined">loupe</span>
                      </button>
                    )}
                    {auth.user && auth.user.is_librarian == 1 && (
                      <>
                        <DeleteBookButton id={book.id} />

                        <button
                          onClick={() => {
                            showBookForm(book);
                          }}
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                        <Link href={`/issues/${book.title}`} as="button">
                          <span className="material-symbols-outlined">
                            list
                          </span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Paginater page_links={books.links} />
        </>
      )}
    </Layout>
  );
};

export default Books;
