<?php
$edition = edition(1);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=<?php echo DT_CHARSET; ?>" />
<meta name="robots" content="noindex,nofollow"/>
<title>管理员登录 - Powered By JSSDW.COM <?php echo $edition;?></title>
<meta name="generator" content="smallbat"/>
<link href="admin/image/login.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" src="admin/image/jquery.js"></script>
<script src="admin/image/cloud.js" type="text/javascript"></script>
<script language="JavaScript" src="admin/image/jquery.cookie.js"></script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>lang/<?php echo DT_LANG;?>/lang.js"></script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/config.js"></script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/common.js"></script>
<script language="javascript">
$(function(){
  $('.loginbox').css({'position':'absolute','left':($(window).width()-692)/2});
$(window).resize(function(){
  $('.loginbox').css({'position':'absolute','left':($(window).width()-692)/2});
  })
});
//初始化页面时验证是否记住了密码
$(function() {
  if ($.cookie("rmbUser") == "true") {
    $("#rmbUser").attr("checked", true);
    $("#username").val($.cookie("userName"));
    $("#password").val($.cookie("passWord"));
  }
});
</script>
</head>
<body style="background-color:#1c77ac; background-image:url(admin/image/light.png); background-repeat:no-repeat; background-position:center top; overflow:hidden;">
<div id="mainBody">
  <div id="cloud1" class="cloud"></div>
  <div id="cloud2" class="cloud"></div>
</div>
<div class="logintop">
  <span>欢迎登录后台管理界面平台</span>
  <ul>
    <li><a href="#">回首页</a></li>
    <li><a href="#">帮助</a></li>
    <li><a href="#">关于</a></li>
  </ul>
</div>
<div class="loginbody">
  <span class="systemlogo"></span>
  <div class="loginbox">
    <form method="post" action="?"  onsubmit="return Dcheck();">
      <input type="hidden" name="file" value="<?php echo $file;?>"/>
      <input name="forward" type="hidden" value="<?php echo $forward;?>"/>
      <ul>
        <li><input name="username" id="username" type="text" class="loginuser" autocomplete="off" value="admin" onclick="JavaScript:this.value=''"/></li>
        <li><input name="password" type="password" id="password" class="loginpwd" value="" onclick="JavaScript:this.value=''"/></li>
        <li><input name="submit" type="submit" class="loginbtn button" value="登录"/><label><input id="rmbUser" name="rmbUser" type="checkbox" value="" checked="checked" />记住密码</label><label><a href="/member/send.php">忘记密码？</a></label></li>
      </ul>
    </form>
  </div>
</div>
<div class="loginbm">版权所有&nbsp;&nbsp; ©<?php echo timetodate($DT_TIME, 'Y'); ?><a href="<?php echo $CFG['url'] ?>">&nbsp;&nbsp;<?php echo $DT[sitename];?></a>  All Rights Reserved</div>
<script type="text/javascript">
if(Dd('password') == null) alert('看不到密码输入框？ 请检查file/cache目录是否可写');
if(Dd('username').value == '') {
  Dd('username').focus();
} else {
  Dd('password').focus();
}
function Dcheck() {
  if(Dd('username').value == '') {
    confirm('请填写会员名');
    Dd('username').focus();
    return false;
  }
  if(Dd('password').value == '') {
    confirm('请填写密码');
    Dd('password').focus();
    return false;
  }
  <?php if($DT['captcha_admin']) { ?>
  if(!is_captcha(Dd('captcha').value)) {
    confirm('请填写验证码');
    Dd('captcha').focus();
    return false;
  }
  <?php } ?>
  if ($("#rmbUser").attr("checked") == true) {
  //alert('cccccc');
        var userName = $("#username").val();
        var passWord = $("#password").val();
        $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
        $.cookie("userName", userName, { expires: 7 }); // 存储一个带7天期限的 cookie
        $.cookie("passWord", passWord, { expires: 7 }); // 存储一个带7天期限的 cookie
    }
    else {
        $.cookie("rmbUser", "false", { expires: -1 });
        $.cookie("userName", '', { expires: -1 });
        $.cookie("passWord", '', { expires: -1 });
    }
  return true;
}
</script>
</body>
</html>
