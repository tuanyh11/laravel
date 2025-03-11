<?php

use App\Http\Controllers\API\CommentController as APICommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ComicController; // Ensure this class exists in the specified namespace
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Comic;
use App\Models\Genres;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Broadcast::routes(['middleware' => ['web', 'auth:admin']]);
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    $comics = Comic::with(['author' => function ($query) {
        $query->select('id', 'name');
    }])
        ->with('thumbnail')
        ->paginate(10);
    $genres = Genres::all();

    return Inertia::render('Home', [
        'comics' => $comics,
        'genres' => $genres,
    ]);
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logout', [ProfileController::class, 'logout'])->name('logout');
});

Route::middleware('auth')->group(function () {
    Route::get('/comic/{slug}', [ComicController::class, 'show'])->name('comic.show');

    // Chapter routes with Inertia
    Route::get('/comic/{slug}/chapter/{chapter_id}', [ChapterController::class, 'show'])
        ->name('chapter.show');

    // Comment routes for Inertia
    Route::get('/chapter/{chapter_id}/comments', [APICommentController::class, 'getChapterComments'])
        ->name('chapter.comment');
    Route::post('/chapter/{chapter_id}/comments', [CommentController::class, 'store'])
        ->name('chapter.comment.store');
    Route::post('/chapters/{chapter_id}/vote', [ChapterController::class, 'vote'])->name('chapters.vote');
});

// Route::middleware('auth')->group(function() {
//     Route::get('/user/{user_id}/profile', )
// });

require __DIR__ . '/auth.php';
