<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="page-sidebar nav-collapse collapse">
	<!-- BEGIN SIDEBAR MENU -->
	<ul class="page-sidebar-menu">
		<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
		<li>
			<div class="sidebar-toggler hidden-phone"></div>
		</li>
		<li class="start active ">
			<a href="rest/admin/summary" id="btn_summary" title="Summary">
				<i class="icon-home"></i> <span class="title">Summary</span> <span class="selected"></span>
			</a>
		</li>
		<!-- END SIDEBAR TOGGLER BUTTON -->

		<c:forEach items="${result }" var="menu1">
			<!-- BEGIN FIRST LEVEL MENU -->
			<c:if test="${menu1.parentId=='0'}">
				<li class="">
					<a href="javascript:;">
						<i class="icon-cogs"></i> <span class="title">${menu1.permissionName}</span> <span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<c:forEach items="${result }" var="menu2">
							<c:if test="${menu2.parentId==menu1.id}">
								<!-- BEGIN SECOND LEVEL MENU -->
								<c:if test="${menu2.link==''}">
									<li>
										<a href="javascript:;">
											${menu2.permissionName} <span class="arrow"></span>
										</a>
										<ul class="sub-menu">
											<c:forEach items="${result }" var="menu3">
												<c:if test="${menu3.parentId==menu2.id}">
													<li>
														<a id="${menu3.permissionSign }" href="${menu3.link}" title="${menu3.title}"> ${menu3.permissionName}</a>
													</li>
												</c:if>
											</c:forEach>
										</ul>
									</li>
								</c:if>
								<!-- BEGIN SECOND LEVEL MENU -->
								<c:if test="${menu2.link!=''}">
									<li>
										<a id="${menu2.permissionSign }" href="${menu2.link}" title="${menu2.title}"> ${menu2.permissionName}</a>
									</li>
								</c:if>
							</c:if>
						</c:forEach>
					</ul>
				</li>
			</c:if>
			<!-- END FIRST LEVEL MENU -->
		</c:forEach>
	</ul>
	<!-- END SIDEBAR MENU -->
</div>