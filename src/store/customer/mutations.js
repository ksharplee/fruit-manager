import { SET_CUSTOMER_LIST } from '../mutation-types';

export default {
  [SET_CUSTOMER_LIST](state, payload) {
    state.list.p = payload.currentPage;
    state.list.status = payload.status;
    state.list.totalItem = payload.totalItem;
    state.list.data = payload.data ? payload.data : [];
  },
};
