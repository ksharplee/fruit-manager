<template>
  <div>
    <div class="text-h6 d-flex flex-wrap align-center pb-4">
      促销活动
      <v-btn
        color="primary"
        class="ml-auto"
        :to="{name: 'SettingPromotionAdd'}"
      >
        <v-icon left>
          mdi-plus
        </v-icon>添加活动
      </v-btn>
    </div>
    <v-skeleton-loader
      :loading="loadingData"
      height="500"
      transition="fade"
      type="table"
    >
      <v-card>
        <v-data-table
          :headers="headers"
          :items="promotion.data"
          :loading="loading"
          loading-text="加载中..."
          hide-default-footer
          no-data-text="暂无数据"
          fixed-header
          :items-per-page="10"
        >
          <template v-slot:item.dStatus="{item}">
            <span :class="item.dStatus === '1' ? 'success--text' : 'grey--text'">{{ item.dStatus | statusStr }}</span>
          </template>
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  :disabled="item.dStatus === '1'"
                  :to="{name: 'SettingPromotionEdit', params: {id: item.id}}"
                  v-on="on"
                >
                  <v-icon color="teal">
                    mdi-pencil-circle
                  </v-icon>
                </v-btn>
              </template>
              <span>编辑</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  v-on="on"
                  @click="dialogStart = true;toStartId = item.id"
                >
                  <v-icon color="error lighten-2">
                    mdi-play-circle
                  </v-icon>
                </v-btn>
              </template>
              <span>开始</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  v-on="on"
                  @click="dialogClose = true;toCloseId = item.id"
                >
                  <v-icon color="secondary">
                    mdi-stop-circle
                  </v-icon>
                </v-btn>
              </template>
              <span>关闭</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </v-skeleton-loader>
    <v-dialog
      v-model="dialogClose"
      max-width="350"
    >
      <v-card>
        <v-card-title class="title grey lighten-3">
          确定关闭本次活动吗?
        </v-card-title>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn
            color="primary"
            :loading="closing"
            :disabled="closing"
            @click="closePromotion"
          >
            提交
          </v-btn>
          <v-btn
            color="secondary"
            @click="dialogClose = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogStart"
      max-width="350"
    >
      <v-card>
        <v-card-title class="title grey lighten-3">
          确定开始本次活动吗?
        </v-card-title>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn
            color="primary"
            :loading="starting"
            :disabled="starting"
            @click="startPromotion"
          >
            提交
          </v-btn>
          <v-btn
            color="secondary"
            @click="dialogStart = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SettingPromotion',
  filters: {
    statusStr(status) {
      switch (status) {
        case '0':
          return '未开始';
        case '1':
          return '已开始';
        case '2':
          return '已关闭';
        default:
          return '已结束';
      }
    },
  },
  data() {
    return {
      headers: [
        {
          text: '主题',
          value: 'dnames',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },

        {
          text: '开始时间',
          value: 'startTime',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '结束时间',
          value: 'endTime',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '状态',
          value: 'dStatus',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '操作',
          value: 'action',
          align: 'right',
          class: 'pr-10 grey lighten-4',
          sortable: false,
        },
      ],
      loadingData: false,
      loading: false,
      dialogClose: false,
      toCloseId: '',
      closing: false,
      dialogStart: false,
      toStartId: '',
      starting: false,
    };
  },
  computed: {
    ...mapState('setting', ['promotion']),
  },
  created() {
    if (!this.promotion.status) {
      this.loadingData = true;
      this.getPromotion();
    }
  },
  methods: {
    ...mapActions('setting', ['getPromotionAsync', 'closePromotionAsync', 'startPromotionAsync']),
    getPromotion() {
      this.loading = true;
      this.getPromotionAsync().finally(() => {
        this.loading = false;
        this.loadingData = false;
      });
    },
    closePromotion() {
      this.closing = true;
      this.closePromotionAsync({ id: this.toCloseId }).finally(() => {
        this.closing = false;
        this.dialogClose = false;
      });
    },
    startPromotion() {
      this.starting = true;
      this.startPromotionAsync({ id: this.toStartId }).finally(() => {
        this.starting = false;
        this.dialogStart = false;
      });
    },
  },
};
</script>
