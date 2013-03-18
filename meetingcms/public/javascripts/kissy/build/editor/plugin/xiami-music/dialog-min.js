/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Feb 17 17:29
*/
KISSY.add("editor/plugin/xiami-music/dialog",function(f,l,p,q){function m(){m.superclass.constructor.apply(this,arguments)}function j(e,a,f){return"<a class='{prefixCls}editor-xiami-page-item {prefixCls}editor-button ks-inline-block"+(e==a?" {prefixCls}editor-xiami-curpage":"")+"' data-value='"+a+"' href='#'>"+(f||a)+"</a>"}var n=f.DOM,r=f.Node,s=l.Utils.debugUrl("theme/tao-loading.gif"),t="http://www.xiami.com/app/nineteen/search/key/{key}/page/{page}",o="输入歌曲名、专辑名、艺人名";f.extend(m,p,{_config:function(){var e=
this.editor.get("prefixCls");this._cls="ke_xiami";this._type="xiami-music";this._title="虾米音乐";this._bodyHtml=f.substitute("<div style='padding:40px 0 70px 0;'><form action='#' class='{prefixCls}editor-xiami-form' style='margin:0 20px;'><p class='{prefixCls}editor-xiami-title'></p><p class='{prefixCls}editor-xiami-url-wrap'><input class='{prefixCls}editor-xiami-url {prefixCls}editor-input' style='width:370px;'/> &nbsp;  <a class='{prefixCls}editor-xiami-submit {prefixCls}editor-button ks-inline-block'>搜 索</a></p><p style='margin:10px 0'><label>对 齐： <select class='{prefixCls}editor-xiami-align' title='对齐'><option value='none'>无</option><option value='left'>左对齐</option><option value='right'>右对齐</option></select></label><label style='margin-left:70px;'>间距：  <input  data-verify='^\\d+$'  data-warning='间距请输入非负整数' class='{prefixCls}editor-xiami-margin {prefixCls}editor-input' style='width:60px;' value='0'/> 像素</label></p></form><div class='{prefixCls}editor-xiami-list'></div></div>",
{prefixCls:e});this._footHtml=f.substitute("<div style='padding:5px 20px 20px;'><a class='{prefixCls}editor-xiami-ok {prefixCls}editor-button ks-inline-block' style='margin-right:20px;'>确&nbsp;定</a><a class='{prefixCls}editor-xiami-cancel {prefixCls}editor-button ks-inline-block'>取&nbsp;消</a></div>",{prefixCls:e})},_initD:function(){function e(c){var b=h.val();30<b.replace(/[^\x00-\xff]/g,"@@").length?alert("长度上限30个字符（1个汉字=2个字符）"):!f.trim(b)||b==o?alert("不能为空！"):(a._xiami_submit.addClass(d+"editor-button-disabled",
void 0),b=f.substitute(t,{key:encodeURIComponent(h.val()),page:c}),a._xiamia_list.html("<img style='display:block;width:32px;height:32px;margin:5px auto 0 auto;'src='"+s+"'/><p style='width: 130px; margin: 15px auto 0; color: rgb(150, 150, 150);'>正在搜索，请稍候......</p>"),a._xiamia_list.show(),f.io({cache:!1,url:b,dataType:"jsonp",success:function(b){b.page=c;a._listSearch(b)},error:function(){a._xiami_submit.removeClass(d+"editor-button-disabled",void 0);a._xiamia_list.html("<p style='text-align:center;margin:10px 0;'>不好意思，超时了，请重试！</p>")}}))}
var a=this,g=a.editor,d=g.get("prefixCls"),c=a.dialog,b=c.get("el"),i=c.get("footer"),h=b.one("."+d+"editor-xiami-url");a.dAlign=q.Select.decorate(b.one("."+d+"editor-xiami-align"),{prefixCls:"ks-editor-big-",width:80,menuCfg:{prefixCls:"ks-editor-",render:b}});a.addRes(a.dAlign);a._xiami_input=h;l.Utils.placeholder(h,o);a.addRes(h);a._xiamia_list=b.one("."+d+"editor-xiami-list");a._xiami_submit=b.one("."+d+"editor-xiami-submit");a._xiami_submit.on("click",function(b){a._xiami_submit.hasClass("ks-editor-button-disabled",
void 0)||e(1);b.halt()});a.addRes(a._xiami_submit);h.on("keydown",function(a){13===a.keyCode&&e(1)});a.dMargin=b.one("."+d+"editor-xiami-margin");a._xiami_url_wrap=b.one("."+d+"editor-xiami-url-wrap");a._xiamia_title=b.one("."+d+"editor-xiami-title");b=i.one("."+d+"editor-xiami-ok");i.one("."+d+"editor-xiami-cancel").on("click",function(a){c.hide();a.halt()});a.addRes(i);b.on("click",function(b){var c=a.selectedFlash,d=g.restoreRealElement(c);a._dinfo={url:a._getFlashUrl(d),attrs:{title:c.attr("title"),
style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;float:"+a.dAlign.get("value")+";"}};a._gen();b.halt()},a);a.addRes(b);a._xiamia_list.on("click",function(b){b.preventDefault();var c=new r(b.target),f=c.closest(function(b){return a._xiamia_list.contains(b)&&n.hasClass(b,d+"editor-xiami-add")},void 0),c=c.closest(function(b){return a._xiamia_list.contains(b)&&n.hasClass(b,d+"editor-xiami-page-item")},void 0);f?(a._dinfo={url:"http://www.xiami.com/widget/"+f.attr("data-value")+"/singlePlayer.swf",
attrs:{title:f.attr("title"),style:"margin:"+(parseInt(a.dMargin.val())||0)+"px;float:"+a.dAlign.get("value")+";"}},a._gen()):c&&e(parseInt(c.attr("data-value")));b.halt()});a.addRes(a._xiamia_list)},_listSearch:function(e){var a,g=this.editor.get("prefixCls"),d=e.results,c="";if(e.key==f.trim(this._xiami_input.val())){this._xiami_submit.removeClass(g+"editor-button-disabled",void 0);if(d&&d.length){c="<ul>";for(a=0;a<d.length;a++){var b=d[a],i=f.urlDecode(b.song_name)+" - "+f.urlDecode(b.artist_name),
h="<li title='"+i+"'><span class='"+g+"editor-xiami-song'>",k=i;35<k.length&&(k=k.substring(0,35)+"...");c+=h+k+"</span><a href='#' title='"+i+"' class='"+g+"editor-xiami-add' data-value='"+(b.album_id+"_"+b.song_id)+"'>添加</a></li>"}c+="</ul>";d=e.page;e=Math.floor(e.total/8);a=d-1;b=d+1;if(1<e){c+="<p class='"+g+"editor-xiami-paging'>";2>=a&&(b=Math.min(2-a+b,e-1),a=2);b=Math.min(b,e-1);b==e-1&&(a=Math.max(2,b-3));1!=d&&(c+=j(d,d-1,"上一页"));c+=j(d,1,"1");for(2!=a&&(c+="<span class='"+g+"editor-xiami-page-more'>...</span>");a<=
b;a++)c+=j(d,a,void 0);b!=e&&(b!=e-1&&(c+="<span class='"+g+"editor-xiami-page-more'>...</span>"),c+=j(d,e,e));d!=e&&(c+=j(d,d+1,"下一页"));c+="</p>"}}else c="<p style='text-align:center;margin:10px 0;'>不好意思，没有找到结果！</p>";this._xiamia_list.html(f.substitute(c,{prefixCls:g}))}},_updateD:function(){var e=this.editor.get("prefixCls"),a=this.selectedFlash;a?(this._xiami_input.val(a.attr("title")),this._xiamia_title.html(a.attr("title")),this.dAlign.set("value",a.css("float")),this.dMargin.val(parseInt(a.style("margin"))||
0),this._xiami_url_wrap.hide(),this.dialog.get("footer").show(),this._xiamia_title.show()):(l.Utils.resetInput(this._xiami_input),this.dAlign.set("value","none"),this.dMargin.val(0),this._xiami_url_wrap.show(),this.dialog.get("footer").hide(),this._xiamia_title.hide(),this._xiami_submit.removeClass(e+"editor-button-disabled",void 0));this._xiamia_list.hide();this._xiamia_list.html("")},_getDInfo:function(){f.mix(this._dinfo.attrs,{width:257,height:33});return this._dinfo}});return m},{requires:["editor",
"../flash/dialog","../menubutton/"]});
