var AdStats = function() {

	return {
		init: function () {

        }
	};
}();

function changeStatus(id, status, obj){
	if(id == '' || status == ''){
		bootbox.alert("Parameter error.");
		return false;
	}
	var newStatus = '';
	if(status == '0'){
		newStatus = '3';
	}else if(status == '3'){
		newStatus = '0';
	}
	if(newStatus == ''){
		bootbox.alert("Parameter error.");
		return false;
	}
	$.ajax({
		type : "post",
		data : {
			id : id,
			status : status,
			newStatus : newStatus
		},
		url : "rest/user/adStatus",
		success : function(info) {
			if(info == 'OK'){	
				$(obj).attr("onclick", "changeStatus('" + id + "', '" + newStatus + "', this)"); 
				if(newStatus == '0'){
					$(obj).attr('class', 'btn mini green');
					$(obj).html('Active');
				}else if(newStatus == '3'){
					$(obj).attr('class', 'btn mini black');
					$(obj).html('Paused');
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

function initManageForm(id){	
	$.ajax({
		type : "post",
		data : {
			id : id
		},
		url : "rest/page/adManage",
		success : function(info) {
			$('#modal_body').html(info);
			$('#portlet-config').show();
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function hideModal(id){
	$('#' + id).hide();
}

function submitModalForm(id, type){
	if(type == '0' || type == '1'){
		var rid = $.trim($('#modal_rid').val());
		if(rid == ''){
			bootbox.alert("Referral ID is mandatory.");
			return false;
		}
		var bannerUrl =  $.trim($('#modal_banner_url').val());	
		if(bannerUrl != '' && !isURL(bannerUrl)){
			bootbox.alert("Banner Image URL is invalid.");
			return false;
		}else if(bannerUrl.length > 100){
			bootbox.alert("Banner Image URL maxlength is 100 characters.");
			return false;		
		}	
		var tooltip = $.trim($('#modal_tooltip').val());
		if(tooltip.length < 5 || tooltip.length > 75){
			bootbox.alert("Tooltip Text must between 5 and 75 characters.");
			return false;
		}
		$.ajax({
			type : "post",
			data : {
				id : id,
				type : type,
				rid : rid,
				bannerUrl : bannerUrl,
				tooltip : tooltip
			},
			url : "rest/user/adManage",
			success : function(info) {
				if(info == 'OK'){	
					$('#portlet-config').hide();
					window.location.replace(window.location.href); 	        				
				} else {
					bootbox.alert(info);
				}
			},
			error : function() {
				bootbox.alert("Server not available, please try again later.");
			}
		});
	}else if(type == '2'){
		var siteName = $.trim($('#ppc_site_name').val());
		if(siteName.length < 5 || siteName.length > 50){
			bootbox.alert("Site Name length is 5-50 characters.");
			return false;
		}
		var linkUrl =  $.trim($('#ppc_link_url').val());	
		if(!isURL(linkUrl)){
			bootbox.alert("Advertising URL is invalid.");
			return false;
		}else if(linkUrl.length > 100){
			bootbox.alert("Advertising URL maxlength is 100 characters.");
			return false;		
		}
		var bannerUrl = $.trim($('#ppc_banner_url').val());	
		if(!isURL(bannerUrl)){
			bootbox.alert("Banner Image URL is invalid.");
			return false;
		}else if(bannerUrl.length > 100){
			bootbox.alert("Banner Image URL maxlength is 100 characters.");
			return false;		
		}
		var quantity = $.trim($('#ppc_quantity').val());
		if(quantity == '' || parseInt(quantity) < 0){
			bootbox.alert("Quantity is mandatory, type 0 if you don't want assign right now.");
			return false;
		}
		var price = $('#ppc_prize').html();
		var points = $('#points').val();
		if(parseFloat(points) - parseFloat(price) < 0){
			bootbox.alert("Your points balance is not enough.");
			return false;
		}
		$.ajax({
			type : "post",
			data : {			
				id : id,
				type : type,
				siteName : siteName,
				linkUrl : linkUrl,
				bannerUrl : bannerUrl,
				quantity : quantity
			},
			url : "rest/user/adManage",
			success : function(info) {
				if(info == 'OK'){	
					$('#portlet-config').hide();
					window.location.replace(window.location.href); 	        				 				
				} else {
					bootbox.alert(info);
				}
			},
			error : function() {
				bootbox.alert("Server not available, please try again later.");
			}
		});
	}else if(type == '3'){
		var siteName = $.trim($('#ppv_site_name').val());
		if(siteName.length < 5 || siteName.length > 50){
			bootbox.alert("Site Name length is 5-50 characters.");
			return false;
		}
		var linkUrl =  $.trim($('#ppv_link_url').val());	
		if(!isURL(linkUrl)){
			bootbox.alert("Advertising URL is invalid.");
			return false;
		}else if(linkUrl.length > 100){
			bootbox.alert("Advertising URL maxlength is 100 characters.");
			return false;		
		}
		var bannerUrl = $.trim($('#ppv_banner_url').val());	
		if(!isURL(bannerUrl)){
			bootbox.alert("Banner Image URL is invalid.");
			return false;
		}else if(bannerUrl.length > 100){
			bootbox.alert("Banner Image URL maxlength is 100 characters.");
			return false;		
		}
		var quantity = $.trim($('#ppv_quantity').val());
		if(quantity == '' || parseInt(quantity) < 100){
			bootbox.alert("Minumum quantity is 100.");
			return false;
		}
		var price = $('#ppv_prize').html();
		var points = $('#points').val();
		if(parseFloat(points) - parseFloat(price) < 0){
			bootbox.alert("Your points balance is not enough.");
			return false;
		}
		
		$.ajax({
			type : "post",
			data : {
				id : id,
				type : type,
				siteName : siteName,
				linkUrl : linkUrl,
				bannerUrl : bannerUrl,			
				quantity : quantity
			},
			url : "rest/user/adManage",
			success : function(info) {
				if(info == 'OK'){	
					$('#portlet-config').hide();
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
}

function adDelete(id, type){
	var msg = "Confirm to delete this advertising?";
	if(type == '2' || type == '3'){
		msg = "All available points will add back to your balance after delete this advertising, continue?";
	}
	bootbox.setLocale("en_US");  
	bootbox.confirm(msg, function (result) {  
        if(result) {  
        	$.ajax({
    			type : "post",
    			data : {
    				id : id
    			},
    			url : "rest/user/adDelete",
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
        } else {  
            return;
        }  
    });
}

function changeBannerUrl(type){
	if(type == '2'){
		var bannerUrl = $.trim($('#ppc_banner_url').val());
		if(bannerUrl == ''){
			$('#ppc_banner_div').hide();
		}else{
			$('#ppc_banner_image').attr('src', bannerUrl);
			$('#ppc_banner_div').show();
		}     
	}else if(type == '3'){
		var bannerUrl = $.trim($('#ppv_banner_url').val());
    	if(bannerUrl == ''){
    		$('#ppv_banner_div').hide();
    	}else{
    		$('#ppv_banner_image').attr('src', bannerUrl);
    		$('#ppv_banner_div').show();
    	}     
	}	
}


function isURL(str){
    return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
}

function changePPCPrice(){
	var quantity = $('#ppc_quantity').val();
	if(quantity == '' || parseInt(quantity) < 0){
		return;
	}
	var timer = $('#timer').html();
	var price = parseFloat(parseInt(timer) * quantity * 2.5 / 100).toFixed(2);
	$('#ppc_prize').html(price);
}

function changePPVPrice(){
	var quantity = $('#ppv_quantity').val();
	if(quantity == '' || parseInt(quantity) < 0){
		return;
	}
	var price = parseFloat(quantity * 2.5 / 100).toFixed(2);	
	$('#ppv_price').html(price);
}

function showComment(id){
	$.ajax({
		type : "post",
		data : {
			id : id
		},
		url : "rest/page/adComments",
		success : function(info) {
			$('#comment_div_' + id).html(info);
			$('#comment_div_' + id).show();
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function adCommentApprove(status, advId, commentId){
	var ticket = $('#ticket_' + advId).html();
	if(ticket == '' || parseInt(ticket) < 1){
		bootbox.alert("Your ticket is not enough.");
		return false;
	}
	if(status == 'Y'){
		bootbox.setLocale("en_US");  
		bootbox.confirm('"Like" this comment will cost you 1 ticket, continue?', function (result) {  
	        if(result) {  
	        	doAdCommet(status, advId, commentId);
	        } else {  
	            return;
	        }  
	    });	
	}else{
		doAdCommet(status, advId, commentId);
	}
}

function doAdCommet(status, advId, commentId){
	var ticket = parseInt($('#ticket_' + advId).html());
	$.ajax({
		type : "post",
		data : {
			id : commentId,
			status : status
		},
		url : "rest/user/adCommentApprove",
		success : function(info) {
			if(info == 'OK'){
				ticket = ticket - 1;
				if(ticket < 0){
					ticket = 0;
				}
				$('#ticket_' + advId).html(ticket);
				$('#media_' + commentId).remove();
				$('#hr_' + commentId).remove();
				
				var pendingCount = parseInt($('#pending_comment_' + advId).html());
				pendingCount = pendingCount -1;
				$('#pending_comment_' + advId).html(pendingCount);
				if(pendingCount == 0){
					$('#pending_comment_div_' + advId).remove();
					$('#comment_div_' + advId).remove();
				}				
			}else{
				bootbox.alert(info);
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}


