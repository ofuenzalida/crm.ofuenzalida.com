/**
 * Libreria para manipulación de poligono de Obras en el sistema
 */
function Job()
{
    let _this = this;

    function seardMe(d,o)
    {
        let search =  document.getElementById("basicInputJob").value; 
        let rst = false;
        let val3;
        let iii;
        let count = 0;
        search = search.toUpperCase()
        search = search.trim()
        
        jQuery.each(d, function(iii, val3) 
        { 
              if (search != "")
              {
                    if (o == 0) 
                    { 
                        if (toUpperCase(val3.job_name) == search) rst =  true;
                    }
                    else
                    {
                        if (iii == "job_name") if (val3.job_name.includes(search)) rst =  true;
                    }
              }
        });
        return rst;
    }

    function paintDataJobs(data)
    {
        let html = '';
        let count;
        html = '<div class="accordion" id="ExPlantIDJob">';

        jQuery.each(data, function(i, tg) 
        {
            count = 0;
            jQuery.each(tg, function(ii, job) 
            {
                if (seardMe(job.jobs,2) == true) count++;
            });

            if (seardMe(tg.jobs,0) == true) 
            {
                  html = html + `
                  <div class="card-body">
                    <div class="collapse-margin"> 
                      <div class="row">
                          <div class="col-12">
                              <div class="divider divider-success">
                                  <div class="divider-text">
                                      `+tg.name+`
                                  </div>
                              </div>`                      

                   jQuery.each(tg.jobs, function(ii, job) 
                   {  
                      if (job.id != "")
                      { 
                         if (seardMe(job,1) == true)
                         {              
                           html = html +`
                           <div id="job_`+job.id+`">
                                <div class="divider divider-info">
                                    <div class="divider-text">
                                        Obra Code : `+job.number+` 
                                    </div>
                                </div>
                                <div class="row">
                                    <!--
                                    <div class="offset-1 col-3">
                                        <div class="custom-control custom-switch custom-switch-success">
                                            <p class="mb-50">Visible</p>
                                            <input type="checkbox" class="custom-control-input"
                                                   id="geofence_job_`+job.id+`"
                                                   checked onclick="aztrack.job.showHidden(`+job.id+`)"/>
                                            <label class="custom-control-label" for="geofence_job_`+job.id+`">
                                                <span class="switch-icon-left"><i data-feather="check"></i></span>
                                                <span class="switch-icon-right"><i data-feather="x"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    -->
                                    <!--
                                    <div class="col-3">
                                        <p class="mb-50">&nbsp;</p>
                                        <div class="custom-control custom-control-success custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="view_ticket_`+job.id+`"
                                                   onclick="aztrack.ticket.view(`+job.id+`)"
                                                   name="view_job_`+job.id+`"/>
                                            <label class="custom-control-label" for="view_ticket_`+job.id+`">Ver</label>
                                        </div>
                                    </div>
                                    -->
                                    <!--
                                    <div class="col-3">
                                        <p class="mb-50">&nbsp;</p>
                                        <div class="custom-control custom-control-success custom-checkbox">
                                            <a class="btn btn-primary" href="/cpadmin/maintainer/job/`+job.id+`/edit">Editar</a>
                                        </div>
                                    </div>
                                    -->
                                </div>
                                <br/>
                                <div class="row">
                                    <div class="col-12">
                                        <table class="table table-striped job_table_info">
                                            <tr>
                                                <td class="job_client">Cliente:</td>
                                                <td>
                                                    <div class="job_client">`+job.client+`</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="job_address">Dirección:</td>
                                                <td>
                                                    <div class="job_address">`+job.job_address+`</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="job_address">Rut Cliente:</td>
                                                <td>
                                                    <div class="job_address">MX-`+job.rut_cliente+`</div>
                                                </td>
                                            </tr>

                                        </table>
                                    </div>
                                </div>
                            </div>`
                        }   
                    
                       html = html +`
                              </div>
                          </div>
                        </div>
                      </div>`    
                    }
 
              });
              html = html + `</div>`;
            }
         });
        
         if (html == '<div class="accordion" id="ExPlantIDJob">') 
         {
                html = `
                <div class="alert alert-danger" role="alert">
                  <center>Sin información para la busqueda...</center>
                </div>`
                $('#accordionJob').show();
                $('#accordionJobSearch').html(html); 
  
          }  
          else
          {
                $('#accordionJob').hide();
                $('#accordionJobSearch').html(html);
          }  
          $('#accordionJobSearch').show(); 
          $('#lodingJob').hide();
    }

    _this.searchJobForm = function (event)
    {

        _this.ticket_loading = true;
        let search = document.getElementById("basicInputJob").value;
        let api_urlf =  "/ajax/job/all/"
        if (search != '')
        {
            $('#lodingJob').show();
            $('#accordionJob').hide();
            $('#accordionJobSearch').hide();

            axios.get(api_urlf)
                 .then((response) =>
                       {
                           _this.job_loading = false;
                           _this.job_plants = response.data.data;
                           paintDataJobs(response.data.data);

                          }).catch(function (error)
                                {
                                    if (isDebugInfo)
                                    {
                                        console.log('Ocurrio un error no controlado:' + error); //isDebugInfo
                                    }
                                }).finally(() => (this.ticket_loading = false));
        
        }
        else
        {
            $('#accordionJobSearch').hide();
            $('#lodingJob').hide();
            $('#accordionJob').show();
            _this.getTicketsAll();
        }
    };



    _this.add = function (job)
    {
        try
        {
            /**
             * Si la variable no existe se agrega a la matriz,
             * si existe no se se agrega por que se encuentra repetida
             */
            if (typeof jobs_geofences[job.id] === "undefined")
            {

                if (isDebugInfo)
                {
                    console.log('JOB | add | ID _> ' + job.id); //isDebugInfo
                }

                if (job.latitude != null || job.longitude != null)
                {
                    let job_html = '<table>' +
                        '<tr><td><strong>Nombre:</strong> &nbsp;</td><td>' + job.job_name + '</td></tr>' +
                        '<tr><td><strong>Nombre Cliente:</strong> &nbsp;</td><td>' + job.client + '</td></tr>' +
                        ' <tr><td><strong>Dirección:</strong> &nbsp;</td><td>' + job.job_address + '</td></tr> ' +
                        '<tr><td><strong>Numero Obra:</strong> &nbsp;</td><td>' + job.job_number + '</td></tr>' +
                        '<tr><td><strong>Fecha:</strong> &nbsp;</td><td>' + job.date + '</td></tr>' +
                        '<tr><td><strong>Rut Cliente:</strong> &nbsp;</td><td>' + job.rut_client + '</td></tr>' +
                        '</table>';

                    let position_job = [];
                    let coordinate;

                    if ((typeof job.polygon === 'string') && job.polygon != '')
                    {
                        coordinate = JSON.parse(job.polygon);
                    }
                    else
                    {
                        coordinate = job.polygon;
                    }
                    ///
                    /// Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                    ///
                    ///position_tracking.push([job.latitude, vehicle.longitude]);
                    for (let i = 0; i < coordinate.length; i++)
                    {
                        position_job.push([coordinate[i].lat, coordinate[i].lng]);
                    }

                    jobs[job.id] = job;

                    ///
                    /// Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                    ///
                    jobs_geofences[job.id] = L.polygon(position_job, {
                        color: job.polygon_color,
                    }).bindPopup(job_html, {maxWidth: 500}).addTo(map);

                    jobs_geofences_description[job.id] = new L.Marker(
                        null,
                        {
                            icon: L.divIcon({
                                                html: '<div class="name" style="background-color: ' + convertHex(job.polygon_color_tag || job.polygon_color, 81) + '">' + job.name + '</div>',
                                                className: 'leaflet-popup-geofence',
                                                iconSize: 'auto'
                                            })
                        }
                    ).setLatLng(jobs_geofences[job.id].getBounds().getCenter()).addTo(map);
                }
                else
                {
                    console.log('JOB | add  | no contiene latitud y longitud | ID _> ' + job.id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            console.error('JOB | add | ERROR _> ' + e);
        }

    };
    _this.show = function (id)
    {
        if (typeof jobs[id] !== 'undefined')
        {
            jobs_geofences[id].addTo(map);
            jobs_geofences_description[id].addTo(map);
        }
        else
        {
            if (isDebug)
            {
                console.log('JOB | show | No existe jobs_geofences _> ' + id); //isDebugInfo
            }
        }
    };

    _this.delete = function (id)
    {
        try
        {
            if (typeof jobs_geofences[id] !== 'undefined')
            {
                jobs_geofences[id].remove();
                jobs_geofences_description[id].remove();
            }
            else
            {
                if (isDebugInfo)
                {
                    console.log('JOB | remote | No existe la jobs_geofences _> ' + id); //isDebugInfo
                }
            }
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('JOB | remote | ERROR _> ' + e)
            }
        }
    };

    _this.view = function (id)
    {
        if (isDebugInfo)
        {
            console.log('JOB | viewJob | ID: ' + id); //isDebugInfo
        }

        jobs.forEach(function (job, index)
                     {
                         try
                         {
                             /**
                              * Desmarcamos todos los demas checkbox para que solo este activo el selecionado
                              */
                             if (job.id != id)
                             {
                                 document.getElementById('view_coverage_' + job.id).checked = false;
                             }

                         }
                         catch (e)
                         {
                             console.error('Error: ' + e);
                         }
                     });


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
    };
    _this.cleanAll = function ()
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
                                               console.log('Ticket ID: ' + id + ' undefined'); //isDebugInfo
                                           }
                                       }
                                       catch (e)
                                       {
                                           console.error('Error: ' + e);
                                       }
                                   });
        }
        jobs_geofences = [];
    };
    _this.paintAllJobs = function ()
    {
        if (isDebugInfo) {
            console.log('paintAllJobs'); //isDebugInfo
        }

        _this.jobs_plants.forEach(function (plant, index)
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
                console.log("Se ocultan las obras ya que esta desactivada la opcion"); //isDebugInfo
            }
            _this.hiddenAllJobs();
        }

    };
    _this.showHidden = function (id)
    {
        ///
        /// Tomamos el valor de check para revisar si esta On o Off
        ///
        let isChecked = document.getElementById('geofence_job_' + id).checked;
        if (isChecked)
        {
            ///
            /// Agregamos al ticket al listado
            ///
            _this.show(id);
        }
        else
        {
            ///
            /// Eliminamos al ticket del listado
            ///
            _this.delete(id);
        }
    };

    _this.showHiddenAll = function ()
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
                                     document.getElementById('geofence_job_' + job.id).checked = true;
                                     ///
                                     /// Enviamos el ticket para que se vuelva a hacer visible en la pantalla del mapa.
                                     ///
                                     _this.show(job.id);
                                 }
                                 else
                                 {
                                     ///
                                     /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                                     ///
                                     document.getElementById('geofence_job_' + job.id).checked = false;
                                     ///
                                     /// Enviamos el ticket para que se desmarque de la pantalla del mapa.
                                     ///
                                     _this.delete(job.id);
                                 }
                             }
                             else
                             {
                                 if (isDebugInfo) {
                                     console.log('JOB ID: ' + job.id + ' undefined'); //isDebugInfo
                                 }
                             }
                         }
                         catch (e)
                         {
                             console.error('Error: ' + e);
                         }
                     });

    };

    _this.hiddenAll = function ()
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
                                 ///document.getElementById('geofence_job_' + job.id).checked = false;
                                 ///
                                 /// Enviamos el ticket para que se desmarque de la pantalla del mapa.
                                 ///
                                 _this.delete(job.id);
                             }
                             else
                             {
                                 if (isDebugInfo) {
                                     console.log('JOB ID: ' + job.id + ' undefined'); //isDebugInfo
                                 }
                             }
                         }
                         catch (e)
                         {
                             console.error('Error: ' + e);
                         }
                     });

    };
};
