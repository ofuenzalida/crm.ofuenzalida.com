<?php

    namespace App\Http\Controllers\Property;

    use App\Http\Controllers\LoginController;
    use App\Models\Office;
    use App\Models\Property;
    use App\Models\Task;
    use Illuminate\Http\Request;
    use Auth;


    class RepairController extends LoginController
    {

        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function index()
        {
            $this->title       = "Property Repair List";
            $this->menu_active = "property_repair_list";
            $this->new_title   = "New Repair";
            $this->new_url     = url("property/repair/create");
            $this->breadcrumbs = [
                [
                    'name'   => 'Repair',
                    'url'    => url('property/repair'),
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


            return View("property.repair.index")
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
            $this->title       = "Property Repair Create";
            $this->menu_active = "property_repair_create";
            $this->new_title   = "Repair Create";
            $this->new_url     = url("property/repair/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Repair',
                    'url'  => url('property/repair'),
                ],
                [
                    'name'   => 'Create',
                    'url'    => url('property/repair/create'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $properties = Property::all();

            return View("property.repair.create")->with("properties", $properties);
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

            return View("task.edit")
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

            return redirect('task');
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

    }