@extends("layouts.backend")
@section("content")
    <section class="tooltip-validations" id="tooltip-validation">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">New Task</h4>
                    </div>
                    <div class="card-body">
                        <p>

                        </p>
                        <form action="{{ url("task") }}" class="needs-validation" novalidate
                              method="POST">
                            {{ csrf_field() }}
                            <div class="row g-1">
                                <div class="col-md-12 col-12 mb-3 position-relative">
                                    <label class="form-label" for="properties_id">Property</label>
                                    <select class="form-select" id="properties_id" name="properties_id"
                                            required>
                                        <option value="">Select Option...</option>
                                        @foreach($properties as $p)
                                            <option value="{{ $p->id }}">{{ $p->name }} | {{ $p->address }}</option>
                                        @endforeach
                                    </select>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                            </div>
                            <div class="row g-1">
                                <div class="col-md-3 col-12 mb-3 position-relative">
                                    <label class="form-label" for="hour">hour</label>
                                    <input type="number" class="form-control" id="hour" name="hour"
                                           placeholder="hour" value="{{ old("hour") }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div class="col-md-3 col-12 mb-3 position-relative">
                                    <label class="form-label" for="usd">USD</label>
                                    <input type="number" class="form-control" id="usd" name="usd"
                                           placeholder="usd" value="{{ old("usd") }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div class="col-md-3 col-12 mb-3 position-relative">
                                    <label class="form-label" for="date">date</label>
                                    <input type="text" class="form-control flatpickr-basic" id="date" name="date"
                                           placeholder="YYYY-MM-DD" value="{{ old("date") }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div class="col-md-3 col-12 mb-3 position-relative">
                                    <label class="form-check-label mb-50" for="customSwitch111">Paid?</label>
                                    <div class="form-check form-switch form-check-success">
                                        <input type="checkbox" class="form-check-input" id="customSwitch111"
                                               name="paid"/>
                                        <label class="form-check-label" for="customSwitch111">
                                            <span class="switch-icon-left"><i data-feather="check"></i></span>
                                            <span class="switch-icon-right"><i data-feather="x"></i></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-1">
                                <div class="col-12">
                                    <div class="form-floating mb-0">
                                        <textarea data-length="1000" class="form-control char-textarea"
                                                  id="textarea-counter" rows="5" placeholder="Description Jobs..."
                                                  name="description_work"
                                                  style="height: 200px"></textarea>
                                        <label for="textarea-counter">Description Work</label>
                                    </div>
                                    <small class="textarea-counter-value float-end">
                                        <span class="char-count">0</span> / 1000 </small>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating mb-0">
                                        <textarea data-length="1000" class="form-control"
                                                  rows="5" placeholder="Description Tools..."
                                                  id="description_tool"
                                                  name="description_tool"
                                                  style="height: 200px"></textarea>
                                        <label for="description_tool">Description Tools</label>
                                    </div>
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

            $(".flatpickr-basic").flatpickr();

        })(window, document, jQuery);
    </script>
@endsection