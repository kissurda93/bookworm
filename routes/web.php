<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
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

//FIXME: remove this route
Route::get('/test', function (Request $request) {
  $test = $request->user()->only('id', 'name', 'email', 'is_librarian');
  $issues = $request->user()->issues;

  foreach ($issues as $key => $issue) {
   $issue->book;
  }

  $test[] = $issues;

  return $test;

});

//TODO: move this route to librarian actions
Route::get('/restore/{id}', [UserController::class, 'restoreUser']);

//  User related
Route::middleware(['guest'])->group(function () {
  Route::post('/login', [UserController::class, 'login']);
  Route::inertia('/register-form', 'RegistrationForm');
  Route::post('/registration', [UserController::class, 'registerUser']);
  Route::post('/forgotten-password-create-link', [UserController::class, 'createPasswordLink']);
  Route::get('/new-password-form/{token}', [UserController::class, 'newPasswordForm'])->name('newPasswordForm');
  Route::patch('/set-new-password', [UserController::class, 'setNewPassword']);
});

Route::middleware(['auth'])->group(function () {
  Route::get('/logout', [UserController::class, 'logout']);
  Route::inertia('/profile', 'Profile')->name('profile');
  Route::patch('/update-user/{user}', [UserController::class, 'updateUser']);
  Route::patch('/update-password/{user}', [UserController::class, 'updatePassword']);
  Route::delete('/delete-user/{user}', [UserController::class, 'deleteUser']);
});

Route::get('/account_activate/{user:verification_token}', [UserController::class, 'activate'])->name('account-activate');

// Books related
Route::get('/books/{query?}', [BookController::class, 'getBooks'])->name('books');

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

