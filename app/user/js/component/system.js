/**
 * 系统选择组件
 * 
 * 需要引入 jquery.js, bootstrap.js,bootstrap-paginator.js,juicer.js
 * 
 * @author zhouliang
 * @version	0.1
 * @create 2014-3-6
 */
define(function(require, exports, module){
var $ = require('jquery');
var juicer = require('juicer');
var dialog = require('jqlayer');
require('css!js/amd-alter/ui-jqlayer/2.0/skin/layer');


(function($){
	
	//
	juicer.set({
	    'tag::interpolateOpen': '&{',
	    'tag::noneencodeOpen': '&&{'
	});
	
	//默认参数
	var default_options = {
		id : '_select_system_',									//选择对话框组件的id
		title : '选择系统',											//标题
		width : '80%',												//对话框宽度
		basePath : 'http://localhost:8087/user',				//动作基础路径
		listAction: '/system/list.json',									//列表动作
		selectedSystem : function(systemCode,name){}				//选择系统
	};
	
	//组织机构模板
	var tpl = '	<div style="width:98%;margin:0 auto;" >\
							<form class="pure-form search" role="form" method="post" style="margin-top:20px;"> \
									<label for="systemCode">系统编号:</label> \
									<input type="text" class="pure-u-1-5" placeholder="系统编号" name="systemCode" value="&{systemCode}" > \
									<label for="name">名称:</label> \
									<input type="text" class="pure-u-1-5" placeholder="名称" name="name" value="&{name}"> \
									<button type="button" class="button-xsmall pure-button pure-button-primary queryBTN">查询</button> \
							</form> \
							<table class="pure-table search-res" style="margin-top:20px" width="100%" id="datatable"> \
								<thead> \
									<tr> \
										<th>序号</th> \
										<th>应用名称</th> \
										<th>应用编号</th> \
										<th>应用URL</th> \
										<th>描述</th> \
									</tr> \
								</thead> \
								<tbody> \
									{@each data.result as item,index} \
									<tr id="&{item.systemCode}" name="&{item.name}" > \
										<td >&{index}</td> \
										<td>&{item.name}</td> \
										<td>&{item.systemCode}</td> \
										<td>&{item.url }</td> \
										<td>&{item.description }</td> \
									</tr> \
									{@/each}\
								</tbody> \
							</table>\
							<ul id="pagination"  class="pagination">\
							</ul> \
					</div>';
	
	
	/**
	 * 构造函数
	 * var options = {
		title : '选择系统',										//标题
		width : '80%',											//对话框宽度
		basePath : 'http://localhost:8087/user',				//动作基础路径
		listAction: '/system/list.json',						//列表动作
		selectedSystem : function(systemCode, name){}			//选择组织机构
	};
	 */
	function SystemSelectModal(paramOptions){
		this.options = $.extend({}, default_options , paramOptions);
		var $modalEle = $('#' + this.options.id);
		if($modalEle.length == 0){
			$('body').append('<div class="modal fade" id="' + this.options.id + '"></div>');
		}
	}
	
	  
	/**
	 * 查询
	 */
	SystemSelectModal.prototype.query = function(currentPage){
		var options = this.options;
		var that = this;
		var $modalEle = $('#' + options.id);
		
		//查询参数
		var param = {
			systemCode : $('input[name="systemCode"]', $modalEle).val() ,
			name : $('input[name="name"]', $modalEle).val() ,
			"pagination.index" : currentPage,
			status : 1
		};
		
		$.post( options.basePath + options.listAction, param, function( data ) { 
			if( "success" ==  data.flag){
				that.render($.extend({}, data, param) );
			}
        },"json");   
	};   
	
	
	
	/**
	 * 打开对话框
	 */
	SystemSelectModal.prototype.open = function(){
		var options = this.options;
		var that = this;
		var $modalEle = $('#' + options.id);
		
		$.getJSON( options.basePath + options.listAction,{status : 1}, function( data ) { 
			if( "success" ==  data.flag){
				that.render(data);
				//$modalEle.modal();
				dialog.open({
				    type: 1, //page层
				    area: ['900px', '580px'],
				    title: '选择系统',
				    shade: 0.6, //遮罩透明度
				    moveType: 1, //拖拽风格，0是默认，1是传统拖动
				    shift: -1, //0-6的动画形式，-1不开启
				    content: $modalEle//'<div style="padding:50px;">这是一个非常普通的页面层（type:1），传入了自定义的html</div>'
				});    
			}
        });
	};
	
	
	
	/**
	 * 渲染内容
	 * @param data 具体内容数据
	 */
	SystemSelectModal.prototype.render=function(data){
		
		var options = this.options;
		var that = this;
		var $modalEle = $('#' + options.id);
		var result = $.extend({}, data, options);				//页面内容数据
		
		//渲染内容
		var tplRender = juicer(tpl, result);
		$('#' + options.id).html(tplRender);
		
		//事件绑定
		//双击行选择组织机构
		$('#datatable', $modalEle).unbind('dblclick');
		$('#datatable' , $modalEle).dblclick(function(eventObj){
			options.selectedSystem($(eventObj.target).parent().attr('id') , $(eventObj.target).parent().attr('name'));
		});
		//查询组织机构
		$(".queryBTN", $modalEle).unbind('click');
		$('.queryBTN' , $modalEle).click(function(eventObj){
			that.query(0);
		});
		
		//渲染分页信息
		if( data.data.pagination.totalPage > 0 ){
			require(['jqpaginator'],function(pg){
				pg("#pagination",$modalEle).jqPaginator({
		            totalPages: data.data.pagination.totalPage,
		            visiblePages: 8,
		            currentPage:   data.data.pagination.index+1 ,
		            first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
		            prev: '<li class="prev"><a href="javascript:void(0);"><i class="arrow arrow2"><\/i>上一页<\/a><\/li>',
		            next: '<li class="next"><a href="javascript:void(0);">下一页<i class="arrow arrow3"><\/i><\/a><\/li>',
		            last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
		            page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
		            onPageChange: function (page,t) {
		            	if('change' == t){	//因首次也会触发此事件,所以需要加上类型判断
		            		that.query(page-1);
		            	}
		            }
		        });
			});
		}
		
	};
	
	
	
	/**
	 * 关闭对话框
	 */
	SystemSelectModal.prototype.close = function(){
		dialog.closeAll();
	};
	

	module.exports = SystemSelectModal;
})($);

});
