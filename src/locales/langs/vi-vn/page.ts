const page: App.I18n.Schema['translation']['page'] = {
  about: {
    devDep: 'Dependencies phát triển',
    introduction: `SoybeanAdmin là một template quản lý backend thanh lịch và mạnh mẽ, dựa trên stack công nghệ frontend mới nhất, bao gồm React19.0, Vite6, TypeScript, ReactRouter7, Redux/toolkit và UnoCSS. Nó có sẵn cấu hình chủ đề phong phú và các component, code chuẩn nghiêm ngặt, thực hiện hệ thống routing file tự động. Ngoài ra, nó còn sử dụng giải pháp Mock data trực tuyến dựa trên ApiFox. SoybeanAdmin cung cấp cho bạn giải pháp quản lý backend toàn diện, không cần cấu hình thêm, sử dụng ngay. Đồng thời cũng là thực hành tốt nhất để học công nghệ tiên tiến nhanh chóng.`,
    prdDep: 'Dependencies sản xuất',
    projectInfo: {
      githubLink: 'Link Github',
      latestBuildTime: 'Thời gian build mới nhất',
      previewLink: 'Link xem trước',
      title: 'Thông tin dự án',
      version: 'Phiên bản'
    },
    title: 'Giới thiệu'
  },
  function: {
    multiTab: {
      backTab: 'Quay lại function_tab',
      routeParam: 'Tham số route'
    },
    request: {
      repeatedError: 'Lỗi yêu cầu lặp lại',
      repeatedErrorMsg1: 'Lỗi yêu cầu tùy chỉnh 1',
      repeatedErrorMsg2: 'Lỗi yêu cầu tùy chỉnh 2',
      repeatedErrorOccurOnce: 'Lỗi yêu cầu lặp lại chỉ xuất hiện một lần'
    },
    tab: {
      tabOperate: {
        addMultiTab: 'Thêm nhiều tab',
        addMultiTabDesc1: 'Chuyển đến trang nhiều tab',
        addMultiTabDesc2: 'Chuyển đến trang nhiều tab (với tham số truy vấn)',
        addTab: 'Thêm tab',
        addTabDesc: 'Chuyển đến trang giới thiệu',
        closeAboutTab: 'Đóng tab "Giới thiệu"',
        closeCurrentTab: 'Đóng tab hiện tại',
        closeTab: 'Đóng tab',
        title: 'Thao tác tab'
      },
      tabTitle: {
        change: 'Thay đổi',
        changeTitle: 'Thay đổi tiêu đề',
        reset: 'Đặt lại',
        resetTitle: 'Đặt lại tiêu đề',
        title: 'Tiêu đề tab'
      }
    },
    toggleAuth: {
      adminOrUserVisible: 'Admin và User có thể thấy',
      adminVisible: 'Chỉ Admin thấy',
      authHook: 'Hook quyền `hasAuth`',
      superAdminVisible: 'Chỉ Super Admin thấy',
      toggleAccount: 'Chuyển đổi tài khoản'
    }
  },
  home: {
    creativity: 'Sáng tạo',
    dealCount: 'Số lượng giao dịch',
    downloadCount: 'Số lượt tải',
    entertainment: 'Giải trí',
    freeCount: 'Tài khoản miễn phí',
    greeting: 'Chào buổi sáng, hôm nay lại là một ngày tràn đầy năng lượng!',
    message: 'Tin nhắn',
    paidCount: 'Tài khoản trả phí',
    projectCount: 'Số dự án',
    projectNews: {
      desc1: 'Soybean đã tạo dự án mã nguồn mở soybean-admin vào ngày 28/5/2021!',
      desc2: 'Yanbowe đã gửi một bug cho soybean-admin, thanh tab không tự thích ứng.',
      desc3: 'Soybean đang chuẩn bị đầy đủ cho việc phát hành soybean-admin!',
      desc4: 'Soybean đang bận viết tài liệu hướng dẫn dự án cho soybean-admin!',
      desc5: 'Soybean vừa viết sơ sài trang dashboard, tạm xem được!',
      moreNews: 'Thêm tin tức',
      title: 'Tin tức dự án'
    },
    registerCount: 'Số lượt đăng ký',
    rest: 'Nghỉ ngơi',
    schedule: 'Lịch trình',
    study: 'Học tập',
    todo: 'Cần làm',
    turnover: 'Doanh thu',
    visitCount: 'Số lượt sử dụng',
    weatherDesc: 'Hôm nay nhiều mây chuyển nắng, 20℃ - 25℃!',
    work: 'Công việc'
  },
  login: {
    bindWeChat: {
      title: 'Liên kết WeChat'
    },
    codeLogin: {
      getCode: 'Lấy mã xác thực',
      imageCodePlaceholder: 'Vui lòng nhập mã xác thực hình ảnh',
      reGetCode: 'Lấy lại sau {{time}} giây',
      sendCodeSuccess: 'Gửi mã xác thực thành công',
      title: 'Đăng nhập bằng mã'
    },
    common: {
      back: 'Quay lại',
      codeLogin: 'Đăng nhập bằng mã',
      codePlaceholder: 'Vui lòng nhập mã xác thực',
      confirm: 'Đăng nhập',
      confirmPasswordPlaceholder: 'Vui lòng nhập lại mật khẩu',
      loginOrRegister: 'Đăng nhập / Đăng ký',
      loginSuccess: 'Đăng nhập thành công',
      passwordPlaceholder: 'Vui lòng nhập mật khẩu',
      phonePlaceholder: 'Vui lòng nhập số điện thoại',
      userNamePlaceholder: 'Vui lòng nhập tên người dùng',
      validateSuccess: 'Xác thực thành công',
      welcomeBack: 'Chào mừng trở lại!'
    },
    pwdLogin: {
      admin: 'Quản trị viên',
      forgetPassword: 'Quên mật khẩu?',
      otherAccountLogin: 'Đăng nhập tài khoản khác',
      otherLoginMode: 'Phương thức đăng nhập khác',
      register: 'Đăng ký tài khoản',
      rememberMe: 'Nhớ mật khẩu',
      superAdmin: 'Siêu quản trị viên',
      title: 'Đăng nhập bằng mật khẩu',
      user: 'Người dùng thường'
    },
    register: {
      agreement: 'Tôi đã đọc kỹ và chấp nhận',
      policy: '《Chính sách bảo mật》',
      protocol: '《Thỏa thuận người dùng》',
      title: 'Đăng ký tài khoản'
    },
    resetPwd: {
      title: 'Đặt lại mật khẩu'
    }
  },
  manage: {
    common: {
      status: {
        disable: 'Vô hiệu hóa',
        enable: 'Kích hoạt'
      }
    },
    DateItem: {
      CreateDate: 'Ngày tạo',
      EndDate: 'Ngày kết thúc'
    },
    menu: {
      activeMenu: 'Menu được highlight',
      addChildMenu: 'Thêm menu con',
      addMenu: 'Thêm menu',
      button: 'Nút',
      buttonCode: 'Mã nút',
      buttonDesc: 'Mô tả nút',
      constant: 'Route hằng số',
      editMenu: 'Chỉnh sửa menu',
      fixedIndexInTab: 'Thứ tự cố định trong tab',
      form: {
        activeMenu: 'Vui lòng chọn tên route của menu được highlight',
        button: 'Vui lòng chọn có phải nút không',
        buttonCode: 'Vui lòng nhập mã nút',
        buttonDesc: 'Vui lòng nhập mô tả nút',
        fixedIndexInTab: 'Vui lòng nhập thứ tự cố định trong tab',
        fixedInTab: 'Vui lòng chọn có cố định trong tab không',
        hideInMenu: 'Vui lòng chọn có ẩn menu không',
        home: 'Vui lòng chọn trang chủ',
        href: 'Vui lòng nhập liên kết ngoài',
        i18nKey: 'Vui lòng nhập key quốc tế hóa',
        icon: 'Vui lòng nhập icon',
        keepAlive: 'Vui lòng chọn có cache route không',
        layout: 'Vui lòng chọn component layout',
        localIcon: 'Vui lòng chọn icon local',
        menuName: 'Vui lòng nhập tên menu',
        menuStatus: 'Vui lòng chọn trạng thái menu',
        menuType: 'Vui lòng chọn loại menu',
        multiTab: 'Vui lòng chọn có hỗ trợ nhiều tab không',
        order: 'Vui lòng nhập thứ tự',
        page: 'Vui lòng chọn component trang',
        parent: 'Vui lòng chọn menu cha',
        pathParam: 'Vui lòng nhập tham số đường dẫn',
        queryKey: 'Vui lòng nhập Key tham số route',
        queryValue: 'Vui lòng nhập Value tham số route',
        routeName: 'Vui lòng nhập tên route',
        routePath: 'Vui lòng nhập đường dẫn route'
      },
      hideInMenu: 'Ẩn menu',
      home: 'Trang chủ',
      href: 'Liên kết ngoài',
      i18nKey: 'Key quốc tế hóa',
      icon: 'Icon',
      iconType: {
        iconify: 'Icon iconify',
        local: 'Icon local'
      },
      iconTypeTitle: 'Loại icon',
      id: 'ID',
      keepAlive: 'Cache route',
      layout: 'Layout',
      localIcon: 'Icon local',
      menuName: 'Tên menu',
      menuStatus: 'Trạng thái menu',
      menuType: 'Loại menu',
      multiTab: 'Hỗ trợ nhiều tab',
      order: 'Thứ tự',
      page: 'Component trang',
      parent: 'Menu cha',
      parentId: 'ID menu cha',
      pathParam: 'Tham số đường dẫn',
      query: 'Tham số route',
      routeName: 'Tên route',
      routePath: 'Đường dẫn route',
      title: 'Danh sách menu',
      type: {
        directory: 'Thư mục',
        menu: 'Menu'
      }
    },
    role: {
      addRole: 'Thêm vai trò',
      buttonAuth: 'Quyền nút',
      editRole: 'Chỉnh sửa vai trò',
      form: {
        roleCode: 'Vui lòng nhập mã vai trò',
        roleDesc: 'Vui lòng nhập mô tả vai trò',
        roleName: 'Vui lòng nhập tên vai trò',
        roleStatus: 'Vui lòng chọn trạng thái vai trò'
      },
      menuAuth: 'Quyền menu',
      roleCode: 'Mã vai trò',
      roleDesc: 'Mô tả vai trò',
      roleName: 'Tên vai trò',
      roleStatus: 'Trạng thái vai trò',
      title: 'Danh sách vai trò'
    },
    roleDetail: {
      content: 'Trang này chỉ để hiển thị việc khớp với tất cả route động đa cấp',
      explain:
        '[...slug] là cú pháp khớp tất cả route động đa cấp theo định dạng [...any], dữ liệu khớp sẽ tồn tại trong params của useRoute dưới dạng mảng'
    },
    user: {
      addUser: 'Thêm người dùng',
      editUser: 'Chỉnh sửa người dùng',
      form: {
        nickName: 'Vui lòng nhập biệt danh',
        userEmail: 'Vui lòng nhập email',
        userGender: 'Vui lòng chọn giới tính',
        userName: 'Vui lòng nhập tên người dùng',
        userPhone: 'Vui lòng nhập số điện thoại',
        userRole: 'Vui lòng chọn vai trò người dùng',
        userStatus: 'Vui lòng chọn trạng thái người dùng'
      },
      gender: {
        female: 'Nữ',
        male: 'Nam'
      },
      nickName: 'Biệt danh',
      title: 'Danh sách người dùng',
      userEmail: 'Email',
      userGender: 'Giới tính',
      userName: 'Tên người dùng',
      userPhone: 'Số điện thoại',
      userRole: 'Vai trò',
      userStatus: 'Trạng thái'
    },
    userDetail: {
      content: `loader sẽ làm cho network request và file lazy load gần như cùng phát ra request, sau đó vừa parse file lazy load vừa chờ network request. Khi network request hoàn thành, trang sẽ hiển thị cùng lúc. Kết hợp với kiến trúc fiber của react, có thể làm được việc nếu user cảm thấy thời gian chờ quá lâu, trong thời gian chờ user có thể chuyển đổi các trang khác nhau. Đây là ưu điểm của react framework và react-router data router, không cần phải đợi đến khi trang hiển thị, thay vì cách thông thường: request file lazy load - parse - request file lazy load - mount sau đó mới phát network request - rồi render trang - render hoàn thành còn phải tự thêm loading effect`,
      explain:
        'Trang này chỉ để hiển thị khả năng mạnh mẽ của loader của react-router-dom, dữ liệu là ngẫu nhiên nên không khớp là bình thường'
    }
  }
};

export default page;
