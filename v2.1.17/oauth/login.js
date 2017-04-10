define(["exports","../websockets/binary_websockets","../windows/windows","../common/rivetsExtra","lodash","text!./login.html","css!./login.css"],function(a,b,c,d,e,f){"use strict";function g(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.login=a.init=void 0;var h=g(b),i=g(c),j=g(d),k=g(e),l=g(f),m=null,n=null,o=a.init=function(){if(m)return void m.moveToTop();var a=$(l["default"]).i18n();m=i["default"].createBlankWindow(a,{title:"Log in",resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,width:548,height:180,close:function(){m.dialog("destroy"),m.remove(),m=null},open:function(){},destroy:function(){n&&n.unbind(),n=null}}),m.parent().css("overflow","visible"),p(a,m),m.dialog("open");var b=m.dialog("widget").offset();b.top=120,m.dialog("option","position",{my:b.left,at:b.top}),m.dialog("widget").css({left:b.left+"px",top:b.top+"px"}),m.dialog("widget").find(".ui-selectmenu-menu ul").css("max-height","320px")},p=function(a,b){var c=h["default"].app_id,d={route:{value:"login"},login:{disabled:!1},registration:{email:"",disabled:!1,validate:{value:!1},email_show_explanation:function(){var a=d.registration.email;return""===a&&!d.registration.validate.value||validateEmail(a)}},account:{empty_fields:{validate:!1,clear:k["default"].debounce(function(){d.account.empty_fields.validate=!1},2e3),show:function(){d.account.empty_fields.validate=!0,d.account.empty_fields.clear()}},password_error_message:function(){var a=d.account.password;return""===a?d.account.empty_fields.validate?"You should enter between 6-25 characters.".i18n():"":a.length<6?"Password must be 6 characters minimum".i18n():/\d/.test(a)&&/[a-z]/.test(a)&&/[A-Z]/.test(a)?"":"Password must contain lower and uppercase letters with numbers".i18n()},verification:"",password:"",repeat_password:"",residence:"",residence_list:[{text:"Indonesia",value:"id"}],residence_unsupported:[],disabled:!1},confirm:{disabled:!1}};d.login.login=function(){d.login.disabled=!0;var a=local_storage.get("config"),b=a&&a.oauth_url||"https://oauth.champion-fx.com/oauth2/authorize";window.location=b+"?app_id="+c},d.confirm.confirm=function(){d.confirm.disabled=!0;var a=local_storage.get("config"),b=a&&a.oauth_url||"https://oauth.champion-fx.com/oauth2/authorize";window.location=b+"?app_id="+c},d.route.update=function(a){var c={login:{title:"Log in".i18n(),height:180},registration:{title:"Registration".i18n(),height:220},account:{title:"Account opening".i18n(),height:465},confirm:{title:"Account opening".i18n(),height:415}};d.route.value=a;var e=c[a].title,f=c[a].height;b.dialog("option","title",e),b.dialog("option","height",f)},d.registration.validate.clear=k["default"].debounce(function(){d.registration.validate.value=!1},2e3),d.registration.validate.show=function(){d.registration.validate.value=!0,d.registration.validate.clear()},d.registration.create=function(){var a=d.registration.email;return""!=a&&validateEmail(a)?(d.registration.disabled=!0,void h["default"].send({verify_email:a,type:"account_opening"}).then(function(b){if(d.registration.disabled=!1,!b.verify_email)throw{message:"Email verification failed (".i18n()+b.msg_type+")"};$.growl.notice({message:"Verification code sent to ".i18n()+a}),d.route.update("account")})["catch"](function(a){$.growl.error({message:a.message}),d.registration.disabled=!1})):void d.registration.validate.show()},d.account.open=function(){d.account.empty_fields.show();var a=d.registration.email,c=d.account.verification,e=d.account.password,f=d.account.repeat_password,g=d.account.residence,i=validateEmail(a)&&""!==c&&e===f&&e.length>=6;if(i=i&&/\d/.test(e)&&/[a-z]/.test(e)&&/[A-Z]/.test(e)&&2===g.length){var j={new_account_virtual:1,verification_code:c,client_password:e,residence:g};d.account.disabled=!0,h["default"].send(j).then(function(a){var c=a.new_account_virtual,e=[{id:c.client_id,token:c.oauth_token}];local_storage.set("oauth",e),d.account.disabled=!1,h["default"].cached.authorize().then(function(){b.dialog("destroy"),b.remove(),m=null})["catch"](function(a){return void 0})})["catch"](function(a){$.growl.error({message:a.message}),d.account.disabled=!1})}},n=j["default"].bind(a[0],d),h["default"].cached.send({residence_list:1}).then(function(a){d.account.residence_list=a.residence_list.map(function(a){return a.disabled="DISABLED"===a.disabled||a.disabled===!0,a.disabled&&d.account.residence_unsupported.push(a.value),a}),d.account.residence="id",h["default"].cached.send({website_status:1}).then(function(a){var b=a.website_status&&a.website_status.clients_country;-1===d.account.residence_unsupported.indexOf(b)&&(d.account.residence=b||"id")})["catch"](function(a){d.account.residence="id"})})["catch"](function(a){$.growl.error({message:a.message})})},q=a.login=function(){var a=h["default"].app_id,b=local_storage.get("config"),c=b&&b.oauth_url||"https://oauth.champion-fx.com/oauth2/authorize";window.location=c+"?app_id="+a};a["default"]={init:o,login:q}});