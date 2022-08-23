<?php

    namespace Modules\Task\Http\Controllers;


    use App\Http\Controllers\LoginController;
    use App\Models\Office;
    use App\Models\Property;
    use App\Models\Task;
    use Illuminate\Http\Request;
    use Auth;


    class PaidController extends LoginController
    {

        public function list()
        {
            $this->title       = "Task List / Paid";
            $this->menu_active = "task_paid";
            $this->new_title   = "New Task";
            $this->new_url     = url("task/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Task',
                    'url'  => url('task'),
                ],
                [
                    'name'   => 'Paid',
                    'url'    => url('task/paid/list'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $tasks = Task::where("users_id", Auth::user()->id)
                         ->where("paid", TRUE)
                         ->get();

            return View("task::paid")->with("tasks", $tasks);
        }

        public function listProperty()
        {
            $this->title       = "Task List / Paid / Property";
            $this->menu_active = "task_paid_property";
            $this->new_title   = "New Task";
            $this->new_url     = url("task/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Task',
                    'url'  => url('task'),
                ],
                [
                    'name' => 'Paid',
                    'url'  => url('task/paid/list'),
                ],
                [
                    'name'   => 'Property',
                    'url'    => url('task/paid/property'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $tasks = Task::where("users_id", Auth::user()->id)
                         ->where("paid", TRUE)
                         ->get();

            return View("task::paid_property")->with("tasks", $tasks);
        }

        public function listPropertyId($properties_id = NULL)
        {

            $tasks = Task::where("properties_id", $properties_id)
                         ->where("paid", FALSE)
                         ->get();


            $property = Property::find($properties_id);

            foreach($tasks as $task)
            {
                $task->paid_date = date("Y-m-d");
                $task->paid      = TRUE;
                $task->save();
            }

            return redirect('task')->with("success", "Paid succcess, Property: ".$property->name);
        }

        public function paidTaskId($task_id = NULL)
        {
            $task            = Task::find($task_id);
            $property        = Property::find($task->properties_id);
            $task->paid_date = date("Y-m-d");
            $task->paid      = TRUE;
            $task->save();

            return redirect('task')->with("success", "Paid succcess, Property: ".$property->name."<br/> Task:".$task->description_work);
        }
    }