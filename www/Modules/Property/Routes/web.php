<?php

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

    use Modules\Property\Http\Controllers\RepairController;

    Route::prefix('property')
         ->group(function()
         {
             Route::get('/', 'PropertyController@index');


             ///
             /// URL: /repair
             ///
             Route::resource("/repair", RepairController::class);


             ///
             /// URL: /repair/item/delete/{$id_item}
             ///
             Route::get("/repair/item/delete/{id_item}", [
                 RepairController::class,
                 "deleteItem",
             ]);

         });
