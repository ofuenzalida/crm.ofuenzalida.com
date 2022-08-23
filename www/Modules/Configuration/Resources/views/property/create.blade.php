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
                        <form action="{{ url("configuration/property") }}" class="needs-validation" novalidate
                              method="POST">
                            {{ csrf_field() }}
                            <div class="row g-1">
                                <div class="col-md-12 col-12 mb-3 position-relative">
                                    <label class="form-label" for="name">Office</label>
                                    <select class="form-control" id="offices_id" name="offices_id"
                                            required>
                                        <option value="">Select Option...</option>
                                        @foreach($offices as $o)
                                            <option value="{{ $o->id }}">{{ $o->name }}</option>
                                        @endforeach
                                    </select>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                            </div>
                            <div class="row g-1">
                                <div class="col-md-6 col-12 mb-3 position-relative">
                                    <label class="form-label" for="name">Name</label>
                                    <input type="text" class="form-control" id="name" name="name"
                                           placeholder="Name..." value="{{ old("name") }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div class="col-md-6 col-12 mb-3 position-relative">
                                    <label class="form-label" for="validationTooltip02">Address</label>
                                    <input type="text" class="form-control" id="address" name="address"
                                           placeholder="Address..." value="{{ old("address") }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                            </div>
                            <div class="row g-1">
                                <div class="col-md-4">
                                    <div class="d-flex flex-column">
                                        <label class="form-check-label mb-50" for="has_lawn">Has Lawn</label>
                                        <div class="form-check form-switch form-check-success">
                                            <input type="checkbox" class="form-check-input" id="has_lawn"/>
                                            <label class="form-check-label" for="has_lawn">
                                                <span class="switch-icon-left"><i data-feather="check"></i></span>
                                                <span class="switch-icon-right"><i data-feather="x"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="d-flex flex-column">
                                        <label class="form-check-label mb-50" for="has_sprinkles">Has Sprinkles</label>
                                        <div class="form-check form-switch form-check-success">
                                            <input type="checkbox" class="form-check-input" id="has_sprinkles"/>
                                            <label class="form-check-label" for="has_sprinkles">
                                                <span class="switch-icon-left"><i data-feather="check"></i></span>
                                                <span class="switch-icon-right"><i data-feather="x"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="d-flex flex-column">
                                        <label class="form-check-label mb-50" for="has_apartments">Has
                                            Apartments</label>
                                        <div class="form-check form-switch form-check-success">
                                            <input type="checkbox" class="form-check-input" id="has_apartments"/>
                                            <label class="form-check-label" for="has_apartments">
                                                <span class="switch-icon-left"><i data-feather="check"></i></span>
                                                <span class="switch-icon-right"><i data-feather="x"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div class="row g-1">
                                <div class="col-md-6 col-12 mb-3 position-relative">
                                    <label class="form-label" for="latitude">Latitude</label>
                                    <input type="text" class="form-control" id="latitude" name="latitude"
                                           placeholder="latitude" value="{{ old("latitude") }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div class="col-md-6 col-12 mb-3 position-relative">
                                    <label class="form-label" for="longitude">Longitude</label>
                                    <input type="text" class="form-control" id="longitude" name="longitude"
                                           placeholder="longitude" value="{{ old("longitude") }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                            </div>
                            <div class="row g-1">
                                <div class="col-12">
                                    <div id="floating-panel"></div>
                                    <div id="map-canvas"></div>
                                    <input type="hidden" name="polygon" id="polygon" class="col-12" value=""/>
                                    <br/>
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
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=drawing,places&key={{ env('GOOGLE_MAP_API') }}"></script>
    <script>
        var map;
        var iw = new google.maps.InfoWindow();
        var lat_longs = new Array();
        var markers = new Array();
        var drawingManager;
        var marker;
        var geocoder = new google.maps.Geocoder;
        var map_input = $('#address')[0];

        function initialize()
        {
            var myLatlng = new google.maps.LatLng({{ env('GOOGLE_START_LAT') }}, {{ env('GOOGLE_START_LNG') }});
            var myOptions = {
                zoom: {{ env('GOOGLE_START_ZOOM') }},
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var autocomplete = new google.maps.places.Autocomplete(map_input);
            map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
            autocomplete.addListener('place_changed', function ()
            {

                var place = autocomplete.getPlace();
                $('#latitude').val(place.geometry.location.lat());
                $('#longitude').val(place.geometry.location.lng());

                if (!place.geometry)
                {
                    window.alert("No details available: '" + place.name + "'");
                    return;
                }
                if (place.geometry.viewport)
                {
                    map.fitBounds(place.geometry.viewport);
                }
                if (typeof marker !== 'undefined')
                {
                    marker.setPosition(place.geometry.location);

                }
                else
                {
                    marker = new google.maps.Marker({
                                                        position: place.geometry.location,
                                                        map: map,
                                                        title: place.name,
                                                        draggable: true,
                                                    });
                    marker.setPosition(place.geometry.location);
                    marker.setVisible(true);
                }
                google.maps.event.addListener(marker, 'dragend', function ()
                {
                    $('#latitude').val(marker.getPosition().lat());
                    $('#longitude').val(marker.getPosition().lng());
                    geocodeLatLng(geocoder, map, marker.getPosition());
                });
            });

            drawingManager = new google.maps.drawing.DrawingManager({
                                                                        drawingMode: google.maps.drawing.OverlayType.POLYGON,
                                                                        drawingControl: true,
                                                                        drawingControlOptions: {
                                                                            position: google.maps.ControlPosition.TOP_CENTER,
                                                                            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
                                                                        },
                                                                        polygonOptions: {
                                                                            editable: true
                                                                        }
                                                                    });
            drawingManager.setMap(map);

            google.maps.event.addListener(drawingManager, "overlaycomplete", function (event)
            {
                var newShape = event.overlay;
                newShape.type = event.type;
            });

            google.maps.event.addListener(drawingManager, "overlaycomplete", function (event)
            {
                if (typeof event.overlay === 'object')
                {
                    let div = document.querySelector("#floating-panel");
                    div.innerHTML = '<input id="remove-overlay" class="p-1 btn btn-primary" type="button" value="Remover polígono" />';
                }
                overlayClickListener(event.overlay);
                var lat_lng = '[';
                for (var i = 0; i < event.overlay.getPath().getLength(); i++)
                {
                    lat_lng += '{ "lat": ' + event.overlay.getPath().getAt(i).lat() + ', "lng": ' + event.overlay.getPath().getAt(i).lng() + '}';
                    if ((i + 1) < event.overlay.getPath().getLength())
                    {
                        lat_lng += ',';
                    }
                }
                lat_lng += ']';
                $('#polygon').val(lat_lng);

                document.getElementById("remove-overlay")
                        .addEventListener("click", function ()
                                          {
                                              event.overlay.setMap(null);
                                              $('#polygon').val('')
                                              $('#remove-overlay').hide();
                                          }
                        );
            });
        }

        $(document).ready(function ()
                          {

                              setTimeout(function ()
                                         {
                                             initialize()
                                         }, '5000');

                          });

        function geocodeLatLng(geocoder, map, latlng)
        {

            geocoder.geocode({'location': latlng}, function (results, status)
            {
                if (status === 'OK')
                {
                    if (results[0])
                    {
                        $('#address').val(results[0].formatted_address);
                    }
                    else
                    {
                        window.alert('No results found');
                    }
                }
                else
                {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }
    </script>
    <script>
        function overlayClickListener(overlay)
        {
            google.maps.event.addListener(overlay, "mouseup", function (event)
            {
                var lat_lng = '[';
                for (var i = 0; i < event.overlay.getPath().getLength(); i++)
                {
                    lat_lng += '{ "lat": ' + event.overlay.getPath().getAt(i).lat() + ', "lng": ' + event.overlay.getPath().getAt(i).lng() + '}';
                    if ((i + 1) < event.overlay.getPath().getLength())
                    {
                        lat_lng += ',';
                    }
                }
                lat_lng += ']';
                $('#polygon').val(lat_lng);
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize);
    </script>
@endsection