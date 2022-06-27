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
