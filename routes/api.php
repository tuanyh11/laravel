<?php 
// routes/api.php
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {
    Route::get('/chapter/{chapter_id}/comments', [CommentController::class, 'index'])->name('chapter.comment');
    Route::post('/chapter/{chapter_id}/comments', [CommentController::class, 'store'])->name('chapter.comment.store');
});
; ?>