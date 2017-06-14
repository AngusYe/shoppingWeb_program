//侧边栏按钮
function Menubar(selector){
	
	this.ele = $(selector).get(0)
	
	this.menubarShow()
	
	this.back()
}
//鼠标移入移出时的切换效果
Menubar.prototype.menubarShow=function(){
	
	var oSelf = this
	
	$(oSelf.ele).find('.menu-bar-list li').on({
		
		mouseenter:function(){
			  $(this).css("background","#fa7117")
			  $(this).find('span').css("background","#fa7117").stop().animate({
			  	"left":-85
			  },300)	
		},
		mouseleave:function(){
			 $(this).css("background","gray")
			 $(this).find('span').css("background","gray").stop().animate({
			  	"left":50
			  },300)
			
		}	
		
	})	
}
//回到顶部按钮
Menubar.prototype.back=function(){
	
	var oSelf = this
	
	$(oSelf.ele).find('.backtotop .btn').on({
		
	  click:function(){
		
		 //动画缓冲回到顶部效果
		   $('body').animate({
		   	  'scrollTop':0
		   },1000)

	   },
	   mouseenter:function(){
	   	
	   	   $(this).parent().css('background',"#fa7117")
	   	
	   },
	   mouseleave:function(){
	   	
	   	   $(this).parent().css('background',"gray")
	   }
		
		
		
	})
	
	
	
	
	
}
