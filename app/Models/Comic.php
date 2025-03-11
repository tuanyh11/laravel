<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comic extends Model
{

    protected $fillable = [
        'title',
        'slug',
        'description',
        'thumbnail_id',
        'read_count',
        'vote_count',
        'status',
        'author_id', 
    ];

    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }

    public function thumbnail()
    {
        return $this->belongsTo(Media::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tags::class, 'comic_tags');
    }

    public function genres()
    {
        return $this->belongsToMany(Genres::class, 'comic_genres');
    }
}
