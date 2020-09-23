export const shippingStatus = (v) => {
  if (v === '7') {
    return '部分发货';
  }
  if (v === '8') {
    return '已发货';
  }
  if (v === '9') {
    return '已确认收获';
  }
  return '备货中/待发货';
};

export const orderStatus = (v) => {
  if (v === '1') {
    return '待审核';
  }
  if (v === '2') {
    return '客户已取消';
  }
  if (v === '3') {
    return '已取消';
  }
  if (v === '4') {
    return '待财务审核';
  }
  if (v === '5') {
    return '待发货';
  }
  if (v === '6') {
    return '已作废';
  }
  if (v === '7') {
    return '部分发货';
  }
  if (v === '8') {
    return '完成发货';
  }
  if (v === '9') {
    return '已确认收货';
  }
  if (v === '10') {
    return '已完成';
  }
  return '无';
};

export const statusColor = (v) => {
  if (v === '1') {
    return 'error--text';
  }
  if (v === '4' || v === '5' || v === '8' || v === '9' || v === '10') {
    return 'success--text';
  }
  if (v === '2' || v === '3' || v === '6') {
    return 'grey--text';
  }
  return '';
};
