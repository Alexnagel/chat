<?php

namespace App\Models;

class Message extends Eloquent {

	protected $table = 'messages';
	public $timestamps = true;
	protected $softDelete = true;

	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}

	public function chatroom()
	{
		return $this->belongsTo('App\Models\Chatroom');
	}

}