function isEmpty(str)
{
    return (!str || 0 === str.length);
}

function isBlank(str)
{
    return (!str || /^\s*$/.test(str));
}

function sacar_punto(val)
{
    return val.replace(/\./g, "");
}

function replaceAll(text, busca, reemplaza)
{
    while (text.toString().indexOf(busca) != -1)
    {
        text = text.toString().replace(busca, reemplaza);
    }
    return text;
}

function conComas(valor)
{
    var nums = new Array();
    var simb = "."; //Éste es el separador
    valor = valor.toString();
    valor = valor.replace(/\D/g, ""); //Ésta expresión regular solo permitira ingresar números
    nums = valor.split(""); //Se vacia el valor en un arreglo
    var longasdf = nums.length - 1; // Se saca la longitud del arreglo
    var patron = 3; //Indica cada cuanto se ponen las comas
    var prox = 2; // Indica en que lugar se debe insertar la siguiente coma
    var res = "";
    while (longasdf > prox)
    {
        nums.splice((longasdf - prox), 0, simb); //Se agrega la coma
        prox += patron; //Se incrementa la posición próxima para colocar la coma
    }
    for (var i = 0; i <= nums.length - 1; i++)
    {
        if (nums[0] == 0)
        {
            nums[0] = "";
        }
        res += nums[i]; //Se crea la nueva cadena para devolver el valor formateado
    }
    return res;
}


function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var waitingDialog = waitingDialog || (function ($)
{
    'use strict';

    // Creating modal dialog's DOM
    /*
     var $dialog = $(
     '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
     '<div class="modal-dialog modal-m">' +
     '<div class="modal-content">' +
     '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
     '<div class="modal-body">' +
     '<div class="progress" style="margin-bottom:0;"><div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" style="width: 100%"></div></div>' +
     '</div>' +
     '</div></div></div>');
     */
    var $dialog = $(
        '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content">' +
        '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
        '<div class="modal-body">' +
        '<div align="center" style="margin-bottom:0;"><div class="spinner-border text-primary" style="width:6rem;height: 6rem;"><span class="sr-only">Loading...</span></div></div>' +
        '</div>' +
        '</div></div></div>');
    return {
        /**
         * Opens our dialog
         * @param message Custom message
         * @param options Custom options:
         *                  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
         *                  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
         */
        show: function (message, options)
        {
            // Assigning defaults
            if (typeof options === 'undefined')
            {
                options = {};
            }
            if (typeof message === 'undefined')
            {
                message = 'Cargando...';
            }
            var settings = $.extend({
                                        dialogSize: 'm',
                                        progressType: '',
                                        onHide: null // This callback runs after the dialog was hidden
                                    }, options);

            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType)
            {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function')
            {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e)
                {
                    settings.onHide.call($dialog);
                });
            }
            // Opening dialog
            $dialog.modal();
        },
        /**
         * Closes dialog
         */
        hide: function ()
        {
            $dialog.modal('hide');
        }
    };

})(jQuery);


function dd()
{
    if (!app.debug)
    {
        return;
    }

    if (isDebugInfo)
    {
        console.log(arguments);//isDebugInfo
    }
}

var load_csrf = function ()
{
    $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
}

var decodeHtmlEntity = function (str)
{
    return str.replace(/&#(\d+);/g, function (match, dec)
    {
        return String.fromCharCode(dec);
    });
};


