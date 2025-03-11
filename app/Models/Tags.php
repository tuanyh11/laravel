<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    protected $fillable = [
        'name',
    ];

    public function comics()
    {
        return $this->belongsToMany(Comic::class, 'comic_tags');
    }
}
