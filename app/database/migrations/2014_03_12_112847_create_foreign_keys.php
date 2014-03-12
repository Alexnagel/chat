<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateForeignKeys extends Migration {

	public function up()
	{
		Schema::table('messages', function(Blueprint $table) {
			$table->foreign('user_id')->references('id')->on('users')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('messages', function(Blueprint $table) {
			$table->foreign('chatroom_id')->references('id')->on('chatrooms')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('chatroom_user', function(Blueprint $table) {
			$table->foreign('user_id')->references('id')->on('users')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('chatroom_user', function(Blueprint $table) {
			$table->foreign('chatroom_id')->references('id')->on('chatrooms')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
	}

	public function down()
	{
		Schema::table('messages', function(Blueprint $table) {
			$table->dropForeign('messages_user_id_foreign');
		});
		Schema::table('messages', function(Blueprint $table) {
			$table->dropForeign('messages_chatroom_id_foreign');
		});
		Schema::table('chatroom_user', function(Blueprint $table) {
			$table->dropForeign('chatroom_user_user_id_foreign');
		});
		Schema::table('chatroom_user', function(Blueprint $table) {
			$table->dropForeign('chatroom_user_chatroom_id_foreign');
		});
	}
}