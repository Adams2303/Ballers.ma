<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPassController;
use App\Http\Controllers\ProfileController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/check-password', [ProfileController::class, 'checkPassword']);
    Route::post('/profile/update-password', [ProfileController::class, 'updatePassword']);
    Route::delete('/profile', [ProfileController::class, 'delete']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [ForgotPassController::class, 'forgotPassword'])
    ->middleware('guest');
Route::post('/reset-password', [ProfileController::class, 'updatePassword'])
    ->middleware('guest');
