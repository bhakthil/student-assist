WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'ch.bitvoodoo.confluence.plugins.viewtracker:recently-viewed-webresources', location = 'ch/bitvoodoo/confluence/plugins/viewtracker/scripts/recently-viewed.js' */
require(["ajs","jquery"],function(a,b){a.toInit(function(){b.ajax({url:a.contextPath()+"/rest/recentlyviewed/1.0/recent",type:"GET",dataType:"json",cache:false,beforeSend:function(){b(".bv-recently-viewed-spinner").spin()},success:function(c){if(c.length>0){b(".recently-viewed-container").each(function(){var f=this;var e=parseInt(b(this).data("max-results"));b(f).find(".bv-recently-viewed-spinner").spinStop().remove();b(c).each(function(j){var m="Page";var p="Blog";var l=this.type==="page"?m:p;var o=this.type==="page"?"default":this.type;var h=document.createElement("li");var g=document.createElement("span");b(g).addClass("icon aui-icon content-type-"+this.type).attr("title",l).text(this.type).appendTo(h);var k=document.createElement("a");b(k).attr("href",Confluence.getBaseUrl()+this.url).text(this.title).appendTo(h);var n=document.createElement("span");b(n).addClass("smalltext").text("("+this.space+")").appendTo(h);b(h).appendTo(b(f).find("ul"));if(j===e-1){return false}})})}else{var d=document.createElement("li");b(d).addClass("bv-recently-viewed-no-pages").text("There are no pages at the moment.").appendTo(".recently-viewed-container")}}})})});
}catch(e){WRMCB(e)};