var totalSurfData = [];
var Dashboard = function () {
	
    return {   	

    	//main function to initiate the module
        init: function () {

            App.addResponsiveHandler(function () {
                Dashboard.initCalendar();                
            });        
        },

        initCalendar: function () {
            if (!jQuery().fullCalendar) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

            if ($('#calendar').width() <= 400) {
                $('#calendar').addClass("mobile");
                h = {
                    left: 'title, prev, next',
                    center: '',
                    right: 'today,month,agendaWeek,agendaDay'
                };
            } else {
                $('#calendar').removeClass("mobile");
                if (App.isRTL()) {
                    h = {
                        right: 'title',
                        center: '',
                        left: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                } else {
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }               
            }

            $('#calendar').fullCalendar('destroy'); // destroy the calendar
            $('#calendar').fullCalendar({ //re-initialize the calendar
                disableDragging: false,
                header: h,
                editable: true,
                events: [{
                        title: 'All Day Event',                        
                        start: new Date(y, m, 1),
                        backgroundColor: App.getLayoutColorCode('yellow')
                    }, {
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2),
                        backgroundColor: App.getLayoutColorCode('green')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d - 3, 16, 0),
                        allDay: false,
                        backgroundColor: App.getLayoutColorCode('red')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d + 4, 16, 0),
                        allDay: false,
                        backgroundColor: App.getLayoutColorCode('green')
                    }, {
                        title: 'Meeting',
                        start: new Date(y, m, d, 10, 30),
                        allDay: false,
                    }, {
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        backgroundColor: App.getLayoutColorCode('grey'),
                        allDay: false,
                    }, {
                        title: 'Birthday Party',
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        backgroundColor: App.getLayoutColorCode('purple'),
                        allDay: false,
                    }, {
                        title: 'Click for Google',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        backgroundColor: App.getLayoutColorCode('yellow'),
                        url: 'http://google.com/',
                    }
                ]
            });
        },

        initDashboardDaterange: function () {

        	$('#dashboard-report-range').daterangepicker({
                ranges: {
                    'Today': ['today', 'today'],
                    'Yesterday': ['yesterday', 'yesterday'],
                    'Last 7 Days': [Date.today().add({
                            days: -6
                        }), 'today'],
                    'Last 14 Days': [Date.today().add({
                            days: -13
                        }), 'today']
                },
                opens: (App.isRTL() ? 'right' : 'left'),
                format: 'MM/dd/yyyy',
                separator: ' to ',
                startDate: Date.today().add({
                    days: -29
                }),
                endDate: Date.today(),
                minDate: Date.today().moveToFirstDayOfMonth().add({
                    months: -1
                }),
                maxDate: Date.today(),
                locale: {
                    applyLabel: 'Submit',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    firstDay: 1
                },
                showWeekNumbers: true,
                buttonClasses: ['btn-danger']
            },

            function (start, end) {
                App.blockUI(jQuery("#dashboard"));
                setTimeout(function () {
                    App.unblockUI(jQuery("#dashboard"));
                    $.gritter.add({
                        title: 'Dashboard',
                        text: 'Dashboard date range updated.'
                    });
                    App.scrollTo();
                }, 1000);
                $('#dashboard-report-range span').html(start.toString('MMM dd, yyyy') + ' - ' + end.toString('MMM dd, yyyy'));
                //重新获取报表数据
                Dashboard.initSurfedChart('');
    			Dashboard.initTopChart('M');
            });

            $('#dashboard-report-range').show();

            $('#dashboard-report-range span').html(Date.today().add({
                days: -9
            }).toString('MMM dd, yyyy') + ' - ' + Date.today().toString('MMM dd, yyyy'));
        },   
        
        initCrossPromos: function () {
        	$.ajax({
    			type : "post",
    			data : {},
    			url : "rest/page/crossPromos",
    			success : function(info) {
    				$("#div_cross_promos").html(info);    				
    			},
    			error : function() {
    				bootbox.alert("Server not available, please try again later.");
    			}
    		});    
        },

        initSurfedChart: function (siteName) {
            $.ajax({
        		type : "post",
        		data : {
        			siteName : siteName,
        			dateRange : $('#dashboard-report-range span').html()
        		},
        		dataType:"json",
        		url : "rest/page/surfedChart",
        		success : function(info) {
        			var surfData = [];
        			var xAxisData = [];
        			var tooltipData = [];
        			for(var i = 0; i < info.length; i++){
        				surfData[i] = [info[i].surf_day, info[i].surf_count];
        				xAxisData[i] = info[i].surf_date;
        				tooltipData[i] = info[i].surf_date;
        			}
        			if(siteName == ''){
        				totalSurfData = surfData;
        			}
        			showChart(siteName, surfData, totalSurfData, xAxisData, tooltipData);
        		},
        		error : function() {
        			bootbox.alert("Server not available, please try again later.");
        		}
        	});   

            function showChart(siteName, surfData, totalSurfData, xAxisData, tooltipData){
            	var subtitleText = '';
            	var seriesData = [];
            	if(siteName != ''){
            		subtitleText = 'Site: ' + siteName;
            		seriesData = [{
            	        name: 'Total Surfed',
            	        data: totalSurfData
            	    }, {
            	        name: siteName,
            	        data: surfData
            	    }]
            	}else{
            		seriesData = [{
            	        name: 'Total Surfed',
            	        data: totalSurfData
            	    }]
            	}
            	
            	Highcharts.theme = {
            		colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            		chart: {
            			backgroundColor: null,
            			style: {
            				fontFamily: 'Dosis, sans-serif'
            			}
            		},
            		title: {
            			style: {
            				fontSize: '16px',
            			  	fontWeight: 'bold',
            			  	textTransform: 'uppercase'
            			}
            		},
            		tooltip: {
            			borderWidth: 0,
            			backgroundColor: 'rgba(219,219,216,0.8)',
            			shadow: false
            		},
            		legend: {
            			itemStyle: {
            				fontWeight: 'bold',
            				fontSize: '13px'
            			}
            		},
            		xAxis: {
            			gridLineWidth: 1,
            			labels: {
            				style: {
            					fontSize: '12px'
            				}
            			}
            		},
            		yAxis: {
            			minorTickInterval: 'auto',
            			title: {
            				style: {
            			    	textTransform: 'uppercase'
            				}
            			},
            			labels: {
            				style: {
            					fontSize: '12px'
            				}
            			}
            		},
            		plotOptions: {
            			candlestick: {
            				lineColor: '#404048'
            			}
            		},
            		background2: '#F0F0EA'
            	};

            	// Apply the theme
            	Highcharts.setOptions(Highcharts.theme);
            		
            	Highcharts.chart('surfed_chart_content', {
            	    chart: {
            	        type: 'area'
            	    },
            	    title: {
            	        text: 'Your surfing activities durfing ' + $('#dashboard-report-range span').html()
            	    },
            	    subtitle: {
            	        text: subtitleText
            	    },
            	    xAxis: {
            	        categories: xAxisData,
            	        tickmarkPlacement: 'on',
            	        title: {
            	            enabled: false
            	        }
            	    },
            	    yAxis: {
            	        title: {
            	            text: null
            	        },
            	        labels: {
            	            formatter: function () {
            	                return this.value;
            	            }
            	        }
            	    },
            	    tooltip: {
            	        split: true,
            	        valueSuffix: ' pages'
            	    },
            	    plotOptions: {
            	        area: {
            	            stacking: 'normal',
            	            lineColor: '#666666',
            	            lineWidth: 1,
            	            marker: {
            	                lineWidth: 1,
            	                lineColor: '#666666'
            	            }
            	        }
            	    },
            	    series: seriesData
            	});
            }
        },
        
        initTopChart: function (type) {

            $.ajax({
        		type : "post",
        		data : {
        			type : type,
        			dateRange : $('#dashboard-report-range span').html()
        		},
        		dataType:"json",
        		url : "rest/page/topChart",
        		success : function(info) {
        			var data = [];
        			var tooltipData = [];
        			for(var i = 0; i < 60; i++){
        				tooltipData[i] = [];
        				for(var j = 0; j < 10; j++){
        					tooltipData[i][j] = '';
        				}
        			}
        			
        			var xAxisData = [];        			
        			var day = 'Non';
        			var x = -1;
        			var y = 9;
        			for(var i = 0; i < info.length; i++){
        				if(typeof(info[i]) == 'undefined'){
    						continue;
    					}  
        				if(day == info[i].surf_day){
        					y--;
        					data[data.length] = [x, y, info[i].surf_count];
        					tooltipData[x][y] = info[i].surf_name;
        				}else{
        					x++; 
        					y = 9;
        					day = info[i].surf_day;    
        					data[data.length] = [x, y, info[i].surf_count];
        					tooltipData[x][y] = info[i].surf_name;
        					xAxisData[xAxisData.length] = info[i].surf_date;
        					
        				}
        			}
        			showChart(type, data, tooltipData, xAxisData);
        			//切换tab页
        			if(type == 'M'){
        				$('#top_activities_m').addClass('active');
        				$('#top_activities_s').removeClass('active');
        			} else {
        				$('#top_activities_m').removeClass('active');
        				$('#top_activities_s').addClass('active');
        			}
        		},
        		error : function() {
        			bootbox.alert("Server not available, please try again later.");
        		}
        	});    

            function showChart(type, data, tooltipData, xAxisData){
            	var title = '';
            	var seriesName = '';
            	var colorAxis;
            	if(type == 'M'){
            		title = 'Top 10 surfers during ' + $('#dashboard-report-range span').html();
            		seriesName = 'Top surfers';
            		colorAxis = 0;
    			} else {
    				title = 'Top 10 sites durfing ' + $('#dashboard-report-range span').html();
    				seriesName = 'Top sites';
    				colorAxis = 3;
    			}

            	// Load the fonts
            	Highcharts.createElement('link', {
            	   href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
            	   rel: 'stylesheet',
            	   type: 'text/css'
            	}, null, document.getElementsByTagName('head')[0]);

            	Highcharts.theme = {
            	   colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
            	      '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            	   chart: {
            	      backgroundColor: null,
            	      style: {
            	         fontFamily: 'Dosis, sans-serif'
            	      }
            	   },
            	   title: {
            	      style: {
            	         fontSize: '16px',
            	         fontWeight: 'bold',
            	         textTransform: 'uppercase'
            	      }
            	   },
            	   tooltip: {
            	      borderWidth: 0,
            	      backgroundColor: 'rgba(219,219,216,0.8)',
            	      shadow: false
            	   },
            	   legend: {
            	      itemStyle: {
            	         fontWeight: 'bold',
            	         fontSize: '13px'
            	      }
            	   },
            	   xAxis: {
            	      gridLineWidth: 1,
            	      labels: {
            	         style: {
            	            fontSize: '12px'
            	         }
            	      }
            	   },
            	   yAxis: {
            	      minorTickInterval: 'auto',
            	      title: {
            	         style: {
            	            textTransform: 'uppercase'
            	         }
            	      },
            	      labels: {
            	         style: {
            	            fontSize: '12px'
            	         }
            	      }
            	   },
            	   plotOptions: {
            	      candlestick: {
            	         lineColor: '#404048'
            	      }
            	   },


            	   // General
            	   background2: '#F0F0EA'

            	};

            	// Apply the theme
            	Highcharts.setOptions(Highcharts.theme);
            	
            	Highcharts.chart('top_activities_content', {

        		    chart: {
        		        type: 'heatmap',
        		        marginTop: 40,
        		        marginBottom: 50,
        		        plotBorderWidth: 1
        		    },

        		    title: {
        		        text: title
        		    },

        		    xAxis: {
        		        categories: xAxisData
        		    },

        		    yAxis: {
        		        categories: ['10th', '9th', '8th', '7th', '6th', '5th', '4th', '3rd', '2nd', '1st'],
        		        title: null
        		    },

        		    colorAxis: {
        		        min: 0,
        		        minColor: '#FFFFFF',
        		        maxColor: Highcharts.getOptions().colors[colorAxis]
        		    },

        		    legend: {
        		        align: 'right',
        		        layout: 'vertical',
        		        margin: 0,
        		        verticalAlign: 'top',
        		        y: 25,
        		        symbolHeight: 280
        		    },

        		    tooltip: {
        		        formatter: function () {		        	
        		            return '<b>' + tooltipData[this.point.x][this.point.y] + '</b><br>' + this.point.value + ' pages on ' + this.series.xAxis.categories[this.point.x];
        		        }
        		    },

        		    series: [{
        		        name: seriesName,
        		        borderWidth: 1,
        		        data: data,
        		        dataLabels: {
        		            enabled: true,
        		            color: '#000000'
        		        }
        		    }]
        		});
            }       
        }
    };

}();

