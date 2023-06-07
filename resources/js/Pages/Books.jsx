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
            New Book
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

                  {auth.user && (
                    <button
                      onClick={() => {
                        showIssueForm(book.id, book.title);
                      }}
                      onFocus={hideModal}
                      disabled={book.stock == 0}
                    >
                      {book.stock == 0 ? "Out of stock" : "Request"}
                    </button>
                  )}
                  {auth.user && auth.user.is_librarian == 1 && (
                    <div className="book-edit-buttons">
                      <DeleteBookButton id={book.id} />

                      <button
                        onClick={() => {
                          showBookForm(book);
                        }}
                      >
                        Update
                      </button>
                      <Link href={`/issues/${book.title}`} as="button">
                        Requests
                      </Link>
                    </div>
                  )}
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
