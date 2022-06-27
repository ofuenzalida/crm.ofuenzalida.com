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

    if (isDebugInfo) {
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
                   if (isDebugInfo) {
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
        asdf.loadingOpen();
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
function convertBinary(o,string)
{
	let out = "";
	if (o == "true") string = string.split(' ');
    if (string !== undefined)
    {    
    	for (var i = 0; i < string.length; i++)
    	{
    	    if (o == "false") out += string[i].charCodeAt(0).toString(2) + ' ';
    	    if (o == "true")  out += String.fromCharCode(parseInt(string[i], 2));
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
	let passw = convertBinary("false",$('#password').val());
	if (email == "" && passw == "" && o != "true") resetInputLogin();
	localStorage.setItem("email",email);
    localStorage.setItem("password",passw);
    localStorage.setItem("customCheck1",o);
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
	else saveLocal("false");
}

/**
*  ready / funcion jquery que se encarga de ejecutar todo lo relacionado con opciòn Recuerdame
**/
$(document).ready(function()
{
	if (localStorage.getItem("customCheck1") == "true")
	{
		$('#customCheck1').prop('checked', true);
	    $('#email').val(localStorage.getItem("email"));
	    let passw = convertBinary("true",localStorage.getItem("password"));
	    $('#password').val(passw);
	}
	else saveLocal("false");
	$("#customCheck1").on("click", function() { rememberMe(); });
});



// se da funcionalidad de click simple a doble click en mapa
if(map != undefined){
    map._events.dblclick = map._events.click
    // se elimina cualquier evento click izquierdo en el MAPA
    map._events.click = false
}

/**
 * Libreria para manipulación de alertas en el sistema
 */
function Alert()
{
    let _this = this;
    // this.alert_types = ['rpm_alert','speed_alert','sos_alert','signal_alert','taller_alert'];
    
    _this.error = function (title, body)
    {
        _this.show(title, body, 'error');
    };

    _this.success = function (title, body)
    {
        _this.show(title, body, 'success');
    };

    _this.info = function (title, body)
    {
        _this.show(title, body, 'info');
    };

    _this.warning = function (title, body)
    {
        _this.show(title, body, 'warning');
    };

    _this.show = function (title, body, type)
    {
        swal.fire({
                      title: title || 'Peligro',
                      text: body || 'Sin Información',
                      type: type || 'info'
                  });
    }

    _this.prompt = function (title, body, icon)
    {
        swal({
                 title: title || 'Alerta',
                 text: body || 'Sin Información',
                 icon: icon || 'warning',
                 buttons: true,
                 dangerMode: true,
             })
            .then((willDelete) =>
                  {
                      return willDelete;
                      // if (willDelete)
                      // {
                      //     swal("Poof! Your imaginary file has been deleted!", {
                      //         icon: "success",
                      //     });
                      // }
                      // else
                      // {
                      //     swal("Your imaginary file is safe!", {
                      //         icon: "error",
                      //     });
                      // }

                  });
    };

    _this.paintIntoHtmlSpeedAlert = function (data,total,alert_type){
        document.getElementById('popup_speed_num').textContent = total;
        document.getElementById('popup_speed_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable-container-speedlimit');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-speedlimit">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.vehicles_id} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> |
                                     ${element.speed} Km/s&nbsp;
                                 </p>
                                 <small class="notification-text">
                                     (${element.assgn_plant_code}) | ${element.addr_line_1} | 
                                     ${element.device_time_local}| ${element.rpm} RPM
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.paintIntoHtmlRpmAlert = function (data,total,alert_type){
        document.getElementById('popup_rpm_num').textContent = total;
        document.getElementById('popup_rpm_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable-container-rpmlimit');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-rpmlimit">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.vehicles_id} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> |
                                     ${element.speed} Km/s&nbsp;
                                 </p>
                                 <small class="notification-text">
                                     (${element.assgn_plant_code}) | ${element.addr_line_1} | 
                                     ${element.device_time_local}| ${element.rpm} RPM
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.paintIntoHtmlSOSAlert = function (data,total,alert_type){
        document.getElementById('popup_sos_num').textContent = total;
        document.getElementById('popup_sos_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable-container-sosalert');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-sosalert">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.truck_code} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> 
                                 </p>
                                 <small class="notification-text">
                                     (${element.plant_code}) | ${element.plant_name} | 
                                     ${element.description}| ${element.created_at}
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }
    
    _this.paintIntoHtmlNoSignalAlert = function (data,total,alert_type){
        document.getElementById('popup_not_senal_num').textContent = total;
        document.getElementById('popup_not_senal_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable-container-not-senal-alert');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-not-senal-alert">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.truck_code} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> 
                                 </p>
                                 <small class="notification-text">
                                     (${element.plant_code}) | ${element.plant_name} | 
                                      ${element.device_time_local}
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.paintIntoHtmlWorkShoplAlert = function (data,total,alert_type){
        document.getElementById('popup_workshop_num').textContent = total;
        document.getElementById('popup_workshop_num_collapse').textContent = total;

        let collapseinfo = document.getElementById('scrollable_container_workshop_alert');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable_container_workshop_alert">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.truck_code} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> 
                                 </p>
                                 <small class="notification-text">
                                     (${element.addr_line_1}) | ${element.name} | 
                                      ${element.device_time_local}
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.paintIntoHtmlBatteryAlert = function (data,total,alert_type){
        document.getElementById('popup_batery_num').textContent = total[0]['counter'];
        document.getElementById('popup_batery_num_collapse').textContent = total[0]['counter'];

        let collapseinfo = document.getElementById('scrollable-container-baterylimit');
        let htmlContent = '';
        
        htmlContent += `<li class="scrollable-container media-list" id="scrollable-container-baterylimit">`
        data.forEach(element => {
            htmlContent += `<a class="d-flex" href="javascript:void(0)">
                         <div class="media d-flex align-items-start">
                             <div class="media-left">
                                 <div class="avatar bg-light-warning">
                                     <div class="avatar-content">
                                         <i class="avatar-icon" data-feather="alert-triangle"></i>
                                     </div>
                                 </div>
                             </div>
                             <div class="media-body">
                                 <p class="media-heading">
                                     Vehículo | ${element.truck_code} |
                                     <span class="font-weight-bolder">${element.lic_num}</span> 
                                 </p>
                                 <small class="notification-text">
                                     (${element.addr_line_1}) | ${element.name} | 
                                      ${element.device_time_local}
                                 </small>
                             </div>
                         </div>
                     </a>`;
        })
        htmlContent += "</li>";
        collapseinfo.innerHTML= htmlContent;        
    }

    _this.callApi = function (alert_type){
        axios
            .get(url + "/api/v2/alert/"+alert_type+"/" + user.id)
            .then((response) => {
                if('speed_alert' == alert_type){
                    _this.paintIntoHtmlSpeedAlert(response.data.top10,response.data.count,alert_type);
                } else if('rpm_alert' == alert_type){
                    _this.paintIntoHtmlRpmAlert(response.data.top10,response.data.count,alert_type);
                } else if('sos_alert' == alert_type){
                    _this.paintIntoHtmlSOSAlert(response.data.top10,response.data.count,alert_type);
                } else if('no_signal_alert' == alert_type){
                    _this.paintIntoHtmlNoSignalAlert(response.data.top10,response.data.count,alert_type);
                } else if('workshop_alert' == alert_type){
                    _this.paintIntoHtmlWorkShoplAlert(response.data.top10,response.data.count,alert_type);
                } else if('battery_disconnect_alert' == alert_type){
                    _this.paintIntoHtmlBatteryAlert(response.data.top10,response.data.count,alert_type);
                }
            })
            .catch(function (error)
            {
                if (isDebugCatch)
                {
                    console.error("AJAX | ERROR _> " + error);
                }
            });
    }

    _this.add = function (){
        _this.callApi('speed_alert');
        _this.callApi('rpm_alert');
        _this.callApi('sos_alert');
        _this.callApi('no_signal_alert');
        _this.callApi('workshop_alert');
        _this.callApi('battery_disconnect_alert');
    }

    _this.reload = function ()
    {
        setInterval(function () {
            _this.callApi('speed_alert');
            _this.callApi('rpm_alert');
            _this.callApi('sos_alert');
            _this.callApi('no_signal_alert');
            _this.callApi('workshop_alert');
            _this.callApi('battery_disconnect_alert');
        }, ajax_timer);
    };
}

/**
 * Libreria para manipulación de Popud en el sistema
 */
function Popup()
{
    let _this = this;
    let timeOut = 10000;

    _this.error = function (title, body)
    {
        toastr.error(body || 'Sin información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.success = function (title, body)
    {
        toastr.success(body || 'Sin información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.info = function (title, body)
    {
        toastr.info(body || 'Sin Información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.warning = function (title, body)
    {
        toastr.warning(body || 'Sin Información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.loading = function (title, body)
    {
        toastr.warning(body || 'Sin información', title || 'Sin Información', {
            "progressBar": true,
            "closeButton": true,
            "timeOut": timeOut,
        });
    };

    _this.show = function (title, body, type)
    {
        switch (type)
        {
            case 'error':
            {
                _this.error(title, body);
                break;
            }
            case 'success':
            {
                _this.error(title, body);
                break;
            }
            case 'warning':
            {
                _this.error(title, body);
                break;
            }
            case 'info':
            {
                _this.error(title, body);
                break;
            }
            default:
            {
                _this.info(title, body);
                break;
            }
        }
    };

    _this.prompt = function (title, body, icon)
    {
        swal({
                 title: title || 'Alerta',
                 text: body || 'Sin Información',
                 icon: icon || 'warning',
                 buttons: true,
                 dangerMode: true,
             })
            .then((willDelete) =>
                  {
                      return willDelete;
                  });
    };
}

/**
 * Libreria para manipulación de vehiculos en el sistema
 */
function Vehicle()
{
    let _this = this;


    /**
    /** Function para obtener la fecha de los estados de los vheiculos
    */
    _this.statesvehiclesdate = function (div,ticket_code)
    { 

        let fdiv = div + "_" + ticket_code;
        let uri = "tracking/export/excel/history/ticket?ticket_code="+ticket_code+"&tbl=true";
        if (ticket_code !== "" || ticket_code !== 0)
        {    
            let rst;
            let cont;
            let fcont;
            let hcont;
            
            fetch(uri)
                .then(rst => rst.json())
                .then((rst) => {

                    to_job_star = "2022-01-06T13:09:01.000000Z";
                    
                    if (div == "ao") cont = rst.to_job_start.slice(0, 16);
                    if (div == "eo") cont = trst.job_start.slice(0, 16);
                    if (div == "de") cont = rst.unload_start.slice(0, 16);
                    if (div == "ap") cont = rst.to_plant_start.slice(0, 16);

                    //cont = "";
                                                                    
                   if (cont !== "" || cont !== null)
                   {    
                        fcont = cont.slice(0, 10);
                        hcont = cont.slice(10, 16);
                        fcont = fcont.replace('T',' ');
                        hcont = hcont.replace('T',' ');
                        fcont = fcont.replace(' ','');
                        hcont = hcont.replace(' ','');
                    }
                    else
                    {
                       fcont = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;";
                       hcont = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;";
                    }    

                    cont = ` 
                        <table border = "1">
                           <tr>
                              <td>`+fcont+`</td>
                           </tr>
                           <tr>
                              <td>`+hcont+`</td>
                           </tr>
                        </table>`                                                                                    
                       document.getElementById(fdiv).innerHTML = cont;
                })   
                .catch((err) => 
                {
                   console.log(err);
                });                                                                                        
            }
    }

    // var on_focus_vehicle;

    // var selected_vehicle = null;

    _this.show = function (id)
    {
        try
        {
            if (typeof vehicles_markers[id] !== 'undefined')
            {
                /**
                 * Mostramos el camión en el mapa
                 */
                vehicle_marker_cluster.addLayer(vehicles_markers[id]);
                /**
                 * Mostramos sus ultimos puntos en el mapa
                 */
                _this.showRoute(id);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.error('VEHICLE | show | No existe el vehiculo ID _> ' + id);
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | show | ERROR _> ' + e)
            }
        }
    };

    _this.delete = function (id)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE | delete | Eliminando _> ' + id); //isDebugInfo
            }

            if (typeof vehicles[id] !== 'undefined')
            {
                /**
                 * Eliminamos el camion del mapa
                 */
                vehicle_marker_cluster.removeLayer(vehicles_markers[id])

                if (typeof vehicles_markers[id] !== "undefined")
                {
                    /**delete vehicles_markers[id]*/
                }
                /**
                 * Eliminamos sus ultimos puntos del camión en el mapa
                 */
                _this.hiddenRoute(id);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('VEHICLE | delete | No existe la vehicles ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | delete | ERROR _> ' + e)
            }
        }
    };

    _this.add = function (vehicle)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE | add | ID _> ' + vehicle.id);
            }

            let icon = null;
            let course = 0;
            let width = 50;
            let height = 81;
            let position = new L.LatLng(vehicle.latitude, vehicle.longitude);
            let html = '';

            if (user.group_id == 69)
            {
                icon = '<img src="' + vehicle.icon_az_map + '"/>';
            }
            else
            {
                icon = '<img src="' + vehicle.icon_map + '"/>';
            }

            course = vehicle.course;

            html += '<span class="name"><i>' + vehicle.name + ' (' + (vehicle.speed || '0') + ' km)' + '</i></span><br/>';
            html += icon;

            let iconAnchor = [(width / 2), (height / 2)];

            let divIcon = L.divIcon({
                                        html: html,
                                        className: 'leaf-device-marker',
                                        iconSize: [width, height],
                                        iconAnchor: iconAnchor,
                                        popupAnchor: [0, 0 - height]
                                    });

            /* Limpieza de variable y reemplazo de contenido */
            vehicles[vehicle.id] = vehicle;

            let ticket = '<table>';
            let ticket_exit = false;
            if (typeof vehicle.tickets_id !== 'undefined' && vehicle.id != null && vehicle.tickets_id > 0)
            {
                ticket_exit = true;
                ticket += '<tr><td><strong>Vehículo:</strong></td><td>' + vehicle.vehicle_unit_code + '</td></tr>';
                ticket += '<tr><td><strong>Planta:</strong></td><td>' + vehicle.t_m_tp_sd_a_full_address + '</td></tr>';
                ticket += '<tr><td><strong>Obra:</strong></td><td>' + vehicle.t_m_tp_sj_a_postal_code + '</td></tr>';
                ticket += '<tr><td><strong>Ticket Code:</strong></td><td>' + vehicle.t_m_tp_ji_ticket_code + '</td></tr>';
                ticket += '<tr><td><strong>Operador:</strong></td><td>' + ((vehicle.operator != null) ? vehicle.operator : "Sin información") + '</td></tr>';
                ticket += '<tr><td><strong>Nivel Señal:</strong></td><td>' + ((vehicle.rssi != null) ? vehicle.rssi : "Sin información") + '</td></tr>';
                ticket += '<tr><td><strong>Cliente:</strong></td><td>' + vehicle.t_m_tp_sj_id + '</td></tr>';
                ticket += '<tr><td><strong>Dirección Cliente:</strong></td><td>' + vehicle.t_m_tp_sj_a_full_address + '</td></tr>';
                ticket += '<tr><td><strong>m³:     </strong></td><td>' + vehicle.t_m_tp_ji_t_m_tp_ji_ticket_qty + '</td></tr>';

                if (vehicle.driver != null)
                {
                    ticket += '<tr><td><strong>Chofer:</strong></td><td>' + vehicle.driver.name + '</td></tr>';
                }
            }
            ticket += '</table>';


            if (ticket_exit)
            {
                /**
                 *  Limpieza de variable
                 */
                vehicles_markers[vehicle.id] = L.marker(position, {
                    iconAngle: vehicle.course,
                    icon: divIcon,
                    title: vehicle.name || 'S/I'
                },).bindPopup(ticket || 'S/I', {maxWidth: 500});
            }
            else
            {
                /**
                 *  Limpieza de variable
                 */
                vehicles_markers[vehicle.id] = L.marker(position, {
                    iconAngle: vehicle.course,
                    icon: divIcon,
                    title: vehicle.name || 'S/I'
                },).bindPopup('No existe ticket procesado aún...', {maxWidth: 500});
            }

            _this.show(vehicle.id);

            /**
             * Creación de linea que pone visible la ruta del camión antes de la nueva transmisión
             * @type {*[]}
             */
            position = [];
            let coordinate;

            if ((typeof vehicle.latest_positions_new === 'string') && vehicle.latest_positions_new != '')
            {
                coordinate = JSON.parse(vehicle.latest_positions_new);
            }
            else
            {
                coordinate = vehicle.latest_positions_new;
            }
            /**
             * Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
             */
            if (vehicle.latitude != null || vehicle.longitude != null)
            {
                position.push([vehicle.latitude, vehicle.longitude]);
                /**
                 * Verificamos si existen datos para analizar si recorremos los datos de la cola del mixer
                 */
                if (coordinate != null)
                {
                    for (let i = 0; i < coordinate.length; i++)
                    {
                        position.push([coordinate[i].lat, coordinate[i].lng]);
                    }
                }

                vehicles_tail[vehicle.id] = L.polyline(position, {
                    color: '#33cc33',
                    className: 'leaf-device-tail'
                }).addTo(map);
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | ' + vehicle.id + ' | add | ERROR _> ' + e);
            }
        }
        return;
    };

    _this.showHiddenLabel = function ()
    {
        try
        {
            let vehicle_label = document.getElementById('vehicle_label').checked;
            if (vehicle_label)
            {
                /**
                 * Desocultamos los letrero de los camiones, y activamos la variable global
                 * para que mantenga el Desocultamos
                 */
                $('.leaf-device-marker .name').css('display', 'block');
                vehicles_placard = true;
            }
            else
            {
                /**
                 * Ocultamos los letrero de los camiones, y activamos la variable global
                 * para que mantenga el ocultamiento
                 */
                $('.leaf-device-marker .name').css('display', 'none');
                vehicles_placard = false;
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | showHiddenLabel | ERROR _> ' + e);
            }

        }
        return;
    };
    /**
     * Funcion encargada de terminar el seguimiento del camión
     */
    _this.tracingOff = function ()
    {
        clearAllpopUP();
        try
        {
            on_focus_vehicle = '';
            on_focus_vehicle_bulk = '';
            on_focus_vehicle_rent = '';

            vehicles.forEach(function (vehicle, index)
                             {
                                 _this.restoreSelectedVehicle(vehicle.name)
                                 // let view_vehicle_id = document.getElementById('view_vehicle_' + vehicle.id)
                                 // let view_vehicle_rent_id = document.getElementById('view_vehicle_rent_' + vehicle.id)
                                 // let view_vehicle_bulk_id = document.getElementById('view_vehicle_bulk_' + vehicle.id)

                                 // if (view_vehicle_id !== 'undefined' || view_vehicle_id !== null) {
                                 //     view_vehicle_id.checked = false;
                                 // }
                                 // if (view_vehicle_rent_id !== 'undefined' || view_vehicle_rent_id !== null) {
                                 //     view_vehicle_rent_id.checked = false;
                                 // }
                                 // if (view_vehicle_bulk_id !== 'undefined' || view_vehicle_bulk_id !== null) {
                                 //     view_vehicle_bulk_id.checked = false;
                                 // }
                             });

            let isChecked = document.getElementById('tracing_off').checked;
            /**
             * Validamos si lo acabamos de desmarcar, para volver a marcalo y siempre este en estado de marcado
             * pasado 2 Seg, se vuelve a chequear solo
             */
            if (!isChecked)
            {
                setTimeout(function ()
                           {
                                document.getElementById('tracing_off').checked = true;
                            }, 2000);
            }

            /**
             * Desactivamos el focus de un camion por el focus de un mapa
             * @type {*[]}
             */
            let bounds = [map.getCenter()];
            let option = {};
            option.maxZoom = map.getZoom();
            /**
             * Verificamos si el Zoom esta al maximo en el mapa, si no
             * se asignara que este al maximo, pero en la latitud y longitud dada por el vehiculo
             */
            /**
             if (currentZoom < 12 || currentZoom > 12)
             {
             option.maxZoom = 12;
             }
             */
            map.fitBounds(bounds, option);
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | tracingOff | ERROR _> ' + e);
            }
        }
        return;
    };

    _this.update = function (vehicle)
    {
        let activeTabPopUp = 0;
        try
        {
            /**
             * Cambio en tiempo real de datos del vehiculo, se manipula el DOM
             * ya que es mas rapido para el navegador por el alto nivel de vehiculos manejados
             * en el storage de VUEX
             */
            try
            {
                // verifica si existe algun pop up abierto al principio de la sentencia antes que vehicles_markers sea modificado
                if (vehicles_markers[vehicle.id].isPopupOpen() !== "undefined" && vehicles_markers[vehicle.id].isPopupOpen() === true)
                {
                    isPopUpIsOpenOnMap = true;
                    longTabPopUp = 3;

                    popUpOpenTab = document.getElementById("nav-tab").childNodes;
                    if (popUpOpenTab)
                    {
                        for (let index = 0; index < longTabPopUp; index++)
                        {
                            if (popUpOpenTab[index].classList.contains("active"))
                            {
                                activeTabPopUp = index;
                            }
                        }
                    }
                }
                else
                {
                    isPopUpIsOpenOnMap = false;
                }

                let rpm = vehicle.rpm;
                // console.log(vehicle.speed);
                let speed = vehicle.speed;
                let horometer = vehicle.horometer;
                let odometer = vehicle.odometer;
                let postal_code = vehicle.t_m_tp_sj_a_postal_code;
                let ticket_code = vehicle.t_m_tp_ji_ticket_code;
                let ticket_qty = vehicle.t_m_tp_ji_t_m_tp_ji_ticket_qty;
                let ticket_id = vehicle.ticket_id;
                let drive_name = vehicle.drive_name;
                let drive_last_name = vehicle.drive_last_name;

                /**console.log('MIXER _> ' + vehicle.name + ' DRIVE NAME _> ' + vehicle.drive_name + ' ' + vehicle.drive_last_name);*/

                let drive = 'S/I';
                if (drive_name !== null)
                {
                    drive = drive_name + ' ' + drive_last_name;
                }


                if (rpm == null || rpm == '')
                {
                    rpm = 'S/I';
                }
                else
                {
                    rpm = conComas(rpm) + " RPM"
                }

                if (horometer == null || horometer == '')
                {
                    horometer = 'S/I';
                }
                else
                {
                    horometer = conComas(horometer) + " Hrs";
                }

                if (odometer == null || odometer == '')
                {
                    odometer = 'S/I';
                }
                else
                {
                    odometer = odometerKm(odometer) + " Km"
                }

                if (speed == null || speed == '')
                {
                    speed = 'S/I';
                }
                else
                {
                    speed = speed + " KM/h"
                }

                /**document.getElementById('vehicle_lic_num_' + vehicle.id).innerHTML = vehicle.lic_num;*/
                if(typeof document.getElementById('vehicle_rpm_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_rpm_' + vehicle.id) !== null)
                {
                    document.getElementById('vehicle_rpm_' + vehicle.id).innerHTML = rpm;
                }
                if(typeof document.getElementById('vehicle_odometer_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_odometer_' + vehicle.id) !== null)
                {
                    document.getElementById('vehicle_odometer_' + vehicle.id).innerHTML = odometer;
                }
                if(typeof document.getElementById('vehicle_horometer_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_horometer_' + vehicle.id) !== null)
                {
                    document.getElementById('vehicle_horometer_' + vehicle.id).innerHTML = horometer;
                }
                if(typeof document.getElementById('vehicle_speed_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_speed_' + vehicle.id) !== null)
                {
                    document.getElementById('vehicle_speed_' + vehicle.id).innerHTML = speed;
                }                

                if (ticket_id == null || ticket_id == '')
                {
                    /**document.getElementById('view_vehicle_info_' + vehicle.id).style.display = "none";*/
                    if(typeof document.getElementById('vehicle_postal_code_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_postal_code_' + vehicle.id) !== null)
                    {
                        document.getElementById('vehicle_postal_code_' + vehicle.id).innerHTML = 'S/I';
                    }
                    if(typeof document.getElementById('vehicle_ticket_code_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_ticket_code_' + vehicle.id) !== null)
                    {
                        document.getElementById('vehicle_ticket_code_' + vehicle.id).innerHTML = 'S/I';
                    }
                    if(typeof document.getElementById('vehicle_ticket_qty_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_ticket_qty_' + vehicle.id) !== null)
                    {
                        document.getElementById('vehicle_ticket_qty_' + vehicle.id).innerHTML = 'S/I';
                    }
                    if(typeof document.getElementById('vehicle_drive_name_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_drive_name_' + vehicle.id) !== null)
                    {
                        document.getElementById('vehicle_drive_name_' + vehicle.id).innerHTML = 'S/I';
                    }
                }
                else
                {
                    if(typeof document.getElementById('vehicle_postal_code_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_postal_code_' + vehicle.id) !== null)
                    {
                        document.getElementById('vehicle_postal_code_' + vehicle.id).innerHTML = postal_code;
                    }
                    if(typeof document.getElementById('vehicle_ticket_code_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_ticket_code_' + vehicle.id) !== null)
                    {
                        document.getElementById('vehicle_ticket_code_' + vehicle.id).innerHTML = ticket_code;
                    }
                    if(typeof document.getElementById('vehicle_ticket_qty_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_ticket_qty_' + vehicle.id) !== null)
                    {
                        document.getElementById('vehicle_ticket_qty_' + vehicle.id).innerHTML = ticket_qty;
                    }
                    if(typeof document.getElementById('vehicle_drive_name_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_drive_name_' + vehicle.id) !== null)
                    {
                        document.getElementById('vehicle_drive_name_' + vehicle.id).innerHTML = drive;
                    }
                }

                /**document.getElementById('vehicle_last_connection_' + vehicle.id).innerHTML = vehicle.device_time_local;*/

                _this.changeRssi(vehicle);
                _this.changeSpeed(vehicle);
                _this.changeOperator(vehicle);
                _this.changeTicketState(vehicle);

            }
            catch (ex)
            {
                console.error(ex)

            }

            let icon = null;
            let course = 0;
            let width = 50;
            let height = 81;
            let position = new L.LatLng(vehicle.latitude, vehicle.longitude);
            let html = '';
            /**let color = _this.getStatusColor();*/

            if (user.group_id == 69)
            {
                icon = '<img src="' + vehicle.icon_az_map + '"/>';
            }
            else
            {
                icon = '<img src="' + vehicle.icon_map + '"/>';
            }

            course = vehicle.course;


            let iconAnchor = [(width / 2), (height / 2)];

            let divIcon;
            if (vehicles_placard == false)
            {
                /**
                 * Si el ocultamos de placa esta activado
                 */
                if (isTimerVehicle)
                {
                    html += '<span class="name" style="display: none;"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
                }
                else
                {
                    html += '<span class="name" style="display: none;"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
                }
                html += icon;
            }
            else
            {
                /**
                 * Si el ocultamos de placa no esta activado
                 */
                html += '<span class="name" style="display: block;"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
                html += icon;
            }

            divIcon = L.divIcon({
                                    html: html,
                                    className: 'leaf-device-marker',
                                    iconSize: [width, height],
                                    iconAnchor: iconAnchor,
                                    popupAnchor: [0, 0 - height]
                                });

            let operator_info = 'Sin Información';

            if (vehicle.operator != null)
            {
                let operator = vehicle.operator;

                if (operator == '73001')
                {
                    operator_info = "ENTEL";
                }
                else
                {
                    if (operator == '73002')
                    {
                        operator_info = "MOVISTAR";
                    }
                    else
                    {
                        if (operator == '73003')
                        {
                            operator_info = "CLARO";
                        }
                    }
                }
            }

            let gps_info = '<table>';
            let ticket_info = '<table>';
            let cliente_info = '<table>';

            gps_info += '<tr><td><strong>Fecha GPS:</strong></td><td> ' + ((vehicle.device_time_local != null) ? vehicle.device_time_local : " Sin información") + '</td></tr>';
            gps_info += '<tr><td><strong>Operador:</strong></td><td>' + operator_info + '</td></tr>';
            gps_info += '<tr><td><strong>Nivel Señal:</strong></td><td>' + ((vehicle.rssi != null) ? vehicle.rssi : "Sin información") + '</td></tr>';
            gps_info += '<tr><td><strong>Voltaje GPS:</strong></td><td> ' + ((vehicle.power_gps != null) ? vehicle.power_gps : " Sin información") + '</td></tr>';
            gps_info += '<tr><td><strong>Voltaje Mixer:&nbsp;&nbsp;&nbsp;</strong></td><td> ' + ((vehicle.power_truck != null) ? vehicle.power_truck : " Sin información") + '</td></tr>';
            /**ticket += '<tr><td><strong>Satelite:</strong></td><td> ' + ((vehicle.sat != null) ? vehicle.sat : " Sin información") + '</td></tr>';*/
            gps_info += '<tr><td><strong>Ignition:</strong></td><td> ' + ((vehicle.ignition != null) ? vehicle.ignition : " Sin información") + '</td></tr>';
            gps_info += '<tr><td><strong>Rpm:</strong></td><td> ' + ((vehicle.rpm != null) ? conComas(vehicle.rpm) : "Sin información") + '</td></tr>';
            gps_info += '<tr><td><strong>Odometro:</strong></td><td> ' + ((vehicle.odometer != null) ? odometerKm(vehicle.odometer) : "Sin información") + '</td></tr>';

            let ticket_exit = false;
            if (typeof vehicle.tickets_id !== 'undefined' && vehicle.id != null)
            {
                let state_info = 'Sin Información';

                if (vehicle.state != null)
                {
                    let state = vehicle.state;

                    if (state >= 2)
                    {
                        state_info = "ACK";
                    }
                    if (state >= 4)
                    {
                        state_info = "A OBRA";
                    }
                    if (state >= 5)
                    {
                        state_info = "EN OBRA";
                    }
                    if (state >= 8)
                    {
                        state_info = "DESCARGANDO";
                    }
                    if (state >= 12)
                    {
                        state_info = "A PLANTA";
                    }
                    if (state == 13)
                    {
                        state_info = "EN PLANTA";
                    }
                }

                ticket_exit = true;

                ticket_info += '<tr><td><strong>Vehículo:</strong></td><td>' + ((vehicle.name != null) ? vehicle.name : "Sin información") + '</td></tr>';
                ticket_info += '<tr><td><strong>Patente:</strong></td><td> ' + ((vehicle.lic_num != null) ? vehicle.lic_num : "Sin información") + '</td></tr>';
                ticket_info += '<tr><td><strong>Planta:</strong></td><td>' + ((vehicle.t_m_tp_sd_a_full_address != null) ? vehicle.t_m_tp_sd_a_full_address : "Sin información") + '</td></tr>';
                ticket_info += '<tr><td><strong>Obra:</strong></td><td>' + ((vehicle.t_m_tp_sj_a_postal_code != null) ? vehicle.t_m_tp_sj_a_postal_code : "Sin información") + '</td></tr>';
                ticket_info += '<tr><td><strong>Ticket Code:&nbsp;&nbsp;&nbsp;</strong></td><td>' + ((vehicle.t_m_tp_ji_ticket_code != null) ? vehicle.t_m_tp_ji_ticket_code : "Sin ticket asignado") + '</td></tr>';
                ticket_info += '<tr><td><strong>Estado:</strong></td><td>' + state_info + '</td></tr>';
                ticket_info += '<tr><td><strong>Conductor:</strong></td><td> ' + ((vehicle.drive_name != null) ? vehicle.drive_name : " Sin Información") + ' ' + ((vehicle.drive_last_name != null) ? vehicle.drive_last_name : "") + '</td></tr>';

                cliente_info += '<tr><td><strong>Cliente:</strong></td><td>' + ((vehicle.t_m_tp_sj_id != null) ? vehicle.t_m_tp_sj_id : " Vehículo sin ticket asignado") + '</td></tr>';
                cliente_info += '<tr><td><strong>Dirección Cliente:&nbsp;&nbsp;</strong></td><td>' + ((vehicle.t_m_tp_sj_a_full_address != null) ? vehicle.t_m_tp_sj_a_full_address : " Vehículo sin ticket asignado") + '</td></tr>';
                cliente_info += '<tr><td><strong>m³:</strong></td><td>' + ((vehicle.t_m_tp_ji_t_m_tp_ji_ticket_qty != null) ? vehicle.t_m_tp_ji_t_m_tp_ji_ticket_qty : " Vehículo sin ticket asignado") + '</td></tr>';
            }
            gps_info += '</table>';
            ticket_info += '</table>';
            cliente_info += '</table>';

            let ticket = '<nav>';
            ticket += '<div class="nav nav-tabs" id="nav-tab" role="tablist">';

            if (activeTabPopUp == 1)
            {
                ticket += '<a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false"><strong>Cliente</strong></a>';
                ticket += '<a class="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true"><strong>Ticket</strong></a>';
                ticket += '<a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><strong>Gps</strong></a>';
                ticket += '</div>';
                ticket += '</nav>';
                ticket += '<div class="tab-content" id="nav-tabContent">';
                ticket += '<div class="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">' + cliente_info + '</div>';
                ticket += '<div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">' + ticket_info + '</div>';
                ticket += '<div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">' + gps_info + '</div>';

            }
            else if (activeTabPopUp == 2)
            {
                ticket += '<a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false"><strong>Cliente</strong></a>';
                ticket += '<a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><strong>Ticket</strong></a>';
                ticket += '<a class="nav-item nav-link active" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="true"><strong>Gps</strong></a>';
                ticket += '</div>';
                ticket += '</nav>';
                ticket += '<div class="tab-content" id="nav-tabContent">';
                ticket += '<div class="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">' + cliente_info + '</div>';
                ticket += '<div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">' + ticket_info + '</div>';
                ticket += '<div class="tab-pane fade show active" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">' + gps_info + '</div>';

            }
            else
            {
                ticket += '<a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><strong>Cliente</strong></a>';
                ticket += '<a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><strong>Ticket</strong></a>';
                ticket += '<a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><strong>Gps</strong></a>';
                ticket += '</div>';
                ticket += '</nav>';
                ticket += '<div class="tab-content" id="nav-tabContent">';
                ticket += '<div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">' + cliente_info + '</div>';
                ticket += '<div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">' + ticket_info + '</div>';
                ticket += '<div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">' + gps_info + '</div>';
            }
            ticket += '</div>';

            /**
             * Actualizamos la información del vehiculo en la matriz
             */
            /** Limpieza de variable */
            vehicles[vehicle.id] = vehicle;

            try
            {

                if (ticket_exit)
                {
                    let popup = L.popup()
                                 .setContent(ticket || 'S/I');

                    vehicles_markers[vehicle.id].bindPopup(popup, {maxWidth: 500}).setIcon(divIcon).setIconAngle(course);
                }
                else
                {
                    let text = '<table>';
                    text += '<tr><td><strong>Fecha GPS:</strong></td><td> ' + ((vehicle.device_time_local != null) ? vehicle.device_time_local : " Sin información") + '</td></tr>';
                    text += '<tr><td><strong>Patente:</strong></td><td> ' + ((vehicle.lic_num != null) ? vehicle.lic_num : "Sin información") + '</td></tr>';
                    text += '<tr><td><strong>Conductor:</strong></td><td> ' + ((vehicle.drive_name != null) ? vehicle.drive_name : "Sin Información") + ' ' + ((vehicle.drive_last_name != null) ? vehicle.drive_last_name : "") + '</td></tr>';
                    text += '<tr><td colspan="2">No existe ticket procesado aún...</td></tr>';
                    text += '</table>';

                    let popup = L.popup()
                                 .setContent(text);
                    vehicles_markers[vehicle.id].bindPopup(popup, {maxWidth: 500}).setIcon(divIcon).setIconAngle(course);
                }

            }
            catch (e)
            {
                // console.log("Propiedad no creada, esperando a que se pueda acceder(bindPopup)...")
            }

            /**
             * Si el vehiculo a procesar es igual al seleccionado para el focus, se activa
             * el centrado de seguimiento
             */
            if (on_focus_vehicle == vehicle.id)
            {

                if (isDebugInfo)
                {
                    console.log('VEHICLE | update | SEGUIMIENTO ACTIVO _> ' + vehicle.id); //isDebugInfo
                }
                /**
                 * Efecto de movimiento de camiones
                 */
                if (isTruckMoveEffect)
                {
                    vehicles_markers[vehicle.id].slideTo(position, {duration: 3000, keepAtCenter: true});
                }
                else
                {
                    /**
                     El camion tiene el focus activado, debe centrar el mapa luego de actualizar la geoposicion
                     */

                    vehicles_markers[vehicle.id].setLatLng(position);

                    let latLng = vehicles_markers[vehicle.id].getLatLng();
                    let bounds = [latLng];
                    let option = {};

                    currentZoom = map.getZoom();
                    option.maxZoom = map.getZoom();
                    map.fitBounds(bounds, option);
                }
            }
            else
            {
                /**
                 * Efecto de movimiento de camiones
                 */
                if (isTruckMoveEffect)
                {
                    vehicles_markers[vehicle.id].slideTo(position, {duration: 3000});
                }
                else
                {
                    vehicles_markers[vehicle.id].setLatLng(position);
                }

            }
            /**
             * Creación de linea que pone visible la ruta del camión antes de la nueva transmisión
             * @type {*[]}
             */
            let position_tracking = [];
            let coordinate;

            if ((typeof vehicle.latest_positions_new === 'string') && vehicle.latest_positions_new != '')
            {
                coordinate = JSON.parse(vehicle.latest_positions_new);
            }
            else
            {
                coordinate = vehicle.latest_positions_new;
            }
            /**
             * Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
             */
            position_tracking.push([vehicle.latitude, vehicle.longitude]);
            if (coordinate != null)
            {
                for (let i = 0; i < coordinate.length; i++)
                {
                    position_tracking.push([coordinate[i].lat, coordinate[i].lng]);
                }

                if (typeof vehicles_tail[vehicle.id] !== 'undefined')
                {
                    if (isTruckMoveEffect)
                    {
                        setTimeout(function ()
                                   {
                                       vehicles_tail[vehicle.id].setLatLngs(position_tracking);
                                   }, 3000);
                    }
                    else
                    {
                        vehicles_tail[vehicle.id].setLatLngs(position_tracking);
                    }
                }
            }

            if (isPopUpIsOpenOnMap)
            {
                map.closePopup();
                // vehicles_markers[vehicle.id].closePopup();
                vehicles_markers[vehicle.id].openPopup();
            }

            if (selected_vehicle == vehicle.id)
            {
                _this.paintSelectedVehicle(vehicle.name, vehicle.id);
            }

            /**console.log("Plant ID: " + vehicle.plants_id + " | Vehicle ID: " + vehicle.id);*/


            /**
             * Actualizamos la información de VUEX Storage para el vehiculo
             */
            /**storedb.commit('plantsVehiclesUpdateVehicle', vehicle);
             storedb.dispatch('plantsVehiclesUpdateStorage', vehicle);*/
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                // console.error('VEHICLE | update | ERROR _> ' + e);
            }
        }


        return;
    };

    _this.getMapPadding = function ()
    {
        var _offset = 10,
            _left = _offset,
            _bottom = _offset,
            $sidebar = $('#sidebar'),
            $bottombar = $('#bottombar');

        if ($sidebar.length)
        {
            _left += $sidebar.width() + $sidebar.offset().left;
        }

        if ($bottombar.length)
        {
            _bottom += $bottombar.height();
        }

        return {
            paddingTopLeft: [_left, _offset],
            paddingBottomRight: [_offset, _bottom],
        };
    };
    /**
     _this.getMapPadding = function ()
     {
      var _offset = 10,
      _left = _offset,
      _bottom = _offset;

      return {
      paddingTopLeft: [_left, _offset],
      paddingBottomRight: [_offset, _bottom],
      };
      };
     */
    _this.fitBounds = function (currentZoom)
    {
        var _bounds = [];

        _bounds = [_item.getLatLng()];

        if (_bounds.length)
        {
            var _option = _this.getMapPadding();


            if (currentZoom && typeof currentZoom === 'boolean')
            {
                currentZoom = map.getZoom();
            }
            if (currentZoom && map.getBoundsZoom(_bounds) > currentZoom)
            {
                _option.maxZoom = currentZoom;
            }
            if (!currentZoom)
            {
                _option.maxZoom = 17;
            }
            map.fitBounds(_bounds, _option);
        }
        return;
    };
    /**
     * Iniciamos Cluster que contendra el total de vehiculos visible en el mapa
     */
    _this.clusterInit = function ()
    {
        if (isDebugInfo)
        {
            console.log('VEHICLE | clusterInit | Iniciando el cluster de vehiculos... '); //isDebugInfo
        }
        try
        {
            vehicle_marker_cluster = L.markerClusterGroup(
                {
                    disableClusteringAtZoom: 17,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false,
                    removeOutsideVisibleBounds: true,
                    iconCreateFunction: function (cluster)
                    {
                        let count = cluster.getChildCount(),
                            c = 'cluster-',
                            radius = 58;

                        if (count < 5)
                        {
                            c += 'small';
                        }
                        else if (count < 10)
                        {
                            c += 'medium';
                        }
                        else
                        {
                            c += 'large';
                        }

                        return L.divIcon({
                                             html: '<div class="cluster-inner"><b>' + count + '</b></div>',
                                             className: 'cluster ' + c,
                                             iconSize: [radius, radius],
                                             iconAnchor: [radius / 2, radius / 2]
                                         });
                    }
                });
            /**
             vehicle_marker_cluster.on('click', function (a)
             {
              console.log('marker:');//isDebugInfo
              console.log(a.layer);//isDebugInfo
              });
             */
            /**
             vehicle_marker_cluster.on('clusterclick', function (a)
             {
              console.log('cluster ' + a.layer.getAllChildMarkers().length);//isDebugInfo
              });
             */
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | clusterInit | ERROR _> ' + e)
            }
        }
        return;
    };

    _this.socket = function ()
    {
        if (isDebugInfo)
        {
            console.log('VEHICLE | SOCKET | iniciando funcion socket'); //isDebugInfo
        }
        try
        {
            plants.forEach(function (data, index)
                           {
                               data.plants.forEach(function (pit, index)
                                                   {
                                                       if (isDebugInfo)
                                                       {
                                                           console.log('VEHICLE | WEBSOCKET | CHANNEL | vehicle-position_' + pit.id + ' | OK');//isDebugInfo
                                                       }

                                                       Echo.channel('POL_PROD_MOVE_vehicle-position_' + pit.id).listen('VehiclePositionEvent', (e) =>
                                                                                                                       {
                                                                                                                           let vehicle = e.message;
                                                                                                                           if (typeof vehicles[vehicle.id] !== 'undefined')
                                                                                                                           {
                                                                                                                               if (isDebugInfo)
                                                                                                                               {
                                                                                                                                   /**console.log('VEHICLE NAME: ' + vehicle.name + ' | ID: ' + vehicle.id);*/
                                                                                                                               }
                                                                                                                               /**
                                                                                                                                * Enviamos el vehiculo a actualización
                                                                                                                                */
                                                                                                                               _this.update(vehicle);
                                                                                                                           }
                                                                                                                           else
                                                                                                                           {
                                                                                                                               /**console.log('VEHICLE ID: ' + vehicle.id + ' | no existe');*/
                                                                                                                           }
                                                                                                                       },
                                                       );
                                                   });
                           });
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | ERROR _> ' + e)
            }
        }
        return;
    };

    _this.ajax = function ()
    {
        if (isDebugInfo)
        {
            console.log('VEHICLE | AJAX | iniciando funcion ajax');//isDebugInfo
        }
        try
        {

            setInterval(function ()
                        {
                            /**
                             * Ajax Vehicles Update
                             */
                            axios.get(api_url + '/vehicles/all/' + user.id)
                                 .then((response) =>
                                       {
                                           context.commit('plantsVehicles', response.data.data);
                                       }).catch(function (error)
                                                {
                                                    if (isDebugCatch)
                                                    {
                                                        console.error('VUEJS | AJAX | ERROR _> ' + error);
                                                    }

                                                });
                        }, 5000);


        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | ERROR _> ' + e)
            }
        }
        return;
    };

    _this.viewMap = function (id)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE | view | ID _> ' + id);//isDebugInfo
            }


            if (typeof vehicles_markers[id] !== 'undefined')
            {
                let vehicle = vehicles_markers[id];

                try 
                {
                    document.getElementById('leave-follow').style.display = 'block';
                    document.getElementById('tracing_off').checked = true;

                } 
                catch (error) 
                {
                    if (isDebugCatch)
                    {
                        console.log("error find in DOM id:'leave-follow' error: " + e);
                    }
                }

                if(typeof document.getElementById('view_vehicle_' + id) !== "undefined" && document.getElementById('view_vehicle_' + id) !== null)
                {
                    document.getElementById('view_vehicle_' + id).checked = true;
                }
                if(typeof document.getElementById('view_vehicle_info_' + id) !== "undefined" && document.getElementById('view_vehicle_info_' + id) !== null)
                {
                    document.getElementById('view_vehicle_info_' + id).style.display = 'block';
                }

                /**
                 * Asignamos el focus al camión ya que fue pinchado
                 */
                if (on_focus_vehicle != id)
                {
                    on_focus_vehicle = '';
                    on_focus_vehicle_bulk = '';
                    on_focus_vehicle_rent = '';
                }
                else
                {
                    on_focus_vehicle = id;
                }


                let latLng = vehicles_markers[id].getLatLng();
                let bounds = [latLng];
                let option = {};

                currentZoom = map.getZoom();
                /**
                 * Verificamos si el Zoom esta al maximo en el mapa, si no
                 * se asignara que este al maximo, pero en la latitud y longitud dada por el vehiculo
                 */
                if (currentZoom < 17 || currentZoom > 17)
                {
                    option.maxZoom = 17;
                }
                else
                {
                    option.maxZoom = 17;
                }

                map.fitBounds(bounds, option);

                _this.paintSelectedVehicle(vehicle.options.title, id);
            }

        }
        catch
            (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | view | ERROR _> ' + e);
            }
        }
        return;
    };

    _this.viewVehicleMap = function (id){
        _this.viewMap(id);
    };
    
    _this.showHiddenAllRoutes = function ()
    {
        try
        {
            let show_hidden_all_routers = document.getElementById('show_hidden_all_routers');
            if (show_hidden_all_routers.checked)
            {
                _this.showRoutes();
            }
            else
            {

                _this.hiddenRoutes();
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | showHiddenAllRoutes | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.hiddenRoutes = function ()
    {
        try
        {
            vehicles_tail.forEach(function (valor, id)
                                  {
                                      _this.hiddenRoute(id);
                                  }
            );
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | HIDDENROUTES | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.showRoutes = function ()
    {
        try
        {
            vehicles_tail.forEach(function (valor, id)
                                  {
                                      _this.showRoute(id);
                                  }
            );
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | SHOWROUTES | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.hiddenRoute = function (id)
    {
        if (typeof vehicles_tail[id] !== 'undefined')
        {
            map.removeLayer(vehicles_tail[id]);
        }
        else
        {
            if (isDebugInfo)
            {
                console.error('VEHICLE | HIDDENROUTE | no existe el ID _> ' + id);
            }
        }
        return;
    };
    _this.showRoute = function (id)
    {
        if (typeof vehicles_tail[id] !== 'undefined')
        {
            map.addLayer(vehicles_tail[id]);
        }
        else
        {
            if (isDebugInfo)
            {
                console.error('VEHICLE | SHOWROUTE | no existe el ID _> ' + id);
            }
        }
        return;
    };

    _this.changeTypeMovementVehicle = function ()
    {
        /**
         * Hacemos la inversion del tipo de dato que habia
         * TRUE x FALSE
         * FALSE x TRUE
         * @type {boolean}
         */
        isTruckMoveEffect = !isTruckMoveEffect;

        /**
         * Actualizamos el valor del camion en el Local Storage y la variable Global
         * @type {boolean}
         */
        change_type_movement_vehicle = !isTruckMoveEffect;
        ls.setItem("changeTypeMovementVehicle", !isTruckMoveEffect);
    };


    _this.changeSpeed = function (vehicle)
    {
        let html = '';

        if (vehicle.speed == 0 && vehicle.ignition == false)
        {
            html += '<ul class="semaforo rojo">\n' +
                '            <li></li>\n' +
                '        </ul>';

        }
        else if (vehicle.speed == 0 && vehicle.ignition == true)
        {
            html += '<ul class="semaforo amarillo">\n' +
                '            <li></li>\n' +
                '        </ul>';
        }
        else if (vehicle.speed > 0)
        {
            html += '<ul class="semaforo verde">\n' +
                '            <li></li>\n' +
                '        </ul>';
        }

        html += vehicle.speed + ' Km/h ';

        if(typeof document.getElementById('vehicle_speed_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_speed_' + vehicle.id) !== null)
        {
            document.getElementById('vehicle_speed_' + vehicle.id).innerHTML = html;
        }
    };

    /**
     * Cambiar imagen de operador en tracking
     * @param vehicle
     */
    _this.changeOperator = function (vehicle)
    {
        /**
         * En caso de cambiar la compañia de telefono
         */
        if (vehicle.operator == 73001)
        {
        
            if(typeof document.getElementById('vehicle_operator_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_operator_' + vehicle.id) !== null)
            {
                document.getElementById('vehicle_operator_' + vehicle.id).innerHTML = '<img src="/images/icons/gprs/entel.png" style="width: 40px;"/>';
            }
        
        }
        else if (vehicle.operator == 73002)
        {
            if(typeof document.getElementById('vehicle_operator_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_operator_' + vehicle.id) !== null)
            {
                document.getElementById('vehicle_operator_' + vehicle.id).innerHTML = '<img src="/images/icons/gprs/movistar.png" style="width: 40px;"/>';
            }
        }
        else if (vehicle.operator == 73003)
        {
            if(typeof document.getElementById('vehicle_operator_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_operator_' + vehicle.id) !== null)
            {
                document.getElementById('vehicle_operator_' + vehicle.id).innerHTML = '<img src="/images/icons/gprs/claro.png" style="width: 40px;"/>';
            }
        }
    };

    /**
     * Cambiar imagen del nivel de señal RSSI
     * @param vehicle
     */
    _this.changeRssi = function (vehicle)
    {
        /**
         * En caso de cambiar la compañia de telefono
         */
        if (vehicle.rssi == 0)
        {
            if(typeof document.getElementById('vehicle_rssi_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_rssi_' + vehicle.id) !== null)
            {
                document.getElementById('vehicle_rssi_' + vehicle.id).innerHTML = '<img src="/images/icons/gprs/signal_0.png" style="width: 20px;"/>';
            }
        }
        else if (vehicle.rssi == 1)
        {
            if(typeof document.getElementById('vehicle_rssi_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_rssi_' + vehicle.id) !== null)
            {
                document.getElementById('vehicle_rssi_' + vehicle.id).innerHTML = '<img src="/images/icons/gprs/signal_1.png" style="width: 20px;"/>';
            }
        }
        else if (vehicle.rssi == 2)
        {
            if(typeof document.getElementById('vehicle_rssi_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_rssi_' + vehicle.id) !== null)
            {
                document.getElementById('vehicle_rssi_' + vehicle.id).innerHTML = '<img src="/images/icons/gprs/signal_2.png" style="width: 20px;"/>';
            }
        }
        else if (vehicle.rssi == 3)
        {
            if(typeof document.getElementById('vehicle_rssi_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_rssi_' + vehicle.id) !== null)
            {
                document.getElementById('vehicle_rssi_' + vehicle.id).innerHTML = '<img src="/images/icons/gprs/signal_3.png" style="width: 20px;"/>';
            }
        }
        else if (vehicle.rssi >= 4)
        {
            if(typeof document.getElementById('vehicle_rssi_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_rssi_' + vehicle.id) !== null)
            {
                document.getElementById('vehicle_rssi_' + vehicle.id).innerHTML = '<img src="/images/icons/gprs/signal_4.png" style="width: 20px;"/>';
            }
        }
    };

    /**
     * Cambiar estado de ticket y burbujas
     * @param vehicle
     */
    _this.changeTicketState = function (vehicle)
    {
        let table = '<table class="table vehicle_bubble">';

        table += '<tr>';
        table += '<td class="col-4" align="center">';
        if (vehicle.state == null || vehicle.state <= 4)
        {
            table += '<div>';
            table += '<div id="vehicle_last_connection_' + vehicle.id + '" class="vehicle_last_connection">' + vehicle.device_time_local + '</div>';
            table += '<img src="' + vehicle.icon_side + '" style="width: 70px;"/>';
            table += '</div>';
        }
        else
        {
            table += '<div>';
            table += '<img src="' + vehicle.icon_side + '" style="width: 70px; display: none;"/>';
            table += '</div>';
        }
        table += '</td>';

        table += '<td class="col-4" align="center">';
        if (vehicle.state == 5)
        {
            table += '<div>';
            table += '<div id="vehicle_last_connection_' + vehicle.id + '" class="vehicle_last_connection">' + vehicle.device_time_local + '</div>';
            table += '<img src="' + vehicle.icon_side + '" style="width: 70px;"/>';

            table += '</div>';
        }
        else
        {
            table += '<div>';
            table += '<img src="' + vehicle.icon_side + '" style="width: 70px; display: none;"/>';
            table += '</div>';
        }
        table += '</td>';

        table += '<td class="col-4" align="center">';
        if (vehicle.state >= 8 && vehicle.state <= 9)
        {
            table += '<div>';
            table += '<div id="vehicle_last_connection_' + vehicle.id + '" class="vehicle_last_connection">' + vehicle.device_time_local + '</div>';
            table += '<img src="' + vehicle.icon_side + '" style="width: 70px;"/>';
            table += '</div>';
        }
        else
        {
            table += '<div>';
            table += '<img src="' + vehicle.icon_side + '" style="width: 70px; display: none;"/>';
            table += '</div>';
        }
        table += '</td>';

        table += '<td class="col-4" align="center">';
        if (vehicle.state == 12)
        {
            table += '<div>';
            table += '<div id="vehicle_last_connection_' + vehicle.id + '" class="vehicle_last_connection">' + vehicle.device_time_local + '</div>';
            table += '<img src="' + vehicle.icon_side + '" style="width: 70px;"/>';
            table += '</div>';
        }
        else
        {
            table += '<div>';
            table += '<img src="' + vehicle.icon_side + '" style="width: 70px; display: none;"/>';
            table += '</div>';
        }
        table += '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<td class="col-4" align="center">';
        /**
         * A OBRA
         */
        if (vehicle.state >= 4)
        {
            if (vehicle.loading_manual_movement)
            {
                table += '<div class="circulo_danger">AO</div>';
            }
            else if (vehicle.to_job != null && vehicle.to_job == 1)
            {
                table += '<div class="circulo_success">AO</div>';
            }
            else
            {
                table += '<div class="circulo_warning">AO</div>';
            }


            if (vehicle.to_job != null)
            {
                table += '<div class="vehicle_bubble">' + vehicle.to_job_start + '</div>';
            }
        }
        else
        {
            table += '<div class="circulo">AO</div>';
        }
        table += '</td>';
        table += '<td class="col-4" align="center">';
        /**
         * EN OBRA
         */
        if (vehicle.state >= 5)
        {
            if (vehicle.loading_manual_movement)
            {
                table += '<div class="circulo_danger">EO</div>';
            }
            else if (vehicle.job != null && vehicle.job == 1)
            {
                table += '<div class="circulo_success">EO</div>';
            }
            else
            {
                table += '<div class="circulo_warning">EO</div>';
            }

            if (vehicle.job != null)
            {
                table += '<div class="vehicle_bubble">' + vehicle.job_start + '</div>';
            }
        }
        else
        {
            table += '<div class="circulo">EO</div>';
        }
        table += '</td>';
        table += '<td class="col-4" align="center">';
        /**
         * DESCARGANDO
         */
        if (vehicle.state >= 8)
        {
            if (vehicle.loading_manual_movement)
            {
                table += '<div class="circulo_danger">DE</div>';
            }
            else if (vehicle.unload != null && vehicle.unload == 1)
            {
                table += '<div class="circulo_success">DE</div>';
            }
            else
            {
                table += '<div class="circulo_warning">DE</div>';
            }

            if (vehicle.unload != null)
            {
                table += '<div class="vehicle_bubble">' + vehicle.unload_start + '</div>';
            }
        }
        else
        {
            table += '<div class="circulo">DE</div>';
        }
        table += '</td>';
        table += '<td class="col-4" align="center">';
        /**
         * A PLANTA
         */
        if (vehicle.state >= 12)
        {
            if (vehicle.loading_manual_movement)
            {
                table += '<div class="circulo_danger">AP</div>';
            }
            else if (vehicle.to_plant != null && vehicle.to_plant == 1)
            {
                table += '<div class="circulo_success">AP</div>';
            }
            else
            {
                table += '<div class="circulo_warning">AP</div>';
            }

            if (vehicle.to_plant != null)
            {
                table += '<div class="vehicle_bubble">' + vehicle.to_plant_start + '</div>';
            }
        }
        else
        {
            table += '<div class="circulo">AP</div>';
        }
        table += '</td>';
        table += '</tr>';

        if (vehicle.loading_manual_movement)
        {
            table += '<tr>';
            table += '<td colspan="4">';
            table += 'Movimiento manual por: ' + vehicle.loading_manual_movement_user;
            table += '<td>';
            table += '</tr>';
        }

        table += '</table>';

        if(typeof document.getElementById('vehicle_ticket_state_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_ticket_state_' + vehicle.id) !== null)
        {
            document.getElementById('vehicle_ticket_state_' + vehicle.id).innerHTML = table;
        }

    };

    /**
     * Funcion encargada de buscar el indixe de la planta en la matrix y
     * dentro de cada una de la planta recorre todos los vehiculos donde debe sacar
     * el indixe del vehiclo en la matrix
     * @param plants
     * @param vehicle_id
     * @returns {{plant_id: null, vehicle_id: null}}
     */
    _this.searchVehicleInPlant = function (plants, vehicle_id)
    {
        let position = {plant_id: null, vehicle_id: null};

        try
        {
            for (let i = 0; i < plants.length; i++)
            {
                if (typeof plants[i].vehicles !== 'undefined')
                {
                    for (let j = 0; j < plants[i].vehicles.length; j++)
                    {
                        if (plants[i].vehicles[j].truck_code == vehicle_id)
                        {
                            /**
                             * Capturamos la posición indixe de la plantas variable i
                             * Capturamos la posicion indixe del vehiculo variable j
                             * @type {number}
                             */
                            position.plant_id = i;
                            position.vehicle_id = j;
                            /**console.log("vehicle: " + vehicle_id + " | plant_id:" + i + " | vehicle_id: " + j);*/
                        }
                    }
                }
            }
        }
        catch (e)
        {
            console.error(e);
        }

        return position;
    };

    _this.showHidden = function (id)
    {
        /**
         * Tomamos el valor de check para revisar si esta On o Off
         */
        let isChecked = document.getElementById('vehicle_' + id).checked;
        if (isChecked)
        {
            /**
             * Agregamos al camión al listado
             */
            _this.show(id);
        }
        else
        {
            /**
             * Eliminamos al camión del listado
             */
            _this.delete(id);

        }
    };

    _this.view = function (id)
    {
        /**
         * Tomamos el valor de check para revisar si esta true o false
         */
         let isChecked = false;      

        if(typeof document.getElementById('view_vehicle_' + id) !== "undefined" && document.getElementById('view_vehicle_' + id) !== null)
        {
            isChecked = document.getElementById('view_vehicle_' + id).checked;
        }
        if (isChecked)
        {
            //borrar todos los demas check del front
            clearAllSelectedVehicle();

            /**
             * Agregamos al camión al listado
             */
            if(typeof document.getElementById('view_vehicle_' + id) !== "undefined" && document.getElementById('view_vehicle_' + id) !== null)
            {
                document.getElementById('view_vehicle_' + id).checked = true;
            }
            // clear previews information
            _this.tracingOff();
            _this.viewMap(id);
        }
        else
        {
            try {
                document.getElementById('leave-follow').style.display = 'none';
            } catch (error) {
                if (isDebugCatch)
            {
                console.log("error find in DOM id:'leave-follow' error: " + e);
            }
        }
            /**
             * Eliminamos al camión del listado
             */
            if(typeof document.getElementById('view_vehicle_' + id) !== "undefined" && document.getElementById('view_vehicle_' + id) !== null)
            {
                document.getElementById('view_vehicle_' + id).checked = false;
            }
            _this.tracingOff();
        }
    };

    /**
     *
     * paint vehicle top panel selected in left vertical nav
     *
     * @param vehicle
     * @param id
     */
    _this.paintSelectedVehicle = function (vehicle, id)
    {
        let searchedSelector = '[title="' + vehicle + '"]';
        try
        {

            let infoVehicule = document.querySelector(searchedSelector);
            if (infoVehicule != null)
            {
                selected_vehicle = id;
                infoVehicule.style.zIndex = 999;
                infoVehicule.children[0].children[0].style.background = "#ffc000";
                infoVehicule.style.color = "#000";
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.log("error find in DOM " + vehicle + " error: " + e);//isDebugCatch
            }
        }
    };

    // restore vehicle top panel blue with white letter
    _this.restoreSelectedVehicle = function (vehicle)
    {

        let searchedSelector = '[title="' + vehicle + '"]';
        try
        {
            let infoVehicule = document.querySelector(searchedSelector);
            if (infoVehicule != null)
            {
                selected_vehicle = null;
                selected_vehicle_bulk = null;
                selected_vehicle_rent = null;

                infoVehicule.style.zIndex = 0;
                infoVehicule.children[0].children[0].style.background = "#161246";
                infoVehicule.style.color = "#b4b7bd";
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.log("error find in DOM " + vehicle + " error: " + e);//isDebugCatch
            }
        }
        ;
    };


    _this.showHiddenAll = function ()
    {
        /**
         * Tomamos el valor de check para revisar si esta On o Off
         */
        let isChecked = document.getElementById('vehicles_all').checked;

        if (isChecked)
        {
            vehiclesView = true;
            this.vehiclesView = true;
            ls.setItem("vehiclesView", true);
        }
        else
        {
            vehiclesView = false;
            this.vehiclesView = false;
            ls.setItem("vehiclesView", false);
        }

        vehicles.forEach(function (vehicle, id)
                         {
                             try
                             {
                                 if (isChecked)
                                 {
                                     /**
                                      * Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                                      * @type {boolean}
                                      */
                                     document.getElementById('vehicle_' + vehicle.id).checked = true;
                                     /**
                                      * Enviamos el vehiculo para que se vuelva a hacer visible en la pantalla del mapa.
                                      */
                                     _this.show(vehicle.id);
                                 }
                                 else
                                 {
                                     /**
                                      * Marcamos el checkbox desactivado del vehiculo para no mostrar
                                      * @type {boolean}
                                      */
                                     document.getElementById('vehicle_' + vehicle.id).checked = false;
                                     /**
                                      * Enviamos el vehiculo para que se desmarque de la pantalla del mapa.
                                      */
                                     _this.delete(vehicle.id);
                                 }
                             }
                             catch (e)
                             {
                                 if (isDebugCatch)
                                 {
                                     console.error('VUE | vehicle | all | showHiddenAll | Error: ' + e);
                                 }
                             }
                         });

    };

    _this.iconVehicle = function (vehicle)
    {

        let icon = {};

        /**
         * Calculamos la fecha y hora local (Chile)
         * y transformamos el device_time (UTC) a hora local (Chile)
         * para sacar diferencia en minutos
         */
        let dateDeviceTime = vehicle.device_time_local;
        /**console.log('dateDeviceTime: ', dateDeviceTime);
         let startTime = moment(new Date).format("YYYY-MM-DD HH:MM:ss").local()*/
        let startTime = moment().local();
        /**console.log('startTime: ', startTime);*/
        let endTime = moment(dateDeviceTime).format();
        /**console.log('endTime: ', endTime);*/

        let minutes = startTime.diff(endTime, 'minutes');
        minutes = minutes - (TIME_ZONE * 60); /** se restan 3 horas (60 minutos x 3 = 180 minutos) de la utc*/

        /**console.log(minutes);
         console.log('      ');*/

        icon.icon_az_map = url + '/images/bsa/mixer_blue.png';
        icon.icon_az_bar = url + '/images/bsa/mixer_lado_blue.png';
        icon.icon_map = url + '/images/bsa/mixer_blue.png';
        icon.icon_bar = url + '/images/bsa/mixer_lado_blue.png';
        icon.icon_side = url + '/images/bsa/mixer_lado_blue.png';
        icon.icon_dashboard = url + '/images/bsa/mixer_lado_blue.png';
        icon.minutes_transmition_diff = minutes;


        /**
         * Camion se encuentra con la BATERIA INTERNA DESCONECTADA
         * o fusible sacado para evitar transmitir posiciones
         */
        if (vehicle.power_gps < GPS_BATTERY_MIN && vehicle.power_gps != 0)
        {
            icon.icon_map = url + '/images/bsa/mixer_error_1.png';
            icon.icon_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_az_map = url + '/images/bsa/mixer_error_1.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_side = url + '/images/bsa/side/mixer_battery_off.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_dashboard_error_1.png';
        }
        /**
         * Camion se encuentra con la BATERIA INTERNA DESCONECTADA
         * o fusible sacado para evitar transmitir posiciones
         */
        else if (minutes > GPS_MINUTE_NOT_TRANSMITION)
        {
            icon.icon_map = url + '/images/bsa/mixer_error_4.png';
            /**icon.icon_map = url + '/images/bsa/mixer_blue.png';*/
            icon.icon_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_az_map = url + '/images/bsa/mixer_error_4.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_side = url + '/images/bsa/side/mixer_not_signal.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_dashboard_error_4.png';
        }
        /**
         * Camion se encuentra en TALLER Por poligono en el sistema MOVE
         */
        else if (vehicle.workshops_id != null)
        {
            icon.icon_map = url + '/images/bsa/mixer_error_3.png';
            icon.icon_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_az_map = url + '/images/bsa/mixer_error_3.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_side = url + '/images/bsa/side/mixer_workshop.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_dashboard_error_3.png';
        }
        /**
         * Camion se encuentra DESACTIVADO O INHABILITADO POR COMNNAD,
         * solo 0 o 00 es ACTIVO
         */
        else if (vehicle.inactive_code >= 1)
        {
            icon.icon_map = url + '/images/bsa/mixer_error_2.png';
            icon.icon_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_az_map = url + '/images/bsa/mixer_error_2.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_side = url + '/images/bsa/side/mixer_inactive.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_dashboard_error_2.png';
        }
        /**
         * Camion se encuentra en TALLER POR COMMAND
         */
        else if(vehicle !== null && vehicle.assgn_plant_code.startsWith("T"))
        {
            icon.icon_map = url + '/images/bsa/mixer_error_3.png';
            icon.icon_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_az_map = url + '/images/bsa/mixer_error_3.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_side = url + '/images/bsa/side/mixer_workshop.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_dashboard_error_3.png';
        }
        /**
         * Vehiculo se encuentra sin encendido
         */
        else if (vehicle.ignition == false)
        {
            icon.icon_map = url + '/images/bsa/mixer_blue_not_transmition.png';
            icon.icon_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_az_map = url + '/images/bsa/mixer_blue_not_transmition.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_side = url + '/images/bsa/mixer_lado_blue.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_blue_not_transmition.png';
        }
        /**
         * Vehiculo se encuentra encendido pero su velocidad es 0 KM
         */
        else if (vehicle.ignition == true && vehicle.speed == 0 && vehicle.state != 8)
        {
            icon.icon_map = url + '/images/bsa/mixer_blue_relenti.png';
            icon.icon_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_az_map = url + '/images/bsa/mixer_blue_relenti.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_side = url + '/images/bsa/mixer_lado_blue.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_blue_relenti.png';
        }
        /**
         * Camion se encuentra descargando...
         */
        else if (vehicle.state == 8)
        {
            icon.icon_map = url + '/images/bsa/mixer_red.png';
            icon.icon_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_az_map = url + '/images/bsa/mixer_red.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_side = url + '/images/bsa/mixer_lado_red.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_red.png';
        }
        /**
         * Camion se encuentra a planta, se muestra disponible
         */
        else if (vehicle.state == 12)
        {
            icon.icon_map = url + '/images/bsa/mixer_green.png';
            icon.icon_bar = url + '/images/bsa/mixer_lado_green.png';
            icon.icon_az_map = url + '/images/bsa/mixer_green.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_green.png';
            icon.icon_side = url + '/images/bsa/mixer_lado_green.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_green.png';
        }
        /**
         * Camión con carga o sin operar, se muestra normal
         */
        else
        {
            icon.icon_map = url + '/images/bsa/mixer_blue.png';
            icon.icon_bar = url + '/images/bsa/mixer_lado_blue.png';
            icon.icon_az_map = url + '/images/bsa/mixer_blue.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_blue.png';
            icon.icon_side = url + '/images/bsa/mixer_lado_blue.png';
            icon.icon_dashboard = url + '/images/bsa/mixer_blue.png';
        }

        /**
         * Si el usuario es administrador Azurian
         */
        if (vehicle.power_gps == 0)
        {
            icon.icon_az_map = url + '/images/bsa/mixer_error_0.png';
            icon.icon_az_bar = url + '/images/bsa/mixer_lado_error_0.png';
            icon.icon_side = url + '/images/bsa/side/mixer_battery_disabled.png';
        }

        return icon;
    };

    _this.reload = function ()
    {
        setInterval(function ()
                    {
                        /**
                         * Ajax Vehicles Update
                         */
                        axios
                            .get(api_url + "/vehicles/tracking/" + user.id)
                            .then((response) =>
                                  {
                                      if (typeof response.data.data !== "undefined")
                                      {
                                          let plants_vehicles = response.data.data;

                                          for (let i = 0; i < plants_vehicles.length; i++)
                                          {
                                              if (typeof plants_vehicles[i].vehicles !== "undefined")
                                              {
                                                  let vehiclesAjax = plants_vehicles[i].vehicles;
                                                  for (let j = 0; j < vehiclesAjax.length; j++)
                                                  {
                                                      /**
                                                       * Agregamnos el ID de la planta para poder usarlo en la actualización del storage en VUEX
                                                       */
                                                      vehiclesAjax[j].plants_id = plants_vehicles[i].id;
                                                      vehicles[vehiclesAjax[j].id] = vehiclesAjax[j];
                                                      aztrack.vehicle.update(vehicles[vehiclesAjax[j].id]);
                                                      /**
                                                       * Se verifíca si el checkbox de seguir vehículo está seleccionado para ir actualizando la vista del mapa acorde a su desplazamiento
                                                       */
                                                      let vehicle_id = vehicles[vehiclesAjax[j].id].id;
                                                      let view_vehicle = document.getElementById('view_vehicle_'+vehicle_id);
                                                      if(view_vehicle != null)
                                                      view_vehicle?.checked && aztrack.vehicle.view(vehicle_id);
                                                  }
                                              }
                                          }
                                      }
                                  })
                            .catch(function (error)
                                   {
                                       if (isDebugCatch)
                                       {
                                           console.error("AJAX | ERROR _> " + error);
                                       }
                                   });
                    }, ajax_timer);

    };

    _this.searchMixer = function ()
    {
        let mixer = document.getElementById("basicInput").value;
        if (isDebugInfo)
        {
            console.log("TEST......" + mixer);//isDebugInfo
        }

        let api = null;

        if ((typeof mixer === "undefined") || (mixer === null) || (mixer === ''))
        {
            api = api_url + '/vehicles/tracking/' + user.id;
        }
        else
        {
            api = api_url_new + '/web/vehicle/all/' + user.id + "/search/" + mixer;
        }

        if (isDebugInfo)
        {
            console.log("DATA SELECCIONADA _> " + api);//isDebugInfo
        }

        /**
         * Se consulta API
         *
         * */
        axios.get(api)
             .then((response) =>
                   {
                       let data = response.data.data;
                       aztrack.vehicle.updateHtmlVehicle(data);
                   }).catch(function (error)
                            {
                                console.error('VEHICLE | vehicle_all | ERROR _> ' + error);
                            });
    };

    _this.updateHtmlVehicle = function (data)
    {
        /**
         * Pintar html
         *
         * */
        /**console.log("Controller | Vehicle | cantidad de bocas _> " + data.length);*/
        let html = '';

        for (let i = 0; i < data.length; i++)
        {
            let id_plant = data[i].id;
            /**console.log("BOCA _> " + data[i].plant_code);*/
            html += '<div class="card" id="plant_' + id_plant + '">';
            html += '<div class="card-header collapse show" id="plant_collapse_' + id_plant + '" data-toggle="collapse" role="button" data-target="#plant_collapse_' + id_plant + '" aria-expanded="false" aria-controls="plant_collapse_' + id_plant + '">';
            html += '<span class="lead collapse-title">';
            html += data[i].plant_code + ' | ' + data[i].name + ' - (' + data[i].vehicles.length + ')';
            html += '</span>';
            html += '</div>';

            html += '<div id="plant_collapse_' + id_plant + '" class="collapse show" aria-labelledby="plant_collapse_' + id_plant + '" data-parent="#accordionPlantsVehicles">';
            html += '<div class="card-body">';

            if (typeof data[i].vehicles !== "undefined")
            {
                let vehicles = data[i].vehicles;
                /**console.log("NUMERO DE VEHICULOS ASOCIADOS A LA BOCA _> " + vehicles.length);*/

                /** document.getElementById('plant_collapse_' + data[i].id).innerHTML = data[i].plant_code + ' | '+ data[i].name + ' - ' + '(' + vehicles.length + ')';*/

                for (let j = 0; j < vehicles.length; j++)
                {
                    let k = j + 1;
                    let idVehicle = vehicles[j].id;
                    let operator = 'S/I';
                    let odometer = 'S/I';
                    let horometer = 'S/I';
                    let rpm = 'S/I';

                    if (isDebugInfo)
                    {
                        console.log(" ITEM _> " + j);//isDebugInfo
                        console.log("VEHICLE _> " + vehicles[j].name);//isDebugInfo
                    }

                    html += '<div id="plant_vehicle_' + idVehicle + '">';
                    /**
                     * LINEA # 1 Item - Nombre del mixer
                     * */
                    html += '<div class="divider divider-success">';
                    html += '<div class="divider-text">' + '(' + k + ')' + ' - ' + vehicles[j].name + '</div>';
                    html += '</div>';

                    /**
                     * LINEA # 2 Patente - Ver/Ocultar - Seguir
                     * */
                    html += '<div class="row vehicle-table-col">';
                    html += '<div class="col-4">';
                    html += '<div class="vehicle_lic_num" id="vehicle_lic_num_' + idVehicle + '">' + vehicles[j].lic_num + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="custom-control custom-switch custom-switch-success vehicle_lic_num">';
                    html += '<input type="checkbox" class="custom-control-input" id="vehicle_' + idVehicle + '" checked onclick="aztrack.vehicle.showHidden(' + idVehicle + ')"/>';
                    html += '<label class="custom-control-label" for="vehicle_' + idVehicle + '">';
                    html += '<span class="switch-icon-left"><i data-feather="check"></i></span>';
                    html += '<span class="switch-icon-right"><i data-feather="x"></i></span>';
                    html += '</label>';
                    html += '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="custom-control custom-control-success custom-checkbox">';
                    html += '<input type="checkbox" name="checkBoxFollowVehicle" class="custom-control-input" id="view_vehicle_' + idVehicle + '" onclick="aztrack.vehicle.view(' + idVehicle + ')">';
                    html += '<label class="custom-control-label" for="view_vehicle_' + idVehicle + '">Seguir</label>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';

                    /**
                     * Selecciona la compañia de telefono
                     */
                    if (vehicles[j].operator === 73001)
                    {
                        operator = '<img src="/images/icons/gprs/entel.png" style="width: 40px;"/>';
                    }
                    else if (vehicles[j].operator === 73002)
                    {
                        operator = '<img src="/images/icons/gprs/movistar.png" style="width: 40px;"/>';
                    }
                    else if (vehicles[j].operator === 73003)
                    {
                        operator = '<img src="/images/icons/gprs/claro.png" style="width: 40px;"/>';
                    }

                    rpm = vehicles[j].rpm;
                    if (rpm === null || rpm === '')
                    {
                        rpm = 'S/I';
                    }
                    else
                    {
                        rpm = conComas(rpm) + " RPM";
                    }

                    horometer = vehicles[j].horometer;
                    if (horometer === null || horometer === '')
                    {
                        horometer = 'S/I';
                    }
                    else
                    {
                        horometer = conComas(horometer) + " Hrs";
                    }

                    /**
                     * Se lleva a formato de 3 digitos el kilometraje
                     * */
                    odometer = vehicles[j].odometer;

                    if (odometer === null || odometer === '')
                    {
                        odometer = 'S/I';
                    }
                    else
                    {
                        odometer = odometerKm(odometer) + " Km";
                    }

                    /**
                     * LINEA # 3 Odometro - Rpm - Compañia de telefono
                     * */

                    html += '<div class="row vehicle-table-col">';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_odometer" id="vehicle_odometer_' + idVehicle + '">' + odometer + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_rpm" id="vehicle_rpm_' + idVehicle + '">' + rpm + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_operator" id="vehicle_operator_' + idVehicle + '">' + operator + '</div>';
                    html += '</div>';

                    html += '</div>';

                    let semaforo = '';
                    if (vehicles[j].speed === 0 && vehicles[j].ignition === FALSE)
                    {
                        semaforo = '<ul class="semaforo rojo"><li></li></ul>';
                    }
                    else if (vehicles[j].speed === 0 && vehicles[j].ignition === TRUE)
                    {
                        semaforo = '<ul class="semaforo amarillo"><li></li></ul>';
                    }
                    else if (vehicles[j].speed > 0)
                    {
                        semaforo = '<ul class="semaforo verde"><li></li></ul>';
                    }

                    let speed = vehicles[j].speed + ' Km/h';
                    let rssi = '';

                    if (vehicles[j].rssi === 0)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_0.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 1)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_1.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 2)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_2.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 3)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_3.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 4)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_4.png" style="width: 20px;"/>';
                    }

                    /**
                     * LINEA # 4 Horometro - Velocidad - Nivel de señal
                     * */
                    html += '<div class="row vehicle-table-col">';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_horometer" id="vehicle_horometer_' + idVehicle + '">' + horometer + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_speed" id="vehicle_speed_' + idVehicle + '">' + semaforo + speed + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_rssi" id="vehicle_rssi_' + idVehicle + '">' + rssi + '</div>';
                    html += '</div>';

                    html += '</div>';

                    let drive = 'S/I';
                    if (vehicles[j].drive_name !== null)
                    {
                        drive = vehicles[j].drive_name + ' ' + vehicles[j].drive_last_name;
                    }

                    /**
                     * Si tiene ticket asignado
                     *
                     */
                    let t_m_tp_ji_ticket_code = 'S/I';
                    let t_m_tp_sj_a_postal_code = 'S/I';
                    let t_m_tp_ji_t_m_tp_ji_ticket_qty = 'S/I';

                    if (typeof idVehicle !== "undefined")
                    {
                        const ticket = vehicles[j].ticket;

                        /**
                         * Se valida que el objeto de ticket exista.
                         */
                        if (typeof ticket !== "undefined")
                        {
                            for (let z = 0; z < ticket.length; z++)
                            {
                                /**console.log('BUSQUEDA POR OBJETO VEHICLES -> TICKET...');//isDebugInfo
                                 console.log("TICKET CODE _> " + ticket[z].t_m_tp_ji_ticket_code);//isDebugInfo
                                 console.log("POSTAL CODE _> " + ticket[z].t_m_tp_sj_a_postal_code);//isDebugInfo
                                 console.log("MTS3        _> " + ticket[z].t_m_tp_ji_t_m_tp_ji_ticket_qty);//isDebugInfo
                                 */

                                t_m_tp_ji_ticket_code = ticket[z].t_m_tp_ji_ticket_code;
                                t_m_tp_sj_a_postal_code = ticket[z].t_m_tp_sj_a_postal_code;
                                t_m_tp_ji_t_m_tp_ji_ticket_qty = ticket[z].t_m_tp_ji_t_m_tp_ji_ticket_qty;
                            }
                        }
                        else
                        {
                            /**
                             * Sino se busca la información directamente en el arreglo de vehiculos.
                             */
                            /**console.log('BUSQUEDA DE TICKET POR ARREGLO VEHICLES...');//isDebugInfo
                             console.log("TICKET CODE _> " + vehicles[j].t_m_tp_ji_ticket_code);//isDebugInfo
                             console.log("POSTAL CODE _> " + vehicles[j].t_m_tp_sj_a_postal_code);//isDebugInfo
                             console.log("MTS3        _> " + vehicles[j].t_m_tp_ji_t_m_tp_ji_ticket_qty);//isDebugInfo
                             */

                            t_m_tp_ji_ticket_code = vehicles[j].t_m_tp_ji_ticket_code;
                            t_m_tp_sj_a_postal_code = vehicles[j].t_m_tp_sj_a_postal_code;
                            t_m_tp_ji_t_m_tp_ji_ticket_qty = vehicles[j].t_m_tp_ji_t_m_tp_ji_ticket_qty;
                        }
                    }

                    /**
                     * LINEA # 5 (esta seccion aparece al seleccionar checkbox seguir)
                     * */

                    html += '<div class="row">';
                    html += '<div class="col-12">';
                    html += '<div class="center" id="view_vehicle_info_' + idVehicle + '" style="display:none;">';
                    html += '<table class="table vehicle_info_ticket" style="margin-bottom: 0px;">';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">OB:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_postal_code_' + idVehicle + '">' + t_m_tp_sj_a_postal_code + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">TC:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_ticket_code_' + idVehicle + '">' + t_m_tp_ji_ticket_code + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">M³:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_ticket_qty_' + idVehicle + '">' + t_m_tp_ji_t_m_tp_ji_ticket_qty + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">Conductor:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_drive_name_' + idVehicle + '">' + drive + '</td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';

                    let state = '';
                    if (vehicles[j].state === null || vehicles[j].state <= 4)
                    {
                        state = '<img src="' + vehicles[j].icon_side + '" style="width: 70px;"/>';

                    }
                    else
                    {
                        state = '<img src="/images/bsa/mixer_lado_blue.png" style="width: 70px; display: none;"/>';
                    }

                    let state2 = '';
                    if (vehicles[j].state === 5)
                    {
                        state2 = '<img src="/images/bsa/mixer_lado_blue.png" style="width: 70px;"/>';
                    }
                    else
                    {
                        state2 = '<img src="/images/bsa/mixer_lado_blue.png" style="width: 70px; display: none;"/>';
                    }

                    let state3 = '';
                    if (vehicles[j].state >= 8 && vehicles[j].state <= 9)
                    {
                        state3 = '<img src="/images/bsa/mixer_lado_red.png" style="width: 70px;"/>';
                    }
                    else
                    {
                        state3 = '<img src="/images/bsa/mixer_lado_red.png" style="width: 70px; display: none;"/>';
                    }

                    let state4 = '';
                    if (vehicles[j].state === 12)
                    {
                        state4 = '<img src="/images/bsa/mixer_lado_green.png" style="width: 70px;"/>';
                    }
                    else
                    {
                        state4 = '<img src="/images/bsa/mixer_lado_green.png" style="width: 70px; display: none;"/>';
                    }

                    let esfera = '';
                    if (vehicles[j].state >= 4)
                    {
                        esfera = '<div class="circulo_success" style="width: 30px;">AO</div>';
                    }
                    else
                    {
                        esfera = '<div class="circulo" style="width: 30px;">AO</div>';
                    }

                    let esfera2 = '';
                    if (vehicles[j].state >= 5)
                    {
                        esfera2 = '<div class="circulo_success" style="width: 30px;">EO</div>';
                    }
                    else
                    {
                        esfera2 = '<div class="circulo" style="width: 30px;">EO</div>';
                    }

                    let esfera3 = '';
                    if (vehicles[j].state >= 8)
                    {
                        esfera3 = '<div class="circulo_success" style="width: 30px;">DE</div>';
                    }
                    else
                    {
                        esfera3 = '<div class="circulo" style="width: 30px;">DE</div>';
                    }

                    let esfera4 = '';
                    if (vehicles[j].state >= 12)
                    {
                        esfera4 = '<div class="circulo_success" style="width: 30px;">AP</div>';
                    }
                    else
                    {
                        esfera4 = '<div class="circulo" style="width: 30px;">AP</div>';
                    }

                    /**
                     * LINEA # 5
                     * */

                    html += '<div class="row">';
                    html += '<div class="col-12 vehicle_ticket_state" id="vehicle_ticket_state_' + idVehicle + '">';
                    html += '<table class="table vehicle_bubble">';
                    html += '<tr>';
                    html += '<td class="col-3" align="center">' + state + '</td>';
                    html += '<td class="col-3" align="center">' + state2 + '</td>';
                    html += '<td class="col-3" align="center">' + state3 + '</td>';
                    html += '<td class="col-3" align="center">' + state4 + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td class="col-3" align="center">' + esfera + '</td>';
                    html += '<td class="col-3" align="center">' + esfera2 + '</td>';
                    html += '<td class="col-3" align="center">' + esfera3 + '</td>';
                    html += '<td class="col-3" align="center">' + esfera4 + '</td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '</div>';
                    html += '</div>';

                    html += '</div>';
                }
            }
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
        document.getElementById('accordionPlantsVehicles').innerHTML = html;
    };

}

/**
 * Libreria para manipulación de vehiculos de terceros en el sistema
 */
function VehicleRent()
{
    let _this = this;

    // var on_focus_vehicle_rent;

    // var selected_vehicle_rent = null;

    _this.show = function (id)
    {
        try
        {
            if (typeof vehicles_rents_markers[id] !== 'undefined')
            {
                ///
                /// Mostramos el camión en el mapa
                ///
                vehicle_rent_marker_cluster.addLayer(vehicles_rents_markers[id]);
                ///
                /// Mostramos sus ultimos puntos en el mapa
                ///
                _this.showRoute(id);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.error('VEHICLE | show | No existe el vehiculo ID _> ' + id);
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | show | ERROR _> ' + e)
            }
        }
    };

    _this.delete = function (id)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE | delete | Eliminando _> ' + id); //isDebugInfo
            }

            if (typeof vehiclesRents[id] !== 'undefined')
            {
                ///
                /// Eliminamos el camion del mapa
                ///
                vehicle_rent_marker_cluster.removeLayer(vehicles_rents_markers[id])

                if (typeof vehicles_rents_markers[id] !== "undefined")
                {
                    ///delete vehicles_rents_markers[id]
                }
                ///
                /// Eliminamos sus ultimos puntos del camión en el mapa
                ///
                _this.hiddenRoute(id);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('VEHICLE | delete | No existe la vehicles ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | delete | ERROR _> ' + e)
            }
        }
    };

    _this.add = function (vehicle)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE | add | ID _> ' + vehicle.id); //isDebugInfo
            }

            let icon = null;
            let course = 0;
            let width = 50;
            let height = 81;
            let position = new L.LatLng(vehicle.latitude, vehicle.longitude);
            let html = '';

            let ruta = url_2 + '/images/bsa/mixer_rent_map.png';

            if (isDebugInfo){
                console.log(ruta); //isDebugInfo
            }

            if (user.group_id == 69)
            {
                icon = '<img src="' + ruta + '"/>';
            }
            else
            {
                icon = '<img src="' + ruta + '"/>';
            }

            course = vehicle.course;

            html += '<span class="name"><i>' + vehicle.name + ' (' + (vehicle.speed || '0') + ' km)' + '</i></span><br/>';
            html += icon;

            let iconAnchor = [(width / 2), (height / 2)];

            let divIcon = L.divIcon({
                html: html,
                className: 'leaf-device-marker',
                iconSize: [width, height],
                iconAnchor: iconAnchor,
                popupAnchor: [0, 0 - height]
            });

            /* Limpieza de variable y reemplazo de contenido */
            vehiclesRents[vehicle.id] = vehicle;

            /**
             *  Limpieza de variable
             */
            vehicles_rents_markers[vehicle.id] = L.marker(position, {
                iconAngle: vehicle.course,
                icon: divIcon,
                title: vehicle.name || 'S/I'
            },).bindPopup('Sin información', {maxWidth: 500});

            _this.show(vehicle.id);

        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | ' + vehicle.id + ' | add | ERROR _> ' + e);
            }
        }
        return;
    };

    _this.showHiddenLabel = function ()
    {
        try
        {
            let vehicle_label = document.getElementById('vehicle_label').checked;
            if (vehicle_label)
            {
                /**
                 * Desocultamos los letrero de los camiones, y activamos la variable global
                 * para que mantenga el Desocultamos
                 */
                $('.leaf-device-marker .name').css('display', 'block');
                vehicles_placard = true;
            }
            else
            {
                /**
                 * Ocultamos los letrero de los camiones, y activamos la variable global
                 * para que mantenga el ocultamiento
                 */
                $('.leaf-device-marker .name').css('display', 'none');
                vehicles_placard = false;
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | showHiddenLabel | ERROR _> ' + e);
            }

        }
        return;
    };
    ///
    /// Funcion encargada de terminar el seguimiento del camión
    ///
    _this.tracingOff = function ()
    {
        clearAllpopUP();
        try
        {            
            on_focus_vehicle = '';
            on_focus_vehicle_bulk='';
            on_focus_vehicle_rent='';

            vehicles.forEach(function (vehicle, index) {
                try {
                    _this.restoreSelectedVehicle(vehicle.name)
                    // let view_vehicle_id = document.getElementById('view_vehicle_' + vehicle.id)
                    // let view_vehicle_rent_id = document.getElementById('view_vehicle_rent_' + vehicle.id)
                    // let view_vehicle_bulk_id = document.getElementById('view_vehicle_bulk_' + vehicle.id)


                    // if (view_vehicle_id !== 'undefined' || view_vehicle_id !== null) {
                    //     view_vehicle_id.checked = false;
                    // }
                    // if (view_vehicle_rent_id !== 'undefined' || view_vehicle_rent_id !== null) {
                    //     view_vehicle_rent_id.checked = false;
                    // }
                    // if (view_vehicle_bulk_id !== 'undefined' || view_vehicle_bulk_id !== null) {
                    //     view_vehicle_bulk_id.checked = false;
                    // }
                }
                catch (e) {
                    if (isDebugCatch) {
                        console.log('VEHICLE | tracingOff | ERROR _> ' + e); //isDebugCatch
                    }
                }
            });
            

            let isChecked = document.getElementById('tracing_off').checked;
            ///
            /// Validamos si lo acabamos de desmarcar, para volver a marcalo y siempre este en estado de marcado
            /// pasado 2 Seg, se vuelve a chequear solo
            ///
            if (!isChecked)
            {
                setTimeout(function ()
                {
                    document.getElementById('tracing_off').checked = true;
                }, 2000);

            }

            ///
            /// Desactivamos el focus de un camion por el focus de un mapa
            ///
            let bounds = [map.getCenter()];
            let option = {};
            option.maxZoom = map.getZoom();
            ///
            /// Verificamos si el Zoom esta al maximo en el mapa, si no
            /// se asignara que este al maximo, pero en la latitud y longitud dada por el vehiculo
            ///
            /*
             if (currentZoom < 12 || currentZoom > 12)
             {
             option.maxZoom = 12;
             }
             */
            map.fitBounds(bounds, option);
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | tracingOff | ERROR _> ' + e);
            }
        }
        return;
    };

    _this.update = function (vehicle)
    {
        try
        {
            let icon = null;
            let course = 0;
            let width = 50;
            let height = 81;
            let position = new L.LatLng(vehicle.latitude, vehicle.longitude);
            let html = '';
            //let color = _this.getStatusColor();

            let ruta = url_2 + '/images/bsa/mixer_rent_map.png';

            if (isDebugInfo){
                console.log(ruta); //isDebugInfo
            }

            if (user.group_id == 69)
            {
                icon = '<img src="' + ruta + '"/>';
            }
            else
            {
                icon = '<img src="' + ruta + '"/>';
            }

            course = vehicle.course;


            let iconAnchor = [(width / 2), (height / 2)];

            let divIcon;
            if (vehicles_placard == false)
            {
                /**
                 * Si el ocultamos de placa esta activado
                 */
                if (isTimerVehicle)
                {
                    html += '<span class="name" style="display: none;"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
                }
                else
                {
                    html += '<span class="name" style="display: none;"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
                }
                html += icon;
            }
            else
            {
                /**
                 * Si el ocultamos de placa no esta activado
                 */
                html += '<span class="name" style="display: block;"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
                html += icon;
            }

            divIcon = L.divIcon({
                html: html,
                className: 'leaf-device-marker',
                iconSize: [width, height],
                iconAnchor: iconAnchor,
                popupAnchor: [0, 0 - height]
            });


            let text = '<table>';
            text += '<tr><td><strong>Fecha GPS:</strong></td><td> ' + ((vehicle.device_time_local != null) ? vehicle.device_time_local : " Sin información") + '</td></tr>';
            text += '<tr><td><strong>Patente:</strong></td><td> ' + ((vehicle.lic_num != null) ? vehicle.lic_num : "Sin información") + '</td></tr>';
            text += '</table>';

            let popup = L.popup()
                .setContent(text);
            vehicles_rents_markers[vehicle.id].bindPopup(popup, {maxWidth: 500}).setIcon(divIcon).setIconAngle(course);

            ///
            /// Si el vehiculo a procesar es igual al seleccionado para el focus, se activa
            /// el centrado de seguimiento
            ///
            if (on_focus_vehicle_rent == vehicle.id)
            {
                if (isDebugInfo)
                {
                    console.log('VEHICLE Rents | update | SEGUIMIENTO ACTIVO _> ' + vehicle.id); //isDebugInfo
                }
                ///
                /// Efecto de movimiento de camiones
                ///
                if (isTruckMoveEffect)
                {
                    vehicles_rents_markers[vehicle.id].slideTo(position, {duration: 3000, keepAtCenter: true});
                }
                else
                {
                    /**
                     El camion tiene el focus activado, debe centrar el mapa luego de actualizar la geoposicion
                     */

                    vehicles_rents_markers[vehicle.id].setLatLng(position);

                    let latLng = vehicles_rents_markers[vehicle.id].getLatLng();
                    let bounds = [latLng];
                    let option = {};

                    currentZoom = map.getZoom();
                    option.maxZoom = map.getZoom();
                    map.fitBounds(bounds, option);
                }
            }
            else
            {
                ///
                /// Efecto de movimiento de camiones
                ///
                if (isTruckMoveEffect)
                {
                    vehicles_rents_markers[vehicle.id].slideTo(position, {duration: 3000});
                }
                else
                {
                    vehicles_rents_markers[vehicle.id].setLatLng(position);
                }

            }

            _this.changeSpeed(vehicle);
            _this.changeDateLocal(vehicle);

            if (selected_vehicle_rent == vehicle.id)
            {
                _this.paintSelectedVehicle(vehicle.name, vehicle.id);
            }


        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | update | ERROR _> ' + e);
            }
        }
        return;
    };

    _this.getMapPadding = function ()
    {
        var _offset = 10,
            _left = _offset,
            _bottom = _offset,
            $sidebar = $('#sidebar'),
            $bottombar = $('#bottombar');

        if ($sidebar.length)
        {
            _left += $sidebar.width() + $sidebar.offset().left;
        }

        if ($bottombar.length)
        {
            _bottom += $bottombar.height();
        }

        return {
            paddingTopLeft: [_left, _offset],
            paddingBottomRight: [_offset, _bottom],
        };
    };

    _this.fitBounds = function (currentZoom)
    {
        var _bounds = [];

        _bounds = [_item.getLatLng()];

        if (_bounds.length)
        {
            var _option = _this.getMapPadding();


            if (currentZoom && typeof currentZoom === 'boolean')
            {
                currentZoom = map.getZoom();
            }
            if (currentZoom && map.getBoundsZoom(_bounds) > currentZoom)
            {
                _option.maxZoom = currentZoom;
            }
            if (!currentZoom)
            {
                _option.maxZoom = 17;
            }
            map.fitBounds(_bounds, _option);
        }
        return;
    };
    ///
    /// Iniciamos Cluster que contendra el total de vehiculos visible en el mapa
    ///
    _this.clusterInit = function ()
    {
        if (isDebugInfo)
        {
            console.log('VEHICLE Rents | clusterInit | Iniciando el cluster de vehiculos... '); //isDebugInfo
        }
        try
        {
            vehicle_rent_marker_cluster = L.markerClusterGroup(
                {
                    disableClusteringAtZoom: 17,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false,
                    removeOutsideVisibleBounds: true,
                    iconCreateFunction: function (cluster)
                    {
                        let count = cluster.getChildCount(),
                            c = 'cluster-',
                            radius = 58;

                        if (count < 5)
                        {
                            c += 'small';
                        }
                        else if (count < 10)
                        {
                            c += 'medium';
                        }
                        else
                        {
                            c += 'large';
                        }

                        return L.divIcon({
                            html: '<div class="cluster-inner"><b>' + count + '</b></div>',
                            className: 'cluster ' + c,
                            iconSize: [radius, radius],
                            iconAnchor: [radius / 2, radius / 2]
                        });
                    }
                });
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | clusterInit | ERROR _> ' + e)
            }
        }
        return;
    };

    _this.socket = function ()
    {
        if (isDebugInfo)
        {
            console.log('VEHICLE Rents | SOCKET | iniciando funcion socket'); //isDebugInfo
        }
        try
        {
            plants.forEach(function (data, index)
            {
                data.plants.forEach(function (pit, index)
                {
                    if (isDebugInfo)
                    {
                        console.log('VEHICLE Rents | WEBSOCKET | CHANNEL | vehicle-position_' + pit.id + ' | OK'); //isDebugInfo
                    }

                    Echo.channel('POL_PROD_MOVE_vehicle-position_' + pit.id).listen('VehiclePositionEvent', (e) =>
                        {
                            let vehicle = e.message;
                            if (typeof vehiclesRents[vehicle.id] !== 'undefined')
                            {
                                if (isDebugInfo)
                                {
                                    ///console.log('VEHICLE NAME: ' + vehicle.name + ' | ID: ' + vehicle.id); //isDebugInfo
                                }
                                ///
                                /// Enviamos el vehiculo a actualización
                                ///
                                _this.update(vehicle);
                            }
                            else
                            {
                                ///console.log('VEHICLE ID: ' + vehicle.id + ' | no existe');
                            }
                        },
                    );
                });
            });
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | ERROR _> ' + e)
            }
        }
        return;
    };

    _this.ajax = function ()
    {
        if (isDebugInfo)
        {
            console.log('VEHICLE Rents | AJAX | iniciando funcion ajax'); //isDebugInfo
        }
        try
        {

            setInterval(function ()
            {
                ///
                /// Ajax Vehicles Update
                ///
                axios.get(api_url + '/vehicles-rents/' + user.id)
                    .then((response) =>
                    {
                        context.commit('plantsVehiclesRents', response.data.data);
                    }).catch(function (error)
                {
                    if (isDebugCatch)
                    {
                        console.error('VUEJS | AJAX | ERROR _> ' + error);
                    }

                });
            }, 5000);


        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | ERROR _> ' + e)
            }
        }
        return;
    };

    _this.viewVehicleMap = function (id)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE Rents | viewVehicle | ID _> ' + id); //isDebugInfo
            }


            if (typeof vehicles_rents_markers[id] !== 'undefined')
            {
                let vehicle = vehicles_rents_markers[id];

                document.getElementById('view_vehicle_rent_' + id).checked = true;
                /**document.getElementById('view_vehicle_rent_info_' + id).style.display = 'block';*/

                ///
                /// Asignamos el focus al camión ya que fue pinchado
                ///
                on_focus_vehicle_rent = id;


                let latLng = vehicles_rents_markers[id].getLatLng();
                let bounds = [latLng];
                let option = {};

                currentZoom = map.getZoom();
                ///
                /// Verificamos si el Zoom esta al maximo en el mapa, si no
                /// se asignara que este al maximo, pero en la latitud y longitud dada por el vehiculo
                ///
                if (currentZoom < 17 || currentZoom > 17)
                {
                    option.maxZoom = 17;
                }
                else
                {
                    option.maxZoom = 17;
                }

                map.fitBounds(bounds, option);
                _this.paintSelectedVehicle(vehicle.options.title, id);
            }

        }
        catch
            (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | viewVehicle | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.showHiddenAllRoutes = function ()
    {
        try
        {
            let show_hidden_all_routers = document.getElementById('show_hidden_all_routers');
            if (show_hidden_all_routers.checked)
            {
                _this.showRoutes();
            }
            else
            {

                _this.hiddenRoutes();
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | showHiddenAllRoutes | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.hiddenRoutes = function ()
    {
        try
        {
            vehicles_rents_tail.forEach(function (valor, id)
                {
                    _this.hiddenRoute(id);
                }
            );
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | HIDDENROUTES | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.showRoutes = function ()
    {
        try
        {
            vehicles_rents_tail.forEach(function (valor, id)
                {
                    _this.showRoute(id);
                }
            );
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | SHOWROUTES | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.hiddenRoute = function (id)
    {
        if (typeof vehicles_rents_tail[id] !== 'undefined')
        {
            map.removeLayer(vehicles_rents_tail[id]);
        }
        else
        {
            if (isDebugInfo)
            {
                console.error('VEHICLE Rents | HIDDENROUTE | no existe el ID _> ' + id);
            }
        }
        return;
    };
    _this.showRoute = function (id)
    {
        if (typeof vehicles_rents_tail[id] !== 'undefined')
        {
            map.addLayer(vehicles_rents_tail[id]);
        }
        else
        {
            if (isDebugInfo)
            {
                console.error('VEHICLE Rents | SHOWROUTE | no existe el ID _> ' + id);
            }
        }
        return;
    };

    _this.changeTypeMovementVehicle = function ()
    {
        ///
        /// Hacemos la inversion del tipo de dato que habia
        /// TRUE x FALSE
        /// FALSE x TRUE
        ///
        isTruckMoveEffect = !isTruckMoveEffect;

        ///
        /// Actualizamos el valor del camion en el Local Storage y la variable Global
        ///
        change_type_movement_vehicle = !isTruckMoveEffect;
        ls.setItem("changeTypeMovementVehicle", !isTruckMoveEffect);
    };

    _this.view = function (id)
    {
        /**
         * Tomamos el valor de check para revisar si esta true o false
         */
        let isChecked = document.getElementById('view_vehicle_rent_' + id).checked;
        if (isChecked)
        {
            try {
                document.getElementById('leave-follow').style.display = 'block';
            } catch (error) {
                if (isDebugCatch)
                {
                console.log("error find in DOM id:'leave-follow' error: " + e);
                }
            }
            //borrar todos los demas check del front
            clearAllSelectedVehicle();
            /**
             * Agregamos al camión al listado
             */
            document.getElementById('view_vehicle_rent_' + id).checked = true;
            _this.tracingOff();
            _this.viewVehicleMap(id);
        }
        else
        {
            try {
                document.getElementById('leave-follow').style.display = 'none';
            } catch (error) {
                if (isDebugCatch)
                {
                console.log("error find in DOM id:'leave-follow' error: " + e);
                }
            }
            /**
             * Eliminamos al camión del listado
             */
            document.getElementById('view_vehicle_rent_' + id).checked = false;
            _this.tracingOff();
        }
    };

    _this.paintSelectedVehicle = function (vehicle, id)
    {
        let searchedSelector = '[title="' + vehicle + '"]';
        try
        {

            let infoVehicule = document.querySelector(searchedSelector);
            if (infoVehicule != null)
            {
                selected_vehicle_rent = id;
                infoVehicule.style.zIndex = 999;
                infoVehicule.children[0].children[0].style.background = "#ffc000";
                infoVehicule.style.color = "#000";
            }
        }
        catch (e)
        {
            if (isDebugInfo) {
                console.log("error find in DOM " + vehicle + " error: " + e); //isDebugInfo
            }
        }
        ;
    };

    // restore vehicle top panel blue with white letter
    _this.restoreSelectedVehicle = function (vehicle)
    {

        let searchedSelector = '[title="' + vehicle + '"]';
        try
        {
            let infoVehicule = document.querySelector(searchedSelector);
            if (infoVehicule != null)
            {
                selected_vehicle = null;
                selected_vehicle_bulk = null;
                selected_vehicle_rent = null;


                infoVehicule.style.zIndex = 0;
                infoVehicule.children[0].children[0].style.background = "#161246";
                infoVehicule.style.color = "#b4b7bd";
            }
        }
        catch (e)
        {
            if (isDebugInfo) {
                console.log("error find in DOM " + vehicle + " error: " + e); //isDebugInfo
            }
        }
        ;
    };


    _this.changeSpeed = function (vehicle)
    {

        let html = '';

        if (vehicle.speed == 0)
        {
            html += '<ul class="semaforo rojo">\n' +
                '            <li></li>\n' +
                '        </ul>';

        }
        else if (vehicle.speed > 0)
        {
            html += '<ul class="semaforo verde">\n' +
                '            <li></li>\n' +
                '        </ul>';
        }

        html += vehicle.speed + ' Km/h';

        vehicle_rent_speed_id = document.getElementById('vehicle_rent_speed_' + vehicle.id);

        if (vehicle_rent_speed_id != null || vehicle_rent_speed_id != undefined) {
            vehicle_rent_speed_id.innerHTML = html;
        }

    };

    _this.changeDateLocal = function (vehicle)
    {

        let html = '';

        html += vehicle.device_time_local + ' ';

        html += '\n<img src="/images/bsa/mixer_rent_panel.png" style="width: 70px;"/>';

        // document.getElementById('vehicle_rent_time_local_' + vehicle.id).innerHTML = html;

        vehicle_rent_time_local_id = document.getElementById('vehicle_rent_time_local_' + vehicle.id);
        
        if (vehicle_rent_time_local_id != null || vehicle_rent_time_local_id != undefined) {
            vehicle_rent_time_local_id.innerHTML = html;
        }

    };

    _this.reload = function ()
    {
        setInterval(function ()
        {
            /**
             * Ajax Vehicles Update
             */
            axios
                .get(api_url + "/vehicles-rents/" + user.id)
                .then((response) =>
                {
                    if (typeof response.data.data !== "undefined")
                    {
                        let plants_vehicles = response.data.data;

                        for (let i = 0; i < plants_vehicles.length; i++)
                        {
                            if (typeof plants_vehicles[i].vehicles !== "undefined")
                            {
                                let vehiclesRentsAjax = plants_vehicles[i].vehicles;

                                for (let j = 0; j < vehiclesRentsAjax.length; j++)
                                {
                                    /**
                                     * Agregamnos el ID de la planta para poder usarlo en la actualización del storage en VUEX
                                     */
                                    vehiclesRentsAjax[j].plants_id = plants_vehicles[i].id;
                                    vehiclesRents[vehiclesRentsAjax[j].id] = vehiclesRentsAjax[j];
                                    aztrack.vehicleRent.update(vehiclesRents[vehiclesRentsAjax[j].id]);
                                    /**
                                     * Se verifíca si el checkbox de seguir vehículo está seleccionado para ir actualizando la vista del mapa acorde a su desplazamiento
                                     */
                                    let vehicle_id = vehiclesRents[vehiclesRentsAjax[j].id].id;
                                    let view_vehicle = document.getElementById('view_vehicle_rent_'+vehicle_id);
                                    view_vehicle?.checked && aztrack.vehicle.view(vehicle_id);
                                }
                            }
                        }
                    }
                })
                .catch(function (error)
                {
                    if (isDebugCatch)
                    {
                        console.error("AJAX | ERROR _> " + error);
                    }
                });
        }, ajax_timer);

    };

    _this.showHiddenAll = function ()
    {
        /**
         * Tomamos el valor de check para revisar si esta On o Off
         */
        let isChecked = document.getElementById('vehicles_all_Rent').checked;

        if (isChecked)
        {
            vehiclesView = true;
            this.vehiclesView = true;
            ls.setItem("vehiclesView", true);
        }
        else
        {
            vehiclesView = false;
            this.vehiclesView = false;
            ls.setItem("vehiclesView", false);
        }

        vehiclesRents.forEach(function (vehicle, id)
                         {
                             try
                             {
                                 if (isChecked)
                                 {
                                     /**
                                      * Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                                      * @type {boolean}
                                      */
                                     document.getElementById('vehicle_' + vehicle.id).checked = true;
                                     /**
                                      * Enviamos el vehiculo para que se vuelva a hacer visible en la pantalla del mapa.
                                      */
                                     _this.show(vehicle.id);
                                 }
                                 else
                                 {
                                     /**
                                      * Marcamos el checkbox desactivado del vehiculo para no mostrar
                                      * @type {boolean}
                                      */
                                     document.getElementById('vehicle_' + vehicle.id).checked = false;
                                     /**
                                      * Enviamos el vehiculo para que se desmarque de la pantalla del mapa.
                                      */
                                     _this.delete(vehicle.id);
                                 }
                             }
                             catch (e)
                             {
                                 if (isDebugCatch)
                                 {
                                     console.error('VUE | vehicle | all | showHiddenAll | Error: ' + e);
                                 }
                             }
                         });

    };


    _this.updateHtmlVehicle = function (data)
    {
        /**
         * Pintar html
         *
         * */
        /**console.log("Controller | Vehicle | cantidad de bocas _> " + data.length);*/
        let html = '';

        for (let i = 0; i < data.length; i++)
        {
            let id_plant = data[i].id;
            /**console.log("BOCA _> " + data[i].plant_code);*/
            html += '<div class="card" id="plant_' + id_plant + '">';
            html += '<div class="card-header collapse show" id="plant_collapse_' + id_plant + '" data-toggle="collapse" role="button" data-target="#plant_collapse_' + id_plant + '" aria-expanded="false" aria-controls="plant_collapse_' + id_plant + '">';
            html += '<span class="lead collapse-title">';
            html += data[i].plant_code + ' | ' + data[i].name + ' - (' + data[i].vehicles.length + ')';
            html += '</span>';
            html += '</div>';

            html += '<div id="plant_collapse_' + id_plant + '" class="collapse show" aria-labelledby="plant_collapse_' + id_plant + '" data-parent="#accordionPlantsVehiclesRent">';
            html += '<div class="card-body">';

            if (typeof data[i].vehicles !== "undefined")
            {
                let vehicles = data[i].vehicles;
                /**console.log("NUMERO DE VEHICULOS ASOCIADOS A LA BOCA _> " + vehicles.length);*/

                /** document.getElementById('plant_collapse_' + data[i].id).innerHTML = data[i].plant_code + ' | '+ data[i].name + ' - ' + '(' + vehicles.length + ')';*/

                for (let j = 0; j < vehicles.length; j++)
                {
                    let k = j + 1;
                    let idVehicle = vehicles[j].id;
                    let operator = 'S/I';
                    let odometer = 'S/I';
                    let horometer = 'S/I';
                    let rpm = 'S/I';

                    if (isDebugInfo) {
                        console.log(" ITEM _> " + j);//isDebugInfo
                        console.log("VEHICLE _> " + vehicles[j].name);//isDebugInfo
                    }

                    html += '<div id="plant_vehicle_' + idVehicle + '">';
                    /**
                     * LINEA # 1 Item - Nombre del mixer
                     * */
                    html += '<div class="divider divider-success">';
                    html += '<div class="divider-text">' + '(' + k + ')' + ' - ' + vehicles[j].name + '</div>';
                    html += '</div>';

                    /**
                     * LINEA # 2 Patente - Ver/Ocultar - Seguir
                     * */
                    html += '<div class="row vehicle-table-col">';
                    html += '<div class="col-4">';
                    html += '<div class="vehicle_lic_num" id="vehicle_lic_num_' + idVehicle + '">' + vehicles[j].lic_num + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="custom-control custom-switch custom-switch-success vehicle_lic_num">';
                    html += '<input type="checkbox" class="custom-control-input" id="vehicle_rent_' + idVehicle + '" checked onclick="aztrack.vehicleRent.showHidden(' + idVehicle + ')"/>';
                    html += '<label class="custom-control-label" for="vehicle_rent_' + idVehicle + '">';
                    html += '<span class="switch-icon-left"><i data-feather="check"></i></span>';
                    html += '<span class="switch-icon-right"><i data-feather="x"></i></span>';
                    html += '</label>';
                    html += '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="custom-control custom-control-success custom-checkbox">';
                    html += '<input type="checkbox" name="checkBoxFollowVehicle" class="custom-control-input" id="view_vehicle_rent_' + idVehicle + '" onclick="aztrack.vehicleRent.view(' + idVehicle + ')">';
                    html += '<label class="custom-control-label" for="view_vehicle_rent_' + idVehicle + '">Seguir</label>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';

                    /**
                     * Selecciona la compañia de telefono
                     */
                    if (vehicles[j].operator === 73001)
                    {
                        operator = '<img src="/images/icons/gprs/entel.png" style="width: 40px;"/>';
                    }
                    else if (vehicles[j].operator === 73002)
                    {
                        operator = '<img src="/images/icons/gprs/movistar.png" style="width: 40px;"/>';
                    }
                    else if (vehicles[j].operator === 73003)
                    {
                        operator = '<img src="/images/icons/gprs/claro.png" style="width: 40px;"/>';
                    }

                    rpm = vehicles[j].rpm;
                    if (rpm === null || rpm === '')
                    {
                        rpm = 'S/I';
                    }
                    else
                    {
                        rpm = conComas(rpm) + " RPM";
                    }

                    horometer = vehicles[j].horometer;
                    if (horometer === null || horometer === '')
                    {
                        horometer = 'S/I';
                    }
                    else
                    {
                        horometer = conComas(horometer) + " Hrs";
                    }

                    /**
                     * Se lleva a formato de 3 digitos el kilometraje
                     * */
                    odometer = vehicles[j].odometer;

                    if (odometer === null || odometer === '')
                    {
                        odometer = 'S/I';
                    }
                    else
                    {
                        odometer = odometerKm(odometer) + " Km";
                    }

                    /**
                     * LINEA # 3 Odometro - Rpm - Compañia de telefono
                     * */

                    html += '<div class="row vehicle-table-col">';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_odometer" id="vehicle_odometer_' + idVehicle + '">' + odometer + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_rpm" id="vehicle_rpm_' + idVehicle + '">' + rpm + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_operator" id="vehicle_operator_' + idVehicle + '">' + operator + '</div>';
                    html += '</div>';

                    html += '</div>';

                    let semaforo = '';
                    if (vehicles[j].speed === 0 && vehicles[j].ignition === FALSE)
                    {
                        semaforo = '<ul class="semaforo rojo"><li></li></ul>';
                    }
                    else if (vehicles[j].speed === 0 && vehicles[j].ignition === TRUE)
                    {
                        semaforo = '<ul class="semaforo amarillo"><li></li></ul>';
                    }
                    else if (vehicles[j].speed > 0)
                    {
                        semaforo = '<ul class="semaforo verde"><li></li></ul>';
                    }

                    let speed = vehicles[j].speed + ' Km/h';
                    let rssi = '';

                    if (vehicles[j].rssi === 0)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_0.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 1)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_1.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 2)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_2.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 3)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_3.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 4)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_4.png" style="width: 20px;"/>';
                    }

                    /**
                     * LINEA # 4 Horometro - Velocidad - Nivel de señal
                     * */
                    html += '<div class="row vehicle-table-col">';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_horometer" id="vehicle_horometer_' + idVehicle + '">' + horometer + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_speed" id="vehicle_speed_' + idVehicle + '">' + semaforo + speed + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_rssi" id="vehicle_rssi_' + idVehicle + '">' + rssi + '</div>';
                    html += '</div>';

                    html += '</div>';

                    let drive = 'S/I';
                    if (vehicles[j].drive_name !== null)
                    {
                        drive = vehicles[j].drive_name + ' ' + vehicles[j].drive_last_name;
                    }

                    /**
                     * Si tiene ticket asignado
                     *
                     */
                    let t_m_tp_ji_ticket_code = 'S/I';
                    let t_m_tp_sj_a_postal_code = 'S/I';
                    let t_m_tp_ji_t_m_tp_ji_ticket_qty = 'S/I';

                    if (typeof idVehicle !== "undefined")
                    {
                        const ticket = vehicles[j].ticket;

                        /**
                         * Se valida que el objeto de ticket exista.
                         */
                        if (typeof ticket !== "undefined")
                        {
                            for (let z = 0; z < ticket.length; z++)
                            {
                                /**console.log('BUSQUEDA POR OBJETO VEHICLES -> TICKET...');//isDebugInfo
                                 console.log("TICKET CODE _> " + ticket[z].t_m_tp_ji_ticket_code);//isDebugInfo
                                 console.log("POSTAL CODE _> " + ticket[z].t_m_tp_sj_a_postal_code);//isDebugInfo
                                 console.log("MTS3        _> " + ticket[z].t_m_tp_ji_t_m_tp_ji_ticket_qty);//isDebugInfo
                                 */

                                t_m_tp_ji_ticket_code = ticket[z].t_m_tp_ji_ticket_code;
                                t_m_tp_sj_a_postal_code = ticket[z].t_m_tp_sj_a_postal_code;
                                t_m_tp_ji_t_m_tp_ji_ticket_qty = ticket[z].t_m_tp_ji_t_m_tp_ji_ticket_qty;
                            }
                        }
                        else
                        {
                            /**
                             * Sino se busca la información directamente en el arreglo de vehiculos.
                             */
                            /**console.log('BUSQUEDA DE TICKET POR ARREGLO VEHICLES...');//isDebugInfo
                             console.log("TICKET CODE _> " + vehicles[j].t_m_tp_ji_ticket_code);//isDebugInfo
                             console.log("POSTAL CODE _> " + vehicles[j].t_m_tp_sj_a_postal_code);//isDebugInfo
                             console.log("MTS3        _> " + vehicles[j].t_m_tp_ji_t_m_tp_ji_ticket_qty);//isDebugInfo
                             */

                            t_m_tp_ji_ticket_code = vehicles[j].t_m_tp_ji_ticket_code;
                            t_m_tp_sj_a_postal_code = vehicles[j].t_m_tp_sj_a_postal_code;
                            t_m_tp_ji_t_m_tp_ji_ticket_qty = vehicles[j].t_m_tp_ji_t_m_tp_ji_ticket_qty;
                        }
                    }

                    /**
                     * LINEA # 5 (esta seccion aparece al seleccionar checkbox seguir)
                     * */

                    html += '<div class="row">';
                    html += '<div class="col-12">';
                    html += '<div class="center" id="view_vehicle_info_' + idVehicle + '" style="display:none;">';
                    html += '<table class="table vehicle_info_ticket" style="margin-bottom: 0px;">';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">OB:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_postal_code_' + idVehicle + '">' + t_m_tp_sj_a_postal_code + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">TC:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_ticket_code_' + idVehicle + '">' + t_m_tp_ji_ticket_code + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">M³:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_ticket_qty_' + idVehicle + '">' + t_m_tp_ji_t_m_tp_ji_ticket_qty + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">Conductor:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_drive_name_' + idVehicle + '">' + drive + '</td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';

                    let state = '';
                    if (vehicles[j].state === null || vehicles[j].state <= 4)
                    {
                        state = '<img src="' + vehicles[j].icon_side + '" style="width: 70px;"/>';

                    }
                    else
                    {
                        state = '<img src="/images/bsa/mixer_lado_blue.png" style="width: 70px; display: none;"/>';
                    }

                    let state2 = '';
                    if (vehicles[j].state === 5)
                    {
                        state2 = '<img src="/images/bsa/mixer_lado_blue.png" style="width: 70px;"/>';
                    }
                    else
                    {
                        state2 = '<img src="/images/bsa/mixer_lado_blue.png" style="width: 70px; display: none;"/>';
                    }

                    let state3 = '';
                    if (vehicles[j].state >= 8 && vehicles[j].state <= 9)
                    {
                        state3 = '<img src="/images/bsa/mixer_lado_red.png" style="width: 70px;"/>';
                    }
                    else
                    {
                        state3 = '<img src="/images/bsa/mixer_lado_red.png" style="width: 70px; display: none;"/>';
                    }

                    let state4 = '';
                    if (vehicles[j].state === 12)
                    {
                        state4 = '<img src="/images/bsa/mixer_lado_green.png" style="width: 70px;"/>';
                    }
                    else
                    {
                        state4 = '<img src="/images/bsa/mixer_lado_green.png" style="width: 70px; display: none;"/>';
                    }

                    let esfera = '';
                    if (vehicles[j].state >= 4)
                    {
                        esfera = '<div class="circulo_success" style="width: 30px;">AO</div>';
                    }
                    else
                    {
                        esfera = '<div class="circulo" style="width: 30px;">AO</div>';
                    }

                    let esfera2 = '';
                    if (vehicles[j].state >= 5)
                    {
                        esfera2 = '<div class="circulo_success" style="width: 30px;">EO</div>';
                    }
                    else
                    {
                        esfera2 = '<div class="circulo" style="width: 30px;">EO</div>';
                    }

                    let esfera3 = '';
                    if (vehicles[j].state >= 8)
                    {
                        esfera3 = '<div class="circulo_success" style="width: 30px;">DE</div>';
                    }
                    else
                    {
                        esfera3 = '<div class="circulo" style="width: 30px;">DE</div>';
                    }

                    let esfera4 = '';
                    if (vehicles[j].state >= 12)
                    {
                        esfera4 = '<div class="circulo_success" style="width: 30px;">AP</div>';
                    }
                    else
                    {
                        esfera4 = '<div class="circulo" style="width: 30px;">AP</div>';
                    }

                    /**
                     * LINEA # 5
                     * */

                    html += '<div class="row">';
                    html += '<div class="col-12 vehicle_ticket_state" id="vehicle_ticket_state_' + idVehicle + '">';
                    html += '<table class="table vehicle_bubble">';
                    html += '<tr>';
                    html += '<td class="col-3" align="center">' + state + '</td>';
                    html += '<td class="col-3" align="center">' + state2 + '</td>';
                    html += '<td class="col-3" align="center">' + state3 + '</td>';
                    html += '<td class="col-3" align="center">' + state4 + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td class="col-3" align="center">' + esfera + '</td>';
                    html += '<td class="col-3" align="center">' + esfera2 + '</td>';
                    html += '<td class="col-3" align="center">' + esfera3 + '</td>';
                    html += '<td class="col-3" align="center">' + esfera4 + '</td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '</div>';
                    html += '</div>';

                    html += '</div>';
                }
            }
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
        document.getElementById('accordionPlantsVehiclesRent').innerHTML = html;
    };

    _this.searchVehicle = function (vehicle)
    {
        let mixer = document.getElementById("basicInputRent").value;
        
        if (isDebugInfo) {
            console.log("TEST......" + mixer);//isDebugInfo
        }

        let api = null;

        if ((typeof mixer === "undefined") || (mixer === null) || (mixer === ''))
        {
            api = api_url_new + '/web/vehicle/all/' + user.id + '/getall';
            // http://localhost:3002/web/vehicle/all/2/getall
        }
        else
        {
            api = api_url_new + '/web/vehicle/all/' + user.id + "/searchrents/" + mixer;
            // http://localhost:3002/web/vehicle/all/2/search/9001
        }

        if (isDebugInfo) {
            console.log("DATA SELECCIONADA _> " + api);//isDebugInfo
        }
        
        /**
         * Se consulta API
         *
         * */
        axios.get(api)
             .then((response) =>
                   {
                       let data = response.data.data;
                       _this.updateHtmlVehicle(data);
                   }).catch(function (error)
                   {
                                console.error('VEHICLE | vehicle_all | ERROR _> ' + error);
                            });
    };
}


/**
 * Libreria para manipulación de vehiculos Graneleros en el sistema
 */
function VehicleBulk()
{
    let _this = this;

    // var on_focus_vehicle_bulk;

    // var selected_vehicle_bulk = null;

    _this.show = function (id)
    {
        try
        {
            if (typeof vehicles_bulks_markers[id] !== 'undefined')
            {
                ///
                /// Mostramos el camión en el mapa
                ///
                vehicle_bulk_marker_cluster.addLayer(vehicles_bulks_markers[id]);
                ///
                /// Mostramos sus ultimos puntos en el mapa
                ///
                _this.showRoute(id);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.error('VEHICLE | show | No existe el vehiculo ID _> ' + id);
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | show | ERROR _> ' + e)
            }
        }
    };

    _this.delete = function (id)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE | delete | Eliminando _> ' + id);//isDebugInfo
            }

            if (typeof vehiclesBulks[id] !== 'undefined')
            {
                ///
                /// Eliminamos el camion del mapa
                ///
                vehicle_bulk_marker_cluster.removeLayer(vehicles_bulks_markers[id])

                if (typeof vehicles_bulks_markers[id] !== "undefined")
                {
                    ///delete vehicles_bulks_markers[id]
                }
                ///
                /// Eliminamos sus ultimos puntos del camión en el mapa
                ///
                _this.hiddenRoute(id);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('VEHICLE | delete | No existe la vehicles ' + id);//isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | delete | ERROR _> ' + e)
            }
        }
    };

    _this.add = function (vehicle)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE | add | ID _> ' + vehicle.id);//isDebugInfo
            }

            let icon = null;
            let course = 0;
            let width = 50;
            let height = 81;
            let position = new L.LatLng(vehicle.latitude, vehicle.longitude);
            let html = '';

            let ruta = url_2 + '/images/bsa/mixer_bulk_map.png';

            if (isDebugInfo){
            console.log(ruta);//isDebugInfo
            }
            
            if (user.group_id == 69)
            {
                icon = '<img src="' + ruta + '" style="width: 20px;"/>';
            }
            else
            {
                icon = '<img src="' + ruta + '" style="width: 20px;"/>';
            }

            course = vehicle.course;

            html += '<span class="name"><i>' + vehicle.name + ' (' + (vehicle.speed || '0') + ' km)' + '</i></span><br/>';
            html += icon;

            let iconAnchor = [(width / 2), (height / 2)];

            let divIcon = L.divIcon({
                html: html,
                className: 'leaf-device-marker',
                iconSize: [width, height],
                iconAnchor: iconAnchor,
                popupAnchor: [0, 0 - height]
            });

            /* Limpieza de variable y reemplazo de contenido */
            vehiclesBulks[vehicle.id] = vehicle;

            /**
             *  Limpieza de variable
             */
            vehicles_bulks_markers[vehicle.id] = L.marker(position, {
                iconAngle: vehicle.course,
                icon: divIcon,
                title: vehicle.name || 'S/I'
            },).bindPopup('Sin información', {maxWidth: 500});

            _this.show(vehicle.id);

        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | ' + vehicle.id + ' | add | ERROR _> ' + e);
            }
        }
        return;
    };

    _this.showHiddenLabel = function ()
    {
        try
        {
            let vehicle_label = document.getElementById('vehicle_label').checked;
            if (vehicle_label)
            {
                /**
                 * Desocultamos los letrero de los camiones, y activamos la variable global
                 * para que mantenga el Desocultamos
                 */
                $('.leaf-device-marker .name').css('display', 'block');
                vehicles_placard = true;
            }
            else
            {
                /**
                 * Ocultamos los letrero de los camiones, y activamos la variable global
                 * para que mantenga el ocultamiento
                 */
                $('.leaf-device-marker .name').css('display', 'none');
                vehicles_placard = false;
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | showHiddenLabel | ERROR _> ' + e);
            }

        }
        return;
    };
    ///
    /// Funcion encargada de terminar el seguimiento del camión
    ///
    _this.tracingOff = function ()
    {
        clearAllpopUP();
        try
        {            
            on_focus_vehicle = '';
            on_focus_vehicle_bulk='';
            on_focus_vehicle_rent='';

            vehicles.forEach(function (vehicle, index) {
                _this.restoreSelectedVehicle(vehicle.name)
                    // let view_vehicle_id = document.getElementById('view_vehicle_' + vehicle.id)
                    // let view_vehicle_rent_id = document.getElementById('view_vehicle_rent_' + vehicle.id)
                    // let view_vehicle_bulk_id = document.getElementById('view_vehicle_bulk_' + vehicle.id)

                    // if (view_vehicle_id !== 'undefined' || view_vehicle_id !== null) {
                    //     view_vehicle_id.checked = false;
                    // }
                    // if (view_vehicle_rent_id !== 'undefined' || view_vehicle_rent_id !== null) {
                    //     view_vehicle_rent_id.checked = false;
                    // }
                    // if (view_vehicle_bulk_id !== 'undefined' || view_vehicle_bulk_id !== null) {
                    //     view_vehicle_bulk_id.checked = false;
                    // }
            });
            
            let isChecked = document.getElementById('tracing_off').checked;
            ///
            /// Validamos si lo acabamos de desmarcar, para volver a marcalo y siempre este en estado de marcado
            /// pasado 2 Seg, se vuelve a chequear solo
            ///
            if (!isChecked)
            {
                setTimeout(function ()
                {
                    document.getElementById('tracing_off').checked = true;
                }, 2000);

            }

            ///
            /// Desactivamos el focus de un camion por el focus de un mapa
            ///
            let bounds = [map.getCenter()];
            let option = {};
            option.maxZoom = map.getZoom();
            ///
            /// Verificamos si el Zoom esta al maximo en el mapa, si no
            /// se asignara que este al maximo, pero en la latitud y longitud dada por el vehiculo
            ///
            /*
             if (currentZoom < 12 || currentZoom > 12)
             {
             option.maxZoom = 12;
             }
             */
            map.fitBounds(bounds, option);
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Rents | tracingOff | ERROR _> ' + e);
            }
        }
        return;
    };

    _this.update = function (vehicle)
    {
        try
        {
            let icon = null;
            let course = 0;
            let width = 50;
            let height = 81;
            let position = new L.LatLng(vehicle.latitude, vehicle.longitude);
            let html = '';
            //let color = _this.getStatusColor();

            let ruta = url_2 + '/images/bsa/mixer_bulk_map.png';

            if (isDebugInfo){
            console.log(ruta);//isDebugInfo
            }
            
            if (user.group_id == 69)
            {
                icon = '<img src="' + ruta + '" style="width: 20px;"/>';
            }
            else
            {
                icon = '<img src="' + ruta + '" style="width: 20px;"/>';
            }

            course = vehicle.course;


            let iconAnchor = [(width / 2), (height / 2)];

            let divIcon;
            if (vehicles_placard == false)
            {
                /**
                 * Si el ocultamos de placa esta activado
                 */
                if (isTimerVehicle)
                {
                    html += '<span class="name" style="display: none;"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
                }
                else
                {
                    html += '<span class="name" style="display: none;"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
                }
                html += icon;
            }
            else
            {
                /**
                 * Si el ocultamos de placa no esta activado
                 */
                html += '<span class="name" style="display: block;"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
                html += icon;
            }

            divIcon = L.divIcon({
                html: html,
                className: 'leaf-device-marker',
                iconSize: [width, height],
                iconAnchor: iconAnchor,
                popupAnchor: [0, 0 - height]
            });


            let text = '<table>';
            text += '<tr><td><strong>Fecha GPS:</strong></td><td> ' + ((vehicle.device_time_local != null) ? vehicle.device_time_local : " Sin información") + '</td></tr>';
            text += '<tr><td><strong>Patente:</strong></td><td> ' + ((vehicle.lic_num != null) ? vehicle.lic_num : "Sin información") + '</td></tr>';
            text += '</table>';

            let popup = L.popup()
                .setContent(text);
            
            if(typeof vehicles_bulks_markers[vehicle.id] !== "undefined" && vehicles_bulks_markers[vehicle.id] !== null)
            {
                vehicles_bulks_markers[vehicle.id].bindPopup(popup, {maxWidth: 500}).setIcon(divIcon).setIconAngle(course);
            }

            ///
            /// Si el vehiculo a procesar es igual al seleccionado para el focus, se activa
            /// el centrado de seguimiento
            ///
            if (on_focus_vehicle_bulk == vehicle.id)
            {
                if (isDebugInfo)
                {
                    console.log('VEHICLE Bulks | update | SEGUIMIENTO ACTIVO _> ' + vehicle.id);//isDebugInfo
                }
                ///
                /// Efecto de movimiento de camiones
                ///
                if (isTruckMoveEffect)
                {
                    if(typeof vehicles_bulks_markers[vehicle.id] !== "undefined" && vehicles_bulks_markers[vehicle.id] !== null)
                    {
                        vehicles_bulks_markers[vehicle.id].slideTo(position, {duration: 3000, keepAtCenter: true});
                    }
                }
                else
                {
                    /**
                     El camion tiene el focus activado, debe centrar el mapa luego de actualizar la geoposicion
                     */

                    if(typeof vehicles_bulks_markers[vehicle.id] !== "undefined" && vehicles_bulks_markers[vehicle.id] !== null)
                    {
                        vehicles_bulks_markers[vehicle.id].setLatLng(position);
                        let latLng = vehicles_bulks_markers[vehicle.id].getLatLng();
                        let bounds = [latLng];
                        let option = {};
    
                        currentZoom = map.getZoom();
                        option.maxZoom = map.getZoom();
                        map.fitBounds(bounds, option);
                    }
                }
            }
            else
            {
                ///
                /// Efecto de movimiento de camiones
                ///
                if (isTruckMoveEffect)
                {
                    if(typeof vehicles_bulks_markers[vehicle.id] !== "undefined" && vehicles_bulks_markers[vehicle.id] !== null)
                    {
                        vehicles_bulks_markers[vehicle.id].slideTo(position, {duration: 3000});
                    }
                }
                else
                {
                    if(typeof vehicles_bulks_markers[vehicle.id] !== "undefined" && vehicles_bulks_markers[vehicle.id] !== null)
                    {
                        vehicles_bulks_markers[vehicle.id].setLatLng(position);
                    }
                }

            }
            try
            {
                let rpm = vehicle.rpm;
                let horometer = vehicle.horometer;
                let odometer = vehicle.odometer;

                if (rpm == null || rpm == '')
                {
                    rpm = 'S/I' + " Rpm";
                }
                else
                {
                    rpm = conComas(rpm) + " Rpm"
                }

                if (horometer == null || horometer == '')
                {
                    horometer = 'S/I' + " Hrs";
                }
                else
                {
                    horometer = conComas(horometer) + " Hrs";
                }

                if (odometer == null || odometer == '')
                {
                    odometer = 'S/I' + " Km";
                }
                else
                {
                    odometer = odometerKm(odometer) + " Km"
                }
                if(typeof document.getElementById('vehicle_bulk_rpm_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_bulk_rpm_' + vehicle.id) !== null)
                {
                    document.getElementById('vehicle_bulk_rpm_' + vehicle.id).innerHTML = rpm;
                }
                if(typeof document.getElementById('vehicle_bulk_odometer_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_bulk_odometer_' + vehicle.id) !== null)
                {
                    document.getElementById('vehicle_bulk_odometer_' + vehicle.id).innerHTML = odometer;
                }
                /**document.getElementById('vehicle_bulk_horometer_' + vehicle.id).innerHTML = horometer;*/

                _this.changeSpeed(vehicle);
                _this.changeDateLocal(vehicle);
            }
            catch (ex)
            {
                console.error(ex)
            }

            if (selected_vehicle_bulk == vehicle.id)
            {
                _this.paintSelectedVehicle(vehicle.name, vehicle.id);
            }

        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Bulks | update | ERROR _> ' + e);
            }
        }
        return;
    };

    _this.getMapPadding = function ()
    {
        var _offset = 10,
            _left = _offset,
            _bottom = _offset,
            $sidebar = $('#sidebar'),
            $bottombar = $('#bottombar');

        if ($sidebar.length)
        {
            _left += $sidebar.width() + $sidebar.offset().left;
        }

        if ($bottombar.length)
        {
            _bottom += $bottombar.height();
        }

        return {
            paddingTopLeft: [_left, _offset],
            paddingBottomRight: [_offset, _bottom],
        };
    };

    _this.fitBounds = function (currentZoom)
    {
        var _bounds = [];

        _bounds = [_item.getLatLng()];

        if (_bounds.length)
        {
            var _option = _this.getMapPadding();


            if (currentZoom && typeof currentZoom === 'boolean')
            {
                currentZoom = map.getZoom();
            }
            if (currentZoom && map.getBoundsZoom(_bounds) > currentZoom)
            {
                _option.maxZoom = currentZoom;
            }
            if (!currentZoom)
            {
                _option.maxZoom = 17;
            }
            map.fitBounds(_bounds, _option);
        }
        return;
    };
    ///
    /// Iniciamos Cluster que contendra el total de vehiculos visible en el mapa
    ///
    _this.clusterInit = function ()
    {
        if (isDebugInfo)
        {
            console.log('VEHICLE Bulks | clusterInit | Iniciando el cluster de vehiculos... ');//isDebugInfo
        }
        try
        {
            vehicle_bulk_marker_cluster = L.markerClusterGroup(
                {
                    disableClusteringAtZoom: 17,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false,
                    removeOutsideVisibleBounds: true,
                    iconCreateFunction: function (cluster)
                    {
                        let count = cluster.getChildCount(),
                            c = 'cluster-',
                            radius = 58;

                        if (count < 5)
                        {
                            c += 'small';
                        }
                        else if (count < 10)
                        {
                            c += 'medium';
                        }
                        else
                        {
                            c += 'large';
                        }

                        return L.divIcon({
                            html: '<div class="cluster-inner"><b>' + count + '</b></div>',
                            className: 'cluster ' + c,
                            iconSize: [radius, radius],
                            iconAnchor: [radius / 2, radius / 2]
                        });
                    }
                });
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Bulks | clusterInit | ERROR _> ' + e)
            }
        }
        return;
    };

    _this.socket = function ()
    {
        if (isDebugInfo)
        {
            console.log('VEHICLE Bulks | SOCKET | iniciando funcion socket');//isDebugInfo
        }
        try
        {
            plants.forEach(function (data, index)
            {
                data.plants.forEach(function (pit, index)
                {
                    if (isDebugInfo)
                    {
                        console.log('VEHICLE Bulks | WEBSOCKET | CHANNEL | vehicle-position_' + pit.id + ' | OK');//isDebugInfo
                    }

                    Echo.channel('POL_PROD_MOVE_vehicle-position_' + pit.id).listen('VehiclePositionEvent', (e) =>
                        {
                            let vehicle = e.message;
                            if (typeof vehiclesBulks[vehicle.id] !== 'undefined')
                            {
                                if (isDebugInfo)
                                {
                                    ///console.log('VEHICLE NAME: ' + vehicle.name + ' | ID: ' + vehicle.id);
                                }
                                ///
                                /// Enviamos el vehiculo a actualización
                                ///
                                _this.update(vehicle);
                            }
                            else
                            {
                                ///console.log('VEHICLE ID: ' + vehicle.id + ' | no existe');
                            }
                        },
                    );
                });
            });
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Bulks | ERROR _> ' + e)
            }
        }
        return;
    };

    _this.ajax = function ()
    {
        if (isDebugInfo)
        {
            console.log('VEHICLE Bulks | AJAX | iniciando funcion ajax');//isDebugInfo
        }
        try
        {

            setInterval(function ()
            {
                ///
                /// Ajax Vehicles Update
                ///
                axios.get(api_url + '/vehicles-bulks/' + user.id)
                    .then((response) =>
                    {
                        context.commit('plantsVehiclesBulks', response.data.data);
                    }).catch(function (error)
                {
                    if (isDebugCatch)
                    {
                        console.error('VUEJS | AJAX | ERROR _> ' + error);
                    }

                });
            }, 5000);


        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Bulks | ERROR _> ' + e)
            }
        }
        return;
    };

    _this.viewVehicleMap = function (id)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE Bulks | viewVehicle | ID _> ' + id);//isDebugInfo
            }


            if (typeof vehicles_bulks_markers[id] !== 'undefined')
            {
                let vehicle = vehicles_bulks_markers[id];
                let isChecked = document.getElementById('view_vehicle_bulk_' + id).checked;

                

                document.getElementById('view_vehicle_bulk_' + id).checked = true;
                /**document.getElementById('view_vehicle_bulk_info_' + id).style.display = 'block';*/

                ///
                /// Asignamos el focus al camión ya que fue pinchado
                ///
                on_focus_vehicle_bulk = id;


                let latLng = vehicles_bulks_markers[id].getLatLng();
                let bounds = [latLng];
                let option = {};

                currentZoom = map.getZoom();
                ///
                /// Verificamos si el Zoom esta al maximo en el mapa, si no
                /// se asignara que este al maximo, pero en la latitud y longitud dada por el vehiculo
                ///
                if (currentZoom < 17 || currentZoom > 17)
                {
                    option.maxZoom = 17;
                }
                else
                {
                    option.maxZoom = 17;
                }

                map.fitBounds(bounds, option);
                _this.paintSelectedVehicle(vehicle.options.title, id);
            }

        }
        catch
            (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Bulks | viewVehicle | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.showHiddenAllRoutes = function ()
    {
        try
        {
            let show_hidden_all_routers = document.getElementById('show_hidden_all_routers');
            if (show_hidden_all_routers.checked)
            {
                _this.showRoutes();
            }
            else
            {

                _this.hiddenRoutes();
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Bulks | showHiddenAllRoutes | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.hiddenRoutes = function ()
    {
        try
        {
            vehicles_bulks_tail.forEach(function (valor, id)
                {
                    _this.hiddenRoute(id);
                }
            );
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Bulks | HIDDENROUTES | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.showRoutes = function ()
    {
        try
        {
            vehicles_bulks_tail.forEach(function (valor, id)
                {
                    _this.showRoute(id);
                }
            );
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE Bulks | SHOWROUTES | ERROR _> ' + e);
            }
        }
        return;
    };
    _this.hiddenRoute = function (id)
    {
        if (typeof vehicles_bulks_tail[id] !== 'undefined')
        {
            map.removeLayer(vehicles_bulks_tail[id]);
        }
        else
        {
            if (isDebugInfo)
            {
                console.error('VEHICLE Bulks | HIDDENROUTE | no existe el ID _> ' + id);
            }
        }
        return;
    };
    _this.showRoute = function (id)
    {
        if (typeof vehicles_bulks_tail[id] !== 'undefined')
        {
            map.addLayer(vehicles_bulks_tail[id]);
        }
        else
        {
            if (isDebugInfo)
            {
                console.error('VEHICLE Bulks | SHOWROUTE | no existe el ID _> ' + id);
            }
        }
        return;
    };

    _this.changeTypeMovementVehicle = function ()
    {
        ///
        /// Hacemos la inversion del tipo de dato que habia
        /// TRUE x FALSE
        /// FALSE x TRUE
        ///
        isTruckMoveEffect = !isTruckMoveEffect;

        ///
        /// Actualizamos el valor del camion en el Local Storage y la variable Global
        ///
        change_type_movement_vehicle = !isTruckMoveEffect;
        ls.setItem("changeTypeMovementVehicle", !isTruckMoveEffect);
    };

    _this.view = function (id)
    {
        /**
         * Tomamos el valor de check para revisar si esta true o false
         */
        let isChecked = document.getElementById('view_vehicle_bulk_' + id).checked;
        if (isChecked)
        {
            try {
                document.getElementById('leave-follow').style.display = 'block';
            } catch (error) {
                if (isDebugCatch)
                {
                console.log("error find in DOM id:'leave-follow' error: " + e);
                }
            }
            //borrar todos los demas check del front
            clearAllSelectedVehicle();
            /**
             * Agregamos al camión al listado
             */
            document.getElementById('view_vehicle_bulk_' + id).checked = true;
            _this.tracingOff();
            _this.viewVehicleMap(id);
        }
        else
        {
            try {
                document.getElementById('leave-follow').style.display = 'none';
            } catch (error) {
                if (isDebugCatch)
                {
                console.log("error find in DOM id:'leave-follow' error: " + e);
                }
            }
            /**
             * Eliminamos al camión del listado
             */
            document.getElementById('view_vehicle_bulk_' + id).checked = false;
            _this.tracingOff();
        }
    };

    _this.paintSelectedVehicle = function (vehicle, id)
    {
        let searchedSelector = '[title="' + vehicle + '"]';
        try
        {

            let infoVehicule = document.querySelector(searchedSelector);
            if (infoVehicule != null)
            {
                selected_vehicle_bulk = id;
                infoVehicule.style.zIndex = 999;
                infoVehicule.children[0].children[0].style.background = "#ffc000";
                infoVehicule.style.color = "#000";
            }
        }
        catch (e)
        {
            if (isDebugCatch) {
                console.log("error find in DOM " + vehicle + " error: " + e);//isDebugCatch
            }
        }
        ;
    };

    // restore vehicle top panel blue with white letter
    _this.restoreSelectedVehicle = function (vehicle)
    {

        let searchedSelector = '[title="' + vehicle + '"]';
        try
        {
            let infoVehicule = document.querySelector(searchedSelector);
            if (infoVehicule != null)
            {
                selected_vehicle = null;
                selected_vehicle_bulk = null;
                selected_vehicle_rent = null;


                infoVehicule.style.zIndex = 0;
                infoVehicule.children[0].children[0].style.background = "#161246";
                infoVehicule.style.color = "#b4b7bd";
            }
        }
        catch (e)
        {
            if (isDebugCatch) {
                console.log("error find in DOM " + vehicle + " error: " + e);//isDebugCatch
            }
        }
        ;
    };

    _this.changeSpeed = function (vehicle)
    {

        let html = '';

        if (vehicle.speed == 0)
        {
            html += '<ul class="semaforo rojo">\n' +
                '            <li></li>\n' +
                '        </ul>';

        }
        else if (vehicle.speed > 0)
        {
            html += '<ul class="semaforo verde">\n' +
                '            <li></li>\n' +
                '        </ul>';
        }

        html += vehicle.speed + ' Km/h';

        if(typeof document.getElementById('vehicle_bulk_speed_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_bulk_speed_' + vehicle.id) !== null)
        {
            document.getElementById('vehicle_bulk_speed_' + vehicle.id).innerHTML = html;
        }

    };

    _this.changeDateLocal = function (vehicle)
    {

        let html = '';

        html += vehicle.device_time_local + ' ';

        html += '\n<img src="/images/bsa/mixer_bulk_panel.png" style="width: 70px;"/>';

        if(typeof document.getElementById('vehicle_bulk_time_local_' + vehicle.id) !== "undefined" && document.getElementById('vehicle_bulk_time_local_' + vehicle.id) !== null)
        {
            document.getElementById('vehicle_bulk_time_local_' + vehicle.id).innerHTML = html;
        }

    };

    _this.reload = function ()
    {
        setInterval(function ()
        {
            /**
             * Ajax Vehicles Update
             */
            axios
                .get(api_url + "/vehicles-bulks/" + user.id)
                .then((response) =>
                {
                    if (typeof response.data.data !== "undefined")
                    {
                        let plants_vehicles = response.data.data;

                        for (let i = 0; i < plants_vehicles.length; i++)
                        {
                            if (typeof plants_vehicles[i].vehicles !== "undefined")
                            {
                                let vehiclesBulksAjax = plants_vehicles[i].vehicles;

                                for (let j = 0; j < vehiclesBulksAjax.length; j++)
                                {
                                    /**
                                     * Agregamnos el ID de la planta para poder usarlo en la actualización del storage en VUEX
                                     */
                                    vehiclesBulksAjax[j].plants_id = plants_vehicles[i].id;
                                    vehiclesBulks[vehiclesBulksAjax[j].id] = vehiclesBulksAjax[j];
                                    aztrack.vehicleBulk.update(vehiclesBulks[vehiclesBulksAjax[j].id]);
                                    /**
                                     * Se verifíca si el checkbox de seguir vehículo está seleccionado para ir actualizando la vista del mapa acorde a su desplazamiento
                                     */
                                    let vehicle_id = vehiclesBulks[vehiclesBulksAjax[j].id].id;
                                    let view_vehicle = document.getElementById('view_vehicle_bulk_'+vehicle_id);
                                    view_vehicle?.checked && aztrack.vehicle.view(vehicle_id);
                                }
                            }
                        }
                    }
                })
                .catch(function (error)
                {
                    if (isDebugCatch)
                    {
                        console.error("AJAX | ERROR _> " + error);
                    }
                });
        }, ajax_timer);

    };


    _this.showHiddenAll = function ()
    {
        /**
         * Tomamos el valor de check para revisar si esta On o Off
         */
        let isChecked = document.getElementById('vehicles_all_Bulk').checked;

        if (isChecked)
        {
            vehiclesView = true;
            this.vehiclesView = true;
            ls.setItem("vehiclesView", true);
        }
        else
        {
            vehiclesView = false;
            this.vehiclesView = false;
            ls.setItem("vehiclesView", false);
        }

        vehiclesBulks.forEach(function (vehicle, id)
                         {
                             try
                             {
                                 if (isChecked)
                                 {
                                     /**
                                      * Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                                      * @type {boolean}
                                      */
                                     document.getElementById('vehicle_' + vehicle.id).checked = true;
                                     /**
                                      * Enviamos el vehiculo para que se vuelva a hacer visible en la pantalla del mapa.
                                      */
                                     _this.show(vehicle.id);
                                 }
                                 else
                                 {
                                     /**
                                      * Marcamos el checkbox desactivado del vehiculo para no mostrar
                                      * @type {boolean}
                                      */
                                     document.getElementById('vehicle_' + vehicle.id).checked = false;
                                     /**
                                      * Enviamos el vehiculo para que se desmarque de la pantalla del mapa.
                                      */
                                     _this.delete(vehicle.id);
                                 }
                             }
                             catch (e)
                             {
                                 if (isDebugCatch)
                                 {
                                     console.error('VUE | vehicle | all | showHiddenAll | Error: ' + e);
                                 }
                             }
                         });

    };

    _this.updateHtmlVehicle = function (data)
    {
        /**
         * Pintar html
         *
         * */
        /**console.log("Controller | Vehicle | cantidad de bocas _> " + data.length);*/
        let html = '';

        for (let i = 0; i < data.length; i++)
        {
            let id_plant = data[i].id;
            /**console.log("BOCA _> " + data[i].plant_code);*/
            html += '<div class="card" id="plant_' + id_plant + '">';
            html += '<div class="card-header collapse show" id="plant_collapse_' + id_plant + '" data-toggle="collapse" role="button" data-target="#plant_collapse_' + id_plant + '" aria-expanded="false" aria-controls="plant_collapse_' + id_plant + '">';
            html += '<span class="lead collapse-title">';
            html += data[i].plant_code + ' | ' + data[i].name + ' - (' + data[i].vehicles.length + ')';
            html += '</span>';
            html += '</div>';

            html += '<div id="plant_collapse_' + id_plant + '" class="collapse show" aria-labelledby="plant_collapse_' + id_plant + '" data-parent="#accordionPlantsVehiclesBulk">';
            html += '<div class="card-body">';

            if (typeof data[i].vehicles !== "undefined")
            {
                let vehicles = data[i].vehicles;
                /**console.log("NUMERO DE VEHICULOS ASOCIADOS A LA BOCA _> " + vehicles.length);*/

                /** document.getElementById('plant_collapse_' + data[i].id).innerHTML = data[i].plant_code + ' | '+ data[i].name + ' - ' + '(' + vehicles.length + ')';*/

                for (let j = 0; j < vehicles.length; j++)
                {
                    let k = j + 1;
                    let idVehicle = vehicles[j].id;
                    let operator = 'S/I';
                    let odometer = 'S/I';
                    let horometer = 'S/I';
                    let rpm = 'S/I';

                    if (isDebugInfo) {
                        console.log(" ITEM _> " + j);//isDebugInfo
                        console.log("VEHICLE _> " + vehicles[j].name);//isDebugInfo
                    }

                    html += '<div id="plant_vehicle_' + idVehicle + '">';
                    /**
                     * LINEA # 1 Item - Nombre del mixer
                     * */
                    html += '<div class="divider divider-success">';
                    html += '<div class="divider-text">' + '(' + k + ')' + ' - ' + vehicles[j].name + '</div>';
                    html += '</div>';

                    /**
                     * LINEA # 2 Patente - Ver/Ocultar - Seguir
                     * */
                    html += '<div class="row vehicle-table-col">';
                    html += '<div class="col-4">';
                    html += '<div class="vehicle_lic_num" id="vehicle_lic_num_' + idVehicle + '">' + vehicles[j].lic_num + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="custom-control custom-switch custom-switch-success vehicle_lic_num">';
                    html += '<input type="checkbox" class="custom-control-input" id="vehicle_bulk_' + idVehicle + '" checked onclick="aztrack.vehicleBulk.showHidden(' + idVehicle + ')"/>';
                    html += '<label class="custom-control-label" for="vehicle_bulk_' + idVehicle + '">';
                    html += '<span class="switch-icon-left"><i data-feather="check"></i></span>';
                    html += '<span class="switch-icon-right"><i data-feather="x"></i></span>';
                    html += '</label>';
                    html += '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="custom-control custom-control-success custom-checkbox">';
                    html += '<input type="checkbox" name="checkBoxFollowVehicle" class="custom-control-input" id="view_vehicle_bulk_' + idVehicle + '" onclick="aztrack.vehicleBulk.view(' + idVehicle + ')">';
                    html += '<label class="custom-control-label" for="view_vehicle_bulk_' + idVehicle + '">Seguir</label>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';

                    /**
                     * Selecciona la compañia de telefono
                     */
                    if (vehicles[j].operator === 73001)
                    {
                        operator = '<img src="/images/icons/gprs/entel.png" style="width: 40px;"/>';
                    }
                    else if (vehicles[j].operator === 73002)
                    {
                        operator = '<img src="/images/icons/gprs/movistar.png" style="width: 40px;"/>';
                    }
                    else if (vehicles[j].operator === 73003)
                    {
                        operator = '<img src="/images/icons/gprs/claro.png" style="width: 40px;"/>';
                    }

                    rpm = vehicles[j].rpm;
                    if (rpm === null || rpm === '')
                    {
                        rpm = 'S/I';
                    }
                    else
                    {
                        rpm = conComas(rpm) + " RPM";
                    }

                    horometer = vehicles[j].horometer;
                    if (horometer === null || horometer === '')
                    {
                        horometer = 'S/I';
                    }
                    else
                    {
                        horometer = conComas(horometer) + " Hrs";
                    }

                    /**
                     * Se lleva a formato de 3 digitos el kilometraje
                     * */
                    odometer = vehicles[j].odometer;

                    if (odometer === null || odometer === '')
                    {
                        odometer = 'S/I';
                    }
                    else
                    {
                        odometer = odometerKm(odometer) + " Km";
                    }

                    /**
                     * LINEA # 3 Odometro - Rpm - Compañia de telefono
                     * */

                    html += '<div class="row vehicle-table-col">';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_odometer" id="vehicle_odometer_' + idVehicle + '">' + odometer + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_rpm" id="vehicle_rpm_' + idVehicle + '">' + rpm + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_operator" id="vehicle_operator_' + idVehicle + '">' + operator + '</div>';
                    html += '</div>';

                    html += '</div>';

                    let semaforo = '';
                    if (vehicles[j].speed === 0 && vehicles[j].ignition === FALSE)
                    {
                        semaforo = '<ul class="semaforo rojo"><li></li></ul>';
                    }
                    else if (vehicles[j].speed === 0 && vehicles[j].ignition === TRUE)
                    {
                        semaforo = '<ul class="semaforo amarillo"><li></li></ul>';
                    }
                    else if (vehicles[j].speed > 0)
                    {
                        semaforo = '<ul class="semaforo verde"><li></li></ul>';
                    }

                    let speed = vehicles[j].speed + ' Km/h';
                    let rssi = '';

                    if (vehicles[j].rssi === 0)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_0.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 1)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_1.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 2)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_2.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 3)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_3.png" style="width: 20px;"/>';
                    }
                    else if (vehicles[j].rssi === 4)
                    {
                        rssi = '<img src="/images/icons/gprs/signal_4.png" style="width: 20px;"/>';
                    }

                    /**
                     * LINEA # 4 Horometro - Velocidad - Nivel de señal
                     * */
                    html += '<div class="row vehicle-table-col">';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_horometer" id="vehicle_horometer_' + idVehicle + '">' + horometer + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_speed" id="vehicle_speed_' + idVehicle + '">' + semaforo + speed + '</div>';
                    html += '</div>';

                    html += '<div class="col-4">';
                    html += '<div class="vehicle_rssi" id="vehicle_rssi_' + idVehicle + '">' + rssi + '</div>';
                    html += '</div>';

                    html += '</div>';

                    let drive = 'S/I';
                    if (vehicles[j].drive_name !== null)
                    {
                        drive = vehicles[j].drive_name + ' ' + vehicles[j].drive_last_name;
                    }

                    /**
                     * Si tiene ticket asignado
                     *
                     */
                    let t_m_tp_ji_ticket_code = 'S/I';
                    let t_m_tp_sj_a_postal_code = 'S/I';
                    let t_m_tp_ji_t_m_tp_ji_ticket_qty = 'S/I';

                    if (typeof idVehicle !== "undefined")
                    {
                        const ticket = vehicles[j].ticket;

                        /**
                         * Se valida que el objeto de ticket exista.
                         */
                        if (typeof ticket !== "undefined")
                        {
                            for (let z = 0; z < ticket.length; z++)
                            {
                                /**console.log('BUSQUEDA POR OBJETO VEHICLES -> TICKET...');//isDebugInfo
                                 console.log("TICKET CODE _> " + ticket[z].t_m_tp_ji_ticket_code);//isDebugInfo
                                 console.log("POSTAL CODE _> " + ticket[z].t_m_tp_sj_a_postal_code);//isDebugInfo
                                 console.log("MTS3        _> " + ticket[z].t_m_tp_ji_t_m_tp_ji_ticket_qty);//isDebugInfo
                                 */

                                t_m_tp_ji_ticket_code = ticket[z].t_m_tp_ji_ticket_code;
                                t_m_tp_sj_a_postal_code = ticket[z].t_m_tp_sj_a_postal_code;
                                t_m_tp_ji_t_m_tp_ji_ticket_qty = ticket[z].t_m_tp_ji_t_m_tp_ji_ticket_qty;
                            }
                        }
                        else
                        {
                            /**
                             * Sino se busca la información directamente en el arreglo de vehiculos.
                             */
                            /**console.log('BUSQUEDA DE TICKET POR ARREGLO VEHICLES...');//isDebugInfo
                             console.log("TICKET CODE _> " + vehicles[j].t_m_tp_ji_ticket_code);//isDebugInfo
                             console.log("POSTAL CODE _> " + vehicles[j].t_m_tp_sj_a_postal_code);//isDebugInfo
                             console.log("MTS3        _> " + vehicles[j].t_m_tp_ji_t_m_tp_ji_ticket_qty);//isDebugInfo
                             */

                            t_m_tp_ji_ticket_code = vehicles[j].t_m_tp_ji_ticket_code;
                            t_m_tp_sj_a_postal_code = vehicles[j].t_m_tp_sj_a_postal_code;
                            t_m_tp_ji_t_m_tp_ji_ticket_qty = vehicles[j].t_m_tp_ji_t_m_tp_ji_ticket_qty;
                        }
                    }

                    /**
                     * LINEA # 5 (esta seccion aparece al seleccionar checkbox seguir)
                     * */

                    html += '<div class="row">';
                    html += '<div class="col-12">';
                    html += '<div class="center" id="view_vehicle_info_' + idVehicle + '" style="display:none;">';
                    html += '<table class="table vehicle_info_ticket" style="margin-bottom: 0px;">';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">OB:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_postal_code_' + idVehicle + '">' + t_m_tp_sj_a_postal_code + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">TC:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_ticket_code_' + idVehicle + '">' + t_m_tp_ji_ticket_code + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">M³:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_ticket_qty_' + idVehicle + '">' + t_m_tp_ji_t_m_tp_ji_ticket_qty + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td style="padding:0px; border-top:0px;">Conductor:</td>';
                    html += '<td style="padding:0px; border-top:0px;" id="vehicle_drive_name_' + idVehicle + '">' + drive + '</td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';

                    let state = '';
                    if (vehicles[j].state === null || vehicles[j].state <= 4)
                    {
                        state = '<img src="' + vehicles[j].icon_side + '" style="width: 70px;"/>';

                    }
                    else
                    {
                        state = '<img src="/images/bsa/mixer_lado_blue.png" style="width: 70px; display: none;"/>';
                    }

                    let state2 = '';
                    if (vehicles[j].state === 5)
                    {
                        state2 = '<img src="/images/bsa/mixer_lado_blue.png" style="width: 70px;"/>';
                    }
                    else
                    {
                        state2 = '<img src="/images/bsa/mixer_lado_blue.png" style="width: 70px; display: none;"/>';
                    }

                    let state3 = '';
                    if (vehicles[j].state >= 8 && vehicles[j].state <= 9)
                    {
                        state3 = '<img src="/images/bsa/mixer_lado_red.png" style="width: 70px;"/>';
                    }
                    else
                    {
                        state3 = '<img src="/images/bsa/mixer_lado_red.png" style="width: 70px; display: none;"/>';
                    }

                    let state4 = '';
                    if (vehicles[j].state === 12)
                    {
                        state4 = '<img src="/images/bsa/mixer_lado_green.png" style="width: 70px;"/>';
                    }
                    else
                    {
                        state4 = '<img src="/images/bsa/mixer_lado_green.png" style="width: 70px; display: none;"/>';
                    }

                    let esfera = '';
                    if (vehicles[j].state >= 4)
                    {
                        esfera = '<div class="circulo_success" style="width: 30px;">AO</div>';
                    }
                    else
                    {
                        esfera = '<div class="circulo" style="width: 30px;">AO</div>';
                    }

                    let esfera2 = '';
                    if (vehicles[j].state >= 5)
                    {
                        esfera2 = '<div class="circulo_success" style="width: 30px;">EO</div>';
                    }
                    else
                    {
                        esfera2 = '<div class="circulo" style="width: 30px;">EO</div>';
                    }

                    let esfera3 = '';
                    if (vehicles[j].state >= 8)
                    {
                        esfera3 = '<div class="circulo_success" style="width: 30px;">DE</div>';
                    }
                    else
                    {
                        esfera3 = '<div class="circulo" style="width: 30px;">DE</div>';
                    }

                    let esfera4 = '';
                    if (vehicles[j].state >= 12)
                    {
                        esfera4 = '<div class="circulo_success" style="width: 30px;">AP</div>';
                    }
                    else
                    {
                        esfera4 = '<div class="circulo" style="width: 30px;">AP</div>';
                    }

                    /**
                     * LINEA # 5
                     * */

                    html += '<div class="row">';
                    html += '<div class="col-12 vehicle_ticket_state" id="vehicle_ticket_state_' + idVehicle + '">';
                    html += '<table class="table vehicle_bubble">';
                    html += '<tr>';
                    html += '<td class="col-3" align="center">' + state + '</td>';
                    html += '<td class="col-3" align="center">' + state2 + '</td>';
                    html += '<td class="col-3" align="center">' + state3 + '</td>';
                    html += '<td class="col-3" align="center">' + state4 + '</td>';
                    html += '</tr>';
                    html += '<tr>';
                    html += '<td class="col-3" align="center">' + esfera + '</td>';
                    html += '<td class="col-3" align="center">' + esfera2 + '</td>';
                    html += '<td class="col-3" align="center">' + esfera3 + '</td>';
                    html += '<td class="col-3" align="center">' + esfera4 + '</td>';
                    html += '</tr>';
                    html += '</table>';
                    html += '</div>';
                    html += '</div>';

                    html += '</div>';
                }
            }
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
        document.getElementById('accordionPlantsVehiclesBulk').innerHTML = html;
    };

    _this.searchVehicle = function (vehicle)
    {
        let mixer = document.getElementById("basicInputBulk").value;
        
        if (isDebugInfo) {
            console.log("TEST......" + mixer);//isDebugInfo
        }

        let api = null;

        if ((typeof mixer === "undefined") || (mixer === null) || (mixer === ''))
        {
            api = api_url_new + '/web/vehicle/all/' + user.id + '/getallbulks';
            // http://localhost:3002/web/vehicle/all/2/getall
        }
        else
        {
            api = api_url_new + '/web/vehicle/all/' + user.id + "/searchbulks/" + mixer;
            // http://localhost:3002/web/vehicle/all/2/search/9001
        }

        if (isDebugInfo) {
            console.log("DATA SELECCIONADA _> " + api);//isDebugInfo
        }
        
        /**
         * Se consulta API
         *
         * */
        axios.get(api)
             .then((response) =>
                   {
                       let data = response.data.data;
                       _this.updateHtmlVehicle(data);
                   }).catch(function (error)
                   {
                                console.error('VEHICLE | vehicle_all | ERROR _> ' + error);
                            });
    };

}


var on_focus_vehicle = '';
var selected_vehicle = null;

var on_focus_vehicle_bulk='';
var selected_vehicle_bulk = null;

var on_focus_vehicle_rent='';
var selected_vehicle_rent = null;

function clearAllpopUP(){
    let popUpInMap = document.getElementsByClassName('leaf-device-marker')
    for(let i=0;i<popUpInMap.length;i++){
        popUpInMap[i].style.zIndex = 0;
        popUpInMap[i].children[0].children[0].style.background = "#161246";
        popUpInMap[i].style.color = "#b4b7bd";
    }
}

function clearAllSelectedVehicle(){
    allFollowVehicleCheckbox = document.getElementsByName("checkBoxFollowVehicle")
    for(let i=0;i<allFollowVehicleCheckbox.length;i++){
        if(allFollowVehicleCheckbox[i] != null || allFollowVehicleCheckbox[i] != undefined){
            allFollowVehicleCheckbox[i].checked = false;
        }
    }
    
}
/**
 * Libreria para manipulación de poligono de plantas en el sistema
 */
function Plant()
{
    let _this = this;
    _this.add = function (plant)
    {
        if (isDebugInfo)
        {
            console.log(plant); //isDebugInfo
            ///console.log('PLANT | add | ID _> ' + plant.id);
        }
        try
        {
            if ((typeof plant.id !== 'undefined') && !isEmpty(plant.id))
            {
                ///
                /// transforma el texto del ajax en un array para que polygon funcione en letfleat
                /// si no se produce una excetion t is null ????!!!!!
                ///
                let position = [];
                let coordinate;

                if ((typeof plant.polygon === 'string') && plant.polygon != '')
                {
                    coordinate = JSON.parse(plant.polygon);
                }
                else
                {
                    coordinate = plant.polygon;
                }

                for (let i = 0; i < coordinate.length; i++)
                {
                    position.push([coordinate[i].lat, coordinate[i].lng]);
                }

                if (!isEmpty(coordinate))
                {

                    let plant_name = '';
                    plant.plants_codes.forEach(function (valor, index)
                                               {
                                                   plant_name += valor.plant_code;
                                                   if (plant.plants_codes.length > (index + 1))
                                                   {
                                                       plant_name += ' || ';
                                                   }
                                               });

                    plants[plant.id] = plant;

                    plants_geofences[plant.id] = L.polygon(position,
                                                           {
                                                               color: plant.polygon_color,
                                                               weight: 3,
                                                               opacity: 1,
                                                               fill: true,
                                                               fillOpacity: 0.3,
                                                               fillColor: plant.polygon_color_border,
                                                           }
                    ).addTo(map);

                    plants_geofences_description[plant.id] = new L.Marker(
                        null,
                        {
                            icon: L.divIcon({
                                                html: '<div class="name" style="background-color: ' + convertHex(plant.polygon_color_tag || plant.polygon_color, 81) + '">' + plant.name + '( ' + plant_name + ' ) ' + '</div>',
                                                className: 'leaflet-popup-geofence',
                                                iconSize: 'auto'
                                            })
                        }
                    ).setLatLng(plants_geofences[plant.id].getBounds().getCenter()).addTo(map);
                }
                else
                {
                    if (isDebugInfo)
                    {
                        console.log('PLANT | add | ID _> ' + plant.id + ' | coordinate es vacio o null'); //isDebugInfo
                    }
                }
            }
            else
            {
                console.error('PLANT | add | Planta sin geocerca ID _> ' + plant.id + ' Nombre _> ' + plant.name + ' plant_code _> ' + plant.plant_code);
            }
        }
        catch
            (e)
        {
            if (isDebugCatch)
            {
                console.error('PLANT | ADD | ERROR _> ' + e);
            }
        }
    };

    _this.show = function (id)
    {
        try
        {
            if (typeof plants[id] !== 'undefined')
            {
                plants_geofences[id].addTo(map);
                plants_geofences_description[id].addTo(map);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.info('PLANT | show | No existe la plants_geofences ' + id);
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('PLANT | show | ERROR _> ' + e)
            }
        }
    };

    _this.delete = function (id)
    {
        try
        {
            if (typeof plants[id] !== 'undefined')
            {
                plants_geofences[id].remove();
                plants_geofences_description[id].remove();
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('PLANT | delete | No existe plants_geofences  _> ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('PLANT | delete | ERROR _> ' + e)
            }
        }
    };


    _this.paintPlantsGeofences = function ()
    {
        this.plants_geofences.forEach(function (plant, indice)
                                      {
                                          _this.add(plant);
                                      });

        /***
         * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
         */
        if (plantsView == false)
        {
            if (isDebugInfo)
            {
                console.log("Se ocultan las plantas ya que esta desactivada la opcion"); //isDebugInfo
            }
            _this.hiddenAll();
        }
    };

    _this.showHidden = function (id)
    {
        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('geofence_plant_' + id).checked;
        if (isChecked)
        {
            ///
            /// Agregamos la planta al mapa
            ///
            _this.show(id);
        }
        else
        {
            ///
            /// Eliminamos la planta del mapa
            ///
            _this.delete(id);
        }
    };

    _this.showhiddenAll = function ()
    {
        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('plants_geofences_all').checked;

        if (isChecked)
        {
            plantsView = true;
            this.plantsView = true;
            ls.setItem("plantsView", true);
        }
        else
        {
            plantsView = false;
            this.plantsView = false;
            ls.setItem("plantsView", false);
        }

        plants.forEach(function (plant, index)
                       {
                           if (isChecked)
                           {
                               ///
                               /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                               ///
                               document.getElementById('geofence_plant_' + plant.id).checked = true;
                               ///
                               /// Enviamos la planta para que se vuelva a hacer visible en la pantalla del mapa.
                               ///
                               _this.show(plant.id);
                           }
                           else
                           {
                               ///
                               /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                               ///
                               document.getElementById('geofence_plant_' + plant.id).checked = false;
                               ///
                               /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                               ///
                               _this.delete(plant.id);
                           }

                       });

    };

    _this.hiddenAll = function ()
    {

        plants_geofences.forEach(function (valor, id)
                                 {
                                     ///
                                     /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                                     ///
                                     ///document.getElementById('geofence_plant_' + id).checked = false;
                                     ///
                                     /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                                     ///
                                     _this.delete(id);

                                 });

    };

    _this.view = function (id)
    {
        if (isDebugInfo)
        {
            console.log('VUE | plant | view | ID: ' + id); //isDebugInfo
        }

        plants.forEach(function (plant, index)
                       {
                           try
                           {
                               /**
                                * Desmarcamos todos los demas checkbox para que solo este activo el selecionado
                                */
                               if (plant.id != id)
                               {
                                   document.getElementById('view_plant_' + plant.id).checked = false;
                                   document.getElementById('geofence_plant_' + plant.id).checked = false;
                               }
                               else
                               {
                                   document.getElementById('geofence_plant_' + plant.id).checked = true;
                               }
                           }
                           catch (e)
                           {
                               console.error('Error: ' + e);
                           }
                       });

        let plant = plants_geofences[id];
        if (plant != null)
        {
            let latLng = plant.getLatLngs();
            let bounds = [latLng];
            let option = {};
            ///
            /// Verificamos si el Zoom esta al maximo en el mapa, si no
            /// se asignara que este al maximo, pero en la latitud y longitud
            ///
            if (currentZoom < 15)
            {
                option.maxZoom = 15;
            }
            map.fitBounds(bounds, option);
        }
    };

};

/**
 * Libreria para manipulación de poligono de Obras en el sistema
 */
function Job()
{
    let _this = this;

    function seardMe(d,o)
    {
        let search =  document.getElementById("basicInputJob").value; 
        let rst = false;
        let val3;
        let iii;
        let count = 0;
        search = search.toUpperCase()
        search = search.trim()
        
        jQuery.each(d, function(iii, val3) 
        { 
              if (search != "")
              {
                    if (o == 0) 
                    { 
                        if (toUpperCase(val3.job_name) == search) rst =  true;
                    }
                    else
                    {
                        if (iii == "job_name") if (val3.job_name.includes(search)) rst =  true;
                    }
              }
        });
        return rst;
    }

    function paintDataJobs(data)
    {
        let html = '';
        let count;
        html = '<div class="accordion" id="ExPlantIDJob">';

        jQuery.each(data, function(i, tg) 
        {
            count = 0;
            jQuery.each(tg, function(ii, job) 
            {
                if (seardMe(job.jobs,2) == true) count++;
            });

            if (seardMe(tg.jobs,0) == true) 
            {
                  html = html + `
                  <div class="card-body">
                    <div class="collapse-margin"> 
                      <div class="row">
                          <div class="col-12">
                              <div class="divider divider-success">
                                  <div class="divider-text">
                                      `+tg.name+`
                                  </div>
                              </div>`                      

                   jQuery.each(tg.jobs, function(ii, job) 
                   {  
                      if (job.id != "")
                      { 
                         if (seardMe(job,1) == true)
                         {              
                           html = html +`
                           <div id="job_`+job.id+`">
                                <div class="divider divider-info">
                                    <div class="divider-text">
                                        Obra Code : `+job.number+` 
                                    </div>
                                </div>
                                <div class="row">
                                    <!--
                                    <div class="offset-1 col-3">
                                        <div class="custom-control custom-switch custom-switch-success">
                                            <p class="mb-50">Visible</p>
                                            <input type="checkbox" class="custom-control-input"
                                                   id="geofence_job_`+job.id+`"
                                                   checked onclick="aztrack.job.showHidden(`+job.id+`)"/>
                                            <label class="custom-control-label" for="geofence_job_`+job.id+`">
                                                <span class="switch-icon-left"><i data-feather="check"></i></span>
                                                <span class="switch-icon-right"><i data-feather="x"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    -->
                                    <!--
                                    <div class="col-3">
                                        <p class="mb-50">&nbsp;</p>
                                        <div class="custom-control custom-control-success custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="view_ticket_`+job.id+`"
                                                   onclick="aztrack.ticket.view(`+job.id+`)"
                                                   name="view_job_`+job.id+`"/>
                                            <label class="custom-control-label" for="view_ticket_`+job.id+`">Ver</label>
                                        </div>
                                    </div>
                                    -->
                                    <!--
                                    <div class="col-3">
                                        <p class="mb-50">&nbsp;</p>
                                        <div class="custom-control custom-control-success custom-checkbox">
                                            <a class="btn btn-primary" href="/cpadmin/maintainer/job/`+job.id+`/edit">Editar</a>
                                        </div>
                                    </div>
                                    -->
                                </div>
                                <br/>
                                <div class="row">
                                    <div class="col-12">
                                        <table class="table table-striped job_table_info">
                                            <tr>
                                                <td class="job_client">Cliente:</td>
                                                <td>
                                                    <div class="job_client">`+job.client+`</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="job_address">Dirección:</td>
                                                <td>
                                                    <div class="job_address">`+job.job_address+`</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="job_address">Rut Cliente:</td>
                                                <td>
                                                    <div class="job_address">MX-`+job.rut_cliente+`</div>
                                                </td>
                                            </tr>

                                        </table>
                                    </div>
                                </div>
                            </div>`
                        }   
                    
                       html = html +`
                              </div>
                          </div>
                        </div>
                      </div>`    
                    }
 
              });
              html = html + `</div>`;
            }
         });
        
         if (html == '<div class="accordion" id="ExPlantIDJob">') 
         {
                html = `
                <div class="alert alert-danger" role="alert">
                  <center>Sin información para la busqueda...</center>
                </div>`
                $('#accordionJob').show();
                $('#accordionJobSearch').html(html); 
  
          }  
          else
          {
                $('#accordionJob').hide();
                $('#accordionJobSearch').html(html);
          }  
          $('#accordionJobSearch').show(); 
          $('#lodingJob').hide();
    }

    _this.searchJobForm = function (event)
    {

        _this.ticket_loading = true;
        let search = document.getElementById("basicInputJob").value;
        let api_urlf =  "/ajax/job/all/"
        if (search != '')
        {
            $('#lodingJob').show();
            $('#accordionJob').hide();
            $('#accordionJobSearch').hide();

            axios.get(api_urlf)
                 .then((response) =>
                       {
                           _this.job_loading = false;
                           _this.job_plants = response.data.data;
                           paintDataJobs(response.data.data);

                          }).catch(function (error)
                                {
                                    if (isDebugInfo)
                                    {
                                        console.log('Ocurrio un error no controlado:' + error); //isDebugInfo
                                    }
                                }).finally(() => (this.ticket_loading = false));
        
        }
        else
        {
            $('#accordionJobSearch').hide();
            $('#lodingJob').hide();
            $('#accordionJob').show();
            _this.getTicketsAll();
        }
    };



    _this.add = function (job)
    {
        try
        {
            /**
             * Si la variable no existe se agrega a la matriz,
             * si existe no se se agrega por que se encuentra repetida
             */
            if (typeof jobs_geofences[job.id] === "undefined")
            {

                if (isDebugInfo)
                {
                    console.log('JOB | add | ID _> ' + job.id); //isDebugInfo
                }

                if (job.latitude != null || job.longitude != null)
                {
                    let job_html = '<table>' +
                        '<tr><td><strong>Nombre:</strong> &nbsp;</td><td>' + job.job_name + '</td></tr>' +
                        '<tr><td><strong>Nombre Cliente:</strong> &nbsp;</td><td>' + job.client + '</td></tr>' +
                        ' <tr><td><strong>Dirección:</strong> &nbsp;</td><td>' + job.job_address + '</td></tr> ' +
                        '<tr><td><strong>Numero Obra:</strong> &nbsp;</td><td>' + job.job_number + '</td></tr>' +
                        '<tr><td><strong>Fecha:</strong> &nbsp;</td><td>' + job.date + '</td></tr>' +
                        '<tr><td><strong>Rut Cliente:</strong> &nbsp;</td><td>' + job.rut_client + '</td></tr>' +
                        '</table>';

                    let position_job = [];
                    let coordinate;

                    if ((typeof job.polygon === 'string') && job.polygon != '')
                    {
                        coordinate = JSON.parse(job.polygon);
                    }
                    else
                    {
                        coordinate = job.polygon;
                    }
                    ///
                    /// Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                    ///
                    ///position_tracking.push([job.latitude, vehicle.longitude]);
                    for (let i = 0; i < coordinate.length; i++)
                    {
                        position_job.push([coordinate[i].lat, coordinate[i].lng]);
                    }

                    jobs[job.id] = job;

                    ///
                    /// Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                    ///
                    jobs_geofences[job.id] = L.polygon(position_job, {
                        color: job.polygon_color,
                    }).bindPopup(job_html, {maxWidth: 500}).addTo(map);

                    jobs_geofences_description[job.id] = new L.Marker(
                        null,
                        {
                            icon: L.divIcon({
                                                html: '<div class="name" style="background-color: ' + convertHex(job.polygon_color_tag || job.polygon_color, 81) + '">' + job.name + '</div>',
                                                className: 'leaflet-popup-geofence',
                                                iconSize: 'auto'
                                            })
                        }
                    ).setLatLng(jobs_geofences[job.id].getBounds().getCenter()).addTo(map);
                }
                else
                {
                    console.log('JOB | add  | no contiene latitud y longitud | ID _> ' + job.id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            console.error('JOB | add | ERROR _> ' + e);
        }

    };
    _this.show = function (id)
    {
        if (typeof jobs[id] !== 'undefined')
        {
            jobs_geofences[id].addTo(map);
            jobs_geofences_description[id].addTo(map);
        }
        else
        {
            if (isDebug)
            {
                console.log('JOB | show | No existe jobs_geofences _> ' + id); //isDebugInfo
            }
        }
    };

    _this.delete = function (id)
    {
        try
        {
            if (typeof jobs_geofences[id] !== 'undefined')
            {
                jobs_geofences[id].remove();
                jobs_geofences_description[id].remove();
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('JOB | remote | No existe la jobs_geofences _> ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('JOB | remote | ERROR _> ' + e)
            }
        }
    };

    _this.view = function (id)
    {
        if (isDebugInfo)
        {
            console.log('JOB | viewJob | ID: ' + id); //isDebugInfo
        }

        jobs.forEach(function (job, index)
                     {
                         try
                         {
                             /**
                              * Desmarcamos todos los demas checkbox para que solo este activo el selecionado
                              */
                             if (job.id != id)
                             {
                                 document.getElementById('view_coverage_' + job.id).checked = false;
                             }

                         }
                         catch (e)
                         {
                             console.error('Error: ' + e);
                         }
                     });


        let job = jobs_geofences[id];
        if (job != null)
        {
            let latLng = job.getLatLngs();
            let bounds = [latLng];
            let option = {};

            currentZoom = map.getZoom();
            ///
            /// 0 == Selecionar todos
            ///
            if (id == 0)
            {
                option.maxZoom = 4;
            }
            else
            {
                ///
                /// Verificamos si el Zoom esta al maximo en el mapa, si no
                /// se asignara que este al maximo, pero en la latitud y longitud dada por el ticket
                ///
                if (currentZoom < 15)
                {
                    option.maxZoom = 15;
                }
            }
            map.fitBounds(bounds, option);
        }
    };
    _this.cleanAll = function ()
    {
        if (jobs_geofences.length > 0)
        {
            jobs_geofences.forEach(function (valor, id)
                                   {
                                       try
                                       {
                                           if (typeof jobs_geofences[id] !== 'undefined')
                                           {
                                               jobs_geofences.removeLayer(tickets[id]);
                                           }
                                           else
                                           {
                                               console.log('Ticket ID: ' + id + ' undefined'); //isDebugInfo
                                           }
                                       }
                                       catch (e)
                                       {
                                           console.error('Error: ' + e);
                                       }
                                   });
        }
        jobs_geofences = [];
    };
    _this.paintAllJobs = function ()
    {
        if (isDebugInfo) {
            console.log('paintAllJobs'); //isDebugInfo
        }

        _this.jobs_plants.forEach(function (plant, index)
                                  {
                                      ///
                                      /// Verificamos que la planta tenga ticket asignados
                                      ///
                                      if (plant.jobs.length)
                                      {
                                          ///
                                          /// Recorremoces los tickets asignados a la planta
                                          ///
                                          plant.jobs.forEach(function (job, id)
                                                             {
                                                                 aztrack.job.add(job);
                                                             });
                                      }
                                  });

        /***
         * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
         */
        if (jobsView == false)
        {
            if (isDebugInfo)
            {
                console.log("Se ocultan las obras ya que esta desactivada la opcion"); //isDebugInfo
            }
            _this.hiddenAllJobs();
        }

    };
    _this.showHidden = function (id)
    {
        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('geofence_job_' + id).checked;
        if (isChecked)
        {
            ///
            /// Agregamos al ticket al listado
            ///
            _this.show(id);
        }
        else
        {
            ///
            /// Eliminamos al ticket del listado
            ///
            _this.delete(id);
        }
    };

    _this.showHiddenAll = function ()
    {
        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('jobs_all').checked;


        if (isChecked)
        {
            jobsView = true;
            this.jobsView = true;
            ls.setItem("jobsView", true);
        }
        else
        {
            jobsView = false;
            this.jobsView = false;
            ls.setItem("jobsView", false);
        }

        jobs.forEach(function (job, id)
                     {
                         try
                         {
                             if (typeof jobs_geofences[job.id] !== 'undefined')
                             {
                                 if (isChecked)
                                 {
                                     ///
                                     /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                                     ///
                                     document.getElementById('geofence_job_' + job.id).checked = true;
                                     ///
                                     /// Enviamos el ticket para que se vuelva a hacer visible en la pantalla del mapa.
                                     ///
                                     _this.show(job.id);
                                 }
                                 else
                                 {
                                     ///
                                     /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                                     ///
                                     document.getElementById('geofence_job_' + job.id).checked = false;
                                     ///
                                     /// Enviamos el ticket para que se desmarque de la pantalla del mapa.
                                     ///
                                     _this.delete(job.id);
                                 }
                             }
                             else
                             {
                                 if (isDebugInfo) {
                                     console.log('JOB ID: ' + job.id + ' undefined'); //isDebugInfo
                                 }
                             }
                         }
                         catch (e)
                         {
                             console.error('Error: ' + e);
                         }
                     });

    };

    _this.hiddenAll = function ()
    {
        jobs.forEach(function (job, id)
                     {
                         try
                         {
                             if (typeof jobs_geofences[job.id] !== 'undefined')
                             {
                                 ///
                                 /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                                 ///
                                 ///document.getElementById('geofence_job_' + job.id).checked = false;
                                 ///
                                 /// Enviamos el ticket para que se desmarque de la pantalla del mapa.
                                 ///
                                 _this.delete(job.id);
                             }
                             else
                             {
                                 if (isDebugInfo) {
                                     console.log('JOB ID: ' + job.id + ' undefined'); //isDebugInfo
                                 }
                             }
                         }
                         catch (e)
                         {
                             console.error('Error: ' + e);
                         }
                     });

    };
};

/**
 * Class Coverage encargada de adminsitrar las coberturas del sistema
 */
function Coverage()
{

    let _this = this;

    _this.add = function (coverage)
    {
        try
        {
            if ((typeof coverage.polygon !== 'undefined') && !isEmpty(coverage.polygon))
            {
                ///
                /// transforma el texto del ajax en un array para que polygon funcione en letfleat
                /// si no se produce una excetion t is null ????!!!!!
                ///
                let position = [];
                let coordinate;
                let plants = "";

                if ((typeof coverage.polygon === 'string'))
                {
                    coordinate = JSON.parse(coverage.polygon);
                }
                else
                {
                    coordinate = coverage.polygon;
                }

                for (let i = 0; i < coordinate.length; i++)
                {
                    position.push([coordinate[i].lat, coordinate[i].lng]);
                }

                ///
                /// Si existe 1 sola planta, no le pone |, en cambio si es mayor a 1
                /// le concatena | y recorre el ciclo.
                ///
                if (coverage.plants_codes.length == 1)
                {
                    plants += coverage.plants_codes[0].plant_code;
                }
                else
                {
                    for (let i = 0; i < coverage.plants_codes.length; i++)
                    {
                        plants += coverage.plants_codes[i].plant_code + ' | ';
                    }
                }

                ///
                /// Agregamos la GEOCERCA a la matrix para el manejo
                /// Agregamos el TAG a la matrix para el manejo
                ///

                coverages_geofences[coverage.id] = L.polygon(position,
                                                             {
                                                                 color: coverage.polygon_color,
                                                                 weight: 3,
                                                                 opacity: 1,
                                                                 fill: true,
                                                                 fillOpacity: 0.3,
                                                                 fillColor: coverage.polygon_color_border,
                                                             }
                ).addTo(map);

                coverages_geofences_description[coverage.id] = new L.Marker(
                    null,
                    {
                        icon: L.divIcon({
                                            html: '<div class="name" style="background-color: ' + convertHex(coverage.polygon_color_tag || coverage.polygon_color, 81) + '">' + coverage.name + ' | ( ' + plants + ' )</div>',
                                            className: 'leaflet-popup-geofence',
                                            iconSize: 'auto'
                                        })
                    }
                ).setLatLng(coverages_geofences[coverage.id].getBounds().getCenter()).addTo(map);


                _this.delete(coverage.id);

            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('COVERAGE | ADD | ERROR _> ' + e);
            }

        }
    };

    _this.show = function (id)
    {
        try
        {
            if (typeof coverages[id] !== 'undefined')
            {

                coverages_geofences[id].addTo(map);
                coverages_geofences_description[id].addTo(map);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('COVERAGE | SHOW | coverages_geofences | NO EXISTE ID _> ' + id);//isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('COVERAGE | ADD | ERROR _> ' + E);
            }
        }
    };
    _this.delete = function (id)
    {
        try
        {
            if (typeof coverages_geofences[id] !== 'undefined')
            {

                coverages_geofences[id].remove();
                coverages_geofences_description[id].remove();
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('COVERAGE | DELETE | coverages_geofences | NO EXISTE ID _> ' + id);//isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('COVERAGE | DELETE | ERROR _> ' + E);
            }
        }
    };

    _this.hiddenTitle = function ()
    {
        $(map.getContainer()).removeClass('hidden-device-name');
    };

    _this.showTitle = function ()
    {
        $(map.getContainer()).addClass('hidden-device-name');
    };

    _this.showHidden = function (id)
    {
        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('geofence_coverage_' + id).checked;
        if (isChecked)
        {
            ///
            /// Agregamos la planta al mapa
            ///
            _this.show(id);
        }
        else
        {
            ///
            /// Eliminamos la planta del mapa
            ///
            _this.delete(id);
        }
    };

    _this.showHiddenAll = function ()
    {

        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('coverages_geofences_all').checked;
        let _this = this;

        if (isChecked)
        {
            coveragesView = true;
            this.coveragesView = true;
            ls.setItem("coveragesView", true);
        }
        else
        {
            coveragesView = false;
            this.coveragesView = false;
            ls.setItem("coveragesView", false);
        }

        coverages.forEach(function (coverage, id)
                          {
                              if (isChecked)
                              {
                                  ///
                                  /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                                  ///
                                  document.getElementById('geofence_coverage_' + coverage.id).checked = true;
                                  ///
                                  /// Enviamos la planta para que se vuelva a hacer visible en la pantalla del mapa.
                                  ///
                                  _this.show(coverage.id);
                              }
                              else
                              {
                                  ///
                                  /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                                  ///
                                  document.getElementById('geofence_coverage_' + coverage.id).checked = false;
                                  ///
                                  /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                                  ///
                                  _this.delete(coverage.id);
                              }
                          });
    };
    _this.hiddenAll = function ()
    {
        coverages.forEach(function (coverage, id)
                          {
                              ///
                              /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                              ///
                              //document.getElementById('geofence_coverage_' + id).checked = false;
                              ///
                              /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                              ///
                              _this.delete(coverage.id);

                          });
    };
    _this.view = function (id)
    {


        if (isDebugInfo)
        {
            console.log('Coverage ID: ' + id);//isDebugInfo
        }

        coverages.forEach(function (coverage, index)
                          {
                              try
                              {
                                  /**
                                   * Desmarcamos todos los demas checkbox para que solo este activo el selecionado
                                   */
                                  if (coverage.id != id)
                                  {
                                      document.getElementById('view_coverage_' + coverage.id).checked = false;
                                  }

                              }
                              catch (e)
                              {
                                  console.error('Error: ' + e);
                              }
                          });

        let coverage = coverages_geofences[id];
        if (coverage != null)
        {
            let latLng = coverage.getLatLngs();
            let bounds = [latLng];
            let option = {};

            currentZoom = map.getZoom();
            ///
            /// 0 == Selecionar todos
            ///
            if (id == 0)
            {
                option.maxZoom = 4;
            }
            else
            {
                ///
                /// Verificamos si el Zoom esta al maximo en el mapa, si no
                /// se asignara que este al maximo, pero en la latitud y longitud dada por el ticket
                ///
                if (currentZoom < 15)
                {
                    option.maxZoom = 15;
                }
            }
            map.fitBounds(bounds, option);
        }
    };
}

/**
 * Libreria para manipulación de poligono de Talleres en el sistema
 */
function Workshop()
{
    let _this = this;
    _this.show = function (id)
    {
        try
        {
            if (typeof workshops[id] !== 'undefined')
            {

                workshops_geofences[id].addTo(map);
                workshops_geofences_description[id].addTo(map);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('WORKSHOP | SHOW | NO EXISTE ID _> ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('WORKSHOP | ADD | ERROR _> ' + E);
            }
        }
    };

    _this.delete = function (id)
    {
        try
        {
            if (typeof workshops_geofences[id] !== 'undefined')
            {
                workshops_geofences[id].remove();
                workshops_geofences_description[id].remove();
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('TICKET | delete | No existe la plants_goefences ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('TICKET | delete | ERROR _> ' + e)
            }
        }
    };

    _this.add = function (workshop)
    {
        try
        {

            if ((typeof workshop.polygon !== 'undefined') && !isEmpty(workshop.polygon))
            {
                ///
                /// transforma el texto del ajax en un array para que polygon funcione en letfleat
                /// si no se produce una excetion t is null ????!!!!!
                ///
                let workshop_position = [];
                let workshop_coordinate;
                let plants = "";

                if ((typeof workshop.polygon === 'string'))
                {
                    workshop_coordinate = JSON.parse(workshop.polygon);
                }
                else
                {
                    workshop_coordinate = workshop.polygon;
                }
                for (let i = 0; i < workshop_coordinate.length; i++)
                {
                    workshop_position.push([workshop_coordinate[i].lat, workshop_coordinate[i].lng]);
                }

                ///
                /// Agregamos a la variable global el objecto workshop
                ///
                workshops[workshop.id] = workshop;

                ///
                /// Agregamos la GEOCERCA a la matrix para el manejo
                /// Agregamos el TAG a la matrix para el manejo
                ///
                workshops_geofences[workshop.id] = L.polygon(workshop_position,
                                                             {
                                                                 color: workshop.polygon_color,
                                                                 weight: 3,
                                                                 opacity: 1,
                                                                 fill: true,
                                                                 fillOpacity: 0.3,
                                                                 fillColor: workshop.polygon_color_border,
                                                             }
                ).addTo(map);

                workshops_geofences_description[workshop.id] = new L.Marker(
                    null,
                    {
                        icon: L.divIcon({
                                            html: '<div class="name" style="background-color: ' + convertHex(workshop.polygon_color_tag || workshop.polygon_color, 81) + '">' + workshop.name + '</div>',
                                            className: 'leaflet-popup-geofence',
                                            iconSize: 'auto'
                                        })
                    }
                ).setLatLng(workshops_geofences[workshop.id].getBounds().getCenter()).addTo(map);

            }
            else
            {
                if (isDebugInfo) {
                    console.log('Taller sin geocerca: ' + workshop.id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('WORKSHOP | add | ERROR _> ' + e);
            }
        }
    };

    _this.showHidden = function (id)
    {
        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('geofence_workshop_' + id).checked;
        if (isChecked)
        {
            ///
            /// Agregamos la planta al mapa
            ///
            _this.show(id);
        }
        else
        {
            ///
            /// Eliminamos la planta del mapa
            ///
            _this.hidden(id);
        }
    };

    _this.showHiddenAll = function ()
    {

        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('workshops_geofences_all').checked;
        let _this = this;

        if (isChecked)
        {
            workshopsView = true;
            this.workshopsView = true;
            ls.setItem("workshopsView", true);
        }
        else
        {
            workshopsView = false;
            this.workshopsView = false;
            ls.setItem("workshopsView", false);
        }


        workshops.forEach(function (workshop, index)
                          {
                              if (isChecked)
                              {
                                  ///
                                  /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                                  ///
                                  document.getElementById('geofence_workshop_' + workshop.id).checked = true;
                                  ///
                                  /// Enviamos la planta para que se vuelva a hacer visible en la pantalla del mapa.
                                  ///
                                  _this.show(workshop.id);
                              }
                              else
                              {
                                  ///
                                  /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                                  ///
                                  document.getElementById('geofence_workshop_' + workshop.id).checked = false;
                                  ///
                                  /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                                  ///
                                  _this.hidden(workshop.id);
                              }
                          });
    };

    _this.hiddenAll = function ()
    {
        workshops.forEach(function (wokshop, id)
                          {
                              ///
                              /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                              ///
                              ///document.getElementById('geofence_workshop_' + id).checked = false;
                              ///
                              /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                              ///
                              _this.delete(wokshop.id);
                          });
    };
    /*
     _this.show = function (id)
     {
     workshops_geofences[id].addTo(map);
     workshops_geofences_description[id].addTo(map);
     };
     */
    _this.hidden = function (id)
    {
        workshops_geofences[id].remove();
        workshops_geofences_description[id].remove();
    };

    _this.view = function (id)
    {
        if (isDebugInfo)
        {
            console.log('Workshop ID: ' + id); //isDebugInfo
        }

        workshops.forEach(function (workshop, index)
                          {
                              try
                              {
                                  /**
                                   * Desmarcamos todos los demas checkbox para que solo este activo el selecionado
                                   */
                                  if (workshop.id != id)
                                  {
                                      document.getElementById('view_workshop_' + workshop.id).checked = false;
                                      document.getElementById('geofence_workshop_' + workshop.id).checked = false;
                                  }
                                  else
                                  {
                                      document.getElementById('geofence_workshop_' + workshop.id).checked = true;
                                  }
                              }
                              catch (e)
                              {
                                  console.error('Error: ' + e);
                              }
                          });

        let workshop = workshops_geofences[id];

        if (workshop != null)
        {
            let latLng = workshop.getLatLngs();
            let bounds = [latLng];
            let option = {};

            currentZoom = map.getZoom();
            ///
            /// 0 == Selecionar todos
            ///
            if (id == 0)
            {
                option.maxZoom = 4;
            }
            else
            {
                ///
                /// Verificamos si el Zoom esta al maximo en el mapa, si no
                /// se asignara que este al maximo, pero en la latitud y longitud dada por el ticket
                ///
                if (currentZoom < 15)
                {
                    option.maxZoom = 15;
                }
            }
            map.fitBounds(bounds, option);
        }
    };

};

/**
 * Libreria para manipulación de Ticket en el sistema
 */
function Ticket()
{
    let _this = this;

    _this.show = function (id)
    {
        try
        {
            if (typeof tickets_geofences[id] !== 'undefined')
            {
                tickets_geofences[id].addTo(map);
                tickets_geofences_description[id].addTo(map);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('TICKET | show | No existe tickets_geofences ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('TICKET | show | ERROR _> ' + e)
            }
        }
    };

    _this.delete = function (id)
    {
        try
        {
            if (typeof tickets_geofences[id] !== 'undefined')
            {
                tickets_geofences[id].remove();
                tickets_geofences_description[id].remove();
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('TICKET | delete | No existe la plants_goefences ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('TICKET | delete | ERROR _> ' + e)
            }
        }
    };

    _this.add = function (ticket)
    {
        try
        {
            if (isDebugInfo)
            {
                ///console.log('TICKET | add | ID _> ' + ticket.id);
            }
            if (ticket.latitude != null || ticket.longitude != null)
            {
                let ticket_html = '<table>' +
                    '<tr><td><strong>Nombre:</strong> &nbsp;</td><td>' + ticket.name + '</td></tr>' +
                    '<tr><td><strong>Mixer:</strong> &nbsp;</td><td>' + ticket.vehicle_unit_code + '</td></tr>' +
                    '<tr><td><strong>Nombre Cliente:</strong> &nbsp;</td><td>' + ticket.t_m_tp_sj_id + '</td></tr>' +
                    ' <tr><td><strong>Código del Ticket:</strong> &nbsp;</td><td>' + ticket.t_m_tp_ji_ticket_code + '</td></tr> ' +
                    '<tr><td><strong>Número de Obra:</strong> &nbsp;</td><td>' + ticket.t_m_tp_sj_a_postal_code + '</td></tr>' +
                    '<tr><td><strong>M³:</strong> &nbsp;</td><td>' + ticket.t_m_tp_ji_t_m_tp_ji_ticket_qty + '</td></tr>' +
                    '</table>';

                /**
                 * Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                 */
                /*
                 ///
                 /// Se calcula circulo con la libreria javascript
                 ///
                 tickets_geofences[ticket.id] = L.circle([ticket.latitude, ticket.longitude], {
                 radius: 250,
                 color: ticket.polygon_color
                 }).bindPopup(ticket_html).addTo(map);
                 */

                let position_ticket = [];
                let coordinate;

                if ((typeof ticket.polygon === 'string') && ticket.polygon != '')
                {
                    coordinate = JSON.parse(ticket.polygon);
                }
                else
                {
                    coordinate = ticket.polygon;
                }
                /**
                 * Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                 *
                 * position_tracking.push([job.latitude, vehicle.longitude]);
                 */
                for (let i = 0; i < coordinate.length; i++)
                {
                    position_ticket.push([coordinate[i].lat, coordinate[i].lng]);
                }
                /**
                 * Creamos la geocercas del ticket y la almacenamos en el array de tickets_geofences
                 */
                tickets_geofences[ticket.id] = L.polygon(position_ticket, {
                    color: ticket.polygon_color,
                }).bindPopup(ticket_html, {maxWidth: 500}).addTo(map);

                /**
                 * Creamos el cuadro de dialogo del ticket y la almacenamos en el array de tickets_geofences_description
                 */

                tickets_geofences_description[ticket.id] = new L.Marker(
                    null,
                    {
                        icon: L.divIcon({
                                            html: '<div class="name" style="background-color: ' + convertHex(ticket.polygon_color_tag || ticket.polygon_color, 81) + '">' + ticket.name + _this.isEditableDraw(ticket.id) + '</div>',
                                            className: 'leaflet-popup-geofence',
                                            iconSize: 'auto'
                                        })
                    }
                ).setLatLng(tickets_geofences[ticket.id].getBounds().getCenter()).addTo(map);

            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('TICKET | add | no contiene latitud y longitud ID _> ' + ticket.id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('TICKET | add | ERROR _> ' + e);
            }
        }
    };
    /**
     * Funcion encargada de terminar el seguimiento del camión
     */
    _this.tracingOff = function ()
    {
        on_focus_vehicle = '';
        on_focus_vehicle_bulk = '';
        on_focus_vehicle_rent = '';


        vehicles.forEach(function (vehicle, index)
                         {
                             try
                             {
                                 if (typeof document.getElementById('view_vehicle_' + vehicle.id) !== 'undefined')
                                 {
                                     document.getElementById('view_vehicle_' + vehicle.id).checked = false;
                                     if (vehicle.name != null)
                                     {
                                         _this.restoreSelectedVehicle(vehicle.name)
                                     }
                                 }
                             }
                             catch (e)
                             {
                                 if (isDebugCatch)
                                 {
                                     console.log('VEHICLE | tracingOff | ERROR _> ' + e); //isDebugInfo
                                 }
                             }
                         });

        vehiclesRents.forEach(function (vehicle, index)
                              {
                                  try
                                  {
                                      if (typeof document.getElementById('view_vehicle_rent_' + vehicle.id) !== 'undefined')
                                      {
                                          document.getElementById('view_vehicle_rent_' + vehicle.id).checked = false;
                                          if (vehicle.name != null)
                                          {
                                              _this.restoreSelectedVehicle(vehicle.name)
                                          }
                                      }
                                  }
                                  catch (e)
                                  {
                                      if (isDebugCatch)
                                      {
                                          console.log('VEHICLE Rents | tracingOff | ERROR _> ' + e); //isDebugInfo
                                      }
                                  }
                              });

        vehiclesBulks.forEach(function (vehicle, index)
                              {
                                  try
                                  {
                                      if (typeof document.getElementById('view_vehicle_bulk_' + vehicle.id) !== 'undefined')
                                      {
                                          document.getElementById('view_vehicle_bulk_' + vehicle.id).checked = false;
                                          if (vehicle.name != null)
                                          {
                                              _this.restoreSelectedVehicle(vehicle.name)
                                          }
                                      }
                                  }
                                  catch (e)
                                  {
                                      if (isDebugCatch)
                                      {
                                          console.log('VEHICLE Rents | tracingOff | ERROR _> ' + e); //isDebugInfo
                                      }
                                  }
                              });
    };

    _this.update = function (vehicle)
    {
        try
        {
            let icon = null;
            let course = 0;
            let width = 50;
            let height = 81;
            let position = new L.LatLng(vehicle.latitude, vehicle.longitude);
            let html = '';
            //let color = _this.getStatusColor();

            icon = '<img src="' + vehicle.icon_map + '"/>';
            course = vehicle.course;

            html += '<span class="name"><i>' + vehicle.name + ' (' + vehicle.speed + ' km)' + '</i></span><br/>';
            html += icon;

            let iconAnchor = [(width / 2), (height / 2)];

            let divIcon = L.divIcon({
                                        html: html,
                                        className: 'leaf-device-marker',
                                        iconSize: [width, height],
                                        iconAnchor: iconAnchor,
                                        popupAnchor: [0, 0 - height]
                                    });

            vehicles[vehicle.id].setIcon(divIcon).setIconAngle(course);
            /**
             * Si el vehiculo a procesar es igual al seleccionado para el focus, se activa
             * el centrado de seguimiento
             */
            if (on_focus_vehicle == vehicle.id)
            {
                if (isDebugInfo)
                {
                    console.log('VEHICLE | update | SEGUIMIENTO ACTIVO _> ' + vehicle.id); //isDebugInfo
                }
                /**
                 * Si el efecto de transición esta configurado, se permite el movimiento en tiempo real
                 */
                if (isTruckMoveEffect)
                {
                    vehicles[vehicle.id].slideTo(position, {duration: 3000, keepAtCenter: true});
                }
                else
                {
                    vehicles[vehicle.id].setLatLng(position);
                }
            }
            else
            {
                /**
                 * Si el efecto de transición esta configurado, se permite el movimiento en tiempo real
                 */
                if (isTruckMoveEffect)
                {
                    vehicles[vehicle.id].slideTo(position, {duration: 3000, keepAtCenter: true});
                }
                else
                {
                    vehicles[vehicle.id].setLatLng(position);
                }
            }
            /**
             * Creación de linea que pone visible la ruta del camión antes de la nueva transmisión
             */
            let position_tracking = [];
            let coordinate;

            if ((typeof vehicle.latest_positions === 'string') && vehicle.latest_positions != '')
            {
                coordinate = JSON.parse(vehicle.latest_positions);
            }
            else
            {
                coordinate = vehicle.latest_positions;
            }
            /**
             * Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
             */
            position_tracking.push([vehicle.latitude, vehicle.longitude]);
            for (let i = 0; i < coordinate.length; i++)
            {
                position_tracking.push([coordinate[i].lat, coordinate[i].lng]);
            }

            if (typeof vehicles_tail[vehicle.id] !== 'undefined')
            {
                setTimeout(function ()
                           {
                               vehicles_tail[vehicle.id].setLatLngs(position_tracking);
                           }, 3000);
            }
        }
        catch (e)
        {

            if (isDebugCatch)
            {
                console.error('VEHICLE | UPDATE | ERROR _> ' + e);
            }
        }
    };

    _this.getMapPadding = function ()
    {
        var _offset = 10,
            _left = _offset,
            _bottom = _offset;

        return {
            paddingTopLeft: [_left, _offset],
            paddingBottomRight: [_offset, _bottom],
        };
    };

    _this.fitBounds = function (currentZoom)
    {
        var _bounds = [];

        _bounds = [_item.getLatLng()];

        if (_bounds.length)
        {
            var _option = _this.getMapPadding();


            if (currentZoom && typeof currentZoom === 'boolean')
            {
                currentZoom = map.getZoom();
            }
            if (currentZoom && map.getBoundsZoom(_bounds) > currentZoom)
            {
                _option.maxZoom = currentZoom;
            }
            if (!currentZoom)
            {
                _option.maxZoom = 17;
            }
            map.fitBounds(_bounds, _option);
        }

    };
    /**
     * Iniciamos Cluster que contendra el total de vehiculos visible en el mapa
     */
    _this.clusterInit = function ()
    {
        vehicle_marker_cluster = L.markerClusterGroup(
            {
                disableClusteringAtZoom: 17,
                spiderfyOnMaxZoom: false,
                showCoverageOnHover: false,
                removeOutsideVisibleBounds: true,
                iconCreateFunction: function (cluster)
                {
                    let count = cluster.getChildCount(),
                        c = 'cluster-',
                        radius = 58;

                    if (count < 5)
                    {
                        c += 'small';
                    }
                    else if (count < 10)
                    {
                        c += 'medium';
                    }
                    else
                    {
                        c += 'large';
                    }

                    return L.divIcon({
                                         html: '<div class="cluster-inner"><b>' + count + '</b></div>',
                                         className: 'cluster ' + c,
                                         iconSize: [radius, radius],
                                         iconAnchor: [radius / 2, radius / 2]
                                     });
                }
            });

        vehicle_marker_cluster.on('click', function (a)
        {
            if (isDebugInfo)
            {
                console.log('marker:'); //isDebugInfo
                console.log(a.layer); //isDebugInfo
            }
        });

        vehicle_marker_cluster.on('clusterclick', function (a)
        {
            if (isDebugInfo)
            {
                console.log('cluster ' + a.layer.getAllChildMarkers().length); //isDebugInfo
            }
        });

    };


    _this.socketState = function ()
    {
        if (isDebugInfo)
        {
            console.log('TICKET | socketState | iniciando socket...'); //isDebugInfo
        }
        try
        {
            user_x_plants.forEach(function (pit, index)
                           {
                               if (isDebugInfo)
                               {
                                   console.log('TICKET | WEBSOCKET | CHANNEL | POL_PROD_MOVE_ticket-state_' + pit.id + ' | OK');
                               }

                               Echo.channel('POL_PROD_MOVE_ticket-state_' + pit.id)
                                   .listen('TicketStateEvent', (e) =>
                                           {
                                               let ticket = e.message;

                                               if (isDebugInfo)
                                               {
                                                   console.log('TICKET | socketState | Recibiendo _> ' + ticket.id);
                                               }

                                               if (typeof tickets[ticket.id] !== 'undefined')
                                               {
                                                   if (isDebugInfo)
                                                   {
                                                       console.log('TICKET STATE _> ID: ' + ticket.id + ' | Ticket Code: ' + ticket.t_m_tp_ji_ticket_code + ' | Vehicle ID: ' + ticket.vehicle_unit_code + ' | STATE: ' + ticket.state); //isDebugInfo
                                                   }
                                                   tickets[ticket.id] = ticket;

                                                   /**
                                                    * Seteamos nuevo color del poligono
                                                    */
                                                   tickets_geofences[ticket.id].setStyle({
                                                                                             color: ticket.polygon_color
                                                                                         });


                                                   /**
                                                    * Eliminamos la etiqueta anterior para luego crear la nueva con su color correspondiente
                                                    */
                                                   map.removeLayer(tickets_geofences_description[ticket.id]);
                                                   ///tickets_geofences_description[ticket.id].remove();
                                                   tickets_geofences_description[ticket.id] = new L.Marker(
                                                       null,
                                                       {
                                                           icon: L.divIcon({
                                                                               html: '<div class="name" style="background-color: ' + convertHex(ticket.polygon_color_tag || ticket.polygon_color, 81) + '">' + ticket.name + _this.isEditableDraw(ticket.id) + '</div>',
                                                                               className: 'leaflet-popup-geofence',
                                                                               iconSize: 'auto'
                                                                           })
                                                       }
                                                   ).setLatLng(tickets_geofences[ticket.id].getBounds().getCenter()).addTo(map);


                                                   /**
                                                    * Se levanta Popup de cambio de estado para el ticket
                                                    */
                                                   if (ticket.state <= 4)
                                                   {
                                                       /**
                                                        * si esta activada la notificación de popup se lanza si no se omite
                                                        */
                                                       if (popup_window)
                                                       {
                                                           aztrack.popup.error('Cambio de estado', 'El Mixer: ' + ticket.vehicle_unit_code + ' <br/> ha generado un cambión de estado:  ' + ticketState(ticket.state) + '&nbsp;<a href="javascript:void(0)" class="btn btn-primary btn-sm" onclick="aztrack.vehicle.viewVehicleMap(' + ticket.vehicles_id + ')">Ver</a>');
                                                       }
                                                   }
                                                   else if (ticket.state > 4 && ticket.state < 11)
                                                   {
                                                       /**
                                                        * si esta activada la notificación de popup se lanza si no se omite
                                                        */
                                                       if (popup_window)
                                                       {
                                                           aztrack.popup.warning('Cambio de estado', 'El Mixer: ' + ticket.vehicle_unit_code + ' <br/> ha generado un cambión de estado:  ' + ticketState(ticket.state) + '&nbsp;<a href="javascript:void(0)" class="btn btn-primary btn-sm" onclick="aztrack.vehicle.viewVehicleMap(' + ticket.vehicles_id + ')">Ver</a>');
                                                       }
                                                   }
                                                   else
                                                   {
                                                       /**
                                                        * si esta activada la notificación de popup se lanza si no se omite
                                                        */
                                                       if (popup_window)
                                                       {
                                                           aztrack.popup.success('Cambio de estado', 'El Mixer: ' + ticket.vehicle_unit_code + ' <br/> ha generado un cambión de estado:  ' + ticketState(ticket.state) + '&nbsp;<a href="javascript:void(0)" class="btn btn-primary btn-sm" onclick="aztrack.vehicle.viewVehicleMap(' + ticket.vehicles_id + ')">Ver</a>');
                                                       }
                                                   }

                                                   /**
                                                    * Cambiamos el estados del ticket en el listado del vehiculo,
                                                    * enviamos la transacion para que se genere el cambio
                                                    */
                                                   /*storedb.commit('setTicketVehicle', ticket);*/
                                               }
                                               else
                                               {
                                                   if (isDebugInfo)
                                                   {
                                                       console.log('TICKET | socketState | TICKET STATE _> ' + ticket.id + ' | no existe'); //isDebugInfo
                                                   }
                                               }
                                           },
                                   );
                           });

        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('TICKET | socketState | ERROR _> ' + e);
            }
        }

    };

    _this.geofenceStatus = function ()
    {
        if (isDebugInfo)
        {
            console.log('TICKET | geofenceStatus | iniciando socket...'); //isDebugInfo
        }
        try
        {
            user_x_plants.forEach(function (pit, index)
                           {
                               if (isDebugInfo)
                               {
                                   console.log('TICKET | WEBSOCKET | CHANNEL | POL_PROD_MOVE_geofence-color-update_' + pit.id + ' | OK');
                               }

                                Echo.channel('POL_PROD_MOVE_geofence-color-update_' + pit.id)
                                   .listen('GeofenceUpdateEvent', (e) =>
                                           {
                                               let ticket = e.message;
                                               if (isDebugInfo)
                                               {
                                                   console.log('TICKET | geofenceStatus | Recibiendo _> ' + ticket.name);
                                               }
                                                if (typeof tickets[ticket.id] !== 'undefined')
                                                {
                                                   tickets[ticket.id] = ticket;

                                                   /**
                                                    * Seteamos nuevo color del poligono
                                                    */
                                                   tickets_geofences[ticket.id].setStyle({
                                                                                             color: ticket.polygon_color
                                                                                         });
                                                   /**
                                                    * Eliminamos la etiqueta anterior para luego crear la nueva con su color correspondiente
                                                    */
                                                   map.removeLayer(tickets_geofences_description[ticket.id]);
                                                   tickets_geofences_description[ticket.id] = new L.Marker(
                                                       null,
                                                       {
                                                           icon: L.divIcon({
                                                                               html: '<div class="name" style="background-color: ' + convertHex(ticket.polygon_color_tag || ticket.polygon_color, 81) + '">' + ticket.name + _this.isEditableDraw(ticket.id) + '</div>',
                                                                               className: 'leaflet-popup-geofence',
                                                                               iconSize: 'auto'
                                                                           })
                                                       }
                                                   ).setLatLng(tickets_geofences[ticket.id].getBounds().getCenter()).addTo(map);
                                               }
                                               else
                                               {
                                                   if (isDebugInfo)
                                                    {
                                                       console.log('TICKET | geofenceStatus | TICKET ID _> ' + ticket.id + ' | TICKET ID _> '+ ticket.name +'|no existe'); //isDebugInfo
                                                    }
                                               }
                                           },
                                   );
                           });

        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('TICKET | geofenceStatus | ERROR _> ' + e);
            }
        }

    };

    _this.viewVehicleMap = function (id)
    {
        try
        {
            if (isDebugInfo)
            {
                console.log('VEHICLE | viewVehicle | ID _> ' + id); //isDebugInfo
            }

            let vehicle = vehicles[id];
            if (typeof vehicle !== 'undefined')
            {
                /**
                 * Ocultamos todos los view_vehicle_info
                 */
                vehicles.forEach(function (vehicle, index)
                                 {
                                     try
                                     {

                                         if (typeof document.getElementById('view_vehicle_' + vehicle.id) !== 'undefined')
                                         {
                                             document.getElementById('view_vehicle_' + vehicle.id).checked = false;
                                         }
                                         if (typeof document.getElementById('view_vehicle_info_' + vehicle.id) !== 'undefined')
                                         {
                                             document.getElementById('view_vehicle_info_' + vehicle.id).style.display = 'none';
                                         }
                                     }
                                     catch (e)
                                     {
                                         if (isDebugCatch)
                                         {
                                             ///cuando se filtra genera error, por que desaparece el dom
                                             ///console.log('VEHICLE | viewVehicleMap | ERROR _> ' + e);
                                         }
                                     }
                                 });

                document.getElementById('view_vehicle_' + id).checked = true;
                document.getElementById('view_vehicle_info_' + id).style.display = 'block';

                /**
                 * Asignamos el focus al camión ya que fue pinchado
                 */
                on_focus_vehicle = id;


                let latLng = vehicles[id].getLatLng();
                let bounds = [latLng];
                let option = {};

                currentZoom = map.getZoom();
                /**
                 * 0 == Selecionar todos
                 */
                if (id == 0)
                {
                    option.maxZoom = 4;
                }
                else
                {
                    /**
                     * Verificamos si el Zoom esta al maximo en el mapa, si no
                     * se asignara que este al maximo, pero en la latitud y longitud dada por el vehiculo
                     */
                    if (currentZoom < 16)
                    {
                        option.maxZoom = 16;
                    }
                }
                map.fitBounds(bounds, option);
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | viewVehicle | ERROR _> ' + e);
            }
        }
    };
    _this.showHiddenAllRoutes = function ()
    {
        try
        {
            let show_hidden_all_routers = document.getElementById('show_hidden_all_routers');
            if (show_hidden_all_routers.checked)
            {
                _this.showRoutes();
            }
            else
            {

                _this.hiddenRoutes();
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | showHiddenAllRoutes | ERROR _> ' + e);
            }
        }
    };
    _this.hiddenRoutes = function ()
    {
        try
        {
            vehicles_tail.forEach(function (valor, id)
                                  {
                                      _this.hiddenRoute(id);
                                  }
            );
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | HIDDENROUTES | ERROR _> ' + e);
            }
        }
    };
    _this.showRoutes = function ()
    {
        try
        {
            vehicles_tail.forEach(function (valor, id)
                                  {
                                      _this.showRoute(id);
                                  }
            );
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | SHOWROUTES | ERROR _> ' + e);
            }
        }
    };
    _this.hiddenRoute = function (id)
    {
        if (typeof vehicles_tail[id] !== 'undefined')
        {
            map.removeLayer(vehicles_tail[id]);
        }
        else
        {
            if (isDebugInfo)
            {
                console.error('VEHICLE | HIDDENROUTE | no existe el ID _> ' + id);
            }
        }
    };
    _this.showRoute = function (id)
    {
        if (typeof vehicles_tail[id] !== 'undefined')
        {
            map.addLayer(vehicles_tail[id]);
        }
        else
        {
            if (isDebugInfo)
            {
                console.error('VEHICLE | SHOWROUTE | no existe el ID _> ' + id);
            }
        }
    };
    _this.socketTicketDelete = function ()
    {
        if (isDebugInfo)
        {
            console.log('TICKET | socketDelete | iniciando socket...'); //isDebugInfo
        }
        try
        {
            let _this = this;
            user_x_plants.forEach(function (pit, index)
                           {
                               if (isDebugInfo)
                               {
                                   console.log('VEHICLE | WEBSOCKET | CHANNEL | POL_PROD_MOVE_ticket-delete_' + pit.id + ' | OK'); //isDebugInfo
                               }

                               Echo.channel('POL_PROD_MOVE_ticket-delete_' + pit.id)
                                   .listen('GeofenceDeleteEvent', (e) =>
                                           {
                                               let ticket = e.message;

                                               if (isDebugInfo)
                                               {
                                                   console.log('TICKET | socketDelete | Recibiendo _> ' + ticket.id); //isDebugInfo
                                               }


                                               if (typeof tickets[ticket.id] !== 'undefined')
                                               {
                                                   if (isDebugInfo)
                                                   {
                                                       console.log('TICKET STATE _> ID: ' + ticket.id + ' | Ticket Code: ' + ticket.t_m_tp_ji_ticket_code + ' | Vehicle ID: ' + ticket.vehicle_unit_code + ' | STATE: ' + ticket.state); //isDebugInfo
                                                   }


                                                   tickets_geofences[ticket.id].remove();
                                                   tickets_geofences_description[ticket.id].remove();

                                                   /**
                                                    * Se ejecuta nuevamente la carga de los tickets, para que se refleje la eliminación
                                                    * en el panel del listado y busqueda de ticket...
                                                    */
                                                   /*_this.getTicketsAllUpdate();*/
                                               }
                                               else
                                               {
                                                   if (isDebugInfo)
                                                   {
                                                       console.log('TICKET | socketDelete | TICKET STATE _> ' + ticket.id + ' | no existe'); //isDebugInfo
                                                   }
                                               }
                                           },
                                   );
                           });

        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('TICKET | socketDelete | ERROR _> ' + e);
            }
        }

    };
    _this.socketTicketNew = function ()
    {
        if (isDebugInfo)
        {
            console.log('TICKET | socketNew | iniciando socket...'); //isDebugInfo
        }
        try
        {
            let _this = this;

            user_x_plants.forEach(function (pit, index)
                           {
                               if (isDebugInfo)
                               {
                                   console.log('VEHICLE | WEBSOCKET | CHANNEL | POL_PROD_MOVE_ticket-new_' + pit.id + ' | OK'); //isDebugInfo
                               }

                               Echo.channel('POL_PROD_MOVE_ticket-new_' + pit.id)
                                   .listen('TicketNewEvent', (e) =>
                                   {
                                       let ticket = e.message;

                                       if (ticket.latitude != null || ticket.longitude != null)
                                       {
                                           if (isDebugInfo)
                                           {
                                               console.log('TICKET | socketNew | Recibiendo _> ' + ticket.id); //isDebugInfo
                                           }

                                           let ticket_html = '<table>' +
                                               '<tr><td><strong>Nombre:</strong> &nbsp;</td><td>' + ticket.name + '</td></tr>' +
                                               '<tr><td><strong>Nombre Cliente:</strong> &nbsp;</td><td>' + ticket.t_m_tp_sj_id + '</td></tr>' +
                                               ' <tr><td><strong>Código del Ticket:</strong> &nbsp;</td><td>' + ticket.t_m_tp_ji_ticket_code + '</td></tr> ' +
                                               '<tr><td><strong>Número de Obra:</strong> &nbsp;</td><td>' + ticket.t_m_tp_sj_a_postal_code + '</td></tr>' +
                                               '<tr><td><strong>M³:</strong> &nbsp;</td><td>' + ticket.t_m_tp_ji_t_m_tp_ji_ticket_qty + '</td></tr>' +
                                               '</table>';

                                           tickets[ticket.id] = ticket;

                                           /**
                                            * Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                                            */

                                           /**
                                            * Dibujo circulo con la misma libreria
                                            */
                                           tickets_geofences[ticket.id] = L.circle([ticket.latitude, ticket.longitude], {
                                               radius: 250,
                                               color: ticket.polygon_color
                                           }).bindPopup(ticket_html, {maxWidth: 500}).addTo(map);

                                           /**
                                            /// Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                                            // ///
                                            // let position_ticket = [];
                                            // let coordinate;
                                            //
                                            // if ((typeof ticket.polygon === 'string') && ticket.polygon != '')
                                            // {
                                                               //     coordinate = JSON.parse(ticket.polygon);
                                                               // }
                                            // else
                                            // {
                                                               //     coordinate = ticket.polygon;
                                                               // }
                                            // ///
                                            // /// Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                                            // ///
                                            // ///position_tracking.push([job.latitude, vehicle.longitude]);
                                            // for (let i = 0; i < coordinate.length; i++)
                                            // {
                                                               //     position_ticket.push([coordinate[i].lat, coordinate[i].lng]);
                                                               // }

                                            // tickets_geofences[ticket.id] = L.polygon(position_ticket, {
                                                               //     color: ticket.polygon_color,
                                                               // }).bindPopup(ticket_html).addTo(map);
                                            */
                                           tickets_geofences_description[ticket.id] = new L.Marker(
                                               null,
                                               {
                                                   icon: L.divIcon({
                                                                       html: '<div class="name" style="background-color: ' + convertHex(ticket.polygon_color_tag || ticket.polygon_color, 81) + '">' + ticket.name + _this.isEditableDraw(ticket.id) + '</div>',
                                                                       className: 'leaflet-popup-geofence',
                                                                       iconSize: 'auto'
                                                                   })
                                               }
                                           ).setLatLng(tickets_geofences[ticket.id].getBounds().getCenter()).addTo(map);

                                           /**
                                            * Levantamos popup de aviso de nuevo ticket
                                            */
                                           let ticket_html_info = 'Se acaba de crear nuevo Ticket ' +
                                               '<br/> ID: ' + ticket.t_m_tp_ji_ticket_code +
                                               '<br/> Nombre: ' + ticket.name +
                                               '<br/> Obra: ' + ticket.t_m_tp_sj_a_postal_code +
                                               '<br/> Cliente: ' + ticket.t_m_tp_sj_id +
                                               '<br/> Mixer: ' + ticket.vehicle_unit_code +
                                               '<br/>m³: ' + ticket.t_m_tp_ji_t_m_tp_ji_ticket_qty;

                                           /**
                                            * Si esta activado mostrar popup se mostrara
                                            */
                                           if (popup_window)
                                           {
                                               aztrack.popup.info('Nuevo Ticket', ticket_html_info);
                                           }
                                           /**
                                            * Luego que un ticket new llego al WebSocket, se procese a carga nuevamente el listado de ticket
                                            * Para que este sea reflejado en el listado de busqueda y uso y vuejs se encarge de pintalo en ese listado
                                            */
                                           /*_this.getTicketsAllUpdate();*/
                                       }
                                       else
                                       {
                                           console.error('TICKET | socketNew | ERROR: no contiene latitud y longitud <-> ticket id: ' + ticket.id);
                                       }
                                   });
                           });
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('TICKET | socketNew | ERROR _> ' + e);
            }
        }
    };

    _this.searchTicket = function (event)
    {

        _this.ticket_loading = true;

        if (this.ticket_search != '')
        {
            axios.get(api_url + '/tickets/all/' + user.id + '/search/' + _this.ticket_search)
                 .then((response) =>
                       {
                           _this.ticket_loading = false;
                           _this.tickets_plants = response.data.data;
                       }).catch(function (error)
                                {
                                    if (isDebugInfo)
                                    {
                                        console.log('Ocurrio un error no controlado:' + error); //isDebugInfo
                                    }
                                }).finally(() => (this.ticket_loading = false));
        }
        else
        {
            _this.getTicketsAll();
        }
    };


    _this.seachStatusdom = function (op)
    {

        document.getElementById("basicInputTicket").value = "";
        if (op == true)
        {
            $('#accordionTicketSearch').show();
            $('#accordionTicket').hide();

        }
        else
        {
            $('#msgerr').hide();
            $('#accordionTicketSearch').hide();
            $('#accordionTicket').show();
            //_this.getTicketsAll();
        }

    }

    _this.searchTicketForm = function (d)
    {

        //_this.ticket_search =  document.getElementById("basicInputTicket").value;
        //let d = _this.searchTicket;
        let  cont = '<div id="msgerr" class="alert alert-danger" role="alert"><center>Sin información para la busqueda...</center></div>';
        _this.seachStatusdom = true;
        let search =  document.getElementById("basicInputTicket").value;
        document.getElementById("basicInputTicket").value = "";
        let emp = "";
        if (search != '')
        {
            console.log("...");
            let s_ticket_code  = "s_ticket_code_"+search;
            let s_ticket       = "ticket_"+search;
            seachStatusdom = true;

            function formatd(cont)
            {
                let n = cont.search("<!-- PLT");
                conth = `<div class="divider divider-success"><div class="divider-text">`+cont.substring(n+8, n+40)+`</div></div>`
                conth = cont.substring(n+8, n+40)
                cont = conth + cont;
                return cont;
            }

            if (document.getElementById(s_ticket_code) != null)
            {
              cont = formatd(document.getElementById(s_ticket_code).innerHTML)
            }
            if (cont == "")
            {
                if(document.getElementById(s_ticket) != null)
                {
                    cont = formatd(document.getElementById(s_ticket).innerHTML)
                }
            }
        }
        else
        {
             _this.seachStatusdom = false;
             //_this.ticket_search =  document.getElementById("basicInputTicket").value;
              //let d = _this.searchTicket = ;

        }
        document.getElementById("accordionTicketSearch").innerHTML = cont;
    };



    _this.viewInfo = function (id)
    {
        if (isDebugInfo)
        {
            console.log(id); //isDebugInfo
        }
    };

    _this.view = function (id)
    {

        if (isDebugInfo)
        {
            console.log('Ticket ID: ' + id); //isDebugInfo
        }
        tickets.forEach(function (ticket, index)
        {
                            try
                            {
                                /**
                                 * Desmarcamos todos los demas checkbox para que solo este activo el selecionado
                                 */
                                if (ticket.id != id)
                                {
                                    document.getElementById('view_ticket_' + ticket.id).checked = false;
                                }
                                else
                                {
                                    document.getElementById('view_ticket_' + ticket.id).checked = true;
                                }
                            }
                            catch (e)
                            {
                                console.error('Error: ' + e);
                            }
        });
        /**
         * Ocultamos todos los demas ticket para poder visualizar el que selecionamos
         */
       _this.hiddenAllMinusById(id);

        let ticket = tickets_geofences[id];

        if (ticket != null)
        {
            let latLng = ticket.getLatLngs();
            let bounds = [latLng];
            let option = {};

            currentZoom = map.getZoom();
            /**
             * 0 == Selecionar todos
             */
            if (id == 0)
            {
                option.maxZoom = 4;
            }
            else
            {
                /**
                 * Verificamos si el Zoom esta al maximo en el mapa, si no
                 * se asignara que este al maximo, pero en la latitud y longitud dada por el ticket
                 */
                if (currentZoom < 15)
                {
                    option.maxZoom = 15;
                }
            }
            map.fitBounds(bounds, option);
        }
    };
    _this.getTicketsAll = async function ()
    {
        _this.ticket_loading = true;
        await axios.get(api_url + '/tickets/all/' + user.id)
                   .then((response) =>
                         {
                             _this.tickets_plants = response.data.data;
                             _this.tickets_plants_bk = response.data.data;
                             _this.ticket_loading = false;
                         })
                   .catch(function (error)
                          {
                              if (isDebugCatch)
                              {
                                  console.log('Ocurrio un error no controlado:' + error); //isDebugCatch
                              }
                          })
                   .finally(() => (this.ticket_loading = false));

        await this.paintAllTickets();

    };
    _this.getTicketsAllUpdate = function ()
    {
        _this.ticket_loading = true;
        axios.get(api_url + '/tickets/all/' + user.id)
             .then((response) =>
                   {
                       _this.tickets_plants = response.data.data;
                       _this.tickets_plants_bk = response.data.data;
                       _this.ticket_loading = false;
                   })
             .catch(function (error)
                    {
                        if (isDebugCatch)
                        {
                            console.log('Ocurrio un error no controlado:' + error); //isDebugCatch
                        }
                    })
             .finally(() => (this.ticket_loading = false));

    };

    _this.cleanAll = function ()
    {
        if (tickets_geofences.length > 0)
        {
            tickets_geofences.forEach(function (valor, id)
            {
                                          try
                                          {
                                              if (typeof tickets_geofences[id] !== 'undefined')
                                              {
                                                  tickets_geofences.removeLayer(tickets[id]);
                                              }
                                              else
                                              {
                                                  if (isDebugInfo)
                                                  {
                                                      console.log('Ticket ID: ' + id + ' undefined');//isDebugInfo
                                                  }
                                              }
                                          }
                                          catch (e)
                                          {
                                              console.error('Error: ' + e);
                                          }
            });
        }
        tickets_geofences = [];
    };
    _this.paintAllTickets = function ()
    {
        if (isDebugInfo)
        {
            console.log('paintAllTickets');//isDebugInfo
        }
        _this.tickets_plants.forEach(function (plant, index)
                                     {
                                         /**
                                          * Verificamos que la planta tenga ticket asignados
                                          */
                                         if (plant.tickets.length)
                                         {
                                             /**
                                              * Recorremoces los tickets asignados a la planta
                                              */
                                             plant.tickets.forEach(function (ticket, id)
                                                                   {
                                                                       _this.add(ticket);
                                                                       /**
                                                                        * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
                                                                        */
                                                                       if (vehiclesView == false)
                                                                       {
                                                                           _this.delete(ticket.id);
                                                                       }
                                                                   });
                                         }
                                     });

        /**
         * Generamos conexion con el WebSocket
         */
        _this.socketState();
        _this.socketTicketDelete();
        _this.socketTicketNew();
        _this.geofenceStatus();

        /***
         * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
         */
        if (ticketsView == false)
        {
            if (isDebugInfo)
            {
                console.log("Se ocultan los tickets ya que esta desactivada la opcion"); //isDebugInfo
            }
            _this.hiddenAll();
        }


    };
    _this.showHidden = function (id)
    {
        /**
         * Tomamos el valor de check para revisar si esta On o Off
         */
        let isChecked = document.getElementById('geofence_ticket_' + id).checked;
        if (isChecked)
        {
            /**
             * Agregamos al ticket al listado
             */
            _this.show(id);
        }
        else
        {
            /**
             * Eliminamos al ticket del listado
             */
            _this.delete(id);
        }
    };
    _this.hiddenAll = function ()
    {

        /**
         * Enviamos a ocultar todos los camiones del mapa
         */

        ticketsView = false;
        _this.ticketsView = false;
        ls.setItem("ticketsView", false);

        tickets.forEach(function (valor, index)
                        {
                            try
                            {
                                /**
                                 /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                                 ///
                                 //document.getElementById('ticket_' + id).checked = false;
                                 ///
                                 /// Enviamos el ticket para que se desmarque de la pantalla del mapa.
                                 */
                                _this.delete(ticket.id);
                            }
                            catch
                                (e)
                            {
                                console.error('Error: ' + e);
                            }
                        }
        );
    };

    _this.hiddenAllMinusById = function (id)
    {
        /**
         * Tomamos el valor de check para revisar si esta On o Off
         */
        let isChecked = document.getElementById('tickets_geofences_all').checked;

        if (isChecked)
        {
            document.getElementById('tickets_geofences_all').checked = false;
        }
        else
        {
            document.getElementById('tickets_geofences_all').checked = false;
        }

        tickets.forEach(function (ticket, index)
                        {
                            try
                            {
                                /**
                                 * Enviamos a desactivar todos los tickets y eliminarlo visiblemente del mapa
                                 * menos el que nos apretaron click, ese debe conservar el check marcado y
                                 * la visibilidad en el mapa
                                 */
                                if (ticket.id != id)
                                {
                                    document.getElementById('geofence_ticket_' + ticket.id).checked = false;
                                    _this.delete(ticket.id);
                                }
                                else
                                {
                                    document.getElementById('geofence_ticket_' + ticket.id).checked = true;
                                    _this.show(id);
                                }
                            }
                            catch (e)
                            {
                                console.error('Error: ' + e);
                            }
                        });

    };


    _this.showHiddenAll = function ()
    {
        /**
         * Tomamos el valor de check para revisar si esta On o Off
         */
        let isChecked = document.getElementById('tickets_geofences_all').checked;

        if (isChecked)
        {
            ticketsView = true;
            _this.ticketsView = true;
            ls.setItem("ticketsView", true);
        }
        else
        {
            ticketsView = false;
            _this.ticketsView = false;
            ls.setItem("ticketsView", false);
        }

        tickets.forEach(function (valor, id)
                        {
                            try
                            {
                                if (typeof tickets[id] !== 'undefined')
                                {
                                    if (isChecked)
                                    {
                                        /**
                                         * Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                                         */
                                        document.getElementById('geofence_ticket_' + id).checked = true;
                                        /**
                                         * Enviamos el ticket para que se vuelva a hacer visible en la pantalla del mapa.
                                         */
                                        _this.show(id);
                                    }
                                    else
                                    {
                                        /**
                                         * Marcamos el checkbox desactivado del vehiculo para no mostrar
                                         */
                                        document.getElementById('geofence_ticket_' + id).checked = false;
                                        /**
                                         * Enviamos el ticket para que se desmarque de la pantalla del mapa.
                                         */
                                        _this.delete(id);
                                    }
                                }
                                else
                                {
                                    if (isDebugInfo)
                                    {
                                        console.log('Ticket ID: ' + id + ' undefined');//isDebugInfo
                                    }
                                }
                            }
                            catch (e)
                            {
                                console.error('Error: ' + e);
                            }
                        });

    };

    _this.show = function (id)
    {
        tickets_geofences[id].addTo(map);
        tickets_geofences_description[id].addTo(map);
    };

    _this.hidden = function (id)
    {
        tickets_geofences[id].remove();
        tickets_geofences_description[id].remove();
    };

    _this.addEditableTicket = function (editable_ticketsin = null)
    {
        editable_tickets = editable_ticketsin;
    }

    _this.isEditableDraw = function (id)
    {
        try
        {
            if (editable_tickets.includes(id))
            {
                return '<a href="/cpadmin/maintainer/ticket/' + id + '/edit"> [Editar]<a>';
            }
        }
        catch (error)
        {
            return '';
        }
        return '';
    }
}


/**
 * Libreria para manipulación el mensaje de SOS en el sistema
 */
function Sos()
{
    let _this = this;

    _this.socket = function ()
    {
        if (isDebugInfo)
        {
            console.log('SOS | SOCKET | iniciando funcion socket'); //isDebugInfo
        }
        try
        {
            plants.forEach(function (data, index)
                           {
                               data.plants.forEach(function (pit, index)
                                                   {
                                                       if (isDebugInfo)
                                                       {
                                                           console.log('VEHICLE | WEBSOCKET | CHANNEL | sos-message_' + pit.id + ' | OK'); //isDebugInfo
                                                       }
                                                       Echo.channel('POL_PROD_MOVE_sos-message_' + pit.id).listen('SosMessageEvent', (e) =>
                                                                                                    {
                                                                                                        let sos = e.message;

                                                                                                        if (isDebugInfo)
                                                                                                        {
                                                                                                            console.log('SOS | socket | RECIBIENDO MENSAJE _> ' + sos.id); //isDebugInfo
                                                                                                        }


                                                                                                        let modal_sos_message = 'modal_sos_message';
                                                                                                        let html = '  Acaba de ser enviado un mensaje de SOS <br/>se ha generado una emergencia en un operador\n' +
                                                                                                            '                        del camión, los datos del chofer son los siguientes:\n' +
                                                                                                            '                        <br/>Planta: ' + dbPlants[sos.plants_id].name + '\n' +
                                                                                                            '                        <br/>Mixer: ' + dbVehicles[sos.vehicles_id].name + '\n' +
                                                                                                            '                        <br/>Tipo: ' + sos.type_message;
                                                                                                        $('#modal_sos_message_body').html(html);

                                                                                                        $('#modal_sos_message').modal('show');


                                                                                                        let latLng = vehicles_markers[sos.vehicles_id].getLatLng();
                                                                                                        let bounds = [latLng];
                                                                                                        let option = {};

                                                                                                        currentZoom = map.getZoom();

                                                                                                        ///
                                                                                                        /// Verificamos si el Zoom esta al maximo en el mapa, si no
                                                                                                        /// se asignara que este al maximo, pero en la latitud y longitud dada por el vehiculo
                                                                                                        ///
                                                                                                        if (currentZoom < 16)
                                                                                                        {
                                                                                                            option.maxZoom = 16;
                                                                                                        }


                                                                                                        map.fitBounds(bounds, option);

                                                                                                    },
                                                       );
                                                   });
                           });
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | ERROR _> ' + e)
            }
        }
    };

}

/**
 * aztrack variable de controladores del sistema
 */
var aztrack = {
    url: {
        ajax: {
            time: 3000,
        },
        controlling: {
            updateLoadIncomplete: api_host + '/v1/geofence/load/incomplete?api_token=' + api_token,
            updateLoadComplete: api_host + '/v1/geofence/load/complete?api_token=' + api_token,
            updateLoadScheduled: api_host + '/v1/geofence/load/scheduled?api_token=' + api_token,
        }
    },
    truck: {
        status: {
            commands: {
                ack: 1,
                en_ruta: 2,
                en_obra: 3,
                descargando: 4,
                a_planta: 5,
                en_planta: 6
            },
        }
    },
    alert: new Alert(),
    sos: new Sos(),
    popup: new Popup(),
    ticket: new Ticket(),
    vehicle: new Vehicle(),
    vehicleRent: new VehicleRent(),
    vehicleBulk: new VehicleBulk(),
    plant: new Plant(),
    job: new Job(),
    workshop: new Workshop(),
    coverage: new Coverage(),
    updateDashboard: new UpdateDashboard(),
    serviceWorksheet: new ServiceWorksheet(),

};



var azmap = {
    polygon:
        {
            delete: function (id)
            {
                polygon[id].setMap(null);
            },
            show: function (id, map)
            {
                polygon[id].setMap(map);
            }
        }
};


var styles = {
    default: null,
    silver: [
        {
            elementType: 'geometry',
            stylers: [{color: '#f5f5f5'}]
        },
        {
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [{color: '#f5f5f5'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#bdbdbd'}]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#dadada'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#c9c9c9'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
        }
    ],

    night: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
        }
    ],

    retro: [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
        }
    ],

    hiding: [
        {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
        },
        {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
        }
    ]
};

/**
 * Libreria para manipulación de poligono de Worksheet en el sistema
 */
function ServiceWorksheet()
{
    let _this = this;
    _this.show = function (id)
    {
        try
        {
            if (typeof services_worksheets_geofences[id] !== 'undefined')
            {
                services_worksheets_geofences[id].addTo(map);
                services_worksheets_geofences_description[id].addTo(map);
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('worksheet | SHOW | NO EXISTE ID _> ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('worksheet | ADD | ERROR _> ' + E);
            }
        }
    };

    _this.delete = function (id)
    {
        try
        {
            if (typeof services_worksheets_geofences[id] !== 'undefined')
            {
                services_worksheets_geofences[id].remove();
                services_worksheets_geofences_description[id].remove();
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('TICKET | delete | No existe la plants_goefences ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('TICKET | delete | ERROR _> ' + e)
            }
        }
    };

    _this.add = function (worksheet)
    {
        try
        {

            if ((typeof worksheet.position !== 'undefined') && !isEmpty(worksheet.position))
            {
                ///
                /// Agregamos a la variable global el objecto service_worksheet
                ///
                services_worksheets[worksheet.id] = worksheet;

                ///
                /// Agregamos la GEOCERCA a la matrix para el manejo
                /// Agregamos el TAG a la matrix para el manejo
                ///
                services_worksheets_geofences[worksheet.id] = L.circle(worksheet.position, {
                    radius: worksheet.radius,
                    color: worksheet.polygon_color,
                    weight: 3,
                    opacity: 1,
                    fill: true,
                    fillOpacity: 0.3,
                    fillColor: worksheet.polygon_color_border,
                }).addTo(map);

                services_worksheets_geofences_description[worksheet.id] = new L.Marker(null, {
                    icon: L.divIcon({
                                        html: '<div class="name" style="background-color: ' + convertHex(worksheet.polygon_color_tag || worksheet.polygon_color, 81) + '">' + worksheet.name + '</div>',
                                        className: 'leaflet-popup-geofence',
                                        iconSize: 'auto'
                                    })
                }).setLatLng(services_worksheets_geofences[worksheet.id].getBounds().getCenter()).addTo(map);

            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('Taller sin geocerca: ' + worksheet.id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('worksheet | add | ERROR _> ' + e);
            }
        }
    };

    _this.addJobOld = function (data)
    {
        let strokeColor = "#FF0000";
        let fillColor = "#FF0000";
        let type_app = "S/I";

        switch (data.type_app)
        {
            case 1:
            {
                strokeColor = "#FF0000";
                fillColor = "#FF0000";
                type_app = "Sistema Comercial";
                break;
            }
            case 2:
            {
                strokeColor = "#000000";
                fillColor = "#000000";
                type_app = "Sincronización Base de datos";
                break;
            }
            case 3:
            {
                strokeColor = "#FFFF00";
                fillColor = "#FFFF00";
                type_app = "App OnBoard";
                break;
            }
        }

        let lanLngCenter;
        let txtInfo = "<table><tr><td><strong>Fecha:</strong></td><td>&nbsp;" + data.updated_at + "</td></tr>";
        if (data.users_id)
        {
            txtInfo += "<tr><td><strong>Usuario:</strong></td><td>&nbsp;" + data.name + "</td></tr>";
        }
        txtInfo += "<tr><td><strong>Aplicación:</strong></td><td>&nbsp;" + type_app + "</td></tr>";
        txtInfo += "</table>";

        services_worksheets_circle_old_info[data.id] = new google.maps.InfoWindow({
                                                                                      content: txtInfo
                                                                                  });

        lanLngCenter = new google.maps.LatLng(data.latitude, data.longitude);

        services_worksheets_circle_old[data.id] = new google.maps.Circle({
                                                                             map: map,
                                                                             radius: 600,
                                                                             strokeColor: strokeColor,
                                                                             fillColor: fillColor,
                                                                             strokeOpacity: 0.8,
                                                                             strokeWeight: 2,
                                                                             center: lanLngCenter
                                                                         });

        google.maps.event.addListener(services_worksheets_circle_old[data.id], 'click', function (ev)
        {
            services_worksheets_circle_old_info[data.id].setPosition(services_worksheets_circle_old[data.id].getCenter());
            services_worksheets_circle_old_info[data.id].open(map);
        });
    };
    _this.showHidden = function (id)
    {
        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('geofence_worksheet_' + id).checked;
        if (isChecked)
        {
            ///
            /// Agregamos la planta al mapa
            ///
            _this.show(id);
        }
        else
        {
            ///
            /// Eliminamos la planta del mapa
            ///
            _this.hidden(id);
        }
    };

    _this.showHiddenAll = function ()
    {

        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('services_worksheets_geofences_all').checked;
        let _this = this;

        if (isChecked)
        {
            services_worksheetsView = true;
            this.services_worksheetsView = true;
            ls.setItem("services_worksheetsView", true);
        }
        else
        {
            services_worksheetsView = false;
            this.services_worksheetsView = false;
            ls.setItem("services_worksheetsView", false);
        }


        services_worksheets.forEach(function (worksheet, index)
                                    {
                                        if (isChecked)
                                        {
                                            ///
                                            /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                                            ///
                                            document.getElementById('geofence_worksheet_' + worksheet.id).checked = true;
                                            ///
                                            /// Enviamos la planta para que se vuelva a hacer visible en la pantalla del mapa.
                                            ///
                                            _this.show(worksheet.id);
                                        }
                                        else
                                        {
                                            ///
                                            /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                                            ///
                                            document.getElementById('geofence_worksheet_' + worksheet.id).checked = false;
                                            ///
                                            /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                                            ///
                                            _this.hidden(worksheet.id);
                                        }
                                    });
    };

    _this.hiddenAll = function ()
    {
        services_worksheets.forEach(function (wokshop, id)
                                    {
                                        ///
                                        /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                                        ///
                                        ///document.getElementById('geofence_worksheet_' + id).checked = false;
                                        ///
                                        /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                                        ///
                                        _this.delete(wokshop.id);
                                    });
    };
    /*
     _this.show = function (id)
     {
     services_worksheets_geofences[id].addTo(map);
     services_worksheets_geofences_description[id].addTo(map);
     };
     */
    _this.hidden = function (id)
    {
        services_worksheets_geofences[id].remove();
        services_worksheets_geofences_description[id].remove();
    };

    _this.view = function (id)
    {
        if (isDebugInfo)
        {
            console.log('worksheet ID: ' + id); //isDebugInfo
        }

        services_worksheets.forEach(function (worksheet, index)
                                    {
                                        try
                                        {
                                            /**
                                             * Desmarcamos todos los demas checkbox para que solo este activo el selecionado
                                             */
                                            if (worksheet.id != id)
                                            {
                                                document.getElementById('view_worksheet_' + worksheet.id).checked = false;
                                                document.getElementById('geofence_worksheet_' + worksheet.id).checked = false;
                                            }
                                            else
                                            {
                                                document.getElementById('geofence_worksheet_' + worksheet.id).checked = true;
                                            }
                                        }
                                        catch (e)
                                        {
                                            console.error('Error: ' + e);
                                        }
                                    });

        let worksheet = services_worksheets_geofences[id];

        if (worksheet != null)
        {
            let latLng = worksheet.getLatLngs();
            let bounds = [latLng];
            let option = {};

            currentZoom = map.getZoom();
            ///
            /// 0 == Selecionar todos
            ///
            if (id == 0)
            {
                option.maxZoom = 4;
            }
            else
            {
                ///
                /// Verificamos si el Zoom esta al maximo en el mapa, si no
                /// se asignara que este al maximo, pero en la latitud y longitud dada por el ticket
                ///
                if (currentZoom < 15)
                {
                    option.maxZoom = 15;
                }
            }
            map.fitBounds(bounds, option);
        }
    };

};

function Controlling()
{
    let _this = this;

    _this.updateLoadIncomplete = function ()
    {
        Echo.channel('POL_PROD_MOVE_home').listen('NewMessage', (e) =>
        {
            if (isDebugInfo) {
                console.log(e); //isDebugInfo
            }
            $("#updateLoadIncomplete").html(e.message);
        });
    };
    _this.updateLoadIncompleteAjax = function ()
    {
        $.ajax({
                   data: '',
                   url: app.url.controlling.updateLoadIncomplete,
                   type: 'GET',
                   dataType: 'JSON',
                   success: function (res)
                   {
                       dd(res.data);
                       $("#updateLoadIncomplete").html(res.data);
                   },
                   error: function (data)
                   {
                       if (isDebugInfo) {
                           console.log('Error:', data); //isDebugInfo
                       }
                       //$('#saveBtn').html('Save Changes');
                   }
               });
    };
    _this.updateLoadCompleteAjax = function ()
    {
        $.ajax({
                   data: '',
                   url: app.url.controlling.updateLoadComplete,
                   type: 'GET',
                   dataType: 'JSON',
                   success: function (res)
                   {
                       dd(res.data);
                       $("#updateLoadComplete").html(res.data);
                   },
                   error: function (data)
                   {
                       if (isDebugInfo) {
                           console.log('Error:', data); //isDebugInfo
                       }
                       //$('#saveBtn').html('Save Changes');
                   }
               });
    };

    _this.updateLoadScheduledAjax = function ()
    {
        $.ajax({
                   data: '',
                   url: app.url.controlling.updateLoadScheduled,
                   type: 'GET',
                   dataType: 'JSON',
                   success: function (res)
                   {
                       dd(res.data);
                       $("#updateLoadScheduled").html(res.data);
                   },
                   error: function (data)
                   {
                       if (isDebugInfo) {
                           console.log('Error:', data); //isDebugInfo
                       }
                       //$('#saveBtn').html('Save Changes');
                   }
               });
    };
};

function UpdateDashboard()
{
    let _this = this;

    _this.update = function(plant_id)
    {
        axios
            .get('/cpadmin/ajax/dashboard/'+plant_id)
            .then((response)=>{
                let data = response.data.data;
                document.getElementById('load_scheduled').innerHTML             = data.load_scheduled ;
                document.getElementById('load_incomplete_cycle').innerHTML      = data.load_incomplete_cycle ;
                document.getElementById('load_complete_cycle').innerHTML        = data.load_complete_cycle ;


                document.getElementById('plant_mouths').innerHTML               = data.plant_mouths ;
                document.getElementById('plant_vehicles').innerHTML             = data.plant_vehicles ;
                document.getElementById('plant_devices').innerHTML              = data.plant_devices ;
                document.getElementById('tickets_processed').innerHTML          = data.tickets_processed ;


                document.getElementById('vehicles_not_cycle').innerHTML         = data.vehicles_not_cycle ;

                document.getElementById('vehicles_in_workshop').innerHTML       = data.vehicles_in_workshop ;
                document.getElementById('vehicles_not_transmission').innerHTML  = data.vehicles_not_transmission ;
                document.getElementById('vehicles_in_plant').innerHTML          = data.vehicles_in_plant ;



                document.getElementById('vehicles_cycle').innerHTML             = data.vehicles_cycle ;

                document.getElementById('vehicles_loading').innerHTML           = data.vehicles_loading ;
                document.getElementById('vehicles_to_job').innerHTML            = data.vehicles_to_job ;
                document.getElementById('vehicles_in_job').innerHTML            = data.vehicles_in_job ;
                document.getElementById('vehicles_downloading').innerHTML       = data.vehicles_downloading ;
                document.getElementById('vehicles_to_plant').innerHTML          = data.vehicles_to_plant ;

                let vehicles_last_movelemts = response.data.data.vehicles_last_movements;
                let tr = "";
                let index = 1;
                vehicles_last_movelemts.forEach(vehicle =>
                               {
                                   tr +=  `<tr>
                                                <td>${index}</td>
                                                <td>
                                                    <div class="d-inline-block align-middle">
                                                        <img src="/assets/truck.png" alt=""
                                                             class="img-radius wid-40 align-top m-r-15">
                                                        <div class="d-inline-block pt-2 mt-1">
                                                            <h6>MX-${vehicle.truck_code}</h6>
                                                            <p class="text-muted m-b-0"></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>${vehicle.updated_at}</td>
                                                <td>${vehicle.t_m_tp_ji_ticket_code}</td>
                                                <td>${vehicle.t_m_tp_ji_t_m_tp_ji_ticket_qty}</td>`
                                   if(vehicle.state === 0)
                                   {
                                       tr+= `<td className="text-center">
                                                <label className="badge badge-light-danger">Rechazado</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 1)
                                   {
                                       tr+= `<td className="text-center">
                                                <label className="badge badge-light-danger">Cargando</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 2)
                                   {
                                       tr+= `<td className="text-center">
                                              <label class="badge badge-light-danger">Cargando</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 4)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">A obra</label>
                                            </td>`
                                   }

                                   else if(vehicle.state === 5)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">En obra</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 8)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">Descargando</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 12)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">A planta</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 13)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">En planta</label>
                                            </td>`
                                   }
                                   else
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">Otro</label>
                                            </td>`
                                   }

                                   if(vehicle.transmit === true)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-success">Ok</label>
                                            </td>`
                                   }
                                   else if(vehicle.transmit === false)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge-danger">Falla</label>
                                            </td>`
                                   }
                                   else
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge">Revisar</label>
                                            </td>`
                                   }

                                    tr += '</tr>'
                                    index++;
                               });
                $('#tbody_vehicle_last_movements').empty().append(tr);
                console.log('Datos Actualizados');
                }).catch(function (error)
                                     {
                                         if (isDebugCatch)
                                         {
                                             console.error("AJAX | ERROR _> " + error);
                                         }
                                    });
    }
    _this.reload = function ()
    {
        setInterval(function () {
            _this.update($('#select_plant option:selected').val());
        //}, 30000);
      }, ajax_timer);
    };
}