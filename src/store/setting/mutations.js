import { SET_SETTING_BANNER, SET_SETTING_NOTICE } from '../mutation-types';

export default {
  [SET_SETTING_BANNER](state, payload) {
    state.banner.status = 1;
    state.banner.data = payload;
  },
  [SET_SETTING_NOTICE](state, payload) {
    state.notice.status = 1;
    state.notice.data = payload;
  },
};
