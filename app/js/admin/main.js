$(function() {
    App.init();

    var Main = (function() {
        var me = {};

        // 处理菜单点击
        me.handleSubMenuClick = function() {
        	jQuery('.page-sidebar').on('click', ' li > a', function (e) {    
                e.preventDefault(); 
                
                var menuContainer = jQuery('.page-sidebar ul');
                menuContainer.children('li.active').removeClass('active');
                menuContainer.children('arrow.open').removeClass('open');

                $(this).parents('li').each(function () {
                        $(this).addClass('active');
                        $(this).children('a > span.arrow').addClass('open');
                    });
                $(this).parents('li').addClass('active');
           
                var url = $(this).attr('href');                
                if (url != null && url != 'javascript:;') {
                	//更新标题栏
                	var text = $.trim($(this).text());
                    var title = $(this).attr('title');
                    if(title == null){
                    	title = '';                    	
                    }
                    $('#page_title').html(text + ' <small>' + title + '</small>');
                	//更新导航栏
                	$('#breadcrumb').html('');
                	var i = 0;
                	$(this).parents('li').each(function () {
                		var link = $(this).find('a').first();
                		var li = $('<li></li>');
                		var linkUrl = $(link).attr("href");
                		var linkText = $.trim($(link).text());
                		if(linkUrl != null && linkUrl != 'javascript:;'){
                			$(li).append('<a href="'+linkUrl+'">'+linkText+'</a>');
                		}else{
                			$(li).append(linkText);
                		}
                		if(i > 0){
                			$(li).append('<i class="icon-angle-right"></i>');
                		}
                		$('#breadcrumb').prepend(li);
                		i++;
                    });       
                	$(breadcrumb).prepend('<li><i class="icon-home"></i><a href="rest/admin/summary">Summary</a> <i class="icon-angle-right"></i></li>');
                	
                    $.get(url, function(data) {
                        $('#main_content').html(data);
                    });
                }                
            });
        };
        
        // 处理导航条点击
        me.handleBreadcrumbClick = function() {
        	jQuery('#breadcrumb').on('click', ' li > a', function (e) { 
        		e.preventDefault(); 
        		var url = $(this).attr('href');
        		if(url == null || url == 'javascript:;'){
        			return;
        		}       		 
        		var menuContainer = jQuery('.page-sidebar ul');
                menuContainer.find('a').each(function () {
                	if($(this).attr('href') != null && $(this).attr('href') == url){
                		$(this).trigger("click");
                	}
                });  
        		
            });
        };
        
        me.init = function() {
            me.handleSubMenuClick();
            me.handleBreadcrumbClick();
        };

        return me;
    })();

    Main.init();
    $('#btn_summary').trigger("click");
});

function goto(menu){
	$('#' + menu).trigger("click");
}