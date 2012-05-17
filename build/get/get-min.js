/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.6.0pr1
build: nightly
*/
YUI.add("get",function(d){var c=d.Lang,b,e,a;d.Get=e={cssOptions:{attributes:{rel:"stylesheet"},doc:d.config.linkDoc||d.config.doc,pollInterval:50},jsOptions:{autopurge:true,doc:d.config.scriptDoc||d.config.doc},options:{attributes:{charset:"utf-8"},purgethreshold:20},REGEX_CSS:/\.css(?:[?;].*)?$/i,REGEX_JS:/\.js(?:[?;].*)?$/i,_insertCache:{},_pending:null,_purgeNodes:[],_queue:[],abort:function(k){var g,l,h,f,j;if(!k.abort){l=k;j=this._pending;k=null;if(j&&j.transaction.id===l){k=j.transaction;this._pending=null;}else{for(g=0,f=this._queue.length;g<f;++g){h=this._queue[g].transaction;if(h.id===l){k=h;this._queue.splice(g,1);break;}}}}k&&k.abort();},css:function(g,f,h){return this._load("css",g,f,h);},js:function(g,f,h){return this._load("js",g,f,h);},load:function(g,f,h){return this._load(null,g,f,h);},_autoPurge:function(f){if(f&&this._purgeNodes.length>=f){this._purge(this._purgeNodes);}},_getEnv:function(){var g=d.config.doc,f=d.UA;return(this._env={async:g&&g.createElement("script").async===true,cssFail:f.gecko>=9||f.compareVersions(f.webkit,535.24)>=0,cssLoad:((!f.gecko&&!f.webkit)||f.gecko>=9||f.compareVersions(f.webkit,535.24)>=0)&&!(f.chrome&&f.chrome<=18),preservesScriptOrder:!!(f.gecko||f.opera)});},_getTransaction:function(l,h){var m=[],j,f,k,g;if(!c.isArray(l)){l=[l];}h=d.merge(this.options,h);h.attributes=d.merge(this.options.attributes,h.attributes);for(j=0,f=l.length;j<f;++j){g=l[j];k={attributes:{}};if(typeof g==="string"){k.url=g;}else{if(g.url){d.mix(k,g,false,null,0,true);g=g.url;}else{continue;}}d.mix(k,h,false,null,0,true);if(!k.type){if(this.REGEX_CSS.test(g)){k.type="css";}else{if(!this.REGEX_JS.test(g)){}k.type="js";}}d.mix(k,k.type==="js"?this.jsOptions:this.cssOptions,false,null,0,true);k.attributes.id||(k.attributes.id=d.guid());if(k.win){k.doc=k.win.document;}else{k.win=k.doc.defaultView||k.doc.parentWindow;}if(k.charset){k.attributes.charset=k.charset;}m.push(k);}return new a(m,h);},_load:function(g,h,f,j){var i;if(typeof f==="function"){j=f;f={};}f||(f={});f.type=g;if(!this._env){this._getEnv();}i=this._getTransaction(h,f);this._queue.push({callback:j,transaction:i});this._next();return i;},_next:function(){var f;if(this._pending){return;}f=this._queue.shift();if(f){this._pending=f;f.transaction.execute(function(){f.callback&&f.callback.apply(this,arguments);e._pending=null;e._next();});}},_purge:function(f){var h=this._purgeNodes,j=f!==h,g,i;while(i=f.pop()){if(!i._yuiget_finished){continue;}i.parentNode&&i.parentNode.removeChild(i);if(j){g=d.Array.indexOf(h,i);if(g>-1){h.splice(g,1);}}}}};e.script=e.js;e.Transaction=a=function(h,g){var f=this;f.id=a._lastId+=1;f.data=g.data;f.errors=[];f.nodes=[];f.options=g;f.requests=h;f._callbacks=[];f._queue=[];f._waiting=0;f.tId=f.id;f.win=g.win||d.config.win;};a._lastId=0;a.prototype={_state:"new",abort:function(f){this._pending=null;this._pendingCSS=null;this._pollTimer=clearTimeout(this._pollTimer);this._queue=[];this._waiting=0;this.errors.push({error:f||"Aborted"});this._finish();},execute:function(n){var h=this,m=h.requests,l=h._state,j,g,f,k;if(l==="done"){n&&n(h.errors.length?h.errors:null,h);return;}else{n&&h._callbacks.push(n);if(l==="executing"){return;}}h._state="executing";h._queue=f=[];if(h.options.timeout){h._timeout=setTimeout(function(){h.abort("Timeout");},h.options.timeout);}for(j=0,g=m.length;j<g;++j){k=h.requests[j];if(k.async||k.type==="css"){h._insert(k);}else{f.push(k);}}h._next();},purge:function(){e._purge(this.nodes);},_createNode:function(h,g,j){var i=j.createElement(h),f,k;if(!b){k=j.createElement("div");k.setAttribute("class","a");b=k.className==="a"?{}:{"for":"htmlFor","class":"className"};}for(f in g){if(g.hasOwnProperty(f)){i.setAttribute(b[f]||f,g[f]);}}return i;},_finish:function(){var l=this.errors.length?this.errors:null,g=this.options,k=g.context||this,j,h,f;if(this._state==="done"){return;}this._state="done";for(h=0,f=this._callbacks.length;h<f;++h){this._callbacks[h].call(k,l,this);}j=this._getEventData();if(l){if(g.onTimeout&&l[l.length-1].error==="Timeout"){g.onTimeout.call(k,j);}if(g.onFailure){g.onFailure.call(k,j);}}else{if(g.onSuccess){g.onSuccess.call(k,j);}}if(g.onEnd){g.onEnd.call(k,j);}},_getEventData:function(f){if(f){return d.merge(this,{abort:this.abort,purge:this.purge,request:f,url:f.url,win:f.win});}else{return this;}},_getInsertBefore:function(j){var k=j.doc,h=j.insertBefore,g,i,f;if(h){return typeof h==="string"?k.getElementById(h):h;}g=e._insertCache;f=d.stamp(k);if((h=g[f])){return h;}if((h=k.getElementsByTagName("base")[0])){return(g[f]=h);}h=k.head||k.getElementsByTagName("head")[0];if(h){h.appendChild(k.createTextNode(""));return(g[f]=h.lastChild);}return(g[f]=k.getElementsByTagName("script")[0]);},_insert:function(o){var l=e._env,m=this._getInsertBefore(o),i=o.type==="js",h=o.node,p=this,g=d.UA,f,j;if(!h){if(i){j="script";}else{if(!l.cssLoad&&g.gecko){j="style";}else{j="link";}}h=o.node=this._createNode(j,o.attributes,o.doc);}function k(){p._progress("Failed to load "+o.url,o);}function n(){if(f){clearTimeout(f);}p._progress(null,o);}if(i){h.setAttribute("src",o.url);if(o.async){h.async=true;}else{if(l.async){h.async=false;}if(!l.preservesScriptOrder){this._pending=o;}}}else{if(!l.cssLoad&&g.gecko){h.innerHTML=(o.attributes.charset?'@charset "'+o.attributes.charset+'";':"")+'@import "'+o.url+'";';}else{h.setAttribute("href",o.url);}}if(i&&g.ie&&g.ie<9){h.onreadystatechange=function(){if(/loaded|complete/.test(h.readyState)){h.onreadystatechange=null;n();}};}else{if(!i&&!l.cssLoad){this._poll(o);}else{h.onerror=k;h.onload=n;if(!l.cssFail&&!i){f=setTimeout(k,o.timeout||3000);}}}this._waiting+=1;this.nodes.push(h);m.parentNode.insertBefore(h,m);},_next:function(){if(this._pending){return;}if(this._queue.length){this._insert(this._queue.shift());}else{if(!this._waiting){this._finish();}}},_poll:function(n){var q=this,r=q._pendingCSS,l=d.UA.webkit,h,f,g,p,o,k;if(n){r||(r=q._pendingCSS=[]);r.push(n);if(q._pollTimer){return;}}q._pollTimer=null;for(h=0;h<r.length;
++h){o=r[h];if(l){k=o.doc.styleSheets;g=k.length;p=o.node.href;while(--g>=0){if(k[g].href===p){r.splice(h,1);h-=1;q._progress(null,o);break;}}}else{try{f=!!o.node.sheet.cssRules;r.splice(h,1);h-=1;q._progress(null,o);}catch(m){}}}if(r.length){q._pollTimer=setTimeout(function(){q._poll.call(q);},q.options.pollInterval);}},_progress:function(h,g){var f=this.options;if(h){g.error=h;this.errors.push({error:h,request:g});}g.node._yuiget_finished=g.finished=true;if(f.onProgress){f.onProgress.call(f.context||this,this._getEventData(g));}if(g.autopurge){e._autoPurge(this.options.purgethreshold);e._purgeNodes.push(g.node);}if(this._pending===g){this._pending=null;}this._waiting-=1;this._next();}};},"3.6.0pr1",{requires:["yui-base"]});