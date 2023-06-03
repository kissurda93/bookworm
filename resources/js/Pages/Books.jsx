import "../../css/books.css";
import Layout from "../Layout/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import Paginater from "../Components/Paginater";
import SearchBar from "../Components/SearchBar";
import IssueForm from "../Components/IssueForm";

const Books = ({ books }) => {
  const { auth } = usePage().props;
  const [issueForm, setIssueForm] = useState({
    id: "",
    title: "",
    show: false,
  });

  const showIssueForm = (id, title) => {
    setIssueForm(() => ({
      id,
      title,
      show: true,
    }));
  };

  const hideIssueForm = () => {
    setIssueForm((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return (
    <Layout>
      {books && (
        <>
          <SearchBar hideForm={hideIssueForm} />
          {issueForm.show && (
            <div className="overlay" onClick={hideIssueForm}>
              <IssueForm
                hideForm={hideIssueForm}
                bookId={issueForm.id}
                bookTitle={issueForm.title}
              />
            </div>
          )}
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
                      onFocus={hideIssueForm}
                    >
                      Request for Issue
                    </button>
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
