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
    public function getBooks(): Response
    {
        $books = Book::get();
        return response($books);
    }

    public function search(string $query): Response
    {
        $books = Book::searchByTitleOrAuthor($query)->get();
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

    public function updateBook(int $id, UpdateBookRequest $request, BookService $bookService): Response
    {
        try {
            $validated = $request->validated();
            $updatedBook = $bookService->updateBook($id, $validated);
            return response($updatedBook);
        } catch (ValidationException $e) {
            return response($e->getMessage());
        }
    }

    public function deleteBook(int $id): Response
    {
        $book = Book::find($id);
        $book->delete();

        return response('Book deleted!');
    }
}
