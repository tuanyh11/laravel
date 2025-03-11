<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ChapterController extends Controller
{
    public function show($chapter_id)
    {
        $chapter = Chapter::where('id', $chapter_id)
        ->with('media')
        ->firstOrFail();
    
    
        // Kiểm tra xem người dùng hiện tại đã vote chưa
        $hasVoted = false;
        if (Auth::check()) {
            $hasVoted = $chapter->voters()->where('user_id', Auth::id())->exists();
        }
        
        // Thêm thông tin đã vote vào dữ liệu trả về
        $chapter->has_voted = $hasVoted;

        return Inertia::render('Comic/Chapter', [
            "chapter" => $chapter,
        ]);
    }
    
    /**
     * Xử lý vote cho chapter
     */
    public function vote(Request $request, $chapter_id)
    {
        // Kiểm tra người dùng đã đăng nhập
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Bạn cần đăng nhập để vote'
            ], 401);
        }
        
        $chapter = Chapter::findOrFail($chapter_id);
        $user = Auth::user();
        
        // Kiểm tra xem người dùng đã vote chưa
        $hasVoted = $chapter->voters()->where('user_id', $user->id)->exists();
        
        if ($hasVoted) {
            // Nếu đã vote, hủy vote
            $chapter->voters()->detach($user->id);
            $chapter->decrement('vote_count');
            $message = 'Đã hủy vote thành công';
            $voted = false;
        } else {
            // Nếu chưa vote, thêm vote
            $chapter->voters()->attach($user->id);
            $chapter->increment('vote_count');
            $message = 'Đã vote thành công';
            $voted = true;
        }
        
        return response()->json([
            'message' => $message,
            'voted' => $voted,
            'vote_count' => $chapter->vote_count
        ]);
    }
}