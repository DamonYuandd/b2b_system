<?php
defined('IN_DESTOON') or exit('Access Denied');
$edition = edition(1);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo DT_CHARSET; ?>"/>
<title>无标题文档</title>
<link href="admin/image/style.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" src="admin/image/jquery.js"></script>
<script type="text/javascript">
$(function(){
	//顶部导航切换
	$(".nav li a").click(function(){
		$(".nav li a.selected").removeClass("selected")
		$(this).addClass("selected");
	})
})
</script>
</head>
<body style="background:url(admin/image/topbg.gif) repeat-x;">
    <div class="topleft">
    <a href="?action=start" target="_top"><img src="admin/image/logo.png" title="系统首页" /></a>
    </div>
    <ul class="nav">
    <li><a href="?action=left&bb=2" target="leftFrame" class="selected"><img src="admin/image/icon01.png" title="我的面板" /><h2>我的面板</h2></a></li>
    <li><a href="?action=left&bb=3" target="leftFrame"><img src="admin/image/icon02.png" title="功能模块" /><h2>功能模块</h2></a></li>
    <li><a href="?action=left&bb=4"  target="leftFrame"><img src="admin/image/icon03.png" title="会员管理" /><h2>会员管理</h2></a></li>
    <!-- <li><a href="tools.html"  target="leftFrame"><img src="admin/image/icon04.png" title="常用工具"/><h2>常用工具</h2></a></li>
     -->
    <li><a href="?file=template" target="main"><img src="admin/image/icon05.png" title="文件管理" /><h2>文件管理</h2></a></li>
    <li><a href="?action=left&bb=1"  target="leftFrame"><img src="admin/image/icon06.png" title="系统设置" /><h2>系统设置</h2></a></li>
    </ul>
    <div class="topright">
    <ul>
    <li><span><img src="admin/image/help.png" title="功能搜索"  class="helpimg"/></span><a href="?file=search" target="main">功能搜索</a></li>
    <li><a href="/" target="_blank">平台首页</a></li>
    <li><a href="?file=logout" target="_top" onclick="if(!confirm('确实要注销登录吗?')) return false;">退出</a></li>
    </ul>
    <div class="user">
    <span><?php echo $_username;?></span>
    <a href="<?php echo $MODULE[2]['linkurl'].'message.php';?>" target="_blank"><i>消息</i>
      <b><?php echo $_message;?></b></a>
    </div>
    </div>
</body>
</html>
