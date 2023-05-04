<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = json_decode(file_get_contents(base_path() . '/storage/books.json'));

        foreach ($books as $book) {
            Book::create([
                'title' => $book->title,
                'author' => $book->author,
                'imageLink' => $book->imageLink,
            ]);
        }
    }
}
