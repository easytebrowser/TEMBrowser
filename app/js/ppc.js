
var i = 0;
var timer = 0;
var PPC = function() {

	return {
		init: function () {
			$('#comment_btn').click(function(){
				doSubmit(1);
			});
			
			$('#no_comment_btn').click(function(){
				doSubmit(0);
			});
			
			timer = parseInt($('#timer').html());
			$(".knob").knob({
				'readOnly': true,
				'dynamicDraw': true,
				'thickness': 0.2,
				'tickColorizeValues': true,
				'skin': 'tron'
			});			
			changeTimer();
        },
	};
}();

function changeTimer(){
	if(i < timer * 10){		
		i++;		
		var p = parseFloat(i * 10 / timer).toFixed(2);
		$('.knob').val(p).trigger('change'); 	
		if(i % 10 == 0){
			$('#timer').html(timer - i / 10);
		}
		setTimeout(changeTimer, 100);
	}else{
		$('#timer_div').hide();
		$('#comment_div').show();
	}	
}

function doSubmit(type){
	var timer = $('#timer').html();
	if(parseInt(timer) > 0){
		bootbox.alert("Waiting timer cut down.");
		return false;
	}
	var comment = '';
	if(type == 1){
		comment = $.trim($('#comment').val());
		if(comment.length < 10){
			bootbox.alert("Please input at least 10 characters.");
			return false;
		}
	}
	
	$.ajax({
		type : "post",
		data : {
			id : $('#advertising_id').val(),
			comment : comment
		},
		url : "rest/common/submitPPC",
		success : function(info) {
			$('#comment_div').hide();
			var arr = info.split('_');
			if(arr.length == 3 && arr[0] == 'OK'){			
				var point = parseFloat(parseInt(arr[1]) / 100).toFixed(2);
				var bonus = parseFloat(parseInt(arr[2]) / 100).toFixed(2);
				var msg = "You get " + point + " points ";
				if(bonus > 0){
					msg += "+ " + bonus + " bonus points ";
				}
				msg += ", points will add to your balance in 5 minutes."
				$('#success_msg').html(msg);
				$('#error_msg').remove();
				$('#success_div').show();
			} else {
				$('#error_msg').html(info);
				$('#success_msg').remove();
				$('#error_div').show();
			}			
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}
