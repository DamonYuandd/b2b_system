/**
* ??
* @create yuan.gy 2012-09-19
*/
("irecom" in FE.sys)||(function(e,i,g){var b=g.dmtrack_pageid=(typeof g.dmtrack_pageid==="undefined")?(new Date()-0+""+Math.floor((Math.random()*1000))):g.dmtrack_pageid,f=Object.prototype.hasOwnProperty,c={},h=[],d={template:null,filter:null,statScene:"",apiUrl:"http://res.china.alibaba.com/fly/irecom.do",debug:false,debugUrl:"http://10.20.150.79/fly/irecom.do",datalazyload:false,ctrQueue:[],onTemplateReady:null,onLazyloadReady:null,onSuccess:null,onFailure:null};function a(j,m,l){var k=this;if(!(k instanceof a)){return new a(j,m,l)}k.container=e(j)||e(g.document);k.config=e.extend(true,{},d,l);k.params=e.isPlainObject(m)?m:{};k._init()}e.extend(a.prototype,{_init:function(){var r=this,j={},n=g.location.search.substring(1).toLowerCase(),p,o=i.lastLoginId,l=i.loginId,k=e.util.cookie("ali_beacon_id"),q;try{p=e.unparam(n,"&").memberid}catch(m){}j.uid=p||l||o||k||-1;j.pageid=b;r.params=e.extend(true,{},j,r.params);r.config.debug&&(r.config.apiUrl=r.config.debugUrl);if(r.config.datalazyload){e.use("web-datalazyload",function(){q=r.datalazyload=i.datalazyload;q.bind(r.container,function(){r._request()});q.init()})}else{r._request()}},_request:function(){var j=this;e.ajax({url:j.config.apiUrl,data:j.params,dataType:"jsonp",success:function(k){if(j._isCorrect(k)){j._onCallback(k)}else{j._onFailure()}},error:function(){j._onFailure()}})},_isCorrect:function(m){var k=this,l=k.config,j=false;if(!!m&&m.success&&(m.data.returnCode===0)&&(e.isArray(m.data.data))){if(typeof l.filter==="number"&&l.filter>=1){m.data.data=m.data.data.slice(0,l.filter)}else{if(typeof l.filter==="function"){m.data.data=e.grep(m.data.data,l.filter)}}if(m.data.data.length>0){j=true}}return j},_onCallback:function(l){var j=this,k=j.data=l.data;j._loadTemplate(e.proxy(j,"_renderData"))},_loadTemplate:function(o){var k=this,n=k.data.data,m=k.config,j=k.container,l;if(!m.template){j.html("<p>????壡</p>")}else{if(l){return o(l)}e.use("web-sweet",function(){m.onTemplateReady&&m.onTemplateReady.call(k,n);l=i.sweet(m.template);o(l)})}},_renderData:function(m){var k=this,n=k.data.data,l=k.config,j=k.container;k.tpl=m;if(k.config.datalazyload){k._datalazyloadHandler()}else{k._renderHandler();l.onSuccess&&l.onSuccess.call(k,n)}},_datalazyloadHandler:function(){var j=this,l=j.data.data,k=j.config;j._renderHandler();k.onLazyloadReady&&k.onLazyloadReady.call(j,l);j.datalazyload.register({containers:j.container});k.onSuccess&&k.onSuccess.call(j,l)},_renderHandler:function(){var k=this,l=k.data.data,j=k.container;tpl=k.tpl;j.html(e(tpl.applyData(l,k)));k._clickstat();k._ctrstat()},_onFailure:function(){var k=this,j=k.container,l=k.config;if(l.onFailure===null){j.html('<p>???<a target="_self" href="javascript:location.reload();">?</a>?</p>')}else{l.onFailure.call(j)}},_clickstat:function(){var j=this;j.container.delegate("a[data-clickstat]","mousedown",function(o){var p={},n=e(this).data("clickstat"),l=[],k;n=j._parseObj(n);n.objectId&&(p.objectId=n.objectId);n.alg&&(p.alg=n.alg);n.pid&&(p.pid=n.pid);n.objectType&&(p.objectType=n.objectType);p.page=j.config.statScene;p.recId=j.params.recid;p.st_page_id=b;p.time=new Date().getTime();for(k in p){if(f.call(p,k)){l.push(k+"="+p[k])}}l="?"+l.join("&");e.getScript("http://stat.china.alibaba.com/bt/1688_click.html"+l)})},_ctrstat:function(){var j=this,k=j.config.ctrQueue;j.ctrData={};e.each(k,function(l,m){if(j._isCtrBatch(m)){j._sniffBatch(m,l)}else{j.datalazyload.bind(j.container.find(m.selector),function(n){j._ctrRequest(m.param,j._sniffNode(e(n)))})}});e.each(k,function(l,m){if(j._isCtrBatch(m)){j._ctrBatch(m,l)}})},_isCtrBatch:function(k){var j=this;return(!j.config.datalazyload||typeof k.ctrBatch==="undefined"||k.ctrBatch)},_sniffBatch:function(m,k){var j=this,l=j.ctrData;e.isArray(l[k])||(l[k]=[]);l[k]=j._sniffNode(e(m.selector,j.container))},_sniffNode:function(m){var k=this,j=[],l;k.container.find(m).each(function(){l=k._parseObj(e(this).data("ctr"));if(!e.isPlainObject(l)){l={objectId:"",alg:""}}j.push((l.objectId||"")+","+(l.alg||""))});return j},_ctrBatch:function(n,l){var j=this,m=j.ctrData,k=n.size||m[l].length,p=n.start||0;j._ctrRequest(n.param,m[l].slice(p,p+k))},_ctrRequest:function(k,o){var l=this,p=k||{},n=[],j;p.object_ids=o.join(";");p.page_area=l.params.recid;p.ctr_type=l.config.statScene;p.page_id=b;for(j in p){if(f.call(p,j)){n.push(j+"="+p[j])}}n="?"+n.join("&");e.getScript("http://ctr.china.alibaba.com/ctr.html"+n)},ctrManual:function(n,k,m,o){var l=this,j=l._sniffNode(n);m=m||j.length;o=o||0;l._ctrRequest(k,j.slice(o,o+m))},_parseObj:function(j){try{return(typeof j==="object")?j:(new Function("return "+j))()}catch(k){return{}}}});a.fitLength=function(k,j){k=e.util.unescapeHTML(k);if(k.lenB()>j){k=k.cut(j-3)+"..."}return e.util.escapeHTML(k)};a.getOfferUrl=function(k){var j=(!!k.eURL)?k.eURL:k.offerDetailUrl;return j};a.getSearchUrl=function(j){var k="http://search.china.alibaba.com/search/offer_search.htm?keywords="+j.categoryDesc;return k};a.getCompanyUrl=function(j){var k=j.contact;return k};a.getBizrefUrl=function(k){var m=k.domainID,j=k.memberId,l="";!m||(l="http://"+m+".cn.alibaba.com/athena/bizreflist/"+m+".html");!j||(l="http://"+j+".cn.alibaba.com/athena/bizreflist/"+j+".html");return l};a.getPrice=function(k,l){var j="",l=l||0;if([0,""].indexOf(k.rmbPrice)===-1){j='<span class="fd-cny">&yen;</span><em class="value">'+k.rmbPrice+"</em>"+(l?'<span class="unit">/'+k.unit+"</span>":"")}else{if([0,""].indexOf(k.foreignPrice)===-1){j='<em class="value">'+k.foreignPrice+k.foreignCurrency+"</em>"+(l?'<span class="unit">/'+k.unit+"</span>":"")}else{j='<em class="value">?</em>'}}return j};a.getImgUrl=function(m,k){var j=m.offerImageUrl,l=k||100,n="";if(!j){if(l<151){if(l<101){n="http://img.china.alibaba.com/cms/upload/other/nopic-100.png"}else{n="http://img.china.alibaba.com/cms/upload/other/nopic-150.png"}}else{if(l<221){n="http://img.china.alibaba.com/cms/upload/other/nopic-220.png"}else{n="http://img.china.alibaba.com/cms/upload/other/nopic-310.png"}}}else{if(l<151){if(l<101){n=j+".summ.jpg"}else{n=j+".search.jpg"}}else{if(l<221){n=j+".220x220.jpg"}else{n=j+".310x310.jpg"}}}return n};a.p4pSort=function(j){j.sort(function(m,l){var k=(!m.eURL)?1:0,n=(!l.eURL)?1:0;return k-n})};a.resizeImg=function(k,j,n){k.removeAttribute("width");k.removeAttribute("height");var l;if(g.ActiveXObject){l=new Image();l.src=k.src}else{l=k}if(l&&l.width&&l.height&&j){if(!n){n=j}if(l.width>j||l.height>n){var o=l.width/l.height,m=o>=j/n;k[m?"width":"height"]=m?j:n;if(g.ActiveXObject){k[m?"height":"width"]=(m?j:n)*(m?1/o:o)}}}};FE.sys.irecom=a;e.add("sys-irecom")})(jQuery,FE.util,window);;

