<?php

    namespace Modules\Task\Http\Controllers;


    use App\Http\Controllers\LoginController;
    use App\Models\Office;
    use App\Models\Property;
    use App\Models\Task;
    use Illuminate\Http\Request;
    use Auth;


    class UnPaidController extends LoginController
    {

        public function list()
        {
            $this->title       = "Task List / Unpaid";
            $this->menu_active = "task_unpaid";
            $this->new_title   = "New Task";
            $this->new_url     = url("task/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Task',
                    'url'  => url('task'),
                ],
                [
                    'name'   => 'Unpaid',
                    'url'    => url('task/unpaid/list'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $tasks = Task::where("users_id", Auth::user()->id)
                         ->where("paid", FALSE)
                         ->get();

            return View("task::unpaid")->with("tasks", $tasks);
        }


        public function listProperty()
        {
            $this->title       = "Task List / Unpaid / Property";
            $this->menu_active = "task_unpaid_property";
            $this->new_title   = "New Task";
            $this->new_url     = url("task/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Task',
                    'url'  => url('task'),
                ],
                [
                    'name' => 'Unpaid',
                    'url'  => url('task/unpaid/list'),
                ],
                [
                    'name'   => 'Property',
                    'url'    => url('task/unpaid/property'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $tasks = Task::where("users_id", Auth::user()->id)
                         ->where("paid", FALSE)
                         ->get();

            return View("task::unpaid_property")->with("tasks", $tasks);
        }

    }