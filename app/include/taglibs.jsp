<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<fmt:setLocale value="en_US"/>
<c:set var="ctx" value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/" />
<!-- c:set var="path" value="https://rawgit.com/easytebrowser/TEMBrowser/master/" /> -->
<c:set var="path" value="" />
<script type="text/javascript">
var ctx = '${ctx}';
var path = '${path}';
</script>