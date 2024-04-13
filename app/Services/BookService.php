<?php

namespace App\Services;

use App\Models\Book;

class BookService
{
    public function createBook(array $validated)
    {
        Book::create([
            'title' => $validated['title'],
            'author' => ($validated['author'] ?? 'Unknown'),
            'stock' => ($validated['stock'] ?? 1),
            'imageLink' => $this->storeImage($validated['title'], ($validated['image'] ?? null)),
        ]);
    }

    public function updateBook(Book $book, array $validated)
    {
        foreach ($validated as $key => $value) {
            if ($key === 'image') {
                $book['imageLink'] = $this->storeImage(($validated['title'] ?? $book['title']), $value);
            } else {
                $book[$key] = $value;
            }
        }

        $book->save();
    }

    private function storeImage(string $bookTitle, $file = null): string
    {
        if ($file === null) {
            return '/images/no-image.jpg';
        }

        $bookTitle = preg_replace('/\s+/', '-', $bookTitle);
        $imageName = time() . $bookTitle . $file->extension();
        $file->move(public_path('images'), $imageName);

        return "/images/$imageName";
    }
}
