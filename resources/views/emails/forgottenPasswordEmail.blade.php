<x-mail::message>
# Hello {{ $name }}

We have received a request to change your password.<br>
You can change your password with the following link.

<x-mail::button :url="$url">
Click here
</x-mail::button>

If you did not request to change your password, ignore this message!

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
