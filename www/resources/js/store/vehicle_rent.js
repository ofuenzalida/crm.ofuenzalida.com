import Vue from "vue";

export default {
    state: {
        plants_vehicles_rents: [],
    },
    getters: {
        getplantsVehiclesRentsFormGetters (state)
        {
            //take parameter state
            return state.plants_vehicles_rents;
        }
    },
    actions: {
        allplantsVehiclesRents (context)
        {
            if (isDebugInfo)
            {
                console.log('VUEJS | STORE | VEHICLE RENT | allplantsVehicles | iniciando...'); //isDebugInfo
            }
            return new Promise((resolve, reject) =>
            {
                ///
                /// Enviamos a la api con el ID del usuario para filtrar sus plantas habilitadas
                ///
                axios.get(api_url + '/vehicles-rents/' + user.id)
                    .then((response) =>
                    {
                        context.commit('plantsVehiclesRents', response.data.data);
                        resolve(response);
                    }).catch(function (error)
                {
                    if (isDebugCatch)
                    {
                        console.error('VUEJS | STORE | VEHICLE RENT | allplantsVehicles | ERROR _> ' + error);
                    }
                    reject(error);
                });
            });
        },
        allplantsVehiclesRentsSearch(context, payload)
        {
            if (isDebugInfo)
            {
                console.log('VUEJS | STORE | VEHICLE Rents | allplantsVehiclesSearch | iniciando...'); //isDebugInfo
            }
            return new Promise((resolve, reject) =>
            {
                axios.get(api_url + '/vehicles-rents/' + user.id + "/search/" + payload)
                    .then((response) =>
                    {
                        context.commit('plantsVehiclesRents', response.data.data);
                        resolve(response);
                    }).catch(function (error)
                {
                    if (isDebugCatch)
                    {
                        console.error('VUEJS | STORE | VEHICLE RENT | allplantsVehicles | ERROR _> ' + error);
                    }
                    reject(error);
                });
            });
        },
    },
    mutations: {
        plantsVehiclesRents(state, data)
        {
            return state.plants_vehicles_rents = data
        }
    }
}
