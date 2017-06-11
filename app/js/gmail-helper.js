var GmailHelper = function() {

	return {
		init: function () {
			$('#btn_start').click(function(){
				window.java.loadMailerAds();
			});


        }
	};
}();
