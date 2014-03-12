<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateChatroomUserTable extends Migration {

	public function up()
	{
		Schema::create('chatroom_user', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->integer('chatroom_id')->unsigned();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('chatroom_user');
	}
}