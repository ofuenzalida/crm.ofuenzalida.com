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
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
]);


/**
 * Theme Vuexy archivos para comprimir
 */

mix.styles([
               "resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/css/vendors.min.css",
               "resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/bootstrap.css",
               "resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/bootstrap-extended.css",
               "resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/colors.css",
               "resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/components.css",
               "resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/themes/dark-layout.css",
               "resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/themes/bordered-layout.css",
               "resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/themes/semi-dark-layout.css"
           ], "public/assets/css/theme.css");

mix.styles([
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/css/forms/select/select2.min.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/css/pickers/pickadate/pickadate.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/css/pickers/flatpickr/flatpickr.min.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/css/charts/apexcharts.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/css/extensions/toastr.min.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/core/menu/menu-types/vertical-menu.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/pages/dashboard-ecommerce.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/plugins/charts/chart-apex.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/plugins/extensions/ext-component-toastr.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/plugins/forms/pickers/form-flat-pickr.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/css/plugins/forms/pickers/form-pickadate.css',
               'resources/themes/vuexy-html-bootstrap5-admin-template/assets/css/style.css',
           ], 'public/assets/css/theme-plugins.css');


mix.scripts(
    [
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/js/vendors.min.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/js/core/app-menu.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/js/core/app.js',
    ], 'public/assets/js/theme.js');

mix.scripts(
    [
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/js/extensions/toastr.min.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/js/pickers/pickadate/picker.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/js/pickers/pickadate/picker.date.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/js/pickers/pickadate/picker.time.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/js/pickers/pickadate/legacy.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/js/pickers/flatpickr/flatpickr.min.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/js/forms/select/select2.full.min.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/js/scripts/forms/form-select2.js',
        'resources/themes/vuexy-html-bootstrap5-admin-template/app-assets/vendors/js/charts/apexcharts.min.js'
    ], 'public/assets/js/theme-plugins.js');
