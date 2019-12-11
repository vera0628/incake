$(document).ready(function () {



    // 登录验证
    $(".login-btn").click(function () {
        var user = $(".user").val();
        var pwd = $(".pwd").val();
        console.log(user, pwd);
        if (user && pwd) {
            $.ajax({
                type: "get",
                url: "http://localhost/incake/php/login.php",
                data: {
                    user: user,
                    pwd: pwd,
                },
                dataType: "json",
                success: function (result) {
                    // console.log(result);
                    if (result.status == true) {
                        location.href = "../html/index.html";
                    } else {
                        alert("err： " + result.msg);
                        console.log(result);
                    }
                },
                // 请求失败时的回调函数  
                error: function (err) {
                    // alert("错误",err);
                    // return err.msg;
                    // console.log("错误", err.msg,err);
                }

            })

        } else {
            alert("请填写用户名和密码");
        }
    })

    $(".join").click(function () {
        location.href = "../html/register.html";
    })


});