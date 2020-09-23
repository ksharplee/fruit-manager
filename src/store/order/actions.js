export default {
  // 订单列表
  async getOrderListAsync(context, payload) {
    try {
      payload.userId = context.rootState.user.id;
      const res = await this.$http.post('/o/lists.html', payload);
      if (res.data.status === 1) {
        context.commit('SET_ORDER_LIST', res.data.data);
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 订单详情
  async getOrderDetailAsync(context, payload) {
    try {
      const res = await this.$http.post('/o/detail.html', payload);
      if (res.data.status === 1) {
        return Promise.resolve(res.data.data);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 商品删除
  async deleteGoodsAsync(context, payload) {
    try {
      const res = await this.$http.post('/g/delete.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getOrderListAsync', { p: context.state.list.p });
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '删除商品成功',
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 商品上下架，ids：【】 operate ：0 未上架 1 下架  4上架
  async setGoodsVisibilityAsync(context, payload) {
    try {
      const res = await this.$http.post('/g/setVisible.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getOrderListAsync', { p: context.state.list.p });
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: `${payload.operate === '4' ? '上架' : '下架'}商品成功`,
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
};
