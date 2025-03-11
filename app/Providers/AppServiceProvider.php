<?php

namespace App\Providers;

use Filament\Support\Assets\Js;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        // FilamentAsset::register([
        //     Js::make('alpine-ui', 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js')
        // ]);
    }
}
