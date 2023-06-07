<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IssueController;

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

//FIXME: remove this route
Route::get('/test', function (Request $request) {
  return 'test';
});

Route::inertia('/', 'Welcome')->name('indexPage');
Route::get('/account_activate/{user:verification_token}', [UserController::class, 'activate'])->name('account-activate');
Route::get('/books/{query?}', [BookController::class, 'getBooks'])->name('books');

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
  Route::post('/new-issue/{user}/{book}', [IssueController::class, 'createIssue']);
});

Route::middleware(['is_librarian'])->group(function () {
  Route::get('/user/{id}', [UserController::class, 'getUser']);
  Route::get('/users/{query?}', [UserController::class, 'getUsers']);
  Route::get('/restore/{id}', [UserController::class, 'restoreUser']);
  Route::get('/issues/{query?}', [IssueController::class, 'getIssues']);
  Route::patch('/updateIssue/{issue}', [IssueController::class, 'updateIssue']);
  Route::post('/new-book', [BookController::class, 'newBook']);
  Route::patch('/update-book/{book}', [BookController::class, 'updateBook']);
  Route::delete('/delete-book/{book}', [BookController::class, 'deleteBook']);
});

