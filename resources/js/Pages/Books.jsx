import "../../css/books.css";
import Layout from "../Layout/Layout";
import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import Paginater from "../Components/Paginater";

const Books = ({ books }) => {
  const { auth } = usePage().props;

  useEffect(() => {
    console.log(books);
  });

  return (
    <Layout>
      {books && (
        <>
          <ul className="book-list">
            {books.data.map((book) => (
              <li key={book.id}>
                <img src={book.imageLink} width={300} height={300} />
                <div className="book-info">
                  <p>Title: {book.title}</p>
                  <p>Author: {book.author}</p>
                  {auth.user && <button>Request for Issue</button>}
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
