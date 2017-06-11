var pageNo = 1;
var pageSize = 5;
var totalPages = 0;

var Advertising = function() {
	return {
		// 页面初始化
		init : function() {
			// 获取分页显示内容
			getContent(pageNo);

			// 绑定下拉框的change事件，改变每页显示的记录数
			$("#sel_page_size").bind("change", function() {
				pageSize = $(this).val();
				getContent(1);
			});
			
			// 绑定下拉框的change事件，按状态查询
			$("#sel_type").bind("change", function() {
				getContent(1);
			});
			$("#sel_status").bind("change", function() {
				getContent(1);
			});		
		},

		// 修改前通过id查询
		updateAdvertisingLink : function (id) {	
			$.ajax({
				type : "post",
				data : {
					id : id
				},
				url : "rest/admin/updateAdvertisingLink",
				success : function(info) {
					$('#update_modal').html(info);
					$('#update_modal').modal('show');

					// 表单ajaxSubmit方式提交时的参数
					var options = {
						url : 'rest/admin/updateAdvertising',
						beforeSubmit : Advertising.updateRequest,
						success : Advertising.updateResponse
					};

					// 绑定表单以ajaxSubmit方式提交
					$('#update_advertising_form').submit(function() {
						$(this).ajaxSubmit(options);
						return false;
					});
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		// 修改用户表单验证
		updateRequest : function () {
			if ($.trim($("#siteName").val()) == '') {
				$("#error_msg").html("Site name is mandatory.");
				$("#siteName").focus();
				$("#error_msg_div").show();
				return false;
			}	
			if ($.trim($("#linkUrl").val()) == '') {
				$("#error_msg").html("Link url is mandatory.");
				$("#linkUrl").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#bannerUrl").val()) == '') {
				$("#error_msg").html("Banner url is mandatory.");
				$("#bannerUrl").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#quantity").val()) == '') {
				$("#error_msg").html("Quantity is mandatory.");
				$("#quantity").focus();
				$("#error_msg_div").show();
				return false;
			}
			if ($.trim($("#timer").val()) == '') {
				$("#error_msg").html("Timer is mandatory.");
				$("#timer").focus();
				$("#error_msg_div").show();
				return false;
			}
			return true;
		},
		
		// 修改表单提交后的回调方法
		updateResponse : function (responseText, statusText) {	
			if (responseText == 'OK') {
				bootbox.alert("Update successfully.");
				$('#update_modal').modal('hide');
				getContent(pageNo);
			} else {
				$("#error_msg").html("Server not available, please try again later.");
				$("#error_msg_div").show();
			}
		}
		
	};
}();

//获取分页显示内容
function getContent (page) {
	$.ajax({
		type : "post",
		data : {
			pageNo : page,
			pageSize : pageSize,
			type : $('#sel_type').val(),
			status : $('#sel_status').val()
		},
		url : "rest/admin/advertisingList",
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
}
