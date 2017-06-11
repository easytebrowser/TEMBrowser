var pageNo = 1;
var pageSize = 10;
var totalPages = 0;

var User = function() {
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
			$("#sel_status").bind("change", function() {
				getContent(1);
			});

			// 绑定输入框的input事件，实现搜索功能
			$("#search_text").bind("input", function() {
				getContent(1);
			});			
		},

		// 修改用户前通过id查询用户信息
		updateUserLink : function (id) {	
			$.ajax({
				type : "post",
				data : {
					id : id
				},
				url : "rest/admin/updateUserLink",
				success : function(info) {
					$('#update_modal').html(info);
					$('#update_modal').modal('show');

					// 表单ajaxSubmit方式提交时的参数
					var options = {
						url : 'rest/admin/updateUser',
						beforeSubmit : User.updateRequest,
						success : User.updateResponse
					};

					// 绑定表单以ajaxSubmit方式提交
					$('#update_user_form').submit(function() {
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
			if ($.trim($("#password").val()) == '') {
				$("#error_msg").html("Password is mandatory.");
				$("#password").focus();
				$("#error_msg_div").show();
				return false;
			}	
			if ($.trim($("#email").val()) == '') {
				$("#error_msg").html("Email is mandatory");
				$("#email").focus();
				$("#error_msg_div").show();
				return false;
			}
			var isChecked = false;
			$("input[name='roleId']:checked").each(function () {
		        isChecked = true;
		    });
			if(!isChecked){
				$("#error_msg").html("Please select at least 1 role.");
				$("#error_msg_div").show();
				return false;
			}
			return true;
		},
		
		// 修改用户表单提交后的回调方法
		updateResponse : function (responseText, statusText) {	
			if (responseText == 'OK') {
				bootbox.alert("Update successfully.");
				$('#update_modal').modal('hide');
				getContent(pageNo);
			} else {
				$("#error_msg").html("Server not available, please try again later.");
				$("#error_msg_div").show();
			}
		},
		
		// 重置用户
		resetUser : function(id){
			bootbox.setLocale("en_US");  
			bootbox.confirm("After reset, this user will lost all balance, sites, referrals and advertisings, continue?", function (result) {  
                if(result) {  
                	$.ajax({
        				type : "post",
        				data : {
        					id : id
        				},
        				url : "rest/admin/resetUser",
        				success : function(info) {
        					if(info == 'OK'){
        						$('#update_modal').modal('hide');
        						getContent(pageNo);
        					}else{
        						bootbox.alert(info);
        					}
        				},
        				error : function() {
        					bootbox.alert("Server not available, please try again later.");
        				}
        			});
                } else {  
                    return;
                }  
            });			
		}
	};
}();

//获取分页显示内容
function getContent(page) {
	$.ajax({
		type : "post",
		data : {
			pageNo : page,
			pageSize : pageSize,
			status : $('#sel_status').val(),
			searchText : $('#search_text').val()
		},
		url : "rest/admin/userList",
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
