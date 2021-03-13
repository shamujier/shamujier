


// 计算加载时间
function getPerformanceTiming () { 
    var performance = window.performance;
  
    if (!performance) {
        // 当前浏览器不支持
        console.log("当前浏览器不支持Performance API")
        return;
    }
  
    var t = performance.timing;
    var times = {};
  
    //页面加载完成的时间
    times.loadPage = t.loadEventEnd - t.navigationStart;
  
    //【重要】解析 DOM 树结构的时间
    times.domReady = t.domComplete - t.responseEnd;
  
    //【重要】重定向的时间
    times.redirect = t.redirectEnd - t.redirectStart;
  
    //【重要】DNS 查询时间       
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
  
    //【重要】读取页面第一个字节的时间
    // TTFB 即 Time To First Byte
    times.ttfb = t.responseStart - t.navigationStart;
  
    //【重要】内容加载完成的时间
    times.request = t.responseEnd - t.requestStart;
  
    //【重要】执行 onload 回调函数的时间
    //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
    times.loadEvent = t.loadEventEnd - t.loadEventStart;
  
    // DNS 缓存时间
    times.appcache = t.domainLookupStart - t.fetchStart;
  
    // 卸载页面的时间
    times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;
  
    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart;
  
    return times;
}