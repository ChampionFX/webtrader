SAR=function(a,b,c){IndicatorBase.call(this,a,b,c),this.ep=[],this.af=[],this.trend=[],this.period=5,this.priceData=[],this.calculateSAR=function(a,b,c){var d=a[b].high,e=a[b].low,f=0;if(this.trend[b-2].value===this.trend[b-1].value){var g=this.indicatorData[b-1].value+this.af[b-1].value*(this.ep[b-1].value-this.indicatorData[b-1].value);if("UP"===this.trend[b-1].value){var h=Math.min(a[b-1].low,a[b-2].low);f=h>g?g:h}else{var i=Math.max(a[b-1].high,a[b-2].high);f=g>i?i:g}}else f=this.ep[b-1].value;var j="UP"===this.trend[b-1].value?d>this.ep[b-1].value?d:this.ep[b-1].value:e<this.ep[b-1].value?e:this.ep[b-1].value;c?this.ep.push({time:a[b].time,value:j}):this.ep[b]={time:a[b].time,value:j};var k="";"UP"===this.trend[b-1].value?k=e>f?"UP":"DOWN":"DOWN"===this.trend[b-1].value&&(k=f>d?"DOWN":"UP"),c?this.trend.push({time:a[b].time,value:k}):this.trend[b]={time:a[b].time,value:k};var l=0;return l=this.trend[b].value===this.trend[b-1].value?"UP"===this.trend[b].value?this.ep[b].value>this.ep[b-1].value?Math.min(this.af[b-1].value+this.options.acceleration,this.options.maximum):this.af[b-1].value:this.ep[b].value<this.ep[b-1].value?Math.min(this.af[b-1].value+this.options.acceleration,this.options.maximum):this.af[b-1].value:this.options.acceleration,c?this.af.push({time:a[b].time,value:l}):this.af[b]={time:a[b].time,value:l},toFixed(f,4)};for(var d=0;d<a.length;d++){if(d<this.period)this.ep.push({time:a[d].time,value:0}),this.af.push({time:a[d].time,value:this.options.acceleration}),this.trend.push(d===this.period-1?{time:a[d].time,value:"UP"}:{time:a[d].time,value:""}),this.indicatorData.push({time:a[d].time,value:0});else if(d===this.period){for(var e=0,f=0,g=0;g<this.period;g++){var h=a[d].high,i=a[d].low;0===e&&(e=h),e=Math.min(e,i,h),f=Math.max(e,i,h)}this.ep.push({time:a[d].time,value:f}),this.af.push({time:a[d].time,value:this.options.acceleration});var j="UP";"UP"===this.trend[d-1].value?j=i>e?"UP":"DOWN":"DOWN"===this.trend[d-1].value&&(j=e>h?"DOWN":"UP"),this.trend.push({time:a[d].time,value:j}),this.indicatorData.push({time:a[d].time,value:toFixed(e,4)})}else{var e=this.calculateSAR(a,d,!1);this.indicatorData.push({time:a[d].time,value:e})}this.priceData.push(a[d])}},SAR.prototype=Object.create(IndicatorBase.prototype),SAR.prototype.constructor=SAR,SAR.prototype.addPoint=function(a){this.priceData.push(a);var b=this.calculateSAR(this.priceData,this.priceData.length-1,!1);return this.indicatorData.push({time:a.time,value:b}),[{id:this.uniqueID,value:b}]},SAR.prototype.update=function(a){var b=this.priceData.length-1;this.priceData[b].open=a.open,this.priceData[b].high=a.high,this.priceData[b].low=a.low,this.priceData[b].close=a.close;var c=this.calculateSAR(this.priceData,b,!0);return this.indicatorData[b].value=c,[{id:this.uniqueID,value:c}]},SAR.prototype.toString=function(){return"SAR ("+this.indicators.appliedPriceString(this.options.appliedTo)+")"},SAR.prototype.buildSeriesAndAxisConfFromData=function(){var a=[];return this.indicatorData.forEach(function(b){a.push([b.time,b.value])}),[{seriesConf:{id:this.uniqueID,name:"SAR ("+this.options.acceleration+","+this.options.maximum+")",data:a,lineWidth:0,marker:{enabled:!0,symbol:"circle"},color:this.options.stroke,states:{hover:{enabled:!1}},onChartIndicator:!0}}]};