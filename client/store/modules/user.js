import createPersist from '../../utils/store'

const localStore = createPersist('AUTH_KEY', { user:null, profile:null, navigation:null }, { expires:30*60*1000 })
const state = localStore.get()

const getters = {
  user: state => state.user,
  profile: state => state.profile,
  navigation: state => state.navigation,
}

const mutations = {
  SET_AUTH(state, payload) {
    Object.assign(state, { user:null, profile:null }, payload)
    localStore.set(payload)
  },
  SET_USER(state, payload) {
    state.user = payload
    localStore.set(state)
  },
  SET_PROFILE(state, payload) {
    state.profile = payload
    localStore.set(state)
  },
  SET_NAVIGATIONS(state, payload) {
    state.navigation = payload
    localStore.set(state)
  },
}

const actions = {
  setAuth({commit}, auth) {
    commit('SET_AUTH', auth)
  },
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },
  setProfile({ commit }, profile) {
    commit('SET_PROFILE', profile)
  },
  setNavigation({ commit }, navigation) {
    commit('SET_NAVIGATIONS', navigation)
  },
}

module.exports = {
  state,
  getters,
  mutations,
  actions,
}
