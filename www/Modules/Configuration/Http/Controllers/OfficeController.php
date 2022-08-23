<?php

    namespace Modules\Configuration\Http\Controllers;

    use App\Http\Controllers\LoginController;
    use App\Models\Office;
    use Illuminate\Http\Request;
    use Auth;

    class OfficeController extends LoginController
    {

        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function index()
        {
            $this->title       = "Office List";
            $this->menu_active = "office_list";
            $this->new_title   = "New Office";
            $this->new_url     = url("configuration/office/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Configuration',
                    'url'  => url('configuration'),
                ],
                [
                    'name'   => 'Office',
                    'url'    => url('configuration/Office'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $offices = Office::all();

            return View("configuration::office.index")->with("offices", $offices);
        }

        /**
         * Show the form for creating a new resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function create()
        {
            $this->title       = "Office Create";
            $this->menu_active = "office_create";
            $this->new_title   = "New Office";
            $this->breadcrumbs = [
                [
                    'name' => 'Configuration',
                    'url'  => url('configuration'),
                ],
                [
                    'name' => 'Office',
                    'url'  => url('configuration/office'),
                ],
                [
                    'name'   => 'Create',
                    'url'    => url('configuration/office/create'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();


            return View("configuration::office.create");
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
                'name'      => 'required',
                'address'   => 'required',
                'latitude'  => 'required',
                'longitude' => 'required',
                'polygon'   => 'required',
            ]);

            $office            = new Office();
            $office->name      = $request->name;
            $office->address   = $request->address;
            $office->latitude  = $request->latitude;
            $office->longitude = $request->longitude;
            $office->polygon   = $request->polygon;
            $office->users_id  = Auth::user()->id;
            $office->save();

            return redirect('configuration/office');

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
            //
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
            //
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