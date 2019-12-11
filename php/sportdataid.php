<?php
    @header("Content-Type:text/html;charset=utf-8");

    require_once("conn.php");


    $id=$_GET["id"];
    $search = "select * from `ingoodslist` where goodsId='$id'";
    // echo $search;   //应该删除

    $result = mysqli_query($conn,$search);

    
    $item = mysqli_fetch_assoc($result);
    

    echo json_encode($item);