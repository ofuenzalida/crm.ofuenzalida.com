<template>
    <li class="dropdown dropdown-notification nav-item">
        <a class="nav-link nav-link-label" href="#"
           data-toggle="dropdown">
            <i class="ficon feather icon-bell"></i>
            <span class="badge badge-pill badge-primary badge-up" id="message_num">
                {{ sos_messages_count }}
            </span>
        </a>
        <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
            <!--
            <li class="dropdown-menu-header">
                <div class="dropdown-header m-0 p-2">
                    <h3 class="white" id="message_num_2">
                        {{ sos_messages_new_count }} New
                    </h3>
                    <span class="notification-title">
                        App Notifications
                    </span>
                </div>
            </li>
            -->
            <li class="scrollable-container media-list">
                <!--
                <a class="d-flex justify-content-between"
                   href="javascript:void(0)">
                    <div class="media d-flex align-items-start">
                        <div class="media-left">
                            <i
                                class="feather icon-plus-square font-medium-5 primary">
                            </i>
                        </div>
                        <div class="media-body">
                            <h6 class="primary media-heading">
                                You have new order!
                            </h6>
                            <small class="notification-text">
                                Are your going to meet me tonight?
                            </small>
                        </div>
                        <small>
                            <time class="media-meta" datetime="2015-06-11T18:29:20+08:00">
                                9 hours ago
                            </time>
                        </small>
                    </div>
                </a>
                -->
                <a class="d-flex justify-content-between" href="javascript:void(0)"
                   v-for="(plant, index) in sos_messages">
                    <div class="media d-flex align-items-start">
                        <div class="media-left">
                            <i
                                class="feather icon-download-cloud font-medium-5 success">
                            </i>
                        </div>
                        <div class="media-body">
                            <h6 class="success media-heading red darken-1">BC: ({{ plant.id }})</h6>
                            <small
                                class="notification-text">{{ plant.name }}</small>
                        </div>
                        <small>
                            <time class="media-meta" datetime="2015-06-11T18:29:20+08:00">
                                xxxxxx
                            </time>
                        </small>
                    </div>
                </a>
            </li>
            <li class="dropdown-menu-footer">
                <a class="dropdown-item p-1 text-center" href="javascript:void(0)">
                    Ver todos los mensajes
                </a>
            </li>
        </ul>
    </li>
</template>
<script>
export default {
    data()
    {
        return {
            sos_messages: [],
            sos_messages_new_count: 0,
            sos_messages_count: 0,
            sos_messages_search: '',
            loading: true,
        }
    },
    mounted()
    {
        this.$nextTick(function ()
        {
            this.getSosMessageAll();
            /*
            setInterval(() =>
            {
                this.getVehiclesAll()
            }, 600000);
            */
        });
        console.log('Component sos-message load');
    },
    methods: {
        getSosMessageAll: function ()
        {
            this.loading = true;
            axios.get('/ajax/sos/message')
                .then((response) =>
                {
                    if (isDebugInfo)
                    {
                        console.log('API: /ajax/sos/message  | Cargado con exito...');
                    }
                    this.sos_messages = response.data.data;
                    this.loading = false;


                    ///
                    /// Ponemos a escucha el WSS para los nuevos mensajes de SOS
                    ///
                    aztrack.sos.socket();

                }).catch(function (error)
            {
                if (isDebugCatch)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                }
            }).finally(() => (this.ticket_loading = false));
        },
    },
    computed: {
        filteredList()
        {
            return this.plants_vehicles.filter(plant =>
            {
                return plant.search.toLowerCase().includes(this.search.toLowerCase())
            });
        }
    },
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
};
</script>

