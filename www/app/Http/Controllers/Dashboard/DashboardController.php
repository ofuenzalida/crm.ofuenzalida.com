<?php

    namespace App\Http\Controllers\Dashboard;

    use App\Http\Controllers\LoginController;
    use Illuminate\Http\Request;
    use App\Models\User;
    use Illuminate\Support\Facades\Auth;

    class DashboardController extends LoginController
    {

        public function index()
        {
            return View("dashboard.index");
        }
    }