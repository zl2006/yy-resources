/**
 * Created by zhouliang on 15-5-26.
 * 依赖于pure.css, 请自行在html页面引入
 */
define(function(require, exports, module) {

    var Overylay = require('overlay');
    var mask = require('mask');
    var $ = require('jquery');
    var template = require('text!register/1.0.0/register.tpl');
    var Position = require('position');


    /*注册组件*/
    var Register = Overylay.extend({

        events : {
            "click #login-close-btn" : "hide",
            "click #register-btn" : "register"
        },

        // 属性列表
        attrs: {
            template : template,
            width : 550,
            height : 480,
            zIndex :100,
            style : 'background-color: white;',
            align : {
                baseElement: Position.VIEWPORT,
                selfXY: ['center', 'center'],
                baseXY: ['center', 'center']
            },
            // 组件的默认父节点
            parentNode: document.body
        },

        //显示注册框
        show: function(){
            mask.set('zIndex', this.get('zIndex') - 1);
            mask.show();
            Register.superclass.show.call(this);
        },

        //隐藏注册框
        hide : function(){
            Register.superclass.hide.call(this);
            mask.hide();
        },

        //注册
        register: function(){
            alert('注册');
        }
    });


    module.exports = Register;
});
