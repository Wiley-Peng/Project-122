// 弹窗层
var str = `<form id="add-form" class="layui-form" lay-filter="formTest" style="margin: 15px 30px 0 0">
<!-- 第一行：密码 -->
<div class="layui-form-item">
<label class="layui-form-label">链接名称</label>
<div class="layui-input-block">
<input type="text" name="linkname" required lay-verify="required" placeholder="请输入链接名称" autocomplete="off"
  class="layui-input">
</div>
</div>
<!-- 第二行：确认密码 -->
<div class="layui-form-item">
<label class="layui-form-label">链接地址</label>
<div class="layui-input-block">
<input type="text" name="linkurl" required lay-verify="required" placeholder="请输入链接地址" autocomplete="off"
  class="layui-input">
</div>
</div>
<!-- 第三行：链接描述 -->
<div class="layui-form-item">
<label class="layui-form-label">链接描述</label>
<div class="layui-input-block">
<input type="text" name="linkdesc" required lay-verify="required" placeholder="请输入链接描述" autocomplete="off"
  class="layui-input">
</div>
</div>
<!-- 第四行：上传图片 -->
<div class="layui-form-item">
<div class="layui-input-block icon-url">
<button type="button" class="layui-btn layui-btn-sm" id="urlIcon">
  <i class="layui-icon">&#xe67c;</i>上传图片
</button>
<input type="file" name="linkicon" id="linkFile" style="display: none;">
<img id="preIcon" src="">
</div>
</div>
<!-- 第三行：按钮 -->
<div class="layui-form-item">
<div class="layui-input-block">
<button class="layui-btn" lay-submit lay-filter="formDemo">提交</button>
<button type="reset" class="layui-btn layui-btn-primary">重置</button>
</div>
</div>
</form>`

// 获取友情列表
function gitList() {
    $.ajax({
        // 请求方式
        type: 'GET',
        // 请求的url地址
        url: 'admin/links',
        // 携带请求头mytoken值
        // headers: {
        //     Authorization: localStorage.getItem("mytoken")
        // },
        // 请求响应整个过程成功了，触发的函数
        success: function(res) {
            // 如果status==0，则遍历返回数据，然后插入页面渲染
            if (res.status === 0 && res.message === "获取链接信息成功！") {
                var str = '<dt>合作伙伴</dt>';
                // console.log(res.data);
                // 遍历获得的数据，渲染
                $.each(res.data, function(index, item) {
                    str += `<tr>
                <td>${item.id}</td>
                <td>
                  <div class="bg">
                    <img src="http://localhost:8888/uploads/${item.linkicon}">
                  </div>
                </td>
                <td>${item.linkname}</td>
                <td>${item.linkurl}</td>
                <td>${item.linkdesc}</td>
                <td>
                  <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs edit">
                    编辑
                  </button>
                  <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">
                    删除
                  </button>
                </td>
              </tr>`
                })
                $('tbody').html(str)
            }

        }
    });
}
gitList();

// 提交要添加的数据然后渲染
function add_list(gl) {

    $("#add-form").on("submit", function(e) {


        // 1.收集数据
        var data = new FormData(this);

        // 2.提交数据
        $.ajax({
            type: "post",
            url: "admin/links",
            data: data,
            processData: false,
            contentType: false,
            success: function(res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    // 新增的弹窗要关闭
                    layer.close(gl);

                    // 列表重新加载
                    gitList();
                }
            }
        })

    })
}

$('#add-link').on('click', function() {


    // 弹出添加窗口
    var gl = layer.open({
        type: 1,
        title: '添加友情链接',
        content: str,
        area: ['500px', '350px'],
    });
    // 绑定文件上传按钮点击事件
    $('#urlIcon').click(function() {
            $('#linkFile').click()
        })
        // 监听文件选中事件
    $('#linkFile').change(function(e) {
        const objectURL = URL.createObjectURL(e.target.files[0])
        $('#preIcon').attr('src', objectURL)
    })

    // 收集弹窗内数据，给添加请求
    add_list(gl);


})

// 删除数据
$('tbody').on('click', '.delete', (e) => {

    var id = $(e.target).attr('data-id');
    layer.confirm('确定要删除吗？', (index) => {
        $.ajax({
            type: 'DELETE',
            url: 'admin/links/' + id,
            success: (res) => {
                layer.msg(res.message)
                if (res.status == 0) {
                    layer.close(index);
                    gitList();
                };
            },

        });

    })
})


// 编辑模块
$('tbody').on('click', '.edit', (e) => {

    // 获取点击的按钮id值
    var id = $(e.target).attr('data-id');
    var form = layui.form;

    // 获取此条信息的数据
    $.ajax({
        type: 'GET',
        url: 'admin/links/' + id,
        success: (res) => {
            // console.log(res);

            if (res.status == 0) {
                var index = layer.open({

                        type: 1,
                        title: '编辑友情链接',
                        content: str,
                        area: ['500px', '350px']


                    })
                    // 设置预览图片效果
                $('#preIcon').attr('src', 'http://localhost:8888/uploads/' + res.data.linkicon)
                    // 初始化表单数据
                delete res.data.linkicon
                form.val('formTest', res.data)

                // 绑定文件上传按钮点击事件
                $('#urlIcon').click(function() {
                        $('#linkFile').click()
                    })
                    // 监听文件选中事件
                let file = null
                $('#linkFile').change(function(e) {
                    const objectURL = URL.createObjectURL(e.target.files[0])
                    file = e.target.files[0]
                    $('#preIcon').attr('src', objectURL)
                })

                // 绑定表单提交事件
                $('#add-form').submit(function(e) {
                    e.preventDefault()
                    var fd = new FormData(this);

                    $.ajax({
                        type: 'PUT',
                        url: 'admin/links/' + id,
                        data: fd,
                        processData: false,
                        contentType: false,
                        success: function(res) {

                            layer.msg(res.message)
                            if (res.status === 0) {
                                // 编辑成功
                                layer.close(index)
                                gitList()
                            }
                        }
                    })


                })

            }
        }



    })
})