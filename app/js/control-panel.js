var ControlPanel = function() {
	var dataTable;
	var initMySitesTable = function() {
		dataTable = $('#my_sites').dataTable({
			"iDisplayLength" : -1,
			"aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
			"oLanguage": {
				"sLengthMenu":  "_MENU_",
				"sSearch": ""
			},
			"bLengthChange" : true, // 不显示改变每页显示数据数量下拉框
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

		$("#my_sites_wrapper").find('div.row-fluid:first-child').find('div.span6:first-child').attr('style', 'width:70px; float:left;');
		$("#my_sites_wrapper").find('div.row-fluid:first-child').find('div.span6:last-child').attr('style', 'width:102px; float:right;');
		// modify table search input
		$('#my_sites_wrapper .dataTables_filter input').attr('style', "width:100px; height:25px;");
		$('#my_sites_wrapper .dataTables_filter input').attr('placeholder', "Search site...");
		// modify table per page dropdown
		$('#my_sites_wrapper .dataTables_length select').attr('style', 'width: 60px; height: 25px;');
		$('#my_sites_wrapper label').attr('style', 'padding:4px 0px 0px 5px;');
		$("#my_sites_wrapper").find('div.row-fluid:last-child').find('div.span6:first-child').remove();
		$("#my_sites_wrapper").find('div.row-fluid:last-child').find('div.span6:last-child').attr('style', 'width:100%; float:right;');
	}

	var initMySites = function() {
		$.ajax({
			type : "post",
			data : {},
			url : "rest/common/initMySites",
			success : function(info) {
				$("#my_sites_tbody").html(info);
				initMySitesTable();
			},
			error : function() {
				bootbox.alert("Server not available, please try again later.");
			}
		});
	}

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
	}

	return {
		init : function() {
			initMySites();
			initSurfingSites('T');
			initSurfingSites('M');
		},
		
		reload : function() {	
			dataTable.fnClearTable();
			dataTable.fnDestroy();
			initMySites();	
			window.java.reloadSites();
		},
		
		refresh : function() {
			dataTable.fnClearTable();
			dataTable.fnDestroy();
			initMySites();	
			initSurfingSites('T');
			initSurfingSites('M');
			window.java.reloadSites();
		}
	};
}();


function add2SurfingSites(siteName, category) {
	var obj = $('#my_sites_btn_' + siteName);
	$.ajax({
		type : "post",
		data : {
			siteName : siteName,
			category : category
		},
		dataType: "html",
		url : "rest/userSite/add2SurfingSites",
		success : function(info) {
			$(obj).parent().html('<button class="btn disable btn-block" title="Already in Surfing List"><i class="m-icon-swapdown m-icon-white"></i></button>');			
			if(category == '0'){
				$('#surfing_tes_tbody').append(info);
			}else{
				$('#surfing_mailers_tbody').append(info);
			}			
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function deleteFromSurfingSites(obj, category) {
	var nTr = $(obj).parents('tr')[0];
	if($(nTr).find('i:first-child').attr('class') == 'icon-stop'){
		bootbox.alert("This site is surfing, please stop it first.");
		return;
	}
	var siteName = $(nTr).find('button:first-child').val();
	$.ajax({
		type : "post",
		data : {
			siteName : siteName
		},
		url : "rest/userSite/deleteFromSurfingSites",
		success : function(info) {
			if(info == 'SUCCESS'){
				$(nTr).next().remove();
				$(nTr).remove();
				var color = "blue";
				if(category == '1'){
					color = "purple";
				}
				$('#my_sites_' + siteName).html('<button class="btn ' + color + ' btn-block" title="Add To Surfing List" value="' + siteName + '" onclick="add2SurfingSites(this,' + category + ')"><i class="m-icon-swapdown m-icon-white"></i></button>');
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
	var status = window.java.startSurfing($(obj).val());
	if (status == 'ERROR') {
		alert("The page is loading, please wait for a moment.");
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
		'class': 'btn icn-only',
		'title': 'Start Surfing',
		'onclick': 'doSurf(this)'
	});
	$(obj).html('<i class="icon-play"></i>');
}

function startAll(status){
	if(status == 'T'){
		$('#surfing_tes_tbody').find('button.btn').each(function () {
			var iClass = $(this).find('i:first-child').attr('class');
			if(iClass == 'icon-play'){
				$(this).trigger('click');
			}		
		});
	}else{
		$('#surfing_mailers_tbody').find('button.btn').each(function () {
			var iClass = $(this).find('i:first-child').attr('class');
			if(iClass == 'icon-play'){
				$(this).trigger('click');
			}		
		});
	}	
}

function stopAll(status){
	if(status == 'T'){
		$('#surfing_tes_tbody').find('button.btn').each(function () {
			var iClass = $(this).find('i:first-child').attr('class');
			if(iClass == 'icon-stop'){
				$(this).trigger('click');
			}		
		});
	}else{
		$('#surfing_mailers_tbody').find('button.btn').each(function () {
			var iClass = $(this).find('i:first-child').attr('class');
			if(iClass == 'icon-stop'){
				$(this).trigger('click');
			}		
		});
	}	
}

function deleteAll(status){
	if(status == 'T'){
		$('#surfing_tes_tbody').find('button.btn').each(function () {
			var iClass = $(this).find('i:first-child').attr('class');
			if(iClass == 'icon-remove icon-white'){
				var nTr = $(this).parents('tr')[0];
				if($(nTr).find('i:first-child').attr('class') == 'icon-play'){
					deleteFromSurfingSites(this, '0');
				}
			}
		});
	}else{
		$('#surfing_mailers_tbody').find('button.btn').each(function () {
			var iClass = $(this).find('i:first-child').attr('class');
			if(iClass == 'icon-remove icon-white'){
				var nTr = $(this).parents('tr')[0];
				if($(nTr).find('i:first-child').attr('class') == 'icon-play'){
					deleteFromSurfingSites(this, '1');
				}
			}
		});
	}
}

function changeTab(siteName){
	window.java.goPage(siteName, '');
}

function stopFromJava(siteName) {
	var obj = $('#surfing_site_' + siteName);
	if(obj != 'undefined'){
		$(obj).attr({
			'class': 'btn icn-only',
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
	$(obj).html('<td>Special Promo($): ' + str + '</td>');
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