var Notification = function() {

	return {
		init: function () {
			jQuery('#notification_table .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                    if (checked) {
                        $(this).attr("checked", true);
                    } else {
                        $(this).attr("checked", false);
                    }
                });
                jQuery.uniform.update(set);
            });
			
			$('#select_read_btn').click(function (){
				 var set = $('#notification_table .checkboxes');
				 $(set).each(function () {
					 if($(this).val() == '1'){
						 $(this).attr("checked", true);
					 }else{
						 $(this).attr("checked", false);
					 }					 
				 });
				 $.uniform.update(set);
			});
			
			$('#select_unread_btn').click(function (){
				 var set = $('#notification_table .checkboxes');
				 $(set).each(function () {
					 if($(this).val() == '0'){
						 $(this).attr("checked", true);
					 }else{
						 $(this).attr("checked", false);
					 }					 
				 });
				 $.uniform.update(set);
			});
			
			$('#delete_selected_btn').click(function (){
				batchDelete();
			});
        }
	};
}();


function batchDelete(){
	var ids = '';
	var set = $('#notification_table .checkboxes');
	$(set).each(function() {
		var checked = $(this).is(":checked");
		if(checked){
			ids += $(this).attr('id') + ",";
		}
	});
	if(ids == ''){
		bootbox.alert("Please select at least one record to delete.");
		return false;
	}else{
		ids = ids.substring(0, ids.lastIndexOf(','));
	}
	doDelete(ids);
}

function doView(id){
	$('#content_' + id).show();
	$('#' + id).val('1');
	$('#icon_' + id).html('<i class="icon-envelope-alt"></i>');
	$.ajax({
		type : "post",
		data : {
			id : id
		},
		url : "rest/user/viewNotification",
		success : function(info) {},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function doDelete(ids){
	$.ajax({
		type : "post",
		data : {
			ids : ids
		},
		url : "rest/user/deleteNotification",
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
