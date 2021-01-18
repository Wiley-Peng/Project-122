$(function () {
  // 粒子线条背景
  $(document).ready(function(){
    $('.layui-container').particleground({
      dotColor:'#7ec7fd',
      lineColor:'#7ec7fd'
    })
  })
  // 登录操作
  var form = layui.form
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    var fd = $(this).serialize()
    $.ajax({
      type: 'post',
      url: 'api/login',
      data: fd,
      success: function (res) {
        // 登录成功后，跳转到主页面
        if (res.status === 0) {
          // 把登录成功的标志位存储在客户端
          localStorage.setItem('mytoken', res.token)
          // 跳转到主页面
          location.href = './index.html'
        } else {
          // 登录失败
          layer.msg(res.message)
        }
      }
    })
  })
})