/**
 * aztrack variable de controladores del sistema
 */
var aztrack = {
    url: {
        ajax: {
            time: 3000,
        },
        controlling: {
            updateLoadIncomplete: api_host + '/v1/geofence/load/incomplete?api_token=' + api_token,
            updateLoadComplete: api_host + '/v1/geofence/load/complete?api_token=' + api_token,
            updateLoadScheduled: api_host + '/v1/geofence/load/scheduled?api_token=' + api_token,
        }
    },
    truck: {
        status: {
            commands: {
                ack: 1,
                en_ruta: 2,
                en_obra: 3,
                descargando: 4,
                a_planta: 5,
                en_planta: 6
            },
        }
    },
    alert: new Alert(),
    sos: new Sos(),
    popup: new Popup(),
    ticket: new Ticket(),
    vehicle: new Vehicle(),
    vehicleRent: new VehicleRent(),
    vehicleBulk: new VehicleBulk(),
    plant: new Plant(),
    job: new Job(),
    workshop: new Workshop(),
    coverage: new Coverage(),
    updateDashboard: new UpdateDashboard(),
    serviceWorksheet: new ServiceWorksheet(),

};


