!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{})["note-editor.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,t,e,l,s){var a=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return'<div id="'+n.escapeExpression("function"==typeof(e=null!=(e=a(e,"id")||(null!=t?a(t,"id"):t))?e:n.hooks.helperMissing)?e.call(null!=t?t:n.nullContext||{},{name:"id",hash:{},data:s,loc:{start:{line:1,column:9},end:{line:1,column:15}}}):e)+'">\n\t<div class="note-title">\n\n\t</div>\n\t<div class="note-content">\n\n\t</div>\n\t<img src="/src/assets/close.svg" alt="" class="close-editor-btn">\n</div>'},useData:!0})}();