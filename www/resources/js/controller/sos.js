/**
 * Libreria para manipulación el mensaje de SOS en el sistema
 */
function Sos()
{
    let _this = this;

    _this.socket = function ()
    {
        if (isDebugInfo)
        {
            console.log('SOS | SOCKET | iniciando funcion socket'); //isDebugInfo
        }
        try
        {
            plants.forEach(function (data, index)
                           {
                               data.plants.forEach(function (pit, index)
                                                   {
                                                       if (isDebugInfo)
                                                       {
                                                           console.log('VEHICLE | WEBSOCKET | CHANNEL | sos-message_' + pit.id + ' | OK'); //isDebugInfo
                                                       }
                                                       Echo.channel('POL_PROD_MOVE_sos-message_' + pit.id).listen('SosMessageEvent', (e) =>
                                                                                                    {
                                                                                                        let sos = e.message;

                                                                                                        if (isDebugInfo)
                                                                                                        {
                                                                                                            console.log('SOS | socket | RECIBIENDO MENSAJE _> ' + sos.id); //isDebugInfo
                                                                                                        }


                                                                                                        let modal_sos_message = 'modal_sos_message';
                                                                                                        let html = '  Acaba de ser enviado un mensaje de SOS <br/>se ha generado una emergencia en un operador\n' +
                                                                                                            '                        del camión, los datos del chofer son los siguientes:\n' +
                                                                                                            '                        <br/>Planta: ' + dbPlants[sos.plants_id].name + '\n' +
                                                                                                            '                        <br/>Mixer: ' + dbVehicles[sos.vehicles_id].name + '\n' +
                                                                                                            '                        <br/>Tipo: ' + sos.type_message;
                                                                                                        $('#modal_sos_message_body').html(html);

                                                                                                        $('#modal_sos_message').modal('show');


                                                                                                        let latLng = vehicles_markers[sos.vehicles_id].getLatLng();
                                                                                                        let bounds = [latLng];
                                                                                                        let option = {};

                                                                                                        currentZoom = map.getZoom();

                                                                                                        ///
                                                                                                        /// Verificamos si el Zoom esta al maximo en el mapa, si no
                                                                                                        /// se asignara que este al maximo, pero en la latitud y longitud dada por el vehiculo
                                                                                                        ///
                                                                                                        if (currentZoom < 16)
                                                                                                        {
                                                                                                            option.maxZoom = 16;
                                                                                                        }


                                                                                                        map.fitBounds(bounds, option);

                                                                                                    },
                                                       );
                                                   });
                           });
        }
        catch (e)
        {
            if (isDebugCatch)
            {
                console.error('VEHICLE | ERROR _> ' + e)
            }
        }
    };

}
