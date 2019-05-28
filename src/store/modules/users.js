import api from '@api';
import {
    ACTIVATE_LOADER,
    DEACTIVATE_LOADER
} from '@store/mutation-types';

const initialState = {
    users: []
};

export default {
    namespaced: true,
    state: {
        ...initialState
    },
    actions: {
        async updateCurrentUser({ commit, dispatch }, userData) {
            commit(ACTIVATE_LOADER, null, { root: true });

            const response = await api.users.updateCurrent(userData);

            if (!response ||
                response.data.status !== 'success') {
                commit(DEACTIVATE_LOADER, null, { root: true });

                return response;
            }

            const data = response.data;
            const user = data.data.user;

            dispatch('updateAuth', { name: user.name, email: user.email }, { root: true });
            dispatch('setNotification', { text: data.text, type: 'success' }, { root: true });

            commit(DEACTIVATE_LOADER, null, { root: true });

            return response;
        }
    }
};
