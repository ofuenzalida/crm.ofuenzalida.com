<?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('repairs_items_files', function(Blueprint $table)
            {
                $table->id();
                $table->string('name')
                      ->nullable();
                $table->string('file_path')
                      ->nullable();

                $table->bigInteger("users_id")
                      ->unsigned();

                $table->bigInteger("properties_id")
                      ->unsigned();


                $table->foreign('users_id')
                      ->references('id')
                      ->on('users');

                $table->foreign('properties_id')
                      ->references('id')
                      ->on('properties');


                $table->timestamps();
                $table->softDeletes();
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::dropIfExists('repairs_items_files');
        }
    };
