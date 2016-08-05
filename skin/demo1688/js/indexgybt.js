jQuery.namespace("FE.operation.module");(function(a,b){var c=window,d=document;b.Category=function(e){this.init(e)},b.Category.prototype={init:function(e){var f=e.parentCategoriesSelector;this.subCategorySelector=e.subCategorySelector;this.enterTimer=null;this.leaveTimer=null;this.currentIndex=null;this.hasSubCategoryOpened=false;this.subCategoryCache=function(){var g={};return{hasStoraged:function(h){return !!g[h]},getSubCategory:function(h){return g[h]["el"]},getSubCategoryHeight:function(h){return g[h]["height"]},store:function(i,h,j){g[i]={el:h,height:j}}}}();this.adjustment=e.adjustment||0;this.parentCategoriesList=a("#"+e.parentCategoriesListId);this.parentCategories=a.makeArray(this.parentCategoriesList.children(f));this.parentCategoriesListPosition=this.parentCategoriesList.offset();this.parentCategoriesListTop=this.parentCategoriesListPosition.top;this.parentCategoriesList.delegate(f,"mouseenter",a.proxy(this.showSubCategory,this));this.parentCategoriesList.delegate(f,"mouseleave",a.proxy(this.hideSubCategory,this))},locate:function(h,e,j,f,i){var g=0;if(j>=i){if(h<=e-f+i){g=0}else{if((h>e-f+i)&&(h<=e-j+i)){g=e-f+i-h}else{g=j-f}}}else{if(i>j&&i<f){if(h<=e-f+i){g=0}else{if((h>e-f+i)&&h<=e){g=e-f+i-h}else{g=i-f}}}else{g=0}}return g+this.adjustment},showSubCategory:function(g){var l=g.currentTarget,h=this,o=h.subCategoryCache,j,m,n,e,f,k,i=h.parentCategories.indexOf(l);if(h.currentIndex===i&&h.leaveTimer){clearTimeout(h.leaveTimer)}if(h.hasSubCategoryOpened&&h.currentIndex===i){return}h.enterTimer=setTimeout(function(){h.currentIndex=i;j=a(c).height();m=a(d).scrollTop();if(o.hasStoraged(i)){n=o.getSubCategory(i);e=o.getSubCategoryHeight(i)}else{n=a(l).children("."+h.subCategorySelector).first();e=n.outerHeight();o.store(i,n,e)}f=a(l).offset().top;k=h.locate(e,j,h.parentCategoriesListTop,f,m);a(l).addClass("current");a(n).css("top",k+"px");h.enterTimer=null;h.hasSubCategoryOpened=true},300)},hideSubCategory:function(e){var f=this,g=e.currentTarget,h=f.parentCategories.indexOf(g);if(f.enterTimer){clearTimeout(f.enterTimer)}if(!f.hasSubCategoryOpened||f.currentIndex!==h){return}f.leaveTimer=setTimeout(function(){a(g).removeClass("current");f.leaveTimer=null;f.hasSubCategoryOpened=false},300)}}})(jQuery,FE.operation.module);(function(a){a(document).ready(function(){a("#mod-catpanel-id li div.subcat div.item").each(function(b,c){c=a(c);if(c.children(".sub-rec").length===0){c.css("width","380px")}});new FE.operation.module.Category({parentCategoriesListId:"mod-catpanel-id",parentCategoriesSelector:"li",subCategorySelector:"subcat",adjustment:-1})})})(jQuery);(function(b){function a(){var c=b("div.mod-integrity");c.delegate("li.tab","mouseenter",function(){var d=b(this);d.addClass("current")}).delegate("li.tab","mouseleave",function(){var d=b(this);d.removeClass("current")})}b(function(){a()})})(jQuery);jQuery.namespace("FE.operation");(function(f,e){var b;e.daily={requestServerTime:f.Deferred(),serverTime:new Date()};function a(){f.ajax({url:"http://wholesale.china.alibaba.com/json/GetOfferNum.jsx",dataType:"jsonp",data:{categoryids:b.data("categoryIds")||0},timeout:3000}).done(function(h){if(h&&h.success=="true"){var g=new Date();g.setTime(+h.data.serverTimeMillis);c(g);e.daily.serverTime=g;e.daily.requestServerTime.resolve();if(!b.data("categoryIds")){return}d(h.data.currentDaySum,h.data.allSum)}else{c()}}).fail(function(){c()})}function d(i,h){var g=f(".cal-trends em",b);if(i&&i!=="0"){g.eq(0).text(i)}if(h&&h!=="0"){g.eq(1).text(h)}}function c(j){var i=f(".cal-d",b),l=f("span.cal-year",b),m=f("span.cal-month",b),h=j||(new Date()),k=h.getFullYear(),n=h.getMonth()+1,g=h.getDate();n=n>9?n:"0"+n;g=g>9?g:"0"+g;l.text(k);m.text(n);i.text(g)}f(function(){b=f(".mod-cal");if(b.length){a()}})})(jQuery,FE.operation);(function(a){a(document).ready(function(){a.use("ui-tabs-effect",function(){a("div.mod-mainslide").tabs()})})})(jQuery);(function(a){a(document).ready(function(){a.use("ui-tabs-effect",function(){(function(){var b=a("div.mod-subslide");b.tabs({isAutoPlay:false,effect:"scroll",scrollType:"loop",direction:"left",select:function(d,c){a(this).find("div.slide-trigger span").html("<em>"+(c.index+1)+"</em>/"+a(this).tabs("length"))},selected:-1});b.delegate("div.slide-trigger a","click",function(e){e.preventDefault();var c=a(this),d=c.closest("div.mod-subslide");if(c.hasClass("slide-prev")){d.tabs("next")}else{d.tabs("prev")}})})()})})})(jQuery);jQuery.namespace("FE.operation.module");(function(a,b){var c=window,d=document;b.TradeRank=function(e){this._init(e)};b.TradeRank.expTrace=function(e){e=e||"hangye_search_wgt_saletop";if(baseClick){baseClick("http://stat.china.alibaba.com/sectionexp.html","?sectionexp="+e+"_show")}};b.TradeRank.prototype={_init:function(g){var i=this;i.container=a(g.container);i.template=g.template||"";i.errorMsg=g.error||"\u7f51\u7edc\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e";i.type=g.type||"offer";i.tracePrefix=g.trace||"hangye_search_wgt_saletop";var h,f={cateId:"1",rankCycle:"7",rankType:"H"},e=i.container.data();a.extendIf(e,f);switch(i.type){case"company":h="http://top.china.alibaba.com/trade/companyTradeRank/companyRank.jsonp";break;case"offer":default:h="http://top.china.alibaba.com/trade/sellofferTradeRank/sellofferRank.jsonp";break}i._request(h,e)},_request:function(f,e){var g=this;a.ajax({url:f,dataType:"jsonp",data:{cateId:e.cateId,rankCycle:e.rankCycle,rankType:e.rankType},success:function(h){if(h&&(!h.hasError)&&typeof h.content.data==="object"){switch(g.type){case"company":g._render(h.content.data.companyList);break;case"offer":default:g._render(h.content.data.offerList);break}}else{g._error()}},error:function(){g._error()}})},_render:function(e){var f=this;if(e.length>0){if(a.isFunction(f.template)){f.template(e)}else{a.use("web-sweet",function(){var g=FE.util.sweet(f.template).applyData(e);f.container.html(g)})}f._initClickTrace()}else{f._error()}},_error:function(){if(a.isFunction(this.errorMsg)){this.errorMsg()}else{this.container.html(this.errorMsg)}},_initClickTrace:function(){var e=this;if(baseClick){switch(e.type){case"company":e.container.delegate("a","click",function(f){var h=a(this),g=h.closest("[data-member-id]"),i=g.data("memberId");if(i){baseClick("http://stat.china.alibaba.com/search/queryreport.html","?searchtrace="+e.tracePrefix+"_click_member_"+i)}});break;case"offer":default:e.container.delegate("a","click",function(f){var h=a(this),g=h.closest("[data-offer-id]"),i=g.data("offerId");if(i){baseClick("http://stat.china.alibaba.com/search/queryreport.html","?searchtrace="+e.tracePrefix+"_click_offer_"+i)}});break}}}}})(jQuery,FE.operation.module);(function(a){a(document).ready(function(){a(".accordion-list").delegate("li","mouseenter",function(c){var b=a(this);b.siblings().removeClass("hover");b.addClass("hover")})})})(jQuery);



