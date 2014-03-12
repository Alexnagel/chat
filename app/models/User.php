<?php

namespace App\Models;

class User extends Eloquent {

	protected $table = 'users';
	public $timestamps = true;
	protected $softDelete = true;

	public function messages()
	{
		return $this->hasMany('App\Models');
	}

	public function chatrooms()
	{
		return $this->belongsToMany('Chatroom');
	}

}