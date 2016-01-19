/**
 * 增加组织机构页面脚本
 * 
 * @author zhouliang
 * @version	0.1
 * @create 2014-3-6
 */
define(function(require, exports, module){
	
	var Business = require('business');
	
	//子树的模板
	var tpl ='{@each result as item,index} <tr class="pointer" view="/organ/view.do?organCode=&{item.organCode}" id="&{item.organCode}" {@if item.hasChild==1}  haschild="true" {@/if} {@if item.parentOrganCode!="-1"} pid="&{item.parentOrganCode}" {@/if} >  \
		<td>&{index}</td> \
		<td>&{item.name }</td> \
		<td>&{item.tel}</td> \
		<td>&{item.postCode }</td> \
		<td>&{item.description }</td> \
		<td>{@if item.status==1} 有效 {@/if} {@if item.status==0}无效{@/if}</td> \
		<td>'
			+  $('#listoper').val() +
		'</td>\
	</tr>{@/each} ';
	var OrganBusiness = Business.extend({
		
		/**
		 * 构造函数
		 */
		initialize: function(param_options) {
			OrganBusiness.superclass.initialize.call(this, param_options);
		},
		
		/**
         * 初始化列表页面
         */
        init_list_page:function(){
        	OrganBusiness.superclass.init_list_page.call(this);
        	this.handleChildTree(this.options.opers);
        },
		
		/**
		 * 初始化增删页面
		 */
		init_saveorupdate_page:function(){
			var that = this;
			OrganBusiness.superclass.init_saveorupdate_page.call(this);
			
			$("#selectOrgan").unbind('click');
			$("#selectOrgan").on('click', function(event){
				//按需要才加载JS文件
				require(['organ'],function(OrganSelectModal){
					var organModal = new OrganSelectModal({"basePath" : that.options.base_path ,  "selectedOrgan":function(organCode,organName) {
						$('#parentOrganCode').val(organCode);
						$('#parentOrganName').val(organName);
						organModal.close();
					}});
					organModal.open();
				});
			});
			
			//清除组件
			$('#clearOrgan').on('click', function(event){
				$('#parentOrganCode').val("");
				$('#parentOrganName').val("");
			});
		},
		
		/**
		 * 处理列表中的子树
		 * opers:列表操作权限
		 */
		 handleChildTree:function(opers){
			
			var that = this;

			//2, 处理子树
			var ttoption = {
	            expandLevel : 1,
	            basepath : that.options.base_path + '/resources/js/jqmytreetable-amd/1.4.2/',
	            beforeExpand : function($treeTable, id) {
	                //判断id是否已经有了孩子节点，如果有了就不再加载，这样就可以起到缓存的作用
	                if ($('.' + id, $treeTable).length) { return; };
	                $.getJSON( that.options.base_path + "/organ/listChild.json", {parentOrganCode:id}, function( data ) { 
	                	var treeNodes = null;
	                	require(['juicer'],function(juicer){
	                		juicer.set({ 'tag::interpolateOpen': '&{', 'tag::noneencodeOpen': '&&{' });
	                		treeNodes = $(juicer(tpl, data.data));
	                		$treeTable.addChilds(treeNodes); 
	                		
	                		//4, 所有view行事件
	                		treeNodes.bind('click',function(event){
	            				var tagName = event.target.tagName;
	            				if( tagName == 'A' || tagName == 'a' || tagName == 'input' || tagName == 'INPUT' || tagName == 'span' || tagName == 'SPAN' ){
	            					return true;
	            				}
	            				window.location.href = that.options.base_path + $(event.currentTarget).attr('view');
	            				return true;
	            			});
	                		
	                		//5, 新的按钮操作事件
	                		$('.list_oper', treeNodes).click(function(e){
	            				that.operator($(this).attr('ename') ,$(this).attr('href'), e );
	            			});
	                	});
	                });
	            }
	         };
			
			require(['jqtreetable'],function(treetable){
				treetable(that.options.data_table).treeTable(ttoption);
			});
	         
		},
		edit : function(res, url){
			 return true;
		}
	});//extends end
	
	module.exports = OrganBusiness;

});