/**
* ??
* @version 1.0.20120702
* @author changbin.wangcb
* @modified by xutao.xut 20120801
* @modified by daniel.xud 20121009 container.data('categoryIds')????
* @modified by xutao.xut 20121111 ??
*/
jQuery.namespace('FE.operation');
(function($,NS){
var container;
NS.daily = {
requestServerTime:$.Deferred(),
serverTime:new Date()
};
//
function initCal () {
$.ajax({
url: 'http://wholesale.china.alibaba.com/json/GetOfferNum.jsx',
dataType: 'jsonp',
data:{
categoryids:container.data('categoryIds')||0
},
timeout: 3000
}).done(function(o){
if(o&&o.success=='true'){
var serverTime = new Date();
serverTime.setTime(+o.data.serverTimeMillis);
renderDate(serverTime);
NS.daily.serverTime = serverTime;
NS.daily.requestServerTime.resolve();
if(!container.data('categoryIds')){
return;
}
renderGoods(o.data.currentDaySum,o.data.allSum);
}else{
renderDate();
}
}).fail(function(){
renderDate();
});
}
function renderGoods(current,total){
var em = $('.cal-trends em',container);
if(current&&current!=="0"){
em.eq(0).text(current);
}
if(total&&total!=="0"){
em.eq(1).text(total);
}
}
function renderDate(serverTime){
var
$d = $('.cal-d',container),
$y = $('span.cal-year', container),
$m = $('span.cal-month', container),
date = serverTime||(new Date()),
year = date.getFullYear(),
month = date.getMonth() + 1,
day = date.getDate();
month = month > 9 ? month : '0' + month;
day = day > 9 ? day : '0' + day;
$y.text(year);
$m.text(month);
$d.text(day);
}
$(function(){
container = $('.mod-cal');
if(container.length){
initCal();
}
});
})(jQuery,FE.operation);;
/**
* ??????
* @author : yu.yuy
* @createTime : 2011-9-20
*/
jQuery.namespace('FE.operation.module');
(function($,M){
var win = window,
doc = document;
M.Category = function(options){
this.init(options);
},
M.Category.prototype = {
init : function(options){
var parentCategoriesSelector = options.parentCategoriesSelector;
this.subCategorySelector = options.subCategorySelector;
this.enterTimer = null;
this.leaveTimer = null;
this.currentIndex = null;
this.hasSubCategoryOpened = false;
this.subCategoryCache = function(){
var o = {};
return {
hasStoraged : function(i){
return !!o[i];
},
getSubCategory : function(i){
return o[i]['el'];
},
getSubCategoryHeight : function(i){
return o[i]['height'];
},
store : function(i,subEl,height){
o[i] = {
el : subEl,
height : height
}
}
};
}();
this.adjustment = options.adjustment || 0;
this.parentCategoriesList = $('#'+options.parentCategoriesListId);
this.parentCategories = $.makeArray(this.parentCategoriesList.children(parentCategoriesSelector));
this.parentCategoriesListPosition = this.parentCategoriesList.offset();
this.parentCategoriesListTop = this.parentCategoriesListPosition.top;
this.parentCategoriesList.delegate(parentCategoriesSelector,'mouseenter',$.proxy(this.showSubCategory, this));
this.parentCategoriesList.delegate(parentCategoriesSelector,'mouseleave',$.proxy(this.hideSubCategory, this));
},
/**
* ??λ??
* @return ret ?λ??
* @param h ??
* @param vh ??
* @param ah ???λ??
* @param ph ??λ??
* @param st ????
*/
locate : function(h,vh,ah,ph,st){
var top = 0;
if(ah >= st){
if(h <= vh-ph+st){
top = 0;
}
else if((h>vh-ph+st)&&(h<=vh-ah+st)){
top = vh-ph+st-h;
}
else{
top = ah-ph;
}
}
else if(st>ah && st<ph){
if(h <= vh-ph+st){
top = 0;
}
else if((h>vh-ph+st) && h<=vh){
top = vh-ph+st-h;
}
else{
top = st-ph;
}
}
else{
top = 0;
}
return top+this.adjustment;
},
showSubCategory : function(e){
var el = e.currentTarget,
that = this,
cache = that.subCategoryCache,
viewportHeight,
scrollTop,
subEl,
height,
elTop,
subRelativeTop,
index = that.parentCategories.indexOf(el);
if(that.currentIndex===index && that.leaveTimer){
clearTimeout(that.leaveTimer);
}
if(that.hasSubCategoryOpened && that.currentIndex===index){
return;
}
that.enterTimer = setTimeout(function(){
that.currentIndex = index;
viewportHeight = $(win).height();
scrollTop = $(doc).scrollTop();
if(cache.hasStoraged(index)){
subEl = cache.getSubCategory(index);
height = cache.getSubCategoryHeight(index);
}
else{
subEl = $(el).children('.'+that.subCategorySelector).first();
height = subEl.outerHeight();
cache.store(index,subEl,height);
}
elTop = $(el).offset().top;
subRelativeTop = that.locate(height,viewportHeight,that.parentCategoriesListTop,elTop,scrollTop);
$(el).addClass('current');
$(subEl).css('top',subRelativeTop+'px');
that.enterTimer = null;
that.hasSubCategoryOpened = true;
},300);
},
hideSubCategory : function(e){
var that = this,
el = e.currentTarget,
index = that.parentCategories.indexOf(el);
if(that.enterTimer){
clearTimeout(that.enterTimer);
}
if(!that.hasSubCategoryOpened || that.currentIndex!==index){
return;
}
that.leaveTimer = setTimeout(function(){
$(el).removeClass('current');
that.leaveTimer = null;
that.hasSubCategoryOpened = false;
},300);
}
};
})(jQuery,FE.operation.module);;
/**
* ??
* @create raywu 2012-06-25
*/
(function($){
$(function(){
$('#material-category li.item').each(function(){
var w1=$(this).find('.cate-extra-main').outerWidth()||0,
w2=$(this).find('.cate-extra-aside').outerWidth()||0,
w3=$(this).find('.cate-extra-append').outerWidth()||0;
if(w1+w2+w3!==0){
$(this).find('.cate-extra').css('width',w1+w2+w3);
}else{
$(this).addClass('cate-extra-none');
}
});
new FE.operation.module.Category({
parentCategoriesListId : 'material-category',
parentCategoriesSelector : 'li.item',
subCategorySelector : 'cate-extra',
adjustment:-3
});
});
})(jQuery);;
/**
* ????
* @create shiwei.dengsw 2012-07-13
* moved from http://static.c.aliimg.com/js/app/operation/industrial/page/instrumentation/neworder.js
*/
(function($){
function _render (o) {
var orderList, order, html = [], len, i, newOrderNode = $('#scroll-new-order');
if(o && o['isSuccess']){
orderList = o['data'];
for (len = orderList.length, i=len-1; i>=0; i--) {
order = orderList[i];
html.push('<li class="' + (i%2 === 0 ? 'odd' : 'even') + '">',
'<div class="order-offer"><a href="' + order['offerDetailUrl'] + '" title="' + order['productName'] + '">' + order['productName'] + '</a></div>',
'<div class="order-company"><a href="' + order['companyUrl'] + '" title="' + order['companyName'] + '">' + order['companyName'] + '</a></div>',
'<div class="order-contact"><a data-alitalk="{id:\'' + order['sellerMemberId'] + '\'}" href="#"></a></div>',
'<div class="order-price">' + order['price'] + '</div>',
'<div class="order-number">' + order['quantity'] + order['unit'] + '</div>',
'<div class="order-time">' + order['orderTime'] + '</div>',
'</li>');
};
newOrderNode.find('ul').html(html.join(''));
$.use('web-alitalk', function() {
FE.util.alitalk($('li div.order-contact a[data-alitalk]', newOrderNode));
});
$.use('ui-tabs-effect', function () {
newOrderNode.tabs({
effect:'scroll',
scrollType:'loop',
direction:'up',
boxSelector:'li'
});
});
}
}
function initNewOrderList () {
var newOrderNode = $('#scroll-new-order');
if (newOrderNode.length === 0) {
return;
}
$.ajax('http://trade.china.alibaba.com/order/ajax/order_stat.jsx',{
data:newOrderNode.data(),
dataType : 'jsonp'
}).done(_render);
}
$(document).ready(function (ev) {
initNewOrderList();
})
})(jQuery);;
/**
* ??
* @create shiwei.dengsw 2012-07-16
* moved from http://static.c.aliimg.com/js/app/operation/material/page/spinning/spinning.js
*/
(function($){
/**
* ?б
*/
function initHotRankList () {
var node = $('#recent-hot-tab'), buffer, recid, pid, statScene;
if (node.length === 0) {
return;
}
recid = node.data('recid');
pid = node.data('pid');
statScene = node.data('statscene');
buffer = [
'<ul>',
'<%foreach ($data as cate) { %>',
'<li><%= cate.categoryDesc %></li>',
'<% } %>',
'</ul>',
'<div class="tab-bd">',
'<%foreach ($data as cate) { %>',
'<div class="tab-box">',
'<%foreach (cate.offerIds as item) { %>',
'<% if ($index < 3) { %>',
'<dl data-ctr="{\'objectId\':\'<%= item.offerId %>\',\'alg\':\'<%= item.alg %>\'}">',
'<dt><a data-clickstat="{\'objectType\':\'offer\',\'pid\':\'' + pid + '\',\'objectId\':\'<%= item.offerId %>\',\'alg\':\'<%= item.alg %>\'}" href="<%= FE.sys.irecom.getOfferUrl(item) %>" title="<%= item.subject %>"><img src="<%= FE.sys.irecom.getImgUrl(item, 72) %>" alt="<%= item.subject %>" width="72" height="72" /></a></dt>',
'<dd class="title"><a data-clickstat="{\'objectType\':\'offer\',\'pid\':\'' + pid + '\',\'objectId\':\'<%= item.offerId %>\',\'alg\':\'<%= item.alg %>\'}" href="<%= FE.sys.irecom.getOfferUrl(item) %>" title="<%= item.subject %>"><%= FE.sys.irecom.fitLength(item.subject,22) %></a></dd>',
'<dd><span class="fd-cny">&yen;<em><%= item.rmbPrice %></em></span>/<%= item.unit %></dd>',
'<dd><a data-clickstat="{\'objectType\':\'offer\',\'pid\':\'' + pid + '\',\'objectId\':\'<%= item.offerId %>\',\'alg\':\'<%= item.alg %>\'}" href="<%= FE.sys.irecom.getCompanyUrl(item) %>" title="<%= item.company %>"><%= FE.sys.irecom.fitLength(item.company,22) %></a></dd>',
'</dl>',
'<% } %>',
'<% } %>',
'</div>',
'<% } %>',
'</div>'
];
FE.sys.irecom(node, { recid: recid }, {
template: buffer.join(''),
filter: 3,
statScene: statScene,
ctrQueue:[
{
selector:'div.tab-bd div.tab-box dl',
size:3,
param:{object_type:'offer'}
}
],
onSuccess: function () {
$.use('ui-tabs-effect', function () {
node.tabs({
isAutoPlay: false,
boxSelector:'.tab-bd .tab-box',
titleSelector:'ul li'
});
});
},
datalazyload:true
});
}
$(document).ready(function (ev) {
initHotRankList();
})
})(jQuery);;
/**
* ??
* @create shiwei.dengsw 2012-07-04
*/
(function($){
function initTabs () {
$.use('ui-tabs-effect', function () {
$('.mod-head-slider').tabs({
boxSelector:'.slider-content',
titleSelector:'.slider-trigger li',
effect:'scroll',
scrollType:'loop',
direction:'left'
});
$('.mod-supplier-discount').tabs({
boxSelector:'.tabcontent',
titleSelector:'.tab li',
isAutoPlay : false
});
});
}
function initAccordion () {
// ￥tabs
$('#content').delegate('div.layout div.mod-floor div.content div.column-extra li', 'mouseenter', function (ev) {
var el = $(this);
el.siblings().removeClass('hover');
el.addClass('hover');
});
}
function initAlitalk () {
$.use('web-alitalk', function() {
FE.util.alitalk($('div.layout div.grid div.mod-floor a[data-alitalk]', '#content'));
});
}
function initHoverEffect () {
if (!$.util.ua.ie6) {
return;
}
var selector = '.mod-floor .content .column-main .offer-list div, .mod-slide .slide-bd dl';
$('#content').delegate(selector, 'mouseenter', function (ev) {
$(this).addClass('hover');
}).delegate(selector, 'mouseleave', function (ev) {
$(this).removeClass('hover');
});
}
$(document).ready( function (ev) {
initTabs();
initAccordion();
initAlitalk();
initHoverEffect();
});
})(jQuery);;





