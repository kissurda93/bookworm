<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\IssueController;
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

Route::inertia('/', 'Welcome')->name('indexPage');

//  User related
Route::middleware(['guest'])->group(function () {
  Route::post('/login', [UserController::class, 'login']);
  Route::post('/new-user', [UserController::class, 'registerUser']);
});

Route::middleware(['auth'])->group(function () {
  Route::get('/logout', [UserController::class, 'logout']);
  Route::inertia('/profile', 'Profile')->name('profile');
  Route::patch('/update-user/{user}', [UserController::class, 'updateUser']);
  Route::delete('/delete-user/{user}', [UserController::class, 'deleteUser']);
});

Route::get('/account_activate/{user:verification_token}', [UserController::class, 'activate'])->name('account-activate');

// Books related
Route::get('/books/{query?}', [BookController::class, 'getBooks']);

// Issue related
Route::post('/new-issue/{user}/{book}', [IssueController::class, 'createIssue']);


// Librarian actions -----------------------------------------
Route::middleware(['is_librarian'])->group(function () {
  // User related
  Route::get('/users/{query?}', [UserController::class, 'getUsers']);

  // Issue related
  Route::get('/issues', [IssueController::class, 'getIssues']);
  Route::patch('/update-issue/{issue}', [IssueController::class, 'updateIssue']);

  // Book related
  Route::post('/new-book', [BookController::class, 'newBook']);
  Route::patch('/update-book/{book}', [BookController::class, 'updateBook']);
  Route::delete('/delete-book/{book}', [BookController::class, 'deleteBook']);
});

