<?php
defined('IN_DESTOON') or exit('Access Denied');
include tpl('header');
?>
<table cellpadding="2" cellspacing="1" class="tb">
<tr>
<td style="padding:6px 10px 6px 10px;">
<?php if($itemid) { ?>
静态文件已经整理到站点<span class="f_red">file/static</span>目录，请将static目录下的所有文件上传到静态文件服务器的站点目录。
<?php } else { ?>
<a href="?action=static&itemid=1" class="t">点这里整理需要分离的静态文件&raquo;</a>
<?php } ?>
</td>
</tr>
</table>
<?php include tpl('footer');?>