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
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            @if(isset($priorities) && $priorities)
                                @foreach($priorities  as $p)
                                    <tr>
                                        <td>{{ $p->id }}</td>
                                        <td>{{ $p->name }}</td>
                                        <td>
                                            <div class="demo-inline-spacing">
                                                <button type="button" class="btn btn-info btn-href"
                                                        btn-href="{{ url("configuration/priority/".$p->id."/edit") }}">
                                                    <i data-feather="edit-3" class="me-25"></i>
                                                    <span>Edit</span>
                                                </button>
                                                <form method="DELETE" class="form form-vertical" id="form edit_user"
                                                      name="form_statusproy"
                                                      action="{{ url("configuration/priority/".$p->id) }}">
                                                    @csrf
                                                    <button type="submit"
                                                            class="btn btn-danger">
                                                        <i data-feather="trash" class="me-25"></i>
                                                        <span>Delete</span>
                                                    </button>
                                                </form>
                                            </div>
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