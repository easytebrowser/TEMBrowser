var ControlPanel = function() {
	var dataTable;
	var initMySitesTable = function() {
		dataTable = $('#my_sites').dataTable({
			"iDisplayLength" : -1,
			"aLengthMenu": [[-1], ["All"]],
			"oLanguage": {
				"sLengthMenu":  "_MENU_",
				"sSearch": ""
			},
			"bLengthChange" : false, // 不显示改变每页显示数据数量下拉框
			"bInfo" : false,// 不显示页脚信息
			"aoColumnDefs" : [{
				'bSortable' : false,
				'aTargets' : [1]
			}, {
				'bSortable' : false,
				'aTargets' : [2]
			}, {
				'bSortable' : false,
				'aTargets' : [3]
			}]
		});	
		
		$('#my_sites').attr('width', '100%');

		$("#my_sites_wrapper").find('div.row-fluid:first-child').find('div.span6:first-child').attr('style', 'width:0px; float:left;');
		$("#my_sites_wrapper").find('div.row-fluid:first-child').find('div.span6:last-child').attr('style', 'width:100%; float:right;');
		// modify table search input
		$('#my_sites_wrapper .dataTables_filter input').attr('style', "width:100%; height:25px;");
		$('#my_sites_wrapper .dataTables_filter input').attr('placeholder', "Search site...");
		// modify table per page dropdown
		$("#my_sites_wrapper").find('div.row-fluid:last-child').find('div.span6:first-child').remove();
		$("#my_sites_wrapper").find('div.row-fluid:last-child').find('div.span6:last-child').remove();
		$('#mysites_th_action').attr('style', 'width:20px;')
	}
	
	var initMySites = function() {
		$.ajax({
			type : "post",
			data : {},
			url : "rest/common/initMySites",
			success : function(info) {
				$("#mysites_tbody").html(info);
				initMySitesTable();
			},
			error : function() {
				bootbox.alert("Server not available, please try again later.");
			}
		});
	}
	
	var initMyGroups = function() {
		$.ajax({
			type : "post",
			data : {},
			url : "rest/common/initMyGroups",
			success : function(info) {
				$("#accordion").html(info);
				$('.group_tbody').on('click', ' .row-details', function() {					
					var nTr = $(this).parents('tr')[0];
					if ($(nTr).next().is(':visible')) {
						$(nTr).next().hide();
					} else {
						$(nTr).next().show();
					}					
				});	
			},
			error : function() {
				bootbox.alert("Server not available, please try again later.");
			}
		});
	}

	
/*
	var initSurfingSites = function(status){
		$.ajax({
			type : "post",
			data : {
				status : status
			},
			url : "rest/common/initSurfingSites",
			success : function(info) {
				if(status == 'T'){
					$("#surfing_tes_tbody").html(info);
					$('#surfing_tes').on('click', ' tbody .row-details', function() {					
						var nTr = $(this).parents('tr')[0];
						if ($(nTr).next().is(':visible')) {
							$(nTr).next().hide();
						} else {
							$(nTr).next().show();
						}					
					});	
				}else{
					$("#surfing_mailers_tbody").html(info);
					$('#surfing_mailers').on('click', ' tbody .row-details', function() {					
						var nTr = $(this).parents('tr')[0];
						if ($(nTr).next().is(':visible')) {
							$(nTr).next().hide();
						} else {
							$(nTr).next().show();
						}					
					});	
				}	
			},
			error : function() {
				bootbox.alert("Server not available, please try again later.");
			}
		});
	}*/

	return {
		init : function() {
			initMySites();
			initMyGroups();
			window.java.reloadSites();
		//	initSurfingSites('T');
		//	initSurfingSites('M');
		},
		
		reload : function() {	
			dataTable.fnClearTable();
			dataTable.fnDestroy();
			initMySites();	
			window.java.reloadSites();
		},
		
//		refresh : function() {
//			dataTable.fnClearTable();
//			dataTable.fnDestroy();
//			initMySites();	
//			initSurfingSites('T');
//			initSurfingSites('M');
//			window.java.reloadSites();
//		},
		
		remove : function() {
			window.java.removeControlPanel();
		},
		
		reloadAfterRemoveGroup : function() {
			dataTable.fnClearTable();
			dataTable.fnDestroy();
			initMySites();	
		}
	};
}();


