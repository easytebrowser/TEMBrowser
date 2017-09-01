var pageNo = 1;
var pageSize = 10;
var totalPages = 0;

var Sites = function() {
	return {
		
		init: function (t) {
			pageNo = 1;
			totalPages = 0;
			$('#t').val(t);
			// 获取分页显示内容
			getContent(pageNo);

			$("#page_size_a").bind("change", function() {
				pageSize = $(this).val();
				getContent(1);
			});

			$("#category_a").bind("change", function() {
				getContent(1);
			});
			
			$('#search_text_a').keypress(function (e) {
		    	if (e.which == 13) {
		    		getContent(1);
		    	}
		    });

			$("#btn_search_a").bind("click", function() {
				getContent(1);
			});
			
			$("#page_size_p").bind("change", function() {
				pageSize = $(this).val();
				getContent(1);
			});

			$("#category_p").bind("change", function() {
				getContent(1);
			});
			
			$('#search_text_p').keypress(function (e) {
		    	if (e.which == 13) {
		    		getContent(1);
		    	}
		    });

			$("#btn_search_p").bind("click", function() {
				getContent(1);
			});
        },
	
		purchase : function(siteName, price, historyCount, upline) {			
			if(parseInt(historyCount) < 10){
				price = '0.00';
			}
			bootbox.setLocale("en_US");  
			bootbox.confirm("Purchase this template will cost you " + price + " point(s), continue?", function (result) {  
                if(result) {  
                	doPurchase(siteName, upline);
                } else {  
                    return;
                }  
            });
		},
		
		remove : function(siteName) {
			bootbox.setLocale("en_US");  
			bootbox.confirm("Confirm to remove this template?", function (result) {  
                if(result) {  
                	doRemove(siteName);
                } else {  
                    return;
                }  
            });
		}
	};
}();

//获取分页显示内容
function getContent(page) {
	var t = $('#t').val();
	$.ajax({
		type : "post",
		data : {
			t : t,
			pageNo : page,
			pageSize : $('#page_size_' + t).val(),
			category : $('#category_' + t).val(),
			searchText : $('#search_text_' + t).val()
		},
		url : "rest/page/loadSites",
		success : function(info) {
			$('#tbody_' + t).html(info);
			if(t != 'i'){
				pageNo = $("#page_no_" + t).val();
				totalPages = $("#total_pages_" + t).val();
				
				// 分页显示数据
				var options = {
					currentPage : pageNo, // 当前页数
					totalPages : totalPages, // 总页数
				};
				$("#paginator_" + t).bootstrapPaginator(options);
			}			
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function doPurchase(siteName, upline){
	$.ajax({
		type : "post",
		data : {
			siteName : siteName,
			upline : upline
		},
		url : "rest/userSite/purchase",
		success : function(info) {
			if(info == 'OK'){
				bootbox.alert({ 
		            message: 'This template has been added to your account successfully.',  
		            callback: function() {  
		            	$('#asite_' + siteName).remove();
		            },  
		            title: "Congratulations",  
		        });  			
			}else{
				bootbox.alert(info);
				return;
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function doRemove(siteName){
	$.ajax({
		type : "post",
		data : {
			siteName : siteName
		},
		url : "rest/userSite/remove",
		success : function(info) {
			if(info == 'OK'){
				bootbox.alert({ 
		            message: 'This template has been removed from your account successfully.',  
		            callback: function() {  
		            	$('#psite_' + siteName).remove();
		            },  
		            title: "Congratulations",  
		        });  			
			}else{
				bootbox.alert(info);
				return;
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function updateRid(siteName, obj){
	var rid = $(obj).val();
	$.ajax({
		type : "post",
		data : {
			siteName : siteName,
			rid : rid
		},
		url : "rest/userSite/updateRid",
		success : function(info) {
			if(rid == ''){
				$(obj).attr('style', 'height:25px; margin-bottom:0 !important; width:100px !important; border:1px solid #ed4e2a;');
			}else{
				$(obj).attr('style', 'height:25px; margin-bottom:0 !important; width:100px !important;');
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