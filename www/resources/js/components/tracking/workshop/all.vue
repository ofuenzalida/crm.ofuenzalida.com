<template>
    <div class="asdf">
        <div v-if="workshop_loading">
            <vs-progress :height="10" indeterminate color="success"></vs-progress>
        </div>
        <div v-else>
            <div v-if="!plants_workshops.length" ref="content">
                No existén talleres asignados a su usuario
            </div>
            <div v-else>
                <div class="search-wrapper">
                    <div class="row">
                        <div class="offset-xl-1 col-xl-10 mb-1">
                            <fieldset class="form-group">
                                <input id="search_plant_coverage" class="form-control" type="text"
                                       v-model="plants_workshops_search"
                                       placeholder="Buscador..."/>
                            </fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-12 mb-1">
                            <div v-if="!plants_workshops_search.length">
                                <p class="mb-0">Seleccionar Todo</p>
                                <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                                    <input v-if="(workshopsView == true)" v-on:click="showHiddenAllWorkshops()"
                                           type="checkbox"
                                           class="custom-control-input"
                                           id="workshops_geofences_all" checked>

                                    <input v-else v-on:click="showHiddenAllWorkshops()" type="checkbox"
                                           class="custom-control-input"
                                           id="workshops_geofences_all">

                                    <label class="custom-control-label" for="workshops_geofences_all">
                                        <span class="switch-text-left">On</span>
                                        <span class="switch-text-right">Off</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(workshop, index) in filteredList">
                    <div v-if="workshop.id">
                        <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                            <input v-if="(workshopsView == true)" type="checkbox"
                                   class="custom-control-input view_geofence_map" checked
                                   :name="workshop.id" :id="'geofence_workshop_'+workshop.id"
                                   v-on:click="showHiddenWorkshop(workshop.id)">
                            <input v-else type="checkbox" class="custom-control-input view_geofence_map"
                                   :name="workshop.id" :id="'geofence_workshop_'+workshop.id"
                                   v-on:click="showHiddenWorkshop(workshop.id)">


                            <label class="custom-control-label" :for="'geofence_workshop_'+workshop.id">
                                <span class="switch-text-left">On</span>
                                <span class="switch-text-right">Off</span>
                            </label>
                            <span class="menu-title" data-toggle="tooltip" data-html="true"
                                  :title="workshop.id">
                            {{ workshop.name }}
                                <li class="d-inline-block mr-2">
                                            <fieldset>
                                                <div class="vs-radio-con vs-radio-success">
                                                    <input type="radio" name="view_ticket" value="false"
                                                           :id="'view_workshop_'+workshop.id"
                                                           v-on:click="viewWorkShop(workshop.id)"/>
                                                    <span class="vs-radio">
                                                        <span class="vs-radio--border"></span>
                                                        <span class="vs-radio--circle"></span>
                                                     </span>
                                                    <br/>
                                                    <span class="">Ver</span>
                                                </div>
                                            </fieldset>
                                      </li>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data()
    {
        return {
            plants_workshops: [],
            plants_workshops_search: '',
            workshop_loading: true,
            workshopsView: true,
        }
    },
    mounted()
    {
        this.$nextTick(function ()
        {
            /**
             * Verificamos si existe plantsView en el storage local si no existe,
             * lo crea por defecto en TRUE
             */
            workshopsView = ls.getItem('workshopsView')
            if (workshopsView === null)
            {
                workshopsView = true;
                ls.setItem("workshopsView", true);
            }
            this.workshopsView = workshopsView;

            this.getGeofencesWorkshops();
        })
        console.log('Component workshops-all load');
    },
    methods: {
        viewWorkShop: function (id)
        {
            console.log('Workshop ID: ' + id);
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
        },
        getGeofencesWorkshops()
        {
            axios.get(api_url + '/workshops/all/' + user.id)
                .then((response) =>
                {
                    this.plants_workshops = response.data.data;
                    this.workshop_loading = false;
                    ///
                    /// Enviamos a pintar en pantalla las geocergas de coberturas
                    ///
                    this.paintWorkshopsGeofences();
                }).catch(function (error)
            {
                console.log('Ocurrio un error no controlado: ' + error);
            }).finally(() => (this.workshop_loading = false));
        },
        paintWorkshopsGeofences: function ()
        {
            this.plants_workshops.forEach(function (workshop, indice)
            {
                aztrack.workshop.add(workshop);
            });

            /***
             * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
             */
            if (JSON.parse(workshopsView) == false)
            {
                if (isDebugInfo)
                {
                    console.log("Se ocultan las georcecas de tallares ya que esta desactivada la opcion");
                }
                this.hiddenAllWorkshops();
            }

        },
        showHiddenWorkshop: function (id)
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
                this.showWorkshop(id);
            }
            else
            {
                ///
                /// Eliminamos la planta del mapa
                ///
                this.hiddenWorkshop(id);
            }
        },
        showHiddenAllWorkshops: function ()
        {

            ///
            /// Tomamos el valor de check para revisar si esta On o Off
            ///
            let isChecked = document.getElementById('workshops_geofences_all').checked;
            var _this = this;

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


            workshops_geofences.forEach(function (valor, id)
            {
                if (isChecked)
                {
                    ///
                    /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                    ///
                    document.getElementById('geofence_workshop_' + id).checked = true;
                    ///
                    /// Enviamos la planta para que se vuelva a hacer visible en la pantalla del mapa.
                    ///
                    _this.showWorkshop(id);
                }
                else
                {
                    ///
                    /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                    ///
                    document.getElementById('geofence_workshop_' + id).checked = false;
                    ///
                    /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                    ///
                    _this.hiddenWorkshop(id);
                }
            });
        },
        hiddenAllWorkshops: function ()
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
                aztrack.workshop.delete(wokshop.id);
            });
        },
        showWorkshop: function (id)
        {
            workshops_geofences[id].addTo(map);
            workshops_geofences_description[id].addTo(map);
        },
        hiddenWorkshop: function (id)
        {
            workshops_geofences[id].remove();
            workshops_geofences_description[id].remove();
        },
    },
    computed: {
        filteredList: function ()
        {
            return this.plants_workshops.filter((plant_workshop) =>
            {
                return plant_workshop.search.toLowerCase().includes(this.plants_workshops_search.toLowerCase());
            });
        }
    }
};
</script>
