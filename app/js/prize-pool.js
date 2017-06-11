var PrizePool = function() {

	return {
		init: function () {
			
        }
	};
}();


function preWinners(id){
	$.ajax({
		type : "post",
		data : {
			id : id
		},
		url : "rest/page/preWinners",
		success : function(info) {
			$('#pre_inner_' + id).html(info);
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

