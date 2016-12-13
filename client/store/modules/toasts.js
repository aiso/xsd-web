
const state = {
  toasts: []
}

const getters = {
  toasts: state => state.toasts,
}

const mutations = {
  ADD_TOAST(state, payload) {
    state.toasts.push(payload)
  },
  DELETE_TOAST(state, payload){
    state.toasts.splice(state.toasts.findIndex(s=>s._id==payload._id),1)
  }
}

const actions = {
  addToast ({ commit }, toast) {
    if (typeof toast === 'string') {
      toast = {
        class: 'info',
        message: toast
      }
    }

    toast = Object.assign({ class:'info', timeout:3000 }, toast)
    toast._id = Date.now()

    if(toast.timeout > 0){
      setTimeout(() => {
        commit('DELETE_TOAST', toast)
      }, toast.timeout)
    }else{
      toast.remove = () => {
        commit('DELETE_TOAST', toast)
      }
    }

    commit('ADD_TOAST', toast)
  }
}

module.exports = {
  state,
  getters,
  mutations,
  actions,
}
