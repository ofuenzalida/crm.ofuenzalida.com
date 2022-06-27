<template>
    <section id="data-list-view" class="data-list-view-header">
        <div class="row">
            <div class="offset-6 col-6">

                <div class="row">
                    <div class="offset-6 col-4">
                        <select class="form-control" @change="filterPlant($event)">
                            <option value="0" selected>Seleccionar boca</option>
                            <option v-for="(plant, index) in plants_by_users" :value="plant.id" :key="plant.id">
                                {{ plant.plant_code + ' | ' + plant.addr_line_1 }}
                            </option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-12">
            </div>
        </div>
        <div class="row">
            <div class="offset-xl-1 col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center m-l-0">
                            <div class="col-auto">
                                <i class="icon feather icon-book f-30 text-c-purple"></i>
                            </div>
                            <div class="col-auto">
                                <h6 class="text-muted m-b-10">Carga programada
                                    <small class="azcolor-fechaestado">mts3</small>
                                </h6>
                                <h2 class="m-b-0">{{ load_scheduled }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center m-l-0">
                            <div class="col-auto">
                                <i class="icon feather check-icon-circle f-30 text-c-purple"></i>
                            </div>
                            <div class="col-auto">
                                <h6 class="text-muted m-b-10">Carga ciclo incompleto
                                    <small class="azcolor-fechaestado">mts3</small>
                                </h6>
                                <h2 class="m-b-0">{{ load_incomplete_cycle }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center m-l-0">
                            <div class="col-auto">
                                <i class="icon feather icon-book f-30 text-c-purple"></i>
                            </div>
                            <div class="col-auto">
                                <h6 class="text-muted m-b-10">Carga ciclo completo
                                    <small class="azcolor-fechaestado">mts3</small>
                                </h6>
                                <h2 class="m-b-0">{{ load_complete_cycle }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center m-l-0">
                            <div class="col-auto">
                                <i class="icon feather icon-book f-30 text-c-purple"></i>
                            </div>
                            <div class="col-auto">
                                <h6 class="text-muted m-b-10">Bocas de cargas</h6>
                                <h2 class="m-b-0">{{ plant_mouths }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center m-l-0">
                            <div class="col-auto">
                                <i class="icon feather icon-navigation-2 f-30 text-c-green"></i>
                            </div>
                            <div class="col-auto">
                                <h6 class="text-muted m-b-10">Vehículos:</h6>
                                <h2 class="m-b-0">{{ plant_vehicles }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center m-l-0">
                            <div class="col-auto">
                                <i class="icon feather icon-book f-30 text-c-purple"></i>
                            </div>
                            <div class="col-auto">
                                <h6 class="text-muted m-b-10">Dispositivos instalados:</h6>
                                <h2 class="m-b-0">{{ plant_devices }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center m-l-0">
                            <div class="col-auto">
                                <i class="icon feather icon-book f-30 text-c-purple"></i>
                            </div>
                            <div class="col-auto">
                                <h6 class="text-muted m-b-10">Ticket procesados</h6>
                                <h2 class="m-b-0" id="count_tickets_proceseed">{{ tickets_processed }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="card support-bar overflow-hidden">
                    <div class="card-body pb-0">
                        <span class="azcolor-fechaestado">Camiones sin ciclo</span>
                        <h2 class="m-0"
                            align="center">{{ vehicles_not_cycle }}</h2>
                        <p class="mb-3 mt-3">
                        </p>
                    </div>
                    <div id="support-chart"></div>
                    <div class="card-footer color-barra text-white">
                        <div class="row text-center">
                            <div class="col border-right">
                                <h4 class="m-0 text-white">{{ vehicles_in_workshop }}</h4>
                                <span style="color:#FFFFFF;">En taller</span>
                            </div>
                            <div class="col border-right">
                                <h4 class="m-0 text-white">{{ vehicles_not_transmission }}</h4>
                                <span style="color:#FFFFFF;">Sin transmisión</span>
                            </div>
                            <div class="col border-right">
                                <h4 class="m-0 text-white">{{ vehicles_in_plant }}</h4>
                                <span style="color:#FFFFFF;">En planta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card support-bar overflow-hidden">
                    <div class="card-body pb-0">
                        <span CLASS="azcolor-fechaestado">Camiones con ciclo</span>
                        <h2 class="m-0" align="center">{{ vehicles_cycle }}</h2>
                        <p class="mb-3 mt-3"></p>
                    </div>
                    <div id="support-chart1"></div>
                    <div class="card-footer bg-success text-white">
                        <div class="row text-center">
                            <div class="col border-right">
                                <h4 class="m-0 text-white">{{ vehicles_loading }}</h4>
                                <span style="color:#FFFFFF;">Cargando</span>
                            </div>
                            <div class="col border-right">
                                <h4 class="m-0 text-white">{{ vehicles_to_job }}</h4>
                                <span style="color:#FFFFFF;">A obra</span>
                            </div>
                            <div class="col border-right">
                                <h4 class="m-0 text-white">{{ vehicles_in_job }}</h4>
                                <span style="color:#FFFFFF;">En obra</span>
                            </div>
                            <div class="col border-right">
                                <h4 class="m-0 text-white">{{ vehicles_downloading }}</h4>
                                <span style="color:#FFFFFF;">Descargando</span>
                            </div>
                            <div class="col border-right">
                                <h4 class="m-0 text-white">{{ vehicles_to_plant }}</h4>
                                <span style="color:#FFFFFF;">A planta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-12 col-md-12">
            <div class="card table-card">
                <div class="card-header">
                    <p>Últimos 10 movimiento de vehículos</p>
                    <div class="card-header-right">
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead>
                            <tr>
                                <th>N°</th>
                                <th>Camión</th>
                                <th>Fecha guía</th>
                                <th>Número guía</th>
                                <th>Carga</th>
                                <th class="text-center">Estado</th>
                                <th class="text-center">Gps</th>
                            </tr>
                            </thead>
                            <tbody id="trucks">
                            <tr v-for="(vehicle, index) in vehicles_last_movements">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <div class="d-inline-block align-middle">
                                        <img src="/assets/truck.png" alt=""
                                             class="img-radius wid-40 align-top m-r-15">
                                        <div class="d-inline-block">
                                            <h6>{{ 'MX-' + vehicle.truck_code }}</h6>
                                            <p class="text-muted m-b-0"></p>
                                        </div>
                                    </div>
                                </td>
                                <td>{{ vehicle.updated_at }}</td>
                                <td>{{ vehicle.t_m_tp_ji_ticket_code }}</td>
                                <td>{{ vehicle.t_m_tp_ji_t_m_tp_ji_ticket_qty }}</td>

                                <td class="text-center" v-if="vehicle.state===0">
                                    <label class="badge badge-light-danger">Rechazado</label>
                                </td>
                                <td class="text-center" v-else-if="vehicle.state===1">
                                    <label class="badge badge-light-danger">Cargando</label>
                                </td>
                                <td class="text-center" v-else-if="vehicle.state===2">
                                    <label class="badge badge-light-danger">Cargando</label>
                                </td>
                                <td class="text-center" v-else-if="vehicle.state===4">
                                    <label class="badge badge-light-danger">A obra</label>
                                </td>
                                <td class="text-center" v-else-if="vehicle.state===5">
                                    <label class="badge badge-light-danger">En obra</label>
                                </td>
                                <td class="text-center" v-else-if="vehicle.state===8">
                                    <label class="badge badge-light-danger">Descargando</label>
                                </td>
                                <td class="text-center" v-else-if="vehicle.state===12">
                                    <label class="badge badge-light-danger">A planta</label>
                                </td>
                                <td class="text-center" v-else-if="vehicle.state===13">
                                    <label class="badge badge-light-danger">En planta</label>
                                </td>
                                <td class="text-center" v-else>
                                    <label class="badge badge-light-danger">Otro</label>
                                </td>
                                <td class="text-center" v-if="vehicle.transmit===true">
                                    <label class="badge badge-success">Ok</label>
                                </td>
                                <td class="text-center" v-else-if="vehicle.transmit===false">
                                    <label class="badge-danger">Falla</label>
                                </td>
                                <td class="text-center" v-else>
                                    <label class="badge">Revisar</label>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    export default {
        data()
        {
            return {
                load_scheduled: 0,
                load_incomplete_cycle: 0,
                load_complete_cycle: 0,
                plant_mouths: 0,
                plant_vehicles: 0,
                plant_devices: 0,
                tickets_processed: 0,
                vehicles_not_cycle: 0,
                vehicles_cycle: 0,
                vehicles_in_workshop: 0,
                vehicles_not_transmission: 0,
                vehicles_in_plant: 0,
                vehicles_loading: 0,
                vehicles_to_job: 0,
                vehicles_downloading: 0,
                vehicles_in_job: 0,
                vehicles_to_plant: 0,
                vehicles_last_movements: [],
                plants_by_users: [],
                plant_select: 0,
            }
        },
        mounted()
        {
            this.$nextTick(function ()
            {
                this.updateDashboard();
                setInterval(() =>
                {
                    this.updateDashboard();
                }, 30000);
            });
            console.log('Component cpadmin-index load');
        },
        methods: {
            updateDashboard: function (event)
            {
                axios.get('/cpadmin/ajax/dashboard/' + this.plant_select)
                    .then((response) =>
                    {
                        this.load_scheduled = response.data.data.load_scheduled;
                        this.load_incomplete_cycle = response.data.data.load_incomplete_cycle;
                        this.load_complete_cycle = response.data.data.load_complete_cycle;
                        this.plant_mouths = response.data.data.plant_mouths;
                        this.plant_vehicles = response.data.data.plant_vehicles;
                        this.plant_devices = response.data.data.plant_devices;
                        this.tickets_processed = response.data.data.tickets_processed;
                        this.vehicles_in_workshop = response.data.data.vehicles_in_workshop;
                        this.vehicles_not_transmission = response.data.data.vehicles_not_transmission;
                        this.vehicles_in_plant = response.data.data.vehicles_in_plant;
                        this.vehicles_loading = response.data.data.vehicles_loading;
                        this.vehicles_to_job = response.data.data.vehicles_to_job;
                        this.vehicles_in_job = response.data.data.vehicles_in_job;
                        this.vehicles_to_plant = response.data.data.vehicles_to_plant;
                        this.vehicles_not_cycle = response.data.data.vehicles_not_cycle;
                        this.vehicles_cycle = response.data.data.vehicles_cycle;
                        this.vehicles_downloading = response.data.data.vehicles_downloading;
                        this.plants_by_users = response.data.data.plants_by_users;
                        this.vehicles_last_movements = response.data.data.vehicles_last_movements;
                    }).catch(function (error)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                }).finally();
            },
            filterPlant: function (event)
            {
                console.log('FILTRO POR PLANTA...');
                console.log(event.target.value);
                this.plant_select = event.target.value;
                this.updateDashboard();
            }
        },
    };
</script>
