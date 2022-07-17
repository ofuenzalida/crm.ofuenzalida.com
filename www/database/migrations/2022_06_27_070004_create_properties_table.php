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
            Schema::create('properties', function(Blueprint $table)
            {
                $table->id();
                $table->string("name", 255);
                $table->string("address", 255);
                $table->string("latitude", 50);
                $table->string("longitude", 50);
                $table->text("polygon")
                      ->nullable();

                $table->bigInteger("users_id")
                      ->unsigned();

                $table->bigInteger("offices_id")
                      ->unsigned();

                $table->foreign('users_id')
                      ->references('id')
                      ->on('users');

                $table->foreign('offices_id')
                      ->references('id')
                      ->on('offices');

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
            Schema::dropIfExists('properties');
        }
    };
