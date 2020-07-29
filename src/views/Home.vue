<template>
  <v-app
    style="background-color: #f5f5f5;"
  >
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      dark
      width="210"
      color="secondary darken-3"
    >
      <v-list>
        <v-list-item
          link
          :to="{ name: 'Home' }"
          exact
          active-class="primary--text"
        >
          <v-list-item-action>
            <v-icon>mdi-home-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>首页</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="item in navs"
          :key="item.text"
          v-model="item.model"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.url"
            active-class="primary--text"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="secondary darken-4 elevation-1"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>后台管理系统</v-toolbar-title>
      <div class="flex-grow-1 ml-12">
        {{ user.dnames }}，欢迎登录!
      </div>
      <v-btn
        color="primary"
        icon
        @click="loginOut"
      >
        <v-icon>
          mdi-power-standby
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <!-- <transition :name="transitionName"> -->
      <router-view class="pa-6 rounded" />
      <!-- </transition> -->
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
// @ is an alias to /src
export default {
  name: 'Home',
  data: () => ({
    drawer: null,
    // transitionName: 'v-slide-x-transition',
    navs: [
      {
        icon: 'mdi-alpha-g-circle',
        text: '商品',
        model: false,
        children: [
          { text: '商品列表', url: { name: 'GoodsList' } },
          { text: '商品类别', url: { name: 'GoodsCategory' } },
          { text: '商品单位', url: { name: 'GoodsUnit' } },
        ],
      },
      {
        icon: 'mdi-alpha-s-circle',
        text: '系统',
        model: false,
        children: [
          { text: '广告列表', url: { name: 'SettingAd' } },
          { text: '公告列表', url: { name: 'SettingNotice' } },
          { text: '活动列表', url: { name: 'SettingPromotion' } },
        ],
      },
      {
        icon: 'mdi-account-circle',
        text: '客户',
        model: false,
        children: [
          { text: '客户列表', url: { name: 'CustomerList' } },
        ],
      },
    ],
  }),
  computed: {
    ...mapState(['user']),
    routerArray() {
      return this.$store.$R.pluck('children', this.navs);
    },
    routerNames() {
      const R = this.$store.$R;
      return R.map((item) => R.map((v) => R.path(['url', 'name'], v), item), this.routerArray);
    },
  },
  watch: {
    $route(to, from) {
      const R = this.$store.$R;
      const index = R.findIndex(R.includes(to.name), this.routerNames);
      const prevIndex = R.findIndex(R.includes(from.name), this.routerNames);
      if (index >= 0) {
        const obj = this.navs[index];
        obj.model = true;
        this.$set(this.navs, index, obj);
      }
      if (this.$route.name === 'Home') {
        const obj = this.navs[prevIndex];
        obj.model = false;
        this.$set(this.navs, index, obj);
      }
      // const toDepth = to.path.split('/').length;
      // const fromDepth = from.path.split('/').length;
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    },
  },
  created() {
    const R = this.$store.$R;
    const index = R.findIndex(R.includes(this.$router.history.current.name), this.routerNames);
    if (index >= 0) {
      const obj = this.navs[index];
      obj.model = true;
      this.$set(this.navs, index, obj);
    }
  },
  methods: {
    loginOut() {
      this.$store.commit('CLEAR_USER');
      this.$router.replace({ name: 'Login' });
    },
  },
};
</script>
