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
