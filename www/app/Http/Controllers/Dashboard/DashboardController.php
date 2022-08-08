<?php

    namespace App\Http\Controllers\Dashboard;

    use App\Http\Controllers\LoginController;
    use App\Models\Task;
    use Illuminate\Http\Request;
    use App\Models\User;
    use Illuminate\Support\Facades\Auth;

    class DashboardController extends LoginController
    {

        public function index()
        {
            $user = Auth::user();

            $tasks = Task::where("users_id", $user->id)
                         ->get();

            $task_paid_ok = Task::where("users_id", $user->id)
                                ->where("paid", TRUE)
                                ->get();

            $task_paid_nok = Task::where("users_id", $user->id)
                                 ->where("paid", FALSE)
                                 ->get();

            $this->menu_active = "dashboard";
            $this->loadData();

            return View("dashboard.index")
                ->with("tasks", $tasks)
                ->with("task_paid_ok", $task_paid_ok)
                ->with("task_paid_nok", $task_paid_nok);
        }
    }