<template>
    <div class="letruta asdf">
        <div>
            <div class="search-wrapper">
                <div class="row">
                    <div class="offset-xl-1 col-xl-10 mb-1">
                        <div class="row">
                            <div class="col-9">
                                <input id="basicInput" class="form-control" type="text" v-model="vehicle_rent_search"
                                       @change="searchVehicleRent($event)"
                                       placeholder="Buscador..."/>
                            </div>

                            <div class="col-2">
                                <button class="btn btn-success mr-1 mb-1 waves-effect waves-light pull-right btn-sm"
                                        @click="searchVehicleRent($event)">
                                    Buscar
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="!plants_vehicles_rents.length && !loading" ref="content">
                    No existen vehiculos en su perfil de usuario...
                </div>
                <div class="row" v-else>
                    <div class="col-xl-10 mb-1">
                        <div v-if="!vehicle_rent_search.length">
                            <p class="letruta mb-0">Seleccionar Todo</p>
                            <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                                <input v-if="(vehiclesRentsView == true)" v-on:click="showHiddenAllVehiclesRents()"
                                       type="checkbox"
                                       class="custom-control-input"
                                       id="vehicles_rents_all" checked>
                                <input v-else v-on:click="showHiddenAllVehiclesRents()" type="checkbox"
                                       class="custom-control-input"
                                       id="vehicles_rents_all">

                                <label class="custom-control-label" for="vehicles_rents_all">
                                    <span class="switch-text-left">On</span>
                                    <span class="switch-text-right">Off</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="loading">
                <vs-progress :height="10" indeterminate color="success"></vs-progress>
            </div>
            <div v-else>

                <div class="accordion" id="plantsVehicles">
                    <div class="card" v-for="(plant, index) in getAllPlantVehiclesRents"
                         v-bind:key="plant.id" v-if="plant.vehicles.length">
                        <div class="card-header" :id="'heading_'+plant.id"
                             style="background-color: rgb(8, 21, 96); padding:5px;">
                            <h2 class="mb-0">
                                <button class="btn btn-link text-left" type="button" data-toggle="collapse"
                                        :data-target="'#plant_collapse_'+plant.id" aria-expanded="true"
                                        :aria-controls="'plant_collapse_'+plant.id"
                                        style="padding:0rem 0rem;">
                                    {{ plant.name }} ({{ plant.plant_code }}) - ({{ plant.vehicles.length }})
                                </button>
                            </h2>
                        </div>

                        <div :id="'plant_collapse_'+plant.id" class="collapse show"
                             :aria-labelledby="'heading_'+plant.id"
                             data-parent="#plantsVehicles">
                            <div class="card-body" style="padding: 5px;">
                                <div v-for="(vehicle, index) in plant.vehicles" v-bind:key="vehicle.id">
                                    <div v-if="vehicle.id">
                                        <div class="custom-control custom-switch custom-switch-success">

                                            <input v-if="(vehiclesRentsView == true)" type="checkbox"
                                                   class="custom-control-input view_geofence_map" checked
                                                   :name="vehicle.id" :id="'vehicle_rent_'+vehicle.id"
                                                   v-on:click="showHiddenVehicleRent(vehicle.id)">

                                            <input v-else type="checkbox" class="custom-control-input view_geofence_map"
                                                   :name="vehicle.id" :id="'vehicle_rent_'+vehicle.id"
                                                   v-on:click="showHiddenVehicleRent(vehicle.id)">

                                            <label class="custom-control-label" :for="'vehicle_rent_'+vehicle.id">
                                                <span class="switch-text-left">On</span>
                                                <span class="switch-text-right">Off</span>
                                            </label>
                                            <span class="letruta menu-title" data-toggle="tooltip" data-html="true"
                                                  :title="vehicle.name">
                                    {{ vehicle.name }}
                                         <li class="d-inline-block mr-2">
                                                <fieldset>
                                                    <div class="vs-checkbox-con vs-checkbox-success"
                                                         :title="vehicle.name">
                                                        <input :id="'view_vehicle_rent_'+vehicle.id" type="checkbox"
                                                               value="false"
                                                               v-on:click="viewVehicleRent(vehicle.id)"
                                                               :title="vehicle.name"/>
                                                        <span class="vs-checkbox">
                                                            <span class="vs-checkbox--check">
                                                                <i class="vs-icon feather icon-check"></i>
                                                            </span>
                                                        </span>
                                                        <span class="" :title="vehicle.name">Seguir</span>
                                                    </div>
                                                </fieldset>
                                       </li>
                                   <!--<vs-progress :height="1" :percent="100" color="warning"></vs-progress>-->
                                <hr style="border-top: 1px dashed #e1a2a2;"/>
                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../../store/index';

