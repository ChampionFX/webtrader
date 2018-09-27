define(["exports","babel-runtime/regenerator","jquery","../windows/windows","../websockets/binary_websockets","jquery-ui","datatables","jquery-growl","css!./portfolio.css"],function(a,b,c,d,e){"use strict";function f(a){return a&&a.__esModule?a:{"default":a}}function g(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(i){return void c(i)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}Object.defineProperty(a,"__esModule",{value:!0}),a.proposal_open_contract=a.init=void 0;var h=f(b),i=f(c),j=f(d),k=f(e),l=null,m=null,n=null,o=[],p=a.init=function(a){a.click(function(){l?l.moveToTop():v()})},q=function(a){if(!a.error){var b=a.proposal_open_contract,c=b.contract_id,d=b.bid_price;if(m){var e=m.api().row("#"+c),f=e.data();if(!f)return;var g=f[3];f[3]=d,e.data(f);var h=m.find("#"+c);b.is_valid_to_sell?(h.removeClass("resale-not-offered"),g!==d&&h.removeClass("indicative-red indicative-green").addClass(1*d>1*g?"indicative-green":"indicative-red")):h.removeClass("indicative-red indicative-green").addClass("resale-not-offered")}}},r=!1,s=0;k["default"].events.on("logout",function(){r=!1,s=0});var t=function A(a){if("subscribe"===a)++s,!r&&s>0&&k["default"].send({proposal_open_contract:1,subscribe:1}).then(function(){r=!0})["catch"](function(a){i["default"].growl.error({message:a.message})});else if("forget"===a)--s,r&&0===s&&k["default"].send({forget_all:"proposal_open_contract"}).then(function(){r=!1})["catch"](function(a){r=!1});else{if("resubscribe"!==a)return;k["default"].send({forget_all:"proposal_open_contract"}).then(function(){r=!1,--s,A("subscribe")})["catch"](function(a){r=!1})}},u=function(a){var b=a.target,c=i["default"](b);if("BUTTON"===b.tagName&&!c.hasClass("button-disabled")){var d=b.parentElement.parentElement,e=m.api().row(d).data();e=_.last(e),c.addClass("button-disabled"),require(["viewtransaction/viewTransaction"],function(a){a.init(e.contract_id,e.transaction_id).then(function(){return c.removeClass("button-disabled")})["catch"](function(){c.removeClass("button-disabled")})})}},v=function(){var a="",b=k["default"].events.on("balance",function(b){void 0!==b.balance&&void 0!==b.balance.currency&&(a=b.balance.currency,n&&n&&n.update(b.balance.balance))}),c=((local_storage.get("i18n")||{value:"en"}).value,local_storage.get("active_symbols"),k["default"].events.on("transaction",function(a){var b=a.transaction;if("buy"===b.action){var c="<button>View</button>".i18n(),d=[b.transaction_id,b.longcode,Math.abs(b.amount),"0.00",c,b.contract_id,b];b.date_expiry&&k["default"].sell_expired(b.date_expiry),m.api().rows.add([d]),m.api().draw(),w([b])}else if("sell"===b.action){var e=m.find("#"+b.contract_id)[0];m.api().row(e).remove(),m.api().draw(),x([b])}}));k["default"].send({balance:1}).then(function(d){a=d.balance.currency,l=j["default"].createBlankWindow(i["default"]("<div/>"),{title:"Portfolio".i18n(),dialogClass:"portfolio",width:700,height:400,"data-authorized":"true",close:function(){x(o),k["default"].events.off("proposal_open_contract",q)},open:function(){y(),k["default"].events.on("proposal_open_contract",q)},destroy:function(){m&&m.DataTable().destroy(!0),l=null,k["default"].events.off("balance",b),k["default"].events.off("transaction",c)},refresh:function(){k["default"].send({balance:1})["catch"](function(a){i["default"].growl.error({message:a.message})}),x(o).then(y)}});var e=l.parent().find(".ui-dialog-title").addClass("with-content");n=i["default"]('<span class="span-in-dialog-header" />').insertAfter(e),n.update=function(b){n.html("Account balance: <strong>".i18n()+formatPrice(b,a)+"</strong>")},m=i["default"]("<table width='100%' class='portfolio-dialog hover'/>"),m.appendTo(l),m=m.dataTable({data:[],columns:[{title:"Ref.".i18n()},{title:"Contract Details".i18n()},{title:"Purchase".i18n(),render:function(b){return'<span class="bold">'+formatPrice(b,a)+"</span>"}},{title:"Indicative".i18n(),render:function(b){return'<span class="bold">'+formatPrice(b,a)+"</span>"}},{title:""}],rowId:"5",paging:!1,ordering:!1,processing:!0}),m.parent().addClass("hide-search-input"),l.on("click",u),l.track({module_id:"portfolio",is_unique:!0,data:null}),l.dialog("open")})["catch"](function(a){return void 0})},w=function(a){a.forEach(function(a){o.push(a),k["default"].proposal_open_contract.subscribe(a.contract_id)["catch"](function(a){return void 0})})},x=function(a){var b=a.map(function(a){return k["default"].proposal_open_contract.forget(a.contract_id)["catch"](function(a){return i["default"].growl.error({message:a.message})})}),c=_.map(a,"contract_id");return o=o.filter(function(a){return _.includes(c,a.contract_id)===!1}),Promise.all(b)},y=function(){var a=g(h["default"].mark(function b(){var a,c,d,e,f;return h["default"].wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return a=i["default"]("#"+m.attr("id")+"_processing").show(),b.prev=1,b.next=4,k["default"].send({portfolio:1});case 4:c=b.sent,d=c.portfolio&&c.portfolio.contracts,e="<button>View</button>".i18n(),f=d.map(function(a){return[a.transaction_id,a.longcode,a.buy_price,"0.00",e,a.contract_id,a]}),d.forEach(function(a){return k["default"].sell_expired(a.expiry_time)}),w(d),m.api().rows().remove(),m.api().rows.add(f),m.api().draw(),a.hide(),b.next=23;break;case 16:b.prev=16,b.t0=b["catch"](1),m.api().rows().remove(),m.api().draw(),a.hide(),i["default"].growl.error({message:b.t0.message});case 23:case"end":return b.stop()}},b,void 0,[[1,16]])}));return function(){return a.apply(this,arguments)}}(),z=a.proposal_open_contract={subscribe:function(){return t("subscribe")},forget:function(){return t("forget")},resubscribe:function(){return t("resubscribe")}};a["default"]={init:p,proposal_open_contract:z}});