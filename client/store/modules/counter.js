
const state = {
  count: 0
}

const getters = {
  count: state => state.count,
}

const mutations = {
  INCREMENT(state) {
    state.count++
  }
}

const actions = {
  incrementAsync({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
}

module.exports = {
  state,
  getters,
  mutations,
  actions,
}
