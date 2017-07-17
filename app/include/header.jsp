<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<base href="${ctx }">
<div class="header navbar navbar-inverse navbar-fixed-top">
	<!-- BEGIN TOP NAVIGATION BAR -->
	<div class="navbar-inner">
		<div class="container-fluid">
			<!-- BEGIN LOGO -->
			<a class="brand" href=""> <img src="media/image/logo.png" alt="logo" /></a>
			<!-- END LOGO -->
			<!-- BEGIN HORIZANTAL MENU -->
			<div class="navbar hor-menu hidden-phone hidden-tablet">
				<div class="navbar-inner">
					<ul id="header" class="nav">
						<li><a href=""><i class="icon-home"></i> Home </a></li>
						<shiro:guest>  
						<li><a href="" data-toggle="dropdown" class="dropdown-toggle"><i class="icon-user"></i> Members <span class="arrow"></span></a>
							<ul class="dropdown-menu">
								<li><a href="${ctx }rest/page/login"><i class="icon-user"></i> Login</a></li>
								<li><a href="${ctx }rest/page/signup"><i class="icon-user-md"></i> Signup</a></li>
							</ul>
							<b class="caret-out"></b>
						</li>
						</shiro:guest>
						<shiro:user>  						
						<li><a href="rest/page/dashboard"><i class="icon-bar-chart"></i> Dashboard </a></li>
						<li><a href="rest/page/purchase"><i class="icon-shopping-cart"></i> Purchase </a></li>
						<li><a data-toggle="dropdown" class="dropdown-toggle" href="javascript:;"><i class="icon-cogs"></i> Account <span class="arrow"></span></a>
							<ul class="dropdown-menu">
								<li class="dropdown-submenu"><a href="javascript:;"> History <span class="arrow"></span></a>
									<ul class="dropdown-menu">
										<li><a href="rest/page/accountHistory/?t=c">Commission</a></li>
										<li><a href="rest/page/accountHistory/?t=p">Points</a></li>									
									</ul>
								</li>
								<li><a href="rest/page/sites">Downline Builder</a></li>
								<li><a href="rest/page/dmailer">Downline Mailer</a></li>
								<li class="dropdown-submenu"><a href="javascript:;"> Advertising <span class="arrow"></span></a>
									<ul class="dropdown-menu">
										<li><a href="rest/page/adSetup">Set Up</a></li>
										<li><a href="rest/page/adStats">Statistics</a></li>									
									</ul>
								</li>
								<li><a href="rest/page/referrals">Referrals</a></li>
								<li><a href="rest/page/prizePool">Prize Pool</a></li>
							</ul>	
							<b class="caret-out"></b>	
						</li>						
						</shiro:user>
						<li><a style="color:white;font-weight:bold;" href="rest/page/download"><i class="icon-download-alt"></i> Download </a></li>
						<li><a data-toggle="dropdown" class="dropdown-toggle" href="javascript:;"><i class="icon-briefcase"></i> Extra <span class="arrow"></span></a>
							<ul class="dropdown-menu">								
								<li><a href="rest/page/faqs">FAQs</a></li>
								<li><a href="rest/page/promote">Affiliate Tool</a></li>
								<li><a href="rest/page/tos">Terms & Privacy</a></li>
								<li><a href="rest/page/contact">Contact Us</a></li>
								<li><a href="rest/page/topPromoters">Top Promoters</a></li>
							</ul> 
							<b class="caret-out"></b>
						</li>
					</ul>
				</div>
			</div>
			<!-- END HORIZANTAL MENU -->
			<!-- BEGIN RESPONSIVE MENU TOGGLER -->
			<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse"> 
				<img src="media/image/menu-toggler.png" alt="" />
			</a>
			<!-- END RESPONSIVE MENU TOGGLER -->
			<!-- BEGIN TOP NAVIGATION MENU -->			
			<ul class="nav pull-right">
				<!-- BEGIN NOTIFICATION DROPDOWN -->
				<li class="dropdown" id="header_notification_bar">
					<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" onclick="getHeaderData('1')">
						<i class="icon-warning-sign"></i> 
						<span class="badge" id="notificationCount"></span>
					</a>
					<ul class="dropdown-menu extended notification" style="width:300px !important;" id="notificationData"></ul>
				</li>
				<!-- END NOTIFICATION DROPDOWN -->
				<!-- BEGIN INBOX DROPDOWN -->
				<li class="dropdown" id="header_inbox_bar">
					<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" onclick="getHeaderData('2')"> 
						<i class="icon-envelope"></i> 
						<span class="badge" id="messageCount"></span>
					</a>
					<ul class="dropdown-menu extended inbox" id="messageData"></ul>
				</li>
				<!-- END INBOX DROPDOWN -->
				<!-- BEGIN TODO DROPDOWN -->
				<li class="dropdown">
					<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" onclick="getHeaderData('3')"> 
						<i class="icon-tasks"></i> 
						<span class="badge" id="todoCount"></span>
					</a>
					<ul class="dropdown-menu extended tasks" id="todoData"></ul>
				</li>
				<!-- END TODO DROPDOWN -->
				<!-- BEGIN USER LOGIN DROPDOWN -->
				<shiro:user>
				<li class="dropdown user">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
						<img src="http://gravatar.com/avatar/${user.md5Email }?s=29&d=&r=g" /> 
						<span class="username">${user.username }</span> 
						<i class="icon-angle-down"></i>
					</a>
					<ul class="dropdown-menu">
						<shiro:hasAnyRoles name="admin,manager">
						<li><a href="rest/admin/main"><i class="icon-cog"></i> Admin Panel</a></li>
						<li class="divider"></li>
						</shiro:hasAnyRoles>
						<li><a href="rest/page/profile"><i class="icon-user"></i> My Profile</a></li>
						<li><a href="rest/page/notification"><i class="icon-warning-sign"></i> My Notifications</a></li>
						<li><a href="rest/page/message"><i class="icon-envelope"></i> My Message</a></li>
						<li><a href="rest/page/task"><i class="icon-tasks"></i> My Tasks</a></li>
						<li class="divider"></li>
						<li><a href="rest/user/logout"><i class="icon-key"></i> Log Out</a></li>
					</ul>
				</li>
				</shiro:user>
				<!-- END USER LOGIN DROPDOWN -->
			</ul>			
			<!-- END TOP NAVIGATION MENU -->
		</div>
	</div>
	<!-- END TOP NAVIGATION BAR -->
