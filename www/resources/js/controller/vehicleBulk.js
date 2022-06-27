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

