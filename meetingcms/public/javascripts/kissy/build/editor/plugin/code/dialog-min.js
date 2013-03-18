/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Feb 17 17:29
*/
KISSY.add("editor/plugin/code/dialog",function(b,g,j,k){function h(a){this.editor=a}var i=g.XHTML_DTD,l=b.DOM.NodeType,m=g.Walker.whitespaces(!0),n='<div class="{prefixCls}code-wrap"><table class="{prefixCls}code-table"><tr><td class="{prefixCls}code-label"><label for="ks-editor-code-type">类型：</label></td><td class="{prefixCls}code-content"><select id="ks-editor-code-type"  class="{prefixCls}code-type">'+b.map([["ActionScript3","as3"],["Bash/Shell","bash"],["C/C++","cpp"],["Css","css"],["CodeFunction",
"cf"],["C#","c#"],["Delphi","delphi"],["Diff","diff"],["Erlang","erlang"],["Groovy","groovy"],["Html","html"],["Java","java"],["JavaFx","jfx"],["Javascript","js"],["Perl","pl"],["Php","php"],["Plain Text","plain"],["PowerShell","ps"],["Python","python"],["Ruby","ruby"],["Scala","scala"],["Sql","sql"],["Vb","vb"],["Xml","xml"]],function(a){return'<option value="'+a[1]+'">'+a[0]+"</option>"})+'</select></td></tr><tr><td><label for="ks-editor-code-textarea">代码：</label></td><td><textarea id="ks-editor-code-textarea"  class="{prefixCls}code-textarea {prefixCls}input"></textarea></td></tr></table></div>';
b.augment(h,{initDialog:function(){var a=this.editor.get("prefixCls")+"editor-",c,e;e=this.dialog=(new j.Dialog({width:500,mask:!0,headerContent:"插入代码",bodyContent:b.substitute(n,{prefixCls:a}),footerContent:b.substitute('<div class="{prefixCls}code-table-action"><a href="javascript:void(\'插入\')" class="{prefixCls}code-insert {prefixCls}button">插入</a><a href="javascript:void(\'取消\')" class="{prefixCls}code-cancel {prefixCls}button">取消</a></td></div>',{prefixCls:a})})).render();c=e.get("el");this.insert=
c.one("."+a+"code-insert");this.cancel=c.one("."+a+"code-cancel");this.type=k.Select.decorate(c.one("."+a+"code-type"),{prefixCls:a+"big-",width:150,menuCfg:{prefixCls:a,height:320,render:e.get("contentEl")}});this.code=c.one("."+a+"code-textarea");this.insert.on("click",this._insert,this);this.cancel.on("click",this.hide,this)},hide:function(){this.dialog.hide()},_insert:function(){var a,c=this.editor;if(b.trim(a=this.code.val())){a=b.all(b.substitute('<pre class="prettyprint ks-editor-code brush:{type};toolbar:false;">{code}</pre>',
{type:this.type.get("value"),code:b.escapeHTML(a)}),c.get("document")[0]);this.dialog.hide();c.insertElement(a);var e=c.getSelection().getRanges()[0],d=a.next(m,1),f=d&&d[0].nodeType==l.ELEMENT_NODE&&d.nodeName();if(!f||!i.$block[f]||!i[f]["#text"])d=b.all("<p></p>",c.get("document")[0]),b.UA.ie||d._4e_appendBogus(),a.after(d);e.moveToElementEditablePosition(d);c.getSelection().selectRanges([e])}else alert("请输入代码!")},show:function(){this.dialog||this.initDialog();this.dialog.show()}});return h},{requires:["editor",
"../overlay/","menubutton"]});
