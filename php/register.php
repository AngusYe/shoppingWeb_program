<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/27 0027
 * Time: 上午 10:20
 */

/*配置连接服务器信息*/
$url ='127.0.0.1';
$ouse='root';
$opassword='';
$mydb='mydata';

// 接收数据
$ousername =$_GET['username'];
$password =$_GET['password'];

/*连接数据库*/

$con = new mysqli($url,$ouse,$opassword,$mydb);
if($con->connect_error){
    die('连接失败：'.$con->connect_error);
}
/*创建表*/
$sql ='create table if not exists loginlist(id int not null auto_increment,username varchar(255),password varchar(255),primary key(id)) ';
if(!$con->query($sql)){
    echo '创建表失败'.$sql;
}

/*判断用户名是否重复*/
$checkname ='select * from loginlist where username="'.$ousername.'"';
$result =$con->query($checkname);
if($result->num_rows == 0){

    /*插入数据*/
    $incertsql='insert into loginlist (username,password) values("'.$ousername.'","'.$password.'")';
    if($con->query($incertsql)){
        echo 'success';
    }else{
        echo '数据插入失败';
    }
}else{
    /*返回用户名存在*/
    echo 'nameexists';

}

