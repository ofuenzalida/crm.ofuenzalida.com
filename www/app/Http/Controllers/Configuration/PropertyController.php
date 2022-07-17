<?php

    namespace App\Http\Controllers\Configuration;

    use App\Http\Controllers\LoginController;
    use App\Models\Office;
    use App\Models\Property;
    use Illuminate\Http\Request;
    use Auth;


    class PropertyController extends LoginController
    {

        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function index()
        {
            $this->title       = "Property List";
            $this->menu_active = "property_list";
            $this->new_title   = "New Property";
            $this->new_url     = url("configuration/property/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Configuration',
                    'url'  => url('configuration'),
                ],
                [
                    'name'   => 'Property',
                    'url'    => url('configuration/property'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $properties = Property::all();

            return View("configuration.property.index")->with("properties", $properties);
        }

        /**
         * Show the form for creating a new resource.
         *
         * @return \Illuminate\Http\Response
         */
        public function create()
        {
            $this->title       = "Property Create";
            $this->menu_active = "property_create";
            $this->new_title   = "New Property";
            $this->new_url     = url("configuration/property/create");
            $this->breadcrumbs = [
                [
                    'name' => 'Configuration',
                    'url'  => url('configuration'),
                ],
                [
                    'name'   => 'Property',
                    'url'    => url('configuration/property'),
                    'active' => TRUE,
                ],
            ];
            $this->loadData();

            $offices = Office::all();

            return View("configuration.property.create")->with("offices", $offices);
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
                'offices_id' => 'required',
                'name'       => 'required',
                'address'    => 'required',
                'latitude'   => 'required',
                'longitude'  => 'required',
                'polygon'    => 'required',
            ]);

            $property             = new Property();
            $property->name       = $request->name;
            $property->address    = $request->address;
            $property->latitude   = $request->latitude;
            $property->longitude  = $request->longitude;
            $property->polygon    = $request->polygon;
            $property->users_id   = Auth::user()->id;
            $property->offices_id = $request->offices_id;
            $property->save();

            return redirect('configuration/property');
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