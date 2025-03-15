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
       Schema::create('read_histories', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('chapter_id')->constrained()->onDelete('cascade');
        $table->foreignId('comic_id')->constrained()->onDelete('cascade');
        $table->timestamp('last_read_at');
        $table->timestamps();
        
        // Tạo unique key để đảm bảo mỗi user chỉ có một bản ghi cho mỗi chapter
        $table->unique(['user_id', 'chapter_id']);
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('read_histories');
    }
};
