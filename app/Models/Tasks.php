<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Categories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tasks extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'done', 'catigorie_id'];


    public function categories()
    {
        // return $this->belongsTo(Categories::class);
        return $this->belongsTo('App\Models\Categories', 'catigorie_id');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }
}
