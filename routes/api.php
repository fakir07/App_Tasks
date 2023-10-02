<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\CategoriesController;

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

Route::get('tasks', [TasksController::class, 'index']);
Route::get('categories', [CategoriesController::class, 'index']);
Route::post('tasks', [TasksController::class, 'store']);
Route::get('tasks/{id}', [TasksController::class, 'show']);
Route::put('tasks/{id}', [TasksController::class, 'update']);
Route::delete('tasks', [TasksController::class, 'destroy']);
Route::get('categories/{categories}/tasks', [TasksController::class, 'getByCatigories']);
// Route::get('asq/{categories}/id', [TasksController::class, 'getByCatigories']);
Route::get('search/{term}/id', [TasksController::class, 'getTasksByterm']);
Route::get('orderBy/{column}{direction}/id', [TasksController::class, 'getTasksOrderBy']);
