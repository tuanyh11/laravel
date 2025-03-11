<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GenresResource\Pages;
use App\Filament\Resources\GenresResource\RelationManagers;
use App\Models\Genres;
use Awcodes\Curator\Components\Forms\CuratorPicker;
use Dom\Text;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Outerweb\FilamentImageLibrary\Filament\Forms\Components\ImageLibraryPicker;

class GenresResource extends Resource
{
    protected static ?string $model = Genres::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                self::formSchema()
            ]);
    }

    public static function formSchema()
    {
        return  Section::make()->schema([
            TextInput::make('name')
                ->label('Name')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(function (?string $state, Set $set, Get $get, ?string $old) {
                    if (($get('slug') ?? '') !== Str::slug($old ?? '')) {
                        return;
                    }
                    $set('slug', Str::slug($state));
                }),
            TextInput::make('slug')
                ->label('Slug')
                ->required(),
            CuratorPicker::make('media_id')
                ->label('Media')
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make(name: 'slug')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                ActionGroup::make([
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGenres::route('/'),
            'create' => Pages\CreateGenres::route('/create'),
            'edit' => Pages\EditGenres::route('/{record}/edit'),
        ];
    }
}
