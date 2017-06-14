//详情页的主要事件
function MagnifyandChange(selector){
	
	  this.ele = $(selector).get(0)
	  
	  this.changebgpic()
	  
	  this.magnify()
	  
	  this.selectColor()
	
}
//切换图片，大图下的三个小图
MagnifyandChange.prototype.changebgpic=function(){
	
	  var oSelf = this
	  
	  $(oSelf.ele).find('.scale-list li img').on({
	  	
	  	 mouseenter:function(){
	  	 	      
	  	 	   
	  	 	   $(oSelf.ele).find('.slt').css({
	  	 	   	   
	  	 	   	   'background':"url("+ this.src +") no-repeat",
	  	 	   	   'background-size':'cover'
	  	 	   	   	
	  	 	   })
	  	 	   
	  	 	   $(oSelf.ele).find('.magnify-box').css({
	  	 	   	   
	  	 	   	   'background':"url("+ this.src +") no-repeat #fff",
	  	 	   	  
	  	 	   	   	
	  	 	   })
	  	 
	  	 }
	  	
	  })	
	  //默认触发第一张图片为大图
	  $(oSelf.ele).find('.scale-list li img').triggerHandler('mouseenter')
}
//放大镜效果
MagnifyandChange.prototype.magnify=function(){
	
	      var oSelf = this
	
	    $(oSelf.ele).find('.slt .hide').on({
	    	
	    	mouseenter:function(){	
	    		
	    		$(oSelf.ele).find('.slt .pick').show()
	    		$(oSelf.ele).find('.magnify-box').show()
	    	},
	    	mouseleave:function(){
	    		$(oSelf.ele).find('.slt .pick').hide()
	    		$(oSelf.ele).find('.magnify-box').hide()
	    	},
	    	mousemove:function(oEvent){
	    		
	    		 var left = oEvent.offsetX - $(oSelf.ele).find('.slt .pick').width()/2
	    		 var top =oEvent.offsetY - $(oSelf.ele).find('.slt .pick').height()/2
	             
	             //设置边界条件
	             if(left < 0){
	             	
	                  left =0
	             }else if(left > $(this).width()-$(oSelf.ele).find('.slt .pick').width()){
	             	
	             	 left = $(this).width()-$(oSelf.ele).find('.slt .pick').width()
	             	
	             }
	             
	             if(top < 0){
	             	top = 0
	             }else if(top > $(this).height()-$(oSelf.ele).find('.slt .pick').height()){
	             	
	             	
	             	top = $(this).height()-$(oSelf.ele).find('.slt .pick').height()
	             	
	             	
	             }
	             
	             
	             $(oSelf.ele).find('.slt .pick').css({
	             	  'left': left,
	             	  "top":top
	             })
	             
	             $(oSelf.ele).find('.magnify-box').css({
	             	  backgroundPositionX:-2.68*left,
	             	  backgroundPositionY:-2.68*top
	             })

	    	}
    	
	    })
	
}
//商品颜色选择
MagnifyandChange.prototype.selectColor=function(){
	
	var oSelf = this
	
	$(oSelf.ele).find('.middle-detaile .select-color input').on({
		
		click:function(){
			
			$(this).siblings().removeClass()
			$(this).addClass('check')
			
			 $(oSelf.ele).find('.slt').css({
	  	 	   	   
	  	 	   	   'background':"url(img/goods/detailgood"+ ($(this).index()+1) +".jpg) no-repeat",
	  	 	   	   'background-size':'cover'
	  	 	   	   	
	  	 	   })
			
		}
		
		
		
	})
	
	
	
}
