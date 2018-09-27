define(["exports","jquery","websockets/binary_websockets","windows/windows","common/rivetsExtra","cashier/currency","lodash","moment","cashier/uk_funds_protection","text!cashier/withdraw.html"],function(a,b,c,d,e,f,g,h,i,j){"use strict";function k(a){return a&&a.__esModule?a:{"default":a}}function l(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var m=k(b),n=k(c),o=k(d),p=k(e),q=k(f),r=(k(h),k(i)),s=k(j);require(["text!cashier/withdraw.html"]),require(["css!cashier/withdraw.css"]);var t=null,u=null,v=function(a){m["default"].growl.error({message:a.message})},w=function x(){var a=this;l(this,x),this.init=function(b){b.click(function(){t?t.moveToTop():n["default"].cached.authorize().then(function(a){return a.authorize.currency||local_storage.get("currency")?!0:q["default"].check_currency()}).then(function(){a._init_win(s["default"])})["catch"](v)})},this._init_win=function(b){b=m["default"](b).i18n(),t=o["default"].createBlankWindow(b,{title:"Withdraw funds",resizable:!0,collapsable:!1,minimizable:!0,maximizable:!0,width:700,height:400,"data-authorized":!0,close:function(){t.dialog("destroy"),t.trigger("dialogclose"),t.remove(),t=null},open:function(){},destroy:function(){u&&u.unbind(),u=null}}),a._init_state(b),t.dialog("open");var c=t.dialog("widget").offset();c.top=110,t.dialog("option","position",{my:c.left,at:c.top}),t.dialog("widget").css({left:c.left+"px",top:c.top+"px"}),t.track({module_id:"withdraw",is_unique:!0})},this._init_state=function(a){var b={is_champion:isChampionFx(),clear:_.debounce(function(a,b){a[b]=!1},4e3),route:{value:"menu"},empty_fields:{validate:!1,token_length:!1,show:function(){b.empty_fields.validate=!0,b.clear(b.empty_fields,"validate")}},validate:{invalid_length:!1,invalid_text:!1,length:function(){return 8!=b.verify.token.length?(b.validate.invalid_length=!0,b.clear(b.validate,"invalid_length"),!1):!0},text:function(){return/[^1-9a-zA-Z'\- ,.]/g.test(b.agent.instructions)?(b.validate.invalid_text=!0,b.clear(b.validate,"invalid_text"),!1):!0}},menu:{choice:""},verify:{token:"",code:"",disabled:!1},transfer:{disabled:!1,account:"",amount:"",loginid:local_storage.get("authorize").loginid,value:[]},standard:{url:"",iframe_visible:!1},agent:{disabled:!1,loginid:"",name:"",agents:[],commission:"",amount:"",currency:local_storage.get("authorize").currency,residence:"",instructions:"",checkAmount:function(a,b){var c=b.agent.amount;""!==c&&(c>2e3&&(b.agent.amount=2e3),0>c&&(b.agent.amount=""))}},login_details:loginids().reduce(function(a,b){return a.id===local_storage.get("authorize").loginid?a:b})},c=b.route,d=b.menu,e=b.verify,f=b.empty_fields,g=b.standard,h=b.agent,i=b.transfer,j=b.validate,k={menu:400,verify:400,transfer:400,"transfer-done":300,standard:400,agent:550,"agent-confirm":400,"agent-done":300};c.update=function(a){c.value=a,t.dialog("option","height",k[a])},d.click=function(a){if(d.choice=a,c.update("transfer"!==a?"verify":"transfer"),"transfer"!==a){var b=local_storage.get("authorize").email,e="agent"===a?"paymentagent_withdraw":"payment_withdraw";n["default"].send({verify_email:b,type:e}).then(function(){return m["default"].growl.notice({message:"Verification code sent to ".i18n()+b})})["catch"](function(a){v(a),c.update("menu")})}},e.back=function(){e.token=e.code="",c.update("menu")},e.unlock=function(){return e.token?void(j.length()&&("standard"===d.choice?(e.disabled=!0,n["default"].send({cashier:"withdraw",verification_code:e.token,provider:"epg"}).then(function(a){if(a.cashier.startsWith("ASK_"))throw new Error(a.cashier);g.url=a.cashier,e.disabled=!1,c.update("standard"),e.code=e.token,e.token=""})["catch"](function(a){return e.disabled=!1,"ASK_UK_FUNDS_PROTECTION"===a.code?void r["default"].init_win().then()["catch"](function(a){v(a)}):void v(a)})):"agent"===d.choice&&(e.code=e.token,e.token="",c.update("agent")))):void f.show()},g.iframe_loaded=function(){g.url&&(g.iframe_visible=!0)},h.onchanged=function(){if(h.loginid){var a=h.agents.find(function(a){return a.paymentagent_loginid===h.loginid}),b=a.withdrawal_commission,c=a.name;h.commission=b,h.name=c}else h.commission="",h.name=""},h.amount_with_commission=function(){var a=(h.amount||0)*(100-h.commission)/100;return a.toFixed(2)},h.click=function(){return h.loginid?h.amount>=10&&h.amount<=2e3?void((!h.instructions||j.text())&&c.update("agent-confirm")):void m["default"].growl.error({message:"Amount Min: 10 Max: 2000".i18n()}):void m["default"].growl.error({message:"Please select a payment agent".i18n()})},h.confirm_transfer=function(){var a={paymentagent_withdraw:1,paymentagent_loginid:h.loginid,currency:h.currency,amount:1*h.amount,description:h.instructions,verification_code:e.code};h.disabled=!0,n["default"].send(a).then(function(){c.update("agent-done"),h.disabled=!1})["catch"](function(a){h.disabled=!1,c.update("menu"),v(a)})},i.submit=function(){if(""===i.account||""===i.amount)return void f.show();var a={transfer_between_accounts:1,account_from:i.account.split("_to_")[0],account_to:i.account.split("_to_")[1],currency:h.currency,amount:i.amount};i.disabled=!0,n["default"].send(a).then(function(){i.account=i.account.split("_to_")[1],c.update("transfer-done")})["catch"](function(a){v(a),i.disabled=!1})},i.isAvailable=function(){if(b.login_details.is_mlt||b.login_details.is_mf){var a=!0;return loginids().forEach(function(c){c.id!==b.login_details.id&&(c.is_mf||c.is_mlt)&&(a=!1,i.value=[{value:b.login_details.id+"_to_"+c.id,text:"from account ("+b.login_details.id+") to account ("+c.id+")"}],i.value.push({value:c.id+"_to_"+b.login_details.id,text:"from account ("+c.id+") to account ("+b.login_details.id+")"}),i.account=i.value[0].value)}),!a}},n["default"].send({get_settings:1}).then(function(a){return h.residence=a.get_settings.country_code,n["default"].cached.send({paymentagent_list:h.residence})}).then(function(a){h.agents=a.paymentagent_list.list})["catch"](v),n["default"].send({payout_currencies:1}).then(function(a){h.currency=a.payout_currencies[0]})["catch"](function(a){return void 0}),u=p["default"].bind(a[0],b),isChampionFx()&&d.click("standard")}};a["default"]=new w});