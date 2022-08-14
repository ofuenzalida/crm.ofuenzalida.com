@extends("layouts.backend")
@section("content")
    <section class="tooltip-validations" id="tooltip-validation">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">New Repair</h4>
                    </div>
                    <div class="card-body">
                        <p>

                        </p>
                        <form action="{{ url("property/repair/".$repair->id) }}" class="needs-validation"
                              novalidate
                              method="POST">
                            {{ csrf_field() }}
                            {{ method_field('PUT') }}
                            <div class="row g-1">
                                <div class="col-md-12 col-12 mb-3 position-relative">
                                    <label class="form-label" for="properties_id">Property</label>
                                    <select class="select2 form-select" id="properties_id" name="properties_id"
                                            required>
                                        <option value="">Select Option...</option>
                                        @foreach($properties as $p)
                                            <option value="{{ $p->id }}" @if($repair->properties_id == $p->id)
                                                {!! "selected" !!}
                                                    @endif>{{ $p->name }} | {{ $p->address }}</option>
                                        @endforeach
                                    </select>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                            </div>
                            <div class="row g-1">
                                <div class="col-md-4 col-12 mb-3 position-relative">
                                    <label class="form-label" for="hour">name</label>
                                    <input type="text" class="form-control" id="name" name="name"
                                           placeholder="name" value="{{ $repair->name }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div class="col-md-4 col-12 mb-3 position-relative">
                                    <label class="form-label" for="date">Date Start</label>
                                    <input type="text" class="form-control flatpickr-basic" id="date_start"
                                           name="date_start"
                                           placeholder="YYYY-MM-DD" value="{{ $repair->date_start }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div class="col-md-4 col-12 mb-3 position-relative">
                                    <label class="form-label" for="date">Date End</label>
                                    <input type="text" class="form-control flatpickr-basic" id="date_end"
                                           name="date_end"
                                           placeholder="YYYY-MM-DD" value="{{ $repair->date_end }}" required/>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div class="col-md-4 col-12 mb-3 position-relative">
                                    <label class="form-label" for="users_id_responsible">User Responsible</label>
                                    <select class="select2 form-select" id="users_id_responsible"
                                            name="users_id_responsible"
                                            required>
                                        <option value="">Select Option...</option>
                                        @foreach($users as $user)
                                            <option value="{{ $user->id }}" @if($repair->users_id_responsible == $user->id)
                                                {!! "selected" !!}
                                                    @endif>{{ $user->name }} | {{ $user->email }}</option>
                                        @endforeach
                                    </select>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                                <div class="col-md-4 col-12 mb-3 position-relative">
                                    <label class="form-label" for="priorities_id">Priority</label>
                                    <select class="select2 form-select" id="priorities_id" name="priorities_id"
                                            required>
                                        <option value="">Select Option...</option>
                                        @foreach($priorities as $priority)
                                            <option value="{{ $priority->id }}" @if($repair->users_id_responsible == $priority->id)
                                                {!! "selected" !!}
                                                    @endif>{{ $priority->name }}</option>
                                        @endforeach
                                    </select>
                                    <div class="valid-tooltip">Looks good!</div>
                                </div>
                            </div>
                            <div class="row g-1">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">Items</h4>
                                        </div>
                                        <div class="card-body">
                                            <div id="items">
                                                <?php
                                                    $i = 0;
                                                    $j = 0;
                                                ?>
                                                @foreach($repair->repairs_items as $item)
                                                        <?php
                                                        $i++;
                                                        $j = $item->id;
                                                        ?>
                                                    <hr/>
                                                    <div>
                                                        <div class="row d-flex align-items-end">
                                                            <div class="col-12">
                                                                <a class="btn btn-danger"
                                                                   href="{{ url("property/repair/item/delete/".$item->id) }}"
                                                                   onclick="javascript:return confirm('are you sure?')">
                                                                    <i data-feather="trash" class="me-25"></i>
                                                                    Delete ({{ $i }})
                                                                </a>
                                                            </div>
                                                            <div class="col-md-4 col-12">
                                                                <div class="mb-1">
                                                                    <label class="form-label" for="itemname">Name
                                                                        ({{ $i }})</label>
                                                                    <input type="text" class="form-control"
                                                                           id="itemname"
                                                                           name="item_name[{{ $item->id }}]"
                                                                           aria-describedby="itemname"
                                                                           placeholder="Name..."
                                                                           value="{{ $item->name }}"/>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 col-12">
                                                                <div class="mb-1">
                                                                    <label class="form-label"
                                                                           for="item_users_id_responsible">User
                                                                        Responsible
                                                                        ({{ $i }})</label>
                                                                    <select class="form-select"
                                                                            id="item_users_id_responsible"
                                                                            name="item_users_id_responsible[{{ $item->id }}]">
                                                                        <option value="">Select Option...</option>
                                                                        @foreach($users as $user)
                                                                            <option value="{{ $user->id }}" @if($item->users_id_responsible == $user->id)
                                                                                {!! "selected" !!}
                                                                                    @endif>{{ $user->name }}</option>
                                                                        @endforeach
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 col-12">
                                                                <div class="mb-1">
                                                                    <label class="form-label" for="priorities_id">Priority
                                                                        ({{ $i }})</label>
                                                                    <select class="form-select"
                                                                            id="item_priorities_id"
                                                                            name="item_priorities_id[{{ $item->id }}]">
                                                                        <option value="">Select Option...</option>
                                                                        @foreach($priorities as $priority)
                                                                            <option value="{{ $priority->id }}" @if($item->priorities_id == $priority->id)
                                                                                {!! "selected" !!}
                                                                                    @endif>{{ $priority->name }}</option>
                                                                        @endforeach
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-4 col-12">
                                                                <div class="mb-1">
                                                                    <label class="form-label"
                                                                           for="itemquantity">Quantity ({{ $i }}
                                                                        )</label>
                                                                    <input type="number" class="form-control"
                                                                           id="itemquantity"
                                                                           name="item_quantity[{{ $item->id }}]"
                                                                           aria-describedby="itemquantity"
                                                                           placeholder="1"
                                                                           value="{{ $item->quantity }}"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-8 col-12">
                                                                <div class="mb-1">
                                                                    <label class="form-label"
                                                                           for="itemquantity">Description ({{ $i }}
                                                                        )</label>
                                                                    <textarea class="form-control char-textarea"
                                                                              id="itemquantity"
                                                                              name="item_description[{{ $item->id }}]"
                                                                              rows="3"
                                                                              aria-describedby="itemquantity">{!! $item->description !!}</textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            </div>
                                            <hr/>
                                            <div class="row">
                                                <div class="col-12">
                                                    <a class="btn btn-icon btn-primary" href="#"
                                                       onclick="addItem()">
                                                        <i data-feather="plus" class="me-25"></i>
                                                        <span>Add New</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row g-1">
                                <div class="col-12">
                                    <div class="form-floating mb-0">
                                        <textarea data-length="1000" class="form-control char-textarea"
                                                  id="textarea-counter" rows="5" placeholder="Description Jobs..."
                                                  name="description"
                                                  style="height: 200px" required>{!! $repair->description !!}</textarea>
                                        <label for="textarea-counter">Description Work</label>
                                    </div>
                                    <small class="textarea-counter-value float-end">
                                        <span class="char-count">0</span> / 1000 </small>
                                </div>
                            </div>
                            <div class="row g-1">
                                <div class="col-12">
                                    <br/>
                                    <button class="btn btn-primary" type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
