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
                                <th>Action</th>
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
                                <th>Action</th>
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
                                        <td>
                                            <a href="{{ url("task/".$t->id."/edit") }}" type="button"
                                               class="btn btn-outline-primary mr-1 mb-1 waves-effect waves-light btn-href">
                                                <i class="feather icon-edit"></i> Editar
                                            </a>
                                            <br/>
                                            <form method="DELETE" class="form form-vertical" id="form edit_user"
                                                  name="form_statusproy" action="{{ url("task/".$t->id) }}">
                                                @csrf
                                                <button type="submit"
                                                        class="btn btn-outline-primary mr-1 mb-1 waves-effect waves-light">
                                                    <i class="feather icon-trash"></i> Eliminar
                                                </button>
                                            </form>
                                        </td>
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