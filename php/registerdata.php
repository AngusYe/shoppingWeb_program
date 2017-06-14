<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/27 0027
 * Time: 下午 2:49
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
$match1='/^1\d{10}$/';//以1开头的11位手机号码
$match2='/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/';
/*验证邮箱
验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
*/
$match3='/^[a-zA-z]\w{6,15}$/';
/*验证帐号是否合法
验证规则：字母、数字、下划线组成，字母开头，6-16位。*/
if($result->num_rows == 0){
	//验证用户名规则正确就返回norepeat,错误就返回usernameerror
	if(preg_match($match1,$ousername) || preg_match($match2,$ousername) || preg_match($match3,$ousername)){
		echo 'norepeat';
	}else{
		echo 'usernameerror';
	}
     

}else{
    /*返回用户名存在*/
    echo 'nameexists';

}

}




/*判断密码是否符合规则  密码:6—20位,由字母、数字组成*/
$match='/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/';
if($password){

    if(preg_match($match,$password)){

        echo 'true';

    }
    else{
        echo "false";
    }

}
