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
				'aTargets' : [0]
			}, {
				'bSortable' : false,
				'aTargets' : [2]
			}, {
				'bSortable' : false,
				'aTargets' : [3]
			}, {
				'bSortable' : false,
				'aTargets' : [4]
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
		$('#mysites_th_action').attr('style', 'width:20px;');
		$('#my_sites_row').resize(function(){
			initDivHeight();
			initGroupTitle(0);
		});
		initDivHeight();
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
				$("#group_row").html(info);
				$('.group_tbody').on('click', ' .row-details', function() {					
					var nTr = $(this).parents('tr')[0];
					if ($(nTr).next().is(':visible')) {
						$(nTr).next().hide();
					} else {
						$(nTr).next().show();
					}					
				});	
				initDivHeight();
				initGroupTitle(0);
			},
			error : function() {
				bootbox.alert("Server not available, please try again later.");
			}
		});
	}
	
	var initConnect = function() {
		connect();
		 $('#chat_message').keypress(function (e) {
			 if (e.which == 13) {
				 sendMessage();
			 }
		 });
	}
	
	return {
		init : function() {
			initMySites();
			initMyGroups();
			initConnect();
			window.java.reloadSites();
		},
		
		reload : function() {	
			dataTable.fnClearTable();
			dataTable.fnDestroy();
			initMySites();	
			window.java.reloadSites();
		},
		
		remove : function() {
			window.java.removeControlPanel();
		}
	};
}();

