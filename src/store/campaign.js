import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    campaigns: []
  },

  getters: {
    campaignsList: state => state.campaigns
  },

  mutations: {
    setCampaigns: (state, campaigns) => (state.campaigns = campaigns),
    addNewCampaign: (state, campaign) => state.campaigns.unshift(campaign),
    updateCampaign: (state, campaign) => {
      let campaigns = [...state.campaigns]
      const index = campaigns.findIndex(t => t.id === campaign.id)
      if (index !== -1) {
        campaigns.splice(index, 1, campaign)
      }
      state.campaigns = [...campaigns]
    },
    removeCampaign: (state, id) => {
      state.campaigns = state.campaigns.filter(campaign => campaign.id !== id)
    }
  },

  actions: {
    fetchCampaigns ({ commit }) {
      fetch('http://localhost:4000/campaigns')
        .then(response => response.json())
        .then(data => {
            commit('setCampaigns', data)
        })

    },
    addCampaign ({ commit }  , campaign) {
      fetch('http://localhost:4000/campaign', { method: 'POST', body: JSON.stringify(campaign) })
        .then(response => response.json())
        .then(data => {
            commit('addNewCampaign', data)
        })
    },
    updateCampaign ({ commit }, campaign) {
      fetch(`http://localhost:4000/campaign/${campaign.id}`, { method: 'POST', body: JSON.stringify(campaign) })
        .then(response => response.json())
        .then(data => {
            commit('updateCampaign', data)
        })
      
    },
    deleteCampaign ({ commit }, id) {
      fetch(`http://localhost:4000/campaign/${id}`, { method: 'DELETE'})
        .then(() => commit('removeCampaign', id))
    }
  }
})