@section("script")
    <script>
        let count_items = {{  $i+1 }};
        let count_items_db = {{ $j+1 }};

        function getItemHtml(count_item)
        {
            return '<div id="items">' +
                '<hr/>' +
                '<div>' +
                '<div class="row d-flex align-items-end">' +
                '<div class="col-md-3 col-12">' +
                '<div class="mb-1">' +
                '<label class="form-label" for="itemname">Name(' + count_item + ')</label>' +
                '<input type="text" class="form-control" id="itemname" name="item_name[' + count_items_db + ']" aria-describedby="itemname" placeholder="Name..."/>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-3 col-12">' +
                '<div class="mb-1">' +
                '<label class="form-label" for="priorities_id">Priority(' + count_item + ')</label>' +
                '<select class="select2 form-select" id="item_priorities_id" name="item_priorities_id[' + count_items_db + ']">' +
                '<option value="">Select Option...</option>' +
                    @foreach($priorities as $priority)
                        '<option value="{{ $priority->id }}" >{{ $priority->name }}</option>' +
                    @endforeach
                        '</select>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-3 col-12">' +
                '<div class="mb-1">' +
                '<label class="form-label" for="itemquantity">Quantity (' + count_item + ')</label>' +
                '<input type="number" class="form-control" id="itemquantity" name="item_quantity[' + count_items_db + ']" aria-describedby="itemquantity" placeholder="1"/>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-3 col-12">' +
                '<div class="mb-1">' +
                '<label class="form-label" for="itemquantity">Description (' + count_item + ')</label>' +
                '<textarea class="form-control char-textarea" id="itemquantity" name="item_description[' + count_items_db + ']" rows="3" aria-describedby="itemquantity"></textarea>' +
                '</div>' +
                '</div>' +
                ' </div>' +
                ' </div>' +
                '</div>';
        }

        function addItem()
        {
            $("#items").append(getItemHtml(count_items));
            count_items++;
            count_items_db++;
        }

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