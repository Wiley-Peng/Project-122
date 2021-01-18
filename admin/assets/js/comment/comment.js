$(function() {
    // 评论功能
    template.defaults.imports.formatDate = function(date) {
        // 这里可以对原始的日期对象进行处理
        date = new Date(date)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        return year + '-' + month + '-' + day
    }

    function loadCommmentList() {
        $.ajax({
            type: 'get',
            url: 'admin/comments',
            success: function(res) {
                var tags = template('table-tpl', res)
                $('.layui-table tbody').html(tags)
            }
        })
    }

    loadCommmentList()

    // 删除评论
    $('.layui-table tbody').on('click', '.delete', function(e) {
        var id = $(e.target).data('id')
        layer.confirm('确认要删除吗？', function(index) {
            $.ajax({
                type: 'delete',
                url: 'admin/comments/' + id,
                success: function(res) {
                    if (res.status === 0) {
                        // 关闭窗口
                        layer.close(index)
                            // 刷新类别
                        loadCommmentList()
                    }
                }
            })
        })
    })
})