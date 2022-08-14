<?php

    namespace App\Http\Controllers\Configuration;

    use App\Http\Controllers\LoginController;
    use App\Models\Office;
    use App\Models\Priority;
    use Illuminate\Http\Request;
    use Auth;


    class PriorityController extends LoginController
    {

        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function index()
        {
            $this->title       = "Priority List";
            $this->menu_active = "priority_list";
            $this->new_title   = "New Priority";
            $this->new_url     = url("configuration/priority/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Configuration',
                    'url'  => url('configuration'),
                ],
                [
                    'name'   => 'Priority',
                    'url'    => url('configuration/priority'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $priorities = Priority::all();
            $offices    = Office::all();

            return View("configuration.priority.index")->with("priorities", $priorities);
        }

        /**
         * Show the form for creating a new resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function create()
        {
            $this->title       = "Priority Create";
            $this->menu_active = "priority_create";
            $this->new_title   = "New Priority";
            $this->new_url     = url("configuration/priority/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Configuration',
                    'url'  => url('configuration'),
                ],
                [
                    'name'   => 'Priority',
                    'url'    => url('configuration/priority'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $offices = Office::all();

            return View("configuration.priority.create")->with("offices", $offices);
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
                'name' => 'required',
            ]);

            $property           = new Priority();
            $property->name     = $request->name;
            $property->users_id = Auth::user()->id;
            $property->save();

            return redirect('configuration/priority');
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

            $priority = Priority::find($id);

            $this->title       = "Priority Edit";
            $this->menu_active = "priority_list";
            $this->new_title   = "New Priority";
            $this->new_url     = url("configuration/priority/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Configuration',
                    'url'  => url('configuration'),
                ],
                [
                    'name' => 'Priority',
                    'url'  => url('configuration/priority'),
                ],
                [
                    'name'   => 'Edit',
                    'url'    => url('configuration/priority/'.$id."/edit"),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            return View("configuration.priority.edit")->with("priority", $priority);
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
                'name' => 'required',
            ]);

            $property           = Priority::find($id);
            $property->name     = $request->name;
            $property->users_id = Auth::user()->id;
            $property->save();

            return redirect('configuration/priority')->with('success', 'Item updated successfully!');
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