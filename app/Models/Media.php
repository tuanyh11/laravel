<?php

namespace App\Models;

use Awcodes\Curator\Models\Media as ModelsMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends ModelsMedia
{
    use HasFactory;

    protected static function booted()
    {

        static::deleting(function (Media $media) {
            Storage::disk('public')->delete($media->path);
        });
    }
}