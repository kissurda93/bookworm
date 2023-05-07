<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
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
})->name('indexPage');

//  User related
Route::get('/user', [UserController::class, 'getUser']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/new-user', [UserController::class, 'registerUser']);
Route::patch('/update-user/{user}', [UserController::class, 'updateUser']);
Route::delete('/delete-user/{user}', [UserController::class, 'deleteUser']);
Route::get('/account_activate/{user:verification_token}', [UserController::class, 'activate'])->name('account-activate');

// Books related
Route::get('/books/{query?}', [BookController::class, 'getBooks']);

Route::get('/users', [UserController::class, 'getUsers']);
// Librarian actions
Route::middleware(['is_librarian'])->group(function () {
    Route::post('/new-book', [BookController::class, 'newBook']);
    Route::patch('/update-book/{book}', [BookController::class, 'updateBook']);
    Route::delete('/delete-book/{book}', [BookController::class, 'deleteBook']);
});

