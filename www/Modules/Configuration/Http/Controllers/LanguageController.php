<?php

    namespace Modules\Configuration\Http\Controllers;

    use App\Http\Controllers\LoginController;
    use Illuminate\Http\Request;
    use App\Models\User;
    use Illuminate\Support\Facades\Auth;

    class LanguageController extends LoginController
    {

        public function setLanguage($language)
        {
            $users_id = Auth::user()->id;

            $user            = User::find($users_id);
            $user->user_lang = strtolower(trim($language));
            $user->save();

            return redirect("dashboard");
        }
    }