<?php

use App\Http\Controllers\API\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ComicController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Comic search API endpoint
Route::get('/comics/search', [ComicController::class, 'search']);

Route::get('/comics/recommendations', [ComicController::class, 'getRecommendations']);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Notification Routes
// Route::middleware('auth')->group(function () {
// Route::get('/notifications', [NotificationController::class, 'index']);
// Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);
// Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);
// });