(function(a){a(document).ready(function(){var d=a("#scroll-new-order"),b=function(g){var f,e;if(g&&g.isSuccess){f=g.data;e=f.length;while(e--){c(f[e])}}},c=function(f){var e='<li class="item"><span class="order-offer"><a href="'+f.offerDetailUrl+'" title="'+f.productName+'">'+f.productName+'</a></span><span class="order-company"><a href="'+f.companyUrl+'" title="'+f.companyName+'">'+f.companyName+'</a></span><span class="order-contact"><a data-alitalk="{id:\''+f.sellerMemberId+'\'}" href="#" class="alitalk alitalk-on" title="\u6211\u6b63\u5728\u7f51\u4e0a\uff0c\u9a6c\u4e0a\u548c\u6211\u6d3d\u8c08">\u548c\u6211\u8054\u7cfb</a></span><span class="order-price"><em>'+f.price+'</em></span><span class="order-number"><em>'+f.quantity+f.unit+'</em></span><span class="order-amount"><em>'+f.amount+'</em></span><span class="order-time">'+f.orderTime+"</span></li>";d.find("ul.tbody-new-order").append(e);a.use("web-alitalk",function(){FE.util.alitalk(d.find(".order-contact a"))});a.use("ui-tabs-effect",function(){d.tabs({effect:"scroll",scrollType:"loop",direction:"up",boxSelector:"li.item"})});d.find("li.item").hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")})};a.ajax("http://trade.china.alibaba.com/order/ajax/order_stat.jsx",{data:{type:"elecOrders",from:d.data("orderfrom"),categoryKey:d.data("orderkey")},dataType:"jsonp"}).done(b)})})(jQuery);(function(a){a(document).ready(function(){a(".mod-brand-show .list-brand-show li").hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")})})})(jQuery);(function(a){a(document).ready(function(){a.use("ui-tabs",function(){a(".mod-floor-tiny .aside-floor-show").tabs({isAutoPlay:false,titleSelector:".tab-trigger li",boxSelector:".tab-content li.item",selected:-1});a(".mod-floor-tiny .main-floor-show").tabs({isAutoPlay:false,titleSelector:".tab-trigger li",boxSelector:".tab-content"})});a(".mod-floor-tiny .aside-floor-show .aside-floor-brick li").hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")})})})(jQuery);(function(a){a(document).ready(function(){a.use("ui-tabs-effect",function(){marqueeNode=a(".mod-marquee-block .contentgy").each(function(){var d=a(this),b=d.find(".marquee-wrap .marquee-content li").outerWidth(true),c=d.tabs({isAutoPlay:true,boxSelector:".marquee-wrap .marquee-content li",effect:"scroll",scrollType:"loop",subLength:b});d.find(".marquee-prev").bind("click",function(f){f.preventDefault();c.tabs("prev")});d.find(".marquee-next").bind("click",function(f){f.preventDefault();c.tabs("next")})})})})})(jQuery);(function(a){a(document).ready(function(){a.use("ui-tabs",function(){a(".mod-supplier-discount").tabs({isAutoPlay:false,titleSelector:".tab-trigger li",boxSelector:".tab-content"})})})})(jQuery);(function(a){a(document).ready(function(){var b=a(".mod-suppliers-standard");b.find(".tbody-suppliers-standard li.item").hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")});a.use("web-alitalk",function(){FE.util.alitalk(b.find(".tfoot-suppliers-standard a.alitalk"))})})})(jQuery);(function(a){a(document).ready(function(){})})(jQuery);