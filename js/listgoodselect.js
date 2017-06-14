//列表页的所有事件
function Listselect(){
	
	this.nameArr=[]
	
	this.clickshoplist()
	
	this.moveAction()

}
//给排序表添加点击事件
Listselect.prototype.clickshoplist=function(){
	
	var oSelf = this
	//价格处点击次数记录
	var count =0
	$('.shop-content').find('.list-tab ul li').on({
		
		click:function(){
			
			if($(this).index() == 0){
				
				oSelf.synthesize()
				
			}
			
			if($(this).index() == 2){
				if(++count % 2 == 0){
					
				  //升序排列
					$(this).find('i').removeClass()
					$(this).find('i').addClass('priceup')
					oSelf.priceSortup()
				}
				else{//降序排列
					$(this).find('i').removeClass()
					$(this).find('i').addClass('pricelow')
					oSelf.priceSortlow()
					
				}
			}
	
			
			 $('.shop-content').find('.list-tab ul li').removeClass()
			 $(this).addClass('tab-select')
			 
			
		}
	
	})
	//默认为综合排序
	$('.shop-content').find('.list-tab ul li').triggerHandler('click')
	
	
}


//价格排序(升序)
Listselect.prototype.priceSortup=function(){
	
	var oSelf = this
	 
	 $.getJSON('json/listgood.json',function(data){
	 	//遍历价格
	 	//冒泡排序，
	 	for(var i=0;i<data.length-1;i++){
	 		//比较价格高低
	 		for(var j=0;j<data.length-i-1;j++){
	 			
	 			  
	 			  if(data[j].price*1 > data[j+1].price*1 ){
	 			  	 //商品价格、图片、名称都进行交换
	 			  	 var tempprice = data[j+1].price 
	 			  	 
	 			  	 var temppic =data[j+1].imgsrc
	 			  	 
	 			  	 var temptitle =data[j+1].title
	 			  	 
	 			  	  data[j+1].price  = data[j].price 
	 			  	  
	 			  	  data[j+1].imgsrc  = data[j].imgsrc 
	 			  	  
	 			  	  data[j+1].title  = data[j].title 
	 			  	  
	 			  	  data[j].price  = tempprice
	 			  	  
	 			  	   data[j].imgsrc  = temppic
	 			  	   
	 			  	    data[j].title  = temptitle
	 			  }
	 		}
	 	} 	
	 	  //重新遍历一次位置信息赋值
	  	   oSelf.eachData(data) 	
	 })	
}
//价格排序(降序)
Listselect.prototype.priceSortlow=function(){
	
	var oSelf = this
	 
	 $.getJSON('json/listgood.json',function(data){
	 	//遍历价格
	 	//冒泡排序，
	 	for(var i=0;i<data.length-1;i++){
	 		//比较价格高低
	 		for(var j=0;j<data.length-i-1;j++){
	 			
	 			  	 //商品价格、图片、名称都进行交换
	 			  if(data[j].price*1 < data[j+1].price*1 ){
	 			  	 
	 			  	 var tempprice = data[j+1].price 
	 			  	 
	 			  	 var temppic =data[j+1].imgsrc
	 			  	 
	 			  	 var temptitle =data[j+1].title
	 			  	 
	 			  	  data[j+1].price  = data[j].price 
	 			  	  
	 			  	  data[j+1].imgsrc  = data[j].imgsrc 
	 			  	  
	 			  	  data[j+1].title  = data[j].title 
	 			  	  
	 			  	  data[j].price  = tempprice
	 			  	  
	 			  	   data[j].imgsrc  = temppic
	 			  	   
	 			  	    data[j].title  = temptitle
	 			  }
	 		}
	 	} 	
	 	
	 	     //重新遍历一次位置信息赋值
	  	    oSelf.eachData(data)
	 })	
}
//综合排序
Listselect.prototype.synthesize=function(){
	var oSelf = this
	  //遍历JSON文件
	  $.getJSON('json/listgood.json',function(data){
	  	    //重新遍历一次位置信息赋值
	  	    oSelf.eachData(data)
	  	   //筛选排序
	  	   oSelf.filtrate(data)
	  })
}
//遍历数据方法
Listselect.prototype.eachData=function(data){
	         
	        //遍历
	  	    for(var i=0;i<data.length;i++){
	  	     	//设置对应li下的商品信息
		  	    $('.shop-content').find('.list-content-ul li .listgoodimg img').eq(i).attr('src',data[i].imgsrc)
		  	    $('.shop-content').find('.list-content-ul li .listgoodprice i').eq(i).html(data[i].price)
		  	    $('.shop-content').find('.list-content-ul li .listoodtitle a').eq(i).html(data[i].title) 	
	  	     	
	  	    }         
}
//筛选排序
Listselect.prototype.filtrate=function(data){
	  
	  var oSelf = this
	
	$('.goods-content').find('.claaaifylist ul li a').on({
		
		click:function(){
			//新建一个空数组保存所有与筛选名称一致的商品对象
			oSelf.nameArr=[]
			
			for(var i=0;i<data.length;i++){
	  	          
	  	          if($(this).html() == data[i].name){
	  	          	    oSelf.nameArr.push(data[i])
	  	          }
	         }
	         
	         //遍历数组获取商品对象所有属性
	  	    for(var k=0;k<oSelf.nameArr.length;k++){
	  	     	 $('.shop-content').find('.list-content-ul li').eq(k).show().bind()
		  	    $('.shop-content').find('.list-content-ul li .listgoodimg img').eq(k).attr('src',oSelf.nameArr[k].imgsrc)
		  	    $('.shop-content').find('.list-content-ul li .listgoodprice i').eq(k).html(oSelf.nameArr[k].price)
		  	    $('.shop-content').find('.list-content-ul li .listoodtitle a').eq(k).html(oSelf.nameArr[k].title) 	
	  	     	
	  	    }         
			 //获取列表页所有的商品长度
			 var liSize = $('.shop-content').find('.list-content-ul li').size()
			 //将筛选后列表页没有的商品，所占的DIV位置进行隐藏
			 for(var j=oSelf.nameArr.length;j<liSize;j++){
			 	    $('.shop-content').find('.list-content-ul li').eq(j).hide().unbind()
			 }
		
			
		}
		
		
		
	})
	
	  
	
	
}
//商品列表LI移入移出事件
Listselect.prototype.moveAction=function(){
	
	var oSelf = this
	
	 $('.shop-content').find('.list-content-ul li').on({
	 	
	 	  mouseenter:function(){
	 	  	
	 	  	 $(this).css({
	 	  	 	'border':'1px solid #fa7117'
	 	  	 })
	 	  	
	 	  },
	 	  mouseleave:function(){
	 	  	
	 	  	$(this).css({
	 	  	 	'border':'none'
	 	  	 })
	 	  	
	 	  }
	 	
	 	
	 	
	 	
	 })
	
	
	
}
