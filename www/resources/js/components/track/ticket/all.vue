<template>
    <div class="letruta asdf">
        <div class="ticket_search-wrapper">
            <div class="row">
                <div class="offset-xl-1 col-xl-10 mb-1">
                    <div class="row">
                        <div class="col-9">
                            <input id="basicInput" class="form-control" type="text" v-model="ticket_search"
                                   @change="searchTicket($event)"
                                   placeholder="Buscador..."/>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-success mr-1 mb-1 waves-effect waves-light pull-right btn-sm"
                                    @click="searchTicket($event)">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" v-if="ticket_loading">
            <div class="col-12">
                <vs-progress :height="10" indeterminate color="success"></vs-progress>
            </div>
        </div>
        <div class="row" v-else>
            <div class="offset-1 col-10 mb-1">
                <div class="col-12 mb-1">
                    <div v-if="!ticket_search.length">
                        <p class="letruta mb-0">Seleccionar Todo</p>
                        <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                            <input v-if="ticketsView" v-on:click="showHiddenAllTickets()" type="checkbox"
                                   class="custom-control-input"
                                   id="tickets_all">
                            <input v-else v-on:click="showHiddenAllTickets()" type="checkbox"
                                   class="custom-control-input"
                                   id="tickets_all">
                            <label class="custom-control-label" for="tickets_all">
                                <span class="switch-text-left">On</span>
                                <span class="switch-text-right">Off</span>
                            </label>
                        </div>

                        <!--<span>
                                <li class="d-inline-block mr-2">
                                            <fieldset>
                                                <div class="vs-radio-con vs-radio-success">
                                                    <input type="radio" name="view_ticket" value="false"
                                                           id="view_ticket_0"
                                                           v-on:click="viewTicket(0)"/>
                                                    <span class="vs-radio">
                                                        <span class="vs-radio--border"></span>
                                                        <span class="vs-radio--circle"></span>
                                                     </span>
                                                    <span class="">Ver</span>
                                                </div>
                                            </fieldset>
                                </li>
                        </span>-->
                    </div>
                </div>

                <div class="letruta" v-for="(plant, index) in tickets_plants">
                    <span class="ama">Planta:</span>
                    <span class="letruta">
                     {{ plant.name }} ({{ plant.plant_code }}) - ({{ plant.tickets.length }})
                    </span>
                    <div v-if="!plant.tickets.length">
                        No existe tickets asignado...
                        <br/>
                        <br/>
                    </div>
                    <div v-else>
                        <div v-for="(ticket, index) in plant.tickets">
                            <div v-if="ticket.id">
                                <div class="custom-control custom-switch custom-switch-success mr-2">
                                    <input v-if="(ticketsView == true)" type="checkbox"
                                           class="custom-control-input view_geofence_map" checked
                                           :name="ticket.id" :id="'ticket_'+ticket.id"
                                           v-on:click="showHiddenTicket(ticket.id)">
                                    <input v-else type="checkbox" class="custom-control-input view_geofence_map"
                                           :name="ticket.id" :id="'ticket_'+ticket.id"
                                           v-on:click="showHiddenTicket(ticket.id)">

                                    <label class="custom-control-label" :for="'ticket_'+ticket.id">
                                        <span class="switch-text-left">On</span>
                                        <span class="switch-text-right">Off</span>
                                    </label>
                                    <span class="letruta menu-title" data-toggle="tooltip" data-html="true"
                                          :title="ticket.id" style="font-size:10px !important;">
                                            ({{ ticket.vehicle_unit_code }}) | T: {{ ticket.t_m_tp_ji_ticket_code }} | {{
                                            ticket.t_m_tp_ji_t_m_tp_ji_ticket_qty
                                        }} m³
                                          <li class="d-inline-block mr-2">
                                                <fieldset>
                                                    <div class="vs-radio-con vs-radio-success">
                                                        <input type="radio" name="view_ticket" value="false"
                                                               :id="'view_ticket_'+ticket.id"
                                                               v-on:click="viewTicket(ticket.id)"/>
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
            tickets_plants: [],
            tickets_plants_bk: [],
            ticket_info: [],
            ticket_search: '',
            ticket_loading: true,
            ticket_data_search: [],
            ticketsView: true,
        }
    },
    mounted()
    {
        this.$nextTick(function ()
        {
            /**
             * Verificamos si existe ticketsView en el storage local si no existe,
             * lo crea por defecto en TRUE
             */
            ticketsView = ls.getItem('ticketsView')
            if (ticketsView === null)
            {
                ticketsView = true;
                ls.setItem("ticketsView", true);
            }
            else
            {
                ticketsView = JSON.parse(ticketsView);
            }
            this.ticketsView = ticketsView;

            this.getTicketsAll();
            /*
            setInterval(() =>
            {
                this.getTicketsAll()
            }, 600000);
            */
        });
        console.log('Component tickets-all load');
    },
    methods: {
        socketTicketDelete: function ()
        {
            if (isDebugInfo)
            {
                console.log('TICKET | socketDelete | iniciando socket...');
            }
            try
            {
                let _this = this;
                plants.forEach(function (data, index)
                {
                    data.plants.forEach(function (pit, index)
                    {
                        if (isDebugInfo)
                        {
                            console.log('VEHICLE | WEBSOCKET | CHANNEL | ticket-delete_' + pit.id + ' | OK');
                        }

                        Echo.channel('POL_PROD_MOVE_ticket-delete_' + pit.id).listen('GeofenceDeleteEvent', (e) =>
                            {
                                let ticket = e.message;

                                if (isDebugInfo)
                                {
                                    console.log('TICKET | socketDelete | Recibiendo _> ' + ticket.id);
                                }

                                if (typeof tickets[ticket.id] !== 'undefined')
                                {
                                    if (isDebugInfo)
                                    {
                                        console.log('TICKET STATE _> ID: ' + ticket.id + ' | Ticket Code: ' + ticket.t_m_tp_ji_ticket_code + ' | Vehicle ID: ' + ticket.vehicle_unit_code + ' | STATE: ' + ticket.state);
                                    }
                                    tickets_geofences[ticket.id].remove();
                                    tickets_geofences_description[ticket.id].remove();

                                    ///
                                    /// Se ejecuta nuevamente la carga de los tickets, para que se refleje la eliminación
                                    /// en el panel del listado y busqueda de ticket...
                                    ///
                                    _this.getTicketsAllUpdate();
                                }
                                else
                                {
                                    console.log('TICKET | socketDelete | TICKET STATE _> ' + ticket.id + ' | no existe');
                                }
                            },
                        );
                    });
                });
            }
            catch (e)
            {
                if (isDebugCatch)
                {
                    console.error('TICKET | socketDelete | ERROR _> ' + e);
                }
            }

        },
        socketTicketNew: function ()
        {
            if (isDebugInfo)
            {
                console.log('TICKET | socketNew | iniciando socket...');
            }
            try
            {
                let _this = this;
                plants.forEach(function (data, index)
                {
                    data.plants.forEach(function (pit, index)
                    {
                        if (isDebugInfo)
                        {
                            console.log('VEHICLE | WEBSOCKET | CHANNEL | ticket-new_' + pit.id + ' | OK');
                        }

                        Echo.channel('POL_PROD_MOVE_ticket-new_' + pit.id).listen('TicketNewEvent', (e) =>
                        {
                            let ticket = e.message;

                            if (ticket.latitude != null || ticket.longitude != null)
                            {
                                if (isDebugInfo)
                                {
                                    console.log('TICKET | socketNew | Recibiendo _> ' + ticket.id);
                                }

                                let ticket_html = '<table>' +
                                    '<tr><td><strong>Nombre:</strong> &nbsp;</td><td>' + ticket.name + '</td></tr>' +
                                    '<tr><td><strong>Nombre Cliente:</strong> &nbsp;</td><td>' + ticket.t_m_tp_sj_id + '</td></tr>' +
                                    ' <tr><td><strong>Código del Ticket:</strong> &nbsp;</td><td>' + ticket.t_m_tp_ji_ticket_code + '</td></tr> ' +
                                    '<tr><td><strong>Número de Obra:</strong> &nbsp;</td><td>' + ticket.t_m_tp_sj_a_postal_code + '</td></tr>' +
                                    '<tr><td><strong>M³:</strong> &nbsp;</td><td>' + ticket.t_m_tp_ji_t_m_tp_ji_ticket_qty + '</td></tr>' +
                                    '</table>';

                                tickets[ticket.id] = ticket;

                                ///
                                /// Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                                ///

                                ///
                                /// Dibujo circulo con la misma libreria
                                ///
                                tickets_geofences[ticket.id] = L.circle([ticket.latitude, ticket.longitude], {
                                    radius: 250,
                                    color: ticket.polygon_color
                                }).bindPopup(ticket_html, {maxWidth: 500}).addTo(map);

                                ///
                                /// Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                                // ///
                                // let position_ticket = [];
                                // let coordinate;
                                //
                                // if ((typeof ticket.polygon === 'string') && ticket.polygon != '')
                                // {
                                //     coordinate = JSON.parse(ticket.polygon);
                                // }
                                // else
                                // {
                                //     coordinate = ticket.polygon;
                                // }
                                // ///
                                // /// Se agrega la posición actual del vehiculo para que se pinte conectada al vehiculo
                                // ///
                                // ///position_tracking.push([job.latitude, vehicle.longitude]);
                                // for (let i = 0; i < coordinate.length; i++)
                                // {
                                //     position_ticket.push([coordinate[i].lat, coordinate[i].lng]);
                                // }

                                // tickets_geofences[ticket.id] = L.polygon(position_ticket, {
                                //     color: ticket.polygon_color,
                                // }).bindPopup(ticket_html).addTo(map);

                                tickets_geofences_description[ticket.id] = new L.Marker(
                                    null,
                                    {
                                        icon: L.divIcon({
                                            html: '<div class="name" style="background-color: ' + convertHex(ticket.polygon_color_tag || ticket.polygon_color, 81) + '">' + ticket.name + '</div>',
                                            className: 'leaflet-popup-geofence',
                                            iconSize: 'auto'
                                        })
                                    }
                                ).setLatLng(tickets_geofences[ticket.id].getBounds().getCenter()).addTo(map);

                                ///
                                /// Levantamos popup de aviso de nuevo ticket
                                ///
                                let ticket_html_info = 'Se acaba de crear nuevo Ticket ' +
                                    '<br/> ID: ' + ticket.t_m_tp_ji_ticket_code +
                                    '<br/> Nombre: ' + ticket.name +
                                    '<br/> Obra: ' + ticket.t_m_tp_sj_a_postal_code +
                                    '<br/> Cliente: ' + ticket.t_m_tp_sj_id +
                                    '<br/> Mixer: ' + ticket.vehicle_unit_code +
                                    '<br/>m³: ' + ticket.t_m_tp_ji_t_m_tp_ji_ticket_qty;

                                aztrack.popup.info('Nuevo Ticket', ticket_html_info);

                                ///
                                /// Luego que un ticket new llego al WebSocket, se procese a carga nuevamente el listado de ticket
                                /// Para que este sea reflejado en el listado de busqueda y uso y vuejs se encarge de pintalo en ese listado
                                ///
                                _this.getTicketsAllUpdate();
                            }
                            else
                            {
                                console.error('TICKET | socketNew | ERROR: no contiene latitud y longitud <-> ticket id: ' + ticket.id);
                            }
                        });
                    });
                });
            }
            catch (e)
            {
                if (isDebugCatch)
                {
                    console.error('TICKET | socketNew | ERROR _> ' + e);
                }
            }
        },
        searchTicket: function (event)
        {
            this.ticket_loading = true;

            if (this.ticket_search != '')
            {
                axios.get(api_url + '/tickets/all/' + user.id + '/search/' + this.ticket_search)
                    .then((response) =>
                    {
                        this.ticket_loading = false;
                        this.tickets_plants = response.data.data;
                    }).catch(function (error)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                }).finally(() => (this.ticket_loading = false));
            }
            else
            {
                this.getTicketsAll();
            }
        },
        viewTicketInfo: function (id)
        {
            console.log(id);
        },
        viewTicket: function (id)
        {
            console.log('Ticket ID: ' + id);
            let ticket = tickets_geofences[id];
            if (ticket != null)
            {
                let latLng = ticket.getLatLngs();
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
        async getTicketsAll()
        {
            this.ticket_loading = true;
            await axios.get(api_url + '/tickets/all/' + user.id)
                .then((response) =>
                {
                    this.tickets_plants = response.data.data;
                    this.tickets_plants_bk = response.data.data;
                    this.ticket_loading = false;
                })
                .catch(function (error)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                })
                .finally(() => (this.ticket_loading = false));

            await this.paintAllTickets();

        },
        getTicketsAllUpdate: function ()
        {
            this.ticket_loading = true;
            axios.get(api_url + '/tickets/all/' + user.id)
                .then((response) =>
                {
                    this.tickets_plants = response.data.data;
                    this.tickets_plants_bk = response.data.data;
                    this.ticket_loading = false;
                })
                .catch(function (error)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                })
                .finally(() => (this.ticket_loading = false));

        },

        cleanAllTickets: function ()
        {
            if (tickets_geofences.length > 0)
            {
                tickets_geofences.forEach(function (valor, id)
                {
                    try
                    {
                        if (typeof tickets_geofences[id] !== 'undefined')
                        {
                            tickets_geofences.removeLayer(tickets[id]);
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
            tickets_geofences = [];
        },
        paintAllTickets: function ()
        {
            console.log('paintAllTickets');
            this.tickets_plants.forEach(function (plant, index)
            {
                ///
                /// Verificamos que la planta tenga ticket asignados
                ///
                if (plant.tickets.length)
                {
                    ///
                    /// Recorremoces los tickets asignados a la planta
                    ///
                    plant.tickets.forEach(function (ticket, id)
                    {
                        aztrack.ticket.add(ticket);
                        /***
                         * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
                         */
                        if (vehiclesView == false)
                        {
                            aztrack.ticket.delete(ticket.id);
                        }
                    });
                }
            });

            ///
            /// Generamos conexion con el WebSocket
            ///
            aztrack.ticket.socketState();
            this.socketTicketDelete();
            this.socketTicketNew();

            /***
             * Si esta marcado que los vehiculos no sean visibles, luego de agregarlo se borran
             */
            if (ticketsView == false)
            {
                if (isDebugInfo)
                {
                    console.log("Se ocultan los tickets ya que esta desactivada la opcion");
                }
                this.hiddenAllTickets();
            }


        },
        showHiddenTicket: function (id)
        {
            ///
            /// Tomamos el valor de check para revisar si esta On o Off
            ///
            let isChecked = document.getElementById('ticket_' + id).checked;
            if (isChecked)
            {
                ///
                /// Agregamos al ticket al listado
                ///
                aztrack.ticket.show(id);
            }
            else
            {
                ///
                /// Eliminamos al ticket del listado
                ///
                aztrack.ticket.delete(id);
            }
        },
        hiddenAllTickets: function ()
        {

            /**
             * Enviamos a ocultar todos los camiones del mapa
             */

            ticketsView = false;
            this.ticketsView = false;
            ls.setItem("ticketsView", false);

            tickets.forEach(function (valor, id)
                {
                    try
                    {
                        ///
                        /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                        ///
                        //document.getElementById('ticket_' + id).checked = false;
                        ///
                        /// Enviamos el ticket para que se desmarque de la pantalla del mapa.
                        ///
                        aztrack.ticket.delete(id);
                    }
                    catch
                        (e)
                    {
                        console.error('Error: ' + e);
                    }
                }
            );
        },
        showHiddenAllTickets: function ()
        {
            ///
            /// Tomamos el valor de check para revisar si esta On o Off
            ///
            let isChecked = document.getElementById('tickets_all').checked;

            if (isChecked)
            {
                ticketsView = true;
                this.ticketsView = true;
                ls.setItem("ticketsView", true);
            }
            else
            {
                ticketsView = false;
                this.ticketsView = false;
                ls.setItem("ticketsView", false);
            }

            tickets.forEach(function (valor, id)
            {
                try
                {
                    if (typeof tickets[id] !== 'undefined')
                    {
                        if (isChecked)
                        {
                            ///
                            /// Marcamos el checkbox activado del vehiculo que se volvera a mostrar
                            ///
                            document.getElementById('ticket_' + id).checked = true;
                            ///
                            /// Enviamos el ticket para que se vuelva a hacer visible en la pantalla del mapa.
                            ///
                            aztrack.ticket.show(id);
                        }
                        else
                        {
                            ///
                            /// Marcamos el checkbox desactivado del vehiculo para no mostrar
                            ///
                            document.getElementById('ticket_' + id).checked = false;
                            ///
                            /// Enviamos el ticket para que se desmarque de la pantalla del mapa.
                            ///
                            aztrack.ticket.delete(id);
                        }
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
        ,
        showTicket: function (id)
        {
            tickets_geofences[id].addTo(map);
            tickets_geofences_description[id].addTo(map);
        }
        ,
        hiddenTicket: function (id)
        {
            tickets_geofences[id].remove();
            tickets_geofences_description[id].remove();
        }
        ,
        openLoading()
        {
            this.$vs.ticket_loading({
                //type: 'circles',
                target: this.$refs.content,
                color: 'blue',
            });
        }
        ,
        openLoadingButton()
        {
            // console.log(this.$refs.button.$el)
            const ticket_loading = this.$vs.ticket_loading({
                target: this.$refs.button,
                scale: '0.6',
                background: 'primary',
                opacity: 1,
                color: '#fff'
            })
            setTimeout(() =>
            {
                ticket_loading.close()
            }, 3000)
        }
        ,
    },
    computed: {
        filteredListTicket: function ()
        {
            if (this.ticket_search != "")
            {
                this.ticket_loading = true;
                axios.get(api_url + '/tickets/all/' + user.id + '/search/' + this.ticket_search)
                    .then((response) =>
                    {
                        return response.data.data;
                    }).catch(function (error)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                }).finally(() => (this.ticket_loading = false));
            }
            else
            {

                return this.tickets_plants.filter(ticket =>
                {
                    return ticket.search.toLowerCase().includes(this.ticket_search.toLowerCase())
                });
            }
        }
    }
    ,
    watch: {
        active(val)
        {
            if (val)
            {
                var interval = setInterval(() =>
                {
                    this.progress++
                }, this.time / 100);

                setTimeout(() =>
                {
                    this.active = false
                    clearInterval(interval)
                    this.progress = 0
                }, this.time);
            }
        }
    }
}
;
</script>
