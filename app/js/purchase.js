var Purchase = function() {
	
	return {
		init: function () {
			$('#convertAmount').change(function(){
				var amount = $.trim($('#convertAmount').val());
				if(amount == '') return;
				var points = parseFloat(amount * 100).toFixed(2);
				$('#convert_amount_label').html(points);
			});
			
			$('#convertQuantity').change(function(){
				var quantity = $.trim($('#convertQuantity').val());
				if(quantity == '') return;
				var cash = parseFloat(quantity / 200).toFixed(2);
				$('#convert_quantity_label').html(cash);
			});
        }
	};
}();

function doUpgrade(period){		
	if(period == 1){
		var radio = $("input[name='m1UpgradeRadio']:checked").val();
		if(typeof(radio) == 'undefined' || radio == ''){
			bootbox.alert("Please select paypal or payza.");
			return false;
		}else if(radio == 'paypal'){
			$("#paypal_upgrade_item_name").val('TEMBrowser.com - Monthly upgraded membership');
			$("#paypal_upgrade_item_number").val('M1');
			$("#paypal_upgrade_amount").val('10');
			$("#paypal_upgrade_period").val('1');
			$('#form_paypal_upgrade').submit();
		}else if(radio == 'payza'){
			$("#payza_upgrade_item_name").val('TEMBrowser.com - Monthly upgraded membership');
			$("#payza_upgrade_item_number").val('M1');
			$("#payza_upgrade_amount").val('10');
			$("#payza_upgrade_period").val('1');
			$("#payza_trial_length").val('1');
			$("#payza_trial_amount").val('10');
			$('#form_payza_upgrade').submit();
		}		
	}else if(period == 6){
		var radio = $("input[name='m6UpgradeRadio']:checked").val();
		if(typeof(radio) == 'undefined' || radio == ''){
			bootbox.alert("Please select subscribe by.");
			return false;
		}
		if(radio == 'paypal'){
			$("#paypal_upgrade_item_name").val('TEMBrowser.com - Semiannual upgraded membership');
			$("#paypal_upgrade_item_number").val('M6');
			$("#paypal_upgrade_amount").val('50');
			$("#paypal_upgrade_period").val('6');
			$('#form_paypal_upgrade').submit();
		}else if(radio == 'payza'){
			$("#payza_upgrade_item_name").val('TEMBrowser.com - Semiannual upgraded membership');
			$("#payza_upgrade_item_number").val('M6');
			$("#payza_upgrade_amount").val('50');
			$("#payza_upgrade_period").val('6');
			$("#payza_trial_length").val('6');
			$("#payza_trial_amount").val('50');
			$('#form_payza_upgrade').submit();
		}
	}else if(period == 12){
		var radio = $("input[name='m12UpgradeRadio']:checked").val();
		if(typeof(radio) == 'undefined' || radio == ''){
			bootbox.alert("Please select subscribe by.");
			return false;
		}
		if(radio == 'paypal'){
			$("#paypal_upgrade_item_name").val('TEMBrowser.com - Annual upgraded membership');
			$("#paypal_upgrade_item_number").val('M12');
			$("#paypal_upgrade_amount").val('100');
			$("#paypal_upgrade_period").val('12');
			$('#form_paypal_upgrade').submit();
		}else if(radio == 'payza'){
			$("#payza_upgrade_item_name").val('TEMBrowser.com - Annual upgraded membership');
			$("#payza_upgrade_item_number").val('M12');
			$("#payza_upgrade_amount").val('100');
			$("#payza_upgrade_period").val('12');
			$("#payza_trial_length").val('12');
			$("#payza_trial_amount").val('100');
			$('#form_payza_upgrade').submit();
		}
	}		
}

