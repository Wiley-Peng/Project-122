var prams = {
    pagenum: 1,
    pagesize: 6
}

function getinfo() {
    // console.log(1);

    var arr = [`<div class="kr_news_date">
16 <span>08月</span>
</div>`]
    $.ajax({
        url: "http://localhost:8888/api/articles",
        data: prams,
        success: function(res) {
            // console.log(res.data);
            if (res.status == 0) {
                res.data.forEach(function(item) {
                    // console.log(item);
                    arr.push(`<div class="item">
                <h4>
                    <a href="./detail.html?id=${item.id}">${item.title}</a>
                </h4>
                <p class="meta">
                    <span>15分钟前 分享至</span>
                    <a href="javascript:;" class="wechat"></a>
                    <a href="javascript:;" class="weibo"></a>
                </p>
                <p class="brief">${item.content}</p>
            </div>`)
                })
                $('.kr_news_list').append(arr.join(''))
            }
        }
    })
}
getinfo()
$('.kr_more').on('click', function() {
    getinfo()
    prams.pagenum++;
})