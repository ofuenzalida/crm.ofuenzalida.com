function UpdateDashboard()
{
    let _this = this;

    _this.update = function(plant_id)
    {
        axios
            .get('/cpadmin/ajax/dashboard/'+plant_id)
            .then((response)=>{
                let data = response.data.data;
                document.getElementById('load_scheduled').innerHTML             = data.load_scheduled ;
                document.getElementById('load_incomplete_cycle').innerHTML      = data.load_incomplete_cycle ;
                document.getElementById('load_complete_cycle').innerHTML        = data.load_complete_cycle ;


                document.getElementById('plant_mouths').innerHTML               = data.plant_mouths ;
                document.getElementById('plant_vehicles').innerHTML             = data.plant_vehicles ;
                document.getElementById('plant_devices').innerHTML              = data.plant_devices ;
                document.getElementById('tickets_processed').innerHTML          = data.tickets_processed ;


                document.getElementById('vehicles_not_cycle').innerHTML         = data.vehicles_not_cycle ;

                document.getElementById('vehicles_in_workshop').innerHTML       = data.vehicles_in_workshop ;
                document.getElementById('vehicles_not_transmission').innerHTML  = data.vehicles_not_transmission ;
                document.getElementById('vehicles_in_plant').innerHTML          = data.vehicles_in_plant ;



                document.getElementById('vehicles_cycle').innerHTML             = data.vehicles_cycle ;

                document.getElementById('vehicles_loading').innerHTML           = data.vehicles_loading ;
                document.getElementById('vehicles_to_job').innerHTML            = data.vehicles_to_job ;
                document.getElementById('vehicles_in_job').innerHTML            = data.vehicles_in_job ;
                document.getElementById('vehicles_downloading').innerHTML       = data.vehicles_downloading ;
                document.getElementById('vehicles_to_plant').innerHTML          = data.vehicles_to_plant ;

                let vehicles_last_movelemts = response.data.data.vehicles_last_movements;
                let tr = "";
                let index = 1;
                vehicles_last_movelemts.forEach(vehicle =>
                               {
                                   tr +=  `<tr>
                                                <td>${index}</td>
                                                <td>
                                                    <div class="d-inline-block align-middle">
                                                        <img src="/assets/truck.png" alt=""
                                                             class="img-radius wid-40 align-top m-r-15">
                                                        <div class="d-inline-block pt-2 mt-1">
                                                            <h6>MX-${vehicle.truck_code}</h6>
                                                            <p class="text-muted m-b-0"></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>${vehicle.updated_at}</td>
                                                <td>${vehicle.t_m_tp_ji_ticket_code}</td>
                                                <td>${vehicle.t_m_tp_ji_t_m_tp_ji_ticket_qty}</td>`
                                   if(vehicle.state === 0)
                                   {
                                       tr+= `<td className="text-center">
                                                <label className="badge badge-light-danger">Rechazado</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 1)
                                   {
                                       tr+= `<td className="text-center">
                                                <label className="badge badge-light-danger">Cargando</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 2)
                                   {
                                       tr+= `<td className="text-center">
                                              <label class="badge badge-light-danger">Cargando</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 4)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">A obra</label>
                                            </td>`
                                   }

                                   else if(vehicle.state === 5)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">En obra</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 8)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">Descargando</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 12)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">A planta</label>
                                            </td>`
                                   }
                                   else if(vehicle.state === 13)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">En planta</label>
                                            </td>`
                                   }
                                   else
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-light-danger">Otro</label>
                                            </td>`
                                   }

                                   if(vehicle.transmit === true)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge badge-success">Ok</label>
                                            </td>`
                                   }
                                   else if(vehicle.transmit === false)
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge-danger">Falla</label>
                                            </td>`
                                   }
                                   else
                                   {
                                       tr+= `<td className="text-center">
                                            <label class="badge">Revisar</label>
                                            </td>`
                                   }

                                    tr += '</tr>'
                                    index++;
                               });
                $('#tbody_vehicle_last_movements').empty().append(tr);
                console.log('Datos Actualizados');
                }).catch(function (error)
                                     {
                                         if (isDebugCatch)
                                         {
                                             console.error("AJAX | ERROR _> " + error);
                                         }
                                    });
    }
    _this.reload = function ()
    {
        setInterval(function () {
            _this.update($('#select_plant option:selected').val());
        //}, 30000);
      }, ajax_timer);
    };
}