<?php
    @header("Content-Type:text/html;charset=utf-8");
    @header("Access-Control-Allow-Origin:*");

    // 连接mysql
    $conn = mysqli_connect("127.0.0.1:3306","root","root");

    // print_r($conn);
    // echo $conn->server_info;    // php 对象的取值
    mysqli_select_db($conn,"day1125");

    mysqli_query($conn,"set names utf8");           //  从数据库取数据 的时候 把字符集设置为 utf-8
    mysqli_query($conn,"set character set utf-8");  //  向数据库中存数据的时候 把字符集设置为 utf-8
