<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/5/3 0003
 * Time: 下午 7:32
 */

/*配置连接服务器信息*/
$url ='127.0.0.1';
$ouse='root';
$opassword='';
$mydb='mydata';


/*连接数据库*/

$con = new mysqli($url,$ouse,$opassword,$mydb);
if($con->connect_error){
    die('连接失败：'.$con->connect_error);
}

//查询表中数据的条数
/*$checkcount ='select count(*) from shoplist';*/

//查询所有数据，放进数组
$checksql ='select * from shoplist';
$result =$con->query($checksql);

$arr=array();

//遍历数据
while($obj=$result->fetch_object()){

   //添加进数组
    array_push($arr,$obj);

}

echo json_encode($arr);