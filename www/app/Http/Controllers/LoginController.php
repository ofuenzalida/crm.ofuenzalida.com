<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Models\User;
    use Illuminate\Support\Facades\Auth;
    use View;
    use App;

    class LoginController extends Controller
    {

        protected $data;
        protected $user;
        public    $log;

        /**
         * $isDebugInfo _> todo controlador que herede a esta clase,
         * debe poder controlar si imprimira en el Log información de Log::Info
         */
        protected $isDebugInfo = TRUE;

        /**
         * $isDebugError _> todo controlador que herede a esta clase,
         * debe poder controlar si imprimira en el Log Error de Log::Error
         */
        protected $isDebugError = TRUE;

        /**
         * $isDebugCatch _> todo controlador que herede a esta clase,
         * debe poder controlar si imprimira en el Log Error un try Catch
         */
        protected $isDebugCatch = TRUE;

        public function __construct(Request $request)
        {
            $this->user = Auth::user();
            $this->data = request()->all();
            ///dd($request);
            ///dd($this->user);
            View::share('user', $this->user);
            View::share('request', $this->data);
            App::setLocale($this->user->user_lang ?? "en");
        }

        public function user(): void
        {
            $this->user = Auth::user();
            $this->data = request()->all();
            ///dd($request);
            ///dd($this->user);
            View::share('user', $this->user);
            View::share('request', $this->data);
            App::setLocale($this->user->user_lang ?? "en");
        }
    }
