import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import mutations from './mutations.js'

import login from './modules/login.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /**
     * [eleBaseURL description]
     * @type {String}
     * 
     * 
     */
    eleBaseURL:"http://localhost:8082",
    /**
     * [isTestDev 是否验证登录token]
     * @type {Boolean}
     *  前端: true
     *  线上: false
     *
     *  
     */
    isTestDev: true,
    /**
     * [staticBaseUrl 基于static路径地址]
     * @type {String}
     * 前端: ""
     * 线上： 
     */
    staticBaseUrl: "",
    contenWidth: window.innerwidth||document.body.clientWidth,
    contenHeight:window.innerHeight||document.body.clientHeight,
  	author: 'nidunlove'
  },
  actions:actions,
  getters:{

  },
  mutations:mutations,
  modules:{

    login

  },
  
})

export default store