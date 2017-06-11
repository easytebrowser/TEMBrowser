var SendMail = function() {
	return {
		// 页面初始化
		init : function() {
			$('#modal_mail_to').change(function(){
				var mailTo = $(this).val();
				if(mailTo == '3'){
					$('#div_selected').show();
				}else{
					$('#div_selected').hide();
				}
			});
			
			$('.wysihtml5').wysihtml5();
			
			SendMail.initMails();
		},
		
		initMails : function () {
			$.ajax({
				type : "post",
				data : {},
				url : "rest/admin/mailList",
				success : function(info) {
					$('#tab_list_body').html(info);
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		},
		
		add : function () {
			var subject = $.trim($('#modal_subject').val());
			var content = $.trim($('#modal_content').val());
			var mailTo = $.trim($('#modal_mail_to').val());
			var selected = $.trim($('#modal_selected').val());
			var startTime = $.trim($('#modal_start_time').val());
			if(subject == ""){
				bootbox.alert("Please input mail subject.");
				return;
			}else if(content == ""){
				bootbox.alert("Please input mail content.");
				return;
			}else if(mailTo == ""){
				bootbox.alert("Please select mail to.");
				return;
			}else if(mailTo == "3"){
				if(selected == ""){
					bootbox.alert("Please input selected users.");
					return;
				}				
			}
			$.ajax({
				type : "post",
				data : {
					subject : subject,
					content : content,
					mailTo : mailTo,
					selected : selected,
					startTime : startTime,
				},
				url : "rest/admin/addMail",
				success : function(info) {
					bootbox.alert("Setup sucessfully.");
					$('#portlet-config').modal('hide');
					SendMail.init();
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
				url : "rest/admin/deleteMail",
				success : function(info) {
					bootbox.alert("Delete sucessfully.");				
					SendMail.init();
				},
				error : function() {
					bootbox.alert("Server not available, please try again later.");
				}
			});
		}
		
	};
}();

