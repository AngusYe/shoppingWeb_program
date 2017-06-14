//详情页
function Particulars(selector){
	
	this.ele = $(selector).get(0)
	
	
	this.ptselect()
	
	this.evaluateSelect()
	
}
//详情页的商品评价、售后保障界面点击切换
Particulars.prototype.ptselect=function(){
	
	 var oSelf = this
	 
	 $(oSelf.ele).find('.pt-list li').on({
	 	
	 	click:function(){
	 		
	 		  
	 		  $(this).siblings().removeClass()
	 		  $(this).addClass('select-pt')
	 		
	 		  if($(this).index() == 1){
	 		  	
	 		  	  $(window).scrollTop($(oSelf.ele).find('.evaluate-box').offset().top)
	 		  	
	 		  }
	 		  if($(this).index() == 2){
	 		  	
	 		  	 $(window).scrollTop($(oSelf.ele).find('.aftersale').offset().top)
	 		  	
	 		  }
	 		
		
	 	}	
	 	
	 })
	
	  $(oSelf.ele).find('.pt-list li').eq(0).triggerHandler('click')
	
}
/*商品评价处点击事件*/
Particulars.prototype.evaluateSelect=function(){
	
	var oSelf = this
	
	$(oSelf.ele).find('.evaluate-list li').on({
		
		click:function(){
			
			
			   $(this).siblings().removeClass()
			   $(this).addClass('evaluate-select')
			   //好、中、差评界面切换
			   if($(this).index() == 0 || $(this).index() ==1){
			   	    
			   	    $(oSelf.ele).find('.bottom-list').show()
			   	    $(oSelf.ele).find('.no-result').hide().animate({
			   	    	'opacity':0
			   	    },300)
			   	
			   }
			   
			   
			   if($(this).index() == 2 ){
			   	
			   	    $(oSelf.ele).find('.bottom-list').hide()
			   	    $(oSelf.ele).find('.no-result').show().animate({
			   	    	'opacity':1
			   	    },300)
			   	
			   }
			
			
		}
		
		
		
	})
	
	
	
	
}


