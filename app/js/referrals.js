var Referrals = function() {
	
	return {
		init: function () {
			$('#level_sel').change(function(){
				loadReferrals(this.value);
			});
			loadReferrals(1);
        }
	};
}();

function loadReferrals(level){
	$.ajax({
		type : "post",
		data : {
			level : level
		},
		url : "rest/page/loadReferrals",
		success : function(info) {	
			$('#referrals_tbody').html(info);
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function sendMessage(username){
	$('#modal_username').html(username);
	$('#modal_message').val('');
	$('#portlet-config').show();
}

function doSendMessage(){
	var content = $('#modal_message').val();
	if(content == ''){
		bootbox.alert("Please type your message.");
		$('#modal_message').focus();
		return false;
	}
	$.ajax({
		type : "post",
		data : {
			receiver : $('#modal_username').html(),
			content : content
		},
		url : "rest/user/sendMessage",
		success : function(info) {	
			$('#portlet-config').hide();
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}
