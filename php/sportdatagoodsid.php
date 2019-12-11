<?php
    @header("Content-Type:text/html;charset=utf-8");

    require_once("conn.php");



    $search = "select * from `ingoodslist`";
    // echo $search;   //应该删除

    $result = mysqli_query($conn,$search);

    $list = array();
    
    
    while($item = mysqli_fetch_assoc($result)){
        $list[] = $item;
    }

    echo json_encode($list);








?>