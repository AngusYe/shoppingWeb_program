//购物车
function Shopcar() {

	this.addsmallcar()
	
}
//点击加入购物车，创建购物车节点
Shopcar.prototype.addgoodpoint = function() {
	var oSelf = this
	var sum = 0
	//获取数据
	//设置定时器0.5秒刷新一次数据
	$.get('php/shopcardata.php',
		function(dataarr) {
			//清除前面建的节点
			$('.content-box .shop-car .shop-car-td').remove()
			if(dataarr.length == 0) {
				$('.content-box .car-empty').show()
				$('.content-box .shop-car').hide()
				$('.content-box .car-ad').hide()
			} else {
				$('.content-box .car-empty').hide()
				$('.content-box .shop-car').show()
				$('.content-box .car-ad').show()
				$('.content-box').find('.pay-box .fillpay h3 span').html("￥" + 0)
				//遍历数组
				for(var i = 0; i < dataarr.length; i++) {
					//创建节点
					$('.content-box .shop-car .pay-box').before($('<ul class="shop-car-td"> </ul>'))
					$('.content-box .shop-car .shop-car-td').eq(i).append('<li class="car-li1"><div class="checkbutton check"> <input type="checkbox" ' + dataarr[i].goodcheck + ' class="checkzt"/> </div> </li>')
					$('.content-box .shop-car .shop-car-td').eq(i).append('<li class="car-li2"> <a href="#"> <img src=' + dataarr[i].goodpic + ' /> </a> </li>')
					$('.content-box .shop-car .shop-car-td').eq(i).append('<li class="car-li3"> <p class="li3-title"> <a href="#">' + dataarr[i].goodname + ' </a> </p> <p>默认，默认</p> </li>')
					$('.content-box .shop-car .shop-car-td').eq(i).append('<li class="car-li4">￥' + dataarr[i].goodprice + '</li>')
					$('.content-box .shop-car .shop-car-td').eq(i).append('<li class="car-li5"> <div class="num"> <a href="#" class="num-btn lownum">-</a> <font class="count">' + dataarr[i].goodcount + '</font> <a href="#" class="num-btn addnum">+</a> </div> </li>')
					$('.content-box .shop-car .shop-car-td').eq(i).append('<li class="car-li6">' + (dataarr[i].goodprice) * dataarr[i].goodcount + '</li>')
					$('.content-box .shop-car .shop-car-td').eq(i).append('<li class="car-li7"> <a class="delete">删除</a> <a class="move" >移至收藏</a> </li>	')
					//添加点击删除
					oSelf.clickDelete();

					//遍历查看设置Input标签是否是checked状态
					if(dataarr[i].goodcheck == 'checked') {
						
						$('.content-box .shop-car .shop-car-td').eq(i).find('.checkbutton').css('background-position', '-15px 0')
						//获取小计价格
					    sum += dataarr[i].goodprice * dataarr[i].goodcount
					    //合计价格
					    $('.content-box').find('.pay-box .fillpay h3 span').html("￥" + sum)
					} else {
						
						$('.content-box .shop-car .shop-car-td').eq(i).find('.checkbutton').css('background-position', '0 0')
					}

				}
				//点击数量增加或减少
				oSelf.numchange();
				oSelf.inputcheck()
			}

		}, 'json')

}
//点击加入购物车，创建小购物车节点
Shopcar.prototype.addsmallcar = function() {

	/*添加到购物篮里*/
	var oSelf = this
	$.get('php/shopcardata.php', function(dataarr) {
        
		if(dataarr.length == 0) {

			$('.xsnum').hide()

		} else {

			$('.xsnum').show()
			//清楚存在的节点
			$('.shop-car-menu').html('')
			//获取购物车里最后一次添加的商品
			var i = dataarr.length - 1
			//创建节点
			$('<div class="shop-car-menu"><h4 class="shopcar-title">最新加入商品</h4><ul class="shopcar-list"></ul></div>').appendTo('.car')
			$('.shopcar-list').append('<li><div class="shopcar-pic"><a href="#"><img src="' + dataarr[i].goodpic + '"/></a></div><div class="shopcar-goodname"><a href="#">' + dataarr[i].goodname + '</a></div><div class="shopcar-price">￥' + dataarr[i].goodprice + '</div><div class="shopcar-count"><span class="goodnum">X' + dataarr[i].goodcount + '</span><span class="delete">删除</span></div></li>')
			$('.shop-car-menu').append('<div class="sc-pay"><div class="sc-pay-left">共<b	>' + dataarr[i].goodcount + '</b>件商品&nbsp;&nbsp;&nbsp;&nbsp;总计<strong>￥' + dataarr[i].goodcount * dataarr[i].goodprice + '</strong></div><a href="shoppingcar.html">去购物车</a></div>')
			//小购物车窗口删除
			oSelf.clicksmallDelete()
		}
	}, 'json')

}
/*详情页处点击加入购物车*/
Shopcar.prototype.clickAdd = function() {

	var oSelf = this
	//设置一个当小购物车消失位置时，动画的位置
	var topposition = 0
     
	$('.detail-box').find('.btn-car-box .addcar').on({

		click: function() {
              //点击后将商品信息发送后台，在购物车动态添加
			$.get('php/shopcar.php', {
				goodpic: $('.detail-box').find('.scale-list li img').get(0).src,
				goodname: $('.detail-box').find('.middle-title h1').get(0).innerText,
				goodprice: $('.detail-box').find('.middle-price strong').get(0).innerText,
				goodcount: '1',
				goodcheck: 'checked'

			}, function(responText) {
				console.log(responText)
				if(responText == 'addgood success') {
					//当添加购物车成功后，就刷新小购物车的信息
					oSelf.addsmallcar()

				}

			})

			/*加入购物车时的动画*/
			var flyer = $('<img src="' + $('.detail-box').find('.scale-list li img').get(0).src + '" style="width: 100px;height: 100px;"/>')
			//动画结束位置
			if($(window).scrollTop() > $('#logo-module').find('.car .shop-car').offset().top ) {
				topposition = 0
			} else {
				topposition = $('#logo-module').find('.car .shop-car').offset().top + $('#logo-module').find('.car .shop-car').height()
			}

			flyer.fly({

				start: {
					left: $('.detail-box').find('.btn-car-box .addcar').offset().left,
					top: $('.detail-box').find('.btn-car-box .addcar').offset().top - $(window).scrollTop()

				},
				end: {
					left: $('#logo-module').find('.car .shop-car').offset().left + $('#logo-module').find('.car .shop-car').width(),
					top: topposition,
					width: 0,
					height: 0
				}

			})

		}

	})

}

