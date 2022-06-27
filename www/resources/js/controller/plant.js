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
