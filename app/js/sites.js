var Sites = function() {
	return {
		
		init: function (t) {
			$.ajax({
				type : "post",
				data : {
					t : t
				},
				url : "rest/page/loadSites",
				success : function(info) {
					if(t == 'a'){
						$('#available_tbody').html(info);
						var availableCount = $('#availableCount').val();
						$('#tab_a').html('Available(' + availableCount + ')')
					}else{
						$('#purchase_tbody').html(info);
						var purchasedCount = $('#purchasedCount').val();
						$('#tab_p').html('Purchased(' + purchasedCount + ')')
					}
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
        },
	
		purchase : function(siteName, price, historyCount, upline) {			
			if(parseInt(historyCount) < 10){
				price = '0.00';
			}
			bootbox.setLocale("en_US");  
			bootbox.confirm("Purchase this template will cost you " + price + " point(s), continue?", function (result) {  
                if(result) {  
                	doPurchase(siteName, upline);
                } else {  
                    return;
                }  
            });
		},
		
		remove : function(siteName) {
			bootbox.setLocale("en_US");  
			bootbox.confirm("Confirm to remove this template?", function (result) {  
                if(result) {  
                	doRemove(siteName);
                } else {  
                    return;
                }  
            });
		}
	};
}();


function doPurchase(siteName, upline){
	$.ajax({
		type : "post",
		data : {
			siteName : siteName,
			upline : upline
		},
		url : "rest/userSite/purchase",
		success : function(info) {
			if(info == 'OK'){
				bootbox.alert({ 
		            message: 'This template has been added to your account successfully.',  
		            callback: function() {  
		            	$('#asite_' + siteName).remove();
		            },  
		            title: "Congratulations",  
		        });  			
			}else{
				bootbox.alert(info);
				return;
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function doRemove(siteName){
	$.ajax({
		type : "post",
		data : {
			siteName : siteName
		},
		url : "rest/userSite/remove",
		success : function(info) {
			if(info == 'OK'){
				bootbox.alert({ 
		            message: 'This template has been removed from your account successfully.',  
		            callback: function() {  
		            	$('#psite_' + siteName).remove();
		            },  
		            title: "Congratulations",  
		        });  			
			}else{
				bootbox.alert(info);
				return;
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function updateRid(siteName, obj){
	$.ajax({
		type : "post",
		data : {
			siteName : siteName,
			rid : $(obj).val()
		},
		url : "rest/userSite/updateRid",
		success : function(info) {	
			
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