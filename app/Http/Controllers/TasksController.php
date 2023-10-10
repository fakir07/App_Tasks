<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use App\Models\Categories;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Console\View\Components\Task;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Tasks::with('categories')->paginate(5);
        // $tasks = Tasks::all();
        // return $tasks;
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'title' => 'required|min:5',
            'description' => 'required|max:200',
            'catigorie_id' => 'required',
        ], [
            'title.required' => 'title is required',
            'description.required' => 'description is required',
            'catigorie_id.required' => 'catigorie is required'

        ]);
        if ($validate->fails()) {
            // return back()->withErrors($validate->errors());
            return response()->json(['errors' => $validate->errors()], 422);
        }

        $tasks = new Tasks();
        $tasks->title = $request->title;
        $tasks->description = $request->description;
        $tasks->catigorie_id = $request->catigorie_id;
        $tasks->save();
        return $tasks;
    }


    public function show(Tasks $tasks, $id)
    {
        $tasks = Tasks::where('id', $id)->first();
        return $tasks;
    }


    public function edit(Tasks $tasks)
    {
        //
    }


    public function update(Request $request, Tasks $tasks)
    {
        // $tasks = Tasks::where('id', $request->request)->get();
        // $tasks->title = $request->title;
        // $tasks->description = $request->description;
        // $tasks->catigorie_id = $request->catigorie_id;
        // $tasks->done = $request->done;
        // $tasks->save();
        // $validate = Validator::make($request->all(), [
        //     'title' => 'required|min:5',
        //     'description' => 'required|max:200',
        //     'catigorie_id' => 'required',
        // ]);
        // if ($validate->fails()) {
        //     return back()->withErrors($validate->errors())->withInput();
        // }

        $tasks->update([
            'title' => $request->title,
            'description' => $request->description,
            'catigorie_id' => $request->catigorie_id,
            'done' => $request->done,
        ]);
        return $tasks;
    }


    public function destroy(Tasks $tasks, $id)
    {
        $tasks = Tasks::where('id', $id)->first();
        $tasks->delete();
        return ['message' => 'your tasks hase ben removed'];
    }

    public function getByCatigories(Categories $categories)
    {
        $tasks = $categories->tasks()->with("categories")->paginate(3);
        return $tasks;
    }


    public  function getTasksOrderById($direction)
    {
        $tasks = Tasks::with('categories')->orderBy('id', $direction)->paginate(5);
        return $tasks;
    }
    public  function getTasksOrderByTitle($direction)
    {
        $tasks = Tasks::with('categories')->orderBy('title', $direction)->paginate(5);
        return $tasks;
    }

    public function getTasksByterm($term)
    {
        $tasks = Tasks::with('categories')
            ->where('title', 'like', '%' . $term . '%')
            ->orWhere('description', 'like', '%' . $term . '%')
            ->orWhere('id', 'like', '%' . $term . '%')
            ->paginate(5);
        return $tasks;
    }
}
