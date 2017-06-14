<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/27 0027
 * Time: 下午 8:07
 */

/*配置连接服务器信息*/
$url ='127.0.0.1';
$ouse='root';
$opassword='';
$mydb='mydata';

// 接收数据
//判断变量是否定义且是否为空值
if(!isset($_GET['username']) && empty($_GET['username'])){
    $ousername = null;
}else{
    $ousername = $_GET['username'];
}


if(!isset($_GET['password']) && empty($_GET['password'])){
    $password =null;
}else{
    $password =$_GET['password'];
}


/*连接数据库*/

$con = new mysqli($url,$ouse,$opassword,$mydb);
if($con->connect_error){
    die('连接失败：'.$con->connect_error);
}

if($ousername){
    /*判断用户名是否重复*/
    $checkname ='select * from loginlist where username="'.$ousername.'"';
    $result =$con->query($checkname);
    /*用户名数据数量为0*/
    if($result->num_rows == 0){
        echo 'norepeat';

    }else{
        /*用户名存在*/
        /*判断密码是否正确*/
        $checkpassword = 'select * from loginlist where username="'.$ousername.'" and  password="'.$password.'"';
        $resultps = $con->query($checkpassword);
        if ($resultps->num_rows == 0) {
             //返回密码不存在
            echo 'norepeatps';

        } else {
            //返回密码存在
            echo 'psexists';

        }

    }
}


