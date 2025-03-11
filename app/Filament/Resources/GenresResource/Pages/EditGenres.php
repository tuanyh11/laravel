<?php

namespace App\Filament\Resources\GenresResource\Pages;

use App\Filament\Resources\GenresResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditGenres extends EditRecord
{
    protected static string $resource = GenresResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
