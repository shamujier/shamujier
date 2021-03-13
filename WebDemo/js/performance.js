// 计算加载时间
function getPerformanceTiming(performance) {
	

	var t = performance.timing;
	var times = {};

	//页面加载完成的时间
	times["页面加载完成的时间"] = t.loadEventEnd - t.navigationStart;

	//【重要】解析 DOM 树结构的时间
	times["解析 DOM 树结构的时间"] = t.domComplete - t.responseEnd;

	//【重要】重定向的时间
	times["重定向的时间"] = t.redirectEnd - t.redirectStart;

	//【重要】DNS 查询时间       
	times["DNS查询时间"] = t.domainLookupEnd - t.domainLookupStart;

	//【重要】读取页面第一个字节的时间
	// TTFB 即 Time To First Byte
	times["读取页面第一个字节的时间"] = t.responseStart - t.navigationStart;

	//【重要】内容加载完成的时间
	times["内容加载完成的时间"] = t.responseEnd - t.requestStart;

	//【重要】执行 onload 回调函数的时间
	//【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
	times["执行 onload 回调函数的时间"] = t.loadEventEnd - t.loadEventStart;

	// DNS 缓存时间
	times["DNS 缓存时间"] = t.domainLookupStart - t.fetchStart;

	// 卸载页面的时间
	times["卸载页面的时间"] = t.unloadEventEnd - t.unloadEventStart;

	// TCP 建立连接完成握手的时间
	times["TCP 建立连接完成握手的时间"] = t.connectEnd - t.connectStart;
	
	console.log(times);

	return times;
}

function ergodicObject(div,times) {
	createElement(div,"h2","Performance API获取的性能数据")
	
	//遍历对象属性
	Object.keys(times).forEach(key => {
		console.log(key + "=" + times[key]);
		createElement(div,"h4",key + " ----> " + times[key]);
	})
	
	
}

function ergodicResource(div,resource) {
	createElement(div,"h2","Performance API获取的资源数据");
	createElement(div,"h3","资源数据的数量为:"+resource.length);
	
	//遍历资源
	Object.keys(resource).forEach(key => {
		var resourceObj=resource[key];
		createElement(div,"h4",key + " ----> " + resourceObj);
		resourceData(resourceObj);
	})
		
	
}


function resourceData(obj){
		console.log(obj);
		createElement(div,"h6","encodedBodySize = "+obj["encodedBodySize"]);
		createElement(div,"h6","decodedBodySize = "+obj["decodedBodySize"]);
		createElement(div,"h6","transferSize = "+obj["transferSize"]);
}





/**
 * 创建元素和内容
 * @param {Object} div  父元素
 * @param {Object} elementName  元素名称(HTML标签)
 * @param {Object} elementText  元素文本
 */
function createElement(div,elementName,elementText){
	var para=document.createElement(elementName);
	var nodes=document.createTextNode(elementText);
	para.appendChild(nodes);
	div.appendChild(para);
}
