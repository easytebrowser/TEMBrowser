var Index = function() {
	
	return {
		init: function () {
			$('#promo_carousel').carousel({
				interval : 10000,
				pause : 'hover'
			});
			
			$('#features_img').load(function(){
				Index.changeFeatureMap();
			});
			$('#features_img').resize(function(){
				Index.changeFeatureMap();
			});
        },
        
        changeFeatureMap: function () {
        	var w = $('#features_img').width();
        	var p = parseFloat(w / 763);
        	var sx1 = parseInt(p * 94), sy1 = parseInt(p * 80), ex1 = parseInt(p * 184), ey1 = parseInt(p * 275);
        	var sx2 = parseInt(p * 190), sy2 = parseInt(p * 80), ex2 = parseInt(p * 280), ey2 = parseInt(p * 174);
        	var sx3 = parseInt(p * 287), sy3 = parseInt(p * 80), ex3 = parseInt(p * 474), ey3 = parseInt(p * 174);
        	var sx4 = parseInt(p * 481), sy4 = parseInt(p * 80), ex4 = parseInt(p * 571), ey4 = parseInt(p * 174);
        	var sx5 = parseInt(p * 578), sy5 = parseInt(p * 80), ex5 = parseInt(p * 668), ey5 = parseInt(p * 174);
        	
        	var sx6 = parseInt(p * 190), sy6 = parseInt(p * 180), ex6 = parseInt(p * 280), ey6 = parseInt(p * 275);
        	var sx7 = parseInt(p * 287), sy7 = parseInt(p * 180), ex7 = parseInt(p * 377), ey7 = parseInt(p * 275);
        	var sx8 = parseInt(p * 384), sy8 = parseInt(p * 180), ex8 = parseInt(p * 474), ey8 = parseInt(p * 275);
        	var sx9 = parseInt(p * 481), sy9 = parseInt(p * 180), ex9 = parseInt(p * 571), ey9 = parseInt(p * 275);
        	var sx10 = parseInt(p * 578), sy10 = parseInt(p * 180), ex10 = parseInt(p * 668), ey10 = parseInt(p * 275);
        	
        	var sx11 = parseInt(p * 94), sy11 = parseInt(p * 283), ex11 = parseInt(p * 280), ey11 = parseInt(p * 377);
        	var sx12 = parseInt(p * 287), sy12 = parseInt(p * 283), ex12 = parseInt(p * 474), ey12 = parseInt(p * 377);
        	var sx13 = parseInt(p * 481), sy13 = parseInt(p * 283), ex13 = parseInt(p * 571), ey13 = parseInt(p * 377);
        	var sx14 = parseInt(p * 578), sy14 = parseInt(p * 283), ex14 = parseInt(p * 668), ey14 = parseInt(p * 377);
        	
        	
        	$('#area_1').attr('coords', sx1 + "," + sy1 + "," + ex1 + "," + ey1);
        	$('#area_1').mouseover(function(){
        		showDemo('auto_login');
        	});
        	$('#area_1').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_2').attr('coords', sx2 + "," + sy2 + "," + ex2 + "," + ey2);
        	$('#area_2').mouseover(function(){
        		showDemo('click_tracking');
        	});
        	$('#area_2').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_3').attr('coords', sx3 + "," + sy3 + "," + ex3 + "," + ey3);
        	$('#area_3').mouseover(function(){
        		showDemo('verification_warning');
        	});
        	$('#area_3').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_4').attr('coords', sx4 + "," + sy4 + "," + ex4 + "," + ey4);
        	$('#area_4').mouseover(function(){
        		showDemo('vtg_alert');
        	});
        	$('#area_4').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_5').attr('coords', sx5 + "," + sy5 + "," + ex5 + "," + ey5);
        	$('#area_5').mouseover(function(){
        		showDemo('ctp_alert');
        	});
        	$('#area_5').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_6').attr('coords', sx6 + "," + sy6 + "," + ex6 + "," + ey6);
        	$('#area_6').mouseover(function(){
        		showDemo('bonus_alert');
        	});
        	$('#area_6').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_7').attr('coords', sx7 + "," + sy7 + "," + ex7 + "," + ey7);
        	$('#area_7').mouseover(function(){
        		showDemo('power_tab');
        	});
        	$('#area_7').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_8').attr('coords', sx8 + "," + sy8 + "," + ex8 + "," + ey8);
        	$('#area_8').mouseover(function(){
        		showDemo('auto_skip');
        	});
        	$('#area_8').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_9').attr('coords', sx9 + "," + sy9 + "," + ex9 + "," + ey9);
        	$('#area_9').mouseover(function(){
        		showDemo('daily_deals');
        	});
        	$('#area_9').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_10').attr('coords', sx10 + "," + sy10 + "," + ex10 + "," + ey10);
        	$('#area_10').mouseover(function(){
        		showDemo('log_surfing');
        	});
        	$('#area_10').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_11').attr('coords', sx11 + "," + sy11 + "," + ex11 + "," + ey11);
        	$('#area_11').mouseover(function(){
        		showDemo('surf_rewards');
        	});
        	$('#area_11').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_12').attr('coords', sx12 + "," + sy12 + "," + ex12 + "," + ey12);
        	$('#area_12').mouseover(function(){
        		showDemo('surf_codes');
        	});
        	$('#area_12').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_13').attr('coords', sx13 + "," + sy13 + "," + ex13 + "," + ey13);
        	$('#area_13').mouseover(function(){
        		showDemo('1click_signup');
        	});
        	$('#area_13').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	$('#area_14').attr('coords', sx14 + "," + sy14 + "," + ex14 + "," + ey14);
        	$('#area_14').mouseover(function(){
        		showDemo('manage_listing');
        	});
        	$('#area_14').mouseout(function(){        		
        		hideDemo();
        	});
        	
        	function showDemo(feature){
        		$('#feature_readme').hide();
        		$('#feature_demo').html('<img src="media/image/demo_' + feature + '.gif">');
        		$('#feature_demo').show();
        	}

        	function hideDemo(){
        		$('#feature_demo').html('');
        		$('#feature_demo').hide();
        		$('#feature_readme').show();
        	}
        },
        
        comparisonChart: function (count) {
            if (!jQuery.plot) {
                return;
            }
            $('#surf_count').html(count);
            var data1 = [], data2 = [];
            var p = 100, s1 = 0, s2 = 0;
            if(count == 1){
            	for(var i = 1; i < 20; i++){
            		p += 50;
            		s1 += 50 * 10.1;
            		s2 += 50 * 10.5;   
            		data1[i - 1] = [p, s1];
            		data2[i - 1] = [p, s2];
            	}            	
            }else if(count == 5){            	
            	for(var i = 1; i < 20; i++){
            		if(i == 1){
            			s1 = p * 10.5;
            			s2 = p * 15;
            		}else{
            			p += 50;
            			var r = i / 50;            			
            			s1 += 50 * (10.5 + r);
            			s2 += 50 * (15 + r);
            		}
            		data1[i - 1] = [p, s1];
            		data2[i - 1] = [p, s2];
            	} 
            }else if(count == 10){            	
            	for(var i = 1; i < 20; i++){
            		if(i == 1){
            			s1 = p * 11;
            			s2 = p * 20;
            		}else{
            			p += 50;
            			var r = i / 50;            			
            			s1 += 50 * (11 + r);
            			s2 += 50 * (20 + r);
            		}
            		data1[i - 1] = [p, s1];
            		data2[i - 1] = [p, s2];
            	} 
            }else if(count == 15){            	
            	for(var i = 1; i < 20; i++){
            		if(i == 1){
            			s1 = p * 11.5;
            			s2 = p * 25;
            		}else{
            			p += 50;
            			var r = i / 50;            			
            			s1 += 50 * (11.5 + r);
            			s2 += 50 * (25 + 2 * r);
            		}
            		data1[i - 1] = [p, s1];
            		data2[i - 1] = [p, s2];
            	} 
            }else if(count == 20){            	
            	for(var i = 1; i < 20; i++){
            		if(i == 1){
            			s1 = p * 12;
            			s2 = p * 30;
            		}else{
            			p += 50;
            			var r = i / 50;            			
            			s1 += 50 * (12 + r);
            			s2 += 50 * (30 + 3 * r);
            		}
            		data1[i - 1] = [p, s1];
            		data2[i - 1] = [p, s2];
            	} 
            }else if(count == 30){            	
            	for(var i = 1; i < 20; i++){
            		if(i == 1){
            			s1 = p * 13;
            			s2 = p * 50;
            		}else{
            			p += 50;
            			var r = i / 50;            			
            			s1 += 50 * (13 + r);
            			s2 += 50 * (50 + 10 * r);
            		}
            		data1[i - 1] = [p, s1];
            		data2[i - 1] = [p, s2];
            	} 
            }else if(count == 50){            	
            	for(var i = 1; i < 20; i++){
            		if(i == 1){
            			s1 = p * 15;
            			s2 = p * 70;
            		}else{
            			p += 50;
            			var r = i / 50;            			
            			s1 += 50 * (15 + r);
            			s2 += 50 * (70 + 20 * r);
            		}
            		data1[i - 1] = [p, s1];
            		data2[i - 1] = [p, s2];
            	} 
            }
            data1[i - 1] = [p, s1];
    		data2[i - 1] = [p, s2];
 			
			showChart(data1, 'Easy Browser', data2, 'Common Browser');
            
            function showTooltip(x, y, pages, times) {
                $('<div id="tooltip">Surf ' + pages + ' pages at each Site<br>Takes you ' + times + '</div>').css({
                	position: 'absolute',
                    display: 'none',
                    top: y + 5,
                    left: x + 15,
                    border: '1px solid #333',
                    padding: '4px',
                    color: '#fff',
                    'border-radius': '3px',
                    'background-color': '#333',
                    opacity: 0.80
                }).appendTo("body").fadeIn(200);
            }
            

            function formatSeconds(value) {
				var theTime = parseInt(value);// s
				var theTime1 = 0;// m
				var theTime2 = 0;// h
				if (theTime > 60) {
					theTime1 = parseInt(theTime / 60);
					theTime = parseInt(theTime % 60);
					if (theTime1 > 60) {
						theTime2 = parseInt(theTime1 / 60);
						theTime1 = parseInt(theTime1 % 60);
					}
				}
				var result = "" + parseInt(theTime) + "s";
				if (theTime1 > 0) {
					result = "" + parseInt(theTime1) + "m" + result;
				}
				if (theTime2 > 0) {
					result = "" + parseInt(theTime2) + "h" + result;
				}
				return result;
			}

            function showChart(data1, type1, data2, type2){
            	if ($('#comparison_chart').size() != 0) {

                    $('#comparison_chart_loading').hide();
                    $('#comparison_chart_content').show();

                    var plot_statistics = $.plot($("#comparison_chart"), [{
                            data: data1,
                            label: type1
                        }, {
                        	data: data2,
                        	label: type2
                        }
                    ], {
                        series: {
                            lines: {
                                show: true,
                                lineWidth: 1,
                                fill: true,
                                fillColor: {
                                    colors: [{
                                            opacity: 0.05
                                        }, {
                                            opacity: 0.01
                                        }
                                    ]
                                }
                            },
                            points: {
                                show: true
                            },
                            shadowSize: 2
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        colors: ["#d12610", "#37b7f3", "#52e136"],
                        xaxis: {
                            ticks: 11,
                            tickDecimals: 0
                        },
                        yaxis: {
                            ticks: 11,
                            tickDecimals: 0
                        }
                    });

                    var previousPoint = null;
                    $("#comparison_chart").bind("plothover", function (event, pos, item) {
                        $("#x").text(pos.x.toFixed(2));
                        $("#y").text(pos.y.toFixed(2));
                        if (item) {
                            if (previousPoint != item.dataIndex) {
                                previousPoint = item.dataIndex;

                                $("#tooltip").remove();
                                var x = item.datapoint[0].toFixed(0),
                                    y = item.datapoint[1].toFixed(0);
                                	y = formatSeconds(y);
                                showTooltip(item.pageX, item.pageY, x, y);
                            }
                        } else {
                            $("#tooltip").remove();
                            previousPoint = null;
                        }
                    });
                } 
            }        

        },
	};
}();
