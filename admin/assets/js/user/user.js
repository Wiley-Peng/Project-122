$(function() {
    var form = layui.form
    var laypage = layui.laypage

    // 当前页码
    var pagenum = 1
        // 每页显示的条数
    var pagesize = 3

    // 加载用户列表
    function loadUserList(param) {
        console.log(param)
        $.ajax({
            type: 'get',
            url: 'admin/users',
            data: param,
            success: function(res) {
                var tags = template('table-tpl', res)
                $('.layui-table tbody').html(tags)
                    // 初始化分页效果
                laypage.render({
                    // 注意，这里的 articlePage 是 ID，不用加 # 号
                    elem: 'articlePage',
                    // 当前页码
                    curr: pagenum,
                    // 数据总数，从服务端得到
                    count: res.total,
                    // 每页显示的条数
                    limit: pagesize,
                    // 每页显示条数列表
                    limits: [3, 10, 30, 40, 100],
                    // 分页条布局效果
                    layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
                    // 页面切换是触发的动作
                    jump: function(obj, first) {
                        // obj 表示分页的所有参数；first用于判断首次加载
                        // 这里触发时，需要修改当前页码
                        pagenum = obj.curr
                            // 切换每页显示条数时，修改pagesize
                        pagesize = obj.limit
                            // 重新加载接口数据
                        if (!first) {
                            // 首次不触发，切换页码时触发
                            loadUserList({
                                // 页码：必须从1开始
                                pagenum: pagenum,
                                // 每页显示多少条数据
                                pagesize: pagesize
                            })
                        }
                    }
                });
            }
        })
    }
    loadUserList({
        // 页码：必须从1开始
        pagenum: pagenum,
        // 每页显示多少条数据
        pagesize: pagesize
    })

    // 删除用户
    $('.layui-table tbody').on('click', '.layui-btn-danger', function(e) {
        var id = $(e.target).data('id')
        layer.confirm('确认要删除用户吗？', function(index) {
            $.ajax({
                type: 'delete',
                url: 'admin/users/' + id,
                success: function(res) {
                    layer.msg(res.message)
                    loadUserList({
                        // 页码：必须从1开始
                        pagenum: pagenum,
                        // 每页显示多少条数据
                        pagesize: pagesize
                    })
                }
            })
        })
    })

    // 重置密码弹出层
    $('.layui-table tbody').on('click', '.layui-btn-normal', function(e) {
        var id = $(e.target).data('id')
        var index = layer.open({
                type: 1,
                title: '重置密码',
                content: $('#repwd-form-tpl').html(),
                area: ['500px', '250px']
            })
            // 重置密码
        $('#repwd-form').submit(function(e) {
            e.preventDefault()
            $.ajax({
                type: 'put',
                url: 'admin/users/' + id,
                data: {
                    password: $('#repwd-form input[name=password]').val()
                },
                success: function(res) {
                    layer.msg(res.message)
                    layer.close(index)
                }
            })
        })
    })

})