<template>
  <div>
    <v-skeleton-loader
      :loading="loadingData"
      height="500"
      transition="fade"
      type="table"
    >
      <v-card>
        <v-card-title class="text-h6 grey lighten-3 pa-4">
          选择活动商品
        </v-card-title>
        <v-container
          fluid
          class="py-0"
        >
          <v-row
            v-if="selectedGoods.length"
            align="center"
          >
            <v-col cols="12">
              <v-btn
                color="secondary"
                icon
                text
                x-small
                class="mr-3"
                :ripple="false"
                @click="selectedGoods = []"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              已选择&nbsp;<span class="primary--text">{{ selectedGoods.length }} </span>&nbsp;项
              <v-divider
                vertical
                class="ml-8 mr-4"
              />
              <v-btn
                color="primary"
                :ripple="false"
                @click="getSelectedGoods"
              >
                <v-icon
                  left
                  dark
                >
                  mdi-check
                </v-icon>
                确定选择
              </v-btn>
            </v-col>
          </v-row>
          <v-row
            v-else
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <v-dialog
                ref="dialog"
                v-model="dialogCategory"
                width="600px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="categoryName"
                    :loading="loadingCate"
                    :disabled="loadingCate"
                    label="商品分类"
                    dense
                    readonly
                    outlined
                    required
                    hide-details
                    append-icon="mdi-menu-down"
                    v-on="on"
                  />
                </template>
                <v-card>
                  <v-card-title class="title grey lighten-3 pa-4">
                    选择商品分类
                  </v-card-title>
                  <v-card-text class="pt-4">
                    <v-treeview
                      :items="category.data"
                      :active="categorySelected"
                      dense
                      open-all
                      item-text="dnames"
                      item-key="id"
                      item-children="son"
                      open-on-click
                      rounded
                      activatable
                      @update:active="getActiveCategory"
                    >
                      <template v-slot:prepend="{ item,leaf, open }">
                        <v-icon>
                          {{ leaf ? 'mdi-bookmark-outline' : open ? 'mdi-bookmark-outline' : 'mdi-bookmark' }}
                        </v-icon>
                      </template>
                    </v-treeview>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="primary"
                      @click="setProductCategory"
                    >
                      确定
                    </v-btn>
                    <v-btn
                      color="secondary"
                      @click="dialogCategory = false"
                    >
                      取消
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <v-text-field
                v-model="search.dnames"
                label="商品名称"
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
              <v-text-field
                v-model="search.dno"
                label="商品货号"
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
              <v-select
                v-model="search.dStatus"
                :items="statusOptions"
                label="上架状态"
                dense
                outlined
                hide-details
                no-data-text="暂无数据"
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
                @click="searchProducts"
              >
                搜索
              </v-btn>
              <v-btn
                color="secondary"
                @click="resetSearch"
              >
                重置
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-data-table
          v-model="selectedGoods"
          :headers="headers"
          :items="list.data"
          :loading="loading"
          loading-text="加载中..."
          hide-default-footer
          no-data-text="暂无数据"
          fixed-header
          show-select
          :items-per-page="10"
          class="data-table-with-select"
        >
          <!-- <template v-slot:item.dStatus="{item}">
            <div :class="item.dStatus === '4' ? 'success--text' : 'grey--text'">
              {{ item.dStatus === '0' ? '未上架' : item.dStatus === '4' ? '已上架' : '已下架' }}
            </div>
          </template> -->
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'GoodsForSelect',
  data() {
    return {
      page: 1,
      selectedGoods: [],
      dialogDelete: false,
      dialogOperate: false,
      dialogOperateRecommend: false,
      deleting: false,
      toDeleteId: '',
      loading: false,
      loadingData: false,
      setting: false,
      toSetIds: [],
      toOperate: '',
      settingRecommend: false,
      toSetRecommendIds: [],
      toOperateRecommend: '',
      dialogCategory: false,
      loadingCate: false,
      categoryName: '',
      categorySelected: [],
      search: {
        dnames: '',
        dStatus: '0',
        dno: '',
        categoryId: '',
      },
      statusOptions: [
        {
          text: '全部',
          value: '0',
        },
        {
          text: '未上架',
          value: '1',
        },
        {
          text: '已上架',
          value: '5',
        },
        {
          text: '已下架',
          value: '2',
        },
      ],
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
        // {
        //   text: '状态',
        //   value: 'dStatus',
        //   align: 'center',
        //   sortable: false,
        //   class: 'grey lighten-4',
        // },
      ],
    };
  },
  computed: {
    ...mapState('setting', ['list']),
    ...mapState('product', ['category']),
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
    categorySon() {
      return this.$store.$R.filter((item) => !!item, this.$store.$R.flatten(this.$store.$R.map(this.$store.$R.prop('son'), this.category.data)));
    },
    categoryFlatten() {
      return this.$store.$R.concat(this.category.data, this.categorySon);
    },
  },
  created() {
    if (!this.category.status) {
      this.getCategory();
    }
    if (!this.list.status) {
      this.loadingData = true;
      this.getGoodsList({ p: 1 });
    }
  },
  methods: {
    ...mapActions('setting', ['getGoodsListAsync']),
    ...mapActions('product', ['getCategoryAsync']),
    getCategory() {
      this.loadingCate = true;
      this.getCategoryAsync().finally(() => {
        this.loadingCate = false;
      });
    },
    // 获取当前产品分类
    getActiveCategory(arr) {
      this.categorySelected = arr;
    },
    setProductCategory() {
      const R = this.$store.$R;
      const id = this.categorySelected[0];
      this.$set(this.search, 'categoryId', id);
      this.categoryName = R.prop('dnames', R.find(R.propEq('id', id), this.categoryFlatten));
      this.dialogCategory = false;
    },
    getGoodsList(params) {
      this.loading = true;
      this.getGoodsListAsync(params).then(() => {
        this.page = +this.list.p;
      }).finally(() => {
        this.loading = false;
        this.loadingData = false;
      });
    },
    changePagination() {
      this.getGoodsList({ p: this.page });
    },
    searchProducts() {
      this.getGoodsList({
        ...this.search,
        p: 1,
      });
    },
    resetSearch() {
      this.search = {
        dStatus: '0',
        dnames: '',
        dno: '',
        categoryId: '',
      };
      this.categoryName = '';
      this.getGoodsList({ p: 1 });
    },
    getSelectedGoods() {
      this.$emit('update:selected', this.selectedGoods);
    },
  },
};
</script>