jQuery.namespace("FE.operation.module");(function(a,d){var c=window,b=document;d.Category=function(e){this.init(e)},d.Category.prototype={init:function(f){var e=f.parentCategoriesSelector;this.subCategorySelector=f.subCategorySelector;this.enterTimer=null;this.leaveTimer=null;this.currentIndex=null;this.hasSubCategoryOpened=false;this.subCategoryCache=function(){var g={};return{hasStoraged:function(h){return !!g[h]},getSubCategory:function(h){return g[h]["el"]},getSubCategoryHeight:function(h){return g[h]["height"]},store:function(j,k,h){g[j]={el:k,height:h}}}}();this.adjustment=f.adjustment||0;this.parentCategoriesList=a("#"+f.parentCategoriesListId);this.parentCategories=a.makeArray(this.parentCategoriesList.children(e));this.parentCategoriesListPosition=this.parentCategoriesList.offset();this.parentCategoriesListTop=this.parentCategoriesListPosition.top;this.parentCategoriesList.delegate(e,"mouseenter",a.proxy(this.showSubCategory,this));this.parentCategoriesList.delegate(e,"mouseleave",a.proxy(this.hideSubCategory,this))},locate:function(g,k,e,j,f){var i=0;if(e>=f){if(g<=k-j+f){i=0}else{if((g>k-j+f)&&(g<=k-e+f)){i=k-j+f-g}else{i=e-j}}}else{if(f>e&&f<j){if(g<=k-j+f){i=0}else{if((g>k-j+f)&&g<=k){i=k-j+f-g}else{i=f-j}}}else{i=0}}return i+this.adjustment},showSubCategory:function(n){var i=n.currentTarget,m=this,f=m.subCategoryCache,k,h,g,p,o,j,l=m.parentCategories.indexOf(i);if(m.currentIndex===l&&m.leaveTimer){clearTimeout(m.leaveTimer)}if(m.hasSubCategoryOpened&&m.currentIndex===l){return}m.enterTimer=setTimeout(function(){m.currentIndex=l;k=a(c).height();h=a(b).scrollTop();if(f.hasStoraged(l)){g=f.getSubCategory(l);p=f.getSubCategoryHeight(l)}else{g=a(i).children("."+m.subCategorySelector).first();p=g.outerHeight();f.store(l,g,p)}o=a(i).offset().top;j=m.locate(p,k,m.parentCategoriesListTop,o,h);a(i).addClass("current");a(g).css("top",j+"px");m.enterTimer=null;m.hasSubCategoryOpened=true},300)},hideSubCategory:function(i){var h=this,g=i.currentTarget,f=h.parentCategories.indexOf(g);if(h.enterTimer){clearTimeout(h.enterTimer)}if(!h.hasSubCategoryOpened||h.currentIndex!==f){return}h.leaveTimer=setTimeout(function(){a(g).removeClass("current");h.leaveTimer=null;h.hasSubCategoryOpened=false},300)}}})(jQuery,FE.operation.module);(function(a){function b(){a.use("ui-tabs-lazyload, ui-tabs-effect",function(){var c=a("#content");a("div.mod-mainslider div.slider-container",c).tabs({timeDelay:4,speed:"slow"})})}a(function(){b()})})(jQuery);(function(b){function c(){b.use("ui-tabs-lazyload, ui-tabs-effect",function(){var d=b("#content");b("div.mod-sub-slider div.slider-container",d).tabs({isAutoPlay:false,effect:"scroll",scrollType:"loop",direction:"left",speed:"slow",select:function(h,g){var f=b(this).find("li.f-tab-b");f.removeClass("current-tab");setTimeout(function(){f.eq(g.index).addClass("current-tab")},500)}})})}function a(){var d=b("div.mod-sub-gallery ul.list-six");if(d.length>0){d.delegate("li","mouseenter",function(){var f=b(this),g=b("div.intro",f).add("div.mask-layer",f),e=f.height();f.addClass("current");g.stop(true).animate({marginTop:0,height:e})}).delegate("li","mouseleave",function(){var f=b(this),g=b("div.intro",f).add("div.mask-layer",f),e=f.height();f.removeClass("current");g.stop(true).animate({marginTop:e-20,height:20})})}}b(function(){c();a()})})(jQuery);(function(b){var a={init:function(){this.initLazyload();this.initTab();this.initRank();this.initProductList()},initLazyload:function(){b.use("web-datalazyload",function(){FE.util.datalazyload.register({containers:b("#content div.section")})})},initTab:function(){b.use("ui-tabs-lazyload, ui-tabs-effect",function(){var c=b("#content");b("div.mod-cat",c).tabs({isAutoPlay:false})})},initRank:function(){var c=b("div.mod-rank ol.rank-list","#content");c.delegate("li","mouseenter",function(){var d=b(this);d.addClass("current").siblings("li").removeClass("current")})},initProductList:function(){var c=b("div.mod-product-list ul.list-product","#content");c.delegate("li","mouseenter",function(){b(this).addClass("current")}).delegate("li","mouseleave",function(){b(this).removeClass("current")})}};b(function(){a.init()})})(jQuery);
