define(["websockets/binary_websockets","windows/windows","common/rivetsExtra","lodash"],function(a,b,c,d){function e(){return g?void g.moveToTop():void require(["text!oauth/login.html","css!oauth/login.css"],function(a){a=$(a).i18n(),g=b.createBlankWindow(a,{title:"Log in",resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,width:551,height:180,"data-authorized":!0,close:function(){g.dialog("destroy"),g.remove(),g=null},open:function(){},destroy:function(){h&&h.unbind(),h=null}}),g.parent().css("overflow","visible"),f(a,g),g.dialog("open");var c=g.dialog("widget").offset();c.top=120,g.dialog("option","position",{my:c.left,at:c.top}),g.dialog("widget").css({left:c.left+"px",top:c.top+"px"}),g.dialog("widget").find(".ui-selectmenu-menu ul").css("max-height","320px")})}function f(b,e){var f=a.app_id,g={route:{value:"login"},login:{disabled:!1},registration:{email:"",disabled:!1,validate:{value:!1},email_show_explanation:function(){var a=g.registration.email;return""===a&&!g.registration.validate.value||validateEmail(a)}},account:{empty_fields:{validate:!1,clear:d.debounce(function(){g.account.empty_fields.validate=!1},2e3),show:function(){g.account.empty_fields.validate=!0,g.account.empty_fields.clear()}},password_error_message:function(){var a=g.account.password;return""===a?g.account.empty_fields.validate?"* Please enter your password".i18n():"":a.length<6?"* Password must be 6 characters minimum".i18n():/\d/.test(a)&&/[a-z]/.test(a)&&/[A-Z]/.test(a)?"":"* Password must contain lower and uppercase letters with numbers".i18n()},verification:"",password:"",repeat_password:"",residence:"",residence_list:[{text:"Indonesia",value:"id"}],residence_unsupported:[],disabled:!1},confirm:{disabled:!1}};g.login.login=function(){g.login.disabled=!0;var a=local_storage.get("config"),b=a&&a.oauth_url||"https://oauth.champion-fx.com/oauth2/authorize";window.location=b+"?app_id="+f},g.confirm.confirm=function(){g.confirm.disabled=!0;var a=local_storage.get("config"),b=a&&a.oauth_url||"https://oauth.champion-fx.com/oauth2/authorize";window.location=b+"?app_id="+f},g.route.update=function(a){var b={login:{title:"Log in".i18n(),height:180},registration:{title:"Registration".i18n(),height:220},account:{title:"Account opening".i18n(),height:465},confirm:{title:"Account opening".i18n(),height:415}};g.route.value=a;var c=b[a].title,d=b[a].height;e.dialog("option","title",c),e.dialog("option","height",d)},g.registration.validate.clear=d.debounce(function(){g.registration.validate.value=!1},2e3),g.registration.validate.show=function(){g.registration.validate.value=!0,g.registration.validate.clear()},g.registration.create=function(){var b=g.registration.email;return""!=b&&validateEmail(b)?(g.registration.disabled=!0,void a.send({verify_email:b,type:"account_opening"}).then(function(a){if(g.registration.disabled=!1,!a.verify_email)throw{message:"Email verification failed (".i18n()+a.msg_type+")"};$.growl.notice({message:"Verification code sent to ".i18n()+b}),g.route.update("account")})["catch"](function(a){$.growl.error({message:a.message}),g.registration.disabled=!1})):void g.registration.validate.show()},g.account.open=function(){g.account.empty_fields.show();var b=g.registration.email,c=g.account.verification,d=g.account.password,f=g.account.repeat_password,h=g.account.residence,i=validateEmail(b)&&""!==c&&d===f&&d.length>=6;if(i=i&&/\d/.test(d)&&/[a-z]/.test(d)&&/[A-Z]/.test(d)&&2===h.length){var j={new_account_virtual:1,verification_code:c,client_password:d,residence:h};g.account.disabled=!0,a.send(j).then(function(b){var c=b.new_account_virtual,d=[{id:c.client_id,token:c.oauth_token}];local_storage.set("oauth",d),g.account.disabled=!1,a.cached.authorize().then(function(){e.dialog("destroy")})["catch"](function(a){})})["catch"](function(a){$.growl.error({message:a.message}),g.account.disabled=!1})}},h=c.bind(b[0],g),a.cached.send({residence_list:1}).then(function(b){g.account.residence_list=b.residence_list.map(function(a){return a.disabled="DISABLED"===a.disabled,a.disabled&&g.account.residence_unsupported.push(a.value),a}),g.account.residence="id",a.cached.send({website_status:1}).then(function(a){var b=a.website_status&&a.website_status.clients_country;-1===g.account.residence_unsupported.indexOf(b)&&(g.account.residence=b||"id")})["catch"](function(a){g.account.residence="id"})})["catch"](function(a){$.growl.error({message:a.message})})}var g=null,h=null;return{init:e,login:function(){var b=a.app_id,c=local_storage.get("config"),d=c&&c.oauth_url||"https://oauth.champion-fx.com/oauth2/authorize";window.location=d+"?app_id="+b}}});