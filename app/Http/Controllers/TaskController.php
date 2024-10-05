<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use \Illuminate\Support\Str;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        $tasks->each(function ($task) {
            $task->description = Str::limit($task->description, 150);
        });
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',
            'due_date' => 'required|date',
        ]);

        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    public function show($id)
    {
        $task = Task::with('comments.user')->findOrFail($id);
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}

