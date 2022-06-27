<template>
  <div>
    <section
        id="card-actions"
        v-for="(plant, index) in plants"
        v-bind:key="plant.id"
        v-if="plant.vehicles.length"
    >
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Planta: <strong>{{ plant.name }}</strong> - Boca:
                <strong>{{ plant.plant_code }}</strong></h4>
              <a class="heading-elements-toggle"
              ><i class="fa fa-ellipsis-v font-medium-3"></i
              ></a>
              <div class="heading-elements">
                <ul class="list-inline mb-0">
                  <li>
                    <a data-action="collapse"
                    ><i
                        class="feather icon-chevron-down"
                    ></i
                    ></a>
                  </li>
                  <li>
                    <a data-action="expand"
                    ><i
                        class="feather icon-maximize"
                    ></i
                    ></a>
                  </li>
                  <!--
                  <li>
                      <a data-action="reload"
                          ><i
                              class="feather icon-rotate-cw"
                          ></i
                      ></a>
                  </li>
                  <li>
                      <a data-action="close"
                          ><i class="feather icon-x"></i
                      ></a>
                  </li>
                  -->
                </ul>
              </div>
            </div>
            <div class="card-content collapse show">
              <div class="card-body">
                <section id="html-headings-default" class="row match-height">
                  <div class="col-sm-4 col-md-2" id="in_plant">
                    <div class="card">
                      <div class="card-content">
                        <div class="table-responsive">
                          <table class="table table-borderless mb-0"
                                 style="border-collapse:inherit;">
                            <thead>
                            <tr>
                              <th colspan="3" style="text-align: center;"><strong>EN
                                PLANTA</strong></th>
                            </tr>
                            <tr>
                              <th style="text-align: center;">Estado</th>
                              <th style="text-align: center;">Mixer</th>
                              <th>
                                Ticket
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(vehicle,index) in plant.vehicles"
                                v-bind:key="vehicle.id"
                                v-if="vehicle.state ==13"
                            >
                            <!-- https://cdn.polpaico.azuriantrack.com/images/bsa/mixer_error_4.png -->
                            <!-- https://cdn.polpaico.azuriantrack.com/images/bsa/mixer_dashboard_error_4.png -->
                              <td align="center">
                                <img :src="vehicle.icon_dashboard.replace('https://move.polpaico.azuriantrack.com', '')"
                                     style="height: 60px; width:25px;"/>
                              </td>
                              <td align="center">
                                <h5>
                                  {{
                                    vehicle.name
                                  }}
                                </h5>
                                <small
                                    style="font-size: 10px !important; background-color:red !important;"
                                    v-if="vehicle.minutes_transmition_diff > 5">
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                                <small style="font-size: 10px !important;" v-else>
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                              </td>
                              <td>
                                <small style="font-size: 10px !important">
                                  TK: {{ vehicle.t_m_tp_ji_ticket_code }}
                                  <br/>
                                  OB: {{ vehicle.t_m_tp_sj_a_postal_code }}
                                </small>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4 col-md-2" id="to_job">
                    <div class="card">
                      <div class="card-content">
                        <div class="table-responsive">
                          <table
                              class="table table-borderless mb-0"
                              style="border-collapse:inherit;"
                          >
                            <thead>
                            <tr>
                              <th colspan="3" style="text-align: center;"><strong>A
                                OBRA</strong></th>
                            </tr>
                            <tr>
                              <th style="text-align: center;">Estado</th>
                              <th style="text-align: center;">Mixer</th>
                              <th>
                                Ticket
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(vehicle, index) in plant.vehicles"
                                v-bind:key="vehicle.id" v-if="vehicle.state == 4">
                              <td align="center">
                                <img :src="vehicle.icon_dashboard.replace('https://move.polpaico.azuriantrack.com', '')"
                                     style="height: 60px; width:25px;"/>
                              </td>
                              <td align="center">
                                <h5>
                                  {{
                                    vehicle.name
                                  }}
                                </h5>
                                <small
                                    style="font-size: 10px !important; background-color:red !important;"
                                    v-if="vehicle.minutes_transmition_diff > 5">
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                                <small style="font-size: 10px !important;" v-else>
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                              </td>
                              <td>
                                <small style="font-size: 10px !important">
                                  TK: {{ vehicle.t_m_tp_ji_ticket_code }}
                                  <br/>
                                  OB: {{ vehicle.t_m_tp_sj_a_postal_code }}
                                </small>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4 col-md-2" id="in_job">
                    <div class="card">
                      <div class="card-content">
                        <div class="table-responsive">
                          <table
                              class="table table-borderless mb-0"
                              style="border-collapse:inherit;"
                          >
                            <thead>
                            <tr>
                              <th colspan="3" style="text-align: center;"><strong>EN
                                OBRA</strong></th>
                            </tr>
                            <tr>
                              <th style="text-align: center;">Estado</th>
                              <th style="text-align: center;">Mixer</th>
                              <th style="text-align: center;">Ticket</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="vehicle in plant.vehicles" v-bind:key="vehicle.id"
                                v-if="vehicle.state == 5">
                              <td align="center">
                                <img :src="vehicle.icon_dashboard.replace('https://move.polpaico.azuriantrack.com', '')"
                                     style="height: 60px; width:25px;"/>
                              </td>
                              <td align="center">
                                <h5>
                                  {{
                                    vehicle.name
                                  }}
                                </h5>
                                <small
                                    style="font-size: 10px !important; background-color:red !important;"
                                    v-if="vehicle.minutes_transmition_diff > 5">
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                                <small style="font-size: 10px !important;" v-else>
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                              </td>
                              <td>
                                <small style="font-size: 10px !important">
                                  TK: {{ vehicle.t_m_tp_ji_ticket_code }}
                                  <br/>
                                  OB: {{ vehicle.t_m_tp_sj_a_postal_code }}
                                </small>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-4 col-md-2" id="unload">
                    <div class="card">
                      <div class="card-content">
                        <div class="table-responsive">
                          <table
                              class="table table-borderless mb-0"
                              style="border-collapse:inherit;"
                          >
                            <thead>
                            <tr>
                              <th colspan="3" style="text-align: center;"><strong>DESCARGANDO</strong>
                              </th>
                            </tr>
                            <tr>
                              <th style="text-align: center;">Estado</th>
                              <th style="text-align: center;">Mixer</th>
                              <th>
                                Ticket
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(vehicle, index) in plant.vehicles"
                                v-bind:key="vehicle.id"
                                v-if="vehicle.state == 8"
                            >
                              <td align="center">
                                <img :src="vehicle.icon_dashboard.replace('https://move.polpaico.azuriantrack.com', '')"
                                     style="height: 60px; width:25px;"/>
                              </td>
                              <td align="center">
                                <h5>
                                  {{
                                    vehicle.name
                                  }}
                                </h5>
                                <small
                                    style="font-size: 10px !important; background-color:red !important;"
                                    v-if="vehicle.minutes_transmition_diff > 5">
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                                <small style="font-size: 10px !important;" v-else>
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                              </td>
                              <td>
                                <small style="font-size: 10px !important">
                                  TK: {{ vehicle.t_m_tp_ji_ticket_code }}
                                  <br/>
                                  OB: {{ vehicle.t_m_tp_sj_a_postal_code }}
                                </small>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                      class="col-sm-4 col-md-2"
                      id="to_plant"
                  >
                    <div class="card">
                      <div class="card-content">
                        <div class="table-responsive">
                          <table
                              class="table table-borderless mb-0"
                              style="border-collapse:inherit;"
                          >
                            <thead>
                            <tr>
                              <th colspan="3" style="text-align: center;"><strong>A
                                PLANTA</strong></th>
                            </tr>
                            <tr>
                              <th style="text-align: center;">Estado</th>
                              <th style="text-align: center;">Mixer</th>
                              <th style="text-align: center;">Ticket</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(vehicle, index) in plant.vehicles"
                                v-bind:key="vehicle.id"
                                v-if="vehicle.state == 12"
                            >
                              <td align="center">
                                <img :src="vehicle.icon_dashboard.replace('https://move.polpaico.azuriantrack.com', '')"
                                     style="height: 60px; width:25px;"/>
                              </td>
                              <td align="center">
                                <h5>
                                  {{
                                    vehicle.name
                                  }}
                                </h5>
                                <small
                                    style="font-size: 10px !important; background-color:red !important;"
                                    v-if="vehicle.minutes_transmition_diff > 5">
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                                <small style="font-size: 10px !important;" v-else>
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                              </td>
                              <td>
                                <small style="font-size: 10px !important">
                                  TK: {{ vehicle.t_m_tp_ji_ticket_code }}
                                  <br/>
                                  OB: {{ vehicle.t_m_tp_sj_a_postal_code }}
                                </small>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                      class="col-sm-4 col-md-2"
                      id="workshop"
                  >
                    <div class="card">
                      <div class="card-content">
                        <div class="table-responsive">
                          <table
                              class="table table-borderless mb-0"
                              style="border-collapse:inherit;"
                          >
                            <thead>
                            <tr>
                              <th colspan="3" style="text-align: center;"><strong>INACTIVOS</strong>
                              </th>
                            </tr>
                            <tr>
                              <th style="text-align: center;">Estado</th>
                              <th style="text-align: center;">Mixer</th>
                              <th>
                                Ticket
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(vehicle, index) in plant.vehicles"
                                v-bind:key="vehicle.id"
                                v-if="vehicle.inactive_code > 0"
                            >
                              <td align="center">
                                <img :src="vehicle.icon_dashboard.replace('https://move.polpaico.azuriantrack.com', '')"
                                     style="height: 60px; width:25px;"/>
                              </td>
                              <td align="center">
                                <h5>
                                  {{
                                    vehicle.name
                                  }}
                                </h5>
                                <small
                                    style="font-size: 10px !important; background-color:red !important;"
                                    v-if="vehicle.minutes_transmition_diff > 5">
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                                <small style="font-size: 10px !important;" v-else>
                                  {{
                                    vehicle.device_time_local
                                  }}
                                </small>
                              </td>
                              <td>
                                <small style="font-size: 10px !important"
                                       v-if="vehicle.assgn_plant_code == 990 || vehicle.assgn_plant_code == 992">
                                  EN TALLER
                                </small>
                                <small style="font-size: 10px !important"
                                       v-if="vehicle.inactive_code > 0">
                                  INACTIVO
                                </small>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--
