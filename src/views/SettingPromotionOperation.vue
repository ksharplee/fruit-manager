<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-card class="mb-6">
        <v-card-title class="text-h6 grey lighten-3 pa-4">
          {{ id ? '编辑' : '添加' }}活动
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
              <v-text-field
                v-model="dnames"
                label="活动主题"
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
              <v-text-field
                v-model="times"
                label="活动倍率"
                :rules="timesRules"
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
              <v-dialog
                ref="dialogStartDate"
                v-model="dialogStartDate"
                :return-value.sync="startDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startTimeStr"
                    label="开始日期"
                    readonly
                    outlined
                    dense
                    :rules="startTimeRules"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="startDate"
                  scrollable
                  color="primary"
                  prev-month-aria-label="上月"
                  next-month-aria-label="下月"
                  locale="zh-cn"
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="dialogStartDate = false"
                  >
                    取消
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialogStartDate.save(startDate);dialogStartTime = true"
                  >
                    确定
                  </v-btn>
                </v-date-picker>
              </v-dialog>
              <v-dialog
                ref="dialogStartTime"
                v-model="dialogStartTime"
                :return-value.sync="startTime"
                persistent
                width="290px"
              >
                <v-time-picker
                  v-if="dialogStartTime"
                  v-model="startTime"
                  full-width
                  color="primary"
                  ampm-in-title
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="dialogStartTime = false;dialogStartDate = true;"
                  >
                    取消
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialogStartTime.save(startTime)"
                  >
                    确定
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              lg="4"
              class="py-0"
            >
              <v-dialog
                ref="dialogEndDate"
                v-model="dialogEndDate"
                :return-value.sync="endDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endTimeStr"
                    label="结束日期"
                    readonly
                    :rules="endTimeRules"
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="endDate"
                  scrollable
                  color="primary"
                  prev-month-aria-label="上月"
                  next-month-aria-label="下月"
                  locale="zh-cn"
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="dialogEndDate = false"
                  >
                    取消
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialogEndDate.save(endDate);dialogEndTime = true"
                  >
                    确定
                  </v-btn>
                </v-date-picker>
              </v-dialog>
              <v-dialog
                ref="dialogEndTime"
                v-model="dialogEndTime"
                :return-value.sync="endTime"
                persistent
                width="290px"
              >
                <v-time-picker
                  v-if="dialogEndTime"
                  v-model="endTime"
                  full-width
                  color="primary"
                  ampm-in-title
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="dialogEndTime = false;dialogEndDate = true;"
                  >
                    取消
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialogEndTime.save(endTime)"
                  >
                    确定
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <goods-for-select
        class="my-6"
        @update:selected="getSelectedGoods"
      />
      <v-slide-y-transition>
        <v-card
          v-if="selectedGoods.length"
          class="my-6"
        >
          <v-card-title class="text-h6 grey lighten-3 pa-4">
            已选活动商品
            <!-- <div class="ml-4 caption">
              <span class="error--text">{{ selectedGoods.length }}</span> 项
            </div> -->
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="selectedGoods"
            :page.sync="page"
            hide-default-footer
            no-data-text="暂无数据"
            fixed-header
            :items-per-page="10"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.dStatus="{item}">
              <div :class="item.dStatus === '4' ? 'success--text' : 'grey--text'">
                {{ item.dStatus === '0' ? '未上架' : item.dStatus === '4' ? '已上架' : '已下架' }}
              </div>
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
            <template v-slot:item.action="{item}">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    class="mx-1"
                    v-on="on"
                    @click="deleteSelectedGoods(item.id)"
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
            />
          </div>
        </v-card>
      </v-slide-y-transition>
      <v-btn
        :loading="submitting"
        :disabled="submitting"
        color="primary"
        large
        class="px-12 body-1"
        @click="operatePromotion"
      >
        提交
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import GoodsForSelect from '@/components/GoodsForSelect.vue';
import { mapActions } from 'vuex';

export default {
  name: 'SettingPromotionOperation',
  components: {
    GoodsForSelect,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      valid: true,
      edit: false,
      submitting: false,
      dialogStartDate: false,
      dialogStartTime: false,
      startDate: null,
      startTime: null,
      dialogEndDate: false,
      dialogEndTime: false,
      endDate: null,
      endTime: null,
      times: '',
      dnames: '',
      selectedGoods: [],
      nameRules: [(v) => !!v || '请填写活动主题'],
      timesRules: [(v) => !!v || '请填写活动倍率'],
      startTimeRules: [(v) => !!v || '请设置活动开始时间'],
      endTimeRules: [(v) => !!v || '请设置活动结束时间'],
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
          align: 'center',
          sortable: false,
          width: '210px',
          class: 'grey lighten-4',
        },
      ],
    };
  },
  computed: {
    startTimeStr() {
      return `${this.startDate ? this.startDate : ''}${
        this.startTime ? ` ${this.startTime}` : ''
      }`;
    },
    endTimeStr() {
      return `${this.endDate ? this.endDate : ''}${
        this.endTime ? ` ${this.endTime}` : ''
      }`;
    },
    selectedIds() {
      return this.$store.$R.pluck('id', this.selectedGoods);
    },
    BaseActivityDetail() {
      return this.$store.$R.map((item) => ({
        goodId: item.id,
        goodName: item.dnames,
        goodImage: item.BaseGoodImages.length ? item.BaseGoodImages[0].image : '',
        price: item.price,
        dno: item.dno,
        times: this.times,
      }), this.selectedGoods);
    },
  },
  methods: {
    ...mapActions('setting', ['addPromotionAsync']),
    operatePromotion() {
      if (this.$refs.form.validate()) {
        if (this.selectedGoods.length) {
          this.submitting = true;
          this.addPromotionAsync({
            dnames: this.dnames,
            startTime: this.startTimeStr,
            endTime: this.endTimeStr,
            BaseActivityDetail: this.BaseActivityDetail,
          }).then(() => {
            this.$router.replace({ name: 'SettingPromotion' });
          }).finally(() => {
            this.submitting = false;
          });
        } else {
          this.$store.commit(
            'TOGGLE_SNACKBAR',
            {
              type: 'error',
              text: '请选择活动商品',
            },
          );
        }
      }
    },
    getSelectedGoods(goods) {
      const R = this.$store.$R;
      const arr = JSON.parse(JSON.stringify(this.selectedGoods));
      goods.map((item) => {
        if (R.includes(item.id, this.selectedIds)) {
          return item;
        }
        arr.push(item);
        return item;
      });
      this.selectedGoods = arr;
    },
    deleteSelectedGoods(id) {
      const R = this.$store.$R;
      this.selectedGoods = R.remove(
        R.findIndex(R.propEq('id', id), this.selectedGoods),
        1,
        this.selectedGoods,
      );
    },
  },
};
</script>
