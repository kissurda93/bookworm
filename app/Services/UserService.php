<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserService
{
  public function login(array $validated): void
  {
    if(!Auth::attempt($validated)) {
      throw new \Exception('LogIn in failed!');
    }
  }

  public function createUser(array $validated): array
  {
    $user = User::create([
      'name' => $validated['name'],
      'email' => $validated['email'],
      'password' => $validated['password'],
      'verification_token' => Str::random(100),
      'is_librarian' => $validated['is_librarian'] ?? 0,
    ]);

    $url = route('account-activate', ['user' => $user->verification_token,]);

    return [$user, $url];
  }

  public function activateAccount(User $user): void
  {
    $user->tokens()->delete();

    if ($user->email_verified_at != null) {
      throw new \Exception('The account has already been verified!');
    }

    $user->email_verified_at = now();
    $user->save();
  }

  public function updateUser(User $user, array $validated): void
  {
    foreach ($validated as $key => $value) {
      if($user[$key] != $value) {
        $user[$key] = $value;
      }
    }

    $user->save();
  }

  public function createPasswordLink(User $user): string
  {
    $token = Str::random(100);

    $user->new_password_token = $token;
    $user->save();

    $url = route('newPasswordForm', ['token' => $token,]);
    return $url;
  }
}
