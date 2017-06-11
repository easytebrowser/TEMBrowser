var pageNo = 1;
var pageSize = 5;
var totalPages = 0;

var Site = function() {
	return {
		// 页面初始化
		init : function() {
			// 获取分页显示内容
			Site.getContent(pageNo);

			// 绑定下拉框的change事件，改变每页显示的记录数
			$("#sel_page_size").bind("change", function() {
				pageSize = $(this).val();
				Site.getContent(1);
			});
			
			// 绑定下拉框的change事件，按状态查询
			$("#sel_status").bind("change", function() {
				Site.getContent(1);
			});

			// 绑定输入框的input事件，实现搜索功能
			$("#search_text").bind("input", function() {
				Site.getContent(1);
			});			
		},
		
		// 获取分页显示内容
		getContent : function (page) {
			$.ajax({
				type : "post",
				data : {
					pageNo : page,
					pageSize : pageSize,
					status : $('#sel_status').val(),
					searchText : $('#search_text').val()
				},
				url : "rest/admin/siteList",
				success : function(info) {
					$('#tab_list_body').html(info);

					pageNo = $("#page_no").val();
					totalPages = $("#total_pages").val();
					// 分页显示数据
					var options = {
						currentPage : pageNo, // 当前页数
						totalPages : totalPages, // 总页数
					};
					$("#paginator").bootstrapPaginator(options);
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		// 修改站点前通过id查询站点信息
		updateSiteLink : function (id) {	
			$.ajax({
				type : "post",
				data : {
					id : id
				},
				url : "rest/admin/updateSiteLink",
				success : function(info) {
					$('#update_modal').html(info);
					$('#update_modal').modal('show');

					// 表单ajaxSubmit方式提交时的参数
					var options = {
						url : 'rest/admin/updateSite',
						beforeSubmit : Site.updateRequest,
						success : Site.updateResponse
					};

					// 绑定表单以ajaxSubmit方式提交
					$('#update_site_form').submit(function() {
						$(this).ajaxSubmit(options);
						return false;
					});
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		// 修改站点表单验证
		updateRequest : function () {
			if ($.trim($("#link").val()) == '') {
				$("#error_msg").html("Link is mandatory.");
				$("#link").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#signupUrl").val()) == '') {
				$("#error_msg").html("Signup url is mandatory.");
				$("#signupUrl").focus();
				$("#error_msg_div").show();
				return false;
			}	
			if ($.trim($("#version").val()) == '') {
				$("#error_msg").html("Version is mandatory.");
				$("#version").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#price").val()) == '') {
				$("#error_msg").html("Price is mandatory.");
				$("#price").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#star").val()) == '') {
				$("#error_msg").html("Star is mandatory.");
				$("#star").focus();
				$("#error_msg_div").show();
				return false;
			}
			return true;
		},
		
		// 修改站点表单提交后的回调方法
		updateResponse : function (responseText, statusText) {	
			if (responseText == 'OK') {
				bootbox.alert("Update successfully.");
				$('#update_modal').modal('hide');
				Site.getContent(pageNo);
			} else {
				$("#error_msg").html("Server not available, please try again later.");
				$("#error_msg_div").show();
			}
		},	
		
		// 新增站点初始化
		initAddSite : function () {	
			// 表单ajaxSubmit方式提交时的参数
			var options = {
				url : 'rest/admin/addSite',
				beforeSubmit : Site.addRequest,
				success : Site.addResponse
			};

			// 绑定表单以ajaxSubmit方式提交
			$('#add_site_form').submit(function() {
				$(this).ajaxSubmit(options);
				return false;
			});
		},
		
		// 修改站点表单验证
		addRequest : function () {
			if ($.trim($("#name").val()) == '') {
				$("#error_msg").html("Site name is mandatory.");
				$("#name").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#link").val()) == '') {
				$("#error_msg").html("Link is mandatory.");
				$("#link").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#signupUrl").val()) == '') {
				$("#error_msg").html("Signup url is mandatory.");
				$("#signupUrl").focus();
				$("#error_msg_div").show();
				return false;
			}	
			if ($.trim($("#version").val()) == '') {
				$("#error_msg").html("Version is mandatory.");
				$("#version").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#createTime").val()) == '') {
				$("#error_msg").html("Online time is mandatory.");
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#price").val()) == '') {
				$("#error_msg").html("Price is mandatory.");
				$("#price").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#star").val()) == '') {
				$("#error_msg").html("Star is mandatory.");
				$("#star").focus();
				$("#error_msg_div").show();
				return false;
			}
		},
		
		// 修改站点表单提交后的回调方法
		addResponse : function (responseText, statusText) {	
			if (responseText == 'OK') {
				bootbox.alert("Don't forget to upload Banner Image and XML Template after add a new site.");
				goto('siteMgnt');
			} else {
				$("#error_msg").html("Server not available, please try again later.");
				$("#error_msg_div").show();
			}
		}
	};
}();

