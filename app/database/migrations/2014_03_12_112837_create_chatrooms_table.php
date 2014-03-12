<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateChatroomsTable extends Migration {

	public function up()
	{
		Schema::create('chatrooms', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->string('description');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('chatrooms');
	}
}