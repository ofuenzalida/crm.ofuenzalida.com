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
            Schema::table('properties', function(Blueprint $table)
            {
                $table->boolean("has_lawn")
                      ->default(FALSE);

                $table->boolean("has_sprinklers")
                      ->default(FALSE);

                $table->boolean("has_apartments")
                      ->default(FALSE);

            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::table('properties', function(Blueprint $table)
            {

            });
        }
    };
