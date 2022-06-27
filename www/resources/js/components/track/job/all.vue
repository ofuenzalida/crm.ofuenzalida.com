<template>
    <div class="letruta asdf">
        <div class="job_search-wrapper">
            <div class="row">
                <div class="offset-xl-1 col-xl-10 mb-1">
                    <div class="row">
                        <div class="col-9">
                            <input id="basicInput" class="form-control" type="text" v-model="job_search"
                                   @change="searchJob($event)"
                                   placeholder="Buscador..."/>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-success mr-1 mb-1 waves-effect waves-light pull-right btn-sm"
                                    @click="searchJob($event)">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" v-if="job_loading">
            <div class="col-12">
                <vs-progress :height="10" indeterminate color="success"></vs-progress>
            </div>
        </div>
        <div class="row" v-else>
            <div class="offset-1 col-10 mb-1">
                <div class="col-12 mb-1">
                    <div v-if="!job_search.length">
                        <p class="letruta mb-0">Seleccionar Todo</p>
                        <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                            <input v-if="(jobsView == true)" v-on:click="showHiddenAllJobs()" type="checkbox"
                                   class="custom-control-input"
                                   id="jobs_all" checked>
                            <input v-else v-on:click="showHiddenAllJobs()" type="checkbox" class="custom-control-input"
                                   id="jobs_all">

                            <label class="custom-control-label" for="jobs_all">
                                <span class="switch-text-left">On</span>
                                <span class="switch-text-right">Off</span>
                            </label>
                        </div>
                    </div>
                    <!--<span>
                                <li class="d-inline-block mr-2">
                                            <fieldset>
                                                <div class="vs-radio-con vs-radio-success">
                                                    <input type="radio" name="view_ticket" value="false"
                                                           id="view_job_0"
                                                           v-on:click="viewJob(0)"/>
                                                    <span class="vs-radio">
                                                        <span class="vs-radio--border"></span>
                                                        <span class="vs-radio--circle"></span>
                                                     </span>
                                                    <br/>
                                                    <span class="">Ver</span>
                                                </div>
                                            </fieldset>
                                </li>
                 </span>-->
                </div>

                <div class="letruta" v-for="(plant, index) in jobs_plants">
                    <span class="ama">Planta:</span>
                    <span class="letruta">
                     {{ plant.name }} ({{ plant.plant_code }}) - ({{ plant.jobs.length }})
                    </span>
                    <div v-if="!plant.jobs.length">
                        No existe obras asignado...
                        <br/>
                        <br/>
                    </div>
                    <div v-else>
                        <div v-for="(job, index) in plant.jobs">
                            <div v-if="job.id">
                                <div class="custom-control custom-switch custom-switch-success mr-2">
                                    <input v-if="(jobsView == true)" type="checkbox"
                                           class="custom-control-input view_geofence_map" checked
                                           :name="job.id" :id="'job_'+job.id"
                                           v-on:click="showHiddenJob(job.id)">

                                    <input v-else type="checkbox" class="custom-control-input view_geofence_map"
                                           :name="job.id" :id="'job_'+job.id"
                                           v-on:click="showHiddenJob(job.id)">

                                    <label class="custom-control-label" :for="'job_'+job.id">
                                        <span class="switch-text-left">On</span>
                                        <span class="switch-text-right">Off</span>
                                    </label>
                                    <span class="letruta menu-title" data-toggle="tooltip" data-html="true"
                                          :title="job.id" style="font-size:10px !important;">
                                            ({{ job.name }}) | C: {{ job.client }}
                                          <li class="d-inline-block mr-2">
                                                <fieldset>
                                                    <div class="vs-radio-con vs-radio-success">
                                                        <input type="radio" name="view_ticket" value="false"
                                                               :id="'view_job_'+job.id"
                                                               v-on:click="viewJob(job.id)"/>
                                                        <span class="vs-radio">
                                                            <span class="vs-radio--border"></span>
                                                            <span class="vs-radio--circle"></span>
                                                         </span>
                                                        <span class="">Ver</span>
                                                    </div>
                                                </fieldset>
                                          </li>
                                        <br/>
                                        <br/>
                                    </span>
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

