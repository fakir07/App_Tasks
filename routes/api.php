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
Route::get('categorieshasTasks', [CategoriesController::class, 'index']);
Route::get('categoriesAll', [CategoriesController::class, 'getAllcategories']);
Route::post('tasks', [TasksController::class, 'store']);
Route::get('tasks/{tasks}', [TasksController::class, 'show']);
Route::put('tasks/{tasks}', [TasksController::class, 'update']);
Route::delete('tasks/{id}', [TasksController::class, 'destroy']);
Route::get('categories/{categories}/tasks', [TasksController::class, 'getByCatigories']);
Route::get('orderbyId/{direction}/tasks', [TasksController::class, 'getTasksOrderById']);
Route::get('orderbyTitle/{direction}/tasks', [TasksController::class, 'getTasksOrderByTitle']);
Route::get('rechercher/{term}/tasks', [TasksController::class, 'getTasksByterm']);
