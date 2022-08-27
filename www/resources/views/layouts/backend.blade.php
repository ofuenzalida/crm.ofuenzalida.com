<!DOCTYPE html>
<html class="loading dark-layout" lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-layout="dark-layout"
      data-textdirection="ltr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
    <meta name="description"
          content="{{ (isset($meta_description) ? $meta_description : '') }}">
    <meta name="keywords"
          content="{{ (isset($meta_keywords) ? $meta_keywords : '') }}">
    <meta name="author" content="Octavio Fuenzalida">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }} {{ (isset($title) ? $title : '') }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600"
          rel="stylesheet"/>
    <link rel="stylesheet" href="{{ url('assets/css/datatables.css') }}"/>
    {{-- <link rel="stylesheet" href="{{ url('css/app.css') }}"/> --}}
    <link rel="stylesheet" href="{{ url('assets/css/theme.css') }}"/>
    <link rel="stylesheet" href="{{ url('assets/css/theme-plugins.css') }}"/>
    @yield("styles")
</head>
<body class="vertical-layout vertical-menu-modern  navbar-floating footer-static" data-open="click"
      data-menu="vertical-menu-modern" data-col="">
@include("layouts.backend.nav")
@include("layouts.backend.menu")
<div class="app-content content ">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper container-xxl p-0">
        @include("layouts.backend.breadcrumb")
        <div class="content-body">
            @yield("content")
        </div>
    </div>
</div>
@include("layouts.backend.footer")
<script src="{{ url('assets/js/theme.js') }}?v={{ env("CACHE_CSS_JS") }}"></script>
<script src="{{ url('assets/js/datatables.js') }}?v={{ env("CACHE_CSS_JS") }}"></script>
<script src="{{ url('assets/js/theme-plugins.js') }}?v={{ env("CACHE_CSS_JS") }}"></script>
<script src="{{ asset('js/app.js') }}?v={{ env("CACHE_CSS_JS") }}" defer></script>
<script src="{{ url('assets/js/lib.js') }}?v={{ env("CACHE_CSS_JS") }}"></script>
<script>
    $(window).on('load', function ()
    {
        if (feather)
        {
            feather.replace({
                                width: 14,
                                height: 14
                            });
        }
    })
</script>
@yield("script")
</body>
</html>
