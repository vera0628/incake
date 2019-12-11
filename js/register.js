$(document).ready(function () {


    // 登录验证


    $(".user").on("input blur", steedUser);
    $(".phone").on("input blur", steedUser);
    $(".pwd").on("input blur", steedUser);
    $(".iden-code").on("input blur", steedUser);



    // 验证码随机
    $(".code").html(createCode());
    $(".code").click(function () {
        $(".code").html(createCode());
    })

    steedUser();


    function steedUser() {
        var user = $(".user").val();
        // console.log(user);
        if (user) {
            var lenReg = /^.{6,20}$/;   //长度验证
            var startReg = /^[^0-9]/;   //首字符验证
            var userReg = /^[a-zA-Z_$\u4e00-\u9fa5][0-9a-zA-Z_$\u4e00-\u9fa5]/; //所有字符验证
            if (lenReg.test(user) == true) {
                if (startReg.test(user) == true) {
                    if (userReg.test(user) == true) {
                        //最终结果
                        $(".ts").html("* 用户名正确√");
                        $(".ts").addClass("msg");
                        userflag = true;

                        return steedPhone();//调用手机号验证


                    } else {
                        $(".ts").html("* 用户名还有非法字符");
                        $(".ts").removeClass("msg");
                    }
                } else {
                    $(".ts").html("* 用户名不能以数字开头");
                    $(".ts").removeClass("msg");
                }

            } else {
                $(".ts").html("* 用户名长度需要在6-12位之间");
                $(".ts").removeClass("msg");
            }
        } else {
            $(".ts").html("* 请输入用户名");
            $(".ts").removeClass("msg");
        }
        return false;
    }

    function steedPhone() {
        var phone = $(".phone").val();
        if (phone) {
            var phoneReg = /^1[3456789]\d{9}$/;
            if (phoneReg.test(phone) == true) {

                $(".ts").html("* 手机号正确√");
                $(".ts").addClass("msg");
                phoneflag = true;
                return steedpwd();//调用密码验证

            } else {
                $(".ts").text("手机号码格式不对");
                $(".ts").removeClass("msg");
            }
        } else {
            $(".ts").text("用户名正确，请输入手机号码");

        }
        return false;
    }

    function steedpwd() {
        var pwd = $(".pwd").val();
        if (pwd) {
            var lenReg = /^.{6,20}$/;
            var pwdReg = /^[\w$]{6,20}$/;
            if (lenReg.test(pwd) == true) {
                if (pwdReg.test(pwd) == true) {

                    $(".ts").html("* 密码正确√");
                    $(".ts").addClass("msg");
                    pwdflag = true;
                    return steedcode();//调用验证码验证

                } else {
                    $(".ts").text("密码包含非法字符");
                    $(".ts").removeClass("msg");
                }

            } else {
                $(".ts").text("密码格式应该在6-20位之间");
                $(".ts").removeClass("msg");
            }
        } else {
            $(".ts").text("手机号正确，请输入密码");
        }
        return false;
    }


    function steedcode() {
        var code = $(".iden-code").val();
        var tsCode = $(".code").text();
        var codeReg = new RegExp(tsCode, "ig");

        if (code) {
            if (codeReg.test(code)) {
                $(".ts").html("* 验证码正确√");
                $(".ts").addClass("msg");
                return true
            } else {
                $(".ts").text("验证码不正确");
                $(".ts").removeClass("msg");
            }

        } else {
            $(".ts").text("密码格式正确，请输入验证码");
        }
        return false;
    }

    function createCode() {

        var codeStr = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        var str = "";
        for (var i = 0; i < 4; i++) {
            var index = Math.round(Math.random() * (codeStr.length - 1));
            var char = codeStr.charAt(index);
            str += char;
        }
        return str;

    }

    //    注册验证
    $(".login-btn").click(function () {
        // if(steedUser()){
        //     alert("注册成功");
        // }
        var user = $(".user").val(),
            phone = $(".phone").val(),
            pwd = $(".pwd").val();
        // console.log(user,phone,pwd);
        if (user && phone && pwd) {
            $.ajax({
                type: "get",
                url: "http://localhost/incake/php/register.php",
                data: {
                    user, phone, pwd
                },
                dataType: "json",
                success: function (result) {
                    if (result.status == true) {
                        location.href = "../html/index.html";
                    } else {
                        alert("err： " + result.msg);
                    }
                },
                error: function (err) {
                    alert("错误" + err.msg);
                    console.log(result);
                    // console.log("错误", err.msg);
                }

            })
        } else {
            alert("请完善信息");
        }

    })



})