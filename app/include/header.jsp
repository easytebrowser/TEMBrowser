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
								<li class="dropdown-submenu"><a href="javascript:;"> Templates <span class="arrow"></span></a>
									<ul class="dropdown-menu">
										<li><a href="rest/page/sites/?t=a">Available</a></li>
										<li><a href="rest/page/sites/?t=p">Purchased</a></li>									
									</ul>
								</li>							
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
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-warning-sign"></i> 
						<span class="badge">${sessionScope.notificationCount }</span>
					</a>
					<ul class="dropdown-menu extended notification" style="width:300px !important;">
						<li>
							<p>You have ${sessionScope.notificationCount } new notifications</p>
						</li>
						<c:forEach var="item" items="${sessionScope.notificationList }" varStatus="status">	
							<c:if test="${item.type == '0' }">
								<c:set var="color" value="label-warning"></c:set>
								<c:set var="icon" value="icon-bell"></c:set>
							</c:if>
							<c:if test="${item.type == '1' }">
								<c:set var="color" value="label-info"></c:set>
								<c:set var="icon" value="icon-gift"></c:set>
							</c:if>
							<c:if test="${item.type == '2' }">
								<c:set var="color" value="label-warning"></c:set>
								<c:set var="icon" value="icon-bell"></c:set>
							</c:if>
							<c:if test="${item.type == '3' }">
								<c:set var="color" value="label-important"></c:set>
								<c:set var="icon" value="icon-bolt"></c:set>
							</c:if>
							<c:if test="${item.type == '4' }">
								<c:set var="color" value="label-success"></c:set>
								<c:set var="icon" value="icon-ok-sign"></c:set>
							</c:if>
							<c:if test="${item.type == '5' }">
								<c:set var="color" value="label-important"></c:set>
								<c:set var="icon" value="icon-remove-sign"></c:set>
							</c:if>
							<li><a href="rest/page/notification"> 
								<span class="label ${color }"><i class="${icon }"></i></span> ${item.title }
								<span class="time pull-right">${item.dateRange }</span>
							</a></li>						
						</c:forEach>					
						<li class="external"><a href="rest/page/notification">See all notifications <i class="m-icon-swapright"></i></a></li>
					</ul>
				</li>
				<!-- END NOTIFICATION DROPDOWN -->
				<!-- BEGIN INBOX DROPDOWN -->
				<li class="dropdown" id="header_inbox_bar">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
						<i class="icon-envelope"></i> 
						<span class="badge">${sessionScope.messageCount }</span>
					</a>
					<ul class="dropdown-menu extended inbox">
						<li>
							<p>You have ${sessionScope.messageCount } new messages</p>
						</li>
						<c:forEach var="item" items="${sessionScope.messageList }" varStatus="status">	
							<li><a href="rest/page/message"> 
								<span class="photo"><img src="http://gravatar.com/avatar/${item.md5_email }?s=40&d=&r=g" /> </span>
								<span class="subject"> 
									<span class="from">
									<c:choose>
										<c:when test="${item.first_name == null || item.last_name == null }">${item.sender }</c:when>
										<c:otherwise>${item.first_name } ${item.last_name }</c:otherwise>
									</c:choose>
									</span> 
									<span class="time">${item.date_range }</span>
								</span> 
								<span class="message"> ${item.content } </span>
						</a></li>
						</c:forEach>						
						<li class="external"><a href="rest/page/message">See all messages <i class="m-icon-swapright"></i></a></li>
					</ul></li>
				<!-- END INBOX DROPDOWN -->
				<!-- BEGIN TODO DROPDOWN -->
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
						<i class="icon-tasks"></i> 
						<span class="badge">${sessionScope.todoCount }</span>
					</a>
					<ul class="dropdown-menu extended tasks">
						<li>
							<p>You have ${sessionScope.todoCount } pending task(s)</p>
						</li>
						<c:forEach var="item" items="${sessionScope.todoList }">
						<c:if test="${item.type == 0 }">
							<li><a href="rest/page/adStats"> 
								<span class="task"> 
									<span class="desc">Pending approve comments</span> 
									<span class="percent">${item.percent }%</span>
								</span> 
								<span class="progress progress-success"> 
									<span style="width: ${item.percent }%;" class="bar"></span>
								</span>
							</a></li>
						</c:if>
						<c:if test="${item.type == 1 }">
							<li><a href="#"> 
								<span class="task"> 
									<span class="desc">Assign points to advertising</span> 
									<span class="percent">${item.percent }%</span>
								</span> 
								<span class="progress progress-danger progress-striped active"> 
									<span style="width: ${item.percent }%;" class="bar"></span>
								</span>
							</a></li>
						</c:if>						
						</c:forEach>						
						<li class="external"><a href="rest/page/task">See all available tasks <i class="m-icon-swapright"></i></a></li>
					</ul></li>
				<!-- END TODO DROPDOWN -->
				<!-- BEGIN USER LOGIN DROPDOWN -->
				<shiro:user>
				<li class="dropdown user">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
						<img src="http://gravatar.com/avatar/${sessionScope.loginedUser.md5Email }?s=29&d=&r=g" /> 
						<span class="username"> 
							<c:choose>
								<c:when test="${sessionScope.loginedUser.firstName == null || sessionScope.loginedUser.firstName == '' || sessionScope.loginedUser.lastName == null || sessionScope.loginedUser.lastName == ''}">${sessionScope.loginedUser.username }</c:when>
								<c:otherwise>${sessionScope.loginedUser.firstName} ${sessionScope.loginedUser.lastName}</c:otherwise>
							</c:choose>
						</span> 
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
<script src="media/js/jquery-1.10.1.min.js" type="text/javascript"></script>
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
</script>
