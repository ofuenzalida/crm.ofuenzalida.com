@extends("layouts.backend")
@section('styles')
    <style>
        #map-canvas
        {
            height:  500px;
            margin:  0px;
            padding: 0px
        }

        #floating-panel
        {
            position:    relative;
            top:         90px;
            left:        0px;
            z-index:     5;
            padding:     0px;
            text-align:  center;
            font-family: "Roboto", "sans-serif";
            line-height: 30px;
        }
    </style>
@endsection
@section("content")
    <section class="tooltip-validations" id="tooltip-validation">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">New Property</h4>
                    </div>
                    <div class="card-body">
                        <p>

                        </p>
                        <form action="{{ url("configuration/priority/".$priority->id) }}" class="needs-validation"
                              novalidate
                              method="POST">
                            @method("put")
                            {{ csrf_field() }}
                            <div class="row g-1">
                                <div class="col-md-12 col-sm-12 mb-3 position-relative">
                                    <label class="form-label" for="name">Name</label>
                                    <input type="text" class="form-control" id="name" name="name"
                                           placeholder="Name..." value="{{ $priority->name }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                            </div>
                            <button class="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
@section("script")
    <script>
        (function (window, document, $)
        {
            'use strict';

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            // Loop over them and prevent submission
            $('button').click(function ()
                              {
                                  var form = $('.needs-validation');
                                  if (form[0].checkValidity() === false)
                                  {
                                      event.preventDefault();
                                      event.stopPropagation();
                                  }
                                  form.addClass('was-validated');
                              });
        })(window, document, jQuery);
    </script>
@endsection