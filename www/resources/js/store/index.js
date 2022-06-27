import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import vehicle from './vehicle';
import vehicleRent from './vehicle_rent';

export default new Vuex.Store({
    strict: true,
    modules: {
        vehicle,
        vehicleRent,
    },
});
