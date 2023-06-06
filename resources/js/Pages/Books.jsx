import "../../css/books.css";
import Layout from "../Layout/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import Paginater from "../Components/Paginater";
import SearchBar from "../Components/SearchBar";
import IssueForm from "../Components/IssueForm";
import DeleteBookButton from "../Components/DeleteBookButton";
import BookUpdateForm from "../Components/BookForm";

const Books = ({ books }) => {
  const { auth } = usePage().props;
  const [formModal, setFormModal] = useState({
    issueForm: {
      id: "",
      title: "",
      show: false,
    },
    bookForm: {
      book: null,
      show: false,
    },
  });

  const showIssueForm = (id, title) => {
    setFormModal(() => ({
      issueForm: {
        id,
        title,
        show: true,
      },
      bookForm: {
        show: false,
      },
    }));
  };

  const showBookForm = (book = null) => {
    setFormModal(() => ({
      issueForm: {
        show: false,
      },
      bookForm: {
        book,
        show: true,
      },
    }));
  };

  const hideForm = () => {
    setFormModal(() => ({
      issueForm: {
        show: false,
      },
      bookForm: {
        show: false,
      },
    }));
  };

  return (
    <Layout>
      <div className="book-list-top-container">
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
        {books && <SearchBar hideForm={hideForm} subject={"book"} />}
      </div>
      {formModal.issueForm.show && (
        <div className="overlay" onClick={hideForm}>
          <IssueForm
            hideForm={hideForm}
            bookId={formModal.issueForm.id}
            bookTitle={formModal.issueForm.title}
          />
        </div>
      )}
      {formModal.bookForm.show && (
        <div className="overlay" onClick={hideForm}>
          <BookUpdateForm book={formModal.bookForm.book} hideForm={hideForm} />
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
                      onFocus={hideForm}
                      disabled={book.stock == 0}
                    >
                      {book.stock == 0 ? "Out of stock" : "Request"}
                    </button>
                  )}
                  {auth.user && auth.user.is_librarian == 1 && (
                    <div className="book-edit-buttons">
                      <button
                        onClick={() => {
                          showBookForm(book);
                        }}
                      >
                        Update
                      </button>
                      <DeleteBookButton id={book.id} />
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
