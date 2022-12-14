<?php
                    $user =  App\Models\User::find(session()->get('loginID'));

?>
<nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item nav-profile">
        <a href="#" class="nav-link">
          <div class="nav-profile-image">
            <img src="<?php echo e(asset('dashboard-template/assets/images/faces/face1.jpg')); ?>" alt="profile">
            <span class="login-status online"></span>
            <!--change to offline or busy as needed-->
          </div>
          <div class="nav-profile-text d-flex flex-column">
            <span class="font-weight-bold mb-2"><?php echo e($user->name); ?></span>
            <span class="text-secondary text-small">Project Manager</span>
          </div>
          <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="index.html">
          <span class="menu-title">Trang chủ</span>
          <i class="mdi mdi-home menu-icon"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
          <span class="menu-title">Quản lý người dùng</span>
          <i class="menu-arrow"></i>
          <i class="mdi mdi-contacts menu-icon"></i>
        </a>
        <div class="collapse" id="ui-basic">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link" href="<?php echo e(route('showListUser')); ?>">Danh sách người dùng</a></li>
            <li class="nav-item"> <a class="nav-link" href="">Nhóm người dùng</a></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
          <span class="menu-title">Quản lý tài khoản</span>
          <i class="menu-arrow"></i>
          <i class="mdi mdi-account-settings menu-icon"></i>
        </a>
        <div class="collapse" id="general-pages">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item"> <a class="nav-link" href="pages/samples/blank-page.html"> Thông tin cá nhân </a></li>
            <li class="nav-item"> <a class="nav-link" href="pages/samples/login.html"> Thay đổi mật khẩu </a></li>
          </ul>
        </div>
      </li>

    </ul>
  </nav>
<?php /**PATH C:\xampp\htdocs\LuanVan_PhamB1805905\Diya-Restaurant\resources\views/layout/sidebar.blade.php ENDPATH**/ ?>