@extends("layouts.backend")

@section("content")
    <section id="responsive-datatable">
        <div class="row">
            <div class="offset-md-4 col-md-4 col-sm-6">
                <div class="card text-center">
                    <a href="{{ url("task/paid") }}">
                        <div class="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <h3 class="fw-bolder mb-75">
                                    <?php
                                    $total_paid_ok = 0;
                                    foreach($tasks as $tpok)
                                    {
                                        $total_paid_ok += ($tpok->hour * $tpok->usd);
                                    }
                                    ?>
                                    {{ number_format($total_paid_ok) }}
                                </h3>
                                <span>Paid</span>
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
                                <th>USD</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Property</th>
                                <th>Date Start</th>
                                <th>Date End</th>
                                <th>USD</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            <?php
                            $property_list = [];
                            $tasks_order = [];
                            $tasks_list = [];
                            foreach($tasks as $task)
                            {
                                $property_list[$task->properties_id] = $task->property->name;
                                $tasks_order[$task->properties_id][] = $task;
                            }

                            foreach($tasks_order as $i => $tas)
                            {
                                foreach($tas as $t)
                                {
                                    $tasks_list[$i]["name"] = $t->property->name;
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

                                    $tasks_list[$i]["total"] = ($t->hour * $t->usd) + (isset($tasks_list[$i]["total"]) ? $tasks_list[$i]["total"] : 0);

                                }
                            }
                            $count = 0;
                            ?>
                            @foreach($tasks_list  as $tl)
                                <tr>
                                    <td>{{ $count++ }}</td>
                                    <td>{{ $tl["name"] }}</td>
                                    <td>{{ $tl["date_start"] }}</td>
                                    <td>{{ $tl["date_end"] }}</td>
                                    <td>{{ number_format($tl["total"]) }}</td>
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