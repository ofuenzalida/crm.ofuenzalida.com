const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').postCss('resources/css/app.css', 'public/css', [
    require('tailwindcss'),
    require('autoprefixer'),
]);


mix.styles([
               'resources/lib/leaflet/leaflet.css',
               'resources/lib/leaflet/cluster/MarkerCluster.css',
               'resources/lib/leaflet/cluster/MarkerCluster.Default.css',
               'resources/lib/leaflet/leaflet-custom.css',
               'resources/lib/map.css',
               ///'resources/css/custom.css',
               ///'resources/css/asdf.css',
               'resources/css/semaforo.css',
               'resources/css/tracking.css',
               'resources/css/bubble.css',
               'resources/css/vehicle.css',
               'resources/css/ticket.css',
               'resources/css/map.css',
               'resources/css/worksheet.css'
           ],
           'public/assets/css/map-tools.css'
);


mix.styles([
               'resources/css/libs/extensions/sweetalert2.min.css',
               'resources/css/libs/vendors.min.css',
               'resources/css/libs/ui/prism.min.css',
               ///'resources/css/libs/bootstrap.css',
               ///'resources/css/libs/bootstrap-extended.css',
               'resources/css/libs/colors.css',
               'resources/css/libs/components.css',
               'resources/css/libs/themes/dark-layout.css',
               'resources/css/libs/themes/semi-dark-layout.css',
               'resources/css/libs/core/menu/menu-types/vertical-menu.css',
               'resources/css/libs/core/colors/palette-gradient.css',
               'resources/css/libs/extensions/toastr.css',
           ], 'public/assets/css/libs.css')

mix.styles([
               'resources/theme-vuexy/app-assets/vendors/css/tables/datatable/dataTables.bootstrap5.min.css',
               'resources/theme-vuexy/app-assets/vendors/css/tables/datatable/responsive.bootstrap5.min.css',
               'resources/theme-vuexy/app-assets/vendors/css/tables/datatable/buttons.bootstrap5.min.css',
               'resources/theme-vuexy/app-assets/vendors/css/tables/datatable/rowGroup.bootstrap5.min.css',
           ], 'public/assets/css/datatables.css');


mix.scripts(
    [
        'resources/lib/leaflet/leaflet.js',
        'resources/lib/leaflet/cluster/leaflet.markercluster.js',
        'resources/lib/leaflet/layer/Marker.Rotate.js',
        'resources/lib/leaflet/label/leaflet.label.js',
        'resources/lib/leaflet/Leaflet.Marker.SlideTo.js',
        ///'resources/lib/leaflet/Leaflet.GoogleMutant.js',
    ], 'public/assets/js/map-tools.js'
);

mix.scripts([
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/jquery.dataTables.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/dataTables.bootstrap5.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/dataTables.responsive.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/responsive.bootstrap5.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/datatables.checkboxes.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/datatables.buttons.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/jszip.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/pdfmake.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/vfs_fonts.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/buttons.html5.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/buttons.print.min.js',
                'resources/theme-vuexy/app-assets/vendors/js/tables/datatable/dataTables.rowGroup.min.js',
            ], 'public/assets/js/datatables.js');

mix.scripts(
    [
        'resources/js/helpers/helper.js',
        'resources/js/controller/map.js',
        'resources/js/controller/alert.js',
        'resources/js/controller/popup.js',
        'resources/js/controller/vehicle.js',
        'resources/js/controller/vehicleRent.js',
        'resources/js/controller/vehicleBulk.js',
        'resources/js/controller/vehicleGeneral.js',
        'resources/js/controller/plant.js',
        'resources/js/controller/job.js',
        'resources/js/controller/coverage.js',
        'resources/js/controller/workshop.js',
        'resources/js/controller/ticket.js',
        'resources/js/controller/sos.js',
        'resources/js/controller/app.js',
        'resources/js/controller/azmap.js',
        'resources/js/controller/serviceWorksheet.js',
        'resources/js/controller/controlling.js',
        'resources/js/controller/cpadminDashboard.js',
    ], 'public/assets/js/aztrack.js'
);

/**
 * Theme Vuexy archivos para comprimir
 */


mix.styles([
               'resources/theme-vuexy/app-assets/vendors/css/vendors.min.css',
           ], 'public/assets/css/theme.css');

mix.styles([
               'resources/theme-vuexy/app-assets/vendors/css/charts/apexcharts.css',
               'resources/theme-vuexy/app-assets/vendors/css/extensions/toastr.min.css',
               'resources/theme-vuexy/app-assets/css/pages/dashboard-ecommerce.css',
               'resources/theme-vuexy/app-assets/css/plugins/charts/chart-apex.css',
               'resources/theme-vuexy/app-assets/css/plugins/extensions/ext-component-toastr.css',
               'resources/theme-vuexy/app-assets/vendors/css/pickers/flatpickr/flatpickr.min.css',
               'resources/theme-vuexy/app-assets/vendors/css/forms/spinner/jquery.bootstrap-touchspin.css',
               'resources/theme-vuexy/app-assets/vendors/css/forms/select/select2.min.css',
               'resources/theme-vuexy/app-assets/vendors/css/pickers/pickadate/pickadate.css',
               'resources/theme-vuexy/app-assets/css/plugins/forms/pickers/form-flat-pickr.css',
               'resources/theme-vuexy/app-assets/css/plugins/forms/pickers/form-pickadate.css',
               'resources/theme-vuexy/app-assets/css/bootstrap.css',
               'resources/theme-vuexy/app-assets/css/bootstrap-extended.css',
               'resources/theme-vuexy/app-assets/css/colors.css',
               'resources/theme-vuexy/app-assets/css/components.css',
               'resources/theme-vuexy/app-assets/css/themes/dark-layout.css',
               'resources/theme-vuexy/app-assets/css/themes/bordered-layout.css',
               'resources/theme-vuexy/app-assets/css/themes/semi-dark-layout.css',
               'resources/theme-vuexy/app-assets/css/core/menu/menu-types/vertical-menu.css'
           ], 'public/assets/css/theme-plugins.css');

mix.scripts(
    [
        'resources/theme-vuexy/app-assets/vendors/js/vendors.min.js',
    ], 'public/assets/js/theme.js'
);


mix.scripts(
    [
        'resources/theme-vuexy/app-assets/vendors/js/charts/apexcharts.min.js',
        'resources/theme-vuexy/app-assets/vendors/js/extensions/toastr.min.js',
        'resources/theme-vuexy/app-assets/js/core/app-menu.js',
        'resources/theme-vuexy/app-assets/js/core/app.js',
        'resources/theme-vuexy/app-assets/vendors/js/pickers/flatpickr/flatpickr.min.js',
        'resources/theme-vuexy/app-assets/vendors/js/forms/select/select2.full.min.js',
        'resources/theme-vuexy/app-assets/js/scripts/forms/form-select2.js',
        'resources/theme-vuexy/app-assets/vendors/js/forms/validation/jquery.validate.min.js'
    ], 'public/assets/js/theme-plugins.js'
);