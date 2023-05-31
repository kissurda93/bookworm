<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailCheckRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\NewPasswordRequest;
use App\Http\Requests\PasswordUpdateRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Response;
use App\Mail\VerificationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\RegistrationRequest;
use App\Mail\ForgottenPasswordMail;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
  public function getUsers(string $query = ''): Response
  {
    if($query) {
        $users = User::searchByName($query)->get();
        return $users;
    }

    $users = User::get();
    return response($users);
  }

    public function login(LoginRequest $request, UserService $userService): RedirectResponse
    {
      try {
        $validated = $request->validated();
        $userService->login($validated);
        return to_route('profile');
      } catch(\Exception $e) {
        return back()->with('message', [
          'text' => $e->getMessage(),
          'error' => 1,
        ]);
      }
    }

    public function logout()
    {
      Auth::logout();
      return to_route('indexPage');
    }

    public function registerUser(RegistrationRequest $request, UserService $userService): RedirectResponse
    {
      $validated = $request->validated();
      list($user, $activationURL) = $userService->createUser($validated);

      Mail::to($user->email)->send(new VerificationMail($activationURL, $user->name));

      return to_route('indexPage')->with('message', [
        'text' => 'An activation Link has been sent to your email address!',
      ]);
    }

    public function activate(User $user, UserService $userService): RedirectResponse
    {
      try {
        $userService->activateAccount($user);
        return to_route('indexPage')->with('message', [
          'text' => 'Account verified!'
        ]);
      } catch (\Exception $e) {
        return to_route('indexPage')->with('message', [
          'text' => $e->getMessage(),
          'error' => 1,
        ]);
      }
    }

    public function updateUser(User $user, UserUpdateRequest $request, UserService $userService): RedirectResponse
    {
      $validated = $request->validated();
      $userService->updateUser($user, $validated);
      return to_route('profile')->with('message', [
        'text' => 'Update was successfull!',
      ]);
    }

    public function updatePassword(User $user, PasswordUpdateRequest $request, UserService $userService): RedirectResponse
    {
      $validated = $request->validated();
      $userService->updateUser($user, ['password' => $validated['password']]);
      return to_route('profile')->with('message', [
        'text' => 'Update was successfull!',
      ]);
    }

    public function deleteUser(User $user): RedirectResponse
    {
      $user->delete();
      return to_route('indexPage')->with('message', [
        'text' => 'Account deleted!',
      ]);
    }

    //TODO: creating user interface for librarian to restore user accounts
    public function restoreUser(int $id): Response
    {
      if(User::withTrashed()->findOrFail($id)->restore()) {
        return response("User restored!");
      }
    }

    public function createPasswordLink(EmailCheckRequest $request, UserService $userService): RedirectResponse
    {
      $validated = $request->validated();
      $user = User::where('email', $validated['email'])->first();
      $link = $userService->createPasswordLink($user);

      Mail::to($user->email)->send(new ForgottenPasswordMail($link, $user->name));

      return to_route('indexPage')->with('message', [
        'text' => 'Link has been sent to your email address!'
      ]);
    }

    public function newPasswordForm(string $token)
    {
      return inertia('NewPasswordForm', ['token' => $token]);
    }

    public function setNewPassword(NewPasswordRequest $request, UserService $userService): RedirectResponse
    {
      $validated = $request->validated();

      $user = User::where('new_password_token', $validated['new_password_token'])->first();

      if(!$user) {
        return to_route('indexPage')->with('message', [
          'text' => 'Update was unsuccessfull!',
          'error' => 1,
        ]);
      }

      $validated['new_password_token'] = null;
      $userService->updateUser($user, $validated);

      return to_route('indexPage')->with('message', [
        'text' => 'Password has changed successfully!'
      ]);
    }
}
