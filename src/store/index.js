import Vue from 'vue';
import Vuex from 'vuex';

import { getUser, getProgression } from '../lib/wanikani';

Vue.use(Vuex);

// initial state
const state = {
  api: {
    token: localStorage.getItem('token') || null,
    error: '',
  },
  user: {
    username: null,
    level: 0,
  },
  progression: null,
};

const mutations = {
  updateToken(state, value) {
    state.api = { ...state.api, token: value, error: '' };
  },
  updateAPIError(state, value) {
    state.api = { ...state.api, error: value };
  },
  updateUser(state, { username, level }) {
    state.user = { username, level };
  },
  updateProgression(state, progression) {
    state.progression = progression;
  },
};

const actions = {
  async updateToken({ commit }, token) {
    // see if the token is valid
    let userData;
    try {
      userData = await getUser(token);
    } catch (error) {
      commit('updateAPIError', error);
    }

    if (userData) {
      commit('updateToken', token);
      commit('updateUser', userData);
      // save to localStorage
      localStorage.setItem('token', token);
    }
  },

  async fetchUserData({ commit, state }) {
    const token = state.api.token;
    let user;
    try {
      user = await getUser(token);
    } catch (error) {
      commit('updateAPIError', error);
    }

    if (user) {
      commit('updateUser', user);
    }
  },

  async fetchProgression({ commit, state }) {
    const token = state.api.token;
    let progression;
    try {
      progression = await getProgression(token);
    } catch (error) {
      commit('updateAPIError', error);
    }

    if (progression) {
      // filter out levels which have been abandoned
      // and convert string to date objects
      progression = progression
        .filter(x => x.abandoned_at === null)
        .map(x => {
          return {
            level: x.level,
            unlockedAt: new Date(x.unlocked_at),
            passedAt: x.passed_at ? new Date(x.passed_at) : null,
          };
        });
      commit('updateProgression', progression);
    }
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
