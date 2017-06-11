var SurfCode = function() {
	return {
		// 页面初始化
		init : function() {			
			SurfCode.initSites();
			SurfCode.getSurfCodes();
		},
		
		initSites : function () {
			$.ajax({
				type : "post",
				data : {},
				url : "rest/admin/sites4SufCode",
				success : function(info) {
					$('#site_name_label').html(info);
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		getSurfCodes : function () {
			$.ajax({
				type : "post",
				data : {},
				url : "rest/admin/getSurfCodes",
				success : function(info) {
					$('#tab_list_body').html(info);
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		add : function () {	
			var siteName = $.trim($('#i_site_name').val());
			var surfCode = $.trim($('#i_surf_code').val());
			var rewards = $.trim($('#i_rewards').val());
			var surfCount = $.trim($('#i_count').val());
			if(siteName == ''){
				bootbox.alert("Please select site.");
				return false;
			}else if(surfCode == ''){
				bootbox.alert("Please input surf code.");
				return false;
			}else if(rewards == ''){
				bootbox.alert("Please input rewards.");				
				return false;
			}else if(surfCount == ''){
				bootbox.alert("Please input surf count.");		
				return false;
			}
			rewards = parseInt(rewards);
			if(rewards > 0){
				rewards = parseFloat(rewards / 100).toFixed(2);			
			}		
			
			$.ajax({
				type : "post",
				data : {
					siteName : siteName,
					surfCode : surfCode,
					rewards : rewards,
					surfCount : surfCount
				},
				url : "rest/admin/addSurfCode",
				success : function(info) {					
					bootbox.alert("Add sucessfully.");	
					SurfCode.init();
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		delete : function (id) {	
			$.ajax({
				type : "post",
				data : {
					id : id
				},
				url : "rest/admin/deleteSurfCode",
				success : function(info) {
					$('#tr_' + id).remove();
					bootbox.alert("Delete sucessfully.");					
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		}
	};
}();

