DC=function(a,b,c){IndicatorBase.call(this,a,b,c),this.lowData=[],this.areaRangeData=[],this.priceData=[],this.uniqueID=[uuid(),uuid(),uuid()],this.calculateDCValue=function(a,b){for(var c=a[b].high,d=a[b].low,e=0;e<this.options.period;e++)b-e>=0&&(c=Math.max(a[b-e].high,c),d=Math.min(a[b-e].low,d));return{highestHigh:c,lowestLow:d}};for(var d=0;d<a.length;d++){var e=this.calculateDCValue(a,d);this.indicatorData.push({time:a[d].time,value:e.highestHigh}),this.lowData.push({time:a[d].time,value:e.lowestLow}),this.areaRangeData.push({time:a[d].time,value:[e.highestHigh,e.lowestLow]}),this.priceData.push(a[d])}},DC.prototype=Object.create(IndicatorBase.prototype),DC.prototype.constructor=DC,DC.prototype.addPoint=function(a){this.priceData.push(a);var b=this.priceData.length-1,c=this.calculateDCValue(this.priceData,b);return this.indicatorData.push({time:a.time,value:c.highestHigh}),this.lowData.push({time:a.time,value:c.lowestLow}),this.areaRangeData.push({time:a.time,value:[c.highestHigh,c.lowestLow]}),[{id:this.uniqueID[0],value:c.highestHigh},{id:this.uniqueID[1],value:c.lowestLow},{id:this.uniqueID[2],value:[c.highestHigh,c.lowestLow]}]},DC.prototype.update=function(a){var b=this.priceData.length-1;this.priceData[b].open=a.open,this.priceData[b].high=a.high,this.priceData[b].low=a.low,this.priceData[b].close=a.close;var c=this.calculateDCValue(this.priceData,b);return this.indicatorData[b].value=c.highestHigh,this.lowData[b].value=c.lowestLow,this.areaRangeData[b].value=c.lowestLow,[{id:this.uniqueID[0],value:c.highestHigh},{id:this.uniqueID[1],value:c.lowestLow},{id:this.uniqueID[2],value:[c.highestHigh,c.lowestLow]}]},DC.prototype.toString=function(){return"DC ("+this.options.period+", "+this.indicators.appliedPriceString(this.options.appliedTo)+")"},DC.prototype.buildSeriesAndAxisConfFromData=function(){var a=[];this.indicatorData.forEach(function(b){a.push([b.time,b.value])});var b=[];this.lowData.forEach(function(a){b.push([a.time,a.value])});var c=[];return this.areaRangeData.forEach(function(a){c.push(_.flattenDeep([a.time,a.value]))}),[{seriesConf:{id:this.uniqueID[0],name:"High - "+this.toString(),data:a,type:"line",color:this.options.highStroke,lineWidth:this.options.strokeWidth,dashStyle:this.options.dashStyle,onChartIndicator:!0}},{seriesConf:{id:this.uniqueID[1],name:"Low - "+this.toString(),data:b,type:"line",color:this.options.lowStroke,lineWidth:this.options.strokeWidth,dashStyle:this.options.dashStyle,onChartIndicator:!0}},{seriesConf:{id:this.uniqueID[2],data:c,name:"DC Range",type:"arearange",color:"white",fillColor:"rgba(28,28,28,0.2)",connectNulls:!0,states:{hover:{enabled:!1}},events:{},dataLabels:{enabled:!1},point:{events:{}},enableMouseTracking:!1,onChartIndicator:!0}}]},DC.prototype.getIDs=function(){return this.uniqueID},DC.prototype.isSameInstance=function(a){return _.isEqual(a.sort(),this.uniqueID)};