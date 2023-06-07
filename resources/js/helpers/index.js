export function timeStampToDateString(timestamp) {
  const dateString = new Date(timestamp).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dateString;
}

export function booksPageModalsReducer(state, action) {
  switch (action.type) {
    case "showIssueForm":
      return {
        bookForm: {
          show: false,
        },
        issueForm: {
          id: action.id,
          title: action.title,
          show: true,
        },
      };

    case "showBookForm":
      return {
        issueForm: {
          show: false,
        },
        bookForm: {
          book: action.book,
          show: true,
        },
      };

    case "hideEverything":
      return {
        issueForm: {
          show: false,
        },
        bookForm: {
          show: false,
        },
      };

    default:
      throw Error("Wrong action!");
  }
}
