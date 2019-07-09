import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import common from './common'
Vue.use(Vuex)


const store = new Vuex.Store({
    modules:{
        cart,
        common
    }
})

export default store;