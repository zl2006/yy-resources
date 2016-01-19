/**
 * 组织机构选择组件, 支持树结构
 * 
 * 需要引入 jquery.js, bootstrap.js,bootstrap-paginator.js,jquery.treeTable.js,juicer.js
 * 
 * @author zhouliang
 * @version	0.1
 * @create 2014-3-6
 */
define(function(require, exports, module){
	var $ = require('jqtreetable');
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
		id : '_select_res_',									//选择对话框组件的id
		title : '选择父资源',										//标题
		width : '80%',											//对话框宽度
		basePath : 'http://localhost:8087/user',				//动作基础路径
		listAction: '/res/list.json',						//列表动作
		childAction : '/res/listChild.json',				//子列表动作
		systemCode : '',										//指定系统下的所有资源
		selectedResource : function(resID,name,systemCode){}				//选择资源
	};
	
	//父资源模板
	var tpl = '	<div style="width:98%;margin:0 auto;" >\
							<form class="pure-form search" role="form" method="post" style="margin-top:20px;"> \
								<label for="systemCode" >系统编号:</label> \
								<input type="text" class="form-control  pure-u-1-5" name="qSystemCode" value="&{systemCode}"   > \
								<label for="name" class="col-sm-1 control-label">资源名称:</label> \
								<input type="text" class="form-control pure-u-1-5"   name="name" value="&{name}" > \
								<button type="button" class="button-xsmall pure-button pure-button-primary queryBTN">查询</button> \
							</form> \
							<table class="pure-table search-res" id="treeTable1" style="margin-top:20px" width="100%"> \
								<thead> \
									<tr> \
										<th>序号</th> \
										<th>资源名称</th> \
										<th>资源位置</th> \
										<th>资源类型</th> \
										<th>应用系统</th> \
									</tr> \
								</thead> \
								<tbody> \
									{@each data.result as item,index} \
									<tr id="&{item.resID}" name="&{item.name}" systemCode="&{item.systemCode}" {@if item.hasChild==1}  haschild="true" {@/if} {@if item.parentResID!=-1} pid="&{item.parentResID}" {@/if}  > \
										<td >&{index}</td> \
										<td>&{item.name}</td> \
										<td>&{item.url}</td> \
										<td>&{item.type }</td> \
										<td>&{item.systemCode }</td> \
									</tr> \
									{@/each}\
								</tbody> \
							</table>\
							<ul id="pagination" class="pagination">\
							</ul> \
					</div>';
	
	//资源子树模板
	var treetpl = '{@each result as item,index} <tr id="&{item.resID}" name="&{item.name}" systemCode="&{item.systemCode}" {@if item.hasChild==1}  haschild="true" {@/if} {@if item.parentResID!=-1} pid="&{item.parentResID}" {@/if} >  \
		<td>&{index}</td> \
		<td>&{item.name }</td> \
		<td>&{item.url}</td> \
		<td>&{item.type }</td> \
		<td>&{item.systemCode }</td> \
	</tr>{@/each} ';	
	
	
	/**
	 * 构造函数
	 * var options = {
		title : '选择父资源',										//标题
		width : '80%',											//对话框宽度
		basePath : 'http://localhost:8087/user',				//动作基础路径
		listAction: '/resource/list.json',							//列表动作
		childAction : '/resource/listChild.json',					//子列表动作
		selectedResource : function(resID, name){}					//选择组织机构
	};
	 */
	function ResSelectModal(paramOptions){
		this.options = $.extend({}, default_options , paramOptions);
		var $modalEle = $('#' + this.options.id);
		if($modalEle.length == 0){
			$('body').append('<div class="modal fade" id="' + this.options.id + '"></div>');
		}
	}
	
	  
	/**
	 * 查询
	 */
	ResSelectModal.prototype.query = function(currentPage){
		var options = this.options;
		var that = this;
		var $modalEle = $('#' + options.id);
		
		//查询参数
		var param = {
			systemCode : $('input[name="qSystemCode"]', $modalEle).val() ,
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
	ResSelectModal.prototype.open = function(){
		var options = this.options;
		var that = this;
		var $modalEle = $('#' + options.id);
		
		$.getJSON( options.basePath + options.listAction,{status : 1,systemCode : that.options.systemCode}, function( data ) { 
			if( "success" ==  data.flag){
				that.render(data);
				//$modalEle.modal();
				dialog.open({
				    type: 1, //page层
				    area: ['900px', '580px'],
				    title: '选择父资源',
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
	ResSelectModal.prototype.render=function(data){
		
		var options = this.options;
		var that = this;
		var $modalEle = $('#' + options.id);
		var result = $.extend({}, options, data);				//页面内容数据
		
		//渲染内容
		var tplRender = juicer(tpl, result);
		$('#' + options.id).html(tplRender);
		
		//事件绑定
		//双击行选择组织机构
		$('#treeTable1', $modalEle).unbind('dblclick');
		$('#treeTable1' , $modalEle).dblclick(function(eventObj){
			options.selectedResource($(eventObj.target).parent().attr('id') , $(eventObj.target).parent().attr('name'), $(eventObj.target).parent().attr('systemCode'));
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
		
		
		//子树显示
		var ttoption = {
                //theme:'vsStyle',
                expandLevel : 1,
                basepath : options.basePath + '/resources/js/jqmytreetable-amd/1.4.2/',
                beforeExpand : function($treeTable, id) {
                    //判断id是否已经有了孩子节点，如果有了就不再加载，这样就可以起到缓存的作用
                    if ($('.' + id, $treeTable).length) { return; }
                    $.getJSON( options.basePath + options.childAction, {parentResID:id,status : 1}, function( data ) { 
	                    $treeTable.addChilds(juicer(treetpl, data.data));
                    });
                }
         };
         $('#treeTable1', $modalEle).treeTable(ttoption);
	};
	
	
	
	/**
	 * 关闭对话框
	 */
	ResSelectModal.prototype.close = function(){
		dialog.closeAll();
	};
	

	module.exports = ResSelectModal;
})($);

});
