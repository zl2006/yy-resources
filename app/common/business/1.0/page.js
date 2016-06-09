//获取当前script标签中的属性值, <script src="http://localhost/a.js" data="n1=v1;n2=v2"/>
var getScriptArgs=function(argName){//获取多个参数
    var scripts=document.getElementsByTagName("script"),
    script=scripts[scripts.length-1]; //因为当前dom加载时后面的script标签还未加载，所以最后一个就是当前的script
    return script.getAttribute(argName);
};

//删除空格
String.prototype.trim   =   function(){   
	  return   this.replace(/(^\s*)|(\s*$)/g,"");   
}

var __script_page =  getScriptArgs('page');
var __script_data = getScriptArgs('data');

	
/**
 * 通用页面处理
 */
requirejs(['jquery'], function($){
	
	//Step1: 初始化菜单
	//slide("#nav").slide({titCell:"h3", targetCell:"ul",defaultIndex:1,effect:"slideDown",delayTime:300,trigger:"click",defaultPlay:false,returnDefault:false});
    	//slide("#site-menu").slide({ type: "menu", titCell: ".menu-item", targetCell: ".menu-item-sub", delayTime: 400, triggerTime: 0, returnDefault: false  });
    
	//Step2:根据模块执行不同的业务
	//var page = getScriptArgs('page');
	var page = __script_page;
	if(page == null || page.trim() == ''){
		return;
	}
	
	page = $.parseJSON(page);
	if(page.module == null || page.module.trim() == '' || page.oper == null || page.oper.trim() == ''){
		return;
	}
	
	//Step2.1 view操作直接返回
	if(page.oper == 'view'){
		return;
	}
	
	var options = {};
	try{
		//options =  $.parseJSON( getScriptArgs('data') );
		options = $.parseJSON( __script_data );
	}catch(e){
		//log.error(e)
	}
	if(page.oper == 'list'){		//Step2.2 列表操作
		requirejs( [ page.module ], function (Business) {
			var business = new Business(options);
			business.init_list_page();
		});
	}else if(page.oper=='addoredit'){	//Step2.3 新增或编辑
		requirejs( [ page.module ,'jqvalidator'], function (Business,jqvalidator) {
			var business = new Business(options);
			business.init_saveorupdate_page();
		});
	}
});
