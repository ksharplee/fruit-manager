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
            <span :class="item.dStatus === '1' ? 'success--text' : 'grey--text'">{{ item.dStatus === '1' ? '1' : '2' }}</span>
          </template>
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  v-on="on"
                  @click="openDialog({
                    target: item,
                    edit: true,
                  })"
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
                  @click="dialogDelete = true;toDeleteId = item.id"
                >
                  <v-icon color="secondary">
                    mdi-delete-forever
                  </v-icon>
                </v-btn>
              </template>
              <span>删除</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </v-skeleton-loader>
    <v-dialog
      v-model="dialogDelete"
      max-width="350"
    >
      <v-card>
        <v-card-title class="title grey lighten-3">
          确定删除吗?
        </v-card-title>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn
            color="primary"
            :loading="deleting"
            :disabled="deleting"
            @click="deletePromotion"
          >
            提交
          </v-btn>
          <v-btn
            color="secondary"
            @click="dialogDelete = false"
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
          text: '状态',
          value: 'dStatus',
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
          text: '操作',
          value: 'action',
          align: 'right',
          class: 'pr-10 grey lighten-4',
          sortable: false,
        },
      ],
      loadingData: false,
      loading: false,
      dialogDelete: false,
      toDeleteId: '',
      deleting: false,
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
    ...mapActions('setting', ['getPromotionAsync', 'deletePromotionAsync']),
    getPromotion() {
      this.loading = true;
      this.getPromotionAsync().finally(() => {
        this.loading = false;
        this.loadingData = false;
      });
    },
    deletePromotion() {
      this.deleting = true;
      this.deletePromotionAsync({ id: this.toDeleteId }).finally(() => {
        this.deleting = false;
        this.dialogDelete = false;
      });
    },
  },
};
</script>
