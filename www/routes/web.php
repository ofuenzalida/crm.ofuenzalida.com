<?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\Dashboard\DashboardController;
    use App\Http\Controllers\Configuration\LanguageController;
    use App\Http\Controllers\Task\TaskController;
    use App\Http\Controllers\Configuration\PropertyController;
    use App\Http\Controllers\Configuration\OfficeController;
    use App\Http\Controllers\Property\RepairController;

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

    ///
    /// URL: /property/repair
    ///
    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Property")
         ->resource("/property/repair", RepairController::class);

    ///
    /// URL: /dashboard/
    ///
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

    ///
    /// URL: /task/paid
    ///
    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/paid", [
             TaskController::class,
             "paid",
         ]);

    ///
    /// URL: /task/{task_id}/paid
    ///
    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/{task_id}/paid", [
             TaskController::class,
             "paidTaskId",
         ]);

    ///
    /// URL: /task/paid/property
    ///
    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/paid/property", [
             TaskController::class,
             "paidProperty",
         ]);

    ///
    /// URL: /task/unpaid
    ///
    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/unpaid", [
             TaskController::class,
             "unpaid",
         ]);

    ///
    /// URL: /task/unpaid/property
    ///
    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/unpaid/property", [
             TaskController::class,
             "unpaidProperty",
         ]);


    ///
    /// URL: /task/unpaid/property/paid/{properties_id}
    ///
    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->get("/task/unpaid/property/paid/{properties_id}", [
             TaskController::class,
             "paidPropertyId",
         ]);

    ///
    /// URL: /task
    ///
    Route::middleware([
        'auth',
        'language',
    ])
         ->namespace("Task")
         ->resource("/task", TaskController::class);

    ///
    /// URL: /configuration/language/{language}
    ///
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
