<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Outerweb\ImageLibrary\Facades\ImageLibrary;
use Outerweb\ImageLibrary\Models\ImageConversion;

class Genres extends Model
{
    protected $fillable = [
        'name',
        'media_id',
        'slug'
    ];


    public function media()
    {
        return $this->belongsTo(Media::class);
    }
    public function comics()
    {
        return $this->belongsToMany(Comic::class, 'comic_genres');
    }
}
