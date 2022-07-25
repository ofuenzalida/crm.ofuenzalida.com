<div class="content-header row">
    @if ($message = Session::get('success'))
        <div class="content-header-left col-12">
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">Success</h4>
                <div class="alert-body">
                    {{ $message }}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    @endif
    @if ($message = Session::get('error'))
        <div class="content-header-left col-12">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">Error</h4>
                <div class="alert-body">
                    {{ $message }}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    @endif
    @if ($message = Session::get('warning'))
        <div class="content-header-left col-12">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">Warning</h4>
                <div class="alert-body">
                    {{ $message }}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    @endif
    @if ($message = Session::get('info'))
        <div class="content-header-left col-12">
            <div class="alert alert-info alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">Information</h4>
                <div class="alert-body">
                    {{ $message }}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    @endif
    @if ($errors->any())
        <div class="content-header-left col-12">
            <div class="alert alert-danger alert-dismissible fade show">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endif
    @if(isset($breadcrumbs) && count($breadcrumbs) > 0 && is_array($breadcrumbs))
        <div class="content-header-left col-md-9 col-12 mb-2">
            <div class="row breadcrumbs-top">
                <div class="col-12">
                    <h2 class="content-header-title float-start mb-0">{{ (isset($title) ? $title : '') }}</h2>
                    <div class="breadcrumb-wrapper">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ url('dashboard') }}">
                                    Dashboard
                                </a>
                            </li>
                            @foreach($breadcrumbs as $b)
                                <li class="breadcrumb-item {{ (isset($b['active']) ? 'active' : '') }}">
                                    <a href="{{ $b['url'] }}">{{ $b['name'] }}</a>
                                </li>
                            @endforeach
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    @endif
    @if(isset($new_url) && $new_url)
        <div class="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
            <div class="mb-1 breadcrumb-right">
                <a class="btn-icon btn btn-primary btn-round btn-sm" href="{{ $new_url }}">
                    <i class="me-1" data-feather="check-square"></i>
                    <span class="align-middle">{{ $new_title }}</span>
                </a>
            </div>
        </div>
    @endif
</div>