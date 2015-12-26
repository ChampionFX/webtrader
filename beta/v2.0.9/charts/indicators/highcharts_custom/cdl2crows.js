define(["indicator_base","highstock"],function(a){function b(b,c){var d=c,e=c-1,f=c-2,g=a.extractPriceForAppliedTO(a.OPEN,b,f),h=a.extractPriceForAppliedTO(a.CLOSE,b,f),i=a.extractPriceForAppliedTO(a.OPEN,b,e),j=a.extractPriceForAppliedTO(a.CLOSE,b,e),k=a.extractPriceForAppliedTO(a.OPEN,b,d),l=a.extractPriceForAppliedTO(a.CLOSE,b,d),m=h>g,n=g>h,o=j>i,p=i>j,q=l>k,r=k>l,s=m&&p&&i>h&&r&&j>l&&k>i&&l>l,t=n&&o&&h>i&&q&&l>j&&i>k&&l>l;return{isBullishContinuation:t,isBearishContinuation:s}}var c={},d={};return{init:function(){!function(a,e,f){function g(a,e){var g=this,h=g.chart;for(var i in d)if(d[i]&&d[i].options&&d[i].options.data&&d[i].options.data.length>0&&c[i].parentSeriesID==g.options.id&&d[i].chart===h){var j=g.options.data,k=(c[i].period,f.findIndexInDataForTime(j,a));if(k>=1){var l=b(j,k),m=null;l.isBullishContinuation?m={x:j[k].x||j[k][0],title:'<span style="color : blue">TC</span>',text:"Two crows : Bull"}:l.isBearishContinuation&&(m={x:j[k].x||j[k][0],title:'<span style="color : red">TC</span>',text:"Two crows : Bear"});for(var n=-1,o=d[i].data.length-1;o>=0;o--)if((d[i].data[o].x||d[i].data[o][0])==(j[k].x||j[k][0])){n=o;break}m?(e&&n>=0&&d[i].data[n].remove(),d[i].addPoint(m)):n>=0&&d[i].data[n].remove()}}}a&&!a.Series.prototype.addCDL2CROWS&&(a.Series.prototype.addCDL2CROWS=function(a){var f=this.options.id;a=e.extend({parentSeriesID:f},a);var g="_"+(new Date).getTime(),h=this.options.data||[];if(h&&h.length>0){for(var i=[],j=2;j<h.length;j++){var k=b(h,j),l=k.isBullishContinuation,m=k.isBearishContinuation;l&&i.push({x:h[j].x||h[j][0],title:'<span style="color : blue">TC</span>',text:"Two crows : Bull"}),m&&i.push({x:h[j].x||h[j][0],title:'<span style="color : red">TC</span>',text:"Two crows : Bear"})}var n=this.chart;c[g]=a;d[g]=n.addSeries({id:g,name:"CDL2CROWS",data:i,type:"flags",onSeries:f,shape:"flag",turboThreshold:0},!1,!1),e(d[g]).data({isIndicator:!0,indicatorID:"cdl2crows",parentSeriesID:a.parentSeriesID}),n.redraw()}return g},a.Series.prototype.removeCDL2CROWS=function(a){var b=this.chart;c[a]=null,b.get(a).remove(!1),d[a]=null,b.redraw()},a.Series.prototype.preRemovalCheckCDL2CROWS=function(a){return{isMainIndicator:!0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,h){a.call(this,b,d,e,h),f.checkCurrentSeriesHasIndicator(c,this.options.id)&&g.call(this,b[0],!1)}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),f.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&g.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});