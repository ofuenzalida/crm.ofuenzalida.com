<?php

    use Modules\Configuration\Http\Controllers\PropertyController;
    use Modules\Configuration\Http\Controllers\OfficeController;
    use Modules\Configuration\Http\Controllers\PriorityController;
    use Modules\Configuration\Http\Controllers\LanguageController;

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

    Route::prefix('configuration')
         ->group(function()
         {
             Route::get('/', 'ConfigurationController@index');


             ///
             /// URL: /configuration/
             ///
             Route::resources([
                 "office"   => OfficeController::class,
                 "property" => PropertyController::class,
                 "priority" => PriorityController::class,
                 "asdf"     => PropertyController::class,
             ]);


             ///
             /// URL: /configuration/language/{language}
             ///
             Route::get("/language/{language}", [
                 LanguageController::class,
                 'setLanguage',
             ]);

         });