function add2Group(obj, category) {
	var groupId = '';
	$("#accordion").find('div.accordion-body').each(function(){
		if($(this).hasClass('in')){
			groupId = $(this).attr('id');
			groupId = groupId.substring(groupId.indexOf('_') + 1, groupId.length);
		}
	});
	if(groupId == ''){
		bootbox.alert("Please select a group to add");
		return;
	}	
	var groupName = $('#group_name_' + groupId).html();
	$.ajax({
		type : "post",
		data : {
			siteName : $(obj).val(),
			groupId : groupId,
			groupName : groupName,
			category : category
		},
		url : "rest/userSite/add2Group",
		success : function(info) {
			$(obj).attr({
				'class': 'btn disable btn-block',
				'title': "Already in group '" + groupName + "'",
				'onclick': "javascript:;"
			});			
			$('#group_tbody_' + groupId).append(info);		
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function deleteFromGroup(obj, category) {
	var nTr = $(obj).parents('tr')[0];
	if($(nTr).find('i:first-child').attr('class') == 'icon-stop'){
		bootbox.alert("This site is surfing, please stop it.");
		return;
	}
	var siteName = $(nTr).find('button:first-child').val();
	$.ajax({
		type : "post",
		data : {
			siteName : siteName
		},
		url : "rest/userSite/deleteFromGroup",
		success : function(info) {
			if(info == 'SUCCESS'){
				$(nTr).next().remove();
				$(nTr).remove();
				var color = "blue";				
				if(category == '1'){
					color = "purple";
				}
				$('#mysites_btn_' + siteName).attr({
					'class': 'btn ' + color + ' btn-block',
					'title': 'Add to surfing group',
					'onclick': "add2Group(this, '" + category + "')"
				});	
			} else {
				bootbox.alert("Server not available, please try again later.");
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function removeGroup(groupId){
	$.ajax({
		type : "post",
		data : {
			groupId : groupId
		},
		url : "rest/userSite/removeGroup",
		success : function(info) {
			if(info == 'SUCCESS'){
				$('#group_' + groupId).remove();
				ControlPanel.reloadAfterRemoveGroup();
			} else {
				bootbox.alert("Server not available, please try again later.");
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function doSurf(obj) {
	var status = window.java.startSurfing($(obj).val(), "1");
	if (status == 'ERROR') {
		alert("Can not load template, please try again later or contact admin");
	} else if (status == 'SUCCESS') {
		$(obj).attr({
			'class': 'btn green icn-only',
			'title': 'Stop Surfing',
			'onclick': 'doStop(this)'
		});
		$(obj).html('<i class="icon-stop"></i>');		
	}
}

function doStop(obj) {
	var status = window.java.stopSurfing($(obj).val());
	$(obj).attr({
		'class': 'btn btn-block',
		'title': 'Start Surfing',
		'onclick': 'doSurf(this)'
	});
	$(obj).html('<i class="icon-play"></i>');
}

function startAll(groupId){
	$('#group_tbody_' + groupId).find('button.btn').each(function () {
		var iClass = $(this).find('i:first-child').attr('class');
		if(iClass == 'icon-play'){
			$(this).trigger('click');
		}		
	});	
}

function stopAll(groupId){
	$('#group_tbody_' + groupId).find('button.btn').each(function () {
		var iClass = $(this).find('i:first-child').attr('class');
		if(iClass == 'icon-stop'){
			$(this).trigger('click');
		}		
	});
}

function deleteAll(groupId){
	$('#group_tbody_' + groupId).find('button.btn').each(function () {
		var iClass = $(this).find('i:first-child').attr('class');
		if(iClass == 'icon-remove icon-white'){
			var nTr = $(this).parents('tr')[0];
			if($(nTr).find('i:first-child').attr('class') == 'icon-play'){
				deleteFromGroup(this);
			}
		}
	});	
}

function changeTab(siteName){
	window.java.goPage(siteName, '');
}

function stopFromJava(siteName) {
	var obj = $('#surfing_site_' + siteName);
	if(obj != 'undefined'){
		$(obj).attr({
			'class': 'btn btn-block',
			'title': 'Start Surfing',
			'onclick': 'doSurf(this)'
		});
		$(obj).html('<i class="icon-play"></i>');
	}
}

function goCommissionPage(siteName) {
	window.java.goPage(siteName, 'COMMISSION');
}

function goCreditPage(siteName) {
	window.java.goPage(siteName, 'CREDIT');
}

function goRewardPage(siteName) {
	window.java.goPage(siteName, 'REWARD');
}

function goCodePage(siteName) {
	window.java.goPage(siteName, 'CODE');
}

function goSendMailPage(siteName){
	window.java.goPage(siteName, 'SEND-MAIL');
}

function rewardChanged(siteName, str) {
	var obj = $('#' + siteName + "_reward");
	$(obj).html('<td>Daily Rewards($): ' + str + '</td>');
	$(obj).show();
	$(obj).find('a.btn').each(function () {
		var aClick = $(this).attr('onclick');
		if(aClick != null){
			$(this).attr("onclick", "goRewardPage('" + siteName +"')");
			$('#' + siteName + "_reward_tr").show();
		}		
	});
}

function promoChanged(siteName, str) {
	var obj = $('#' + siteName + "_promo");
	$(obj).html('<td>Cross Promos: ' + str + '</td>');
	$(obj).show();
	$(obj).find('a.btn').each(function () {
		var aClick = $(this).attr('onclick');
		if(aClick != null){
			$(this).attr("onclick", "goRewardPage('" + siteName +"')");
			$('#' + siteName + "_reward_tr").show();
		}		
	});
}

function codeChanged(siteName, str) {
	var obj = $('#' + siteName + "_code");
	$(obj).html('<td>Surf Codes($): ' + str + '</td>');
	$(obj).show();
	$(obj).find('a.btn').each(function () {
		var aClick = $(this).attr('onclick');
		if(aClick != null){
			$(this).attr("onclick", "goCodePage('" + siteName +"')");
			$('#' + siteName + "_reward_tr").show();
		}		
	});
}

function changeGoal(siteName, obj){
	var goal = $(obj).val();
	window.java.changeGoal(siteName, goal);
	
}

function changeSendMailAlert(status, siteName, text){
	if(status == '1'){
		$('#' + siteName + '_alert_icon').attr({
			'class': 'btn green btn-block',
			'title': 'Available to send mail now',
			'onclick': "goSendMailPage('" + siteName + "')"
		});
	}else{
		if(text == ''){
			text = 'Can not send mail yet';
		}
		$('#' + siteName + '_alert_icon').attr({
			'class': 'btn disable btn-block',
			'title': text,
			'onclick': "javascript:;"
		});
	}
}

var bubbles = [];
function showPPC(id, bannerUrl){
	Array.prototype.contains = function(item){
	    return RegExp(item).test(this);
	};
	if(bubbles.contains(id) == true || bubbles.length > 5){
		return;
	}	
	
	CreateBubble(id, bannerUrl);
	$('#ppc_' + id).click(function(){		
		$('#ppc_' + id).remove();
		window.open('rest/common/ppc/?id=' + id);
	});
	bubbles.push(id);
}

function gmailHelper(){
	window.java.gmailHelper();
}

function synchronizeAds(status){
	window.java.synchronizeAds(status);
}

function dailyDeals(){
	window.java.dailyDeals();
}

function doCreateGroup(){
	var groupName = $.trim($('#modal_group_name').val());
	if(groupName == ''){
		bootbox.alert("Please input group name.");
		return;
	}
	$.ajax({
		type : "post",
		data : {
			groupName : groupName,
			color : $('#modal_color').val()
		},
		url : "rest/page/createGroup",
		success : function(info) {
			$('#portlet-config').modal('hide');
			$('#accordion').append(info);			
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function selectGroupColor(obj, color){
	$('#ul_color').find('li').each(function () {
		$(this).attr("style", "");		
	});
	$(obj).attr('style', 'border: 2px solid gold;');
	$('#modal_color').val(color);
}