</div>
<script src="${path }media/js/jquery-1.10.1.min.js" type="text/javascript"></script>
<shiro:user>  			
<script>
jQuery(document).ready(function() {	
	$.ajax({
		type : "post",
		data : {},
		url : "rest/page/pageHeader",
		dataType:"json",
		success : function(info) {
			$('#notificationCount').html(info['notificationCount']);
			$('#messageCount').html(info['messageCount']);
			$('#todoCount').html(info['todoCount']);
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});   
});	

</script>
</shiro:user>
<script>
jQuery(document).ready(function() {
	//设置选中菜单样式
	var flag = '${pageFlag}';
	$('#header').find("li").each(function(){
		var atag = $(this).find("a").first();
		var atext = $.trim($(atag).text());
		if(atext == flag){
			$(this).attr('class', 'active');
			var i = $(this).find("i").first();
			$(i).append('<span class="selected"></span>');
		}
	});	

	$(".message").each(function(){
		var maxwidth=70;
		if($(this).text().length > maxwidth){
			$(this).text($(this).text().substring(0,maxwidth));
			$(this).html($(this).html() + '...');
		}
	});
});	

function getHeaderData(type){
	$.ajax({
		type : "post",
		data : {
			type : type
		},
		url : "rest/page/getHeaderData",
		success : function(info) {
			if(type == '1'){
				$('#notificationData').html(info);
			}else if(type == '2'){
				$('#messageData').html(info);
			}else if(type == '3'){
				$('#todoData').html(info);
			}
		},
		error : function() {
			bootbox.alert("Server not available, please try again later.");
		}
	});   
}
</script>
