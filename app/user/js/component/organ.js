/**
 * 组织机构选择组件, 支持树结构
 * 
 * 需要引入 jquery.js,jquery.treeTable.js,juicer.js
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
		id : '_select_organ_',											//选择对话框组件的id
		title : '选择父组织机构',									//标题
		width : '80%',														//对话框宽度
		basePath : 'http://localhost:8087/user',				//动作基础路径
		listAction: '/organ/list.json',										//列表动作
		childAction : '/organ/listChild.json',						//子列表动作
		selectedOrgan : function(organCode,name){}					//选择组织机构
	};
	
	//组织机构模板
	var tpl = '	  	<div style="width:98%;margin:0 auto;" >\
									<form class="pure-form search" role="form" method="post" style="margin-top:20px;"> \
										<label for="organCode" class="col-sm-1 control-label">机构编号:</label> \
										<input type="text" class="form-control  pure-u-1-5" placeholder="机构编号" name="organCode" value="&{organCode}"   > \
										<label for="name" class="col-sm-1 control-label">机构名称:</label> \
										<input type="text" class="form-control pure-u-1-5" placeholder="机构名称" name="name" value="&{name}" > \
										<button type="button" class="button-xsmall pure-button pure-button-primary queryBTN">查询</button> \
									</form> \
									<table class="pure-table search-res" id="treeTable1" style="margin-top:20px" width="100%"> \
										<thead> \
											<tr> \
												<th>序号</th> \
												<th>机构名称</th> \
												<th>电话</th> \
												<th>邮编</th> \
												<th>描述</th> \
											</tr> \
										</thead> \
										<tbody> \
											{@each data.result as item,index} \
											<tr id="&{item.organCode}" style="cursor:pointer" organName="&{item.name}" class="organCode" {@if item.hasChild==1}  haschild="true" {@/if} {@if item.parentOrganCode!=-1} pid="&{item.parentOrganCode}" {@/if}  > \
												<td >&{index}(&{item.organCode})</td> \
												<td>&{item.name}</td> \
												<td>&{item.tel}</td> \
												<td>&{item.postCode }</td> \
												<td>&{item.description }</td> \
											</tr> \
											{@/each}\
										</tbody> \
									</table>\
									<ul id="pagination" class="pagination">\
									</ul>\
							</div>';
	
	//组织机构子树模板
	var treetpl = '{@each result as item,index} <tr id="&{item.organCode}" style="cursor:pointer" organName="&{item.name}" {@if item.hasChild==1}  haschild="true" {@/if} {@if item.parentOrganCode!=-1} pid="&{item.parentOrganCode}" {@/if} >  \
		<td>&{index}</td> \
		<td>&{item.name }</td> \
		<td>&{item.tel}</td> \
		<td>&{item.postCode }</td> \
		<td>&{item.description }</td> \
	</tr>{@/each} ';	
	
	
	/**
	 * 构造函数
	 * var options = {
		title : '选择父组织机构',												//标题
		width : '80%',																	//对话框宽度
		basePath : 'http://localhost:8087/user',				//动作基础路径
		listAction: '/organ/list.json',										//列表动作
		childAction : '/organ/listChild.json',						//子列表动作
		selectedOrgan : function(organCode){}				//选择组织机构
	};
	 */
	function OrganSelectModal(paramOptions){
		this.options = $.extend({}, default_options , paramOptions);
		var $modalEle = $('#' + this.options.id);
		if($modalEle.length == 0){
			$('body').append('<div class="modal fade" id="' + this.options.id + '"></div>');
		}
	}
	
	  
	/**
	 * 查询
	 */
	OrganSelectModal.prototype.query = function(currentPage){
		var options = this.options;
		var that = this;
		var $modalEle = $('#' + options.id);
		
		//查询参数
		var param = {
			organCode : $('input[name="organCode"]', $modalEle).val() ,
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
	OrganSelectModal.prototype.open = function(){
		var options = this.options;
		var that = this;
		var $modalEle = $('#' + options.id);
		
		$.getJSON( options.basePath + options.listAction,{status : 1}, function( data ) { 
			if( "success" ==  data.flag){
				that.render(data);
				dialog.open({
				    type: 1, //page层
				    area: ['950px', '580px'],
				    title: '选择组织机构',
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
	OrganSelectModal.prototype.render=function(data){
		
		var options = this.options;
		var that = this;
		var $modalEle = $('#' + options.id);
		var result = $.extend({}, data, options);				//页面内容数据
		
		//渲染内容
		var tplRender = juicer(tpl, result);
		$('#' + options.id).html(tplRender);
		
		//事件绑定
		//双击行选择组织机构
		$('#treeTable1', $modalEle).unbind('dblclick');
		$('#treeTable1' , $modalEle).dblclick(function(eventObj){
			options.selectedOrgan($(eventObj.target).parent().attr('id') , $(eventObj.target).parent().attr('organName'));
		});
		//查询组织机构
		$(".queryBTN", $modalEle).unbind('click');
		$('.queryBTN' , $modalEle).click(function(eventObj){
			that.query(0);
		});
		
		//分页组件
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
                    $.getJSON( options.basePath + options.childAction, {parentOrganCode:id,status : 1}, function( data ) { 
	                    $treeTable.addChilds(juicer(treetpl, data.data));
                    });
                }
         };
         $('#treeTable1', $modalEle).treeTable(ttoption);
	};
	
	/**
	 * 关闭对话框
	 */
	OrganSelectModal.prototype.close = function(){
		dialog.closeAll();
	};

	module.exports = OrganSelectModal;
})($);

});
