import Vue from "vue";
import store from "./index";

export default {
    state: {
        plants_vehicles: [],
        plants_vehicles_temp: [],
    },
    getters: {
        getplantsVehiclesFormGetters(state)
        {
            return state.plants_vehicles;
        }
    },
    actions: {
        allplantsVehicles(context)
        {
            if (isDebugInfo)
            {
                console.log('VUEJS | STORE | VEHICLE | allplantsVehicles | iniciando...'); //isDebugInfo
            }
            return new Promise((resolve, reject) =>
                               {
                                   ///
                                   /// Enviamos a la api con el ID del usuario para filtrar sus plantas habilitadas
                                   ///
                                       axios.get(api_url + '/vehicles/all/' + user.id)
                                        .then((response) =>
                                              {

                                                  /**
                                                   * Tomamos todos los vehiculos de la respuesta del ajax, y los recorremos
                                                   * 1 a 1 para respetar la asignación del ID de la base de dato en el array
                                                   * contenedora de los datos
                                                   * @type {*[]}
                                                   */
                                                  let plants_vehicles = response.data.data;
                                                  // let plants_vehicles = [];
                                                  // if (response.data.data && response.data.data.length > 0)
                                                  // {
                                                  //     for (let i = 0; i < response.data.data.length; i++)
                                                  //     {
                                                  //         let plant = [];
                                                  //         let vehicles = [];
                                                  //         let vehicles_count = 0;
                                                  //
                                                  //         plant = response.data.data[i];
                                                  //         plants_vehicles[plant.id] = plant;
                                                  //
                                                  //         if (plant.vehicles.length > 0)
                                                  //         {
                                                  //             /**
                                                  //              * Recorremos 1 a 1 los vehiculo por planta
                                                  //              */
                                                  //             for (let j = 0; j < plant.vehicles.length; j++)
                                                  //             {
                                                  //                 vehicles[plant.vehicles[j].id] = plant.vehicles[j];
                                                  //                 vehicles_count++;
                                                  //             }
                                                  //             plants_vehicles[plant.id].vehicles = vehicles;
                                                  //         }
                                                  //         else
                                                  //         {
                                                  //             plants_vehicles[plant.id].vehicles = [];
                                                  //         }
                                                  //         plants_vehicles[plant.id].vehicles_count = vehicles_count;
                                                  //     }
                                                  // }

                                                  /**
                                                   * Agregamos al storage las plantas con vehiculos
                                                   */
                                                  context.commit('plantsVehicles', plants_vehicles);
                                                  resolve(response);
                                              }
                                        ).catch(function (error)
                                                {
                                                    if (isDebugCatch)
                                                    {
                                                        console.error('VUEJS | STORE | VEHICLE | allplantsVehicles | ERROR _> ' + error);
                                                    }
                                                    reject(error);
                                                });
                               });
        },
        allplantsVehiclesSearch(context, payload)
        {
            if (isDebugInfo)
            {
                console.log('VUEJS | STORE | VEHICLE | allplantsVehiclesSearch | iniciando...'); //isDebugInfo
            }
            return new Promise((resolve, reject) =>
                               {
                                   axios.get(api_url + '/vehicles/all/' + user.id + "/search/" + payload)
                                        .then((response) =>
                                              {
                                                  /**
                                                   * Tomamos todos los vehiculos de la respuesta del ajax, y los recorremos
                                                   * 1 a 1 para respetar la asignación del ID de la base de dato en el array
                                                   * contenedora de los datos
                                                   * @type {*[]}
                                                   */
                                                  let plants_vehicles = response.data.data;
                                                  // let plants_vehicles = [];
                                                  // if (response.data.data && response.data.data.length > 0)
                                                  // {
                                                  //     for (let i = 0; i < response.data.data.length; i++)
                                                  //     {
                                                  //         let plant = [];
                                                  //         let vehicles = [];
                                                  //         let vehicles_count = 0;
                                                  //
                                                  //         plant = response.data.data[i];
                                                  //         plants_vehicles[plant.id] = plant;
                                                  //
                                                  //         if (plant.vehicles.length > 0)
                                                  //         {
                                                  //             /**
                                                  //              * Recorremos 1 a 1 los vehiculo por planta
                                                  //              */
                                                  //             for (let j = 0; j < plant.vehicles.length; j++)
                                                  //             {
                                                  //                 vehicles[plant.vehicles[j].id] = plant.vehicles[j];
                                                  //                 vehicles_count++;
                                                  //             }
                                                  //             plants_vehicles[plant.id].vehicles = vehicles;
                                                  //         }
                                                  //         else
                                                  //         {
                                                  //             plants_vehicles[plant.id].vehicles = [];
                                                  //         }
                                                  //         plants_vehicles[plant.id].vehicles_count = vehicles_count;
                                                  //     }
                                                  // }

                                                  /**
                                                   * Agregamos al storage las plantas con vehiculos
                                                   */
                                                  context.commit('plantsVehicles', plants_vehicles);
                                                  resolve(response);
                                              }).catch(function (error)
                                                       {
                                                           if (isDebugCatch)
                                                           {
                                                               console.error('VUEJS | STORE | VEHICLE | allplantsVehicles | ERROR _> ' + error);
                                                           }
                                                           reject(error);
                                                       });
                               });
        },
        plantsVehiclesUpdateStorage: function (context, vehicle)
        {
            context.commit('plantsVehiclesUpdateVehicle', vehicle);
        },
    },
    mutations: {
        plantsVehicles(state, data)
        {
            state.plants_vehicles = data
        },
        plantsVehiclesUpdateVehicle(state, vehicle)
        {

            let positionPlantVehicle = aztrack.vehicle.searchVehicleInPlant(state.plants_vehicles, vehicle.truck_code);
            let plant_id = positionPlantVehicle.plant_id;
            let vehicle_id = positionPlantvehicle.id;

            /// let speed_temp = Math.floor(Math.random() * 100);
            /// let rpm_temp = Math.floor(Math.random() * 3000);
            /// vehicle.speed = speed_temp;
            /// vehicle.rpm = rpm_temp;


            try
            {
                /// if (vehicle.id == 23)
                /// {
                ///     console.log("plant_id: " + plant_id + " | vehicle_id: " + vehicle_id);
                ///     console.log("VEHICLE: " + state.plants_vehicles[plant_id].vehicles[vehicle_id].truck_code + " | speed: " + state.plants_vehicles[plant_id].vehicles[vehicle_id].speed + " | rpm: " + state.plants_vehicles[plant_id].vehicles[vehicle_id].rpm);
                ///     state.plants_vehicles[plant_id].vehicles[vehicle_id] = vehicle;
                ///     console.log("VEHICLE: " + state.plants_vehicles[plant_id].vehicles[vehicle_id].truck_code + " | speed: " + state.plants_vehicles[plant_id].vehicles[vehicle_id].speed + " | rpm: " + state.plants_vehicles[plant_id].vehicles[vehicle_id].rpm);
                /// }
                Object.assign(state.plants_vehicles[plant_id].vehicles[vehicle_id], vehicle);
                ///state.plants_vehicles[plant_id].vehicles[vehicle_id] = vehicle;


            }
            catch (e)
            {
                console.error("plantsVehiclesUpdateVehicle");
                console.error(e);
            }
            /**
             * Esto es para que VUEJS reacione y cambie los valores de la matrix
             */
            ///state.plants_vehicles.push('asdf-qwerty');
            ///state.plants_vehicles.splice(-1, 1);
        },
        setTicketVehicle(state, payload)
        {

            // if (isDebugInfo)
            // {
            //     console.log('VEHICLE | STORAGE | tickets_id _> ' + payload.id + ' | plants_id _> ' + payload.plants_id + ' | vehicles_id _> ' + payload.vehicles_id);
            // }
            //
            // let plant_id = 0;
            // let vehicle_id = 0;
            //
            // state.plants_vehicles.forEach(function (plant, index)
            //                               {
            //
            //                                   /**
            //                                    * Buscamos entre todas las plantas el ID correspondiente para la modificacion del objeto.
            //                                    */
            //                                   if (plant.id == payload.plants_id)
            //                                   {
            //                                       plant_id = index;
            //                                   }
            //
            //                                   /**
            //                                    * Buscamos entre todos los camiones el ID correspondiente para la modificacion del objeto.
            //                                    */
            //                                   plant.vehicles.forEach(function (vehicle, index_vehicle)
            //                                                          {
            //                                                              if (vehicle.id == payload.vehicles_id)
            //                                                              {
            //                                                                  vehicle_id = index_vehicle;
            //                                                              }
            //                                                          });
            //                               });
            //
            // if (typeof state.plants_vehicles[plant_id] !== 'undefined')
            // {
            //     if (typeof state.plants_vehicles[plant_id].vehicles[vehicle_id] !== 'undefined')
            //     {
            //         /**
            //          * Generamos el cambio de informacion en la planta correspondite y el camión, actualizando su ticket
            //          * @type {Ticket}
            //          */
            //         state.plants_vehicles[plant_id].vehicles[vehicle_id].ticket = payload;
            //     }
            //     else
            //     {
            //         if (isDebugInfo)
            //         {
            //             console.log('VUEJS | STORAGE | VEHICLE | VEHICLE ID _> ' + vehicle_id + ' | No existe el vehiculo');
            //         }
            //     }
            // }
            // else
            // {
            //     if (isDebugInfo)
            //     {
            //         console.log('VUEJS | STORAGE | VEHICLE |  PLANT ID _> ' + plant_id + ' | No existe la planta');
            //     }
            // }

            return state.plants_vehicles;
        }
    }
}
