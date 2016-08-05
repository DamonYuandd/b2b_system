<?php
defined('IN_DESTOON') or exit('Access Denied');
file_del(DT_ROOT.'/include/announce.php');
file_del(DT_ROOT.'/module/modules.php');
file_del(DT_ROOT.'/sitemap/maps.php');
file_del(DT_ROOT.'/module/article/admin/template/tpl.php');
file_del(DT_ROOT.'/sell/seller.php');
file_del(DT_ROOT.'/file/image/qr-andriod.png');
file_del(DT_ROOT.'/template/'.$CFG['template'].'/mail/check.htm');
file_del(DT_ROOT.'/template/'.$CFG['template'].'/mail/editemail.htm');
file_del(DT_ROOT.'/template/'.$CFG['template'].'/mail/password.htm');
file_del(DT_ROOT.'/template/'.$CFG['template'].'/mail/payword.htm');
file_del(DT_ROOT.'/template/'.$CFG['template'].'/mail/validate.htm');
?>