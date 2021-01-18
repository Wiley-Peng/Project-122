//轮播图
//负责人: 彭巍立

$(function() {
    // 轮播图
    var form = layui.form

    // 获取轮播图列表数据
    function loadSwiperList() {
        $.ajax({
            type: 'get',
            url: 'admin/swipers',
            success: function(res) {
                var tags = template('table-tpl', res)
                $('.layui-table tbody').html(tags)
            }
        })
    }

    loadSwiperList()

    // 轮播图状态切换
    $('.layui-table tbody').on('click', '.layui-badge', function(e) {
        let status = $(e.target).data('status')
        let id = $(e.target).data('id')
        $.ajax({
            type: 'put',
            url: 'admin/swipers/' + id,
            data: {
                status: status
            },
            success: function(res) {
                if (res.status === 0) {
                    // 切换成功
                    layer.msg(res.message)
                    loadSwiperList()
                }
            }
        })
    })

    // 删除操作
    $('.layui-table tbody').on('click', '.delete', function(e) {
        var id = $(e.target).data('id')
        layer.confirm('确实要删除吗？', function(index) {
            $.ajax({
                type: 'delete',
                url: 'admin/swipers/' + id,
                success: function(res) {
                    if (res.status === 0) {
                        // 删除成功
                        layer.close(index)
                        loadSwiperList()
                    }
                }
            })
        })
    })

    // 上传轮播图按钮点击事件
    $('body').on('click', '#uploadSwiper', function() {
        $('#myfile').click()
    })

    // 监听文件选中事件
    $('body').on('change', '#myfile', function(e) {
        console.log(111)
        let files = e.target.files
        var fd = new FormData()
        $.each(files, function(index, item) {
            fd.append('swipers', item)
        })
        $.ajax({
            type: 'post',
            url: 'admin/swipers',
            data: fd,
            processData: false,
            contentType: false,
            success: function(res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                    loadSwiperList()
                }
            }
        })
    })
})