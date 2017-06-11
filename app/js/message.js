var Message = function() {

	return {

		init: function () {
			
        }
	};
}();

function replyMessage(id){
	$('#reply_' + id).html('<textarea id="reply_area_' + id + '" class="span7 m-wrap" placeholder="Type your message here" rows="3"></textarea><br/><button onclick="doReply(\'' + id + '\')" class="btn blue" type="button">Post a Message</button>');
	$('#reply_' + id).show();
}

function doReply(id){
	var content = $('#reply_area_' + id).val();
	if(content == ''){
		bootbox.alert("Please type your message.");
		$('#reply_area_' + id).focus();
		return false;
	}
	$.ajax({
		type : "post",
		data : {
			parentId : id,
			content : content
		},
		url : "rest/user/replyMessage",
		success : function(info) {
			if(info == 'OK'){	
				window.location.replace(window.location.href);
			} else {
				bootbox.alert(info);
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function doDelete(id){
	$.ajax({
		type : "post",
		data : {
			id : id
		},
		url : "rest/user/deleteMessage",
		success : function(info) {
			if(info == 'OK'){	
				$('#media_' + id).remove();
				if ( $("#hr_" + id).length > 0 ) {
					$("#hr_" + id).remove();
				}
			} else {
				bootbox.alert(info);
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}
