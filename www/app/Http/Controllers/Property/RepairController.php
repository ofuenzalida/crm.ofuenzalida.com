<?php

    namespace App\Http\Controllers\Property;

    use App\Http\Controllers\LoginController;
    use App\Models\Office;
    use App\Models\Priority;
    use App\Models\Property;
    use App\Models\Repair;
    use App\Models\RepairsItem;
    use App\Models\Task;
    use App\Models\User;
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

            $users   = User::all();
            $repairs = Repair::all();


            return View("property.repair.index")
                ->with("users", $users)
                ->with("repairs", $repairs);
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
            $users      = User::all();
            $priorities = Priority::all();

            return View("property.repair.create")
                ->with("properties", $properties)
                ->with("users", $users)
                ->with("priorities", $priorities);
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
            ///dd($request);
            $validated = $request->validate([
                'name'                 => 'required',
                'date_start'           => 'required',
                'date_end'             => 'required',
                'description'          => 'required',
                'users_id_responsible' => 'required',
                'properties_id'        => 'required',
            ]);

            $repair                       = new Repair();
            $repair->name                 = $request->name;
            $repair->date_start           = $request->date_start;
            $repair->date_end             = $request->date_end;
            $repair->description          = $request->description;
            $repair->users_id             = Auth::user()->id;
            $repair->properties_id        = $request->properties_id;
            $repair->users_id_responsible = $request->users_id_responsible;
            $repair->priorities_id        = $request->priorities_id;
            $repair->save();


            $items_name                = $request->item_name;
            $items_description         = $request->item_description;
            $items_quantity            = $request->item_quantity;
            $items_priorities_id       = $request->item_priorities_id;
            $item_users_id_responsible = $request->item_users_id_responsible;

            for($i = 1; $i <= count($items_name); $i++)
            {
                if(!is_null($items_name[$i]))
                {
                    $item                       = new RepairsItem();
                    $item->repairs_id           = $repair->id;
                    $item->priorities_id        = $items_priorities_id[$i];
                    $item->name                 = $items_name[$i];
                    $item->description          = $items_description[$i];
                    $item->properties_id        = $repair->properties_id;
                    $item->users_id             = $repair->users_id;
                    $item->quantity             = $items_quantity[$i];
                    $item->users_id_responsible = $item_users_id_responsible[$i];
                    $item->save();
                }
            }


            return redirect('property/repair')->with("success", "added items...");
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
            $repair            = Repair::find($id);
            $this->title       = "Property Repair View";
            $this->menu_active = "property_repair_list";
            $this->new_title   = "Repair Edit";
            $this->breadcrumbs = [
                [
                    'name' => 'Task',
                    'url'  => url('task'),
                ],
                [
                    'name'   => 'Repair',
                    'url'    => url('task/'.$id."/edit"),
                    'active' => TRUE,
                ],
            ];

            $this->loadData();

            $properties = Property::orderBy('address')
                                  ->get();
            $users      = User::all();
            $priorities = Priority::all();

            return View("property.repair.show")
                ->with("properties", $properties)
                ->with("repair", $repair)
                ->with("users", $users)
                ->with("priorities", $priorities);

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
            $repair = Repair::find($id);


            $this->title       = "Property Repair Edit";
            $this->menu_active = "property_repair_list";
            $this->new_title   = "Repair Edit";
            $this->breadcrumbs = [
                [
                    'name' => 'Task',
                    'url'  => url('task'),
                ],
                [
                    'name'   => 'Repair',
                    'url'    => url('task/'.$id."/edit"),
                    'active' => TRUE,
                ],
            ];

            $this->loadData();

            $properties = Property::orderBy('address')
                                  ->get();
            $users      = User::all();
            $priorities = Priority::all();

            return View("property.repair.edit")
                ->with("properties", $properties)
                ->with("repair", $repair)
                ->with("users", $users)
                ->with("priorities", $priorities);

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
                'name'                 => 'required',
                'date_start'           => 'required',
                'date_end'             => 'required',
                'description'          => 'required',
                'users_id_responsible' => 'required',
                'properties_id'        => 'required',
            ]);

            $repair                       = Repair::find($id);
            $repair->name                 = $request->name;
            $repair->date_start           = $request->date_start;
            $repair->date_end             = $request->date_end;
            $repair->description          = $request->description;
            $repair->users_id             = Auth::user()->id;
            $repair->properties_id        = $request->properties_id;
            $repair->users_id_responsible = $request->users_id_responsible;
            $repair->priorities_id        = $request->priorities_id;
            $repair->save();


            $items_name                = $request->item_name;
            $items_description         = $request->item_description;
            $items_quantity            = $request->item_quantity;
            $items_priorities_id       = $request->item_priorities_id;
            $item_users_id_responsible = $request->item_users_id_responsible;

            ///
            /// Search indexes taller
            ///
            $id_taller = 0;
            foreach($items_name as $index => $value)
            {
                if($index > $id_taller)
                {
                    $id_taller = $index;
                }
            }

            for($i = 1; $i <= $id_taller; $i++)
            {
                if(isset($items_name[$i]) && !is_null($items_name[$i]))
                {
                    $item = RepairsItem::firstOrNew([
                        "id"         => $i,
                        "repairs_id" => $id,
                    ]);
                    ///$item->repairs_id    = $repair->id;
                    $item->priorities_id        = $items_priorities_id[$i];
                    $item->name                 = $items_name[$i];
                    $item->description          = $items_description[$i];
                    $item->properties_id        = $repair->properties_id;
                    $item->users_id             = $repair->users_id;
                    $item->quantity             = $items_quantity[$i];
                    $item->users_id_responsible = $item_users_id_responsible[$i];
                    $item->save();
                }
            }


            return redirect('property/repair')->with("success", "updated items...");

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

        public function deleteItem($id_item)
        {
            $item = RepairsItem::find($id_item);
            $item->delete();

            return redirect('property/repair/'.$item->repair->id.'/edit')->with("success", "delete item...");
        }

    }