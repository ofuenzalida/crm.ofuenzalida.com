<?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\Dashboard\DashboardController;
    use App\Http\Controllers\Configuration\LanguageController;
    use App\Http\Controllers\Task\TaskController;
    use App\Http\Controllers\Configuration\PropertyController;
    use App\Http\Controllers\Configuration\OfficeController;

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
         ->namespace("Task")
         ->get("/task/paid", [
             TaskController::class,
             "paid",
         ]);

    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/{task_id}/paid", [
             TaskController::class,
             "paidTaskId",
         ]);

    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/paid/property", [
             TaskController::class,
             "paidProperty",
         ]);

    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/unpaid", [
             TaskController::class,
             "unpaid",
         ]);

    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/unpaid/property", [
             TaskController::class,
             "unpaidProperty",
         ]);


    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/unpaid/property/paid/{properties_id}", [
             TaskController::class,
             "paidPropertyId",
         ]);


    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->resource("/task", TaskController::class);


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
    /// URL: /configuration/
    ///
    Route::resources([
        "configuration/office"   => OfficeController::class,
        "configuration/property" => PropertyController::class,
        "configuration/asdf"     => PropertyController::class,
    ]);

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
