//首页Banner图有部分直播模块
function LiveStreaming(selector){
	
	this.ele = $(selector).get(0);
	
	this.changeChannel()
	
}
LiveStreaming.prototype.changeChannel=function(){
	
	var oSelf = this
	
	$(oSelf.ele).find('.banner-content .zb-nav li').on({
		
		mouseenter:function(){
			
			$(oSelf.ele).find('.banner-content .zb-nav li a').removeClass()
			$(this).find('a').addClass('zb-select')
			$(oSelf.ele).find('.banner-content .zb-top-box .zb-box').removeClass('zb-box-show').animate({"opacity":0},200)
			$(oSelf.ele).find('.banner-content .zb-top-box .zb-box').eq( $(this).index() ).addClass('zb-box-show').animate({"opacity":1},200)
			
		}
		
		
		
	})
	
	
	
}
