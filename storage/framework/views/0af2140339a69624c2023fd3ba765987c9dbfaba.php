<?php $__env->startSection('content'); ?>
    <div class="page-header">
      <h3 class="page-title"> Quản lý người dùng </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Quản lý người dùng</a></li>
          <li class="breadcrumb-item active" aria-current="page">Danh sách người dùng</li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="row mb-3">
                <div class="col-lg-6">
                    <button class="btn btn-block btn-lg btn-gradient-primary ">+ Thêm người dùng</button>
                </div>
            <div class="col-lg-6 ">
                <div class="input-group">
                    <input type="text" class="form-control" id="searchUserInput" placeholder="Nhập gì đó..." aria-label="Nhập gì đó..." aria-describedby="basic-addon2">
                    <button class="btn btn-sm btn-gradient-primary" type="button"> Tìm Kiếm </button>
                </div>

            </div>

        </div>
            <table  class="table table-striped">
              <thead>
                <tr>
                  <th> User </th>
                  <th> First name </th>
                  <th> Progress </th>
                  <th> Amount </th>
                  <th> Deadline </th>
                </tr>
              </thead>
              <tbody id="UserListTable">
                <tr>
                  <td class="py-1">
                    <img src="<?php echo e(asset('dashboard-template/assets/images/faces-clipart/pic-1.png')); ?>" alt="image" />
                  </td>
                  <td> Herman Beck </td>
                  <td>
                    <div class="progress">
                      <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </td>
                  <td> $ 77.99 </td>
                  <td>
                    
                </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

<?php $__env->stopSection(); ?>

<?php $__env->startSection('page-js'); ?>
<script src="<?php echo e(asset('dashboard-template/assets/js/user-manage.js')); ?>"></script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layout.main', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\LuanVan_PhamB1805905\Diya-Restaurant\resources\views/staff/user-manage/user-list.blade.php ENDPATH**/ ?>