var AdSetup = function() {
	
	var handleSelec2 = function () {
        
        $('#timer').change(function(){
        	var timer = $('#timer').val();
        	var price = parseInt(timer) * 2.5 / 100;
        	$('#timer_value').html('Showing for ' + timer + ' seconds, cost ' + price + ' points per click.');
        	changePPCPrice();
        });
        $('#ppc_banner_url').focusout(function(){
        	var bannerUrl = $.trim($('#ppc_banner_url').val());
        	if(bannerUrl == ''){
        		$('#ppc_banner_div').hide();
        	}else{
        		$('#ppc_banner_image').attr('src', bannerUrl);
        		$('#ppc_banner_div').show();
        	}        	
        });
        $('#ppc_quantity').keyup(function(){
        	var val = $('#ppc_quantity').val().replace(/\D/g,'');
        	$('#ppc_quantity').val(val);
        });
        $('#ppc_quantity').focusout(function(){
        	changePPCPrice();
        });
        $('#ppc_submit_btn').click(function(){
        	submitPPCForm();
        });
        
        $('#ppv_banner_url').focusout(function(){
        	var bannerUrl = $.trim($('#ppv_banner_url').val());
        	if(bannerUrl == ''){
        		$('#ppv_banner_div').hide();
        	}else{
        		$('#ppv_banner_image').attr('src', bannerUrl);
        		$('#ppv_banner_div').show();
        	}        	
        });
        $('#ppv_quantity').keyup(function(){
        	var val = $('#ppv_quantity').val().replace(/\D/g,'');
        	$('#ppv_quantity').val(val);
        });
        $('#ppv_quantity').focusout(function(){
        	changePPVPrice();
        });
        $('#ppv_submit_btn').click(function(){
        	submitPPVForm();
        });
    }	
	
	return {
		init: function () {
			handleSelec2();
        }
	};
}();

function submitPPCForm(){	
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
	var timer = $('#timer').val();
	if(timer == '' || parseInt(timer) < 10 || parseInt(timer) > 60){
		bootbox.alert("Timer is invalid.");
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
			type : 2,
			siteName : siteName,
			linkUrl : linkUrl,
			bannerUrl : bannerUrl,
			timer : timer,
			quantity : quantity
		},
		url : "rest/user/adSetup",
		success : function(info) {
			if(info == 'OK'){	
				bootbox.alert({ 
		            message: 'Your advertising is pending review now.',  
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
}

function isURL(str){
    return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
}

function showAlert(str){
	bootbox.alert(str);
	return false;
}

function changePPCPrice(){
	var quantity = $('#ppc_quantity').val();
	if(quantity == '' || parseInt(quantity) < 0){
		return;
	}
	var timer = $('#timer').val();
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

function submitPPVForm(){	
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
	var price = $('#ppv_price').html();
	var points = $('#points').val();
	if(parseFloat(points) - parseFloat(price) < 0){
		bootbox.alert("Your points balance is not enough.");
		return false;
	}
	
	$.ajax({
		type : "post",
		data : {
			type : 3,
			siteName : siteName,
			linkUrl : linkUrl,
			bannerUrl : bannerUrl,			
			quantity : quantity
		},
		url : "rest/user/adSetup",
		success : function(info) {
			if(info == 'OK'){	
				bootbox.alert({ 
		            message: 'Your advertising is pending review now.',  
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
