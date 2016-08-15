define(["jquery","windows/windows","text!charts/chartWindow.html","lodash","jquery.dialogextend","common/util"],function(a,b,c,d){"use strict";function e(){a(this).find(".chartSubContainer").width(a(this).width()-10),a(this).find(".chartSubContainer").height(a(this).height()-55),a(this).trigger("resize-event");var b="#"+a(this).find(".chartSubContainer").attr("id");require(["charts/charts"],function(a){a.triggerReflow(b)})}var f={},g={addNewWindow:function(g){var h=g;g=a.extend({title:g.instrumentName+" ("+g.timePeriod+")",close:function(){var b=a(this).attr("id"),c=a("#"+b+"_chart"),d=c.data("timePeriod"),e=c.data("instrumentCode");c.highcharts().destroy(),a(this).dialog("destroy").remove(),require(["charts/charts"],function(a){a.destroy({containerIDWithHash:"#"+b+"_chart",timePeriod:d,instrumentCode:e})}),require(["charts/chartOptions"],function(a){a.cleanBinding(b)})},resize:e,refresh:function(){require(["charts/charts"],function(a){a.refresh("#"+j+"_chart")})},width:374},g);var i=b.createBlankWindow(c,g),j=i.attr("id");i.find("div.chartSubContainerHeader").attr("id",j+"_header").end().find("div.chartSubContainer").attr("id",j+"_chart").end(),require(["charts/charts"],function(a){a.drawChart("#"+j+"_chart",g,g.resize.bind(i)),require(["charts/chartOptions","charts/tableView"],function(a,b){var c=b.init(i);a.init(j,g.timePeriod,g.type,c.show,g.instrumentName,g.instrumentCode)})}),f[j]=h,f[j].indicators=f[j].indicators||[],f[j].overlays=f[j].overlays||[];var k=i.track({module_id:"chartWindow",is_unique:!1,data:f[j]});return i.on("chart-type-changed",function(a,b){f[j].type=b,k(f[j])}),i.on("chart-time-period-changed",function(a,b){f[j].timePeriod=b,k(f[j])}),i.on("chart-indicators-changed",function(a,b){f[j].indicators=b.get_indicators(),k(f[j])}),i.on("chart-overlay-add",function(a,b){f[j].overlays.push(b),k(f[j])}),i.on("chart-overlay-remove",function(a,b){d.remove(f[j].overlays,b),k(f[j])}),i.on("chart-options-changed",function(){k(f[j])}),i.dialog("open"),i},totalWindows:function(){return a("div.webtrader-dialog").length},get_chart_options:function(a){var b=d.cloneDeep(f[a]);return b.name||(b.name=""),b},set_chart_options:function(b,c){c.instrumentCode=f[b].instrumentCode,c.instrumentName=f[b].instrumentName,f[b]=c,a("#"+b).trigger("chart-options-changed")},apply_chart_options:function(a,b){g.set_chart_options(a,b),require(["charts/charts","charts/chartOptions"],function(c,d){d.updateOptions(a,b.type,b.timePeriod,b.indicators.length,b.overlays.length),c.refresh("#"+a+"_chart",b.timePeriod,b.type,b.indicators,b.overlays)})},triggerResizeEffects:function(a){e.call(a)},changeChartWindowTitle:function(b,c,d){a("#"+b).dialog("option","title",c+" ("+d+")")}};return g});