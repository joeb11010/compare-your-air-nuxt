import axios from 'axios'
export const state = () => ({
    selected: [],
    options: []
})

export const mutations = {
    setOptions(state, list) {
        state.options = list;
    },
    addSelection(state, city) {
        state.selected.push(city);
    },
    removeSelection(state, index) {
        state.selected.splice(index, 1);
    }
}

export const actions = {
    async nuxtServerInit({ commit }) {
        const { data } = await axios.get('https://api.openaq.org/v1/cities?country=GB&limit=200&order_by=city');
        commit('setOptions', data.results);
    },
    async getDetail({ commit }, params) {
        const measurements = '';
        ['pm25', 'so2', 'o3', 'no2'].forEach(m => measurements.concat(`&parameter[]=${m}`))
        await this.$axios.get(`https://api.openaq.org/v1/latest?city=${params.city}${measurements}`)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    commit('addSelection', res.data.results[0])
                }
            })
    },
    async remove({ commit }, params) {
        await commit('removeSelection', params.index)
    }
}

// This article recommended making http requests from a store file as actions and 
// using mutators to set the responses to the state: https://itnext.io/quickly-building-restful-uis-in-nuxtjs-782bce539440