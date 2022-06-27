<template>
    <div class="asdf">
        <div v-if="loading">
            <vs-progress :height="10" indeterminate color="success"></vs-progress>
        </div>
        <div v-else>
            <div v-if="!plants_geofences.length" ref="content">
                No existén plantas asignadas a su usuario
            </div>
            <div v-else>
                <div class="search-wrapper">
                    <div class="row">
                        <div class="offset-xl-1 col-xl-10 mb-1">
                            <fieldset class="form-group">
                                <input id="basicInput" class="form-control" type="text"
                                       v-model="plants_geofences_search"
                                       placeholder="Buscador..."/>
                            </fieldset>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-12 mb-1">
                            <div v-if="!plants_geofences_search.length">
                                <p class="mb-0">Seleccionar Todo</p>
                                <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                                    <input v-if="(plantsView == true)" v-on:click="showHiddenAllPlants()"
                                           type="checkbox"
                                           class="custom-control-input"
                                           id="plants_geofences_all" checked>

                                    <input v-else v-on:click="showHiddenAllPlants()" type="checkbox"
                                           class="custom-control-input"
                                           id="plants_geofences_all">

                                    <label class="custom-control-label"
                                           for="plants_geofences_all">
                                        <span class="switch-text-left">On</span>
                                        <span class="switch-text-right">Off</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(plant_geofence, index) in filteredList">
                    <div v-if="plant_geofence.id">
                        <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                            <input v-if="(plantsView == true)" type="checkbox"
                                   class="custom-control-input view_geofence_map"
                                   checked
                                   :name="plant_geofence.id" :id="'geofence_plant_'+plant_geofence.id"
                                   v-on:click="showHiddenPlant(plant_geofence.id)">

                            <input v-else type="checkbox" class="custom-control-input view_geofence_map"
                                   :name="plant_geofence.id" :id="'geofence_plant_'+plant_geofence.id"
                                   v-on:click="showHiddenPlant(plant_geofence.id)">

                            <label class="custom-control-label" :for="'geofence_plant_'+plant_geofence.id">
                                <span class="switch-text-left">On</span>
                                <span class="switch-text-right">Off</span>
                            </label>
                            <span class="menu-title" data-toggle="tooltip" data-html="true"
                                  :title="plant_geofence.id">
                                   {{ plant_geofence.name }}&nbsp;
                                <span v-if="plant_geofence.plants.length">
                                    (
                                    <span v-for="(plant, index) in plant_geofence.plants">
                                        {{ plant.plant_code }}<span
                                        v-if="plant_geofence.plants.length > (index+1)"> || </span>
                                    </span>
                                    )
                                </span>
                                <br/>
                                <li class="d-inline-block mr-2">
                                                <fieldset>
                                                    <div class="vs-radio-con vs-radio-success">
                                                        <input type="radio" name="view_plant" value="false"
                                                               :id="'view_plant_'+plant_geofence.id"
                                                               v-on:click="viewPlant(plant_geofence.id)"/>
                                                        <span class="vs-radio">
                                                            <span class="vs-radio--border"></span>
                                                            <span class="vs-radio--circle"></span>
                                                         </span>
                                                        <span class="">Ver</span>
                                                    </div>
                                                </fieldset>
                                </li>
                            </span>
                        </div>
                    </div>
                    <br/>
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
            plants_geofences: [],
            plants_geofences_search: '',
            loading: true,
            plantsView: true
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
            plantsView = ls.getItem('plantsView')
            if (plantsView === null)
            {
                plantsView = true;
                ls.setItem("plantsView", true);
            }
            else
            {
                plantsView = JSON.parse(plantsView);
            }
            this.plantsView = plantsView;

            this.getGeofencesPlants();
        })
        console.log('Component plants-all load');
    },
    methods: {
        getGeofencesPlants()
        {
            axios.get(api_url + '/plants/all/' + user.id)
                .then((response) =>
                {
                    this.plants_geofences = response.data.data;
                    this.loading = false;
                    ///
                    /// Enviamos a pintar en pantalla las geocergas de plantas
                    ///
                    this.paintPlantsGeofences();
                }).catch(function (error)
            {
                console.log('Ocurrio un error no controlado: ' + error);
            });
        },
        paintPlantsGeofences: function ()
        {
            this.plants_geofences.forEach(function (plant, indice)
            {
                aztrack.plant.add(plant);
            });

            /***
             * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
             */
            if (plantsView == false)
            {
                if (isDebugInfo)
                {
                    console.log("Se ocultan las plantas ya que esta desactivada la opcion");
                }
                this.hiddenAllPlants();
            }
        },
        showHiddenPlant: function (id)
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
                aztrack.plant.show(id);
            }
            else
            {
                ///
                /// Eliminamos la planta del mapa
                ///
                aztrack.plant.delete(id);
            }
        },
        showHiddenAllPlants: function ()
        {
            ///
            /// Tomamos el valor de check para revisar si esta On o Off
            ///
            let isChecked = document.getElementById('plants_geofences_all').checked;
            var _this = this;

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

            plants_geofences.forEach(function (valor, id)
            {
                if (isChecked)
                {
                    ///
                    /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                    ///
                    document.getElementById('geofence_plant_' + id).checked = true;
                    ///
                    /// Enviamos la planta para que se vuelva a hacer visible en la pantalla del mapa.
                    ///
                    aztrack.plant.show(id);
                }
                else
                {
                    ///
                    /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                    ///
                    document.getElementById('geofence_plant_' + id).checked = false;
                    ///
                    /// Enviamos la planta para que se desmarque de la pantalla del mapa.
                    ///
                    aztrack.plant.delete(id);
                }

            });

        },
        hiddenAllPlants: function ()
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
                aztrack.plant.delete(id);

            });

        },
        viewPlant: function (id)
        {

            if (isDebugInfo)
            {
                console.log('VUE | plant | viewPlant | ID: ' + id);
            }

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
        },
        openLoading()
        {
            this.$vs.loading({
                //type: 'circles',
                target: this.$refs.content,
                color: 'dark',
            });
        },
        openLoadingButton()
        {
            // console.log(this.$refs.button.$el)
            const loading = this.$vs.loading({
                target: this.$refs.button,
                scale: '0.6',
                background: 'primary',
                opacity: 1,
                color: '#fff'
            })
            setTimeout(() =>
            {
                loading.close()
            }, 3000)
        }
    },
    computed: {
        filteredList()
        {
            return this.plants_geofences.filter(plant_geofence =>
            {
                return plant_geofence.search.toLowerCase().includes(this.plants_geofences_search.toLowerCase())
            });
        }
    }
};
</script>
