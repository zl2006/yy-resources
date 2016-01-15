/**
 * Created by zhouliang on 15-6-9.
 */
(function(){
    document.getElementById("register-btn").onclick = function(){
        requirejs(['register'], function (Reg) {
            var reg = new Reg();
            reg.show();
        });
    };
})();