<div class="col-sm-4 col-md-2" id="disable">
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">
        <p class="text-center">INACTIVO</p>
      </h4>
    </div>
    <div class="card-content">
      <div class="card-body pb-0">
        <div class="card-text">
          <p>asdasdasdasd...</p>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-borderless mb-0" style="border-collapse:inherit;">
          <thead>
            <tr>
              <th style="text-align: center;">Mixer</th>
              <th class="text-right">Ticket</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">
                <h1>H1 Heading</h1>
              </td>
              <td>2rem</td>
            </tr>
            <tr>
              <td align="center">
                <h2>H2 Heading</h2>
              </td>
              <td>1.74rem</td>
            </tr>
            <tr>
              <td align="center">
                <h5>H3 Heading</h5>
              </td>
              <td>1.51rem</td>
            </tr>
            <tr>
              <td align="center">
                <h4>H4 Heading</h4>
              </td>
              <td>1.32rem</td>
            </tr>
            <tr>
              <td align="center">
                <h5>H5 Heading</h5>
              </td>
              <td>1.14rem</td>
            </tr>
            <tr>
              <td align="center">
                <h6>H6 Heading</h6>
              </td>
              <td>1rem</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
-->
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data()
  {
    return {
      plants: []
    };
  },
  mounted()
  {
    this.$nextTick(function ()
                   {
                     this.loadData();
                   });
    console.log('Component cpadmin_movement_mixer load');
  },
  methods: {
    loadData()
    {
      ///
      /// Ajax Vehicles Update
      ///
      axios
          .get(api_url + "/vehicles/tracking/" + user.id)
          .then(response =>
                {
                  this.plants = response.data.data;
                  /*
                   if (typeof response.data.data !== "undefined") {
                   let plants_vehicles = response.data.data;
                   for (let i = 0; i < plants_vehicles.length; i++) {
                   if (typeof plants_vehicles[i].vehicles !== "undefined") {
                   let vehicles = plants_vehicles[i].vehicles;
                   for (let j = 0; j < vehicles.length; j++) {
                   aztrack.vehicle.update(vehicles[j]);
                   }
                   }
                   }
                   }
                   */
                })
          .catch(function (error)
                 {
                   if (isDebugCatch)
                   {
                     console.error("VUEJS | AJAX | ERROR _> " + error);
                   }
                 });
      ///
      /// Ejecutamos funcion que seguira cargando cada X segundos la misma API
      ///
      this.loadDataTimer();
    },
    loadDataTimer: function ()
    {

      let _this = this;
      setInterval(function ()
                  {
                    ///
                    /// Ajax Vehicles Update
                    ///
                    axios
                        .get(api_url + "/vehicles/tracking/" + user.id)
                        .then(response =>
                              {
                                _this.plants = response.data.data;
                                /*
                                 if (typeof response.data.data !== "undefined") {
                                 let plants_vehicles = response.data.data;
                                 for (let i = 0; i < plants_vehicles.length; i++) {
                                 if (typeof plants_vehicles[i].vehicles !== "undefined") {
                                 let vehicles = plants_vehicles[i].vehicles;
                                 for (let j = 0; j < vehicles.length; j++) {
                                 aztrack.vehicle.update(vehicles[j]);
                                 }
                                 }
                                 }
                                 }
                                 */
                              })
                        .catch(function (error)
                               {
                                 if (isDebugCatch)
                                 {
                                   console.error("VUEJS | AJAX | ERROR _> " + error);
                                 }
                               });
                  }, ajax_timer);
    }
  }
};
</script>
<style>
.table th,
.table td
{
  padding:        6px;
  vertical-align: middle;
}
</style>
