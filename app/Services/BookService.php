<?php

namespace App\Services;

use App\Models\Book;
use Illuminate\Database\Eloquent\Model;

class BookService
{
  public function createBook(array $validated): Model
  {
    $book = Book::create([
      'title' => $validated['title'],
      'author' => $validated['author'],
      'imageLink' => $this->storeImage($validated['title'], $validated['image']),
    ]);

    return $book;
  }

  public function updateBook(int $id, array $validated): Model
  {
    $book = Book::find($id);

    if(isset($validated['title'])) {
      $book['title'] = $validated['title'];
    }

    if(isset($validated['author'])) {
      $book['author'] = $validated['author'];
    }

    if(isset($validated['image'])) {
      $book['imageLink'] = $this->
        storeImage(isset($validated['title']) ? $validated['title'] : $book['title'] , $validated['image']);
    }

    $book->save();
    return $book;
  }

  private function storeImage(string $bookTitle, $file): string
  {
    if(!$file) {
      return 'images/no-image.jpg';
    }

    $bookTitle = preg_replace('/\s+/', '-', $bookTitle);
    $imageName = time() . $bookTitle . $file->extension();
    $file->move(public_path('images'), $imageName);
    return "images/$imageName";
  }
}