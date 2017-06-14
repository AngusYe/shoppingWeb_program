
function ChangeTab(selector){
	  
	
	this.ele = $(selector).get(0)
		
		
	this.enterTab()	
}
ChangeTab.prototype.enterTab=function(){
	
	   var oSelf = this
	   //遍历classname"mc"
	   $(oSelf.ele).find('.mc').on({
	   	   
	   	   mouseenter:function(){
		   	   	 
		   	   	 var count =$(this).index()
		   	   	 
		   	   	 $(this).find('.mc-one-head .mc-one-nav li').on({
		   	         
		   	     mouseenter:function(){
		   	     	//遍历标签
		   	     	$(oSelf.ele).find('.mc').eq( count ).find('.mc-one-head .mc-one-nav li a').removeClass()
		   	     	$(this).find('a').addClass('select-li')
		   	     	$(oSelf.ele).find('.mc').eq( count ).find('.mc-one-content .mc-one-content-right .content-right-tab').removeClass('contentshow')
		   	     	$(oSelf.ele).find('.mc').eq( count ).find('.mc-one-content .mc-one-content-right .content-right-tab').eq($(this).index()).addClass('contentshow')
		   	     	
		   	     }
		   	   	
		      })
		   	   	   
	   	   	  
	   	   }
	   	
	   	   
	   })
	   	
	   	   
	   	  
	   	  
	   	   
	   	   
	   	
	  
	   
	   
	
	
	
}





