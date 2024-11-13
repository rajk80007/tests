<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    public function create(Request $request)
    {
        $data = new Note();
        $data->title = $request->title;
        $data->content = $request->content;
        $data->save();

        return response([
            'message' => 'Note Created Successfully',
            'data' => $data
        ]);
    }

    public function notes()
    {
        $data = Note::all();
        return response([
            // 'message' => 'Connected Successfully',
            'data' => $data
        ]);
    }

    public function delete($id)
    {
        $data = Note::find($id);
        $data->delete();
        return response([
            'message' => 'Note Deleted Successfully',
            'data' => $data
        ]);
    }
}
