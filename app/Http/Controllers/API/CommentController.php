<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Get parent comments for a chapter with pagination
     */
    public function getChapterComments($chapter_id)
    {
        $chapter = Chapter::where('id', $chapter_id)
            ->with('media')
            ->firstOrFail();

        // Get only parent comments (parent_id is null) with pagination
        $parentComments = $chapter->comments()
            ->select('id', 'content', 'user_id', 'chapter_id', 'created_at', 'parent_id')
            ->whereNull('parent_id')
            ->with(['user' => function ($query) {
                $query->select('id', 'name', 'avatar')->with('avatar');
            }])
            ->withCount('parent') // Count number of replies for each parent comment
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return response()->json($parentComments);
    }

    /**
     * Get child comments (replies) for a specific parent comment
     */
    public function getChildComments(Request $request, $parentCommentId)
    {
        // Validate the parent comment exists
        $parentComment = Comment::findOrFail($parentCommentId);
        
        // Get child comments with pagination
        $childComments = Comment::where('parent_id', $parentCommentId)
            ->select('id', 'content', 'user_id', 'chapter_id', 'created_at', 'parent_id')
            ->with(['user' => function ($query) {
                $query->select('id', 'name', 'avatar');
            }])
            ->orderBy('created_at', 'asc') // Show oldest replies first
            ->paginate(3); // Smaller page size for replies
        
        return response()->json($childComments);
    }
    
    /**
     * Store a new comment
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'chapter_id' => 'required|exists:chapters,id',
            'parent_id' => 'nullable|exists:comments,id',
        ]);
        
        // Get comic_id from chapter
        $chapter = Chapter::findOrFail($request->chapter_id);
        $validated['comic_id'] = $chapter->comic_id;
        
        $comment = Comment::create($validated);
        
        // Load user relationship
        $comment->load(['user' => function ($query) {
            $query->select('id', 'name', 'avatar');
        }]);
        
        return response()->json([
            'comment' => $comment,
            'message' => 'Comment posted successfully'
        ], 201);
    }
}