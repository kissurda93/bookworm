<x-mail::message>
# Hello {{ $name }}

This is your activation link below!

<x-mail::button :url="$url">
Click here
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
