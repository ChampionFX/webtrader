define(["jquery","moment","lodash","websockets/binary_websockets","common/rivetsExtra","text!navigation/navigation.html","css!navigation/navigation.css","common/util"],function(a,b,c,d,e,f){"use strict";function g(){a("#nav-menu .nav-dropdown-toggle").each(function(){a(this).unbind("click").on("click",function(){var b=a(this).next();b&&a(b[0]).css("hidden"===a(b[0]).css("visibility")?{visibility:"visible",opacity:1,display:"block"}:{visibility:"",opacity:"",display:""})})}),a("#nav-menu li").each(function(){var b=a(this).attr("class")&&a(this).attr("class").split(" ")[0];"account"!==b&&"login"!==b&&(a(this).unbind("click").on("click",function(){"A"===a(this)[0].lastChild.nodeName&&a(this).trigger("mouseleave")}),a(this).unbind("mouseleave").on("mouseleave",function(){var b=a(this).find("ul");b&&a(b[0]).css({visibility:"",opacity:"",display:""})}))})}function h(f){function g(a){if(a){var b={MF:"Investment",MLT:"Gaming",VRTC:"Virtual",REAL:"Real",VRCH:"Virtual"},a=a.match(/^(MLT|MF|VRTC|VRCH)/i)?a.match(/^(MLT|MF|VRTC|VRCH)/i)[0]:"REAL";return b[a]+" Account"}}function h(a){if(!l.currency){if(!local_storage.get("currency"))return;l.currency=local_storage.get("currency")}var b="0";b=a.authorize?a.authorize.balance:a.balance?a.balance.balance:"0",l.account.balance=formatPrice(b,l.currency)}var i=f.find(".account-menu"),k=f.find("span.time"),l={show_login:local_storage.get("oauth")?!1:!0,login_disabled:!1,currency:"",logout_disabled:!1,account:{show:!1,type:"",id:"",balance:"",is_virtual:0},show_submenu:!1};l.oauth=local_storage.get("oauth")||[],l.oauth=l.oauth.map(function(a){return a.type=g(a.id),a}),l.showLoginWin=function(){l.login_disabled=!0,require(["oauth/login"],function(a){l.login_disabled=!1,a.init()})},l.toggleVisibility=function(a){l.show_submenu=a},l.logout=function(){d.invalidate(),l.logout_disabled=!0},l.switchAccount=function(b){d.switch_account(b)["catch"](function(b){a.growl.error({message:b.message}),"SelfExclusion"===b.code&&d.invalidate()})},e.bind(i,l),d.events.on("balance",h),d.events.on("logout",function(){a(".webtrader-dialog[data-authorized=true]").dialog("close").dialog("destroy").remove(),l.logout_disabled=!1,l.account.show=!1,l.show_login=!0,l.account.id="",l.account.balance="",l.account.type="",l.currency="",local_storage.remove("currency")}),d.events.on("login",function(b){a(".webtrader-dialog[data-authorized=true]").dialog("close").dialog("destroy").remove(),l.show_login=!1,l.account.show=!0,l.account.id=b.authorize.loginid,l.account.is_virtual=b.authorize.is_virtual,l.oauth=local_storage.get("oauth")||[],l.oauth=l.oauth.map(function(a){return a.type=g(a.id),a}),l.account.type=g(b.authorize.loginid),l.currency=b.authorize.currency,local_storage.set("currency",l.currency),h(b);var d=0===b.authorize.is_virtual;j().then(function(b){l.show_financial_link=d&&"upgrade-mf"===b,l.show_realaccount_link=!d&&"upgrade-mlt"===b;var e=Cookies.loginids();l.has_real_account=c.some(e,{is_real:!0}),l.has_disabled_account=c.some(e,{is_disabled:!0}),c.some(e,{is_disabled:!0})&&a.growl.error({fixed:!0,message:"<a href='https://www.champion-fx.com/en/contactus' target='_blank'>"+"Your account is locked, please contact customer support for more info.".i18n()+"</a>"})})}),a(".login").on("login-error",function(){l.show_login=!0}),k.text(b.utc().format("YYYY-MM-DD HH:mm")+" GMT"),setInterval(function(){k.text(b.utc().format("YYYY-MM-DD HH:mm")+" GMT")},15e3)}function i(a){a=a.find("#topbar").addBack("#topbar");var b={lang:{value:"en",name:"English"},confirm:{visible:!1},languages:[{value:"en",name:"English"},{value:"ar",name:"Arabic"},{value:"de",name:"Deutsch"},{value:"es",name:"Español"},{value:"fr",name:"Français"},{value:"id",name:"Indonesia"},{value:"it",name:"Italiano"},{value:"pl",name:"Polish"},{value:"pt",name:"Português"},{value:"ru",name:"Русский"},{value:"vi",name:"Tiếng Việt"},{value:"zh_cn",name:"简体中文"},{value:"zh_tw",name:"繁體中文"}]};b.onclick=function(a){b.confirm.visible=!1;var d=c.find(b.languages,{value:a});d.value!=b.lang.value&&(local_storage.set("i18n",{value:d.value}),window.location.reload())},b.toggleVisibility=function(a){b.confirm.visible=a};var f=(local_storage.get("i18n")||{value:"en"}).value;b.lang=c.find(b.languages,{value:f}),e.bind(a[0],b),d.cached.send({website_status:1}).then(function(a){var d=(a.website_status||{}).supported_languages||[];d=c.map(d,function(a){return{value:a.toLowerCase()}});var e=c.intersectionBy(b.languages,d,"value")||[];b.languages.length=0,e.forEach(function(a){b.languages.push(a)})})["catch"](console.error)}function j(){return d.cached.authorize().then(function(a){return d.cached.send({landing_company:a.authorize.country}).then(function(a){var b=a.landing_company.financial_company,d=a.landing_company.gaming_company,e=Cookies.loginids();return d&&b&&"maltainvest"===b.shortcode?c.some(e,{is_mlt:!0})&&c.some(e,{is_mf:!0})?"do-nothing":c.some(e,{is_mlt:!0})?"upgrade-mf":"upgrade-mlt":b&&"maltainvest"===b.shortcode&&!d?c.some(e,{is_mf:!0})?"do-nothing":"upgrade-mf":c.some(e,{is_mlt:!0})||c.some(e,{is_mx:!0})||c.some(e,{is_cr:!0})?"do-nothing":"upgrade-mlt"})})}return{init:function(b){var c=a(f).i18n();a("body").prepend(c),h(c),i(c),require(["themes/themes"]),g(),b&&b(a("#nav-menu")),is_beta()&&c.find("a.config").closest("li").show()},getLandingCompany:j,updateDropdownToggles:g}});