function sendMessage(username){
	$('#modal_username').html(username);
	$('#modal_message').val('');
	$('#portlet-config').show();
}

function doSendMessage(){
	var content = $('#modal_message').val();
	if(content == ''){
		bootbox.alert("Please type your message.");
		$('#modal_message').focus();
		return false;
	}
	$.ajax({
		type : "post",
		data : {
			receiver : $('#modal_username').html(),
			content : content
		},
		url : "rest/user/sendMessage",
		success : function(info) {	
			$('#portlet-config').hide();
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function purchase(obj, siteName, price, historyCount, upline) {			
	if(parseInt(historyCount) < 10){
		price = '0.00';
	}
	bootbox.setLocale("en_US");  
	bootbox.confirm("Purchase this template will cost you " + price + " point(s), continue?", function (result) {  
        if(result) {  
        	doPurchase(obj, siteName, upline);
        } else {  
            return;
        }  
    });
}

function doPurchase(obj, siteName, upline){
	$.ajax({
		type : "post",
		data : {
			siteName : siteName,
			upline : upline
		},
		url : "rest/userSite/purchase",
		success : function(info) {
			if(info == 'OK'){
				bootbox.alert({ 
		            message: 'This template has been added to your account successfully.',  
		            callback: function() { 
		            	$(obj).attr({
							'class': 'btn green mini',
							'title': 'Start surfing this site',
							'onclick': "doSurfFromDashboard(this, '" + siteName + "')"
						});
		            	$(obj).html('Surfing');
		            },  
		            title: "Congratulations",  
		        }); 
				reloadSites();
			}else{
				bootbox.alert(info);
				return;
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});
}

function reloadSites(){
	window.java.reloadSites();
}

function doSurfFromDashboard(obj, siteName){
	var status = window.java.startSurfing(siteName, "0");	
	if (status == 'ERROR') {
		alert("Can not load template, please try again later or contact admin");
	} else if (status == 'SUCCESS') {
		$(obj).attr({
			'class': 'btn grey mini'
		});
	}
}