<?php

@header("Content-Type:text/html;charset=utf-8");


require_once("conn.php");

$user=$_GET["user"];
$pwd=$_GET["pwd"];

$search="select * from `inuser` where user='$user' or phone = '$user' or pwd='$pwd'";

$result = mysqli_query($conn,$search);


$item = mysqli_fetch_assoc($result); // 解析查询结果
// print_r ($item);
$msg = array();
if($item){  //有此用户
    $realPwd= $item["pwd"];
    if($pwd==$realPwd){
        $msg["status"] = true;
        $msg["msg"] = "success!";
        // 数据 返回用户名 用户对应的id
        $msg["user"] = $item["user"];
        $msg["userId"] = $item["id"];
    }else{
         $msg["status"] = false;
         $msg["msg"] = "密码错误";
    }


}else{ //该用户不存在
    $msg["status"] = false;
    $msg["msg"] = "该用户不存在";
}

echo json_encode($msg);


?>