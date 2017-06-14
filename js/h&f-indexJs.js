/*头部的点击事件*/
$(function() {

	//顶端我的好24、手机购物移入移出按钮事件	
	$('#head-warp').find('.warp-nav .warp-nav-subox').each(function() {

		$(this).on({

			mouseenter: function() {

				$(this).children('.hide-list').show()
			},
			mouseleave: function() {

				$(this).children('.hide-list').hide()
			}

		})
	})

	//顶部广告模块的关闭按钮事件
	$('#head-ad').find('.ad-main .close').click(function() {

		$('#head-ad').css('display', 'none')

	})

	$('#logo-module').find('.car').on({

		mouseenter: function() {
			$('#logo-module').find('.car .menu').show()
			$('#logo-module').find('.car .shop-car-menu').show()
		},
		mouseleave: function() {
			$('#logo-module').find('.car .menu').hide()
			$('#logo-module').find('.car .shop-car-menu').hide()
		}

	})

	//三级导航的划过显示

	$('body').find('.index-nav-secondlist li').not('.threenav li').each(function() {

		$(this).on({

			mouseenter: function() {

				$(this).find('.threenav').show()

			},
			mouseleave: function() {
				$(this).find('.threenav').hide()
			}

		})

	})
	//二级导航的划过显示

	$('#index-nav').find('.index-first-nav .nav-title-one').on({

		mouseenter: function() {

			$(this).find('.secondlist').show()

		},
		mouseleave: function() {
			$(this).find('.secondlist').hide()

		}

	})
	//获取用户名及密码cookies是否存在
	var ousername = $.cookie('username')
	var opassward = $.cookie('password')
    //存在时则改变顶部的显示以账号的形式显示
	if(ousername && opassward) {
     console.log('1')
		$('.warp').find('.warp-nav .login').html('你好！'+ ousername)
		$('.warp').find('.warp-nav .regist').html("<a class='quit'>退出</a>")
		$('.warp').find('.warp-nav .hide').hide()

	} else {
		$('.warp').find('.warp-nav .login').html('<a href="http://127.0.0.1/shopping_program/loginindex.html" >登录</a>')
		
		$('.warp').find('.warp-nav .regist').html('<a href="http://127.0.0.1/shopping_program/registerindex.html" >注册</a>')
		$('.warp').find('.warp-nav .hide').show()
	}
	
	//给账号退出添加点击事件删除Cookies
	$('#head-warp').find('.warp-nav .quit').on({
		
		click:function(){
			
			$.removeCookie('username');
			$.removeCookie('password');
			history.go(0)
		}
		
		
	})
	
	
	

})