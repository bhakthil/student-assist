WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/js/request-access-util.js' */
define("confluence/request-access/request-access-util",["confluence/legacy"],function(b){return{messageBody:function(a){return 1===a.length?AJS.format("We\u0027\u0027ve asked {0} to give you access. You\u0027\u0027ll get an email once the request is approved.",b.Request.Access.usernameLink({user:a[0]})):2===a.length?AJS.format("We\u0027\u0027ve asked {0} and {1} to give you access. You\u0027\u0027ll get an email once the request is approved.",b.Request.Access.usernameLink({user:a[0]}),b.Request.Access.usernameLink({user:a[1]})):3===a.length?
AJS.format("We\u0027\u0027ve asked {0}, {1} and one more user to give you access. You\u0027\u0027ll get an email once the request is approved.",b.Request.Access.usernameLink({user:a[0]}),b.Request.Access.usernameLink({user:a[1]})):AJS.format("We\u0027\u0027ve asked {0}, {1} and {2} more users to give you access. You\u0027\u0027ll get an email once the request is approved.",b.Request.Access.usernameLink({user:a[0]}),b.Request.Access.usernameLink({user:a[1]}),a.length-2)}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/js/request-access-page.js' */
require(["ajs","jquery","confluence/legacy","confluence/meta","confluence/request-access/request-access-util"],function(b,a,f,d,k){b.toInit(function(){var e=d.get("page-id"),h=d.get("remote-user"),l=a(".request-access-container"),c=a(".request-access-container button"),g=c.data("access-type");a("#invite-to-edit-draft").length&&(e=a("#invite-to-edit-draft").data("draft-id"));l.length&&(a("#breadcrumbs").hide(),a("#title-text.with-breadcrumbs").hide(),c.length&&b.trigger("analyticsEvent",{name:"confluence.request.access.plugin.request.access.to.page.view",
data:{pageId:e,requestAccessUser:h,accessType:g}}));c.prop("disabled",!1);c.removeAttr("aria-disabled");c.click(function(){b.trigger("analyticsEvent",{name:"confluence.request.access.plugin.request.access.to.page",data:{pageId:e,requestAccessUser:h,accessType:g}});c.attr("aria-disabled","true");var d=a(f.Request.Access.loading({}));c.replaceWith(d);a.ajax({url:f.getContextPath()+"/rest/access/latest/page/restriction/"+e+"/request/"+g,type:"POST",contentType:"application/json; charset\x3dutf-8",success:function(a){0===
a.users.length?b.flag({type:"error",title:"Access request unsuccessful",body:"Your request for access has not been sent. Contact your space admin."}):b.flag({type:"success",title:"Request sent",body:k.messageBody(a.users)})},error:function(a,c){b.flag({type:"error",title:"Access request unsuccessful",
body:"Your request for access has not been sent. Contact your space admin."})},complete:function(){d.remove();f.Binder.userHover()}})})})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/js/request-edit-access-dialog.js' */
require(["ajs","jquery","confluence/legacy","confluence/meta","confluence/request-access/request-access-util"],function(a,d,g,b,m){a.toInit(function(){function n(){var a=window.location.search.match(/[\?&]requestEditAccess=/);return!(!a||!a.length)}var p=WRM.data.claim("com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources.mail-server-configured"),c=d("#system-content-items"),q=0!==d("#content-metadata-page-restrictions").length,k=b.get("page-id"),
h=b.get("remote-user");if(c.length&&q&&!d("#editPageLink").length&&n()){var l=d(g.Request.Access.loading()),f=a.InlineDialog(c,"requestAccessDialog",function(e,b,c){e.css({padding:"20px"}).html(g.Request.Access.dialog({canRequestAccess:p&&h}));e.on("click","#request-access-dialog-button",function(c){c.stopPropagation();e.find(".actions-result").replaceWith(l);a.trigger("analyticsEvent",{name:"confluence.request.access.plugin.request.access.to.page",data:{pageId:k,requestAccessUser:h,accessType:"edit"}});
var b="";d.ajax({url:g.getContextPath()+"/rest/access/latest/page/restriction/"+k+"/request/edit",type:"POST",contentType:"application/json; charset\x3dutf-8",data:h,success:function(b){0===b.users.length?a.flag({type:"error",title:"Access request unsuccessful",body:"Your request for access has not been sent. Contact your space admin."}):a.flag({type:"success",title:"Request sent",
body:m.messageBody(b.users)})},error:function(c){b=412==c.status?"Access was granted, but there is not a mail server configured so the notification could not be sent.":502==c.status?"Access was granted, but an unexpected error happened while sending the notification.":"Sorry, there was an unexpected error while granting access.";a.flag({type:"error",title:"Access request unsuccessful",body:b})},complete:function(){l.remove();f.hide()}})});e.on("click",".aui-button.cancel",function(a){f.hide()});c();return!1},function(){return{offsetY:2,
offsetX:0,width:350,hideDelay:null,noBind:!0,hideCallback:function(){setTimeout(f.hide(),5E3)}}}());f.show()}})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/js/grant-access.js' */
require(["ajs","jquery","confluence/legacy","confluence/meta"],function(a,f,m,n){a.toInit(function(){function b(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");a=(new RegExp("[\\?\x26]"+a+"\x3d([^\x26#]*)")).exec(location.search);return null==a?"":decodeURIComponent(a[1].replace(/\+/g," "))}var g=n.get("page-id"),p=n.get("remote-user"),h=b("username"),c=b("accessType"),t=b("userFullName"),e=f("#system-content-items"),u=0!==f("#content-metadata-page-restrictions").length,q=f("#rte-button-restrictions"),
r=a.Rte&&a.Rte.getEditor&&a.Rte.getEditor()&&(!!a.$("#editpageform").length||!!a.$("#createpageform").length)&&q.length&&b("grantAccess")&&c;if(e.length&&u&&b("grantAccess")&&c||r){r&&(e=q,g=n.get("draft-id"));var v=f(m.Request.Access.loading()),l=a.InlineDialog(e,"grantAccessDialog",function(d,b,e){d.css({padding:"20px"}).html(m.Grant.Access.dialog({requestAccessUsername:h,requestAccessUserFullName:t,requestAccessType:c,contentType:n.get("content-type")}));d.on("click",".aui-button.grant-access",
function(b){b.stopPropagation();d.find(".actions-result").replaceWith(v);a.trigger("analyticsEvent",{name:"confluence.request.access.plugin.grant.access.to.page",data:{pageId:g,grantAccessUser:p,requestAccessUser:h,accessType:c}});var e="",k="";f.ajax({url:m.getContextPath()+"/rest/access/latest/page/restriction/"+g+"/grant/"+c,type:"POST",contentType:"application/json; charset\x3dutf-8",data:h,success:function(d,b,c){202===c.status?(e="It\u0027s the thought that counts",
k="Someone already granted access to this person."):(e="Access request granted",k="We\u0027ll let them know this request has been granted.");a.flag({type:"success",title:e,body:k})},error:function(d){k=412===d.status?"Access was granted, but there is not a mail server configured so the notification could not be sent.":502===d.status?"Access was granted, but an unexpected error happened while sending the notification.":"Sorry, there was an unexpected error while granting access.";a.flag({type:"error",title:"Access request error",
body:k})},complete:function(){l.hide()}})});d.on("click",".aui-button.deny-access",function(){a.trigger("analyticsEvent",{name:"confluence.request.access.plugin.deny.access.to.page",data:{pageId:g,grantAccessUser:p,requestAccessUser:h,accessType:c}});l.hide()});e();return!1},{offsetY:2,offsetX:0,width:350,hideDelay:null,noBind:!0,hideCallback:function(){setTimeout(l.hide(),5E3)}});(function(a,b,c){return f.ajax({url:m.getContextPath()+"/rest/access/latest/page/restriction/"+a+"/check/"+c,data:{username:b},
type:"GET",contentType:"application/json; charset\x3dutf-8"})})(g,h,c).done(function(d){d.hasPermission?a.flag({type:"success",title:"It\u0027s the thought that counts",body:"Someone already granted access to this person."}):l.show()}).fail(function(a){console.error("Was unable to check current user permission",a);l.show()})}})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/templates/soy/request-access.soy' */
// This file was automatically generated from request-access.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Request.Access.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Request == 'undefined') { Confluence.Request = {}; }
if (typeof Confluence.Request.Access == 'undefined') { Confluence.Request.Access = {}; }


Confluence.Request.Access.usernameLink = function(opt_data, opt_ignored) {
  return '<a href="' + soy.$$escapeHtml("") + '/display/~' + soy.$$escapeUri(opt_data.user.name) + '" class="url fn confluence-userlink" title data-username="' + soy.$$escapeHtml(opt_data.user.name) + '">' + soy.$$escapeHtml(opt_data.user.fullName) + '</a>';
};
if (goog.DEBUG) {
  Confluence.Request.Access.usernameLink.soyTemplateName = 'Confluence.Request.Access.usernameLink';
}


Confluence.Request.Access.loading = function(opt_data, opt_ignored) {
  return '<span id="request-access-loading" class=\'aui-icon aui-icon-wait\'>' + soy.$$escapeHtml('Loading, please wait') + '</span>"';
};
if (goog.DEBUG) {
  Confluence.Request.Access.loading.soyTemplateName = 'Confluence.Request.Access.loading';
}


Confluence.Request.Access.dialog = function(opt_data, opt_ignored) {
  return '<div class="request-access-dialog"><h2 class="grant-access-title">' + soy.$$escapeHtml('You don\x27t have permission to edit') + '</h2>' + ((opt_data.canRequestAccess) ? '<p class="grant-access-message">' + soy.$$escapeHtml('Hit request access and we\x27ll find someone who can give you access.') + '</p><div class="actions-result"><button id="request-access-dialog-button" class="aui-button">' + soy.$$escapeHtml('Request access') + '</button><button class="aui-button aui-button-link cancel">' + soy.$$escapeHtml('Cancel') + '</button><div>' : '<p class="grant-access-message">' + soy.$$escapeHtml('A space admin or the person who shared this page may be able to give you access.') + '</p><div class="actions-result"><button class="aui-button aui-button-link cancel">' + soy.$$escapeHtml('Close') + '</button><div>') + '</div>';
};
if (goog.DEBUG) {
  Confluence.Request.Access.dialog.soyTemplateName = 'Confluence.Request.Access.dialog';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-request-access-plugin:confluence-request-access-plugin-resources', location = '/templates/soy/grant-access.soy' */
// This file was automatically generated from grant-access.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Grant.Access.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Grant == 'undefined') { Confluence.Grant = {}; }
if (typeof Confluence.Grant.Access == 'undefined') { Confluence.Grant.Access = {}; }


Confluence.Grant.Access.dialog = function(opt_data, opt_ignored) {
  var output = '<div class="grant-access-dialog">';
  var usernameLink__soy4 = '' + Confluence.Grant.Access.usernameLink({username: opt_data.requestAccessUsername, userFullName: opt_data.requestAccessUserFullName});
  var requestAccessDescription__soy8 = '' + ((opt_data.requestAccessType == 'edit') ? (opt_data.contentType == 'blogpost') ? soy.$$filterNoAutoescape(AJS.format('{0} wants to \x3cstrong\x3eedit\x3c/strong\x3e this blog post.',usernameLink__soy4)) : soy.$$filterNoAutoescape(AJS.format('{0} wants to \x3cstrong\x3eedit\x3c/strong\x3e this page.',usernameLink__soy4)) : (opt_data.contentType == 'blogpost') ? soy.$$filterNoAutoescape(AJS.format('{0} wants to \x3cstrong\x3eview\x3c/strong\x3e this blog post.',usernameLink__soy4)) : soy.$$filterNoAutoescape(AJS.format('{0} wants to \x3cstrong\x3eview\x3c/strong\x3e this page.',usernameLink__soy4)));
  output += '<h2 class="title grant-access-title">' + soy.$$escapeHtml('Access request') + '</h2><p class="grant-access-message">' + soy.$$filterNoAutoescape(requestAccessDescription__soy8) + '</p><div class="actions-result"><button class="aui-button grant-access">' + soy.$$escapeHtml('Grant access') + '</button><button class="aui-button aui-button-link deny-access">' + soy.$$escapeHtml('Deny') + '</button><div></div>';
  return output;
};
if (goog.DEBUG) {
  Confluence.Grant.Access.dialog.soyTemplateName = 'Confluence.Grant.Access.dialog';
}


Confluence.Grant.Access.usernameLink = function(opt_data, opt_ignored) {
  return '<a href="' + soy.$$escapeHtml("") + '/display/~' + soy.$$escapeHtml(opt_data.username) + '" class="url fn" title data-username="' + soy.$$escapeHtml(opt_data.username) + '"><strong>' + soy.$$escapeHtml(opt_data.userFullName) + '</strong> (' + soy.$$escapeHtml(opt_data.username) + ')</a>';
};
if (goog.DEBUG) {
  Confluence.Grant.Access.usernameLink.soyTemplateName = 'Confluence.Grant.Access.usernameLink';
}

}catch(e){WRMCB(e)};