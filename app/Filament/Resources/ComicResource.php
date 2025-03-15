<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ComicResource\Pages;
use App\Filament\Resources\ComicResource\RelationManagers\ChapterRelationManager;
use App\Models\Chapter;
use App\Models\Comic;
use App\Models\Media;
use Awcodes\Curator\Components\Forms\CuratorPicker;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup as ActionsActionGroup;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Outerweb\FilamentImageLibrary\Filament\Forms\Components\ImageLibraryPicker;

class ComicResource extends Resource
{
    protected static ?string $model = Comic::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';


    protected static function getOptionsString(Media $model)
    {
        return view('filament.components.select-media-results')
            ->with('file_name', $model->file_name)
            ->with('key', $model->id)
            ->with('name', $model->custom_properties['title'])
            ->render();
    }
    public static function form(Form $form): Form
    {
        return $form
            ->columns(3)->schema([
                Section::make()->columnSpan(2)->columns(1)->schema([
                    Forms\Components\TextInput::make('title')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (?string $state, Set $set, Get $get, ?string $old) {
                            if (($get('slug') ?? '') !== Str::slug($old ?? '')) {
                                return;
                            }
                            $set('slug', Str::slug($state));
                        }),
                    Forms\Components\TextInput::make('slug')
                        ->required(),
                    // ->live()
                    // ->disabled(),

                   
                    Group::make([RichEditor::make('description')
                        ->columnSpan(2)
                        ->required()])
                ]),
                Section::make()->columnSpan(1)->columns(1)->schema(
                    [
                        Select::make('tags_id')
                            ->label('Tags')
                            ->relationship('tags', 'name')
                            ->multiple()
                            ->preload()
                            ->searchable()
                            ->createOptionForm([TagsResource::formSchema()]),
                        Select::make('genres_id')
                            ->label('Genres')
                            ->relationship('genres', 'name')
                            ->multiple()
                            ->preload()
                            ->searchable()
                            ->createOptionForm([GenresResource::formSchema()]),


                        Select::make('author_id')
                            ->label('Author')
                            ->relationship('author', 'name')
                            ->preload()
                            ->required()
                            ->searchable(),
                        CuratorPicker::make('thumbnail_id')
                            ->label('Thumbnail'),
                        Group::make([Radio::make('status')->options([
                            'completed' => 'Completed',
                            'ongoing' => 'Ongoing',
                            'cancelled' => 'Cancelled'
                        ])]),

                    ]
                ),


            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                ImageColumn::make('thumbnail.url')
                    ->label('Thumbnail')
                    ->size(100),
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable(),

                Tables\Columns\TextColumn::make('read_count')
                    ->sortable(),
                Tables\Columns\TextColumn::make('vote_count')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->sortable(),
                Tables\Columns\TextColumn::make('tags.name')
                    ->label('Tags')
                    ->searchable(),

            ])
            ->filters([
                //
            ])
            ->actions([
                ActionsActionGroup::make([
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ]),
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
            ChapterRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListComics::route('/'),
            'create' => Pages\CreateComic::route('/create'),
            'edit' => Pages\EditComic::route('/{record}/edit'),
        ];
    }
}
