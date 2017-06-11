var DailyDeals = function() {
	return {        
        init : function () {
        	jQuery('#site_table .group-checkable').change(function() {
				var set = jQuery(this).attr("data-set");
				var checked = jQuery(this).is(":checked");
				jQuery(set).each(function() {
					if (checked) {
						$(this).attr("checked", true);
					} else {
						$(this).attr("checked", false);
					}
				});
				jQuery.uniform.update(set);
			});
		}
	};
}();

function doStart(obj){
	var siteNames = '';
	var set = $("#site_table .checkboxes");
	$(set).each(function() {
		if ($(this).is(":checked")) {
			siteNames += $(this).val() + ",";
		}
	});
	if(siteNames == ''){
		bootbox.alert("Please select at least 1 site to start.");
		return;
	}
	siteNames = siteNames.substring(0, siteNames.length - 1);
	$(obj).attr('class', 'btn disabled');
	$(obj).removeAttr('onclick');

	window.java.startDailyDeals(siteNames);
}

function doFinished(){
	$("#start_btn").attr('class', 'btn blue');
	$("#start_btn").attr('onclick', 'doStart(this)');
}

function showMonitor(siteName){
	window.java.showDDMonitor(siteName);
}

function refreshSite(siteName){
	window.java.refreshDDSite(siteName);
}

function updateStatus(siteName, action, status, log){
	if(status == '' || status == 'Running'){
		$('#status_' + siteName).attr('class', 'label label-info');
		$('#status_' + siteName).html('Running');
		//显示monitor按钮
		$('#monitor_' + siteName).show();
	}else if(status == 'Waiting'){
		$('#status_' + siteName).attr('class', 'label label-warning');
		$('#status_' + siteName).html(status);
	}else if(status == 'Stopped'){
		$('#status_' + siteName).attr('class', 'label label-important');
		$('#status_' + siteName).html(status);
		//隐藏monitor按钮
		$('#monitor_' + siteName).hide();
	}else if(status == 'Finished'){
		$('#status_' + siteName).attr('class', 'label label-success');
		$('#status_' + siteName).html(status);
		//隐藏monitor按钮
		$('#monitor_' + siteName).hide();
	}
	var logObj = $('#log_' + siteName);
	if($.trim($(logObj).val()) == ''){
		$(logObj).val(log);
	}else{
		$(logObj).val($(logObj).val() + "\n" + log);
	}	
	$(logObj).scrollTop($(logObj)[0].scrollHeight);
	
	if(action == ''){
		$('#action_' + siteName).hide();
	}else if(action == "Login"){
		var actionObj = $('#action_' + siteName);
		$(actionObj).attr('onclick', "showMonitor('" + siteName + "')");		
		$(actionObj).html(action);
		$(actionObj).scrollTop($(actionObj)[0].scrollHeight);
		$(actionObj).show();
	}else if(action == "Refresh"){
		var actionObj = $('#action_' + siteName);
		$(actionObj).attr('onclick', "refreshSite('" + siteName + "')");		
		$(actionObj).html(action);
		$(actionObj).scrollTop($(actionObj)[0].scrollHeight);
		$(actionObj).show();
	}
	
}
