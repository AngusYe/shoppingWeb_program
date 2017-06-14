<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/3 0003
 * Time: 下午 5:24
 */

/*配置连接服务器信息*/
$url ='127.0.0.1';
$ouse='root';
$opassword='';
$mydb='mydata';

/*接收数据*/

//判断变量是否定义且是否为空值
if(!isset($_GET['goodpic']) && empty($_GET['goodpic'])){
    $goodpic = null;
}else{
    $goodpic = $_GET['goodpic'];
}
if(!isset($_GET['goodname']) && empty($_GET['goodname'])){
    $goodname = null;
}else{
    $goodname = $_GET['goodname'];
}
if(!isset($_GET['goodprice']) && empty($_GET['goodprice'])){
    $goodprice = null;
}else{
    $goodprice = $_GET['goodprice'];
}
if(!isset($_GET['goodcheck']) && empty($_GET['goodcheck'])){
    $goodcheck = null;
}else{
    $goodcheck = $_GET['goodcheck'];
}
if(!isset($_GET['goodpoint']) && empty($_GET['goodpoint'])){
    $goodpoint = null;
}else{
    $goodpoint = $_GET['goodpoint'];
}


if(!isset($_GET['deletename']) && empty($_GET['deletename'])){
    $deletename = null;
}else{
    $deletename = $_GET['deletename'];
}
if(!isset($_GET['goodcount']) && empty($_GET['goodcount'])){
    $goodcount = null;
}else{
    $goodcount = $_GET['goodcount'];
}



/*连接数据库*/

$con = new mysqli($url,$ouse,$opassword,$mydb);
if($con->connect_error){
    die('连接失败：'.$con->connect_error);
}

//创建表格

$sql ='create table if not exists shoplist(id int not null auto_increment,goodpic varchar(255),goodname varchar(255),goodprice varchar(255),goodcount varchar(255),goodcheck varchar(255),primary key(id))';
if(!$con->query($sql)){
    echo '创建表失败'.$sql;
}



//判断购物车里是否存在
if($goodname && $goodprice && $goodpic && $goodcount){


$checksql ='select * from shoplist where goodname="'.$goodname.'"';
$result =$con->query($checksql);
//不重复
if($result->num_rows == 0){
    //插入数据
    $insertspl='insert into shoplist (goodpic,goodname,goodprice,goodcount,goodcheck) values("'.$goodpic.'","'.$goodname.'","'.$goodprice.'","'.$goodcount.'","'.$goodcheck.'")';
    if(!$con->query($insertspl)){
        echo '插入失败';
    }else{
        echo 'addgood success';
    }
}else{
	
	//当加入的商品存在时，更新后台的商品数量加1
    $updatacount ='update shoplist set goodcount=goodcount + 1  where goodname="'.$goodname.'"';
	if(!$con->query($updatacount)){
	    echo '更新数量失败';
    }else{
        echo 'addgood success';
    }
    
}


}

if($deletename){

    $deletesql ='delete from shoplist where goodname="'.$deletename.'"';
    if(!$con->query($deletesql)){
          echo "删除失败";
    }else{
        echo 'delete success';
    }
}

if($goodcount && $goodname && !$goodprice && !$goodpic){


	$updatacount ='update shoplist set goodcount="'.$goodcount.'" where goodname="'.$goodname.'"';
	if(!$con->query($updatacount)){
	    echo '更新数量失败';
    }
}

if($goodcheck){


	$updatacheck ='update shoplist set goodcheck="'.$goodcheck.'" where goodname="'.$goodname.'"';
	if(!$con->query($updatacheck)){
	    echo '更新状态失败';
    }
}

if($goodcheck && $goodpoint){


	$updatacheck ='update shoplist set goodcheck="'.$goodcheck.'"';
	if(!$con->query($updatacheck)){
	    echo '更新状态失败';
    }
}