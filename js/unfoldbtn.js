//列表页，LOGO展示区的上下页切换
function Unfoldbtn(){
	
	
	this.clickAction()
	
	
}
//点击切换上下拉操作
Unfoldbtn.prototype.clickAction=function(){
	
	 var count = 1
	 $('.goods-content').find('.brand .unfold .unfoldbtn').click(function(){
	 	
	 	if(++count % 2 == 0){
	 	   $('.goods-content').find('.brand .brandlist').css({
	 	   	     'height':234,
	 	   	     'overflow-x':'hidden',
	 	   	     "overflow-y":'auto'
	 	   })
	 	   $(this).html('收起').append("<i class='shangla'></i>")
        }else{
        	$('.goods-content').find('.brand .brandlist').css({
	 	   	     'height':116,
	 	   	     'overflow-x':'',
	 	   	     "overflow-y":''
	 	   })
        	$(this).html('更多').append("<i class='xiala'></i>")
        	
        	
        }
	 })
	
	
	
}


