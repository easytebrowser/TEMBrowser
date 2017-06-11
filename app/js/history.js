var History = function() {
	
	return {
		init: function () {

        }
	};
}();

function doCashout(){		
	var cashoutType = $('#cashoutType').val();
	bootbox.setLocale("en_US");  
	bootbox.confirm("Are you sure to cashout whole commissions to your " + cashoutType + " account?", function (result) {  
        if(result) {  
        	$.ajax({
        		type : "post",
        		data : {
        			cashoutType : cashoutType
        		},
        		url : "rest/user/cashout",
        		success : function(info) {
        			if(info == 'OK'){	
        				bootbox.alert({ 
        		            message: 'Your request in pending list now.',  
        		            callback: function() {  
        		            	window.location.replace(window.location.href);
        		            },  
        		            title: "Congratulations",  
        		        });  	        				
        			} else {
        				bootbox.alert(info);
        			}
        		},
        		error : function() {
        			bootbox.alert("Server not available, please try again later.");
        		}
        	});
        } else {  
            return;
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
