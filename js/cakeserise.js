$(document).ready(function () {


    // 动态生成
    var cakelist=$(".cakelist")[0];
    // console.log(cakelist);
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
                    <li><a href="detail.html?id=${goodsId}">
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


   

});