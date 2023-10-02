<?php

namespace App\Models;

use App\Models\Tasks;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categories extends Model
{
    use HasFactory;
    protected $fillable = ['name'];


    public function  tasks()
    {
        // return $this->hasMany('App\Models\Tasks');
        return $this->hasMany('App\Models\Tasks', 'catigorie_id');
        // return $this->hasMany(Tasks::class);
    }
}
