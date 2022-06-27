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

