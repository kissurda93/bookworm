<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class Issue extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'expire_date',
        'fine',
        'returned_at',
        'issued_at',
    ];

    public function scopeSearchByBookTitle(Builder $query, string $queryString)
    {
        $searchedBook = DB::table('books')->select('id')->where('title', 'LIKE', "%$queryString%");
        $query->whereIn('book_id', $searchedBook);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
