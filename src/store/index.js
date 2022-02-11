import { createStore } from 'vuex'
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

export default createStore({
  state: {
    alice: null,
    bob: null,
    api: null,
    keyring: null,

  },
  mutations: {
    setApi(state, payload){
      state.api = payload
    },
    setAlice(state, payload){
      state.alice = payload
    },
    setKeyring(state, payload){
      state.keyring = payload
    }
  },
  actions: {
    /**
     * Connects to the node and creates the Alice account
     * @param {*} param0 
     */
    async connect({state, commit}, url){
      const provider = new WsProvider('ws://' + url);

      // Create the API and wait until ready
      const api = await ApiPromise.create({ provider });
      await api.isReady
    
      // Constuct the keyring after the API (crypto has an async init)
      const keyring = new Keyring({ type: 'sr25519' });

      // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
      const alice = keyring.addFromUri('//Alice');
      commit("setApi", api)
      commit("setAlice", alice)
      commit("setKeyring", keyring)
    },
    async download({state, commit}, skylink){
      let module = state.api.tx;
      await module["skynet_substrate"]["download-bytes"]("AADsAyGAfl1xupH35fbSAD2F065lPV07jY5WY5IKau_--A", "None")
    }
  },
  modules: {
  }
})
