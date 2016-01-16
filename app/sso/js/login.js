$(document).ready(function() {

	function login() {
		if (validate()) {
			$('#form-login').submit();
		}
	}

	function validate() {
		clearError();
		if ($('#username').val().trim() == "") {
			$('#li_username').addClass('error');
			$('#err_username').html('必须输入用户名');
			return false;
		}
		if ($('#password').val().trim() == "") {
			$('#li_password').addClass('error');
			$('#err_pwd').html(' 必须输入密码');
			return false;
		}
		return true;
	}

	function clearError() {
		$('#li_username').removeClass('error');
		$('#li_password').removeClass('error');
		$('#err_username').html('');
		$('#err_pwd').html('');
	}

	$('#loginBtn').bind('click', login);

});