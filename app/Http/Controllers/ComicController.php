<?php

namespace App\Http\Controllers;

use App\Models\Comic as ModelsComic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComicController extends Controller
{
    public function show($slug)
    {
        $comic = ModelsComic::where('slug', $slug)
        ->with(['author' => function ($query) {
        $query->select('id', 'name');
        }])
        ->with(['chapters' => function ($query)  {
            $query->withCount('comments');
        }])
        ->with('thumbnail')
        ->with('tags')
        ->firstOrFail();

        return Inertia::render('Comic/Detail', [
            'comic' => $comic
        ]);
    }
}
