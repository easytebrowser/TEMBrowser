<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<base href="${ctx }">
<div class="page-sidebar nav-collapse collapse visible-phone visible-tablet">
	<ul id="sidebar_header" class="page-sidebar-menu">
		<li><a href=""><i class="icon-home"></i> Home</a></li>
		<shiro:guest>
		<li><a href="javascript:;"><i class="icon-user"></i> Members <span class="arrow"></span></a>
			<ul class="sub-menu">
				<li><a href="${ctx }rest/page/login"><i class="icon-user"></i> Login</a></li>
				<li><a href="${ctx }rest/page/signup"><i class="icon-user-md"></i> Signup</a></li>				
			</ul>
		</li>			
		</shiro:guest>
		<shiro:user>
		<li><a href="rest/page/dashboard"><i class="icon-bar-chart"></i> Dashboard </a></li>
		<li><a href="rest/page/purchase"><i class="icon-shopping-cart"></i> Purchase </a></li>
		<li><a href="javascript:;"><i class="icon-cogs"></i> Account <span class="arrow"></span></a>
			<ul class="sub-menu">
				<li><a href="javascript:;"> History <span class="arrow"></span></a>
					<ul class="sub-menu">
						<li><a href="rest/page/accountHistory/?t=c">Commission</a></li>
						<li><a href="rest/page/accountHistory/?t=p">Points</a></li>									
					</ul>
				</li>
				<li><a href="javascript:;"> Templates <span class="arrow"></span></a>
					<ul class="sub-menu">
						<li><a href="rest/page/sites/?t=a">Available</a></li>
						<li><a href="rest/page/sites/?t=p">Purchased</a></li>									
					</ul>
				</li>							
				<li><a href="javascript:;"> Advertising <span class="arrow"></span></a>
					<ul class="sub-menu">
						<li><a href="rest/page/adSetup">Set Up</a></li>
						<li><a href="rest/page/adStats">Statistics</a></li>									
					</ul>
				</li>
				<li><a href="rest/page/referrals">Referrals</a></li>
				<li><a href="rest/page/prizePool">Prize Pool</a></li>
			</ul>
		</li>		
		</shiro:user>
		<li><a href="rest/page/download"><i class="icon-download-alt"></i> Download </a></li>
		<li><a href="javascript:;"><i class="icon-briefcase"></i> Extra <span class="arrow"></span></a>
			<ul class="sub-menu">								
				<li><a href="rest/page/faqs">FAQs</a></li>
				<li><a href="rest/page/promote">Affiliate Tool</a></li>
				<li><a href="rest/page/tos">Terms & Privacy</a></li>
				<li><a href="rest/page/contact">Contact Us</a></li>
				<li><a href="rest/page/topPromoters">Top Promoters</a></li>				
			</ul> 
		</li>		
	</ul>
</div>
<script src="media/js/jquery-1.10.1.min.js" type="text/javascript"></script>
<script>
jQuery(document).ready(function() {
	//设置选中菜单样式
	var flag = '${pageFlag}';
	$('#sidebar_header').find("li").each(function(){
		var atag = $(this).find("a").first();
		var atext = $.trim($(atag).text());
		if(atext == flag){
			$(this).attr('class', 'active');
			var i = $(this).find("i").first();
			$(i).append('<span class="selected"></span>');
		}
	});		
});	
</script>

