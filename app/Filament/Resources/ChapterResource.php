<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ChapterResource\Pages;
use App\Filament\Resources\ChapterResource\RelationManagers;
use App\Filament\Resources\ChapterResource\RelationManagers\CommentRelationManager;
use App\Models\Chapter;
use Awcodes\Curator\Components\Forms\CuratorPicker;
use Filament\Forms;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ChapterResource extends Resource
{
    protected static ?string $model = Chapter::class;

    protected static ?string $navigationIcon = 'heroicon-o-square-3-stack-3d';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([self::formSchema()]);
    }

    public static function formSchema($hiddenComic = false) {
        return Section::make()->schema([
                    Select::make('comic_id')
                        ->relationship('comic', 'title')
                        ->searchable()
                        ->preload()
                        ->hidden($hiddenComic),
                    TextInput::make('title')
                        ->required()
                        ->datalist(['chapter-'])
                        ->autocomplete(true),
                    TextInput::make('order')
                        ->required()
                        ->numeric()
                        ->minValue(1)
                    ,
                     TextInput::make('read_count')
                        ->numeric()
                        ->minValue(0)
                        ->default(0),
                    TextInput::make('vote_count')
                        ->numeric()
                        ->minValue(0)
                        ->default(0),
                    CuratorPicker::make('media_id')
                    ->label('Media')
                    ->relationship('media', 'id'),
                    // ->,
                    RichEditor::make('description')
                        ->required()
                        ->columnSpanFull(),

        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('comic_id')
                    ->numeric()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
           CommentRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListChapters::route('/'),
            'create' => Pages\CreateChapter::route('/create'),
            'edit' => Pages\EditChapter::route('/{record}/edit'),
        ];
    }
}
