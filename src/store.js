import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/mqaxios'
import apis from '@/apis'
import { stat } from 'fs'


Vue.use(Vuex)
//封装请求函数
const loadAction = (commit, payload, mutationName) => {
  axios.get(payload.api)
    .then((resp) => {
      resp = resp.data;
      commit(mutationName, resp)
    })
}

export default new Vuex.Store({
  state: {
    allPermission: []
  },
  getters: {
    allPermission(state) {
      var allPermission = [];

      if (state.allPermission.allPermission) {
        allPermission = state.allPermission.allPermission;
        var length = state.allPermission.allPermission.length;
        var arr = [];
        for (var i = 0; i < length; i++) {
          if (allPermission[i].parentid == 0) {
            allPermission[i].children = [];
            arr.push(allPermission[i]);
          }
        }
        for (var i = 0; i < length; i++) {
          for (var j = 0; j < arr.length; j++) {
            if (allPermission[i].parentid == arr[j]._id) {
              arr[j].children.push(allPermission[i]);
            }
          }
        }
        return arr;
      }
    }
  },
  mutations: {
    LOADALLPERMISSION(state, payload) {
      state.allPermission = payload;
    }
  },
  actions: {
    loadAllPermission({ commit }, payload = {}) {
      payload.api = apis.showAllPermission;
      loadAction(commit, payload, 'LOADALLPERMISSION')
    }
  }


})
