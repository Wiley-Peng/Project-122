//  两个模块。1、验证两次密码输入是否一样，2、给form表单注册submit事件

var form = layui.form;
var layer = layui.layer;
// console.log(form);

// 1、验证密码是否一样
form.verify({
    same: function(value) {
        //    判断两次密码是否一样
        if (value != $(".layui-form input[name=password]").val()) {
            return "两次输入的密码不一样"
        }
    }
})


//   2、注册submit事件
$("form").on("submit", function(e) {
    // 阻止form表单的默认行为
    e.preventDefault();

    // 快速搜集数据
    var params = $(this).serialize();

    // 提交数据
    $.ajax({
        url: "admin/users",
        type: "post",
        data: params,
        success: function(res) {
            layer.msg(res.message);

            // 表单重置;$("form")[0] 获取原生form表单
            $("form")[0].reset();
        }
    })


})