<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'description', 'status', 'due_date', 'title'
    ];

    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
