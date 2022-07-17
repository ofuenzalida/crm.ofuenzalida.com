@extends("layouts.backend")

@section("content")
    <section id="responsive-datatable">
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
                                <th>Date</th>
                                <th>Hour</th>
                                <th>USD</th>
                                <th>Total</th>
                                <th>Property</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Hour</th>
                                <th>USD</th>
                                <th>Total</th>
                                <th>Property</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            @if(isset($tasks) && $tasks)
                                @foreach($tasks  as $t)
                                    <tr>
                                        <td>{{ $t->id }}</td>
                                        <td>{{ $t->date }}</td>
                                        <td>{{ $t->hour }}</td>
                                        <td>{{ $t->usd }}</td>
                                        <td>{{ ($t->hour * $t->usd) }}</td>
                                        <td>{{ $t->property->name }}</td>
                                    </tr>
                                @endforeach
                            @endif
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