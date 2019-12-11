<?php
@header("Content-Type:text/html;charset=utf-8");

require_once("conn.php");
require_once("common.php");

$user = $_GET["user"];
$phone = $_GET["phone"];
$pwd = $_GET["pwd"];

$msg = array();
if(isExistUser($user)){ //
    $msg["status"] = false;
    $msg["msg"] = "用户名已存在";
}else if(isExistPhone($phone)){
    $msg["status"] = false;
    $msg["msg"] = "手机号已存在";
}else{
   
    // 新增数据  => 无脑新增 不符合逻辑  在此之前 判断 用户名/手机号/邮箱是否存在
    $insert = "insert into `inuser`(user,phone,pwd) values('$user','$phone','$pwd')";

    mysqli_query($conn,$insert);

    // 增删改返回的都是受影响的行数
    $row = mysqli_affected_rows($conn);

    // echo $row;

    // $row  增删改有三种情况
    // >0   成功   $row   返回对应的受影响行数
    // ==0  （增删改失败） 数据没有影响  
    // -1   失败   sql语句有问题

    $msg = array();  // {status:true,msg:"success!"}  {status:true,msg:"fail!"}    {status:true,msg:"system error!"}
    if($row>0){
        $msg["status"]=true;
        $msg["msg"]="success!";
    }else if($row==0){
        $msg["status"]=false;
        $msg["msg"]="fail!";
    }else{
        $msg["status"]=false;
        $msg["msg"]="sql error!";
    }

    
}

echo json_encode($msg);


mysqli_close($conn);   // 关闭连接









?>