import Cookies from 'js-cookie'

const test = {
    namespaced: true, state: {
        name: '123'
    },
    mutations: {
        SET_NAME: (state, value) => {
            state.name = value
            Cookies.set('value', value)
        }
    },
    actions: {
        setName({commit}, value) {
            commit('SET_NAME', value)
        }
    }
}

export default test
