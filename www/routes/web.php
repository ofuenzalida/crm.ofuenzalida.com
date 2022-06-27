<?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\Dashboard\DashboardController;
    use  App\Http\Controllers\Configuration\LanguageController;

    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | contains the "web" middleware group. Now create something great!
    |
    */

    Route::get('/', function()
    {
        return view('welcome');
    });

    /*
    Route::get('/dashboard', function()
    {
        return view('dashboard');
    })
         ->middleware(['auth'])
         ->name('dashboard');
*/

    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Dashboard")
         ->prefix("dashboard")
         ->group(function()
         {
             Route::get("/", [
                 DashboardController::class,
                 'index',
             ])
                  ->middleware(["auth"])
                  ->name("dashboard");

         });

    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Configuration")
         ->prefix("configuration")
         ->group(function()
         {
             Route::get("/language/{language}", [
                 LanguageController::class,
                 'setLanguage',
             ])
                  ->middleware(["auth"])
                  ->name("dashboard");

         });


    ///
    /// URL:  /home
    ///
    /*
    Route::group([
        'prefix'     => 'dashboard',
        'namespace'  => 'Dashboard',
        'middleware' => [
            'auth',
        ],
    ], function()
    {

        Route::get("/", [
            DashboardController::class,
            'index',
        ])
             ->middleware(["auth"])
             ->name("dashboard");

    });
    */


    require __DIR__.'/auth.php';
