var pageNo = 1;
var pageSize = 5;
var totalPages = 0;

var Cashout = function() {
	return {
		// 页面初始化
		init : function() {
			// 获取分页显示内容
			Cashout.getContent(pageNo);

			// 绑定下拉框的change事件，改变每页显示的记录数
			$("#sel_page_size").bind("change", function() {
				pageSize = $(this).val();
				Cashout.getContent(1);
			});		
		},
		
		// 获取分页显示内容
		getContent : function (page) {
			$.ajax({
				type : "post",
				data : {
					pageNo : page,
					pageSize : pageSize
				},
				url : "rest/admin/cashoutList",
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
		
		// 修改前通过id查询
		updateCashoutLink : function (id) {	
			$.ajax({
				type : "post",
				data : {
					id : id
				},
				url : "rest/admin/updateCashoutLink",
				success : function(info) {
					$('#update_modal').html(info);
					$('#update_modal').modal('show');

					// 表单ajaxSubmit方式提交时的参数
					var options = {
						url : 'rest/admin/updateCashout',
						beforeSubmit : Cashout.updateRequest,
						success : Cashout.updateResponse
					};

					// 绑定表单以ajaxSubmit方式提交
					$('#update_cashout_form').submit(function() {
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
			return true;
		},
		
		// 修改表单提交后的回调方法
		updateResponse : function (responseText, statusText) {	
			if (responseText == 'OK') {
				bootbox.alert("Don't forget to send money to user.");
				$('#update_modal').modal('hide');
				Cashout.getContent(pageNo);
			} else {
				$("#error_msg").html("Server not available, please try again later.");
				$("#error_msg_div").show();
			}
		}
		
	};
}();
