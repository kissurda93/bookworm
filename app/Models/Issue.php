<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Issue extends Model
{
    use HasFactory;

    protected $fillable = [
        'issue_date',
        'expire_date',
        'fine',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function book(): HasOne
    {
        return $this->hasOne(Book::class);
    }
}
