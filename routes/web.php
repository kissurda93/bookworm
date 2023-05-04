<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});

// Books related
Route::get('/books/{query?}', [BookController::class, 'getBooks']);

// Librarian actions
Route::middleware(['is_librarian'])->group(function () {
    Route::post('/new-book', [BookController::class, 'newBook']);
    Route::patch('/update-book/{id}', [BookController::class, 'updateBook']);
    Route::delete('/delete-book/{id}', [BookController::class, 'deleteBook']);
});
