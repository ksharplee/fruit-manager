<template>
  <v-container
    fluid
    fill-height
    class="bg-login"
    :style="`background-image: url(${require('@/assets/bg-login.jpg')})`"
  >
    <v-row class="mb-8">
      <v-col
        md="6"
        offset-md="3"
        lg="4"
        offset-lg="4"
      >
        <v-card class="elevation-3">
          <v-card-title class="display-1 grey lighten-3">
            欢迎登录管理后台
          </v-card-title>
          <v-card-text class="pa-8">
            <v-form
              ref="form"
              v-model="valid"
            >
              <v-text-field
                v-model="username"
                :rules="userNameRules"
                label="用户名"
                prepend-inner-icon="mdi-account"
                required
                clearable
                outlined
                class="mb-2"
              />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="密码"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                clearable
                outlined
                required
                @click:append="showPassword = !showPassword"
              />
              <v-row>
                <v-col
                  md="8"
                  lg="6"
                >
                  <v-text-field
                    v-model="verify"
                    :rules="verifyRules"
                    label="验证码"
                    prepend-inner-icon="mdi-shield-lock"
                    clearable
                    outlined
                    required
                    lazy-validation
                  />
                </v-col>
                <v-col
                  md="4"
                  lg="6"
                >
                  <div
                    style="cursor: pointer"
                    @click="refreshCode"
                  >
                    <identify
                      :identify-code="verifyCode"
                      :content-width="168"
                      :content-height="56"
                    />
                  </div>
                </v-col>
              </v-row>
              <!-- <v-checkbox
                v-model="sevenDayLasting"
                style="margin-top:-10px"
                label="七天免登录"
              /> -->
              <v-btn
                color="primary"
                class="ml-0 mr-2"
                large
                :loading="loading"
                :disabled="!valid || loading"
                @click="loginIn"
              >
                登录
              </v-btn>
              <v-btn
                color="secondary"
                large
                @click="reset"
              >
                重置
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import md5 from 'md5';
import Identify from '@/components/Identify.vue';

export default {
  name: 'Login',
  components: { Identify },
  data() {
    return {
      password: '',
      showPassword: false,
      username: '',
      sevenDayLasting: null,
      loading: false,
      verify: '',
      verifyCode: '',
      valid: true,
      userNameRules: [(v) => !!v || '请填写用户名...'],
      passwordRules: [(v) => !!v || '请填写密码...'],
      verifyRules: [(v) => !!v || '请填写验证码...'],
      codeError: false,
      codeErrorMsg: '验证码不正确',
    };
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.getVerifyCode();
  },
  methods: {
    ...mapActions(['loginInAsync', 'getVerifyCodeAsync']),
    loginIn() {
      if (this.verifyCode !== this.verify) {
        this.$store.commit('TOGGLE_SNACKBAR', {
          type: 'error',
          text: '验证码不正确',
        });
        return;
      }
      this.loading = true;
      this.loginInAsync({
        password: md5(this.password),
        username: this.username,
        verify: this.verify,
      })
        .then(() => {
          this.$router.replace({ name: 'Home' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    refreshCode() {
      this.getVerifyCode();
    },
    getVerifyCode() {
      this.getVerifyCodeAsync()
        .then((res) => {
          this.verifyCode = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
