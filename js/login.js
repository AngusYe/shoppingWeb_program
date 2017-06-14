/**
 * Created by Administrator on 2017/4/27 0027.
 */
//登录界面
function Login(selector){


    this.ele = $(selector).get(0);

    this.focusChange()

    this.importacchange()

    this.closeClick()
}
/*鼠标点击输入框时候，显示提示*/
Login.prototype.focusChange=function () {

    var oSelf = this
     //为输入框添加焦点事件
    $(oSelf.ele).find('.login-content .sd input').on({
        //点击输入框时显示提示信息
        focus:function () {
             //判断点击的输入框是否是用户名的输入框
            if(  $(this).hasClass('username')  ){
            	//
                $(this).css('border-color','#269abc')
                $(this).siblings('.user-img').css({
                    "background-position":"-110px 0"
                })
                $(oSelf.ele).find('.login-content  .usertipimg').show()
                $(oSelf.ele).find('.login-content  .usclear').show()
                $(oSelf.ele).find('.login-content  .usertip').html('请输入用户名')
            }else{
                $(this).css('border-color','#269abc')
                $(this).siblings('.user-img').css({
                    "background-position":"-110px -36px"
                })
                $(oSelf.ele).find('.login-content  .psclear').show()
                $(oSelf.ele).find('.login-content  .pstipimg').show()
                $(oSelf.ele).find('.login-content  .pstip').html('请输入登录密码')
            }
        },   //失去焦点时不显示信息
        blur:function () {
            $(this).css('border-color','#ddd')
            $(this).siblings('.user-img').css({
                "background-position":''
            })
            /*$(oSelf.ele).find('.login-content  .usclear').hide()*/
            $(oSelf.ele).find('.login-content  .usertipimg').hide()
            $(oSelf.ele).find('.login-content  .usertip').html('')

            /*$(oSelf.ele).find('.login-content  .psclear').hide()*/
            $(oSelf.ele).find('.login-content  .pstipimg').hide()
            $(oSelf.ele).find('.login-content  .pstip').html('')

        },//输入框内容改变时的事件
        change:function () {
              //在密码框输入时，登录按钮变色
            if(  $(this).hasClass('password')  ){

                $(oSelf.ele).find('.login-content .btn').css({
                	'background':"#f3592a",
                	"color":'#fff'
                })

            }


        }


    })

}
//登录界面用户名密码判断
Login.prototype.importacchange=function () {

    var oSelf = this
    //为登录按钮添加点击事件，点击提交用户名、密码到后台进行判断，并返回正确或错误结果
    $(oSelf.ele).find('.login-content .btn').on({

     click:function () {

         /*传输数据到后台进行判断*/
         $.get('php/login.php',{
             username:$('.username').val(),
             password:$('.password').val()
         },function (responText) {
             console.log(responText)
               //用户名错误
              if(responText == 'norepeat'){

                  $(oSelf.ele).find('.login-content  .usertipimg').css({
                      "background-position":"-35px -32px"
                  }).show()
                  $(oSelf.ele).find('.login-content  .usertip').html('用户名输入不存在')

             }
              //密码错误
             if(responText == 'norepeatps'){

                 $(oSelf.ele).find('.login-content  .pstipimg').css({
                     "background-position":"-35px -32px"
                 }).show()
                 $(oSelf.ele).find('.login-content  .pstip').html('登录密码输入错误')
             }
             //登入成功
             if(responText == 'psexists'){
             	//将用户名和密码以cookies的形式保存、并跳转到首页
             	var date = new Date()
             	 $.cookie('username',$('.username').val(),{
             	 	expires:7
             	 })
             	 $.cookie('password',$('.password').val(),{
             	 	expires:7
             	 })
                 open('http://127.0.0.1/shopping_program/indexdemo.html','_parent')
              }

         })


        }
    })




}
//输入框中后面的x添加点击事件
Login.prototype.closeClick=function () {

    var oSelf = this;
     //为输入框后的小圆X添加点击事件
    $(oSelf.ele).find('.login-content  .user-clear').on({

           click:function () {
              //点击后清除该输入框的内容
             
              $(this).siblings('input').val('')



           }



    })




}




