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
            Schema::table('repairs_items', function(Blueprint $table)
            {
                $table->boolean("completed")
                      ->nullable()
                      ->default(FALSE);

                $table->date("completed_date")
                      ->nullable();

                $table->bigInteger("completed_users_id")
                      ->unsigned()
                      ->nullable();

                $table->foreign('completed_users_id')
                      ->references('id')
                      ->on('users');
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::table('repairs_items', function(Blueprint $table)
            {

            });
        }
    };
