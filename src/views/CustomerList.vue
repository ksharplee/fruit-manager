<template>
  <div>
    <div class="text-h6 pb-4">
      客户列表
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
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  v-on="on"
                >
                  <v-icon color="teal">
                    mdi-pencil-circle
                  </v-icon>
                </v-btn>
              </template>
              <span>编辑</span>
            </v-tooltip>
            <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                class="mx-1"
                v-on="on"
                @click="getCustomerDetail(item.id)"
              >
                <v-icon color="primary">
                  mdi-account-circle
                </v-icon>
              </v-btn>
            </template>
            <span>详情</span>
          </v-tooltip> -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  v-on="on"
                  @click="getCustomerPoints(item.id)"
                >
                  <v-icon color="secondary">
                    mdi-alpha-p-circle
                  </v-icon>
                </v-btn>
              </template>
              <span>积分</span>
            </v-tooltip>
          </template>
          <template v-slot:item.logo="{item}">
            <v-img
              :src="item.logo"
              aspect-ratio="1"
              max-width="60"
              max-height="60"
              class="grey lighten-4 my-2 mx-auto rounded-circle"
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CustomerList',
  data() {
    return {
      loading: false,
      headers: [
        {
          text: '客户头像',
          value: 'logo',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '客户姓名',
          value: 'dnames',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '手机号码',
          value: 'mobile',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '级分',
          value: 'jifen',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '操作',
          value: 'action',
          align: 'right',
          sortable: false,
          class: 'grey lighten-4 pr-10',
        },
      ],
    };
  },
  computed: {
    ...mapState('customer', ['list']),
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
      this.loading = true;
      this.getCustomer({ p: 1 });
    }
  },
  methods: {
    ...mapActions('customer', ['getCustomerAsync', 'getCustomerDetailAsync', 'editCustomerAsync', 'getCustomerPointsAsync']),
    getCustomer(params) {
      this.getCustomerAsync(params).finally(() => {
        this.loading = false;
      });
    },
    changePagination() {
      this.getCustomer({ p: this.page + 1 });
    },
    getCustomerDetail(id) {
      this.getCustomerDetailAsync({ id }).then((res) => {
        console.log('函数: getCustomerDetail -> res', res);
      });
    },
    getCustomerPoints(id) {
      this.getCustomerPointsAsync({ id }).then((res) => {
        console.log('函数: getCustomerPoints -> res', res);
      });
    },
  },
};
</script>