function doPurchasePoints(){
	var radio = $("input[name='purchasePointsRadio']:checked").val();
	if(typeof(radio) == 'undefined' || radio == ''){
		bootbox.alert("Please select purchase by paypal or payza.");
		return false;
	}else if(radio == 'paypal'){
		var quantity = $('#quantity').val();
		if(quantity == ''){
			bootbox.alert("Please select quantity.");
			return false;
		}else if(quantity == '1'){
			$("#paypal_buynow_item_name").val('TEMBrowser.com - 100 points');
			$("#paypal_buynow_item_number").val('P1');
			$("#paypal_buynow_amount").val('1');			
		}else if(quantity == '5'){
			$("#paypal_buynow_item_name").val('TEMBrowser.com - 500 points');
			$("#paypal_buynow_item_number").val('P5');
			$("#paypal_buynow_amount").val('5');			
		}else if(quantity == '10'){
			$("#paypal_buynow_item_name").val('TEMBrowser.com - 1,000 points');
			$("#paypal_buynow_item_number").val('P10');
			$("#paypal_buynow_amount").val('10');			
		}else if(quantity == '25'){
			$("#paypal_buynow_item_name").val('TEMBrowser.com - 2,500 points');
			$("#paypal_buynow_item_number").val('P25');
			$("#paypal_buynow_amount").val('25');			
		}else if(quantity == '50'){
			$("#paypal_buynow_item_name").val('TEMBrowser.com - 5,000 points');
			$("#paypal_buynow_item_number").val('P50');
			$("#paypal_buynow_amount").val('50');			
		}else if(quantity == '100'){
			$("#paypal_buynow_item_name").val('TEMBrowser.com - 10,000 points');
			$("#paypal_buynow_item_number").val('P100');
			$("#paypal_buynow_amount").val('100');			
		}
		$('#form_paypal_buynow').submit();
	}else if(radio == 'payza'){		
		var quantity = $('#quantity').val();
		if(quantity == ''){
			bootbox.alert("Please select quantity.");
			return false;
		}else if(quantity == '1'){
			$("#payza_buynow_item_name").val('TEMBrowser.com - 100 points');
			$("#payza_buynow_item_number").val('P1');
			$("#payza_buynow_amount").val('1');			
		}else if(quantity == '5'){
			$("#payza_buynow_item_name").val('TEMBrowser.com - 500 points');
			$("#payza_buynow_item_number").val('P5');
			$("#payza_buynow_amount").val('5');			
		}else if(quantity == '10'){
			$("#payza_buynow_item_name").val('TEMBrowser.com - 1,000 points');
			$("#payza_buynow_item_number").val('P10');
			$("#payza_buynow_amount").val('10');			
		}else if(quantity == '25'){
			$("#payza_buynow_item_name").val('TEMBrowser.com - 2,500 points');
			$("#payza_buynow_item_number").val('P25');
			$("#payza_buynow_amount").val('25');			
		}else if(quantity == '50'){
			$("#payza_buynow_item_name").val('TEMBrowser.com - 5,000 points');
			$("#payza_buynow_item_number").val('P50');
			$("#payza_buynow_amount").val('50');			
		}else if(quantity == '100'){
			$("#payza_buynow_item_name").val('TEMBrowser.com - 10,000 points');
			$("#payza_buynow_item_number").val('P100');
			$("#payza_buynow_amount").val('100');			
		}
		$('#form_payza_buynow').submit();
	}	
}

function doPurchaseReferrals(referralName){
	bootbox.setLocale("en_US");  
	bootbox.confirm("Purchase this referral will cost you 1,000 points, continue?", function (result) {  
        if(result) {  
        	$.ajax({
        		type : "post",
        		data : {
        			referralName : referralName
        		},
        		url : "rest/user/purchaseReferrals",
        		success : function(info) {
        			if(info == 'OK'){	
        				bootbox.alert({ 
        		            message: 'Referrals has been added to you account.',  
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

function doConvertComm(){
	var convertAmount = $('#convertAmount').val();
	if(convertAmount == ''){
		bootbox.alert("Please input amount to convert.");
		return false;
	}else if(parseFloat(convertAmount) < 0.01){
		bootbox.alert("Minimum amount is $0.01");
		return false;
	}
	bootbox.setLocale("en_US");  
	bootbox.confirm("Are you sure to convert " + convertAmount + " commissions to points?", function (result) {  
        if(result) {  
        	$.ajax({
        		type : "post",
        		data : {
        			convertAmount : convertAmount
        		},
        		url : "rest/user/convertCommission",
        		success : function(info) {
        			if(info == 'OK'){	
        				bootbox.alert({ 
        		            message: 'Points has been added to you account balance.',  
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

function doConvertPoint(){
	var convertQuantity = $('#convertQuantity').val();
	if(convertQuantity == ''){
		bootbox.alert("Please input quantity to convert.");
		return false;
	}else if(parseFloat(convertQuantity) < 2){
		bootbox.alert("Minimum quantity is 2 points.");
		return false;
	}
	bootbox.setLocale("en_US");  
	bootbox.confirm("Are you sure to convert " + convertQuantity + " points to cash?", function (result) {  
        if(result) {  
        	$.ajax({
        		type : "post",
        		data : {
        			convertQuantity : convertQuantity
        		},
        		url : "rest/user/convertPoint",
        		success : function(info) {
        			if(info == 'OK'){	
        				bootbox.alert({ 
        		            message: 'Cash has been added to you account balance.',  
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
