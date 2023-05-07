<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class BookController extends Controller
{
    public function getBooks(string $query = ''): Response
    {
        if($query) {
            $books = Book::searchByTitleOrAuthor($query)->get();
            return response($books);
        }

        $books = Book::get();
        return response($books);
    }

    public function newBook(NewBookRequest $request, BookService $bookService): Response
    {
        try {
            $validated = $request->validated();
            $book = $bookService->createBook($validated);
            return response($book);
        } catch (ValidationException $e) {
            return response($e->getMessage());
        }
    }

    public function updateBook(Book $book, UpdateBookRequest $request, BookService $bookService): Response
    {
        try {
            $validated = $request->validated();
            $updatedBook = $bookService->updateBook($book, $validated);
            return response($updatedBook);
        } catch (ValidationException $e) {
            return response($e->getMessage());
        }
    }

    public function deleteBook(Book $book): Response
    {
        $book->delete();
        return response('Book deleted!');
    }
}
