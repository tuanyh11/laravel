<?php
// routes/api.php
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth')->group(function () {
//     // Chapter comments routes
    Route::get('/chapter/{chapter_id}/comments', [CommentController::class, 'index'])->name('chapter.comment');
    Route::post('/chapter/{chapter_id}/comments', [CommentController::class, 'store'])->name('chapter.comment.store');
    
    // Added routes for comment replies
    Route::get('/comments/{comment_id}/replies', [CommentController::class, 'getReplies'])->name('comment.replies');
    
    // Generic comments endpoint for creating both comments and replies
    Route::post('/comments', [CommentController::class, 'storeComment'])->name('comments.store');
// });