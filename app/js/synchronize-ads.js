var SynchronizeAds = function() {
	return {
		init: function () {
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

function hideModal(modal){
	$('#' + modal).hide();
}

function showModal(id){
	$.ajax({
		type : "post",
		data : {
			id : id
		},
		url : "rest/common/updateSynchronizeAdsForm",
		success : function(info) {
			$('#modal_body').html(info);
			$('#portlet-config').show();
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function changeType(obj){
	var type = $(obj).val();
	if(type == ''){
		$('#name_div').hide();
		$('#banner_div').hide();
		$('#text_div').hide();
	}else if(type == '0'){
		$('#name_div').show();
		$('#banner_div').hide();
		$('#text_div').hide();
	}else if(type == '1'){
		$('#name_div').hide();
		$('#banner_div').show();
		$('#text_div').hide();
	}else if(type == '2'){
		$('#name_div').hide();
		$('#banner_div').hide();
		$('#text_div').show();
	}
}

function doSubmit(){
	var id = "";
	if($('#id') != 'undefined'){
		id = $('#id').val();
	}
	var type = $('#type').val();
	if(type == ''){
		bootbox.alert("Please select type.");
		return;
	}
	var siteName = $('#siteName').val();
	var bannerUrl = $('#bannerUrl').val();
	var textMessage = $('#textMessage').val();
	if(type == '0' && siteName == ''){
		bootbox.alert("Please input the site name.");
		return;
	}else if(type == '1' && bannerUrl == ''){
		bootbox.alert("Please input the banner url.");
		return;
	}else if(type == '2' && textMessage == ''){
		bootbox.alert("Please input the text message.");
		return;
	}
	var targetUrl = $('#targetUrl').val();
	if(targetUrl == ''){
		bootbox.alert("Please input the target url.");
		return;
	}
	var postData;
	if(type == '0'){
		postData = {
				id : id,
				type : type,
				siteName : siteName,				
				targetUrl : targetUrl
			}
	}else if(type == '1'){
		postData = {
				id : id,
				type : type,
				bannerUrl : bannerUrl,
				targetUrl : targetUrl
			}
	}else if(type == '2'){
		postData = {
				id : id,
				type : type,
				textMessage : textMessage,
				targetUrl : targetUrl
			}
	}else{
		return;
	}
	$.ajax({
		type : "post",
		data : postData,
		url : "rest/common/updateSynchronizeAds",
		success : function(info) {			
			$('#portlet-config').hide();
			window.location.replace(window.location.href);
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function doDelete(id){
	$.ajax({
		type : "post",
		data : {id : id},
		url : "rest/common/deleteSynchronizeAds",
		success : function(info) {			
			$('#portlet-config').hide();
			window.location.replace(window.location.href);
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

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
	
	var assignSite = $("#site_checkbox").is(":checked");
	var assignBanner = $("#banner_checkbox").is(":checked");
	var assignText = $("#text_checkbox").is(":checked");	
	window.java.startSynchronizeAds(siteNames, $('#hiddenAds').val(), assignSite, assignBanner, assignText);
}

function doFinished(){
	$("#start_btn").attr('class', 'btn blue');
	$("#start_btn").attr('onclick', 'doStart(this)');
}

function showMonitor(siteName){
	window.java.showMonitor(siteName);
}

function refreshSite(siteName){
	window.java.refreshSite(siteName);
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
