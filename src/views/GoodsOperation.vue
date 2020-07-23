<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-card class="mb-6">
        <v-card-title class="text-h6 grey lighten-3">
          {{ id ? '编辑' : '添加' }}商品
        </v-card-title>
        <v-container
          fluid
          class="px-4 pb-0 pt-4"
        >
          <v-row>
            <v-col
              cols="12"
              sm="6"
              lg="4"
              class="py-0"
            >
              <v-dialog
                ref="dialog"
                v-model="dialogCategory"
                width="600px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="categoryName"
                    :rules="cateRules"
                    :loading="loadingCate"
                    :disabled="loadingCate"
                    label="商品分类"
                    dense
                    readonly
                    outlined
                    required
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
              lg="4"
              class="py-0"
            >
              <v-text-field
                v-model="product.dnames"
                label="商品名称"
                :rules="nameRules"
                dense
                outlined
                clearable
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              lg="4"
              class="py-0"
            >
              <v-select
                :value="product.unitId"
                :items="unit.data"
                :rules="unitRules"
                :loading="loadingUnit"
                :disabled="loadingUnit"
                label="单位"
                item-text="dnames"
                item-value="id"
                dense
                outlined
                clearable
                return-object
                no-data-text="暂无数据"
                @change="selectProductUnit"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              lg="4"
              class="py-0"
            >
              <v-text-field
                v-model="product.dno"
                label="商品货号"
                :rules="dnoRules"
                dense
                outlined
                clearable
              />
            </v-col>
            <!-- <v-col
              v-if="product.containSpec === '0'"
              cols="12"
              sm="6"
              lg="4"
              class="py-0"
            >
              <v-text-field
                v-model="product.weight"
                label="商品重量"
                dense
                outlined
                suffix="克"
                clearable
              />
            </v-col> -->
          </v-row>
        </v-container>
      </v-card>
      <v-card class="mb-6">
        <v-card-title class="text-h6 grey lighten-3">
          价格与规格
        </v-card-title>
        <v-container
          fluid
          class="px-4 pt-4 pb-6"
        >
          <!-- :class="product.containSpec === '0' ? 'pb-0' : 'pb-6'" -->
          <v-row>
            <!-- <v-col
              cols="12"
              sm="6"
              lg="4"
              class="py-0"
            >
              <v-select
                v-model="product.containSpec"
                :items="containSpecOptions"
                label="规格商品"
                dense
                outlined
                no-data-text="暂无数据"
              />
            </v-col> -->
            <!-- <v-col
              v-if="product.containSpec === '0'"
              key="price"
              cols="12"
              sm="6"
              lg="4"
              class="py-0"
            >
              <v-text-field
                v-model="product.price"
                label="商品价格"
                :rules="priceRules"
                dense
                outlined
                clearable
              />
            </v-col> -->
            <!-- v-else -->
            <v-col
              key="specName"
              cols="12"
              sm="6"
              lg="4"
              class="py-0"
            >
              <v-text-field
                v-model="specName"
                label="规格名称"
                :rules="specRules"
                dense
                outlined
                clearable
              />
            </v-col>
          </v-row>
          <!-- <template v-if="product.containSpec === '1'"> -->
          <v-card
            outlined
            class="mb-6"
          >
            <v-simple-table class="text-center">
              <template v-slot:default>
                <thead>
                  <tr class="grey lighten-3">
                    <th class="text-center">
                      规格值
                    </th>
                    <th class="text-center">
                      价格
                    </th>
                    <th class="text-center">
                      重量(g)
                    </th>
                    <th class="pr-10 text-right">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,i) in BaseGoodDetail"
                    :key="i"
                  >
                    <td class="py-3">
                      <v-text-field
                        v-model="item.dnames"
                        label="规格值"
                        dense
                        outlined
                        hide-details
                        clearable
                      />
                    </td>
                    <td class="py-3">
                      <v-text-field
                        v-model="item.price"
                        label="价格"
                        dense
                        outlined
                        hide-details
                        clearable
                      />
                    </td>
                    <td class="py-3">
                      <v-text-field
                        v-model="item.weight"
                        label="重量"
                        dense
                        outlined
                        hide-details
                        clearable
                      />
                    </td>
                    <td class="text-right pr-7">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            icon
                            class="mx-1"
                            :disabled="i === 0 && BaseGoodDetail.length === 1"
                            v-on="on"
                            @click="deleteSpec(i)"
                          >
                            <v-icon color="secondary">
                              mdi-delete-forever
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>删除</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <v-btn
            color="primary"
            outlined
            @click="addDetail"
          >
            <v-icon left>
              mdi-plus
            </v-icon>添加规格商品
          </v-btn>
          <!-- </template> -->
        </v-container>
      </v-card>
      <v-card class="mb-6">
        <v-card-title class="text-h6 grey lighten-3">
          商品图片
        </v-card-title>
        <v-card-text class="pt-4">
          <p>图片文件大小请保持在4M以内，您最多可以上传 6 张图片，切勿盗用他人图片，以免受网规处罚。</p>
          <v-card outlined>
            <v-card-text class="pb-0">
              <div>
                <img-uploader-multiple
                  :count="6"
                  dir="product"
                  @update:pics="getMultipleImgs"
                />
                <v-btn
                  color="secondary"
                  outlined
                  class="ml-3"
                  @click="$set(product, 'BaseGoodImages', [])"
                >
                  <v-icon left>
                    mdi-delete-forever mdi-18px
                  </v-icon>全部删除
                </v-btn>
              </div>
              <v-row>
                <v-col
                  v-for="(item, i) in product.BaseGoodImages"
                  :key="i"
                  cols="6"
                  sm="3"
                  lg="2"
                >
                  <img-uploader
                    :path="item"
                    :removable="true"
                    dir="product"
                    @update:remove="removeImg(i)"
                    @update:src="getPicPath($event, i)"
                  />
                </v-col>
                <v-col
                  v-if="product.BaseGoodImages && product.BaseGoodImages.length < 6"
                  cols="6"
                  sm="3"
                  lg="2"
                >
                  <img-uploader @update:src="getPicPath($event, product.BaseGoodImages.length)" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
        <component
          :is="component"
          :content="product.detailDesc"
          @update:html="$set(product, 'detailDesc', $event)"
        />
      </v-card>
      <v-btn
        :loading="submitting"
        :disabled="submitting"
        color="primary"
        large
        class="px-12 body-1"
        @click="operateProduct"
      >
        提交
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ImgUploader from '@/components/ImgUploader.vue';
import ImgUploaderMultiple from '@/components/ImgUploaderMultiple.vue';
import WangEditor from '@/components/WangEditor.vue';

