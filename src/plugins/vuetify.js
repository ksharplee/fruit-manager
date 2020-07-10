import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import zhHans from 'vuetify/es5/locale/zh-Hans';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#03a9f4',
        secondary: '#607d8b',
        accent: '#3f51b5',
        error: '#f44336',
        warning: '#FFB300',
        info: '#03A9F4',
        success: '#43A047',
      },
    },
  },
  lang: {
    locales: { zhHans },
    current: 'zh-Hans',
  },
});
