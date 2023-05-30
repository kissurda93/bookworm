<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Response;
use App\Mail\VerificationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\RegistrationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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

    public function registerUser(RegistrationRequest $request, UserService $userService): Response
    {
        try {
            $validated = $request->validated();
            list($user, $activationURL) = $userService->createUser($validated);

            Mail::to($user->email)->send(new VerificationMail($activationURL, $user->name));

            return response('An activation Link has been sent to your email address!', 201);
        } catch (ValidationException $e) {
            return response($e->errors(), 422);
        }
    }

    public function activate(User $user, UserService $userService): RedirectResponse
    {
        try {
            $userService->activateAccount($user);
            return redirect(route('indexPage'));
        } catch (\Exception $e) {
            return redirect(route('indexPage'));
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

    public function deleteUser(User $user): RedirectResponse
    {
        $user->delete();
        return to_route('indexPage')->with('message', 'Account deleted!');
    }
}
