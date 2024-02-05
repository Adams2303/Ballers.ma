<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->binary('profile_picture')->nullable();
            $table->string('team')->nullable();
            $table->date('birthday')->nullable();
            $table->longText('bio')->nullable();
            $table->string('city')->nullable();
            $table->string('main_role')->nullable();
            $table->string('secondary_role')->nullable();
            $table->string('preferred_foot')->nullable();
            $table->integer('height')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
