export default {
    state: {
        collapsed: false,
    },
    reducers: {
        updateState(state, payload) {
            localStorage.setItem('sider_collapsed', payload.collapsed)
            return {
                ...state,
                ...payload,
            }
        },
    },
    effects: {

    }
}
