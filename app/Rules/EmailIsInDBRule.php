<?php

namespace App\Rules;

use Closure;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;

class EmailIsInDBRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $emails = User::get('email')->pluck('email');
        $success = $emails->search($value);

        if ($success === false) {
            $fail('The :attribute does not belong to any user!');
        }
    }
}
