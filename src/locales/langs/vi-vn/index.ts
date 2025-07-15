import common from './common';
import form from './form';
import page from './page';
import request from './request';
import route from './route';
import theme from './theme';

const local: App.I18n.Schema['translation'] = {
  common,
  datatable: {
    itemCount: 'Tổng cộng {{total}} mục'
  },
  dropdown: {
    closeAll: 'Đóng tất cả',
    closeCurrent: 'Đóng hiện tại',
    closeLeft: 'Đóng bên trái',
    closeOther: 'Đóng khác',
    closeRight: 'Đóng bên phải'
  },
  form,
  icon: {
    collapse: 'Thu gọn menu',
    expand: 'Mở rộng menu',
    fullscreen: 'Toàn màn hình',
    fullscreenExit: 'Thoát toàn màn hình',
    lang: 'Chuyển đổi ngôn ngữ',
    pin: 'Ghim',
    reload: 'Tải lại trang',
    themeConfig: 'Cấu hình chủ đề',
    themeSchema: 'Chế độ chủ đề',
    unpin: 'Bỏ ghim'
  },
  page,
  request,
  route,
  system: {
    errorReason: 'Nguyên nhân lỗi',
    reload: 'Tải lại trang',
    title: 'Hệ thống quản lý Soybean',
    updateCancel: 'Để sau',
    updateConfirm: 'Làm mới ngay',
    updateContent: 'Phát hiện phiên bản mới của hệ thống, bạn có muốn làm mới trang ngay không?',
    updateTitle: 'Thông báo cập nhật phiên bản hệ thống'
  },
  theme
};

export default local; 