export default {
  name: 'GoodsOperation',
  components: {
    ImgUploader,
    ImgUploaderMultiple,
    WangEditor,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      valid: true,
      component: null,
      submitting: false,
      dialogCategory: false,
      categorySelected: [],
      // containSpecOptions: [
      //   {
      //     value: '1',
      //     text: '是',
      //   },
      //   {
      //     value: '0',
      //     text: '否',
      //   },
      // ],
      specName: '',
      categoryName: '',
      product: {
        dnames: '',
        categoryId: '',
        containSpec: '1',
        dno: '',
        price: '',
        detailDesc: '',
        BaseGoodImages: [],
      },
      BaseGoodDetail: [
        {
          price: '',
          weight: '',
          dnames: '',
        },
      ],
      nameRules: [(v) => !!v || '请填写商品名称'],
      priceRules: [(v) => !!v || '请填写商品价格'],
      dnoRules: [(v) => !!v || '请填写商品货号'],
      specRules: [(v) => !!v || '请填写规格名称'],
      cateRules: [(v) => !!v || '请选择商品分类'],
      unitRules: [(v) => !!v || '请选择商品单位'],
      loadingCate: false,
      loadingUnit: false,
    };
  },
  computed: {
    ...mapState('product', ['category', 'unit']),
    BaseGoodSpec() {
      return [
        {
          specName: this.specName,
          BaseGoodSpecItem: this.$store.$R.map(
            this.$store.$R.prop('dnames'),
            this.BaseGoodDetail,
          ),
        },
      ];
    },
    categorySon() {
      return this.$store.$R.filter(
        (item) => !!item,
        this.$store.$R.flatten(
          this.$store.$R.map(this.$store.$R.prop('son'), this.category.data),
        ),
      );
    },
    categoryFlatten() {
      return this.$store.$R.concat(this.category.data, this.categorySon);
    },
  },
  created() {
    if (!this.category.status) {
      this.getCategory();
    }
    if (!this.unit.status) {
      this.getUnit();
    }
    if (this.id) {
      this.getGoodsDetail();
    } else {
      this.component = WangEditor;
    }
  },
  methods: {
    ...mapActions('product', [
      'addGoodsAsync',
      'getCategoryAsync',
      'getUnitAsync',
      'getGoodsDetailAsync',
      'editGoodsAsync',
    ]),
    getGoodsDetail() {
      this.loading = true;
      this.getGoodsDetailAsync({ id: this.id })
        .then((res) => {
          // if (res.containSpec === '1') {
          this.BaseGoodDetail = res.BaseGoodDetail;
          this.specName = res.BaseGoodSpec.specName;
          // }
          this.categoryName = res.categoryName;
          this.categorySelected = [res.categoryId];
          this.product = this.$store.$R.dissoc('BaseGoodDetail', res);
          this.component = WangEditor;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getCategory() {
      this.loadingCate = true;
      this.getCategoryAsync().finally(() => {
        this.loadingCate = false;
      });
    },
    getUnit() {
      this.loadingUnit = true;
      this.getUnitAsync().finally(() => {
        this.loadingUnit = false;
      });
    },
    // 获取当前产品分类
    getActiveCategory(arr) {
      this.categorySelected = arr;
    },
    setProductCategory() {
      const R = this.$store.$R;
      const id = this.categorySelected[0];
      this.$set(this.product, 'categoryId', id);
      this.categoryName = R.prop(
        'dnames',
        R.find(R.propEq('id', id), this.categoryFlatten),
      );
      this.dialogCategory = false;
    },
    getPicPath(v, i) {
      if (this.product.BaseGoodImages[i]) {
        this.$set(
          this.product,
          'BaseGoodImages',
          this.$store.$R.update(i, v, this.product.BaseGoodImages),
        );
      } else {
        this.$set(
          this.product,
          'BaseGoodImages',
          this.$store.$R.append(v, this.product.BaseGoodImages),
        );
      }
    },
    removeImg(i) {
      this.$set(
        this.product,
        'BaseGoodImages',
        this.$store.$R.remove(i, 1, this.product.BaseGoodImages),
      );
    },
    getMultipleImgs(v) {
      this.$set(
        this.product,
        'BaseGoodImages',
        this.$store.$R.concat(
          this.product.BaseGoodImages,
          this.$store.$R.take(6 - this.product.BaseGoodImages.length, v),
        ),
      );
    },
    // 选择商品单位
    selectProductUnit(v) {
      this.$set(this.product, 'unitId', v.id);
      this.$set(this.product, 'unitName', v.dnames);
    },
    deleteSpec(i) {
      this.BaseGoodDetail = this.$store.$R.remove(i, 1, this.BaseGoodDetail);
      this.$set(
        this.product,
        'BaseGoodDetail',
        this.BaseGoodDetail,
      );
    },
    addDetail() {
      this.BaseGoodDetail = this.$store.$R.append(
        {
          price: '',
          weight: '',
          dnames: '',
        },
        this.BaseGoodDetail,
      );
    },
    operateProduct() {
      if (this.$refs.form.validate()) {
        this.submitting = true;
        const params = this.product;
        // if (this.product.containSpec === '1') {
        params.BaseGoodSpec = this.BaseGoodSpec;
        params.BaseGoodDetail = this.BaseGoodDetail.map((item) => {
          item.specItems = [
            {
              specName: this.specName,
              specItemName: item.dnames,
            },
          ];
          return item;
        });
        // }
        if (this.id) {
          this.editGoodsAsync(params)
            .then(() => {
              this.$router.replace({ name: 'GoodsList' });
            })
            .finally(() => {
              this.submitting = false;
            });
        } else {
          this.addGoodsAsync(params)
            .then(() => {
              this.$router.replace({ name: 'GoodsList' });
            })
            .finally(() => {
              this.submitting = false;
            });
        }
      } else {
        this.$vuetify.goTo(this.$refs.form, {
          duration: 300,
          offset: 0,
          easing: 'easeInOutCubic',
        });
      }
    },
  },
};
</script>
