<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Chapter extends Model
{
    protected $fillable = [
        'title',
        'order',
        'description',
        'comic_id',
        'media_id',
        'vote_count',
        'read_count'
    ];

    public function comic()
    {
        return $this->belongsTo(Comic::class);
    }

    public function media() {
        return $this->belongsTo(Media::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function voters(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'chapter_user_votes')
                    ->withTimestamps();
    }
    
    // To check if a specific user has voted
    public function hasUserVoted(User $user): bool
    {
        return $this->voters()->where('user_id', $user->id)->exists();
    }
}