var ajax = function (id_html, method, json)
{
    $.ajax({
               data: $('#productForm').serialize(),
               url: "{{ route('ajaxproducts.store') }}",
               type: method,
               dataType: 'json',
               success: function (data)
               {
                   $('#productForm').trigger("reset");
                   $('#ajaxModel').modal('hide');
                   table.draw();
                   $(id_html).html(data);
               },
               error: function (data)
               {
                   if (isDebugInfo)
                   {
                       console.log('Error:', data);//isDebugInfo
                   }
                   $('#saveBtn').html('Save Changes');
               }
           });
}
var encodeHtmlEntity = function (str)
{
    var buf = [];
    for (var i = str.length - 1; i >= 0; i--)
    {
        buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('');
};

sidebarSearch = function (value, items, select, container)
{
    dd('sidebarSearch');

    var _items,
        $list = $(container);
    dd('sidebarSearch.hide.complete');

    if (value !== '')
    {
        $('.group .group-heading', $list).hide();

        $('li[' + select + ']', $list).addClass('hidden');
        $('tr[' + select + ']', $list).addClass('hidden');

        _items = items.filter(function (item)
                              {
                                  return (item.searchValue.indexOf(value) >= 0);
                              });

        $.each(_items, function (index, item)
        {
            $('li[' + select + '="' + item.id() + '"]', $list).removeClass('hidden');
            $('tr[' + select + '="' + item.id() + '"]', $list).removeClass('hidden');
        });

    }
    else
    {
        $('li[' + select + ']', $list).removeClass('hidden');
        $('tr[' + select + ']', $list).removeClass('hidden');
    }

    $('.group', $list).each(function ()
                            {
                                var $group = $(this);

                                if ($('.group-list li[' + select + ']:not(.hidden)', $group).length)
                                {
                                    $('.group-heading', $group).show();

                                    $('.collapse', $group).addClass('in');
                                    $('.group-title', $group).removeClass('collapsed');
                                }
                            });

    if (value === '')
    {
        $('.group-title[aria-expanded="false"]', $list).addClass('collapsed');
        $('.collapse[aria-expanded="false"]', $list).removeClass('in');
    }
};

function handlerFail(jqXHR, textStatus, errorThrown)
{
    dd(jqXHR, textStatus, errorThrown);

    if (jqXHR.status == 401)
    {
        return window.location.reload();
    }

    if (jqXHR.status == 503)
    {
        return window.location.reload();
    }
}

function handlerFailTarget(jqXHR, textStatus, errorThrown, target)
{
    handlerFail(jqXHR, textStatus, errorThrown);

    var
        _text = jqXHR.responseText,
        _dom = $(_text);

    if (_dom.find('.modal-body').length)
    {
        _text = _dom.find('.modal-body').html();
    }

    target.html(_text);
}

function handlerFailModal(jqXHR, textStatus, errorThrown)
{
    handlerFail(jqXHR, textStatus, errorThrown);

    modal = $modal.initModal('error-modal');
    modal.find('.contents').html(jqXHR.responseText);
    modal.modal('show');

    initComponents(modal);
}

function fetchFromObject(obj, prop)
{

    if (typeof obj === 'undefined')
    {
        return false;
    }

    var _index = prop.indexOf('.');

    if (_index > -1)
    {
        return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return obj[prop];
}

function dialogMoveToTop(el, check)
{
    var elz = parseInt(el.css('z-index'));
    var index = parseInt(el.css('z-index'));
    $.each($('.ui-dialog.ui-widget.ui-widget-content'), function (key, value)
    {
        if (index < parseInt($(this).css('z-index')))
        {
            index = parseInt($(this).css('z-index'));
        }
    });

    if ((elz < index && typeof check === 'undefined') || typeof check !== 'undefined')
    {
        el.css('z-index', index + 2);
    }
}

function convertHex(hex, opacity)
{
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';

    return result;
}

function degToLatLng(deg)
{
    var arr = deg.split(':');

    var d = parseFloat(arr[0]);
    var m = parseInt(arr[1]);
    var s = parseFloat(arr[2]);

    var v = (Math.abs(d) + (m / 60) + (s / 3600));
    if (d < 0.0)
    {
        v = 0.0 - v;
    }

    return v.toFixed(6);
}

function placesRouteLatLngsToPointsString(a)
{
    if (a.length > 0)
    {
        var d = [];
        for (var c = 0; c < a.length; c++)
        {
            var f = a[c];
            var e = f.lat;
            var b = f.lng;
            d.push({lat: parseFloat(e).toFixed(6), lng: parseFloat(b).toFixed(6)});
        }
        return JSON.stringify(d);
    }

    return '';
}

function isNumeric(n)
{
    return !isNaN(parseFloat(n)) && isFinite(n);
}

var DateDiff = {

    inDays: function (d1, d2)
    {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1, d2)
    {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1, d2)
    {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2)
    {
        return d2.getFullYear() - d1.getFullYear();
    }
};

function momentCalendar(val, parent)
{
    var date_from = $(parent).find('input[name="date_from"]');
    var date_to = $(parent).find('input[name="date_to"]');
    var format = 'YYYY-MM-DD';
    var weekday = typeof app.settings.weekStart !== "undefined" ? app.settings.weekStart : 1;

    var startMoment = moment();
    var endMoment = moment();

    switch (val)
    {
        case "1": //today
            endMoment = endMoment.add(1, "days");

            break;
        case "2": //yesterday
            startMoment = startMoment.subtract(1, "days");

            break;
        case "3": //before 2 days
            startMoment = startMoment.subtract(2, "days");
            endMoment = endMoment.subtract(1, "days");

            break;
        case "4": //before 3 days
            startMoment = startMoment.subtract(3, "days");
            endMoment = endMoment.subtract(2, "days");

            break;
        case "5": //this week
            //to work with other week start days than mon, sun
            var sub = weekday > 1 ? 1 : 0;

            startMoment = startMoment.startOf('isoWeek').isoWeekday(weekday).subtract(sub, 'week');
            endMoment = endMoment.startOf('isoWeek').isoWeekday(weekday).subtract(sub, 'week').add(1, 'week');

            break;
        case "6": //last week
            //to work with other week start days than mon, sun
            var sub = weekday > 1 ? 2 : 1;

            startMoment = startMoment.startOf('isoWeek').isoWeekday(weekday).subtract(sub, 'week');
            endMoment = endMoment.startOf('isoWeek').isoWeekday(weekday).subtract(sub, 'week').add(1, 'week');

            break;
        case "7": //this month
            startMoment = startMoment.startOf('month');
            endMoment = endMoment.startOf('month').add(1, 'month');

            break;
        case "8": //last month
            startMoment = startMoment.startOf('month').subtract(1, 'month');
            endMoment = endMoment.startOf('month');

            break;
        case "9": //last 3 months
            startMoment = startMoment.startOf('month').subtract(3, 'month');
            endMoment = endMoment.startOf('month');

            break;
    }

    date_from.val(startMoment.minute(0).hour(0).format(format));
    date_to.val(endMoment.minute(0).hour(0).format(format));
}

function secondsToTime(_seconds)
{
    var
        hours = Math.floor(_seconds / (60 * 60)),
        divisor_for_minutes = _seconds % (60 * 60),
        minutes = Math.floor(divisor_for_minutes / 60),
        divisor_for_seconds = divisor_for_minutes % 60,
        seconds = Math.ceil(divisor_for_seconds);

    if (hours < 0 || minutes < 0 || seconds < 0)
    {
        return '0' + window.lang.short_s;
    }

    return (hours ? hours + window.lang.short_h + ' ' : '') + (minutes ? minutes + window.lang.short_m + " " : '') + seconds + window.lang.short_s;
}

function ticketState(type)
{
    let name = '';
    switch (type)
    {
        case 0:
        {
            name = 'Inicio/Rechazado';
            break;
        }
        case 1:
        {
            name = 'Inicio/Aceptado';
            break;
        }
        case 2:
        {
            name = 'ACK';
            break;
        }
        case 3:
        {
            name = 'Cargando';
            break;
        }
        case 4:
        {
            name = 'A Obra';
            break;
        }
        case 5:
        {
            name = 'En Obra';
            break;
        }
        case 6:
        {
            name = 'Camión en espera en obra';
            break;
        }
        case 7:
        {
            name = 'Camión en obra, fue rechazado';
            break;
        }
        case 8:
        {
            name = 'Descargando';
            break;
        }
        case 9:
        {
            name = 'Fin descargando';
            break;
        }
        case 10:
        {
            name = 'Camión no lavo en obra';
            break;
        }
        case 11:
        {
            name = 'Camión esta lavando';
            break;
        }
        case 12:
        {
            name = 'A Planta';
            break;
        }
        case 13:
        {
            name = 'En Patio';
            break;
        }
    }
    return name;
}

/**
 * Función que recibe el kilometraje completo pero corta los ultimos
 * 3 digitos, ya que estos representan los Metros
 * @param kms
 * @returns {*}
 */
function odometerKm(kms = null)
{
    if (kms == null)
    {
        return "S/I";
    }
    else
    {
        return conComas(kms.slice(0, -3));
    }
}


/**
 * Funcion para detectar cuando se hace click en un botton con class btn-href
 * al detectar el click, este redirecciona al browser a la pagina que viene en el atributo
 * btn-href del botton
 *
 * Example:   <button class="btn-href" btn-href="http://google.cl">Click para ir a google</button>
 */
if ($(".btn-href").length > 0)
{
    $(".btn-href").on("click", function ()
    {
        window.location.href = $(this).attr("btn-href");
    });
}

/**
 *
 *  Remenber.js / Grupo de funciones para recordar inicio de sesion de usuarios
 **/


/**
 *  convertBinary / funcion que convierte string a codigo binario y viceversa
 **/
function convertBinary(o, string)
{
    let out = "";
    if (o == "true")
    {
        string = string.split(' ');
    }
    if (string !== undefined)
    {
        for (var i = 0; i < string.length; i++)
        {
            if (o == "false")
            {
                out += string[i].charCodeAt(0).toString(2) + ' ';
            }
            if (o == "true")
            {
                out += String.fromCharCode(parseInt(string[i], 2));
            }
        }
    }
    return out;
}

/**
 *  resetInputLogin / funcion que limpia los input de email y contraseña del login
 **/
function resetInputLogin()
{
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    $('#customCheck1').prop('checked', false);
}

/**
 *  saveLocal / funcion que graba los registros de inicio de sesion en LocalStore
 **/
function saveLocal(o)
{
    let email = $('#email').val();
    let passw = convertBinary("false", $('#password').val());
    if (email == "" && passw == "" && o != "true")
    {
        resetInputLogin();
    }
    localStorage.setItem("email", email);
    localStorage.setItem("password", passw);
    localStorage.setItem("customCheck1", o);
}

/**
 *  rememberMe / funcion principal para renococer y ver si corresponde la opciòn Recuerdame
 *
 **/
function rememberMe()
{
    let email = $('#email').val();
    let passw = $('#password').val();
    if ($('#customCheck1').is(":checked"))
    {
        saveLocal("true");
    }
    else
    {
        saveLocal("false");
    }
}

/**
 *  ready / funcion jquery que se encarga de ejecutar todo lo relacionado con opciòn Recuerdame
 **/
$(document).ready(function ()
                  {
                      if (localStorage.getItem("customCheck1") == "true")
                      {
                          $('#customCheck1').prop('checked', true);
                          $('#email').val(localStorage.getItem("email"));
                          let passw = convertBinary("true", localStorage.getItem("password"));
                          $('#password').val(passw);
                      }
                      else
                      {
                          saveLocal("false");
                      }
                      $("#customCheck1").on("click", function ()
                      {
                          rememberMe();
                      });

                      /**
                       * Popup imagen
                       */
                      $(".popImg").on("click", function ()
                      {
                          let imgSrc = this.lastElementChild.currentSrc;
                          $('#imagePreview').attr('src', imgSrc);
                          $('#imageModal').modal('show');
                      });

                  });

