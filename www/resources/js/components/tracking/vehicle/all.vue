<template>
  <div class="letruta asdf">
    <div>
      <div class="search-wrapper">
        <div class="row">
          <div class="offset-xl-1 col-xl-10 mb-1">
            <div class="row">
              <div class="col-9">
                <input id="basicInput" class="form-control" type="text" v-model="vehicle_search"
                       @change="searchVehicle($event)"
                       placeholder="Buscador..."/>
              </div>
              <div class="col-2">
                <button class="btn btn-success mr-1 mb-1 waves-effect waves-light pull-right btn-sm"
                        @click="searchVehicle($event)">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!plants_vehicles.length && !loading" ref="content">
          No existen vehiculos en su perfil de usuario...
        </div>
        <div class="row" v-else>
          <div class="col-xl-10 mb-1">
            <div v-if="!vehicle_search.length">
              <p class="letruta mb-0">Seleccionar Todo</p>
              <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                <input v-if="(vehiclesView == true)" v-on:click="showHiddenAllVehicles()"
                       type="checkbox"
                       class="custom-control-input"
                       id="vehicles_all" checked>
                <input v-else v-on:click="showHiddenAllVehicles()" type="checkbox"
                       class="custom-control-input"
                       id="vehicles_all">

                <label class="custom-control-label" for="vehicles_all">
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
          <div v-for="plant in getAllPlantVehicles" class="card">
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
                <div v-for="vehicle in plant.vehicles">
                  <div class="row">
                    <div class="col-4">
                                                <span class="letruta menu-title" data-toggle="tooltip" data-html="true"
                                                      :title="vehicle.name">
                                                    {{ vehicle.name }}
                                                </span>
                    </div>
                    <div class="col-4">
                      <div class="custom-control custom-switch custom-switch-success">
                        <!--
                        Validamos que vehiclesView esta activado para mostrar el input checked
                        -->
                        <input v-if="(vehiclesView == true)" type="checkbox"
                               class="custom-control-input view_geofence_map"
                               checked
                               :name="vehicle.id" :id="'vehicle_'+vehicle.id"
                               v-on:click="showHiddenVehicle(vehicle.id)">
                        <input v-else type="checkbox"
                               class="custom-control-input view_geofence_map"
                               :name="vehicle.id" :id="'vehicle_'+vehicle.id"
                               v-on:click="showHiddenVehicle(vehicle.id)">
                        <!--
                        Activación para mostrar u ocultar el vehiculo
                        -->
                        <label class="custom-control-label"
                               :for="'vehicle_'+vehicle.id">
                          <span class="switch-text-left">On</span>
                          <span class="switch-text-right">Off</span>
                        </label>
                      </div>
                    </div>
                    <div class="col-4">
                      <li class="d-inline-block mr-2">
                        <fieldset>
                          <div class="vs-checkbox-con vs-checkbox-success"
                               :title="vehicle.name">
                            <input :id="'view_vehicle_'+vehicle.id"
                                   type="checkbox"
                                   value="false"
                                   v-on:click="viewVehicle(vehicle.id)"
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
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4">
                      <div class="vehicle_lic_num" align="center"
                           :id="'vehicle_lic_num_'+vehicle.id">
                        {{ vehicle.lic_num }}
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="vehicle_rpm" :id="'vehicle_rpm_'+vehicle.id">
                        {{ conComasV(vehicle.rpm || 0) }} RPM
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="vehicle_speed" align="center" :id="'vehicle_speed_'+vehicle.id">
                        <ul v-if="vehicle.speed == 0 && vehicle.ignition == false"
                            class="semaforo rojo">
                          <li></li>
                        </ul>
                        <ul v-else-if="vehicle.speed == 0 && vehicle.ignition == true"
                            class="semaforo amarillo">
                          <li></li>
                        </ul>
                        <ul v-else-if="vehicle.speed > 0" class="semaforo verde">
                          <li></li>
                        </ul>
                        {{ vehicle.speed }} Km/h
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4">
                      <div align="center" :id="'vehicle_operator_'+vehicle.id">
                        <img v-if="vehicle.operator == 73001"
                             src="/images/icons/gprs/entel.png"
                             style="width: 40px;"/>
                        <img v-if="vehicle.operator == 73002"
                             src="/images/icons/gprs/movistar.png"
                             style="width: 40px;"/>
                        <img v-if="vehicle.operator == 73003"
                             src="/images/icons/gprs/claro.png"
                             style="width: 40px;"/>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="vehicle_odometer"
                           :id="'vehicle_odometer_'+vehicle.id">
                        {{ odometerKmV(vehicle.odometer) }}Km
                      </div>
                      <div class="vehicle_horometer"
                           :id="'vehicle_horometer_'+vehicle.id">
                        {{ conComasV(vehicle.horometer) }}
                      </div>
                    </div>
                    <div class="col-4">
                      <div align="center" :id="'vehicle_rssi_'+vehicle.id">
                        <img v-if="vehicle.rssi == 0"
                             src="/images/icons/gprs/signal_0.png"
                             style="width: 20px;"/>
                        <img v-if="vehicle.rssi == 1"
                             src="/images/icons/gprs/signal_1.png"
                             style="width: 20px;"/>
                        <img v-if="vehicle.rssi == 2"
                             src="/images/icons/gprs/signal_2.png"
                             style="width: 20px;"/>
                        <img v-if="vehicle.rssi == 3"
                             src="/images/icons/gprs/signal_3.png"
                             style="width: 20px;"/>
                        <img v-if="vehicle.rssi == 4"
                             src="/images/icons/gprs/signal_4.png"
                             style="width: 20px;"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="center"
                           :id="'view_vehicle_info_'+vehicle.id"
                           style="display:none;">
                        <table class="table vehicle_info_ticket"
                               style="margin-bottom: 0px;">
                          <tr>
                            <td style="padding:0px; border-top:0px;">
                              OB:
                            </td>
                            <td style="padding:0px; border-top:0px;">
                              {{ vehicle.t_m_tp_sj_a_postal_code }}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0px; border-top:0px;">
                              TC:
                            </td>
                            <td style="padding:0px; border-top:0px;">
                              {{ vehicle.t_m_tp_ji_ticket_code }}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0px; border-top:0px;">
                              M³:
                            </td>
                            <td style="padding:0px; border-top:0px;">
                              {{
                                vehicle.t_m_tp_ji_t_m_tp_ji_ticket_qty
                              }}
                            </td>
                          </tr>
                          <tr v-if="vehicle.driver != null">
                            <td style="padding:0px; border-top:0px;">
                              Chofer:
                            </td>
                            <td style="padding:0px; border-top:0px;">
                              {{ vehicle.driver.name }}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 vehicle_ticket_state"
                         :id="'vehicle_ticket_state_'+vehicle.id">
                      <table class="table">
                        <tr>
                          <td class="col-3" align="center">
                            <div
                                v-if="vehicle.state == null || vehicle.state <= 4">
                              <img src="/images/bsa/mixer_lado_blue.png"
                                   style="width: 70px;"/>
                            </div>
                            <div v-else>
                              <img src="/images/bsa/mixer_lado_blue.png"
                                   style="width: 70px; display: none;"/>
                            </div>
                          </td>
                          <td class="col-3" align="center">
                            <div
                                v-if="vehicle.state == 5">
                              <img src="/images/bsa/mixer_lado_blue.png"
                                   style="width: 70px;"/>
                            </div>
                            <div v-else>
                              <img src="/images/bsa/mixer_lado_blue.png"
                                   style="width: 70px; display: none;"/>
                            </div>
                          </td>
                          <td class="col-3" align="center">
                            <div
                                v-if="vehicle.state >= 8 && vehicle.state <= 9">
                              <img src="/images/bsa/mixer_lado_red.png"
                                   style="width: 70px;"/>
                            </div>
                            <div v-else>
                              <img src="/images/bsa/mixer_lado_red.png"
                                   style="width: 70px; display: none;"/>
                            </div>
                          </td>
                          <td class="col-3" align="center">
                            <div v-if="vehicle.state == 12">
                              <img src="/images/bsa/mixer_lado_green.png"
                                   style="width: 70px;"/>
                            </div>
                            <div v-else>
                              <img src="/images/bsa/mixer_lado_green.png"
                                   style="width: 70px; display: none;"/>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="col-3" align="center">
                            <div class="circulo_success"
                                 v-if="vehicle.state >= 4">AO
                            </div>
                            <div class="circulo" v-else>AO</div>
                          </td>
                          <td class="col-3" align="center">
                            <div class="circulo_success"
                                 v-if="vehicle.state >= 5">EO
                            </div>
                            <div class="circulo" v-else>EO</div>
                          </td>
                          <td class="col-3" align="center">
                            <div class="circulo_success"
                                 v-if="vehicle.state >= 8">
                              DE
                            </div>
                            <div class="circulo" v-else>DE</div>
                          </td>
                          <td class="col-3" align="center">
                            <div class="circulo_success"
                                 v-if="vehicle.state >= 12">AP
                            </div>
                            <div class="circulo" v-else>AP</div>
                          </td>
                        </tr>
                      </table>

                    </div>
                  </div>

                  <hr style="border-top: 1px dashed #e1a2a2;"/>
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
      plants_vehicles: [],
      plants_vehicles_search: [],
      vehicles: [],
      vehicle_info: [],
      vehicle_search: '',
      loading: true,
      vehiclesView: true
    }
  },
  mounted()
  {
    this.$nextTick(function ()
                   {
                     /**
                      * Verificamos si existe vehiclesView en el storage local si no existe,
                      * lo crea por defecto en TRUE
                      */
                     vehiclesView = ls.getItem("vehiclesView");
                     if (vehiclesView === null)
                     {
                       vehiclesView = true;
                       ls.setItem("vehiclesView", true);
                     }
                     else
                     {
                       vehiclesView = JSON.parse(vehiclesView);
                     }
                     this.vehiclesView = vehiclesView;

                     this.initComponent();
                   });
    console.log('Component vehicles-all load');
  },
  methods: {
    isNotUndefinedPlant: function (plant)
    {
      return ((typeof plant !== 'undefined') ? true : false);
    },
    isNotUndefinedVehicle: function (vehicle)
    {
      return ((typeof vehicle !== 'undefined') ? true : false);
    },
    conComasV: function (text = null)
    {
      if (text == null)
      {
        return "";
      }
      else
      {
        return conComas(text);
      }
    },
    odometerKmV: function (kms = null)
    {
      if (kms == null)
      {
        return "S/I";
      }
      else
      {
        return conComas(kms.slice(0, -3));
      }
    },
    initComponent: function ()
    {
      try
      {
        store.dispatch('allplantsVehicles').then(response =>
                                                 {
                                                   this.loading = false;
                                                   this.paintAllVehicles();
                                                 }).catch(error =>
                                                          {
                                                            if (isDebugCatch)
                                                            {
                                                              console.error('VUEJS | VEHICLE | initComponent | allplantsVehicles | ERROR _> ');
                                                              console.error(error);
                                                            }
                                                          });
      }
      catch (e)
      {
        if (isDebugCatch)
        {
          console.error('VUEJS | VEHICLE | initComponent | ERROR _> ' + e)
        }
      }

    },
    searchVehicle: function (event)
    {
      this.loading = true;
      if (this.vehicle_search != "")
      {
        store.dispatch("allplantsVehiclesSearch", this.vehicle_search).then(() =>
                                                                            {
                                                                              this.loading = false;
                                                                            });
      }
      else
      {
        store.dispatch("allplantsVehicles").then(() =>
                                                 {
                                                   this.loading = false;
                                                 });

      }
    },
    viewVehicle: function (id)
    {
      /**
       * Tomamos el valor de check para revisar si esta true o false
       */
      let isChecked = document.getElementById('view_vehicle_' + id).checked;
      if (isChecked)
      {
        /**
         * Agregamos al camión al listado
         */
        document.getElementById('view_vehicle_' + id).checked = true;
        aztrack.vehicle.viewVehicleMap(id);
      }
      else
      {
        /**
         * Eliminamos al camión del listado
         */
        document.getElementById('view_vehicle_' + id).checked = false;
        aztrack.vehicle.tracingOff();
      }
    },
    cleanAllVehicles: function ()
    {
      if (vehicles.length > 0)
      {
        vehicles.forEach(function (valor, id)
                         {
                           try
                           {
                             if (typeof vehicles[id] !== 'undefined')
                             {
                               vehicle_marker_cluster.removeLayer(vehicles[id]);
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
      vehicles = null;
      vehicles_markers = null;
    },
    paintAllVehicles: function ()
    {
      try
      {
        /**
         * Iniciamos carga de cluser para los vehiculos
         */
        aztrack.vehicle.clusterInit();
        /**
         * Hacemos la llamada a nuestros datos de vehiculos para luego ser pintados
         */
        this.plants_vehicles = store.getters.getplantsVehiclesFormGetters;
        this.plants_vehicles_search = [];
        this.plants_vehicles.forEach(function (plant, index)
                                     {
                                       /**
                                        * Verificamos que la planta tenga camiones asignado en la matrix
                                        */
                                       if (plant.vehicles.length > 0)
                                       {
                                         /**
                                          * Recorremoces los vehiculos asignados a la planta
                                          */
                                         plant.vehicles.forEach(function (vehicle, id)
                                                                {
                                                                  /**
                                                                   * Agregamos cada vehiculo recorrido
                                                                   */
                                                                  aztrack.vehicle.add(vehicle);
                                                                });

                                       }
                                     });

        map.addLayer(vehicle_marker_cluster);

        ///aztrack.vehicle.socket();
        /**
         * Generamos la llamada por Ajax para la carga de camiones
         */

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
                                        let vehicles = plants_vehicles[i].vehicles;

                                        for (let j = 0; j < vehicles.length; j++)
                                        {
                                          /**
                                           * Agregamnos el ID de la planta para poder usarlo en la actualización del storage en VUEX
                                           */
                                          vehicles[j].plants_id = plants_vehicles[i].id;
                                          aztrack.vehicle.update(vehicles[j]);
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
        if (vehiclesView == false)
        {
          if (isDebugInfo)
          {
            console.log("Se ocultan los camions ya que esta desactivada la opcion");
          }
          this.hiddenAllVehicles();
        }

      }
      catch (e)
      {
        if (isDebugCatch)
        {
          console.error('VUEJS | VEHICLE | paintAllVehicles | ERROR _> ' + e)
        }
      }
    },
    showHiddenVehicle: function (id)
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
        //vehicle_marker_cluster.addLayer(vehicles[id])
        aztrack.vehicle.show(id);
      }
      else
      {
        ///
        /// Eliminamos al camión del listado
        ///
        //vehicle_marker_cluster.removeLayer(vehicles[id])
        aztrack.vehicle.delete(id);

      }
    },
    showHiddenAllVehicles: function ()
    {
      ///
      /// Tomamos el valor de check para revisar si esta On o Off
      ///
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

      vehicles.forEach(function (valor, id)
                       {
                         try
                         {
                           if (isChecked)
                           {
                             ///
                             /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                             ///
                             document.getElementById('vehicle_' + valor.id).checked = true;
                             ///
                             /// Enviamos el vehiculo para que se vuelva a hacer visible en la pantalla del mapa.
                             ///
                             aztrack.vehicle.show(valor.id);
                           }
                           else
                           {
                             ///
                             /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                             ///
                             document.getElementById('vehicle_' + valor.id).checked = false;
                             ///
                             /// Enviamos el vehiculo para que se desmarque de la pantalla del mapa.
                             ///
                             aztrack.vehicle.delete(valor.id);
                           }
                         }
                         catch (e)
                         {
                           if (isDebugCatch)
                           {
                             console.error('VUE | vehicle | all | showHiddenAllVehicles | Error: ' + e);
                           }
                         }
                       });

    },
    hiddenAllVehicles: function ()
    {
      /**
       * Enviamos a ocultar todos los camiones del mapa
       */

      vehiclesView = false;
      this.vehiclesView = false;
      ls.setItem("vehiclesView", false);

      vehicles.forEach(function (vehicle, id)
                       {
                         try
                         {
                           ///
                           /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                           ///
                           ///document.getElementById('vehicle_' + vehicle.id).checked = false;
                           ///
                           /// Enviamos el vehiculo para que se desmarque de la pantalla del mapa.
                           ///
                           aztrack.vehicle.delete(vehicle.id);
                         }
                         catch (e)
                         {
                           if (isDebugCatch)
                           {
                             console.error('VUE | vehicle | all | showHiddenAllVehicles | Error: ' + e);
                           }
                         }
                       });

    },
    showVehicle: function (id)
    {
      plants_geofences[id].addTo(map);
      plants_geofences_description[id].addTo(map);
    },
    hiddenVehicle: function (id)
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

      if (this.vehicle_search == "")
      {
        return this.plants_vehicles;
      }
      else
      {

        return this.plants_vehicles_search.filter(plant =>
                                                  {
                                                    plant.vehicles.forEach(function (vehicle, index)
                                                                           {

                                                                             /**
                                                                              * Buscamos coincidencias con el nombre del camion
                                                                              * Ej: MX-xxx
                                                                              */
                                                                             if (vehicle.name == _this.vehicle_search)
                                                                             {
                                                                               vehicleSearchId = vehicle.truck_code
                                                                               plantSearchData = plant;
                                                                               //delete plantSearchData.vehicles;
                                                                               plantSearchData.vehicles = [];
                                                                               plantSearchData.vehicles.push(vehicle);
                                                                               return plantSearchData;
                                                                             }
                                                                             /**
                                                                              * Buscamos coincidencias con el numero del camion
                                                                              * Ej: 355 y el buscador agrega MX-355
                                                                              */
                                                                             else if (vehicle.name == "MX-" + _this.vehicle_search.toLowerCase())
                                                                             {
                                                                               vehicleSearchId = vehicle.truck_code
                                                                               plantSearchData = plant;
                                                                               //delete plantSearchData.vehicles;
                                                                               plantSearchData.vehicles = [];
                                                                               plantSearchData.vehicles.push(vehicle);
                                                                               return plantSearchData;
                                                                             }
                                                                             /**
                                                                              * Buscamos coincidencias con el numero del camion
                                                                              * Ej: 355
                                                                              */
                                                                             else if (vehicle.truck_code == _this.vehicle_search)
                                                                             {
                                                                               vehicleSearchId = vehicle.truck_code
                                                                               plantSearchData = plant;
                                                                               //delete plantSearchData.vehicles;
                                                                               plantSearchData.vehicles = [];
                                                                               plantSearchData.vehicles.push(vehicle);
                                                                               return plantSearchData;
                                                                             }
                                                                             /**
                                                                              * Buscamos coincidencias con el numero de la guia
                                                                              * Ej: 185957
                                                                              */
                                                                             else if (vehicle.t_m_tp_ji_ticket_code == _this.vehicle_search)
                                                                             {
                                                                               vehicleSearchId = vehicle.truck_code
                                                                               plantSearchData = plant;
                                                                               //delete plantSearchData.vehicles;
                                                                               plantSearchData.vehicles = [];
                                                                               plantSearchData.vehicles.push(vehicle);
                                                                               return plantSearchData;
                                                                             }
                                                                             /**
                                                                              * Buscamos coincidencias con el numero de la guia
                                                                              */
                                                                             else if (vehicle.t_m_tp_sj_a_postal_code == _this.vehicle_search)
                                                                             {
                                                                               vehicleSearchId = vehicle.truck_code
                                                                               plantSearchData = plant;
                                                                               //delete plantSearchData.vehicles;
                                                                               plantSearchData.vehicles = [];
                                                                               plantSearchData.vehicles.push(vehicle);
                                                                               return plantSearchData;
                                                                             }

                                                                           });

                                                    if (plantSearchData == "")
                                                    {
                                                      return plant.search.toLowerCase().includes(_this.vehicle_search.toLowerCase());
                                                    }
                                                  });
      }
    },
    getAllPlantVehicles()
    {
      return store.getters.getplantsVehiclesFormGetters;
      ///return store.state.plants_vehicles;
    }
  },
};
</script>
