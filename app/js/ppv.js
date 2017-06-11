var PPV = function() {
	
	return {
		init : function() {
			
		}
	};
}();

function showPPV(type, linkUrl, bannerUrl){
	if(type == '1'){
		$('#ppv1').html('<a href="' + linkUrl + '" target="_blank"><img src="' + bannerUrl + '" width="468" height="60"></a><br/><span>You get 0.01 point for showing this banner</span>');		
	}else{
		$('#ppv2').html('<a href="' + linkUrl + '" target="_blank"><img src="' + bannerUrl + '" width="468" height="60"></a><br/><span>You get 0.01 point for showing this banner</span>');
	}
}
