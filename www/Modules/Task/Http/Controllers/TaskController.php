<?php

    namespace Modules\Task\Http\Controllers;


    use App\Http\Controllers\LoginController;
    use App\Models\Office;
    use App\Models\Property;
    use App\Models\Task;
    use Illuminate\Http\Request;
    use Auth;


    class TaskController extends LoginController
    {

        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function index()
        {
            $this->title       = "Task List";
            $this->menu_active = "task_list";
            $this->new_title   = "New Task";
            $this->new_url     = url("task/create");
            $this->breadcrumbs = [
                [
                    'name'   => 'Task',
                    'url'    => url('task'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $tasks = Task::where("users_id", Auth::user()->id)
                         ->get();

            $task_paid_ok = Task::where("users_id", Auth::user()->id)
                                ->where("paid", TRUE)
                                ->get();

            $task_paid_nok = Task::where("users_id", Auth::user()->id)
                                 ->where("paid", FALSE)
                                 ->get();


            return View("task::index")
                ->with("tasks", $tasks)
                ->with("task_paid_ok", $task_paid_ok)
                ->with("task_paid_nok", $task_paid_nok);
        }

        /**
         * Show the form for creating a new resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function create()
        {
            $this->title       = "Task Create";
            $this->menu_active = "task_create";
            $this->new_title   = "Task Create";
            $this->new_url     = url("task/create");
            $this->breadcrumbs = [
                [
                    'name'   => 'Task',
                    'url'    => url('task'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $properties = Property::all();

            return View("task::create")->with("properties", $properties);
        }

        /**
         * Store a newly created resource in storage.
         *
         * @param \Illuminate\Http\Request $request
         *
         * @return \Illuminate\Http\Response
         */
        public function store(Request $request)
        {
            $validated = $request->validate([
                'hour'             => 'required',
                'usd'              => 'required',
                'date'             => 'required',
                'description_work' => 'required',
                ///'description_tool' => 'required',
                'properties_id'    => 'required',
            ]);

            $task                   = new Task();
            $task->hour             = $request->hour;
            $task->usd              = $request->usd;
            $task->description_work = $request->description_work;
            $task->description_tool = $request->description_tool;
            $task->date             = $request->date;
            $task->paid             = ($request->paid == "on" ? TRUE : FALSE);
            $task->users_id         = Auth::user()->id;
            $task->properties_id    = $request->properties_id;
            $task->save();

            return redirect('task');
        }

        /**
         * Display the specified resource.
         *
         * @param int $id
         *
         * @return \Illuminate\Http\Response
         */
        public function show($id)
        {
            //
        }

        /**
         * Show the form for editing the specified resource.
         *
         * @param int $id
         *
         * @return \Illuminate\Http\Response
         */
        public function edit($id)
        {
            $task = Task::find($id);

            $this->title       = "Task Edit";
            $this->menu_active = "task_create";
            $this->new_title   = "Task Edit";
            $this->breadcrumbs = [
                [
                    'name' => 'Task',
                    'url'  => url('task'),
                ],
                [
                    'name'   => 'Task',
                    'url'    => url('task/').$id."/edit",
                    'active' => TRUE,
                ],
            ];

            $this->loadData();

            $properties = Property::orderBy('address')
                                  ->get();

            return View("task::edit")
                ->with("properties", $properties)
                ->with("task", $task);

        }

        /**
         * Update the specified resource in storage.
         *
         * @param \Illuminate\Http\Request $request
         * @param int                      $id
         *
         * @return \Illuminate\Http\Response
         */
        public function update(Request $request, $id)
        {
            $validated = $request->validate([
                'hour'             => 'required',
                'usd'              => 'required',
                'date'             => 'required',
                'description_work' => 'required',
                ///'description_tool' => 'required',
                'properties_id'    => 'required',
            ]);

            $task                   = Task::find($id);
            $task->hour             = $request->hour;
            $task->usd              = $request->usd;
            $task->description_work = $request->description_work;
            $task->description_tool = $request->description_tool;
            $task->date             = $request->date;
            $task->paid             = ($request->paid == "on" ? TRUE : FALSE);
            $task->users_id         = Auth::user()->id;
            $task->properties_id    = $request->properties_id;
            $task->save();

            return redirect('task')->with("success", "Updated item...");
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param int $id
         *
         * @return \Illuminate\Http\Response
         */
        public function destroy($id)
        {
            //
        }

        public function paid()
        {
            dd($_SERVER);
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

        public function unpaid()
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


        public function paidProperty()
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

        public function unpaidProperty()
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

        public function paidPropertyId($properties_id = NULL)
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