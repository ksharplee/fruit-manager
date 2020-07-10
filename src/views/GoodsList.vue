<template>
  <div>
    <div class="text-h6 d-flex flex-wrap align-center pb-4">
      商品列表
      <v-btn
        color="primary"
        class="ml-auto"
        depressed
        :to="{name: 'GoodsAdd'}"
      >
        <v-icon left>
          mdi-plus
        </v-icon>添加商品
      </v-btn>
    </div>
    <v-skeleton-loader
      :loading="loading"
      height="500"
      transition="fade"
      type="table"
    >
      <v-card>
        <v-data-table
          :headers="headers"
          :items="list.data"
          hide-default-footer
          no-data-text="暂无数据"
          fixed-header
          :items-per-page="10"
        >
          <template v-slot:item.dStatus="{item}">
            <div :class="item.dStatus === '4' ? 'success--text' : 'grey--text'">
              {{ item.dStatus === '0' ? '未上架' : item.dStatus === '4' ? '已上架' : '已下架' }}
            </div>
          </template>
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  :disabled="item.dStatus === '4'"
                  :to="{name: 'GoodsEdit', params: {id: item.id}}"
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
                >
                  <v-icon color="primary">
                    mdi-account-circle
                  </v-icon>
                </v-btn>
              </template>
              <span>详情</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  v-on="on"
                >
                  <v-icon color="warning">
                    mdi-alpha-p-circle
                  </v-icon>
                </v-btn>
              </template>
              <span>积分</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  v-on="on"
                  @click="dialogOperate = true;toOperate = item.dStatus === '4' ? '1' : '4';toSetIds = [item.id]"
                >
                  <v-icon color="error lighten-2">
                    mdi-{{ item.dStatus === '4' ? 'arrow-down-circle' : 'arrow-up-circle' }}
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ item.dStatus === '4' ? '下架' : '上架' }}</span>
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
          <template v-slot:item.BaseGoodImages="{item}">
            <v-img
              v-if="item.BaseGoodImages.length"
              :src="item.BaseGoodImages[0].image"
              aspect-ratio="1"
              max-width="60"
              max-height="60"
              class="grey lighten-4 my-2 mx-auto"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-icon
                    v-if="!item.logo"
                    color="grey"
                  >
                    mdi-alert-octagon-outline
                  </v-icon>
                  <v-progress-circular
                    v-else
                    indeterminate
                    color="grey lighten-2"
                  />
                </v-row>
              </template>
            </v-img>
          </template>
        </v-data-table>
        <div class="text-center pt-2 grey lighten-4">
          <v-pagination
            v-model="page"
            :length="pageCount"
            current-page-aria-label="当前页"
            next-aria-label="下一页"
            page-aria-label="分页"
            wrapper-aria-label="隐藏页"
            previous-aria-label="上一页"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            @input="changePagination"
          />
        </div>
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
            @click="deleteGoods"
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
    <v-dialog
      v-model="dialogOperate"
      max-width="350"
    >
      <v-card>
        <v-card-title class="title grey lighten-3">
          确定{{ toOperate === '4' ? '上架' : '下架' }}吗?
        </v-card-title>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn
            color="primary"
            :loading="setting"
            :disabled="setting"
            @click="setGoodsVisibility"
          >
            提交
          </v-btn>
          <v-btn
            color="secondary"
            @click="dialogOperate = false"
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
  name: 'GoodsList',
  data() {
    return {
      dialogDelete: false,
      dialogOperate: false,
      deleting: false,
      toDeleteId: '',
      loading: false,
      setting: false,
      toSetIds: [],
      toOperate: '',
      headers: [
        {
          text: '商品货号',
          value: 'dno',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '商品名称',
          value: 'dnames',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '商品图片',
          value: 'BaseGoodImages',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '价格',
          value: 'price',
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
          sortable: false,
          width: '300px',
          class: 'grey lighten-4 pr-10',
        },
      ],
    };
  },
  computed: {
    ...mapState('product', ['list']),
    page: {
      set(value) {
        this.list.p = value;
      },
      get() {
        return +this.list.p;
      },
    },
    pageCount() {
      if (
        !process.env.VUE_APP_PAGESIZE || !this.list.totalItem
      ) {
        return 1;
      }
      return Math.ceil(
        +this.list.totalItem / process.env.VUE_APP_ITEMPERPAGE,
      );
    },
  },
  created() {
    if (!this.list.status) {
      this.getGoodsList({ p: 1 });
    }
  },
  methods: {
    ...mapActions('product', ['getGoodsListAsync', 'deleteGoodsAsync', 'setGoodsVisibilityAsync']),
    getGoodsList(params) {
      this.loading = true;
      this.getGoodsListAsync(params).finally(() => {
        this.loading = false;
      });
    },
    changePagination() {
      this.getCustomer({ p: this.page + 1 });
    },
    deleteGoods() {
      this.deleting = true;
      this.deleteGoodsAsync({ id: this.toDeleteId }).finally(() => {
        this.deleting = false;
        this.dialogDelete = false;
      });
    },
    setGoodsVisibility() {
      this.setting = true;
      this.setGoodsVisibilityAsync({ ids: this.toSetIds, operate: this.toOperate }).finally(() => {
        this.setting = false;
        this.dialogOperate = false;
      });
    },
  },
};
</script>
