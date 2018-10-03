define(["exports","jquery","moment","lodash","../websockets/binary_websockets","../common/rivetsExtra","text!./navigation.html","../workspace/workspace.js","../common/util","css!navigation/navigation.css"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=a.getLandingCompany=void 0;var j=i(b),k=i(c),l=i(d),m=i(e),n=i(f),o=i(g),p=i(h),q=function(a){var b=a.loginid||a.id;if(a&&b){var c={MLT:"Gaming",MF:"Investment",VRTC:"Virtual",VRCH:"Virtual",REAL:(a.currency||"").toUpperCase()||"Real"};return b=b.match(/^(MLT|MF|VRTC|VRCH)/i)?b.match(/^(MLT|MF|VRTC|VRCH)/i)[0]:"REAL",c[b]+" Account"}},r=function(a){var b=a.find(".account-menu"),c=a.find("span.time"),d={show_login:local_storage.get("oauth")?!1:!0,login_disabled:!1,currency:"",logout_disabled:!1,account:{show:!1,type:"",id:"",balance:"",is_virtual:0},show_submenu:!1,show_new_account_link:!1},e=function(a){j["default"](".webtrader-dialog["+a+"]").each(function(a,b){var c=j["default"](b);c.dialog("close"),c.one("dialogclose",function(){l["default"].defer(function(){return c.dialog("instance")&&c.dialog("destroy")&&c.remove()})})})};d.oauth=local_storage.get("oauth")||[],d.oauth=d.oauth.map(function(a){return a.type=q(a),a}),d.login=function(){var a=m["default"].app_id;d.login.disabled=!0;var b=local_storage.get("config"),c=b&&b.oauth_url||"https://oauth.champion-fx.com/oauth2/authorize";window.location=c+"?app_id="+a},d.showLoginWin=function(){d.login_disabled=!0,require(["oauth/login"],function(a){d.login_disabled=!1,a.init()})},d.login=function(){var a=m["default"].app_id;d.login.disabled=!0;var b=local_storage.get("config"),c=b&&b.oauth_url||"https://oauth.champion-fx.com/oauth2/authorize";window.location=c+"?app_id="+a},d.toggleVisibility=function(a){d.show_submenu=a},d.logout=function(){m["default"].invalidate(),d.logout_disabled=!0},d.switchAccount=function(a){e("data-account-specific=true"),m["default"].switch_account(a)["catch"](function(a){j["default"].growl.error({message:a.message}),"SelfExclusion"===a.code&&m["default"].invalidate()})},n["default"].bind(b,d);var f=function(a){if(!d.currency){if(!local_storage.get("currency"))return;d.currency=local_storage.get("currency")}var b="0";b=a.authorize?a.authorize.balance:a.balance?a.balance.balance:"0",d.account.balance=formatPrice(b,d.currency)};m["default"].events.on("balance",f),m["default"].events.on("logout",function(){e("data-authorized=true"),e("data-account-specific=true"),d.logout_disabled=!1,d.account.show=!1,d.show_login=!0,d.account.id="",d.account.balance="",d.account.type="",d.currency="",local_storage.remove("currency")}),m["default"].events.on("login",function(a){e("data-authorized=true"),d.show_login=!1,d.account.show=!0,d.account.id=a.authorize.loginid,d.account.is_virtual=a.authorize.is_virtual,d.oauth=local_storage.get("oauth")||[],d.oauth=d.oauth.map(function(a){return a.type=q(a),a}),d.account.type=q(a.authorize),d.currency=a.authorize.currency,local_storage.set("currency",d.currency),f(a);0===a.authorize.is_virtual;t().then(function(a){d.show_financial_link="upgrade-mf"===a,d.show_realaccount_link="upgrade-mlt"===a;var b=loginids();if(d.has_real_account=l["default"].some(b,{is_real:!0}),d.has_mf_or_mlt=l["default"].some(b,{is_mf:!0})||l["default"].some(b,{is_mlt:!0}),d.show_new_account_link="new-account"===a,d.has_disabled_account=l["default"].some(b,{is_disabled:!0}),l["default"].some(oAuthLoginIds(),{is_disabled:!0})){var c=l["default"].filter(b,{is_disabled:!0}).map(function(a){return a.id}).join(",");j["default"].growl.error({fixed:!0,message:"<a href='https://www.champion-fx.com/en/contact.html' target='_blank'>"+"Your account(%) is locked, please contact customer support for more info.".i18n().replace("%",c)+"</a>"})}})}),j["default"](".login").on("login-error",function(){d.show_login=!0}),c.text(k["default"].utc().format("YYYY-MM-DD HH:mm:ss")+" GMT"),setInterval(function(){c.text(k["default"].utc().format("YYYY-MM-DD HH:mm:ss")+" GMT")},1e3)},s=function(a){a=a.find("#topbar").addBack("#topbar");var b={lang:{value:"en",name:"English"},confirm:{visible:!1},languages:[{value:"en",name:"English"},{value:"ar",name:"Arabic"},{value:"de",name:"Deutsch"},{value:"es",name:"Español"},{value:"fr",name:"Français"},{value:"id",name:"Indonesia"},{value:"it",name:"Italiano"},{value:"pl",name:"Polish"},{value:"pt",name:"Português"},{value:"ru",name:"Русский"},{value:"th",name:"Thai"},{value:"vi",name:"Tiếng Việt"},{value:"zh_cn",name:"简体中文"},{value:"zh_tw",name:"繁體中文"}]};b.onclick=function(a){b.confirm.visible=!1;var c=l["default"].find(b.languages,{value:a});c&&b.lang&&c.value==b.lang.value||(local_storage.set("i18n",{value:c.value}),window.location.reload())},b.toggleVisibility=function(a){b.confirm.visible=a};var c=(local_storage.get("i18n")||{value:"en"}).value;b.lang=l["default"].find(b.languages,{value:c});var d=document.getElementById("contact-us");d.href="https://www.binary.com/"+c+"/contact.html",n["default"].bind(a[0],b),m["default"].cached.send({website_status:1}).then(function(a){var c=(a.website_status||{}).supported_languages||[];c=l["default"].map(c,function(a){return{value:a.toLowerCase()}});var d=l["default"].intersectionBy(b.languages,c,"value")||[];b.languages.length=0,d.forEach(function(a){return b.languages.push(a)})})["catch"](console.error)},t=a.getLandingCompany=function(){return m["default"].cached.authorize().then(function(a){return Promise.all([m["default"].cached.send({landing_company:a.authorize.country}),m["default"].cached.send({landing_company_details:a.authorize.landing_company_name})]).then(function(a){var b=a[0],c="virtual"===b.landing_company.virtual_company?b.landing_company.financial_company||{}:a[1].landing_company_details||{},d=b.landing_company.financial_company,e=b.landing_company.gaming_company,f=loginids(),g=local_storage.get("oauth")[0];if(g.is_mlt=/MLT/.test(g.id),e&&d&&"maltainvest"===d.shortcode)return!l["default"].some(f,{is_mlt:!0})||!l["default"].some(f,{is_mf:!0})&&g.is_mlt?l["default"].some(f,{is_mlt:!0})?"upgrade-mf":"upgrade-mlt":"do-nothing";if(d&&"maltainvest"===d.shortcode&&!e)return l["default"].some(f,{is_mf:!0})?"do-nothing":"upgrade-mf";if(l["default"].some(f,{is_mlt:!0})||l["default"].some(f,{is_mx:!0}))return"do-nothing";var h=l["default"].filter(f,{is_cr:!0});if(h.length&&c.legal_allowed_currencies){var i=local_storage.get("currencies_config")||{},j=l["default"].some(h,{type:"fiat"}),k=l["default"].difference(c.legal_allowed_currencies.filter(function(a){return"crypto"===i[a].type}),l["default"].filter(h,{type:"crypto"}).map(function(a){return a.currency})),m=k.length&&k.length!==(c.legal_allowed_currencies.filter(function(a){return"crypto"===i[a].type})||[]).length,n=!k.length;return!j&&m||j&&!n?"new-account":"do-nothing"}return"upgrade-mlt"})})},u=a.init=function(a){var b=j["default"](o["default"]).i18n();j["default"]("body").prepend(b),r(b),s(b),require(["themes/themes"]),j["default"]("#nav-menu .resources > ul").menu(),p["default"].init(j["default"]("#nav-menu .workspace")),a&&a(j["default"]("#nav-menu")),is_beta()&&b.find("a.config").closest("li").show()};a["default"]={init:u,getLandingCompany:t}});