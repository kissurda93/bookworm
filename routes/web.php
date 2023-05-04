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
Route::get('/books', [BookController::class, 'getBooks']);
Route::get('/books/{query}', [BookController::class, 'search']);
Route::post('/new-book', [BookController::class, 'newBook']);
Route::patch('/update-book/{id}', [BookController::class, 'updateBook']);
Route::delete('/delete-book/{id}', [BookController::class, 'deleteBook']);

// Librarian actions
Route::middleware(['is_librarian'])->group(function () {

});
