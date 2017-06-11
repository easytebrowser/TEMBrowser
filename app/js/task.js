var Task = function () {

    return {
        //main function to initiate the module
        init : function () { 
            //knob does not support ie8 so skip it
            if (!jQuery().knob || App.isIE8()) {
                return;
            }
            // surfing tasks
            var pages = $('#pages').val();
            if(pages >= 1000000){
            	$('#surfing_step4_val').val('1000000');
            	$('#surfing_step4_lab').html('100%');
            }else{
            	$('#surfing_step4_val').val(pages);
            	$('#surfing_step4_lab').html(parseInt(pages / 10000) + "%");
            } 
            if(pages >= 100000){
            	$('#surfing_step3_val').val('100000');
            	$('#surfing_step3_lab').html('100%');
            }else{
            	$('#surfing_step3_val').val(pages);
            	$('#surfing_step3_lab').html(parseInt(pages / 1000) + "%");
            } 
            if(pages >= 10000){
            	$('#surfing_step2_val').val('10000');
            	$('#surfing_step2_lab').html('100%');
            }else{
            	$('#surfing_step2_val').val(pages);
            	$('#surfing_step2_lab').html(parseInt(pages / 100) + "%");
            } 
            if(pages >= 1000){
            	$('#surfing_step1_val').val('1000');
            	$('#surfing_step1_lab').html('100%');
            }else{
            	$('#surfing_step1_val').val(pages);
            	$('#surfing_step1_lab').html(parseInt(pages / 10) + "%");
            }
            // referrals tasks
            var referrals = $('#referrals').val();
            if(referrals >= 500){
            	$('#referrals_step4_val').val('500');
            	$('#referrals_step4_lab').html('100%');
            }else{
            	$('#referrals_step4_val').val(referrals);
            	$('#referrals_step4_lab').html(parseInt(referrals / 5) + "%");
            } 
            if(referrals >= 100){
            	$('#referrals_step3_val').val('100');
            	$('#referrals_step3_lab').html('100%');
            }else{
            	$('#referrals_step3_val').val(referrals);
            	$('#referrals_step3_lab').html(parseInt(referrals) + "%");
            } 
            if(referrals >= 10){
            	$('#referrals_step2_val').val('10');
            	$('#referrals_step2_lab').html('100%');
            }else{
            	$('#referrals_step2_val').val(referrals);
            	$('#referrals_step2_lab').html(parseInt(referrals * 10) + "%");
            } 
            if(referrals >= 1){
            	$('#referrals_step1_val').val('1');
            	$('#referrals_step1_lab').html('100%');
            }else{
            	$('#referrals_step1_val').val(referrals);
            	$('#referrals_step1_lab').html(parseInt(referrals * 100) + "%");
            }
            // sites tasks
            var sites = $('#sites').val();
            if(sites >= 500){
            	$('#sites_step4_val').val('500');
            	$('#sites_step4_lab').html('100%');
            }else{
            	$('#sites_step4_val').val(sites);
            	$('#sites_step4_lab').html(parseInt(sites / 5) + "%");
            } 
            if(sites >= 100){
            	$('#sites_step3_val').val('100');
            	$('#sites_step3_lab').html('100%');
            }else{
            	$('#sites_step3_val').val(sites);
            	$('#sites_step3_lab').html(parseInt(sites) + "%");
            } 
            if(sites >= 50){
            	$('#sites_step2_val').val('50');
            	$('#sites_step2_lab').html('100%');
            }else{
            	$('#sites_step2_val').val(sites);
            	$('#sites_step2_lab').html(parseInt(sites * 2) + "%");
            } 
            if(sites >= 10){
            	$('#sites_step1_val').val('10');
            	$('#sites_step1_lab').html('100%');
            }else{
            	$('#sites_step1_val').val(sites);
            	$('#sites_step1_lab').html(parseInt(sites * 10) + "%");
            }
            // upgrades tasks
            var upgrades = $('#upgrades').val();
            if(upgrades >= 24){
            	$('#upgrades_step4_val').val('24');
            	$('#upgrades_step4_lab').html('100%');
            }else{
            	$('#upgrades_step4_val').val(upgrades);
            	$('#upgrades_step4_lab').html(parseInt(upgrades * 100 / 24) + "%");
            } 
            if(upgrades >= 12){
            	$('#upgrades_step3_val').val('12');
            	$('#upgrades_step3_lab').html('100%');
            }else{
            	$('#upgrades_step3_val').val(upgrades);
            	$('#upgrades_step3_lab').html(parseInt(upgrades * 100 / 12) + "%");
            } 
            if(upgrades >= 6){
            	$('#upgrades_step2_val').val('6');
            	$('#upgrades_step2_lab').html('100%');
            }else{
            	$('#upgrades_step2_val').val(upgrades);
            	$('#upgrades_step2_lab').html(parseInt(upgrades * 100 / 6) + "%");
            } 
            if(upgrades >= 1){
            	$('#upgrades_step1_val').val('1');
            	$('#upgrades_step1_lab').html('100%');
            }else{
            	$('#upgrades_step1_val').val(upgrades);
            	$('#upgrades_step1_lab').html(parseInt(upgrades * 100) + "%");
            }
            // purchased points task
            var points = $('#points').val();
            if(points >= 50000){
            	$('#points_step4_val').val('50000');
            	$('#points_step4_lab').html('100%');
            }else{
            	$('#points_step4_val').val(points);
            	$('#points_step4_lab').html(parseInt(points / 500) + "%");
            } 
            if(points >= 10000){
            	$('#points_step3_val').val('10000');
            	$('#points_step3_lab').html('100%');
            }else{
            	$('#points_step3_val').val(points);
            	$('#points_step3_lab').html(parseInt(points / 100) + "%");
            } 
            if(points >= 1000){
            	$('#points_step2_val').val('1000');
            	$('#points_step2_lab').html('100%');
            }else{
            	$('#points_step2_val').val(points);
            	$('#points_step2_lab').html(parseInt(points / 10) + "%");
            } 
            if(points >= 100){
            	$('#points_step1_val').val('100');
            	$('#points_step1_lab').html('100%');
            }else{
            	$('#points_step1_val').val(points);
            	$('#points_step1_lab').html(parseInt(points) + "%");
            }
            
            if ($(".knobify").size() > 0) {
                $(".knobify").knob({
                    readOnly: true,
                    skin: "tron",
                    'width': 100,
                    'height': 100,
                    'dynamicDraw': true,
                    'thickness': 0.2,
                    'tickColorizeValues': true,
                    'skin': 'tron',
                    draw: function () {
                        // "tron" case
                        if (this.$.data('skin') == 'tron') {

                            var a = this.angle(this.cv) // Angle
                                ,
                                sa = this.startAngle // Previous start angle
                                ,
                                sat = this.startAngle // Start angle
                                ,
                                ea // Previous end angle
                                ,
                                eat = sat + a // End angle
                                ,
                                r = 1;

                            this.g.lineWidth = this.lineWidth;

                            this.o.cursor && (sat = eat - 0.3) && (eat = eat + 0.3);

                            if (this.o.displayPrevious) {
                                ea = this.startAngle + this.angle(this.v);
                                this.o.cursor && (sa = ea - 0.3) && (ea = ea + 0.3);
                                this.g.beginPath();
                                this.g.strokeStyle = this.pColor;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                                this.g.stroke();
                            }

                            this.g.beginPath();
                            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                            this.g.stroke();

                            this.g.lineWidth = 2;
                            this.g.beginPath();
                            this.g.strokeStyle = this.o.fgColor;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                            this.g.stroke();

                            return false;

                        }
                    }
                });
            }
        },
        
        claim : function (obj, type, step, id) {
        	$.ajax({
        		type : "post",
        		data : {
        			type : type,
        			step : step,
        			id : id
        		},
        		url : "rest/user/task",
        		success : function(info) {
        			if(info == 'OK'){	
        				bootbox.alert({ 
        		            message: 'Bonus points has been added to your balance.',  
        		            callback: function() {  
        		            	$(obj).removeAttr('onclick');
    		            		$(obj).attr('title', 'Already claimed');
    		            		$(obj).find('i').first().attr('class', 'icon-ok');
        		            	if(step == 1){
        		            		$(obj).attr('class', 'btn blue mini');        		            		
        		            	}else if(step == 2){
        		            		$(obj).attr('class', 'btn purple mini');
        		            	}else if(step == 3){
        		            		$(obj).attr('class', 'btn yellow mini');
        		            	}else if(step == 4){
        		            		$(obj).attr('class', 'btn red mini');
        		            	}
        		            },  
        		            title: "Congratulations",  
        		        });  	        				
        			} else {
        				bootbox.alert(info);
        			}
        		},
        		error : function() {
        			bootbox.alert("Server not available, please try again later.");
        		}
        	});
        }

    };

}();