/*点击删除，删除该商品*/
Shopcar.prototype.clickDelete = function() {
	//购物车主界面
	var oSelf = this
	$('.content-box').find('.shop-car .shop-car-td .car-li7 .delete').click(function() {
		//传输删除该条数据指令

		$.get('php/shopcar.php', {
            //传输要删除的商品名称
			deletename: $(this).parent().parent().find('.li3-title a').get(0).innerText,

		}, function(responText) {
			console.log(responText)
			if(responText == 'delete success') {
               //返回删除成功，重新刷新购物车界面
				oSelf.addgoodpoint()
			}

		})
	})

}
//小购物车的删除事件
Shopcar.prototype.clicksmallDelete = function() {
	var oSelf = this
	$('#logo-module').find('.car .shopcar-list .shopcar-count .delete').click(function() {
		console.log($(this))
		//传输删除该条数据指令
		$.get('php/shopcar.php', {
             //传输要删除的商品名称
			deletename: $(this).parent().parent().find('.shopcar-goodname a').get(0).innerText

		}, function(responText) {
			console.log(responText)
			if(responText == 'delete success') {
                //删除成功后，重新获取小购物车的商品信息
				oSelf.addsmallcar()

			}

		})

	})

}

/*点击列表页加入购物车*/
Shopcar.prototype.clickgoodlist = function() {

	var oSelf = this
	$('.shop-content').find('.list-content-ul li .add_car').on({

		click: function() {
            //传输商品信息到后台
			$.get('php/shopcar.php', {
				goodpic: $(this).parent().find('.listgoodimg a img').get(0).src,
				goodprice: $(this).parent().find('.listgoodprice i').get(0).innerText,
				goodname: $(this).parent().find('.listoodtitle a').get(0).innerText,
				goodcount: 1,
				goodcheck: 'checked'
			}, function(responText) {
				console.log(responText)
                //添加成功
				if(responText == 'addgood success') {
                //当添加购物车成功后，就刷新小购物车的信息
					oSelf.addsmallcar()

				}

			})

			/*加入购物车时的动画*/

			var flyer = $('<img src="' + $(this).parent().find('.listgoodimg a img').get(0).src + '" style="width: 100px;height: 100px;"/>')

			flyer.fly({

				start: {
					left: $(this).siblings('.listgoodimg').offset().left,
					top: $(this).siblings('.listgoodimg').offset().top - $(window).scrollTop()

				},
				end: {
					left: $('#logo-module').find('.car .shop-car').offset().left + $('#logo-module').find('.car .shop-car').width(),
					top: 0,
					width: 0,
					height: 0
				}

			})

		}
	})
}
/*点击购物车数量加减*/
Shopcar.prototype.numchange = function() {

	$('.shop-car .shop-car-td').find('.num-btn').on({

		click: function() {
            //获取当前页面的数值
			var count = $(this).siblings('.count').html()

			if($(this).hasClass('addnum')) {
                //增加数量
				++count

			} else {
               //减少数量
				--count
			}
			if(count == 0) {
				
                count = 1
				alert('宝贝数量不能够再减少了')
				
			}
			$(this).siblings('.count').html(count)
			//更新数据库商品数量，以便于计算加价等
			$.get('php/shopcar.php', {
				goodname: $(this).parent().parent().siblings('.car-li3').find('.li3-title a').html(),
				goodcount: count

			}, function(responText) {

				//当添加购物车成功后，就刷新小购物车的信息
				//	oSelf.addsmallcar()

			})

		}

	})

}
/*检测input标签是否被选中*/
Shopcar.prototype.inputcheck = function() {

	var oSelf = this
	//标签点击事件
	$('.shop-car').find('.shop-car-td .checkzt').on({

		click: function() {

			if($(this).is(':checked')) {
				//更新数据表中的input状态属性
				$.get('php/shopcar.php', {
					goodcheck: 'checked',
					goodname: $(this).parent().parent().siblings('.car-li3').find('.li3-title a').html()

				}, function(responText) {

					console.log(responText)

				})

			} else {

				//更新数据表中的状态属性
				$.get('php/shopcar.php', {
					goodcheck: ' ',
					goodname: $(this).parent().parent().siblings('.car-li3').find('.li3-title a').html()

				}, function(responText) {

					console.log(responText)

				})

			}

		}
	})
	//全选标签点击事件
	$('.shop-car').find('.allcheck').click(function() {
          //判断点击标签是否是被选择状态
		if($(this).is(':checked')) {
			
			$('.shop-car').find('.checkbutton').css("background-position", '0 0')
			
			//更新数据表中的状态属性
			$.get('php/shopcar.php', {
				goodcheck: ' ',
				goodpoint: true

			}, function(responText) {

				console.log(responText)

			})
		} else {
			$('.shop-car').find('.checkbutton').css("background-position", '-15px 0')
			//更新数据表中的状态属性
			$.get('php/shopcar.php', {
				goodcheck: 'checked',
				//做一个标记表示是更新input属性的数据
				goodpoint: true

			}, function(responText) {

				console.log(responText)

			})
		}

	})

	
	
	
	

}