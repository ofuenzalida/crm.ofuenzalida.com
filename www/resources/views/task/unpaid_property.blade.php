@extends("layouts.backend")

@section("content")
    <section id="responsive-datatable">
        <div class="row">
            <div class="offset-md-4 col-md-4 col-sm-6">
                <div class="card text-center">
                    <a href="{{ url("task/unpaid") }}">
                        <div class="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <h3 class="fw-bolder mb-75">
                                    <?php
                                        $total_paid_nok = 0;
                                        foreach($tasks as $tpok)
                                        {
                                            $total_paid_nok += ($tpok->hour * $tpok->usd);
                                        }
                                    ?>
                                    {{ number_format($total_paid_nok) }}
                                </h3>
                                <span>No Paid</span>
                            </div>
                            <div class="avatar bg-light-success p-50">
                                        <span class="avatar-content">
                                            <i data-feather="award" class="font-medium-4"></i>
                                        </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header border-bottom">
                        <h4 class="card-title">Properties</h4>
                    </div>
                    <div class="card-datatable">
                        <table class="dt-responsive table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Property</th>
                                <th>Date Start</th>
                                <th>Date End</th>
                                <th>Hour</th>
                                <th>USD</th>
                                <th>Description Work</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Property</th>
                                <th>Date Start</th>
                                <th>Date End</th>
                                <th>Hour</th>
                                <th>USD</th>
                                <th>Description Work</th>
                                <th>Action</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            <?php
                                $property_list = [];
                                $tasks_order   = [];
                                $tasks_list    = [];
                                foreach($tasks as $task)
                                {
                                    $property_list[$task->properties_id] = $task->property->name;
                                    $tasks_order[$task->properties_id][] = $task;
                                }

                                foreach($tasks_order as $i => $tas)
                                {
                                    foreach($tas as $t)
                                    {
                                        $tasks_list[$i]["properties_id"]    = $t->properties_id;
                                        $tasks_list[$i]["name"]             = $t->property->name;
                                        $tasks_list[$i]["address"]          = $t->property->address;
                                        $tasks_list[$i]["description_work"] = (isset($tasks_list[$i]["description_work"]) ? $tasks_list[$i]["description_work"] : "")."<br/>".date("m/d/Y", strtotime($t->date))."<br/>".$t->description_work."<hr/>";

                                        ///
                                        /// Find date start
                                        ///
                                        if(isset($tasks_list[$i]["date_start"]))
                                        {
                                            if($tasks_list[$i]["date_start"] > $t->date)
                                            {
                                                $tasks_list[$i]["date_start"] = $t->date;
                                            }
                                        }
                                        else
                                        {
                                            $tasks_list[$i]["date_start"] = $t->date;
                                        }

                                        ///
                                        /// Find date end
                                        ///
                                        $tasks_list[$i]["date_end"] = $t->date;
                                        if(isset($tasks_list[$i]["date_end"]))
                                        {
                                            if($tasks_list[$i]["date_end"] > $t->date)
                                            {
                                                $tasks_list[$i]["date_end"] = $t->date;
                                            }
                                        }
                                        else
                                        {
                                            $tasks_list[$i]["date_end"] = $t->date;
                                        }

                                        $tasks_list[$i]["hour"]  = ($t->hour) + (isset($tasks_list[$i]["hour"]) ? $tasks_list[$i]["hour"] : 0);
                                        $tasks_list[$i]["total"] = ($t->hour * $t->usd) + (isset($tasks_list[$i]["total"]) ? $tasks_list[$i]["total"] : 0);
                                    }
                                }
                                $count = 0;
                            ?>
                            @foreach($tasks_list  as $tl)
                                <tr>
                                    <td>{{ $count++ }}</td>
                                    <td>{{ $tl["address"] }}</td>
                                    <td>{{ date("m/d/Y",strtotime($tl["date_start"])) }}</td>
                                    <td>{{ date("m/d/Y",strtotime($tl["date_end"])) }}</td>
                                    <td>{{ number_format($tl["hour"]) }}</td>
                                    <td>{{ number_format($tl["total"]) }}</td>
                                    <td>
                                        {!! str_replace("*","<br/> *", $tl["description_work"]) !!}
                                    </td>
                                    <td>
                                        <a class="btn btn-primary"
                                           onclick="javascript:return confirm('are you sure?')"
                                           href="{{ url("task/unpaid/property/paid/".$tl["properties_id"]) }}">
                                            Paid
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
@section("script")
    <script>
        let dt_responsive_table = $('.dt-responsive');
        if (dt_responsive_table.length)
        {
            let dt_responsive = dt_responsive_table.DataTable();
        }
    </script>
@endsection