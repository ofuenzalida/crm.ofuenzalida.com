@extends("layouts.backend")
@section("content")

    <section class="invoice-preview-wrapper">
        <div class="row invoice-preview">
            <div class="col-12">
                <div class="card invoice-preview-card">
                    <div class="card-body invoice-padding pb-0">
                        <!-- Header starts -->
                        <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                            <div>
                                <div class="logo-wrapper">
                                    <h3 class="text-primary invoice-logo">{{ $repair->name }}</h3>
                                </div>
                                <table>
                                    <tr>
                                        <td>Address:&nbsp;&nbsp;</td>
                                        <td><strong>{{ $repair->property->address }}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Responsible:&nbsp;&nbsp;</td>
                                        <td>
                                            <strong>{{ (isset($repair->userResponsible->name) ? $repair->userResponsible->name : "") }}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Priority:&nbsp;&nbsp;</td>
                                        <td><strong>{{ $repair->priority->name }}</strong></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="mt-md-0 mt-2">
                                <h4 class="invoice-title">
                                    OT
                                    <span class="invoice-number"># {{ number_format($repair->id) }}</span>
                                </h4>
                                <div class="invoice-date-wrapper">
                                    <p class="invoice-date-title">Date Issued:</p>
                                    <p class="invoice-date">{{ date("m/d/Y", strtotime($repair->date_start)) }}</p>
                                </div>
                                <div class="invoice-date-wrapper">
                                    <p class="invoice-date-title">Due Date:</p>
                                    <p class="invoice-date">{{ date("m/d/Y", strtotime($repair->date_end)) }}</p>
                                </div>
                            </div>
                        </div>
                        <!-- Header ends -->
                    </div>

                    <hr class="invoice-spacing"/>

                    <div class="card-body invoice-padding pt-0">
                        <div class="row invoice-spacing">
                            <div class="col-12 p-0">
                                <h6 class="mb-2">Description:</h6>
                                {!! $repair->description !!}
                            </div>
                        </div>
                    </div>
                    <!-- Address and Contact ends -->

                    <!-- Invoice Description starts -->
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th class="py-1">#</th>
                                <th class="py-1">Task description</th>
                                <th class="py-1">Quality</th>
                                <th class="py-1">User Responsible</th>
                                <th class="py-1">Priority</th>
                                <th class="py-1">Imagen</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php
                                $count = 0;
                            ?>
                            @foreach($repair->repairs_items as $item)
                                <tr>
                                    <td class="py-1">
                                        {{ ++$count }}
                                    </td>
                                    <td class="py-1">
                                        <p class="card-text fw-bold mb-25">{{ $item->name }}</p>
                                        <p class="card-text text-nowrap">
                                            {{ $item->description }}
                                        </p>
                                    </td>
                                    <td class="py-1">
                                        <span class="fw-bold">{{ $item->quantity }}</span>
                                    </td>
                                    <td class="py-1">
                                        <span class="fw-bold">{{ $item->user->name ?? "" }}</span>
                                    </td>
                                    <td class="py-1">
                                        <span class="fw-bold">{{ $item->priority->name ?? "" }}</span>
                                    </td>
                                    <td class="py-1">
                                        @foreach($item->repairs_items_files as $irf)
                                            <a type="button" class="popImg" data-bs-toggle="modal"
                                               data-bs-target="#imagenModal">
                                                <img id="imageResource" src="{{ url($irf->file_path) }}"
                                                     style="width: 120px;"
                                                     class="img-thumbnail"/>
                                            </a>
                                            <br/>
                                            <br/>
                                        @endforeach
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    <hr class="invoice-spacing"/>
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
            $(".flatpickr-basic").flatpickr();
        })(window, document, jQuery);
    </script>
@endsection