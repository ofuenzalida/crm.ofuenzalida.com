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
