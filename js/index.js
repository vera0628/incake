$(document).ready(function () {
    // 悬浮框
    $(".qrcode-qw img").click(function () {
        $(".qrcode-qw").css("display", "none")
    })







    // 轮播图
    var timer;
    var index = 0;
    play();//调用动画
    //hover悬停效果
    $(".swiper").hover(function () {
        clearInterval(timer);
    }, function () {
        play();
    })
    //点击事件
    $(".dot").click(function () {
        index = $(this).index();
        wraper();
    })
    //左右点击事件
    $(".left_arrow").click(function () {
        index--;
        wraper();
    })
    $(".right_arrow").click(function () {
        index++;
        wraper();
    })










    function play() {
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            wraper();
            // console.log(index);
        }, 2000)
    }

    function wraper() {
        var width = $(".slide_wrap .slide").width();
        // console.log(width);
        if (index < 0) {
            $(".slide_wrap").stop(true, true).css({ marginLeft: -width * ($(".slide_wrap .slide").length - 1) });
            // 下标改为第四张下标
            index = $(".slide_wrap .slide").length - 2;
        }

        $(".slide_wrap").stop(true, true).animate({ marginLeft: -width * index }, 500, function () {
            if (index >= $(".slide_wrap .slide").length - 1) {
                index = 0;
                $(".slide_wrap").css({ marginLeft: 0 });
            }
        })
        if (index >= $(".slide_wrap .slide").length - 1) {
            $(".pagination .dot").eq(0).addClass("active").siblings().removeClass("active");
        } else {
            $(".pagination .dot").eq(index).addClass("active").siblings().removeClass("active");
        }

    }


    // 动态生成
    // console.log($(".cakelist")[0]);
    var cakelist = $(".cakelist")[0];
    html = "";
    $.ajax({
        type: "get",
        url: "http://localhost/incake/php/sportdatagoodsid.php",
        // data: {
        //     user: user,
        //     pwd: pwd,
        // },
        dataType: "json",
        success: function (result) {
            console.log(result);
            result.forEach(({
                goodsId,
                goodsName,
                goodsEnglish,
                goodsMsg,
                goodsImg,
                goodsList,
                goodsTips,
                goodsCanju,
                goodsPerson,
                goodsDay,
                goodsSpecList,
                goodsPriceList
            }) => {
                
                // console.log(goodsSpecList, goodsPriceList);
                html += ` 
                    <li><a href="detail.html">
                        <img src="../image/${goodsImg}" alt="">
                        <p class="desc">${goodsMsg}</p>
                        <div class="name">
                            <span class="cn">${goodsName}</span>
                            <span class="en">${goodsEnglish}</span>
                        </div>
                        <div class="attr">
                            <span class="price">￥${goodsPriceList.split(",")[0]}</span>
                            <span class="pound">/${goodsSpecList.split(",")[0]}</span>
                        </div>
                        <span class="favor"></span>
                        </a>
                    </li>
                `;
                cakelist.innerHTML = html;

            });

        }

    })






})