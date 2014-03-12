<?php namespace App\Models;

class Chatroom extends Eloquent {

	protected $table = 'chatrooms';
	public $timestamps = true;
	protected $softDelete = false;

	public function users()
	{
		return $this->belongsToMany('App\Models\User');
	}

	public function messages()
	{
		return $this->hasMany('App\Models\Message');
	}

}