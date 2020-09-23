<template>
  <div>
    <div class="text-h6 d-flex flex-wrap align-center pb-4">
      订单列表
    </div>
    <v-skeleton-loader
      :loading="loadingData"
      height="500"
      transition="fade"
      type="table"
    >
      <v-card>
        <v-container
          fluid
          class="py-0"
        >
          <v-row
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <v-text-field
                v-model="search"
                label="订单编号"
                dense
                outlined
                hide-details
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <v-btn
                color="primary"
                class="mr-2"
                @click="searchOrders"
              >
                搜索
              </v-btn>
              <v-btn
                color="secondary"
                @click="search = ''"
              >
                重置
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-data-table
          :headers="headers"
          :items="list.data"
          :loading="loading"
          loading-text="加载中..."
          hide-default-footer
          no-data-text="暂无数据"
          fixed-header
          :items-per-page="10"
        >
          <template v-slot:item.shipping="{ item }">
            {{ item.dStatus | shippingStatus }}
          </template>
          <template v-slot:item.dStatus="{ item }">
            <span :class="item.dStatus | statusColor">{{ item.dStatus | orderStatus }}</span>
          </template>
        </v-data-table>
        <div
          class="text-center pt-2 grey lighten-4"
        >
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { shippingStatus, orderStatus, statusColor } from '@/plugins/filters';

export default {
  name: 'OrderList',
  filters: {
    shippingStatus,
    orderStatus,
    statusColor,
  },
  data() {
    return {
      page: 1,
      loading: false,
      loadingData: false,
      search: '',
      headers: [
        {
          text: '订单编号',
          value: 'orderNo',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '客户名称',
          value: 'buyerName',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '订单金额（元）',
          value: 'actualAmount',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '发货状态',
          value: 'shipping',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '订单状态',
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
    ...mapState('order', ['list']),
    pageCount() {
      return Math.ceil(
        (this.list.totalItem ? +this.list.totalItem : 1) / process.env.VUE_APP_ITEMPERPAGE,
      );
    },
  },
  created() {
    if (!this.list.status) {
      this.loadingData = true;
      this.getOrderList({ p: 1 });
    }
  },
  methods: {
    ...mapActions('order', ['getOrderListAsync']),
    getOrderList(params) {
      this.loading = true;
      this.getOrderListAsync(params).then(() => {
        this.page = +this.list.p;
      }).finally(() => {
        this.loading = false;
        this.loadingData = false;
      });
    },
    searchOrders() {
      this.getOrderList({
        searchStr: this.search,
        p: 1,
      });
    },
    changePagination() {
      this.getOrderList({ p: this.page });
    },
  },
};
</script>
