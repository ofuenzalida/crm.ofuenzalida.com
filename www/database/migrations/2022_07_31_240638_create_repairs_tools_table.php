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
            Schema::create('repairs_tools', function(Blueprint $table)
            {
                $table->id();
                $table->string("name", 255);
                $table->text("description")
                      ->nullable();

                $table->bigInteger("repairs_id")
                      ->unsigned();

                $table->bigInteger("users_id")
                      ->unsigned();

                $table->bigInteger("priorities_id")
                      ->nullable();

                $table->foreign('repairs_id')
                      ->references('id')
                      ->on('repairs');

                $table->foreign('users_id')
                      ->references('id')
                      ->on('users');

                $table->foreign('priorities_id')
                      ->references('id')
                      ->on('priorities');

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
            Schema::dropIfExists('repairs_tools');
        }
    };
