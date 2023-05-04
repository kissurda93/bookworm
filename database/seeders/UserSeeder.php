<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Teszt Elek',
            'email' => 'testuser@email.com',
            'password' => 'testuser',
            'email_verified_at' => date('m/d/y h:i:s'),
        ]);
    }
}
