/**
 * 基础类
 * 1.全局初始化
 * 2.组件数据绑定
 * 3.异步加载数据
 */
// 用于使chart自适应高度和宽度, 通过窗体高宽计算容器高宽-- -- --底部柱状图
var cityBar = document.getElementById('cityBar');
var cityContainers = document.getElementById('cityContainer');
var resizeWorldMapContainerOfcityBar = function () {
    cityBar.style.width = cityContainers.clientWidth + 'px';
    cityBar.style.height = cityContainers.clientHeight + 'px';
};
//设置容器高宽
resizeWorldMapContainerOfcityBar();

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽------环图和小柱状图
var pie = document.getElementById('pie');
var dataBar = document.getElementById('dataBar');
var mainContainers1 = document.getElementById('mainContainer1');
var mainContainers2 = document.getElementById('mainContainer2');

var resizeWorldMapContainerOfMain = function () {
    pie.style.width = mainContainers1.clientWidth * 0.8 + 'px';
    pie.style.height = mainContainers1.clientHeight * 0.7 + 'px';
    dataBar.style.width = mainContainers2.clientWidth * 0.8 + 'px';
    dataBar.style.height = mainContainers2.clientHeight * 0.8 + 'px';
};
//设置容器高宽
resizeWorldMapContainerOfMain();

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽------时间轴
var time = document.getElementById('time');
var timeContainers = document.getElementById('timeContainer');
var resizeWorldMapContainerOfTime = function () {
    time.style.width = timeContainers.clientWidth + 'px';
    time.style.height = timeContainers.clientHeight + 'px';
};
//设置容器高宽
resizeWorldMapContainerOfTime();
var i = 0;
var j = 0;
var k = 0;
//柱状图颜色
var colors = ['#25E37B', '#FD9752', '#319BFF', '#FEE327'];
var colorsOfCity = ['#25E37B', '#FD9752', '#319BFF', '#09FEC1', '#FEE327', '#98AAFE', '#FC790F', '#ffffff', '#938E94'];
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
            mapClass.init(matedata.citys[0])
        },
        changeTime: function (time, data) {

            var matedata = privateMethod.changeTime(time, data);
            dataBarClass.init(matedata.dataX, matedata.city);
            cityBarClass.init(matedata.citys, data);
            pieClass.init(matedata.dataX, matedata.city);
            mapClass.init(matedata.city)
        },
        changeCity: function (cityName, data) {
            var matedata = privateMethod.changeCity(cityName, data)
            dataBarClass.init(matedata.dataX, matedata.city);
            pieClass.init(matedata.dataX, matedata.city);
            mapClass.init(matedata.city)
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
                    playInterval: 3000,
                    data: timeData,
                    checkpointStyle:{
                        color:'#fee327',
                        borderWidth:0
                    }
                }
            }
            time.setOption(optionLine)
        },
        /**
         * 监听时间轴变化事件
         */
        listenTimeLine: function (timeData, data) {
            time.on('timelinechanged', function (param) {
                var currentTime = timeData[param.currentIndex];
                commonClass.changeTime(currentTime, data)
            })
        },
        getEcharts: function () {
            return time
        }
    };
    return {
        init: function (timeData, data) {
            privateMethod.initTimeLine(timeData);
            privateMethod.listenTimeLine(timeData, data);
        },
        getEcharts: function () {
            return privateMethod.getEcharts();
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
                    text: '',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                tooltip: {},
                legend: {
                    data: ['数量']
                },
                itemStyle: {
                    normal: {
                        color: function () {
                            return colors[i++];
                        },
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                xAxis: {
                    data: xData,
                    //调整x坐标轴字体颜色
                    axisLabel: {
                        textStyle: {
                            color: 'white',
                            fontSize: '12'
                        },
                    }
                },
                yAxis: {
                    //调整y坐标轴字体颜色
                    axisLabel: {
                        textStyle: {
                            color: 'white',
                            fontSize: '12'
                        },
                    }
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: data.detail,
                    //动画的设置 动画类型 缓动效果 延迟时间
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 400;
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            dataBar.setOption(option);
            //清除颜色计数器
            i = 0;
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
                    text: '数据展示',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                tooltip: {},
                legend: {
                    data: ['数量']
                },
                xAxis: {
                    data: cityNames,
                    //调整x坐标轴字体颜色
                    axisLabel: {
                        textStyle: {
                            color: 'white',
                            fontSize: '12'
                        },
                    }
                },
                yAxis: {
                    //调整y坐标轴字体颜色
                    axisLabel: {
                        textStyle: {
                            color: 'white',
                            fontSize: '12'
                        },
                    }
                },
                itemStyle: {
                    normal: {
                        color: function () {
                            return colorsOfCity[k++];
                        },
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    barWidth: '60%',
                    data: cityDatas,
                    //动画的设置 动画类型 缓动效果 延迟时间
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 400;
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            cityBar.setOption(option);
            //清除颜色计数器
            k = 0;
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
                title: {
                    text: data.cityName,
                    textStyle: {
                        color: '#ffffff'
                    },
                    // left
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    // x: 'middle',
                    right: '10%',
                    data: xdata,
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                itemStyle: {
                    normal: {
                        color: function () {
                            return colors[j++];
                        },
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['40%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
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
                            show: true
                        }
                    },
                    data: datas,
                    //动画的设置 动画类型 缓动效果 延迟时间
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 400;
                    }
                }]
            };
            pie.setOption(option)
            // console.log(window.onresize)
            // console.log(pie)
            window.onresize=function(){

                console.log(123)
                pie.resize();
            }
            //清除颜色计数器
            j = 0;
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
var mapClass = (function(){
    //私有属性map
    var map = new AMap.Map('map',{
        //自适应开启
        resizeEnable:true
    }) 
    //私有属性地图标注类
    var privateMethod ={
        //标注地图点
        markPoint:function(position){
            var marker= new AMap.Marker({
                map:map,
                position:position
            });
        },
        //map初始化
        initMap:function(data){
            //设置皮肤
            map.setMapStyle("amap://styles/macaron");
            //设置初始化中心点坐标
            map.setCenter(data.coordinate)
        },
            };
            return {
                init:function(data){
                    privateMethod.initMap(data);
                }
            }
})();


$.get('data.json').done(function (data) {
    var dataMap = eval('(' + data + ')');
    commonClass.init(dataMap);
})
//用于使chart自适应高度和宽度
window.onresize = function () {
    //重置容器高宽
    resizeWorldMapContainerOfcityBar();
    resizeWorldMapContainerOfMain();
    resizeWorldMapContainerOfTime();

};