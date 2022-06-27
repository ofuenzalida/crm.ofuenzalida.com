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
