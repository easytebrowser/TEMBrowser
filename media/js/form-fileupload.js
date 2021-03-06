var FormFileUpload = function() {
	
	return {
		// main function to initiate the module
		init : function() {
			// Initialize the jQuery File Upload widget:
			$('#fileupload').fileupload({
				// Uncomment the following to send cross-domain cookies:
				// xhrFields: {withCredentials: true},
				url : ctx + 'rest/uploadFile'			
			});

			// Load existing files:
			// Demo settings:
			$.ajax({
				// Uncomment the following to send cross-domain cookies:
				// xhrFields: {withCredentials: true},
				url : $('#fileupload').fileupload('option', 'url'),
				dataType : 'json',
				context : $('#fileupload')[0],
				maxFileSize : 5000000,
				acceptFileTypes : /(\.|\/)(gif|jpe?g|png)$/i,
				process : [ {
					action : 'load',
					fileTypes : /^image\/(gif|jpeg|png)$/,
					maxFileSize : 20000000 //20MB
				}, {
					action : 'resize',
					maxWidth : 1440,
					maxHeight : 900
				}, {
					action : 'save'
				} ]
			}).done(function(result) {
				$(this).fileupload('option', 'done').call(this, null, {
					result : result
				});
			});

			// Upload server status check for browsers with CORS support:
//			if ($.support.cors) {
//				$.ajax({
//					url : ctx + 'rest/uploadFile',
//					type : 'HEAD'
//				}).fail(
//						function() {
//							$('<span class="alert alert-error"/>').text(
//									'文件服务器异常 - '
//											+ new Date()).appendTo(
//									'#fileupload');
//						});
//			}

			// initialize uniform checkboxes
			App.initUniform('.fileupload-toggle-checkbox');
		}

	};

}();




