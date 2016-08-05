<?php
defined('IN_DESTOON') or exit('Access Denied');
file_del(DT_ROOT.'/'.$MODULE[4]['moduledir'].'/index.inc.html');
file_del(DT_ROOT.'/admin/template/md5_add.tpl.php');
$db->query("ALTER TABLE `{$DT_PRE}address` ADD `areaid` INT( 10 ) UNSIGNED NOT NULL DEFAULT  '0' AFTER  `truename`");
?>