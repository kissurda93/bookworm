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
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function getUser(): Response
    {
        $user = auth()->user();
        return response($user);
    }

    public function getUsers(string $query = ''): Response
    {
        if($query) {
            $users = User::searchByName($query)->get();
            return $users;
        }

        $users = User::get();
        return response($users);
    }

    public function login(LoginRequest $request, UserService $userService): Response
    {
        try {
            $validated = $request->validated();
            $userService->login($validated, $request);
            return response([]);
        } catch (ValidationException $e) {
            return response($e->errors(), 422);
        } catch(\Exception $e) {
            return response($e->getMessage(), 400);
        }
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

    public function updateUser(User $user, UserUpdateRequest $request, UserService $userService): Response
    {
        try {
            $validated = $request->validated();
            $updatedUser = $userService->updateUser($user, $validated);
            return response($updatedUser);
        } catch (ValidationException $e) {
            return response($e->errors(), 422);
        }
    }

    public function deleteUser(User $user): Response
    {
        $user->delete();
        return response('Account deleted!');
    }
}
