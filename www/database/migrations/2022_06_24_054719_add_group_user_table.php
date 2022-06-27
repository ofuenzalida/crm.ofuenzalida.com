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
            Schema::table('users', function(Blueprint $table)
            {

                /**
                 * Users:
                 * 0 => User
                 * 1 => Super Admin
                 * 2 => Manager
                 * 69 =>Ofuenzalida
                 */

                $table->string("group_name")
                      ->default("User");
                $table->integer("group_id")
                      ->default(0);

                $table->string("user_lang")
                      ->default("en");
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::table('users', function(Blueprint $table)
            {
                //
            });
        }
    };