export default {
    data()
    {
        return {
            active: false,
            time: 3000,
            progress: 0,
            plants_vehicles_rents: [],
            plants_vehicles_rents_aux: [],
            plants_vehicles_rents_search: [],
            vehicles_rents: [],
            vehicle_rent_info: [],
            vehicle_rent_search: '',
            loading: true,
            vehiclesRentsView: true
        }
    },
    mounted()
    {
        this.$nextTick(function ()
        {
            /**
             * Verificamos si existe vehiclesRentsView en el storage local si no existe,
             * lo crea por defecto en TRUE
             */
            vehiclesRentsView = ls.getItem("vehiclesRentsView");
            if (vehiclesRentsView === null)
            {
                vehiclesRentsView = true;
                ls.setItem("vehiclesRentsView", true);
            }
            else
            {
                vehiclesRentsView = JSON.parse(vehiclesRentsView);
            }
            this.vehiclesRentsView = vehiclesRentsView;

            this.initComponent();
        });
        console.log('Component vehicles-rents-all load');
    },
    methods: {
        initComponent: function ()
        {
            try
            {
                store.dispatch('allplantsVehiclesRents').then(response =>
                {
                    this.loading = false;
                    this.paintAllVehiclesRents();
                }).catch(error =>
                {
                    if (isDebugCatch)
                    {
                        console.error('VUEJS | vehicle rent | initComponent | allplantsVehicles | ERROR _> ');
                        console.error(error);
                    }
                });
            }
            catch (e)
            {
                if (isDebugCatch)
                {
                    console.error('VUEJS | vehicle rent | initComponent | ERROR _> ' + e)
                }
            }

        },
        searchVehicleRent: function (event)
        {
            this.loading = true;
            if (this.vehicle_rent_search != "")
            {
                store.dispatch("allplantsVehiclesRentsSearch", this.vehicle_rent_search).then(() => { this.loading = false; });
            }
            else
            {
                store.dispatch("allplantsVehiclesRents").then(() => { this.loading = false; });

            }
        },
        viewVehicleRent: function (id)
        {
            ///
            /// Tomamos el valor de check para revisar si esta true o false
            ///
            let isChecked = document.getElementById('view_vehicle_rent_' + id).checked;
            if (isChecked)
            {
                ///
                /// Agregamos al camión al listado
                ///
                document.getElementById('view_vehicle_rent_' + id).checked = true;
                aztrack.vehicleRent.viewVehicleRentMap(id);
            }
            else
            {
                ///
                /// Eliminamos al camión del listado
                ///
                document.getElementById('view_vehicle_rent_' + id).checked = false;
                aztrack.vehicleRent.tracingOff();
            }
        },
        cleanAllVehiclesRents: function ()
        {
            if (vehiclesRents.length > 0)
            {
                vehiclesRents.forEach(function (valor, id)
                {
                    try
                    {
                        //console.log(valor);
                        if (typeof vehiclesRents[id] !== 'undefined')
                        {
                            vehicle_rent_marker_cluster.removeLayer(vehiclesRents[id]);
                        }
                        else
                        {
                            console.log('Vehicle ID: ' + id + ' undefined');
                        }
                    }
                    catch (e)
                    {
                        console.error('Error: ' + e);
                    }
                });
            }
            vehicles_rents = null;
            vehicles_rents_markers = null;
        },
        paintAllVehiclesRents: function ()
        {
            try
            {
                ///setTimeout(function ()
                ///{
                ///
                ///Iniciamos carga de cluser para los vehiculos
                ///
                aztrack.vehicleRent.clusterInit();
                ///
                /// Hacemos la llamada a nuestros datos de vehiculos para luego ser pintados
                ///
                this.plants_vehicles_rents = store.getters.getplantsVehiclesRentsFormGetters;
                this.plants_vehicles_rents_aux = store.getters.getplantsVehiclesRentsFormGetters;
                this.plants_vehicles_rents_search = store.getters.getplantsVehiclesRentsFormGetters;
                this.plants_vehicles_rents.forEach(function (plant, index)
                {
                    ///
                    /// Verificamos que la planta tenga camiones asignado en la matrix
                    ///
                    if (plant.vehicles.length)
                    {
                        ///
                        /// Recorremos los vehiculos asignados a la planta
                        ///
                        plant.vehicles.forEach(function (vehicle, id)
                        {
                            ///
                            /// Agregamos cada vehiculo recorrido
                            ///
                            aztrack.vehicleRent.add(vehicle);
                        });

                    }
                });

                map.addLayer(vehicle_rent_marker_cluster);

                ///
                ///aztrack.vehicleRent.socket();
                ///
                /**
                 * Generamos la llamada por Ajax para la carga de camiones
                 */

                setInterval(function ()
                {
                    ///
                    /// Ajax Vehicles Update
                    ///
                    axios
                        .get(api_url + "/vehicles-rents/" + user.id)
                        .then((response) =>
                        {
                            if (typeof response.data.data !== "undefined")
                            {
                                let plants_vehicles_rents = response.data.data;

                                for (let i = 0; i < plants_vehicles_rents.length; i++)
                                {
                                    if (typeof plants_vehicles_rents[i].vehicles !== "undefined")
                                    {
                                        let vehicles = plants_vehicles_rents[i].vehicles;
                                        for (let j = 0; j < vehicles.length; j++)
                                        {
                                            aztrack.vehicleRent.update(vehicles[j])
                                        }
                                    }
                                }
                            }
                        })
                        .catch(function (error)
                        {
                            if (isDebugCatch)
                            {
                                console.error("VUEJS | AJAX | ERROR _> " + error);
                            }
                        });
                }, ajax_timer);


                /***
                 * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
                 */
                if (vehiclesRentsView == false)
                {
                    if (isDebugInfo)
                    {
                        console.log("Se ocultan los camions ya que esta desactivada la opcion");
                    }
                    this.hiddenAllVehiclesRents();
                }

            }
            catch (e)
            {
                if (isDebugCatch)
                {
                    console.error('VUEJS | vehicle rent | paintAllVehiclesRents | ERROR _> ' + e)
                }
            }
        },
        showHiddenVehicleRent: function (id)
        {
            ///
            /// Tomamos el valor de check para revisar si esta On o Off
            ///
            let isChecked = document.getElementById('vehicle_rent_' + id).checked;
            if (isChecked)
            {
                ///
                /// Agregamos al camión al listado
                ///
                //vehicle_marker_cluster.addLayer(vehicles[id])
                aztrack.vehicleRent.show(id);
            }
            else
            {
                ///
                /// Eliminamos al camión del listado
                ///
                //vehicle_marker_cluster.removeLayer(vehicles[id]);
                aztrack.vehicleRent.delete(id);

            }
        },
        showHiddenAllVehiclesRents: function ()
        {
            ///
            /// Tomamos el valor de check para revisar si esta On o Off
            ///
            let isChecked = document.getElementById('vehicles_rents_all').checked;

            if (isChecked)
            {
                vehiclesRentsView = true;
                this.vehiclesRentsView = true;
                ls.setItem("vehiclesRentsView", true);
            }
            else
            {
                vehiclesRentsView = false;
                this.vehiclesRentsView = false;
                ls.setItem("vehiclesRentsView", false);
            }

            vehiclesRents.forEach(function (valor, id)
            {
                try
                {
                    if (isChecked)
                    {
                        ///
                        /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                        ///
                        document.getElementById('vehicle_rent_' + valor.id).checked = true;
                        ///
                        /// Enviamos el vehiculo para que se vuelva a hacer visible en la pantalla del mapa.
                        ///
                        aztrack.vehicleRent.show(valor.id);
                    }
                    else
                    {
                        ///
                        /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                        ///
                        document.getElementById('vehicle_rent_' + valor.id).checked = false;
                        ///
                        /// Enviamos el vehiculo para que se desmarque de la pantalla del mapa.
                        ///
                        aztrack.vehicleRent.delete(valor.id);
                    }
                }
                catch (e)
                {
                    if (isDebugCatch)
                    {
                        console.error('VUE | vehicle rent | all | showHiddenAllVehiclesRents | Error: ' + e);
                    }
                }
            });

        },
        hiddenAllVehiclesRents: function ()
        {
            /**
             * Enviamos a ocultar todos los camiones del mapa
             */

            vehiclesRentsView = false;
            this.vehiclesRentsView = false;
            ls.setItem("vehiclesRentsView", false);

            vehiclesRents.forEach(function (vehicle, id)
            {
                try
                {
                    ///
                    /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                    ///
                    ///document.getElementById('vehicle_rent_' + vehicle.id).checked = false;
                    ///
                    /// Enviamos el vehiculo para que se desmarque de la pantalla del mapa.
                    ///
                    aztrack.vehicleRent.delete(vehicle.id);
                }
                catch (e)
                {
                    if (isDebugCatch)
                    {
                        console.error('VUE | vehicle rent | all | showHiddenAllVehiclesRents | Error: ' + e);
                    }
                }
            });

        },
        showVehicleRent: function (id)
        {
            plants_geofences[id].addTo(map);
            plants_geofences_description[id].addTo(map);
        },
        hiddenVehicleRent: function (id)
        {
            plants_geofences[id].remove();
            plants_geofences_description[id].remove();
        },
    },
    computed: {
        /*
        ...mapState({
            customers: state => state.customer.customers,
        }),
         */
        filteredList()
        {
            let _this = this;
            let plantSearchId = 0;
            let vehicleSearchId = 0;
            let plantSearchData;
            let vehicleSearchData;

            if (this.vehicle_rent_search == "")
            {
                return this.plants_vehicles_rents;
            }
            else
            {

                return this.plants_vehicles_rents_search.filter(plant =>
                {
                    plant.vehicles.forEach(function (vehicle, index)
                    {

                        /**
                         * Buscamos coincidencias con el nombre del camion
                         * Ej: MX-xxx
                         */
                        if (vehicle.name == _this.vehicle_rent_search)
                        {
                            vehicleSearchId = vehicle.name
                            plantSearchData = plant;
                            //delete plantSearchData.vehicles;
                            plantSearchData.vehicles_rents = [];
                            plantSearchData.vehicles_rents.push(vehicle);
                            return plantSearchData;
                        }
                        /**
                         * Buscamos coincidencias con el numero del camion
                         * Ej: 355 y el buscador agrega MX-355
                         */
                        else if (vehicle.name == _this.vehicle_rent_search.toLowerCase())
                        {
                            vehicleSearchId = vehicle.name
                            plantSearchData = plant;
                            //delete plantSearchData.vehicles;
                            plantSearchData.vehicles_rents = [];
                            plantSearchData.vehicles_rents.push(vehicle);
                            return plantSearchData;
                        }
                        /**
                         * Buscamos coincidencias con el numero del camion
                         * Ej: 355
                         */
                        else if (vehicle.name == _this.vehicle_rent_search)
                        {
                            vehicleSearchId = vehicle.name
                            plantSearchData = plant;
                            //delete plantSearchData.vehicles;
                            plantSearchData.vehicles_rents = [];
                            plantSearchData.vehicles_rents.push(vehicle);
                            return plantSearchData;
                        }

                    });

                    if (plantSearchData == "")
                    {
                        return plant.search.toLowerCase().includes(_this.vehicle_rent_search.toLowerCase());
                    }
                });
            }
        },
        getAllPlantVehiclesRents()
        {
            return store.getters.getplantsVehiclesRentsFormGetters
        }
    },
};
</script>
