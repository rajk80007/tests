<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/create', [\App\Http\Controllers\NoteController::class, 'create']);

Route::get('/notes', [\App\Http\Controllers\NoteController::class, 'notes']);

Route::post('/delete/{id}', [\App\Http\Controllers\NoteController::class, 'delete']);