CKS=function(a,b,c){IndicatorBase.call(this,a,b,c),this.priceData=[],this.highStops=[],this.lowStops=[],this.shortStops=[],this.uniqueID=[uuid(),uuid()],this.atr=new ATR(a,b,c),this.calculateStopValue=function(a,b){for(var c=a[b].high,d=a[b].low,e=0;e<this.options.period;e++)b-e>0&&(c=Math.max(a[b-e].high,c),d=Math.min(a[b-e].low,d));var f=c-this.options.multiplier*this.atr.indicatorData[b].value,g=d+this.options.multiplier*this.atr.indicatorData[b].value;return{highStop:f,lowStop:g}},this.calculateCKSValue=function(a){for(var b=this.highStops[a].value,c=this.lowStops[a].value,d=0;d<this.options.maxMinPeriod;d++)a-d>0&&(b=Math.max(this.highStops[a-d].value,b),c=Math.min(this.lowStops[a-d].value,c));return{longStop:toFixed(b,4),shortStop:toFixed(c,4)}};for(var d=0;d<a.length;d++){var e=this.calculateStopValue(a,d);this.highStops.push({time:a[d].time,value:e.highStop}),this.lowStops.push({time:a[d].time,value:e.lowStop})}for(var d=0;d<a.length;d++){if(d>=this.options.period){var f=this.calculateCKSValue(d);this.indicatorData.push({time:a[d].time,value:f.longStop}),this.shortStops.push({time:a[d].time,value:f.shortStop})}else this.indicatorData.push({time:a[d].time,value:0}),this.shortStops.push({time:a[d].time,value:0});this.priceData.push(a[d])}},CKS.prototype=Object.create(IndicatorBase.prototype),CKS.prototype.constructor=CKS,CKS.prototype.addPoint=function(a){this.priceData.push(a);var b=this.priceData.length-1,c=(this.atr.addPoint(a)[0].value,this.calculateStopValue(this.priceData,b));this.highStops.push({time:a.time,value:c.highStop}),this.lowStops.push({time:a.time,value:c.lowStop});var d=this.calculateCKSValue(b);return this.indicatorData.push({time:a.time,value:d.longStop}),this.shortStops.push({time:a.time,value:d.shortStop}),[{id:this.uniqueID[1],value:d.longStop},{id:this.uniqueID[0],value:d.shortStop}]},CKS.prototype.update=function(a){var b=this.priceData.length-1;this.priceData[b].open=a.open,this.priceData[b].high=a.high,this.priceData[b].low=a.low,this.priceData[b].close=a.close;var c=(this.atr.update(a)[0].value,this.calculateStopValue(this.priceData,b));this.highStops[b].value=c.highStop,this.lowStops[b].value=c.lowStop;var d=this.calculateCKSValue(b);return this.indicatorData[b].value=d.longStop,this.shortStops[b].value=d.shortStop,[{id:this.uniqueID[1],value:d.longStop},{id:this.uniqueID[0],value:d.shortStop}]},CKS.prototype.toString=function(){return"CKS ("+this.options.period+", "+this.options.maxMinPeriod+", "+this.options.multiplier+")"},CKS.prototype.buildSeriesAndAxisConfFromData=function(){var a=[];this.indicatorData.forEach(function(b){a.push([b.time,b.value])});var b=[];return this.shortStops.forEach(function(a){b.push([a.time,a.value])}),[{seriesConf:{id:this.uniqueID[0],name:"Short Stop - "+this.toString(),data:b,type:"line",color:this.options.shortStopStroke,lineWidth:this.options.strokeWidth,dashStyle:this.options.dashStyle,onChartIndicator:!0}},{seriesConf:{id:this.uniqueID[1],name:"Long Stop - "+this.toString(),data:a,type:"line",color:this.options.longStopStroke,lineWidth:this.options.strokeWidth,dashStyle:this.options.dashStyle,onChartIndicator:!0}}]},CKS.prototype.getIDs=function(){return this.uniqueID},CKS.prototype.isSameInstance=function(a){return _.isEqual(a.sort(),this.uniqueID)};