import {
  SET_SETTING_BANNER,
  SET_SETTING_NOTICE,
  SET_SETTING_PROMOTION,
  SET_GOODS_LIST,
} from '../mutation-types';

export default {
  [SET_SETTING_BANNER](state, payload) {
    state.banner.status = 1;
    state.banner.data = payload;
  },
  [SET_SETTING_NOTICE](state, payload) {
    state.notice.status = 1;
    state.notice.data = payload;
  },
  [SET_SETTING_PROMOTION](state, payload) {
    state.promotion.status = 1;
    state.promotion.data = payload;
  },
  [SET_GOODS_LIST](state, payload) {
    state.list.p = payload.currentPage;
    state.list.status = payload.status;
    state.list.totalItem = payload.totalItem;
    state.list.data = payload.data ? payload.data : [];
  },
};
