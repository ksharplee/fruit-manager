<template>
  <div>
    <v-skeleton-loader
      :loading="loading"
      height="500"
      transition="fade"
      type="article"
    >
      <div>
        <v-card
          outlined
          elevation="0"
          class="mb-4"
        >
          <v-card-title class="pa-3 grey lighten-3 title d-flex">
            商品类别
          </v-card-title>
          <v-container fluid>
            <v-row dense>
              <v-col
                cols="12"
                lg="6"
                xl="4"
              >
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    商品分类：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.categoryName }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="6"
                xl="4"
              >
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    包含规格：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.containSpec === '1' ? '是' : '否' }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card
          outlined
          elevation="0"
          class="mb-4"
        >
          <v-card-title class="pa-3 grey lighten-3 title d-flex">
            基础信息
          </v-card-title>
          <v-container fluid>
            <v-row dense>
              <v-col
                cols="12"
                lg="6"
                xl="4"
              >
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    商品名称：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.dnames }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="6"
                xl="4"
              >
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    商品品牌：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.brandName }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="6"
                xl="4"
              >
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    商品货号：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.dno }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="6"
                xl="4"
              >
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    &nbsp;起&nbsp;订&nbsp;量&nbsp;：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.moq }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="6"
                xl="4"
              >
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    商品单位：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.unitName }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="6"
                xl="4"
              >
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    库存数量：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.stock }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="6"
                xl="4"
              >
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    零库存出售：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.zeroInventory === '1' ? '是' : '否' }}
                  </v-col>
                </v-row>
              </v-col>
              <v-slide-y-transition>
                <v-col
                  v-if="product.containSpec === '0'"
                  cols="12"
                  md="6"
                  xl="4"
                >
                  <v-row justify="start">
                    <v-col
                      cols="auto"
                      class="grey--text"
                    >
                      &nbsp;成&nbsp;本&nbsp;价&nbsp;：
                    </v-col>
                    <v-col cols="auto">
                      {{ product.costPrice }}$
                    </v-col>
                  </v-row>
                </v-col>
              </v-slide-y-transition>
              <v-slide-y-transition>
                <v-col
                  v-if="product.containSpec === '0'"
                  cols="12"
                  md="6"
                  xl="4"
                >
                  <v-row justify="start">
                    <v-col
                      cols="auto"
                      class="grey--text"
                    >
                      &nbsp;销&nbsp;售&nbsp;价&nbsp;：
                    </v-col>
                    <v-col cols="auto">
                      {{ product.price }}$
                    </v-col>
                  </v-row>
                </v-col>
              </v-slide-y-transition>
              <v-slide-y-transition>
                <v-col
                  v-if="product.containSpec === '0'"
                  cols="12"
                  md="6"
                  xl="4"
                >
                  <v-row justify="start">
                    <v-col
                      cols="auto"
                      class="grey--text"
                    >
                      商品重量：
                    </v-col>
                    <v-col cols="auto">
                      {{ product.weight }}克
                    </v-col>
                  </v-row>
                </v-col>
              </v-slide-y-transition>
              <v-slide-y-transition>
                <v-col
                  v-if="product.containSpec === '0'"
                  cols="12"
                  md="6"
                  xl="4"
                >
                  <v-row justify="start">
                    <v-col
                      cols="auto"
                      class="grey--text"
                    >
                      &nbsp;条&nbsp;形&nbsp;码&nbsp;：
                    </v-col>
                    <v-col cols="auto">
                      {{ product.barCode }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-slide-y-transition>
              <v-slide-y-transition>
                <v-col
                  v-if="product.units"
                  cols="12"
                >
                  <v-card
                    flat
                    outlined
                    class="body-1"
                  >
                    <v-card-title class="pa-3 grey lighten-3 title d-flex">
                      打包设置
                    </v-card-title>
                    <div class="pa-3">
                      <v-row dense>
                        <v-col
                          v-for="(bundle, i) in product.units"
                          :key="i"
                          cols="12"
                          md="6"
                          xl="4"
                        >
                          1{{ bundle.unitName }} = {{ bundle.packeNum }}{{ product.unitName }}
                        </v-col>
                      </v-row>
                    </div>
                  </v-card>
                </v-col>
              </v-slide-y-transition>
            </v-row>
          </v-container>
        </v-card>
        <v-slide-y-transition>
          <v-card
            v-if="product.attr"
            outlined
            elevation="0"
            class="mb-4"
          >
            <v-card-title class="pa-3 grey lighten-3 title d-flex">
              商品参数
            </v-card-title>
            <v-container fluid>
              <v-row dense>
                <v-col
                  v-for="attr in product.attr"
                  :key="attr.attrId"
                  cols="12"
                  lg="6"
                  xl="4"
                >
                  <v-row justify="start">
                    <v-col
                      cols="auto"
                      class="grey--text"
                    >
                      {{ attr.attrName }}：
                    </v-col>
                    <v-col cols="auto">
                      {{ attr.attrValue }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-slide-y-transition>
        <v-slide-y-transition>
          <v-card
            v-if="product.BaseGoodDetail && product.BaseGoodDetail.length && product.containSpec === '1'"
            class="mb-4"
            outlined
          >
            <v-card-title class="pa-3 grey lighten-3 title d-flex">
              商品规格
            </v-card-title>
            <v-simple-table
              class="text-center"
              fixed-header
            >
              <thead>
                <tr>
                  <th class="text-center">
                    规格
                  </th>
                  <th class="text-center">
                    成本价(元)
                  </th>
                  <th class="text-center">
                    销售价(元)
                  </th>
                  <th class="text-center">
                    重量(克)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(detail, i) in product.BaseGoodDetail"
                  :key="i"
                >
                  <td class="py-3">
                    {{ detail.dnames }}
                  </td>
                  <td class="py-3">
                    {{ detail.costPrice }}
                  </td>
                  <td class="py-3">
                    {{ detail.price }}
                  </td>
                  <td class="py-3">
                    {{ detail.weight }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-slide-y-transition>
        <v-card
          outlined
          elevation="0"
          class="mb-4"
        >
          <v-card-title class="pa-3 grey lighten-3 title">
            商品图片
          </v-card-title>
          <v-card-text class="pt-4">
            <v-row>
              <v-col
                v-for="(img,i) in product.BaseGoodImages"
                :key="i"
                cols="6"
                md="3"
                lg="2"
                xl="1"
              >
                <v-img
                  :src="img ? `${img}?x-oss-process=image/resize,m_fill,w_300,h_300` : require('@/assets/imgWaiting.png')"
                  aspect-ratio="1"
                  class="grey lighten-1"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      />
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card
          outlined
          elevation="0"
          class="mb-4"
        >
          <v-card-title class="pa-3 grey lighten-3 title">
            商品描述
          </v-card-title>
          <div
            class="ma-4"
            style="max-width:480px"
            v-html="product.detailDesc"
          />
        </v-card>
        <!-- <v-card
          outlined
          elevation="0"
          class="mb-4"
        >
          <v-card-title class="pa-3 grey lighten-3 title">
            商品供应商
          </v-card-title>
          <v-container fluid>
            <v-row dense>
              <v-col cols="12">
                <v-row justify="start">
                  <v-col
                    cols="auto"
                    class="grey--text"
                  >
                    商品供应商：
                  </v-col>
                  <v-col cols="auto">
                    {{ product.supplyers }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card> -->
      </div>
    </v-skeleton-loader>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'GoodsDetail',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      product: {},
      loading: false,
      component: null,
    };
  },
  created() {
    this.loadPageData();
  },
  methods: {
    ...mapActions('product', ['getGoodsDetailAsync']),
    loadPageData() {
      this.loading = true;
      this.getGoodsDetailAsync({ id: this.id }).then((res) => {
        this.product = res;
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>
