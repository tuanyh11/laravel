<?php

use App\Models\Comic;
use App\Models\Genres;
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
        Schema::create('comic_genres', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Comic::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Genres::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comic_genres', function (Blueprint $table) {
        $table->dropForeign(['comic_id']); // Xóa khóa ngoại comic_id
        $table->dropForeign(['genres_id']); // Xóa khóa ngoại genres_id
    });
        Schema::dropIfExists('comic_genres');
    }
};