function add2Group(obj, siteName, category) {
	var groupId = '';
	$("#group_row").find('div.row-fluid').each(function(){
		if($(this).is(':visible')){
			groupId = $(this).attr('id');
			groupId = groupId.substring(groupId.indexOf('_') + 1, groupId.length);
		}
	});
	if(groupId == ''){
		bootbox.alert("Please select a group to add");
		return;
	}
	$.ajax({
		type : "post",
		data : {
			usId : $(obj).val(),
			groupId : groupId,
			siteName : siteName,
			category : category
		},
		url : "rest/userSite/add2Group",
		success : function(info) {
			$('#group_tbody_' + groupId).append(info);	
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

function deleteFromGroup(obj) {
	var nTr = $(obj).parents('tr')[0];
	if($(nTr).find('i:first-child').attr('class') == 'icon-stop'){
		bootbox.alert("This site is surfing, please stop it.");
		return;
	}
	var groupId = '';
	$("#group_row").find('div.row-fluid').each(function(){
		if($(this).is(':visible')){
			groupId = $(this).attr('id');
			groupId = groupId.substring(groupId.indexOf('_') + 1, groupId.length);
		}
	});
	$.ajax({
		type : "post",
		data : {
			ugsId : $(obj).val()
		},
		url : "rest/userSite/deleteFromGroup",
		success : function(info) {
			if(info == 'SUCCESS'){
				$(nTr).next().remove();
				$(nTr).remove();
				$('#group_title_' + groupId).html(parseInt($.trim($('#group_title_' + groupId).html())) - 1);
			} else {
				bootbox.alert("Server not available, please try again later.");
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function renameGroup(groupId, groupName){
	$('#rename_group_name').val(groupName);
	$('#rename_group_id').val(groupId);
	$('#portlet-rename').modal('show');
}

function doRenameGroup(){
	var groupName = $.trim($('#rename_group_name').val());
	if(groupName == ''){
		bootbox.alert("Please input group name.");
		return;
	}
	var groupId = $('#rename_group_id').val();
	$.ajax({
		type : "post",
		data : {
			groupId : groupId,
			groupName : groupName
		},
		url : "rest/page/renameGroup",
		success : function(info) {
			$('#portlet-rename').modal('hide');
			$('#group_name_' + groupId).html(groupName);
			$('#group_title_' + groupId).attr('title', groupName);
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
				$('#group_title_' + groupId).remove();
				$("#group_row").find('div.row-fluid:first-child').show();
				initDivHeight();
				$('#group_title').find('div.tools.group').find('span.btn:first-child').addClass('active');
				initGroupTitle(0);
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
	$("#group_row").find('button.btn.green.icn-only').each(function(){
		if($(this).val() == siteName){
			$(this).attr({
				'class': 'btn btn-block',
				'title': 'Start Surfing',
				'onclick': 'doSurf(this)'
			});
			$(this).html('<i class="icon-play"></i>');
		}
	});	
}

function changeClicked(siteName, clicked) {
	$("#group_row").find('td.row-details.clicked_' + siteName).each(function(){
		$(this).html(clicked);
	});
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

function rewardChanged(siteName, str, isShown) {
	$("#group_row").find('tr.reward_tr_' + siteName).each(function(){
		if(isShown == '1'){
			$(this).show();
		}else{
			$(this).hide();
		}
		var obj = $(this).find('tr.reward_' + siteName);
		$(obj).html('<td>Daily Rewards($): ' + str + '</td>');
		$(obj).show();	
		$(obj).find('a.btn').each(function () {
			var aClick = $(this).attr('onclick');
			if(aClick != null){
				$(this).attr("onclick", "goRewardPage('" + siteName +"')");				
			}		
		});
	});	
}

function promoChanged(siteName, str, isShown) {
	$("#group_row").find('tr.reward_tr_' + siteName).each(function(){
		if(isShown == '1'){
			$(this).show();
		}else{
			$(this).hide();
		}
		var obj = $(this).find('tr.promo_' + siteName);
		$(obj).html('<td>Cross Promos: ' + str + '</td>');
		$(obj).show();
		$(obj).find('a.btn').each(function () {
			var aClick = $(this).attr('onclick');
			if(aClick != null){
				$(this).attr("onclick", "goRewardPage('" + siteName +"')");
			}		
		});
	});	
}

function codeChanged(siteName, str) {
	$("#group_row").find('tr.reward_tr_' + siteName).each(function(){
		$(this).show();
		var obj = $(this).find('tr.code_' + siteName);
		$(obj).html('<td>Surf Codes($): ' + str + '</td>');
		$(obj).show();
		$(obj).find('a.btn').each(function () {
			var aClick = $(this).attr('onclick');
			if(aClick != null){
				$(this).attr("onclick", "goCodePage('" + siteName +"')");
			}		
		});
	});	
}

function changeGoal(siteName, obj){
	var goal = $(obj).val();
	if(goal == ''){
		goal = '0';
	}
	window.java.changeGoal(siteName, goal);	
}

function changeSendMailAlert(status, siteName, text){
	if(status == '1'){
		$("#group_row").find('span.btn.disable.btn-block.alert_' + siteName).each(function(){
			$(this).attr({
				'class': 'btn green btn-block alert_' + siteName,
				'title': 'Available to send mail now',
				'onclick': "goSendMailPage('" + siteName + "')"
			});
		});	
	}else{
		$("#group_row").find('span.btn.green.btn-block.alert_' + siteName).each(function(){
			if(text == ''){
				text = 'Can not send mail yet';
			}
			$(this).attr({
				'class': 'btn disable btn-block alert_' + siteName,
				'title': text,
				'onclick': "javascript:;"
			});
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
	var color = $('#modal_color').val();
	$.ajax({
		type : "post",
		data : {
			groupName : groupName,
			color : color
		},
		url : "rest/page/createGroup",
		success : function(info) {
			$('#portlet-config').modal('hide');
			$('#group_row').append(info);
			$("#group_row").find('div.row-fluid').each(function(){
				$(this).hide();		
			});	
			var obj = $('#group_row').find('div.row-fluid:last-child');
			$(obj).show();
			var groupId = $(obj).attr('id');
			groupId = groupId.substring(groupId.indexOf('_') + 1, groupId.length);
			
			$('#group_title').find('div.tools.group').find('span.btn').each(function(){
				$(this).removeClass('active');
			})			

//			var newGroup = $('#group_title').find('div.tools.group').find('span.btn:last-child').clone();
//			$(obj).attr({
//				'id': 'group_title_' + groupId,
//				'onclick': "showHideGroup('" + groupId + "')",
//				'class': 'btn mini ' + color,
//				'title': groupName
//			});
//			
//			$(newGroup).attr('id', 'group_title_' + groupId);
			
			$('#group_title').find('div.tools.group').append('<span id="group_title_' + groupId + '" onclick="showHideGroup(\'' + groupId + '\')" class="btn mini ' + color + '" title="' + groupName + '">0</span>');
			$('#group_title_' + groupId).addClass('active');
			initDivHeight();
			initGroupTitle(-1);
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

function showHideMySites(obj){
	var type = $(obj).attr('class');
	var top = '254px';
	if(type == 'collapse'){
		top = '57px';		
	}else{
		$("#group_row").show();
		$('#chat_row').attr('style', 'height:26px;max-height:26px');
		$('#collapse_chats').attr('class', 'expand');
	}
	$('#group_row').attr('style', 'top:' + top);
	initDivHeight();
}

function initDivHeight(){
	var top = parseInt($('#my_sites_row').outerHeight(true)) + 29;
	$('#group_row').attr('style', 'top:' + top);
	
	var height;
	$("#group_row").find('div.row-fluid').each(function(){
		if($(this).is(":visible")){
			height = parseInt($(this).outerHeight(true) - 55);
			$(this).find('div.portlet-body').attr('style', 'height:' + height + 'px;max-height:' + height + 'px');
		}		
	});
	
//	var collapseChats = $('#collapse_chats').attr('class');
//	alert(collapseChats);
//	if(collapseChats == 'collapse'){
//		$("#group_row").hide();
//		$('#chat_row').attr('style', 'height:' + (height + 56) + 'px;max-height:' + (height + 56) + 'px');
//	}else{
//		$("#group_row").show();
//		$('#chat_row').attr('style', 'height:26px;max-height:26px');
//		$('#collapse_chats').attr('class', 'expand');
//	}
}

function showHideChats(){
	var collapseChats = $('#collapse_chats').attr('class');
	if(collapseChats == 'expand'){
		var height = parseInt($('#my_sites_row').outerHeight(true)) + parseInt($('#group_row').outerHeight(true)) + 29;
		$('#my_sites_row').hide();
		$("#group_title").hide();
		$("#group_row").hide();
		$('#chat_row').attr('style', 'height:' + height + 'px;max-height:' + height + 'px');		
		$('.slimScrollDiv').attr('style', 'height:' + (height - 104) + 'px;margin-top:5px');
		$('#blink').html('0');
		$('#blink').attr('class', '');
	}else{
		$('#chat_row').attr('style', 'height:28px;max-height:28px');
		$('#my_sites_row').show();
		$("#group_title").show();
		$("#group_row").show();
	}
}

function showHideGroup(groupId){
	$("#group_row").find('div.row-fluid').each(function(){
		$(this).hide();		
	});	
	$('#group_' + groupId).show();
	initDivHeight();
	
	$('#group_title').find('div.tools.group').find('span.btn').each(function(){
		$(this).removeClass('active');
	})
	$('#group_title_' + groupId).addClass('active');
}

function initGroupTitle(type){
	var totalWidth = parseInt($('#group_title').find('div.portlet-title').width()) - 60 - 40;
	var groupBtns = $('#group_title').find('div.tools.group');
	$(groupBtns).width(totalWidth);

	if(type == -1){
		var index1, index2;
		var temp = $(groupBtns).find('span.btn').get().sort(function(x, y){
			index1 = $(x).parent().find('span.btn').index($(x));
			index2 = $(y).parent().find('span.btn').index($(y));
			return index2 - index1;
		});
		
		var i = 1;
		var flagUp = false;
		var flagDown = false;
		$(temp).each(function(){		
			if(i * 26 > totalWidth){
				$(this).hide();
				flagUp = true;
			}else{
				$(this).show();
			}
			i++;
		});
		$('#group_btn_down').hide();
		if(flagUp){
			$('#group_btn_up').show();
		}else{
			$('#group_btn_up').hide();
		}
	}else if(type == 0){		
		var i = 1;
		var flagUp = false;
		var flagDown = false;
		$(groupBtns).find('span.btn').each(function(){		
			if(i * 26 > totalWidth){
				$(this).hide();
				flagDown = true;
			}else{
				$(this).show();
			}
			i++;
		});
		$('#group_btn_up').hide();
		if(flagDown){
			$('#group_btn_down').show();
		}else{
			$('#group_btn_down').hide();
		}
	}else if(type == 1){
		var index1, index2;
		var temp = $(groupBtns).find('span.btn').get().sort(function(x, y){
			index1 = $(x).parent().find('span.btn').index($(x));
			index2 = $(y).parent().find('span.btn').index($(y));
			return index2 - index1;
		});
		
		var gid = "";
		$(temp).each(function(){				
			var style = $(this).attr('style');		
			if(typeof(style) == 'undefined' || style.indexOf('display: none') == -1){
				gid = $(this).attr('id');
			}
		});
		
		var shown = false;
		var flagUp = false;
		var flagDown = false;
		var i = 1;
		$(temp).each(function(){
			$(this).hide();
			if($(this).attr('id') == gid){				
				shown = true;				
			}else{
				if(shown){
					if(i * 26 > totalWidth){
						$(this).hide();
						flagUp = true;
					}else{
						$(this).show();
					}
					i++;
				}
			}			
		});
		$('#group_btn_down').show();
		if(flagUp){
			$('#group_btn_up').show();
		}else{
			$('#group_btn_up').hide();
		}
	}else if(type == 2){
		var gid = "";
		$(groupBtns).find('span.btn').each(function(){				
			var style = $(this).attr('style');		
			if(typeof(style) == 'undefined' || style.indexOf('display: none') == -1){
				gid = $(this).attr('id');
			}
		});
		
		var shown = false;
		var flagUp = false;
		var flagDown = false;
		var i = 1;
		$(groupBtns).find('span.btn').each(function(){
			$(this).hide();
			if($(this).attr('id') == gid){				
				shown = true;				
			}else{
				if(shown){
					if(i * 26 > totalWidth){
						$(this).hide();
						flagDown = true;
					}else{
						$(this).show();
					}
					i++;
				}
			}			
		});
		$('#group_btn_up').show();
		if(flagDown){
			$('#group_btn_down').show();
		}else{
			$('#group_btn_down').hide();
		}
	}	
}

var socket;
function connect() {
	if ('WebSocket' in window) {
		socket = new WebSocket('ws://tembrowser.com/rest/websocket');
		socket.onmessage = function(evt) {
			var received_msg = JSON.parse(evt.data);
			showMessage(received_msg);
		}
	} else {
		console.log('Websocket not supported');
	}
}

function sendMessage() {  
    var chatMessage = $('#chat_message').val();
    var chatTo = $('#chat_to').val();
    $('#chat_message').val('');
    socket.send(JSON.stringify({ 'to': chatTo, 'content': chatMessage }));  
}  

function showMessage(message) {
	if(message.type == '0'){
		$('#ul_online_users').html('<li><a href="javascript:;" onclick="selectChatUser(\'\', \'\')"><img src="media/image/all_users.gif" style="border:2px solid #e5e5e5;"> Send to all users</a></li>');
		var users = message.content;
		for(var i = 0; i < users.length; i++){
			var username = users[i].username;
			var md5Email = users[i].md5Email;
			var status = users[i].status;
			var title = '';
			var color = '';
			if(status == '9'){
				if(username == 'easytebrowser'){
					title = 'Administrator';
					color = 'goldenrod';
				}else if(username == 'Oasis'){
					title = 'CEO & Manager';
					color = 'goldenrod';
				}else if(username == 'bonus'){
					title = 'Manager';
					color = 'goldenrod';
				}else if(username == 'moby04'){
					title = 'Technical manager';
					color = 'goldenrod';
				}else{
					title = 'Upgraded member';
					color = '#35aa47';
				}
			}else{
				title = 'Free member';
				color = '#e5e5e5';
			}
			var str = '<li><a href="javascript:;" title="' + title + '" onclick="selectChatUser(\'' + username + '\', \'' + md5Email + '\')"><img src="http://gravatar.com/avatar/' + md5Email + '?s=45&d=&r=g" style="border: 2px solid ' + color + '"> ' + username + '</a></li>';
			$('#ul_online_users').append(str);
		}
	}else if(message.type == '1'){
		var username = $('#username').val();
		if(username == message.from){
			var str = '<li class="out"><img class="avatar" src="http://gravatar.com/avatar/' + message.md5Email + '?s=45&d=&r=g"><div class="message"><span class="arrow"></span><a href="javascript:;" class="name" onclick="selectChatUser(\'' + message.from + '\', \'' + message.md5Email + '\')">' + message.from + '</a><span class="datetime">' + message.time + '</span><span class="body">' + message.content + '</span></div></li>';
			$('#ul_chats').append(str);
			
		}else{
			var str = '<li class="in"><img class="avatar" src="http://gravatar.com/avatar/' + message.md5Email + '?s=45&d=&r=g"><div class="message"><span class="arrow"></span><a href="javascript:;" class="name" onclick="selectChatUser(\'' + message.from + '\', \'' + message.md5Email + '\')">' + message.from + '</a><span class="datetime">' + message.time + '</span><span class="body">' + message.content + '</span></div></li>';
			$('#ul_chats').append(str);
		}
		var collapseChats = $('#collapse_chats').attr('class');
		if(collapseChats == 'expand'){
			$('#blink').html(parseInt($('#blink').html()) + 1);
			$('#blink').attr('class', 'blink');
		}
		$('.scroller').scrollTop($('.scroller')[0].scrollHeight);
	}else{
		
	}
}

function selectChatUser(username, md5Email){
	$('#chat_to').val(username);
	if(username == ''){		
		$('#btn_select_user').html('<i class="m-icon-big-swapright m-icon-white"></i>');
	}else{
		$('#btn_select_user').html('<img src="http://gravatar.com/avatar/' + md5Email + '?s=29&d=&r=g">');
	}
	$('#portlet-online-users').modal('hide');
}
