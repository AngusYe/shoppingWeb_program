/**
 * Created by Administrator on 2017/4/27 0027.
 */
//注册界面
function Register(selector){


     this.ele = $(selector).get(0);

     this.focusChange()

}
/*鼠标点击输入框时候，显示提示*/
Register.prototype.focusChange=function () {

      var oSelf = this
      //为输入框添加点击事件
      $(oSelf.ele).find('.main-content-left .sd input').on({
          //焦点事件
          focus:function () {

              if(  $(this).hasClass('username')  ){
                  oSelf.importacchange()
                  //输入用户名下的提示框内容
                  $(oSelf.ele).find('.main-content-left  .account-tip .tip-img').show()
                  $(oSelf.ele).find('.main-content-left  .account-tip .actip-inner').html('请输入邮箱、手机号或6-16位以字母开头的用户名')
              }else{
              	//输入密码下的提示框内容
                  oSelf.importpschange()
                  $(oSelf.ele).find('.main-content-left  .password-tip .tip-img').show()
                  $(oSelf.ele).find('.main-content-left  .password-tip .pstip-inner').html('请输入6-20位以字母开头的数字字母组合密码')
              }
          },//失去焦点时触发
          blur:function () {
              //用户名、密码框的提示框内容
              $(oSelf.ele).find('.main-content-left  .account-tip .tip-img').hide()
              $(oSelf.ele).find('.main-content-left  .account-tip .actip-inner').html('')

              $(oSelf.ele).find('.main-content-left  .password-tip .tip-img').hide()
              $(oSelf.ele).find('.main-content-left  .password-tip .pstip-inner').html('')

          }


      })

}
//注册见面用户名实时判断是否正常或者重复
Register.prototype.importacchange=function () {

    var oSelf = this
    //实时监测输入内容与后台数据的事件
    $(oSelf.ele).find('.main-content-left .account .username').on('propertychange input', function(event) {


        /*传输数据到后台进行实时判断*/
        $.get('php/registerdata.php',{
            username:$(this).val()

        },function (responText) {
            //返回不重复norepeat时
            if(responText == 'norepeat'){
                //用户名可用且后面显示一个绿色的勾
                $(oSelf.ele).find('.main-content-left .account i').removeClass()
                $(oSelf.ele).find('.main-content-left .account i').addClass('acfinish').show()
                $(oSelf.ele).find('.main-content-left  .account-tip .tip-img').css({
                    'background-position':'-166px -21px'
                }).show()
                $(oSelf.ele).find('.main-content-left  .account-tip .actip-inner').html('该用户名可用')

            }else{
                //用户名不可用且后面显示一个红色的勾
                $(oSelf.ele).find('.main-content-left .account i').removeClass()
                $(oSelf.ele).find('.main-content-left .account i').addClass('unacfinish').show()
                $(oSelf.ele).find('.main-content-left  .account-tip .tip-img').css({
                    'background-position':'-166px 0px'
                }).show()
                $(oSelf.ele).find('.main-content-left  .account-tip .actip-inner').html('该用户名不可用或未按要求输入')


            }



        })



    });
}
//注册页面用户名实时判断是否输入密码是否符合规则
Register.prototype.importpschange=function () {

    var oSelf = this
     //事件监听
    $(oSelf.ele).find('.main-content-left .account-password .password').on('propertychange input', function(event) {


        /*传输数据到后台进行实时判断*/
        $.get('php/registerdata.php',{
            password:$(this).val()

        },function (responText) {
             //返回不重复true时
            if(responText == 'true'){
               //密码正确且后面显示一个绿色的勾
                $(oSelf.ele).find('.main-content-left .account-password i').removeClass()
                $(oSelf.ele).find('.main-content-left .account-password i').addClass('psfinish').show()
                $(oSelf.ele).find('.main-content-left  .password-tip .tip-img').css({
                    'background-position':'-166px -21px'
                }).show()
                $(oSelf.ele).find('.main-content-left  .password-tip .pstip-inner').html('密码符合规则')

            }else{
                  //密码错误且后面显示一个绿色的勾
                $(oSelf.ele).find('.main-content-left .account-password i').removeClass()
                $(oSelf.ele).find('.main-content-left .account-password i').addClass('unpsfinish').show()
                $(oSelf.ele).find('.main-content-left  .password-tip .tip-img').css({
                    'background-position':'-166px 0px'
                }).show()
                $(oSelf.ele).find('.main-content-left  .password-tip .pstip-inner').html('请输入6—20位,由字母、数字组成')


            }



        })



    });
}




