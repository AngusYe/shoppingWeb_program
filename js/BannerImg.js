//Banner图的事件
function BannerChange(){
	
	this.ele = $('#banner-box').get(0)
	
	this.count = 0
	
	this.bgColor = ["rgb(255, 255, 255)","rgb(254, 194, 209)","rgb(0, 0, 0)","rgb(224, 235, 215)","rgb(255, 255, 255)"]
	
	
	this.Main()
	
	this.opacityChange()
	
	this.slideEnter()
	
	this.setTime()
	
	this.pointClick()
	
	
	
}


//Banner图部分，透明度切换
BannerChange.prototype.opacityChange=function(){
	
	var oSelf = this
	
	
	
	
$(oSelf.ele).find('.banner-subox .btn').each(function(){
	  
	   //添加点击事件
	   $(this).on({
	   	  
	   	  click:function(){
	   	  	  //判断左边还是右边按钮
	          $(this).hasClass('btn-left') ? --oSelf.count : ++oSelf.count;
	   	  	 
	   	  	      oSelf.Main()
	   	  	      $(oSelf.ele).find('.banner-subox .banner-point li').removeClass();
		          $(oSelf.ele).find('.banner-subox .banner-point li').eq(oSelf.count).addClass('select')
	   	          
	   	          $(oSelf.ele).find('.banner-subox .banner-list').css('background',oSelf.bgColor[oSelf.count])
	   	  }
	   	
	   })	
})	
}
//轮播主函数
BannerChange.prototype.Main=function(){
	  var oSelf = this
	  var $imgArr =$(oSelf.ele).find('.banner-subox .banner-list .banner img')
	   	  	  //切换位置
	   	  	  if(oSelf.count == -1){
	   	  	  	
	   	  	  	oSelf.count = 4
	   	  	  	
	   	  	  }
	   	  	  if(oSelf.count == 5){
	   	  	  	oSelf.count = 0
	   	  	  }
	   	  	 
	   	  	 
	   	  	 $imgArr.stop().eq(oSelf.count).animate({opacity:1})
	   	  	 $imgArr.not( $imgArr.eq(oSelf.count) ).stop().animate({opacity:0})
	

}
//鼠标移入移出事件
BannerChange.prototype.slideEnter=function(){
	var oSelf = this
	//Banner鼠标移入时效果
$(oSelf.ele).find('.banner-subox').on({
	
	mouseenter:function(){
		
		$(oSelf.ele).find('.banner-subox .btn').css('opacity',0.4)
		clearInterval(oSelf.timerID)
	},
	mouseleave:function(){
		
		$(oSelf.ele).find('.banner-subox .btn').css('opacity',0.2)
		oSelf.setTime()
	}	
	
})

}

//banner图添加定时计，自动轮播
BannerChange.prototype.setTime=function(){
	
	var oSelf =this
	
	oSelf.timerID =setInterval(function(){
		
		  ++oSelf.count
		
		  oSelf.Main()
		   $(oSelf.ele).find('.banner-subox .banner-list').css('background',oSelf.bgColor[oSelf.count])
		  $(oSelf.ele).find('.banner-subox .banner-point li').removeClass();
		 $(oSelf.ele).find('.banner-subox .banner-point li').eq(oSelf.count).addClass('select')
		
	},1500)
	
	
}

//小圆点点击事件
BannerChange.prototype.pointClick=function(){
	
	var oSelf = this
	
$(oSelf.ele).find('.banner-subox .banner-point li').each(function(){
	
	
	$(this).on({
		
		click:function(){
			
			  //保存count值为当成点击的图片键值
			  oSelf.count = $(this).index() 
			 
			 $(oSelf.ele).find('.banner-subox .banner-point li').removeClass();
			 $(this).addClass('select')
			 
			 
			 $(oSelf.ele).find('.banner-subox .banner-list .banner img').stop().eq(oSelf.count).animate({opacity:1},1000)
	   	  	 $(oSelf.ele).find('.banner-subox .banner-list .banner img').not($('#banner-box').find('.banner-subox .banner-list .banner img').eq(oSelf.count)).stop().animate({opacity:0},500)
			 $(oSelf.ele).find('.banner-subox .banner-list').css('background',oSelf.bgColor[oSelf.count])
			 
		}
		
	})
})

}