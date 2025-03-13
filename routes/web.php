<?php

use App\Http\Controllers\API\CommentController as APICommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ComicController; // Ensure this class exists in the specified namespace
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\VNPayController;
use App\Http\Controllers\WalletController;
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
// Routes/web.php - Updated Route for Welcome page

// Routes/web.php - Updated Route for Welcome page

Route::get('/', function () {
    // Set default values to prevent potential null reference errors
    // Get featured comics with author info and thumbnail
    $featuredComics = Comic::with(['author' => function ($query) {
        $query->select('id', 'name', 'avatar');
    }])
    ->with('thumbnail')
    ->with('genres')
    ->orderBy('read_count', 'desc')
    ->take(5)
    ->get()
    ->map(function ($comic) {
        // Ensure read_count and vote_count are always defined
        $comic->read_count = $comic->read_count ?? 0;
        $comic->vote_count = $comic->vote_count ?? 0;
        return $comic;
    });

    // Get comics by popularity (most read)
    $popularComics = Comic::with(['author' => function ($query) {
        $query->select('id', 'name');
    }])
    ->with('thumbnail')
    ->orderBy('read_count', 'desc')
    ->take(6)
    ->get()
    ->map(function ($comic) {
        // Ensure read_count and vote_count are always defined
        $comic->read_count = $comic->read_count ?? 0;
        $comic->vote_count = $comic->vote_count ?? 0;
        return $comic;
    });

    // Get comics by genre groups
    $genres = Genres::with(['comics' => function ($query) {
        $query->with(['author' => function ($q) {
            $q->select('id', 'name');
        }])
        ->with('thumbnail')
        ->take(5);
    }])
    ->take(4)
    ->get();
    
    // Ensure all comics in genres have read_count and vote_count defined
    $genres = $genres->map(function ($genre) {
        if ($genre->comics) {
            $genre->comics = $genre->comics->map(function ($comic) {
                $comic->read_count = $comic->read_count ?? 0;
                $comic->vote_count = $comic->vote_count ?? 0;
                return $comic;
            });
        }
        return $genre;
    });

    // Get latest comics
    $latestComics = Comic::with(['author' => function ($query) {
        $query->select('id', 'name');
    }])
    ->with('thumbnail')
    ->latest()
    ->take(5)
    ->get()
    ->map(function ($comic) {
        // Ensure read_count and vote_count are always defined
        $comic->read_count = $comic->read_count ?? 0;
        $comic->vote_count = $comic->vote_count ?? 0;
        return $comic;
    });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'featuredComics' => $featuredComics,
        'popularComics' => $popularComics,
        'genreGroups' => $genres,
        'latestComics' => $latestComics,
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
    Route::post('/chapter/{chapter_id}/comments', [CommentController::class, 'store'])
        ->name('chapter.comment.store');
    Route::post('/chapters/{chapter_id}/vote', [ChapterController::class, 'vote'])->name('chapters.vote');


    Route::get('/chapter/{chapter_id}/comments', [APICommentController::class, 'index'])->name('chapter.comments');
    Route::post('/chapter/{chapter_id}/comments', [APICommentController::class, 'store'])->name('chapter.comment.store');
    
    // Added routes for comment replies
    Route::get('/comments/{comment_id}/replies', [APICommentController::class, 'getReplies'])->name('comments.replies');
    
    Route::get('/comments/{comment_id}', [APICommentController::class, 'show'])->name('comments.get');
    // Generic comments endpoint for creating both comments and replies
});


Route::prefix('payment/vnpay')->name('payment.vnpay.')->middleware(['auth'])->group(function () {
    Route::post('/create-wallet-payment', [VNPayController::class, 'createPaymentForWallet'])
        ->name('create-wallet-payment');
    
    Route::post('/create-chapter-payment/{chapter}', [VNPayController::class, 'createPaymentForChapter'])
        ->name('create-chapter-payment');
    
    Route::get('/return', [VNPayController::class, 'handleReturnUrl'])
        ->name('return');
});

Route::get('/payment/failed', [VNPayController::class, 'showFailedPage'])
    ->name('payment.failed');



Route::middleware(['auth'])->group(function () {
    Route::prefix('wallet')->name('wallet.')->group(function () {
        Route::get('/', [WalletController::class, 'index'])->name('index');
        Route::get('/add-funds', [WalletController::class, 'showAddFunds'])->name('add-funds');
        Route::post('/process-add-funds', [WalletController::class, 'processAddFunds'])->name('process-add-funds');
        Route::get('/purchases', [WalletController::class, 'purchasedChapters'])->name('purchases');
    });

    // VNPay routes - applying auth middleware here
    Route::prefix('payment/vnpay')->name('payment.vnpay.')->group(function () {
        Route::post('/create-wallet-payment', [VNPayController::class, 'createPaymentForWallet'])->name('create-wallet-payment');
        Route::post('/create-chapter-payment/{chapter}', [VNPayController::class, 'createPaymentForChapter'])->name('create-chapter-payment');
        Route::get('/return', [VNPayController::class, 'handleReturnUrl'])->name('return');
    });

    Route::get('/payment/failed', [VNPayController::class, 'showFailedPage'])->name('payment.failed');
    Route::get('/payment/success', [VNPayController::class, 'showSuccessPage'])->name('payment.success');

    Route::post('/chapters/{chapter_id}/purchase', [ChapterController::class, 'purchaseWithWallet'])
    ->name('chapters.purchase-with-wallet');
});

require __DIR__ . '/auth.php';
