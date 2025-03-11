<?php

namespace App\Filament\Resources\ComicResource\Pages;

use App\Filament\Resources\ComicResource;
use App\Filament\Resources\ComicResource\RelationManagers\ChapterRelationManager;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateComic extends CreateRecord
{
    protected static string $resource = ComicResource::class;

    public static function getRelations(): array
    {
        return [
           ChapterRelationManager::class
        ];
    }
}
