<div class="main-menu menu-fixed menu-dark menu-accordion menu-shadow" data-scroll-to-active="true">
    <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
            <li class="nav-item me-auto">
                <a class="navbar-brand" href="{{ url("") }}">
                    <span class="brand-logo">
                        <!--
                            <svg viewbox="0 0 139 95" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink" height="24">
                                <defs>
                                    <lineargradient id="linearGradient-1" x1="100%" y1="10.5120544%" x2="50%"
                                                    y2="89.4879456%">
                                        <stop stop-color="#000000" offset="0%"></stop>
                                        <stop stop-color="#FFFFFF" offset="100%"></stop>
                                    </lineargradient>
                                    <lineargradient id="linearGradient-2" x1="64.0437835%" y1="46.3276743%"
                                                    x2="37.373316%" y2="100%">
                                        <stop stop-color="#EEEEEE" stop-opacity="0" offset="0%"></stop>
                                        <stop stop-color="#FFFFFF" offset="100%"></stop>
                                    </lineargradient>
                                </defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                                        <g id="Group" transform="translate(400.000000, 178.000000)">
                                            <path class="text-primary" id="Path"
                                                  d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                                                  style="fill:currentColor"></path>
                                            <path id="Path1"
                                                  d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                                                  fill="url(#linearGradient-1)" opacity="0.2"></path>
                                            <polygon id="Path-2" fill="#000000" opacity="0.049999997"
                                                     points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"></polygon>
                                            <polygon id="Path-21" fill="#000000" opacity="0.099999994"
                                                     points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"></polygon>
                                            <polygon id="Path-3" fill="url(#linearGradient-2)" opacity="0.099999994"
                                                     points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"></polygon>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            -->
                    </span>
                    <h2 class="brand-text">CRM OF</h2>
                </a>
            </li>
            <li class="nav-item nav-toggle">
                <a class="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse">
                    <i class="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i>
                    <i class="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary"
                       data-feather="disc" data-ticon="disc"></i>
                </a>
            </li>
        </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu-content">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
            <li class="nav-item {{ ((isset($menu_active) && $menu_active == 'dashboard') ? "active" : "") }}">
                <a class="d-flex align-items-center" href="{{ url("dashboard") }}">
                    <i data-feather="home"></i>
                    <span class="menu-title text-truncate" data-i18n="Dashboards">Dashboards</span>
                </a>
            </li>
            <li class="navigation-header">
                <span data-i18n="{{ __("property.name") }}">{{ __("property.name") }}</span>
                <i data-feather="more-horizontal"></i>
            </li>
            <li class="nav-item">
                <a class="d-flex align-items-center" href="{{ url("property/repair") }}">
                    <i data-feather="user"></i>
                    <span class="menu-title text-truncate"
                          data-i18n="{{ __("property.repair.menu.name") }}">{{ __("property.repair.menu.name") }}</span>
                </a>
                <ul class="menu-content">
                    <li class="{{ ((isset($menu_active) && $menu_active == 'property_repair_create') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("property/repair/create") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("property.repair.menu.name") }} {{ __("property.repair.menu.new") }}">{{ __("property.repair.menu.new") }}</span>
                        </a>
                    </li>
                </ul>
                <ul class="menu-content">
                    <li class="{{ ((isset($menu_active) && $menu_active == 'property_repair_list') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("property/repair") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("property.repair.menu.name") }} {{ __("property.repair.menu.list") }}">{{ __("property.repair.menu.list") }}</span>
                        </a>
                    </li>
                </ul>
            </li>

            <li class="navigation-header">
                <span data-i18n="{{ __("task.name") }}">{{ __("task.name") }}</span>
                <i data-feather="more-horizontal"></i>
            </li>
            <li class="nav-item">
                <a class="d-flex align-items-center" href="{{ url("task") }}">
                    <i data-feather="user"></i>
                    <span class="menu-title text-truncate"
                          data-i18n="{{ __("task.menu.name") }}">{{ __("task.menu.name") }}</span>
                </a>
                <ul class="menu-content">
                    <li class="{{ ((isset($menu_active) && $menu_active == 'task_create') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("task/create") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("task.menu.name") }} {{ __("task.menu.create") }}">{{ __("task.menu.create") }}</span>
                        </a>
                    </li>
                    <li class="{{ ((isset($menu_active) && $menu_active == 'task_list') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("task") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("task.menu.name") }} {{ __("task.menu.list") }}">{{ __("task.menu.list") }}</span>
                        </a>
                    </li>
                    <li class="{{ ((isset($menu_active) && $menu_active == 'task_paid') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("task/paid") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("task.menu.name") }} {{ __("task.menu.paid") }}">{{ __("task.menu.paid") }}</span>
                        </a>
                    </li>
                    <li class="{{ ((isset($menu_active) && $menu_active == 'task_paid_property') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("task/paid/property") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("task.menu.name") }} {{ __("task.menu.paid_property") }}">{{ __("task.menu.paid_property") }}</span>
                        </a>
                    </li>
                    <li class="{{ ((isset($menu_active) && $menu_active == 'task_unpaid') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("task/unpaid") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("task.menu.name") }} {{ __("task.menu.unpaid") }}">{{ __("task.menu.unpaid") }}</span>
                        </a>
                    </li>
                    <li class="{{ ((isset($menu_active) && $menu_active == 'task_unpaid_property') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("task/unpaid/property") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("task.menu.name") }} {{ __("task.menu.unpaid_property") }}">{{ __("task.menu.unpaid_property") }}</span>
                        </a>
                    </li>
                </ul>
            </li>

            @if(Auth::user()->group_id === 69)
                <li class="navigation-header">
                    <span data-i18n="{{ __("sale.name") }}">{{ __("sale.name") }}</span>
                    <i data-feather="more-horizontal"></i>
                </li>
                <li class="nav-item">
                    <a class="d-flex align-items-center" href="{{ url("sale") }}">
                        <i data-feather="user"></i>
                        <span class="menu-title text-truncate"
                              data-i18n="{{ __("sale.menu.name") }}">{{ __("sale.menu.name") }}</span>
                    </a>
                    <ul class="menu-content">
                        <li class="{{ ((isset($menu_active) && $menu_active == 'sale_new') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/user/create") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.user.name") }} {{ __("configuration.menu.user.new") }}">{{ __("configuration.menu.user.new") }}</span>
                            </a>
                        </li>
                        <li class="{{ ((isset($menu_active) && $menu_active == 'sale_list') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/user") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.user.name") }} {{ __("configuration.menu.user.list") }}">{{ __("configuration.menu.user.list") }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
            @endif

            <li class="navigation-header">
                <span data-i18n="{{ __("lawn.name") }}">{{ __("lawn.name") }}</span>
                <i data-feather="more-horizontal"></i>
            </li>
            <li class="nav-item">
                <a class="d-flex align-items-center" href="{{ url("lawn") }}">
                    <i data-feather="user"></i>
                    <span class="menu-title text-truncate"
                          data-i18n="{{ __("lawn.menu.name") }}">{{ __("lawn.menu.name") }}</span>
                </a>
                <ul class="menu-content">
                    <li class="{{ ((isset($menu_active) && $menu_active == 'lawn_new') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("configuration/lawn/create") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("configuration.menu.lawn.name") }} {{ __("configuration.menu.lawn.new") }}">{{ __("configuration.menu.lawn.new") }}</span>
                        </a>
                    </li>
                    <li class="{{ ((isset($menu_active) && $menu_active == 'lawn_list') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("configuration/lawn") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("configuration.menu.lawn.name") }} {{ __("configuration.menu.lawn.list") }}">{{ __("configuration.menu.lawn.list") }}</span>
                        </a>
                    </li>
                </ul>
            </li>
            @if(Auth::user()->group_id >= 2)
                <li class="navigation-header">
                    <span data-i18n="{{ __("configuration.name") }}">{{ __("configuration.name") }}</span>
                    <i data-feather="more-horizontal"></i>
                </li>
                <li class="nav-item">
                    <a class="d-flex align-items-center" href="{{ url("configuration/user") }}">
                        <i data-feather="user"></i>
                        <span class="menu-title text-truncate"
                              data-i18n="{{ __("configuration.menu.user.name") }}">{{ __("configuration.menu.user.name") }}</span>
                    </a>
                    <ul class="menu-content">
                        <li class="{{ ((isset($menu_active) && $menu_active == 'configuration_user_new') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/user/create") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.user.name") }} {{ __("configuration.menu.user.new") }}">{{ __("configuration.menu.user.new") }}</span>
                            </a>
                        </li>
                        <li class="{{ ((isset($menu_active) && $menu_active == 'configuration_user_list') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/user") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.user.name") }} {{ __("configuration.menu.user.list") }}">{{ __("configuration.menu.user.list") }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="d-flex align-items-center" href="{{ url("configuration/customer/tax") }}">
                        <i data-feather="users"></i>
                        <span class="menu-title text-truncate"
                              data-i18n="{{ __("configuration.menu.customer.name") }}">{{ __("configuration.menu.customer.name") }}</span>
                    </a>
                    <ul class="menu-content">
                        <li class="{{ ((isset($menu_active) && $menu_active == 'configuration_customer_list') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/customer/create") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.customer.name") }} {{ __("configuration.menu.customer.new") }}">{{ __("configuration.menu.customer.new") }}</span>
                            </a>
                        </li>
                        <li class="{{ ((isset($menu_active) && $menu_active == 'configuration_customer_list') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/customer") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.customer.name") }} {{ __("configuration.menu.customer.list") }}">{{ __("configuration.menu.customer.list") }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="d-flex align-items-center" href="{{ url("configuration/tax") }}">
                        <i data-feather="send"></i>
                        <span class="menu-title text-truncate"
                              data-i18n="{{ __("configuration.menu.tax.name") }}">{{ __("configuration.menu.tax.name") }}</span>
                    </a>
                    <ul class="menu-content">
                        <li class="{{ ((isset($menu_active) && $menu_active == 'configuration_tax_list') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/tax/create") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.tax.name") }} {{ __("configuration.menu.tax.new") }}">{{ __("configuration.menu.tax.new") }}</span>
                            </a>
                        </li>
                        <li class="{{ ((isset($menu_active) && $menu_active == 'configuration_tax_list') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/tax") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.tax.name") }} {{ __("configuration.menu.tax.list") }}">{{ __("configuration.menu.tax.list") }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="d-flex align-items-center" href="{{ url("configuration/office") }}">
                        <i data-feather="user"></i>
                        <span class="menu-title text-truncate"
                              data-i18n="{{ __("office.menu.name") }}">{{ __("office.menu.name") }}</span>
                    </a>
                    <ul class="menu-content">
                        <li class="{{ ((isset($menu_active) && $menu_active == 'office_new') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/office/create") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.office.name") }} {{ __("configuration.menu.office.new") }}">{{ __("configuration.menu.office.new") }}</span>
                            </a>
                        </li>
                        <li class="{{ ((isset($menu_active) && $menu_active == 'office_list') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/office") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.office.name") }} {{ __("configuration.menu.office.list") }}">{{ __("configuration.menu.office.list") }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="d-flex align-items-center" href="{{ url("configuration/priority") }}">
                        <i data-feather="send"></i>
                        <span class="menu-title text-truncate"
                              data-i18n="{{ __("priority.menu.name") }}">{{ __("priority.menu.name") }}</span>
                    </a>
                    <ul class="menu-content">
                        <li class="{{ ((isset($menu_active) && $menu_active == 'priority_create') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/priority/create") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.priority.name") }} {{ __("configuration.menu.priority.new") }}">{{ __("configuration.menu.user.new") }}</span>
                            </a>
                        </li>
                        <li class="{{ ((isset($menu_active) && $menu_active == 'priority_list') ? "active" : "") }}">
                            <a class="d-flex align-items-center" href="{{ url("configuration/priority") }}">
                                <i data-feather="circle"></i>
                                <span class="menu-item text-truncate"
                                      data-i18n="{{ __("configuration.menu.priority.name") }} {{ __("configuration.menu.priority.list") }}">{{ __("configuration.menu.priority.list") }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
            @endif
            <li class="nav-item">
                <a class="d-flex align-items-center" href="{{ url("configuration/property") }}">
                    <i data-feather="user"></i>
                    <span class="menu-title text-truncate"
                          data-i18n="{{ __("property.menu.name") }}">{{ __("property.menu.name") }}</span>
                </a>
                <ul class="menu-content">
                    <li class="{{ ((isset($menu_active) && $menu_active == 'property_create') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("configuration/property/create") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("configuration.menu.property.name") }} {{ __("configuration.menu.property.new") }}">{{ __("configuration.menu.user.new") }}</span>
                        </a>
                    </li>
                    <li class="{{ ((isset($menu_active) && $menu_active == 'property_list') ? "active" : "") }}">
                        <a class="d-flex align-items-center" href="{{ url("configuration/property") }}">
                            <i data-feather="circle"></i>
                            <span class="menu-item text-truncate"
                                  data-i18n="{{ __("configuration.menu.property.name") }} {{ __("configuration.menu.userproperty.list") }}">{{ __("configuration.menu.user.list") }}</span>
                        </a>
                    </li>
                </ul>
            </li>

        </ul>
    </div>
</div>