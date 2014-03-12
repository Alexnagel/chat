<?php namespace App\Models;

class ChatroomUser extends Eloquent {

	protected $table = 'chatroom_user';
	public $timestamps = true;
	protected $softDelete = false;

}