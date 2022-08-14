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
                                <th>Property</th>
                                <th>Name</th>
                                <th>User Responsible</th>
                                <th>Date Start</th>
                                <th>Date End</th>
                                <th>ITEMS</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Property</th>
                                <th>Name</th>
                                <th>User Responsible</th>
                                <th>Date Start</th>
                                <th>Date End</th>
                                <th>ITEMS</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            @if(isset($repairs) && $repairs)
                                @foreach($repairs  as $repair)
                                    <tr>
                                        <td>{{ $repair->id }}</td>
                                        <td>{{ $repair->property->name }} <br/> {{ $repair->property->address }}</td>
                                        <td>{{ $repair->name }}</td>
                                        <td>{{ (isset($repair->userResponsible->name) ? $repair->userResponsible->name : "") }}</td>
                                        <td>{{ $repair->date_start }}</td>
                                        <td>{{ $repair->date_end }}</td>
                                        <td>
                                            <ul class="ul-list">
                                                @foreach($repair->repairs_items as $ri)
                                                    <li>{{ $ri->name }}</li>
                                                @endforeach
                                            </ul>
                                        </td>

                                        <td>{!! str_replace("*","<br/> *", $repair->description) !!}</td>
                                        <td>
                                            <div class="demo-inline-spacing">
                                                <button type="button" class="btn btn-success btn-href"
                                                        btn-href="{{ url("property/repair/".$repair->id) }}">
                                                    <i data-feather="tag" class="me-25"></i>
                                                    <span>View</span>
                                                </button>
                                                <button type="button" class="btn btn-info btn-href"
                                                        btn-href="{{ url("property/repair/".$repair->id."/edit") }}">
                                                    <i data-feather="edit-3" class="me-25"></i>
                                                    <span>Edit</span>
                                                </button>
                                                <form method="DELETE" class="form form-vertical" id="form edit_user"
                                                      name="form_statusproy"
                                                      action="{{ url("property/repair/".$repair->id) }}">
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