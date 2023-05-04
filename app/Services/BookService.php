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
      'stock' => isset($validated['stock']) ? $validated['stock'] : 1,
      'imageLink' => $this->
      storeImage($validated['title'], isset($validated['image']) ? $validated['image'] : null),
    ]);

    return $book;
  }

  public function updateBook(int $id, array $validated): Model
  {
    $book = Book::find($id);

    foreach ($validated as $key => $value) {
      if($key === 'image') {
        $book['imageLink'] = $this->
          storeImage(isset($validated['title']) ? $validated['title'] : $book['title'] , $value);
      } else {
        $book[$key] = $value;
      }
    }

    $book->save();
    return $book;
  }

  private function storeImage(string $bookTitle, $file = null): string
  {
    if($file === null) {
      return 'images/no-image.jpg';
    }

    $bookTitle = preg_replace('/\s+/', '-', $bookTitle);
    $imageName = time() . $bookTitle . $file->extension();
    $file->move(public_path('images'), $imageName);
    return "images/$imageName";
  }
}