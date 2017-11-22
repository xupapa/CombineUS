/**
 * 基础类
 * 1.全局初始化
 * 2.组件数据绑定
 * 3.异步加载数据
 */
//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
var cityBar = document.getElementById('cityBar');
var cityContainers = document.getElementById('cityContainer');
var resizeWorldMapContainer = function () {
    cityBar.style.width = cityContainers.clientWidth + 'px';
    cityBar.style.height = cityContainers.clientHeight + 'px';
};
//设置容器高宽
resizeWorldMapContainer();
var commonClass = (function () {
    var selectedTime;
    var selectedCity;
    var privateMethod = {
        formatInitData: function (data) {
            var metadata = {
                //x轴data
                timeLine: [],
                dataX: [],
                citys: {}
            }
            //元数据赋值
            metadata.dataX = data.titleData;
            for (var i = 0; i < data.data.length; i++) {
                metadata.timeLine.push(data.data[i].year)
                if (i == 0) {
                    metadata.citys = data.data[i].citys
                }
            }
            //更新选中时间
            selectedTime = data.data[0].year
            selectedCity = metadata.citys[0].cityName
            return metadata;
        },
        changeTime: function (time, data) {
            var metadata = {
                //x轴data
                timeLine: [],
                dataX: [],
                citys: {},
                city: {}
            }
            //元数据赋值
            metadata.dataX = data.titleData;
            for (var i = 0; i < data.data.length; i++) {
                metadata.timeLine.push(data.data[i].year)
                if (data.data[i].year == time) {
                    metadata.citys = data.data[i].citys
                    for (var j = 0; j < metadata.citys.length; j++) {
                        if (selectedCity == metadata.citys[j].cityName) {
                            metadata.city = metadata.citys[j]
                        }
                    }
                }
            }
            //更新selectedTime
            selectedTime = time;
            return metadata;
            console.log(metadata)
        },
        changeCity: function (cityName, data) {
            selectedCity = cityName;
            var metadata = {
                //x轴data
                dataX: [],
                city: {}
            }
            metadata.dataX = data.titleData;
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].year == selectedTime) {
                    var citys = data.data[i].citys
                    for (var j = 0; j < citys.length; j++) {
                        if (cityName == citys[j].cityName) {
                            metadata.city = citys[j]
                        }
                    }
                }
            }
            return metadata;

        }

    };
    return {
        //全局初始化
        //1.各个组件初始化
        init: function (data) {
            var matedata = privateMethod.formatInitData(data);
            timeLineClass.init(matedata.timeLine, data);
            dataBarClass.init(matedata.dataX, matedata.citys[0]);
            cityBarClass.init(matedata.citys, data);
            pieClass.init(matedata.dataX, matedata.citys[0]);
        },
        changeTime: function (time, data) {

            var matedata = privateMethod.changeTime(time, data);
            dataBarClass.init(matedata.dataX, matedata.city);
            cityBarClass.init(matedata.citys, data);
            pieClass.init(matedata.dataX, matedata.city);
        },
        changeCity: function (cityName, data) {
            var matedata = privateMethod.changeCity(cityName, data)
            dataBarClass.init(matedata.dataX, matedata.city);
            pieClass.init(matedata.dataX, matedata.city);
        }

    }
})();
/**
 * 时间轴实现类
 */
var timeLineClass = (function () {
    //创建时间轴dom节点作为私有属性
    var time = echarts.init(document.getElementById('time'));
    var privateMethod = {
        /**
         * 初始化时间轴数据
         * param:时间轴数据数组
         */
        initTimeLine: function (timeData) {
            var optionLine = {
                timeline: {
                    axisType: 'category',
                    autoPlay: false,
                    playInterval: 1000,
                    data: timeData,
                },
            }
            time.setOption(optionLine)
        },
        /**
         * 监听时间轴变化事件
         * 
         */
        listenTimeLine: function (timeData, data) {
            time.on('timelinechanged', function (param) {
                var currentTime = timeData[param.currentIndex];
                commonClass.changeTime(currentTime, data)
            })
        }
    };
    return {
        init: function (timeData, data) {
            privateMethod.initTimeLine(timeData);
            privateMethod.listenTimeLine(timeData, data);
        }
    }
})();
/**
 * 数据条形图实现类
 */
var dataBarClass = (function () {
    var dataBar = echarts.init(document.getElementById('dataBar'));
    var privateMethod = {
        initDataBar: function (xData, data) {
            var option = {
                title: {
                    text: '数据展示'
                },
                tooltip: {},
                legend: {
                    data: ['数量']
                },
                xAxis: {
                    data: xData
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: data.detail
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            dataBar.setOption(option);
        },
    };
    return {
        init: function (xData, data) {
            privateMethod.initDataBar(xData, data);
        },
    }
})();
/**
 * 城市条形图实现类
 */
var cityBarClass = (function () {
    var cityBar = echarts.init(document.getElementById('cityBar'));
    var privateMethod = {
        initCityBar: function (xData) {

            var cityNames = []
            var cityDatas = []
            for (var i = 0; i < xData.length; i++) {
                cityNames.push(xData[i].cityName)
                cityDatas.push(xData[i].cityData)
            }
            var option = {
                title: {
                    text: '数据展示'
                },
                tooltip: {},
                legend: {
                    data: ['数量']
                },
                xAxis: {
                    data: cityNames
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: cityDatas
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            cityBar.setOption(option);
        },
        /**
         * 监听城市变化事件
         * 
         */
        listenCityChange: function (data) {
            cityBar.on('click', function (params) {
                commonClass.changeCity(params.name, data)
            });
        }

    };
    return {
        init: function (xData, data) {
            privateMethod.initCityBar(xData);
            privateMethod.listenCityChange(data);
        },
    }
})();
/**
 * 饼图实现类
 */
var pieClass = (function () {
    var pie = echarts.init(document.getElementById('pie'));
    var privateMethod = {
        initPie: function (xdata, data) {
            var datas = []
            for (var i = 0; i < data.detail.length; i++) {
                var meta = {
                    value: "",
                    name: ""
                }
                meta.value = data.detail[i]
                meta.name = xdata[i]
                datas.push(meta)
            }
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: xdata
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: datas
                }]
            };
            pie.setOption(option)
        }
    };
    return {
        init: function (xdata, data) {
            privateMethod.initPie(xdata, data);
        }
    }
})();
/**
 * 地图实现类
 */
// var mapClass = (function(){
//     var privateMethod ={

//             };
//             return {
//                 init:function(){

//                 }
//             }
// })();


$.get('data.json').done(function (data) {
    var dataMap = eval('(' + data + ')');
    commonClass.init(dataMap);
})
//用于使chart自适应高度和宽度
window.onresize = function () {
    //重置容器高宽
    resizeWorldMapContainer();
    myChart.resize();
};