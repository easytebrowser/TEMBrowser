var pageNo = 1;
var pageSize = 5;
var totalPages = 0;

var Role = function() {
	return {
		// 页面初始化
		init : function() {
			// 获取分页显示内容
			Role.getContent(pageNo);

			// 绑定下拉框的change事件，改变每页显示的记录数
			$("#sel_page_size").bind("change", function() {
				pageSize = $(this).val();
				Role.getContent(1);
			});

			// 绑定输入框的input事件，实现搜索功能
			$("#search_text").bind("input", function() {
				Role.getContent(1);
			});
		},
		
		// 获取分页显示内容
		getContent : function (page) {
			$.ajax({
				type : "post",
				data : {
					pageNo : page,
					pageSize : pageSize,
					searchText : $('#search_text').val()
				},
				async : "false",
				url : "rest/admin/roleList",
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
		
		// 分配权限前查询角色拥有的权限列表
		permissionLink : function (id) {
			$.ajax({
				type : "post",
				data : {
					id : id
				},
				async : "false",
				url : "rest/admin/permissionLink",
				success : function(info) {		
					// 初始化zTree
					var setting = {
							check : {
								enable : true,
								chkboxType : {"Y" : "ps", "N" : "ps"}
							},
							data : {
								simpleData : {
									enable : true
								}
							}
						};
					var zNodes = info;			
					$.fn.zTree.init($("#z_tree"), setting, zNodes);		
					// 绑定按钮点击事件，保存选中的权限到数据库
					$("#btn_permission").val(id);	
					$('#permission_modal').modal('show');
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		// 绑定按钮点击事件，保存选中的权限到数据库
		permission : function (){
			var roleId = $('#btn_permission').val();
			var zTree = $.fn.zTree.getZTreeObj("z_tree");
			var nodes = zTree.getCheckedNodes(true);
			var permissionIds = "";
			for(var i = 0; i < nodes.length; i++){
				permissionIds += nodes[i].id + ",";
			}
			if(permissionIds.length > 0){
				permissionIds = permissionIds.substring(0, permissionIds.lastIndexOf(','));
			}
			$.ajax({
				type : "post",
				data : {
					roleId : roleId,
					permissionIds : permissionIds
				},
				url : "rest/admin/permission",
				success : function(info) {		
					if (info == 'OK') {
						$('#permission_modal').modal('hide');
						Role.getContent(pageNo);						
					} else {
						$("#permission_error_msg").html(info);
						$("#permission_error_msg_div").show();
					}
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		}
	};
}();
