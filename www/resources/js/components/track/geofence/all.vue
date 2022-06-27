<template>
    <div class="asdf">
        <div v-if="loading">
            Cargando...
        </div>
        <div v-else>
            <div v-if="!geofences.length">
                No hay Geocercas
            </div>
            <div v-else>
                <div v-for="(geofence, index) in geofences">
                    <div v-if="geofence.name">
                        <div class="custom-control custom-switch custom-switch-success mr-2 mb-1">
                            <input type="checkbox" class="custom-control-input view_geofence_map" checked
                                   :name="geofence.id" :id="geofence.id">
                            <label class="custom-control-label" :for="geofence.id">
                                <span class="switch-text-left">On</span>
                                <span class="switch-text-right">Off</span>
                            </label>
                            <span class="menu-title">
                            {{geofence.name}}
                        </span>
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
                geofences: [],
                loading: true,
            }
        },
        mounted()
        {
            this.$nextTick(function ()
            {
                this.getVehiclesAll();
            })
            console.log('Component geofences-all load');
        },
        methods: {
            getVehiclesAll()
            {
                axios.get('/ajax/geofence/all')
                    .then((response) =>
                    {
                        this.geofences = response.data.data;
                        this.loading = false;
                    }).catch(function (error)
                {
                    console.log('Ocurrio un error no controlado:' + error);
                });
            }
        },
    }
</script>