export default {
    data()
    {
        return {
            active: false,
            time: 6000,
            progress: 0,
            jobs_plants: [],
            job_info: [],
            job_search: '',
            job_loading: true,
            job_data_search: [],
            jobsView: true,
        }
    },
    mounted()
    {
        this.$nextTick(function ()
        {
            /**
             * Verificamos si existe jobsView en el storage local si no existe,
             * lo crea por defecto en TRUE
             */
            jobsView = ls.getItem('jobsView')
            if (jobsView === null)
            {
                jobsView = true;
                ls.setItem("jobsView", true);
            }
            else
            {
                jobsView = JSON.parse(jobsView);
            }
            this.jobsView = jobsView;
            this.getJobsAll();
        });
        console.log('Component tickets-all load');
    },
    methods: {
        searchJob: function (event)
        {
            this.job_loading = true;

            if (this.job_search != '')
            {
                axios.get(api_url + '/jobs/all/' + user.id + '/search/' + this.job_search)
                    .then((response) =>
                    {
                        this.job_loading = false;
                        this.jobs_plants = response.data.data;
                    }).catch(function (error)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                }).finally(() => (this.job_loading = false));
            }
            else
            {
                this.getJobsAll();
            }
        },
        viewJobInfo: function (id)
        {
            console.log(id);
        },
        viewJob: function (id)
        {
            if (isDebugInfo)
            {
                console.log('JOB | viewJob | ID: ' + id);
            }

            let job = jobs_geofences[id];
            if (job != null)
            {
                let latLng = job.getLatLngs();
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
        async getJobsAll()
        {
            this.job_loading = true;
            await axios.get('/ajax/job/all')
                .then((response) =>
                {
                    this.jobs_plants = response.data.data;
                    this.job_loading = false;
                }).catch(function (error)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                }).finally(() => (this.job_loading = false));

            await this.paintAllJobs();
        },
        cleanAllJobs: function ()
        {
            if (jobs_geofences.length > 0)
            {
                jobs_geofences.forEach(function (valor, id)
                {
                    try
                    {
                        if (typeof jobs_geofences[id] !== 'undefined')
                        {
                            jobs_geofences.removeLayer(tickets[id]);
                        }
                        else
                        {
                            console.log('Ticket ID: ' + id + ' undefined');
                        }
                    }
                    catch (e)
                    {
                        console.error('Error: ' + e);
                    }
                });
            }
            jobs_geofences = [];
        },
        paintAllJobs: function ()
        {
            console.log('paintAllJobs');

            this.jobs_plants.forEach(function (plant, index)
            {
                ///
                /// Verificamos que la planta tenga ticket asignados
                ///
                if (plant.jobs.length)
                {
                    ///
                    /// Recorremoces los tickets asignados a la planta
                    ///
                    plant.jobs.forEach(function (job, id)
                    {
                        aztrack.job.add(job);
                    });
                }
            });

            /***
             * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
             */
            if (jobsView == false)
            {
                if (isDebugInfo)
                {
                    console.log("Se ocultan las obras ya que esta desactivada la opcion");
                }
                this.hiddenAllJobs();
            }

        },
        showHiddenJob: function (id)
        {
            ///
            /// Tomamos el valor de check para revisar si esta On o Off
            ///
            let isChecked = document.getElementById('job_' + id).checked;
            if (isChecked)
            {
                ///
                /// Agregamos al ticket al listado
                ///
                aztrack.job.show(id);
            }
            else
            {
                ///
                /// Eliminamos al ticket del listado
                ///
                aztrack.job.delete(id);
            }
        },
        showHiddenAllJobs: function ()
        {
            ///
            /// Tomamos el valor de check para revisar si esta On o Off
            ///
            let isChecked = document.getElementById('jobs_all').checked;


            if (isChecked)
            {
                jobsView = true;
                this.jobsView = true;
                ls.setItem("jobsView", true);
            }
            else
            {
                jobsView = false;
                this.jobsView = false;
                ls.setItem("jobsView", false);
            }

            jobs.forEach(function (job, id)
            {
                try
                {
                    if (typeof jobs_geofences[job.id] !== 'undefined')
                    {
                        if (isChecked)
                        {
                            ///
                            /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                            ///
                            document.getElementById('job_' + job.id).checked = true;
                            ///
                            /// Enviamos el ticket para que se vuelva a hacer visible en la pantalla del mapa.
                            ///
                            aztrack.job.show(job.id);
                        }
                        else
                        {
                            ///
                            /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                            ///
                            document.getElementById('job_' + job.id).checked = false;
                            ///
                            /// Enviamos el ticket para que se desmarque de la pantalla del mapa.
                            ///
                            aztrack.job.delete(job.id);
                        }
                    }
                    else
                    {
                        console.log('JOB ID: ' + job.id + ' undefined');
                    }
                }
                catch (e)
                {
                    console.error('Error: ' + e);
                }
            });

        },
        hiddenAllJobs: function ()
        {
            jobs.forEach(function (job, id)
            {
                try
                {
                    if (typeof jobs_geofences[job.id] !== 'undefined')
                    {
                        ///
                        /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                        ///
                        ///document.getElementById('job_' + job.id).checked = false;
                        ///
                        /// Enviamos el ticket para que se desmarque de la pantalla del mapa.
                        ///
                        aztrack.job.delete(job.id);
                    }
                    else
                    {
                        console.log('JOB ID: ' + job.id + ' undefined');
                    }
                }
                catch (e)
                {
                    console.error('Error: ' + e);
                }
            });

        },
    },
    computed: {
        filteredListTicket: function ()
        {
            if (this.job_search != "")
            {
                this.job_loading = true;
                axios.get('/ajax/job/all?search=' + this.job_search)
                    .then((response) =>
                    {
                        return response.data.data;
                    }).catch(function (error)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                }).finally(() => (this.job_loading = false));
            }
            else
            {

                return this.jobs_plants.filter(ticket =>
                {
                    return ticket.search.toLowerCase().includes(this.job_search.toLowerCase())
                });
            }
        }
    }
};
</script>
