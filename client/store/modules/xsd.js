
const state = {
  items: null,
  transes: null
}

const getters = {
  items: state => state.items,
  transes: state => state.transes,
}

const mutations = {
  SET_ITEMS (state, payload) {
    state.items = payload
  },
  ADD_ITEM (state, payload) {
    state.items.push(payload)
  },
  UPDATE_ITEM (state, payload) {
    state.items.splice(payload.idx, 1, payload.item)
  },
  REMOVE_ITEM (state, payload) {
    state.items.splice(payload.idx, 1)
  },
  SET_TRANSES(state, payload){
    state.transes = payload
  }
}

const actions = {
  setItems ({ commit }, items) {
    commit('SET_ITEMS', items)
  },
  addItem ({ commit, state }, item) {
    if(!!state.items)
      commit('ADD_ITEM', item)
  },
  updateItem ({ commit, state }, item) {
    if(!!state.items){
      const idx = state.items.findIndex( i => i.id == item.id )
      if(idx>=0)
        commit('UPDATE_ITEM', {idx, item})
    }
  },
  removeItem ({ commit }, item) {
    if(!!state.items){
      const idx = state.items.findIndex( i => i.id == item.id )
      if(idx>=0)
        commit('REMOVE_ITEM', {idx, item})
    }
  },
  setTranses ({ commit }, transes) {
    commit('SET_TRANSES', transes)
  }  
}

module.exports = {
  state,
  getters,
  mutations,
  actions,
}
