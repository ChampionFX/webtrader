define(["jquery","common/rivetsExtra","lodash","jquery-ui","color-picker"],function(a,b,c){function d(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function e(e,f){require(["text!charts/indicators/cdlharami/cdlharami.html","text!charts/indicators/indicators.json"],function(g,h){g=a(g),g.appendTo("body"),h=JSON.parse(h);var i=h.cdlharami,j={title:i.long_display_name,description:i.description};b.bind(g[0],j);var k={autoOpen:!1,resizable:!1,width:350,height:400,modal:!0,my:"center",at:"center",of:window,buttons:[{text:"OK",click:function(){var b=a(a(".cdlharami").data("refererChartID")).highcharts().series[0];b.addIndicator("cdlharami",{cdlIndicatorCode:"cdlharami",onSeriesID:b.options.id}),d.call(g)}},{text:"Cancel",click:function(){d.call(this)}}],icons:{close:"custom-icon-close",minimize:"custom-icon-minimize",maximize:"custom-icon-maximize"}};g.dialog(k).dialogExtend(c.extend(k,{maximizable:!1,minimizable:!1,collapsable:!1})),a.isFunction(f)&&f(e)})}return{open:function(b){return 0==a(".cdlharami").length?void e(b,this.open):void a(".cdlharami").data("refererChartID",b).dialog("open")}}});