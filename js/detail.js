$(document).ready(function () {

    // 动态生成
    var article = $("article")[0];
    // console.log(article);
    var index = location.search.split("=")[1];
    console.log(index);

    function getImgDomList(list) {
        var a = "";
        list.forEach(img => {
            a += `<li><a><img src="../image/${img}" alt=""></a></li>`;
        });
        return a;
    }

    function getWeightDomList(list) {
        var a = "";
        list.forEach((spec, index) => {
            a += `<span class="spec-item spec-${index + 1} ${index===0?'active':''}">${spec}
            <a></a>
    </span>`;
        });
        return a;
    }

    function getFundDomList(list) {
        var a = "";
        list.forEach((price, index) => {
            a += ` <div class="fund-item fund-${index+1}">
                <div class="word">款项:</div>
                <div class="fund-content">
                    <p class="cost">￥${price}</p>
                    <p class="price">￥${price * 0.9 >> 0}</p>
                    <span class="design">
                        <span class="en">常规款</span>
                        <span class="cn"></span>
                    </span>
                </div>
            </div>`;
        });
        return a;
    }

    html = "";
    $.ajax({
        type: "get",
        url: `http://localhost/incake/php/sportdataid.php?id=${index}`,
        // data: {
        //     user: user,
        //     pwd: pwd,
        // },
        dataType: "json",
        success: function (result) {
            // console.log(result);
            var {
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
            } = result;

            // console.log(goodsSpecList, goodsPriceList);
            html += ` 
                <!-- 左 -->
                <div class="preview-wrap">
                    <div class="preview">
                        <img  class="active" src="../image/${goodsImg}" alt="">
        
                        <!-- 蒙尘 -->
                        <div class="cover">
                            <!-- 内部滑动盒子 --> 
                            <div class="bosom-box">
                                <img src="../image/${goodsImg}" alt="">
                            </div>
                            
                        </div>
        
                        <!-- 外部盒子 -->
                        <div class="outside-box">
                                <img src="../image/${goodsImg}" alt="">
                        </div>
                    </div>
        
                    <div class="layout-imglist">
                        <!-- 《 -->
                        <a  class="left" href="javaScript:"></a>
                        <!-- 》 -->
                        <ul class="layout">
                            ${getImgDomList(goodsList.split(","))}
                        </ul>
                        <a  class="right" href="javaScript:"></a>
                    </div>
                </div>
                <!-- 右 -->
                <div class="content-wrap">
                   <div class="con-title">
                    <span class="title-cn">${goodsName}</span>
                    <span class="title-en">${goodsEnglish}</span>
                   </div>
                   <p class="pre-msg">${goodsMsg}</p>
                   <div class="genre-wrap">
                       <ul>
                           <li class="spec">
                               <div class="word">规格:</div>
                                ${getWeightDomList(goodsSpecList.split(","))}
                           </li>
                           <li class="fund">
                           ${getFundDomList(goodsPriceList.split(","))}
                           </li>
                           <li class="tips">
                               <p class="tips-one">${goodsTips}</p>
                               <p>${goodsCanju}</p>
                               <p>${goodsPerson}</p>
                               <p>${goodsDay}</p>
                           </li>
                           <li class="amount">
                               <div class="word">数量:</div>
                               <div class="amo-layout">
                                   <span class="reduce-a"></span>
                                   <input type="text" value="1">
                                   <span class="add"></span>
                               </div>
                           </li>
                       </ul>
                    </div>
                           <a  class="favor" href="../html/login.html">
                            <img src="../image/icon_detail_favor.png" alt="">
                            <span>喜欢</span>
                           </a>
                           <input class="join-btn" type="button" value="加入购物篮">
                           <input class="buy-btn" type="button"value="立即购买">
                </div>
                `;
            article.innerHTML = html;
            bigplay();
            $(".spec-item").click(function(){
                var thisIndex=$(this).index();
                $(".fund-item").eq(thisIndex-1).show().siblings().hide();
                $(this).addClass("active").siblings().removeClass("active");

            })

            // 小图片点击换图事件
            $(".layout").on("click","li",function(){
                var thisSrc=$(this).find("img").attr("src");
                // console.log(thisSrc);
                $(".preview img").attr("src",thisSrc);
            })



        }
    })







    function bigplay(){
        // 放大镜
    $(".cover").mousemove(function (e) {
        // console.log(e.pageX, $(".cover")[0].offsetLeft,($(".bosom-box")[0].clientHeight) / 2);
        // console.log(e.pageY , $(".cover")[0].offsetTop , $(".bosom-box")[0].clientHeight / 2,$(".preview")[0].offsetTop);

        var x = e.pageX - $(".cover")[0].offsetLeft - $(".bosom-box")[0].clientWidth / 2 - $(".preview")[0].offsetLeft;
        var y = e.pageY - $(".cover")[0].offsetTop - $(".bosom-box")[0].clientHeight / 2 - $(".preview")[0].offsetTop;

        // console.log(x, y);

        $(".cover").css("opacity", "1");
        $(".outside-box").css("display", "block");
        var maxWidth = $(".cover")[0].clientWidth - $(".bosom-box")[0].clientWidth;
        var maxHeight = $(".cover")[0].clientHeight - $(".bosom-box")[0].clientHeight;
        if (x < 0) {
            x = 0;
        }
        if (x > maxWidth) {
            x = maxWidth;
        }
        if (y < 0) {
            y = 0;
        }
        if (y > maxHeight) {
            y = maxHeight;
        }
        $(".bosom-box").css({ left: x });
        $(".bosom-box").css({ top: y });

        var scale = $(".bosom-box")[0].clientWidth / $(".outside-box")[0].clientWidth;
        $(".bosom-box img").css({ left: -(scale * x) })
        $(".bosom-box img").css({ top: -(scale * y) })

        $(".outside-box img").css({ left: -(scale * x) })
        $(".outside-box img").css({ top: -(scale * y) })


    })

    $(".cover").mouseleave(function (e) {
        $(".cover").css("opacity", "0");
        $(".outside-box").css("display", "none");
    })

    // 商品详情页点击效果
    $(".ware-header .tag-one").click(function () {
        console.log(111);
        console.log($(".detail"))
        $("#detail").css("display", "block");
        $("#appraise").css("display", "none");
    })
    $(".ware-header .tag-two").click(function () {
        console.log(222);
        $("#detail").css("display", "none");
        $("#appraise").css("display", "block");
    })

    }
    






})