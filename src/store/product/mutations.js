import { SET_GOODS_CATEGORY, SET_GOODS_UNIT, SET_GOODS_LIST } from '../mutation-types';

export default {
  [SET_GOODS_CATEGORY](state, payload) {
    state.category.status = 1;
    state.category.data = payload;
  },
  [SET_GOODS_UNIT](state, payload) {
    state.category.status = 1;
    state.unit.data = payload;
  },
  [SET_GOODS_LIST](state, payload) {
    state.list.p = payload.currentPage;
    state.list.status = payload.status;
    state.list.totalItem = payload.totalItem;
    state.list.data = payload.data ? payload.data : [];
  },
};
