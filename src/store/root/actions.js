export default {
  // 登录
  async loginInAsync(context, payload) {
    try {
      const res = await this.$http.post('/in/doLogin.html', payload);
      if (res.data.status === 1) {
        context.commit('SET_USER', res.data.data);
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit('TOGGLE_SNACKBAR', {
        type: 'error',
        text: error.message,
      });
      return Promise.reject(error);
    }
  },
  // 验证码
  async getVerifyCodeAsync(context, payload) {
    try {
      const res = await this.$http.post('/in/verify_code.html', payload);
      if (res.data.status === 1) {
        return Promise.resolve(res.data.verify_code);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit('TOGGLE_SNACKBAR', {
        type: 'error',
        text: error.message,
      });
      return Promise.reject(error);
    }
  },
  // 上传附件
  async uploadAttachmentAsync(context, payload) {
    try {
      const res = await this.$http({
        url: '/sy/upload_input_file.html',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: payload,
      });
      if (res.data.status === 1) {
        return Promise.resolve(res.data.filePath);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit('TOGGLE_SNACKBAR', {
        type: 'error',
        text: error.message,
      });
      return Promise.reject(error);
    }
  },
  // 上传图片
  async uploadImgAsync(context, payload) {
    try {
      const res = await this.$http({
        url: '/g/upload_img.html',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: payload,
      });
      if (res.data.status === 1) {
        return Promise.resolve(res.data.picPath);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit('TOGGLE_SNACKBAR', {
        type: 'error',
        text: error.message,
      });
      return Promise.reject(error);
    }
  },
  // 批量上传图片
  async uploadImgMultipleAsync(context, payload) {
    try {
      const res = await this.$http({
        url: '/g/upload_multiple_image.html',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: payload,
      });
      if (res.data.status === 1) {
        return Promise.resolve(res.data.picPath);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit('TOGGLE_SNACKBAR', {
        type: 'error',
        text: error.message,
      });
      return Promise.reject(error);
    }
  },
};
