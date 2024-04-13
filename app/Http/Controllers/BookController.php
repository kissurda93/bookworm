<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Services\BookService;
use Inertia\Response as InertiaResponse;
use App\Http\Requests\NewBookRequest;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\BookUpdateRequest;

class BookController extends Controller
{
    public function getBooks(string $query = ''): InertiaResponse
    {
        if (!empty($query)) {
            $books = Book::searchByTitleOrAuthor($query)->orderBy('title', 'asc')->paginate(15);
        } else {
            $books = Book::orderBy('title', 'asc')->paginate(15);
        }

        return inertia('Books', ['books' => $books]);
    }

    public function newBook(NewBookRequest $request, BookService $bookService): RedirectResponse
    {
        $validated = $request->validated();
        $bookService->createBook($validated);

        return back()->with('message', [
            'text' => 'Book added successfully!'
        ]);
    }

    public function updateBook(Book $book, BookUpdateRequest $request, BookService $bookService): RedirectResponse
    {
        $validated = $request->validated();
        $bookService->updateBook($book, $validated);

        return back()->with('message', [
            'text' => 'Book updated successfully!'
        ]);
    }

    public function deleteBook(Book $book): RedirectResponse
    {
        if (count($book->issues) !== 0) {
            return back()->with('message', [
                'text' => 'You cannot delete a book that is currently issued!',
                'error' => 1,
            ]);
        }

        $book->delete();

        return back()->with('message', [
            'text' => 'Book deleted!',
        ]);
    }
}
