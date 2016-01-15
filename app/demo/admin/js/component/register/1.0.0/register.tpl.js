/**
 * 使用js定义模板主要是解决跨域问题
 */
define(function(){
/*jshint multistr: true */
return ' <form class="pure-form pure-form-aligned form" action="#" style="background-color:white;border:1px solid grey;padding:20px;">\
    <div class="form-area">\
        <div class="title">\
            一、用户基本信息\
        </div>\
        <fieldset>\
            <div class="pure-control-group">\
                <label for="name">用户名：</label>\
                <input id="name" name="name" type="text" placeholder="输入用户姓名"\
                       data-rule="required;length[8~]" class="pure-u-1-2">\
            </div>\
            <div class="pure-control-group">\
                <label for="password">密码：</label>\
                <input id="password" name="password" type="password" placeholder="输入用户密码"\
                       data-rule="密码:required;" class="pure-u-3-8">\
            </div>\
            <div class="pure-control-group">\
                <label for="cf_pwd">确认密码：</label>\
                <input id="cf_pwd" name="cf_pwd" type="text" placeholder="重复输入密码"\
                       data-rule="确认密码:required;match(password)" class="pure-u-3-8">\
            </div>\
        </fieldset>\
    </div>\
    <!--form end-->\
    <div class="form-area">\
        <div class="title">\
            二、联系方式\
        </div>\
        <fieldset>\
            <div class="pure-control-group">\
                <label for="qq">QQ号码：</label>\
                <input id="qq" type="number" placeholder="qq" class="pure-u-3-8">\
            </div>\
            <div class="pure-control-group">\
                <label for="mobile">手机：</label>\
                <input id="mobile" type="text" placeholder="手机" class="pure-u-3-8">\
            </div>\
            <div class="pure-control-group">\
                <label for="email">邮箱地址：</label>\
                <input id="email" name="email" type="email" placeholder="输入邮箱地址" data-rule="required;email"\
                       class="pure-u-1-2">\
            </div>\
            <div class="pure-controls">\
                <label for="cb" class="pure-checkbox">\
                    <input id="cb" type="checkbox"> 我已经阅读条款及约束！\
                </label>\
                <br>\
                <button type="button" class="pure-button pure-button-primary pure-u-1-4 button-large" id="register-btn">注册\
                </button>\
                <button type="button" class="pure-button button-large pure-u-1-4" id="login-close-btn">关闭</button>\
            </div>\
        </fieldset>\
    </div>\
</form> <!--form end-->';
});
