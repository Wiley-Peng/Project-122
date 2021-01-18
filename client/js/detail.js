function getID() {
    var url = location.href;
    var arr = url.split("?"); // JS基础：字符串与数组的相互转换
    url = arr[1];
    var params = url.split("&"); // 如果有多个字符&名=值&  拼接  需要在截取  遍历  只要id
    var obj = {};
    for (var i = 0; i < params.length; i++) {
        var one = params[i];
        one = one.split("=");
        var key = one[0];
        var val = one[1];
        obj[key] = val;
    }
    return obj.id;
}
var id = getID();
// console.log(id);
//    加载评论
function local() {
    $.ajax({
        url: 'http://localhost:8888/api/articles/' + id + '/comments',
        success: function(res) {
            var str = ['<h4><i class="sprites"></i>评论区</h4>']
                // console.log(res.data);
            $.each(res.data, function(index, item) {
                if (res.status === 0) {
                    var arr = ['<h4><i class="sprites"></i>评论区</h4>']
                    res.data.forEach(function(item) {
                        arr.push(`
              <div class="kr_comment_card">
                <div class="img-wrap">
                  <img src="./uploads/avatar_3.jpg" alt="">
                </div>
                <div class="info">
                  <p>${item.uname} · <span>2020-08-16</span></p>
                  <p>${item.content}</p>
                </div>
                <a href="javascript:;" class="like">${item.count}</a>
              </div>
            `)
                    })
                    $('#comment-list').html(arr.join(''))
                }
            })
        }
    })
}
local()
var layer = layui.layer;
$('#comment-form').submit(function(e) {
    e.preventDefault()
    let fd = $(this).serialize()
    $.ajax({
        type: 'post',
        url: 'http://localhost:8888/api/articles/' + id + '/comments',
        data: fd,
        success: function(res) {
            if (res.status === 0) {
                // 发表评论成功
                layer.msg(res.message)
                $('#comment-form')[0].reset() //清空内容
                local()
            }
        }
    })
})