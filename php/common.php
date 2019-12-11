<?php

function isExistUser($user){  //判断用户名是否存在
        global $conn;  // 此处的$conn为全局变量
        $search = "select * from `inuser` where  user='$user'"; 

        $result = mysqli_query($conn,$search);

        //  如何判断 用户名 是否存在
        // 方法一  记住 $result 结果相关的对象  num_rows  代表查询的行数
        // print_r($result);

        // echo $result->num_rows;   // >0  存在  ==0 不存在

        // 方法二  mysqli_fetch_array($result); 解析查询语句结果 $result 有数据返回对应的数据信息  没有返回 null
        // $item= mysqli_fetch_array($result); // 解析查询语句
        // print_r($item==null);
        if($result->num_rows>0){  //>0  存在
            return true;
        }else{
            return false;
        }
    }


    function isExistPhone($phone){
        global $conn;  // 此处的$conn为全局变量
        $search = "select * from `inuser` where  phone='$phone'";

        $result = mysqli_query($conn,$search);

        //  如何判断 用户名 是否存在
        // 方法一  记住 $result 结果相关的对象  num_rows  代表查询的行数
        // print_r($result);

        // echo $result->num_rows;   // >0  存在  ==0 不存在

        // 方法二  mysqli_fetch_array($result); 解析查询语句结果 $result 有数据返回对应的数据信息  没有返回 null
        // $item= mysqli_fetch_array($result); // 解析查询语句
        // print_r($item==null);
        if($result->num_rows>0){  //>0  存在
            return true;
        }else{
            return false;
        }
    }





?>