/**此文件为公共配置，如果项目要用，可以复制到项目目录中并加入项目配置**/
var _normal = 'js/normal/';
var _alter = 'js/amd-alter/';
var _origi = 'js/amd-origi/';
var _app = 'app/user/js/';
requirejs.config({
    baseUrl: 'http://localhost:8888',
    paths: {
        /******************************requirejs插件**************************************/
        'css' : _normal + 'base-require/plugins/css.min',                          //require加载css的插件
        //'cs' : 'require/plugins/cs',
        'domReady' : _normal + 'base-require/plugins/domReady.min',                //require文档准备好后调用的插件
        'i18n' : _normal + 'base-require/plugins/i18n.min',                        //require国际化插件
        'text' : _normal + 'base-require/plugins/text.min',                        //require加载文本文件的插件


        /******************************基础组件********************************************/
        'class' : _origi + 'base-class/1.2.0/class.min',           //类组件，实现继承等操作
        //'attribute' : _origi + 'base-core/1.2.0/attribute.min',   //属性组件
        //'aspect' : _origi + 'base-core/1.2.0/aspect.min',         //切面组件
        //'events' : _origi + 'base-events/1.2.0/events.min',       //事件组件
        'base' : _origi + 'base-core/1.2.0/base.min',              //面向对象的基础组件，以三上组件合集，使用非min时依赖class、attribute、aspect、events
        'cookie' : _origi + 'base-cookie/1.1.0/cookie.min',        //cookie操作工具类
        'json3' : _origi + 'base-json3/3.3.2/json3.min',           //json与对象操作组件/
        'jquery' : _alter + 'base-jquery/1.11.1/jquery.min',       //jquery工具类


        /******************************工具组件********************************************/
        'jqajaxform' : _alter + 'tool-jqajaxform/3.51.0/jqajaxform.min',         //form表单异步提交组件
        'juicer' :  _origi + 'tool-juicer/0.6.5/juicer.min',                     //模板组件
        'keymaster' : _origi + 'tool-keymaster/1.6.2/keymaster.min',             //键盘事件监听组件
        'platform' : _origi + 'tool-platform/1.2.0/platform.min',                //获取浏览见面的当前平台信息
        'url' : _origi + 'tool-url/1.2.0/url.min',                               //url组件


        /******************************UI组件********************************************/
        'widget' : _origi + 'ui-widget/1.2.0/widget.min',                      //编写UI组件的基础类，使用非min时依赖auto-render,daparser
        'dialog5' : _alter + 'ui-artdialog/5.0.4/artDialog.min',                //对话框组件
        'dialog5-plugins' : _alter + 'ui-artdialog/5.0.4/artDialog.plugins.min',
        'dialog6' : _origi + 'artdialog/6.0.4/dialog6.min',
        'dialog6-plus' : _origi + 'artdialog/6.0.4/dialog6-plus.min',
        'jqpaginator' : _alter + 'ui-jqpaginator/1.2.0/jqPaginator.min',       //分页组件
        'jqvalidator' : _alter + 'ui-jqvalidator/0.7.3/jquery.validator',      //验证组件
        'jqsuperslide' : _alter+ 'ui-jqsuperslide/2.1.0/jqsuperslide',        //tab,menu,nav等组件
        'dnd' : _origi +'ui-dnd/1.1.0/dnd.min',                               //drop、drag事件处理
        'easing' : _origi + 'ui-easing/1.1.0/easing.min',                      //动画效果
        'jqlazy' : _origi + 'ui-jqlazy/1.0.2/jqlazy.min',                      //图片延迟加载组件
        'overlay' : _origi + 'ui-overlay/1.2.0/overlay.min',                   //浮动层基础组件,支持定位和select元素bug
        'position' : _origi + 'ui-position/1.1.0/position.min',                //元素定位组件
        'qrcode' : _origi + 'ui-qrcode/1.1.0/qrcode.min',                      //二维码生成组件
        'sticky' : _origi + 'ui-sticky/1.4.0/sticky.min',                      //固定元素组件，使其不随文档滚动而移动
        //'auto-render' : _origi + 'ui-widget/1.2.0/auto-render.min',          //自动渲染组件
        //'daparser' : _origi + 'ui-widget/1.2.0/daparser.min,
	'jqlayer' : _alter + 'ui-jqlayer/2.0/layer',				//弹出框
        'mask' : _origi + 'ui-overlay/1.2.0/mask.min',                        //浮动层基础组件,带遮照层
	'jqtreetable' : _alter + 'ui-jqmytreetable/1.4.2/treeTable',


	/************应用模块*********/
	'business' : 'app/common/business/1.0/business',				//所有增、删、改、查页面的基础组件
	'organ' : 'app/user/js/component/organ',
	'resource' : 'app/user/js/component/resource',
	'system' : 'app/user/js/component/system',
	'organ_business' : 'app/user/js/business/organ_business',
	'res_business' : 'app/user/js/business/res_business'
	


    },
    shim: {
        'dialog5-plugins': {
            deps: ['dialog5'],
            exports: 'art'
        },
        'jqsuperslide': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'jqpaginator': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'jqvalidator': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});
