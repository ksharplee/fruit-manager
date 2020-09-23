import { SET_ORDER_LIST } from '../mutation-types';

export default {
  [SET_ORDER_LIST](state, payload) {
    state.list = {
      p: payload.p,
      status: 1,
      totalItem: payload.totalItem,
      data: payload.data,
    };
  },
};
