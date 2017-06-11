var Sites = function() {
	return {
		
		purchase : function(siteId, price, historyCount) {			
			if(parseInt(historyCount) < 10){
				price = '0.00';
			}
			bootbox.setLocale("en_US");  
			bootbox.confirm("Purchase this site will cost you " + price + " point(s), continue?", function (result) {  
                if(result) {  
                	doPurchase(siteId);
                } else {  
                    return;
                }  
            });
		},
		
		remove : function(siteId, price, userStatus) {
			if(userStatus != '9'){
				price = parseFloat(parseFloat(price) / 2).toFixed(2);
			}
			bootbox.setLocale("en_US");  
			bootbox.confirm("Remove this site will return " + price + " point(s) to your balance, continue?", function (result) {  
                if(result) {  
                	doRemove(siteId);
                } else {  
                    return;
                }  
            });
		}
	};
}();


function doPurchase(siteId){
	$.ajax({
		type : "post",
		data : {
			siteId : siteId
		},
		url : "rest/userSite/purchase",
		success : function(info) {
			if(info == 'OK'){
				bootbox.alert({ 
		            message: 'This site has been added to your account successfully.',  
		            callback: function() {  
		            	window.location.replace(window.location.href);
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

function doRemove(userSiteId){
	$.ajax({
		type : "post",
		data : {
			userSiteId : userSiteId
		},
		url : "rest/userSite/remove",
		success : function(info) {
			if(info == 'OK'){
				bootbox.alert({ 
		            message: 'This site has been removed from your account successfully.',  
		            callback: function() {  
		            	window.location.replace(window.location.href);
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
