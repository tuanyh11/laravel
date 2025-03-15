<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comic;
use Illuminate\Http\Request;

class ComicController extends Controller
{
    /**
     * Tìm kiếm truyện theo tiêu đề hoặc tác giả
     */
    public function search(Request $request)
    {
        $query = $request->input('q');
        
        if (empty($query)) {
            return response()->json([
                'comics' => []
            ]);
        }

        $comics = Comic::where('title', 'LIKE', "%{$query}%")
            ->orWhereHas('author', function($q) use ($query) {
                $q->where('name', 'LIKE', "%{$query}%");
            })
            ->with(['author' => function ($q) {
                $q->select('id', 'name');
            }])
            ->with('thumbnail')
            ->limit(10)
            ->get();

        return response()->json([
            'comics' => $comics
        ]);
    }
}