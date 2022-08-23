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

    use Modules\Task\Http\Controllers\TaskController;
    use Modules\Task\Http\Controllers\PaidController;
    use Modules\Task\Http\Controllers\UnPaidController;

    Route::middleware([
        'auth',
        'language',
    ])
         ->prefix('task')
         ->group(function()
         {
             ///
             /// URL: /task
             ///
             ///Route::resource("/", TaskController::class);

             ///
             /// URL: /task
             ///
             Route::get("/", [
                 TaskController::class,
                 "index",
             ]);

             ///
             /// URL: /task/create
             ///
             Route::get("/create", [
                 TaskController::class,
                 "create",
             ]);

             ///
             /// URL: /task
             ///
             Route::post("/", [
                 TaskController::class,
                 "store",
             ]);

             ///
             /// URL: /task/{task_id}
             ///
             Route::get("/{task_id}", [
                 TaskController::class,
                 "show",
             ]);

             ///
             /// URL: /task/{task_id}
             ///
             Route::delete("/{task_id}", [
                 TaskController::class,
                 "destroy",
             ]);

             ///
             /// URL: /task/{task_id}
             ///
             Route::get("/{task_id}/edit", [
                 TaskController::class,
                 "edit",
             ]);

             ///
             /// URL: /task/{task_id}
             ///
             Route::put("/{task_id}", [
                 TaskController::class,
                 "update",
             ]);


             ///
             /// URL: /task/{task_id}/paid
             ///
             Route::get("/{task_id}/paid", [
                 TaskController::class,
                 "paidTaskId",
             ]);

             ///
             /// URL: /task/paid/list
             ///
             Route::get("/paid/list", [
                 PaidController::class,
                 "list",
             ]);

             ///
             /// URL: /task/paid/property
             ///
             Route::get("/paid/property", [
                 PaidController::class,
                 "listProperty",
             ]);

             ///
             /// URL: /task/unpaid
             ///
             Route::get("/unpaid/list", [
                 UnPaidController::class,
                 "list",
             ]);

             ///
             /// URL: /task/unpaid/property
             ///
             Route::get("/unpaid/property", [
                 UnPaidController::class,
                 "listProperty",
             ]);


             ///
             /// URL: /task/unpaid/property/paid/{properties_id}
             ///
             Route::get("/unpaid/property/paid/{properties_id}", [
                 TaskController::class,
                 "paidPropertyId",
             ]);

         });
