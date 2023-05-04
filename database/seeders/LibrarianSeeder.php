<?php

namespace Database\Seeders;

use App\Models\Librarian;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LibrarianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Librarian::create([
            'name' => 'Teszt Elek',
            'email' => 'testlibrarian@gmail.com',
            'password' => 'testlibrarian',
        ]);
    }
}
