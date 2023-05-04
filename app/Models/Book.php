<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'author',
        'imageLink',
        'stock',
    ];

    public function issues(): HasMany
    {
        return $this->hasMany(Issue::class);
    }

    public function scopeSearchByTitleOrAuthor(Builder $query, string $queryString): void
    {
        $query->where('title', 'LIKE', '%'.$queryString.'%')
            ->orWhere('author', 'LIKE', '%'.$queryString.'%');
    }
}
