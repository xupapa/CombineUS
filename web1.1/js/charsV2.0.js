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
var pie2 = document.getElementById('pie2');

// var dataBar = document.getElementById('dataBar');
var mainContainers1 = document.getElementById('mainContainer1');
var mainContainers2 = document.getElementById('mainContainer2');

var resizeWorldMapContainerOfMain = function () {
    var scaleWidth = 1;
    var scaleHeight = 1;
    // if (window.innerWidth <= 1440) {
    //     scaleWidth = 1;
    //     scaleHeight = 0.5;
    // }
    // if (window.innerWidth < 1680) {
    //     scaleWidth = 1;
    //     scaleHeight = 0.5;
    // }
    // if (window.innerWidth >= 1680) {
    //     scaleWidth = 1;
    //     scaleHeight = 0.5;
    // }
    console.log(window.screen.availWidth);
    // console.log(window.innerWidth)
    // switch (window.innerWidth) {
    //     case window.innerWidth <= 1440:
    //         scaleHeight = 0.5;
    // }
    pie.style.width = mainContainers1.clientWidth * scaleWidth + 'px';
    pie.style.height = mainContainers1.clientHeight * scaleHeight + 'px';
    pie2.style.width = mainContainers2.clientWidth * scaleWidth + 'px';
    pie2.style.height = mainContainers2.clientHeight * scaleHeight + 'px';
    // dataBar.style.width = mainContainers2.clientWidth * scaleWidth + 'px';
    // dataBar.style.height = mainContainers2.clientHeight * scaleHeight + 'px';
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
    var selectedShape = "square";
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

        },
    };
    return {
        //全局初始化
        //1.各个组件初始化
        init: function (data) {
            var matedata = privateMethod.formatInitData(data);
            timeLineClass.init(matedata.timeLine, data);
            // dataBarClass.init(matedata.dataX, matedata.citys[0]);
            cityBarClass.init(matedata.citys, data);
            pieClass.init(matedata.dataX, matedata.citys[0]);
            pieClass2.init(matedata.dataX, matedata.citys[0]);
            mapClass.init();
        },
        changeTime: function (time, data) {

            var matedata = privateMethod.changeTime(time, data);
            // dataBarClass.init(matedata.dataX, matedata.city);
            cityBarClass.init(matedata.citys, data);
            pieClass.init(matedata.dataX, matedata.city);
            pieClass2.init(matedata.dataX, matedata.city);
            mapClass.init(matedata.city)
        },
        changeCity: function (cityName, data) {
            var matedata = privateMethod.changeCity(cityName, data)
            // dataBarClass.init(matedata.dataX, matedata.city);
            pieClass.init(matedata.dataX, matedata.city);
            pieClass2.init(matedata.dataX, matedata.city);
            mapClass.init(matedata.city)
        },
        changeCityBarShap: function () {

            if (selectedShape == "square") {
                cityBarClass.changeShape("other");
                selectedShape = "other";
            } else {
                cityBarClass.changeShape("square");
                selectedShape = "square";
            }
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
                    checkpointStyle: {
                        color: '#fee327',
                        borderWidth: 1,
                        borderColor: '#ffffff',
                        symbolSize: 20,
                        // opacity: 0

                    },
                    lineStyle: {
                        color: '#ffffff'
                    },
                    itemStyle: {
                        normal: {
                            color: "#1f1f1f",
                            borderType: 'solid',
                            borderColor: '#ffffff',
                            borderWidth: 1,
                            // opacity: 0
                        },
                        emphasis: {
                            // color: "green",
                            color: '#fee327'
                            // opacity: 0
                        }
                    },
                    controlStyle: {
                        normal: {
                            color: '#ffffff',
                            borderColor: '#ffffff'
                        },
                        emphasis: {
                            color: '#ffffff',
                            borderColor: '#fee327'
                        }
                    },
                    top: 2,
                    bottom: 2,
                    left: 150,
                    right: 200,
                    // symbol: 'path:../img/circle.png',
                    symbol: 'circle',
                    symbolSize: 20,
                    label: {
                        normal: {
                            show: true,
                            position: 'bottom',
                            color: '#ffffff'
                        },
                        emphasis: {
                            show: true,
                            color: '#fee327'
                        }
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
                    textStyle: {
                        color: '#ffffff'
                    },
                    x: 'center',
                    y: 10
                },
                // grid: {
                //     top: 30,
                //     left: 50,
                //     right: 50,
                //     bottom: 35
                // },
                grid: {
                    top: 30,
                    left: 50,
                    right: 50,
                    bottom: 35
                },
                tooltip: {},
                legend: {
                    data: ['数量'],
                    x: 'left'
                },
                xAxis: {
                    data: cityNames,
                    //调整x坐标轴字体颜色
                    axisLabel: {
                        textStyle: {
                            color: 'white',
                            fontSize: '12'
                        },
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    //调整y坐标轴字体颜色
                    name: '（个）',
                    nameTextStyle: {
                        color: "#ffffff",
                        fontSize: 12
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white',
                            fontSize: '12'
                        },
                    },
                    splitLine: {
                        show: false
                    }
                },
                label: {

                },
                itemStyle: {
                    normal: {
                        // color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],                        
                        // barBorderRadius: 8, // 统一设置四个角的圆角大小
                        // barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        color: function () {
                            if (colorsOfCity.length - 1 == k) {
                                k = 0;
                                return colorsOfCity[k++];
                            } else {
                                return colorsOfCity[k++];
                            }
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
                    name: '数据',
                    type: 'bar',
                    barWidth: '60%',
                    data: cityDatas,
                    //动画的设置 动画类型 缓动效果 延迟时间
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 400;
                    }
                }],

            };

            // 使用刚指定的配置项和数据显示图表。
            cityBar.setOption(option);
            // window.addEventListener('resize', function () {
            //     cityBar.resize()
            // })
            $(window).resize(function () {
                cityBar.resize()
            })
            //清除颜色计数器
            k = 0;
        },
        /**
         * 监听城市变化事件
         * 
         */
        listenCityChange: function (data) {
            cityBar.on('click', function (params) {
                commonClass.changeCity(params.name, data);
            });
        },
        changeShape: function (shape) {
            if (shape == 'other') {
                var option = {
                    itemStyle: {
                        normal: {
                            barBorderRadius: [7, 7, 0, 0]
                        },
                    }
                };
                cityBar.setOption(option);
                k = 0;
            } else {
                var option = {
                    itemStyle: {
                        normal: {
                            barBorderRadius: [0, 0, 0, 0]
                        },
                    }
                };
                cityBar.setOption(option);
                k = 0;
            }
        }
    };
    return {
        init: function (xData, data) {
            privateMethod.initCityBar(xData);
            privateMethod.listenCityChange(data);
        },
        changeShape: function (shape) {
            privateMethod.changeShape(shape);
        }
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
                    text: '威胁人口',
                    subtext: '(人)',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 12,
                    },
                    subtextStyle: {
                        color: 'orange',
                        contSize: 11
                    },
                    left: 'center',
                    top: '40%',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    x2: 5,
                    data: xdata,
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                itemStyle: {
                    normal: {
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
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                series: [{
                    // name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    center: ['50%', '50%'],
                    color: ['#25E37B', '#FD9752', '#319BFF', '#FEE327'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b|{b}}\n{per|{d}%}  ',
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center',
                                    data: xdata
                                },
                                per: {
                                    fontSize: '10',
                                },
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            length2: 10,
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
            // window.onresize = pie.resize;
            window.addEventListener('resize', function () {
                pie.resize()
            })
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
var pieClass2 = (function () {
    var pie = echarts.init(document.getElementById('pie2'));
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
                    text: '威胁财产',
                    subtext: '(万元)',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 12,
                    },
                    subtextStyle: {
                        color: 'orange',
                        fontSize: 11
                    },
                    left: 'center',
                    top: '40%',
                },
                tooltip: {
                    trigger: 'item',
                    // formatter: "{a} <br/>{b}: {c} ({d}%)"
                    formatter: "{b}: {c}"
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    x2: 5,
                    data: xdata,
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                itemStyle: {
                    normal: {
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
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    center: ['50%', '50%'],
                    color: ['#25E37B', '#FD9752', '#319BFF', '#FEE327'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            // formatter: '{b|{b}}\n{per|{d}%}  ',
                            formatter: '{b|{b}}\n{c}',

                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center',
                                    data: xdata
                                },
                                per: {
                                    fontSize: '10',
                                }
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            length2: 10,
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
            window.onresize = pie.resize;
            // window.onresize = function () {
            //     pie.resize();
            // }
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
var mapClass = (function () {
    //图层覆盖地址
    var imageURL = "http://t0.tianditu.cn/img_w/wmts?" +
        "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
        "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";
    //私有属性map

    var map = new T.Map('map', {
        //自适应开启
        resizeEnable: true,
        layers: new T.TileLayer(imageURL, {
            minZoom: 1,
            maxZoom: 18
        })
    });
    //私有属性地图标注类
    var privateMethod = {
        //标注地图点
        markPoint: function (point) {
            marker = new T.Marker(new T.LngLat(116.411794, 39.9068)); // 创建标注
            privateMethod.infoWindow(marker)
            map.addOverLay(marker);
        },
        infoWindow: function (marker) {
            var infoWin1 = new T.InfoWindow();
            var sContent =
                `<div class="alert_window tag" style="border: 5px solid #09F;width: 400px;border: 2px solid #09F;background: rgba(63, 54, 45, 0.8);border-radius: 10px;z-index: 1000;">
            <em class="em-style" style="display: block;border-width: 20px;position: absolute;font-size: 0;line-height: 0;"></em>
            <span class="span-style" style="display: block;border-width: 20px;position: absolute;font-size: 0;line-height: 0;"></span>
            <div class="alert_title" style="width: 100%;height: 35px;border-bottom: 1px solid #09F;position: relative;">
                <h1 class="title" style=" padding-left: 10px;line-height: 35px;font-size: 14px;color: #ffffff;">县二中滑坡</h1>
                <img class="close-icon" src="./img/icon/close.png" alt="close" style=" position: absolute;top: 50%;right: 10px;width: 24px;height: 24px;margin-top: -12px;display:none;">
            </div>
            <div class="alert_content" style="width: 100%;border-bottom:1px solid #09F;text-align: left;">
                <div class="first-line" style="display: flex;">
                    <div style="flex: 1;padding-top: 10px;padding-left: 10px;">
                        <p style="color: #ffffff;font-size: 12px;margin:0;">灾害类型：
                            <span>滑坡</span>
                        </p>
                    </div>
                    <div style="flex: 1;padding-top: 10px;padding-left: 10px;">
                        <p style="color: #ffffff;font-size: 12px;margin:0;">规模等级：
                            <span>巨型</span>
                        </p>
                    </div>
                </div>
                <div class="second-line" style="display: flex;">
                    <div style="padding-top: 10px;padding-left: 10px;flex: 1;">
                        <p style="color: #ffffff;font-size: 12px;margin:0;">威胁人数：
                            <span class="span-red" style="color: red;">150</span>人
                        </p>
                    </div>
                    <div style="padding-top: 10px;padding-left: 10px;flex: 1;">
                        <p style="color: #ffffff;font-size: 12px;margin:0;" >威胁财产：
                            <span class="span-orange" style="orange">2725.7</span>万元
                        </p>
                    </div>
                </div>
                <div class="third-line" style="display: flex;padding-top: 10px;padding-left: 10px;padding-bottom: 10px;">
                    <p style="color: #ffffff;font-size: 12px;margin:0;">地理位置：
                        <span>陕西省商洛市镇安县</span>
                    </p>
                </div>
            </div>
            <div class="alert_tips" style="padding: 5px;display: flex;">
                <div class="img" style="flex: 1;border-right:1px solid #09F;text-align: center;">
                    <img class="icon-heart" src="./img/icon/heart.png" alt="heart" style="width: 40px;height: 40px;">
                    <h1 class="title" style="font-size: 12px;color: #ffffff;">
                        全生命周期
                    </h1>
                </div>
                <div class="tip" style="flex: 2;padding-top: 5px;padding-left: 10px;">
                    <ul class="items" style="padding-left:0">
                        <li class="item" style="list-style: none;display: inline-block;color: #ffffff;">
                            <div class="dot">
                                <p style="margin:0;">
                                    <span class="dot-orange" style="font-size:24px;line-height:24px;vertical-align:middle;color: orange;">●</span>
                                    <span style="display:inline-block;font-size:12px;line-height:24px;vertical-align:middle">基本情况</span>
                                </p>
                            </div>
                        </li>
                        <li class="item" style="list-style: none;display: inline-block;color: #ffffff;">
                            <div class="dot">
                                <p style="margin:0;">
                                    <span class="dot-yellow" style="font-size:24px;line-height:24px;vertical-align:middle;color: yellow;">●</span>
                                    <span style="display:inline-block;font-size:12px;line-height:24px;vertical-align:middle">群测群防</span>
                                </p>
                            </div>
                        </li>
                        <li class="item" style="list-style: none;display: inline-block;color: #ffffff;">
                            <div class="dot">
                                <p style="margin:0;">
                                    <span class="dot-green" style="font-size:24px;line-height:24px;vertical-align:middle;color: green;">●</span>
                                    <span style="display:inline-block;font-size:12px;line-height:24px;vertical-align:middle">勘察</span>
                                </p>
                            </div>
                        </li>
                        <li class="item" style="list-style: none;display: inline-block;color: #ffffff;">
                            <div class="dot">
                                <p style="margin:0;">
                                    <span class="dot-red" style="font-size:24px;line-height:24px;vertical-align:middle;color: red;">●</span>
                                    <span style="display:inline-block;font-size:12px;line-height:24px;vertical-align:middle">测绘</span>
                                </p>
                            </div>
                        </li>
                        <li class="item" style="list-style: none;display: inline-block;color: #ffffff;">
                            <div class="dot">
                                <p style="margin:0;">
                                    <span class="dot-yellow" style="font-size:24px;line-height:24px;vertical-align:middle;color: yellow;">●</span>
                                    <span style="display:inline-block;font-size:12px;line-height:24px;vertical-align:middle">监测预警</span>
                                </p>
                            </div>
                        </li>
                        <li class="item" style="list-style: none;display: inline-block;color: #ffffff;">
                            <div class="dot">
                                <p style="margin:0;">
                                    <span class="dot-purple" style="font-size:24px;line-height:24px;vertical-align:middle;color: purple;">●</span>
                                    <span style="display:inline-block;font-size:12px;line-height:24px;vertical-align:middle">搬迁避让</span>
                                </p>
                            </div>
                        </li>
                        <li class="item" style="list-style: none;display: inline-block;color: #ffffff;">
                            <div class="dot">
                                <p style="margin:0;">
                                    <span class="dot-light-green" style="font-size:24px;line-height:24px;vertical-align:middle;color: color: rgb(103, 207, 200);">●</span>
                                    <span style="display:inline-block;font-size:12px;line-height:24px;vertical-align:middle">工程治理</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>`;
            infoWin1.setContent(sContent);
            marker.addEventListener("click", function () {
                marker.openInfoWindow(infoWin1);
            }); // 将标注添加到地图中
        },
        //map初始化
        initMap: function (data) {
            //设置皮肤
            center = new T.LngLat(116.40769, 39.89945);
            //判断显示级别
            var zoom;
            if (data) {
                center = new T.LngLat(data.coordinate[0], data.coordinate[1]);
                zoom = 12;
            } else {
                zoom = 6;
            }
            if (data) {
                for (var i = 0; i < data.point.length; i++) {
                    privateMethod.markPoint(data.point[i]);
                }
            }
            map.centerAndZoom(center, zoom);
            map.setMapType(TMAP_SATELLITE_MAP);
            map.setMapType(TMAP_HYBRID_MAP); //地图混合开关

        },
    };
    return {
        init: function (data) {
            privateMethod.initMap(data);
        }
    }
})();


// $.get('data.json').done(function (data) {
var dataMap = {
    "data": [{
            "year": "1999",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "1125",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [122, 42, 187, 168]
                },
                {
                    cityCode: "tianjin",
                    cityData: "586",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [123, 97, 97, 388]
                },
                {
                    cityCode: "hebei",
                    cityData: "467",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [114, 51, 77, 204]
                },
                {
                    cityCode: "shanxi",
                    cityData: "168",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [40, 83, 28, 332]
                },
                {
                    cityCode: "neimeng",
                    cityData: "2053",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [107, 42, 342, 168]
                },
                {
                    cityCode: "liaoning",
                    cityData: "3197",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [28, 19, 532, 76]
                },
                {
                    cityCode: "jilin",
                    cityData: "8440",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [175, 57, 1406, 228]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "3276",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [178, 60, 546, 240]
                },
                {
                    cityCode: "shanghai",
                    cityData: "1135",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [103, 10, 189, 40]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "5688",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [172, 55, 948, 220]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "6073",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [95, 7, 1012, 28]
                },
                {
                    cityCode: "anhui",
                    cityData: "4252",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [103, 23, 708, 92]
                },
                {
                    cityCode: "fujian",
                    cityData: "2473",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [65, 57, 412, 228]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "3436",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [58, 10, 572, 40]
                },
                {
                    cityCode: "shandong",
                    cityData: "6835",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [2, 74, 1139, 296]
                },
                {
                    cityCode: "henan",
                    cityData: "1447",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [179, 15, 241, 60]
                },
                {
                    cityCode: "hubei",
                    cityData: "5848",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [135, 54, 974, 216]
                },
                {
                    cityCode: "hunan",
                    cityData: "6170",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [97, 82, 1028, 328]
                },
                {
                    cityCode: "guangdong",
                    cityData: "7870",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [10, 67, 1311, 268]
                },
                {
                    cityCode: "guangxi",
                    cityData: "2276",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [89, 77, 379, 308]
                },
                {
                    cityCode: "hainan",
                    cityData: "1807",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [125, 89, 301, 356]
                },
                {
                    cityCode: "chongqing",
                    cityData: "5771",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [109, 11, 961, 44]
                },
                {
                    cityCode: "sichuan",
                    cityData: "2401",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [169, 77, 400, 308]
                },
                {
                    cityCode: "guizhou",
                    cityData: "2329",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [50, 25, 388, 100]
                },
                {
                    cityCode: "yunnan",
                    cityData: "7519",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [78, 94, 1253, 376]
                },
                {
                    cityCode: "xizang",
                    cityData: "8540",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [118, 47, 1423, 188]
                },
                {
                    cityCode: "shanxi",
                    cityData: "8496",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [85, 14, 1416, 56]
                },
                {
                    cityCode: "gansu",
                    cityData: "1311",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [150, 24, 218, 96]
                },
                {
                    cityCode: "qinghai",
                    cityData: "8140",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [93, 52, 1356, 208]
                },
                {
                    cityCode: "ningxia",
                    cityData: "277",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [157, 16, 46, 64]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "1167",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [55, 51, 194, 204]
                }

            ]
        },
        {
            "year": "2000",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "5608",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [152, 21, 934, 84]
                },
                {
                    cityCode: "tianjin",
                    cityData: "6766",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [75, 88, 1127, 352]
                },
                {
                    cityCode: "hebei",
                    cityData: "1146",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [57, 4, 191, 16]
                },
                {
                    cityCode: "shanxi",
                    cityData: "5436",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [169, 38, 906, 152]
                },
                {
                    cityCode: "neimeng",
                    cityData: "2984",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [150, 51, 497, 204]
                },
                {
                    cityCode: "liaoning",
                    cityData: "4579",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [34, 7, 763, 28]
                },
                {
                    cityCode: "jilin",
                    cityData: "3815",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [14, 47, 635, 188]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "2025",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [124, 72, 337, 288]
                },
                {
                    cityCode: "shanghai",
                    cityData: "2555",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [171, 51, 425, 204]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "3776",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [139, 70, 629, 280]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "3161",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [31, 35, 526, 140]
                },
                {
                    cityCode: "anhui",
                    cityData: "3069",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [149, 72, 511, 288]
                },
                {
                    cityCode: "fujian",
                    cityData: "2874",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [197, 64, 479, 256]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "438",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [98, 65, 73, 260]
                },
                {
                    cityCode: "shandong",
                    cityData: "518",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [127, 87, 86, 348]
                },
                {
                    cityCode: "henan",
                    cityData: "2588",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [120, 92, 431, 368]
                },
                {
                    cityCode: "hubei",
                    cityData: "8205",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [60, 0, 1367, 0]
                },
                {
                    cityCode: "hunan",
                    cityData: "7816",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [12, 34, 1302, 136]
                },
                {
                    cityCode: "guangdong",
                    cityData: "3132",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [80, 39, 522, 156]
                },
                {
                    cityCode: "guangxi",
                    cityData: "5175",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [161, 0, 862, 0]
                },
                {
                    cityCode: "hainan",
                    cityData: "7534",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [13, 7, 1255, 28]
                },
                {
                    cityCode: "chongqing",
                    cityData: "3563",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [154, 41, 593, 164]
                },
                {
                    cityCode: "sichuan",
                    cityData: "723",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [9, 92, 120, 368]
                },
                {
                    cityCode: "guizhou",
                    cityData: "328",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [148, 59, 54, 236]
                },
                {
                    cityCode: "yunnan",
                    cityData: "3759",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [17, 88, 626, 352]
                },
                {
                    cityCode: "xizang",
                    cityData: "6126",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [45, 33, 1021, 132]
                },
                {
                    cityCode: "shanxi",
                    cityData: "5874",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [138, 34, 979, 136]
                },
                {
                    cityCode: "gansu",
                    cityData: "4679",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [182, 54, 779, 216]
                },
                {
                    cityCode: "qinghai",
                    cityData: "4442",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [148, 54, 740, 216]
                },
                {
                    cityCode: "ningxia",
                    cityData: "9208",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [32, 17, 1534, 68]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "6463",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [79, 24, 1077, 96]
                }

            ]
        },
        {
            "year": "2001",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "8056",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [118, 52, 1342, 208]
                },
                {
                    cityCode: "tianjin",
                    cityData: "7845",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [139, 1, 1307, 4]
                },
                {
                    cityCode: "hebei",
                    cityData: "3742",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [88, 9, 623, 36]
                },
                {
                    cityCode: "shanxi",
                    cityData: "9336",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [89, 15, 1556, 60]
                },
                {
                    cityCode: "neimeng",
                    cityData: "6939",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [189, 20, 1156, 80]
                },
                {
                    cityCode: "liaoning",
                    cityData: "9118",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [84, 1, 1519, 4]
                },
                {
                    cityCode: "jilin",
                    cityData: "5775",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [187, 57, 962, 228]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "7837",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [81, 53, 1306, 212]
                },
                {
                    cityCode: "shanghai",
                    cityData: "1743",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [138, 95, 290, 380]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "8800",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [77, 82, 1466, 328]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "6830",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [32, 44, 1138, 176]
                },
                {
                    cityCode: "anhui",
                    cityData: "478",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [16, 91, 79, 364]
                },
                {
                    cityCode: "fujian",
                    cityData: "2093",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [31, 17, 348, 68]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "3588",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [22, 46, 598, 184]
                },
                {
                    cityCode: "shandong",
                    cityData: "3725",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [34, 86, 620, 344]
                },
                {
                    cityCode: "henan",
                    cityData: "6584",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [107, 12, 1097, 48]
                },
                {
                    cityCode: "hubei",
                    cityData: "538",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [148, 76, 89, 304]
                },
                {
                    cityCode: "hunan",
                    cityData: "5332",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [82, 99, 888, 396]
                },
                {
                    cityCode: "guangdong",
                    cityData: "8414",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [143, 17, 1402, 68]
                },
                {
                    cityCode: "guangxi",
                    cityData: "4973",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [32, 61, 828, 244]
                },
                {
                    cityCode: "hainan",
                    cityData: "8416",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [46, 45, 1402, 180]
                },
                {
                    cityCode: "chongqing",
                    cityData: "7504",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [167, 26, 1250, 104]
                },
                {
                    cityCode: "sichuan",
                    cityData: "5101",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [97, 58, 850, 232]
                },
                {
                    cityCode: "guizhou",
                    cityData: "3903",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [17, 4, 650, 16]
                },
                {
                    cityCode: "yunnan",
                    cityData: "570",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [178, 49, 95, 196]
                },
                {
                    cityCode: "xizang",
                    cityData: "9663",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [192, 84, 1610, 336]
                },
                {
                    cityCode: "shanxi",
                    cityData: "9606",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [189, 94, 1601, 376]
                },
                {
                    cityCode: "gansu",
                    cityData: "8200",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [68, 80, 1366, 320]
                },
                {
                    cityCode: "qinghai",
                    cityData: "3275",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [120, 36, 545, 144]
                },
                {
                    cityCode: "ningxia",
                    cityData: "7197",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [126, 83, 1199, 332]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "1416",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [197, 64, 236, 256]
                }

            ]
        },
        {
            "year": "2002",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "694",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [115, 91, 115, 364]
                },
                {
                    cityCode: "tianjin",
                    cityData: "1974",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [53, 92, 329, 368]
                },
                {
                    cityCode: "hebei",
                    cityData: "2015",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [69, 24, 335, 96]
                },
                {
                    cityCode: "shanxi",
                    cityData: "1892",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [93, 25, 315, 100]
                },
                {
                    cityCode: "neimeng",
                    cityData: "3009",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [190, 5, 501, 20]
                },
                {
                    cityCode: "liaoning",
                    cityData: "6084",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [32, 40, 1014, 160]
                },
                {
                    cityCode: "jilin",
                    cityData: "7519",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [194, 46, 1253, 184]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "4513",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [153, 68, 752, 272]
                },
                {
                    cityCode: "shanghai",
                    cityData: "4897",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [123, 8, 816, 32]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "6290",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [181, 46, 1048, 184]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "755",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [184, 6, 125, 24]
                },
                {
                    cityCode: "anhui",
                    cityData: "5646",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [120, 38, 941, 152]
                },
                {
                    cityCode: "fujian",
                    cityData: "7888",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [145, 24, 1314, 96]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "1461",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [94, 1, 243, 4]
                },
                {
                    cityCode: "shandong",
                    cityData: "5084",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [132, 52, 847, 208]
                },
                {
                    cityCode: "henan",
                    cityData: "4504",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [106, 77, 750, 308]
                },
                {
                    cityCode: "hubei",
                    cityData: "5459",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [16, 44, 909, 176]
                },
                {
                    cityCode: "hunan",
                    cityData: "8954",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [108, 74, 1492, 296]
                },
                {
                    cityCode: "guangdong",
                    cityData: "22",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [48, 58, 3, 232]
                },
                {
                    cityCode: "guangxi",
                    cityData: "4445",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [44, 2, 740, 8]
                },
                {
                    cityCode: "hainan",
                    cityData: "8584",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [39, 51, 1430, 204]
                },
                {
                    cityCode: "chongqing",
                    cityData: "6612",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [60, 92, 1102, 368]
                },
                {
                    cityCode: "sichuan",
                    cityData: "654",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [108, 61, 109, 244]
                },
                {
                    cityCode: "guizhou",
                    cityData: "6131",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [62, 29, 1021, 116]
                },
                {
                    cityCode: "yunnan",
                    cityData: "3135",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [77, 71, 522, 284]
                },
                {
                    cityCode: "xizang",
                    cityData: "4405",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [118, 27, 734, 108]
                },
                {
                    cityCode: "shanxi",
                    cityData: "3784",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [68, 59, 630, 236]
                },
                {
                    cityCode: "gansu",
                    cityData: "3161",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [139, 56, 526, 224]
                },
                {
                    cityCode: "qinghai",
                    cityData: "512",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [107, 3, 85, 12]
                },
                {
                    cityCode: "ningxia",
                    cityData: "284",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [99, 81, 47, 324]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "8219",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [61, 52, 1369, 208]
                }

            ]
        },
        {
            "year": "2003",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "8095",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [61, 6, 1349, 24]
                },
                {
                    cityCode: "tianjin",
                    cityData: "1487",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [47, 56, 247, 224]
                },
                {
                    cityCode: "hebei",
                    cityData: "9078",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [151, 19, 1513, 76]
                },
                {
                    cityCode: "shanxi",
                    cityData: "7262",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [6, 60, 1210, 240]
                },
                {
                    cityCode: "neimeng",
                    cityData: "3734",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [62, 1, 622, 4]
                },
                {
                    cityCode: "liaoning",
                    cityData: "5379",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [114, 4, 896, 16]
                },
                {
                    cityCode: "jilin",
                    cityData: "3682",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [35, 14, 613, 56]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "8483",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [153, 33, 1413, 132]
                },
                {
                    cityCode: "shanghai",
                    cityData: "8146",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [167, 32, 1357, 128]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "8132",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [194, 22, 1355, 88]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "6205",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [71, 67, 1034, 268]
                },
                {
                    cityCode: "anhui",
                    cityData: "2313",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [194, 13, 385, 52]
                },
                {
                    cityCode: "fujian",
                    cityData: "3346",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [13, 53, 557, 212]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "6401",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [92, 19, 1066, 76]
                },
                {
                    cityCode: "shandong",
                    cityData: "2860",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [142, 82, 476, 328]
                },
                {
                    cityCode: "henan",
                    cityData: "3245",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [47, 66, 540, 264]
                },
                {
                    cityCode: "hubei",
                    cityData: "9500",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [46, 51, 1583, 204]
                },
                {
                    cityCode: "hunan",
                    cityData: "8378",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [168, 25, 1396, 100]
                },
                {
                    cityCode: "guangdong",
                    cityData: "3961",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [144, 11, 660, 44]
                },
                {
                    cityCode: "guangxi",
                    cityData: "4824",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [182, 20, 804, 80]
                },
                {
                    cityCode: "hainan",
                    cityData: "7488",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [163, 3, 1248, 12]
                },
                {
                    cityCode: "chongqing",
                    cityData: "7230",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [17, 15, 1205, 60]
                },
                {
                    cityCode: "sichuan",
                    cityData: "8620",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [168, 96, 1436, 384]
                },
                {
                    cityCode: "guizhou",
                    cityData: "9064",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [167, 59, 1510, 236]
                },
                {
                    cityCode: "yunnan",
                    cityData: "7676",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [31, 53, 1279, 212]
                },
                {
                    cityCode: "xizang",
                    cityData: "2560",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [68, 79, 426, 316]
                },
                {
                    cityCode: "shanxi",
                    cityData: "6994",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [161, 16, 1165, 64]
                },
                {
                    cityCode: "gansu",
                    cityData: "5126",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [40, 61, 854, 244]
                },
                {
                    cityCode: "qinghai",
                    cityData: "360",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [108, 10, 60, 40]
                },
                {
                    cityCode: "ningxia",
                    cityData: "735",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [85, 22, 122, 88]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "5125",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [64, 99, 854, 396]
                }

            ]
        },
        {
            "year": "2004",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "3337",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [112, 75, 556, 300]
                },
                {
                    cityCode: "tianjin",
                    cityData: "5258",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [149, 80, 876, 320]
                },
                {
                    cityCode: "hebei",
                    cityData: "6649",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [79, 87, 1108, 348]
                },
                {
                    cityCode: "shanxi",
                    cityData: "748",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [81, 17, 124, 68]
                },
                {
                    cityCode: "neimeng",
                    cityData: "538",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [72, 75, 89, 300]
                },
                {
                    cityCode: "liaoning",
                    cityData: "2022",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [121, 45, 337, 180]
                },
                {
                    cityCode: "jilin",
                    cityData: "8701",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [58, 71, 1450, 284]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "5814",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [29, 28, 969, 112]
                },
                {
                    cityCode: "shanghai",
                    cityData: "7813",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [0, 88, 1302, 352]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "9575",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [74, 86, 1595, 344]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "1448",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [22, 60, 241, 240]
                },
                {
                    cityCode: "anhui",
                    cityData: "106",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [134, 25, 17, 100]
                },
                {
                    cityCode: "fujian",
                    cityData: "9837",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [31, 11, 1639, 44]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "4828",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [103, 10, 804, 40]
                },
                {
                    cityCode: "shandong",
                    cityData: "6499",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [131, 98, 1083, 392]
                },
                {
                    cityCode: "henan",
                    cityData: "7761",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [79, 6, 1293, 24]
                },
                {
                    cityCode: "hubei",
                    cityData: "4868",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [88, 66, 811, 264]
                },
                {
                    cityCode: "hunan",
                    cityData: "2816",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [29, 58, 469, 232]
                },
                {
                    cityCode: "guangdong",
                    cityData: "2204",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [102, 60, 367, 240]
                },
                {
                    cityCode: "guangxi",
                    cityData: "8282",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [8, 28, 1380, 112]
                },
                {
                    cityCode: "hainan",
                    cityData: "1472",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [16, 88, 245, 352]
                },
                {
                    cityCode: "chongqing",
                    cityData: "26",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [3, 80, 4, 320]
                },
                {
                    cityCode: "sichuan",
                    cityData: "8920",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [107, 63, 1486, 252]
                },
                {
                    cityCode: "guizhou",
                    cityData: "9426",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [84, 99, 1571, 396]
                },
                {
                    cityCode: "yunnan",
                    cityData: "7999",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [125, 59, 1333, 236]
                },
                {
                    cityCode: "xizang",
                    cityData: "8684",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [191, 62, 1447, 248]
                },
                {
                    cityCode: "shanxi",
                    cityData: "1867",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [13, 0, 311, 0]
                },
                {
                    cityCode: "gansu",
                    cityData: "2110",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [55, 3, 351, 12]
                },
                {
                    cityCode: "qinghai",
                    cityData: "5809",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [126, 73, 968, 292]
                },
                {
                    cityCode: "ningxia",
                    cityData: "4848",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [75, 94, 808, 376]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "6154",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [116, 2, 1025, 8]
                }

            ]
        },
        {
            "year": "2005",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "3475",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [113, 19, 579, 76]
                },
                {
                    cityCode: "tianjin",
                    cityData: "6029",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [130, 48, 1004, 192]
                },
                {
                    cityCode: "hebei",
                    cityData: "5406",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [35, 91, 901, 364]
                },
                {
                    cityCode: "shanxi",
                    cityData: "3995",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [121, 80, 665, 320]
                },
                {
                    cityCode: "neimeng",
                    cityData: "9686",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [133, 59, 1614, 236]
                },
                {
                    cityCode: "liaoning",
                    cityData: "5273",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [183, 34, 878, 136]
                },
                {
                    cityCode: "jilin",
                    cityData: "7626",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [76, 29, 1271, 116]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "1905",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [97, 6, 317, 24]
                },
                {
                    cityCode: "shanghai",
                    cityData: "2411",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [48, 57, 401, 228]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "9754",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [72, 42, 1625, 168]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "7433",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [76, 38, 1238, 152]
                },
                {
                    cityCode: "anhui",
                    cityData: "2603",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [131, 65, 433, 260]
                },
                {
                    cityCode: "fujian",
                    cityData: "6357",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [151, 22, 1059, 88]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "3239",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [173, 60, 539, 240]
                },
                {
                    cityCode: "shandong",
                    cityData: "9370",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [41, 99, 1561, 396]
                },
                {
                    cityCode: "henan",
                    cityData: "5127",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [81, 31, 854, 124]
                },
                {
                    cityCode: "hubei",
                    cityData: "1600",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [139, 73, 266, 292]
                },
                {
                    cityCode: "hunan",
                    cityData: "4219",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [183, 47, 703, 188]
                },
                {
                    cityCode: "guangdong",
                    cityData: "213",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [9, 86, 35, 344]
                },
                {
                    cityCode: "guangxi",
                    cityData: "3406",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [191, 60, 567, 240]
                },
                {
                    cityCode: "hainan",
                    cityData: "2883",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [46, 4, 480, 16]
                },
                {
                    cityCode: "chongqing",
                    cityData: "6607",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [151, 79, 1101, 316]
                },
                {
                    cityCode: "sichuan",
                    cityData: "7649",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [144, 54, 1274, 216]
                },
                {
                    cityCode: "guizhou",
                    cityData: "7788",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [163, 25, 1298, 100]
                },
                {
                    cityCode: "yunnan",
                    cityData: "4484",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [180, 1, 747, 4]
                },
                {
                    cityCode: "xizang",
                    cityData: "6911",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [80, 23, 1151, 92]
                },
                {
                    cityCode: "shanxi",
                    cityData: "1860",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [89, 62, 310, 248]
                },
                {
                    cityCode: "gansu",
                    cityData: "4082",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [100, 24, 680, 96]
                },
                {
                    cityCode: "qinghai",
                    cityData: "9567",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [56, 50, 1594, 200]
                },
                {
                    cityCode: "ningxia",
                    cityData: "2312",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [101, 23, 385, 92]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "7012",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [29, 5, 1168, 20]
                }

            ]
        },
        {
            "year": "2006",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "1503",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [60, 59, 250, 236]
                },
                {
                    cityCode: "tianjin",
                    cityData: "748",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [88, 43, 124, 172]
                },
                {
                    cityCode: "hebei",
                    cityData: "2094",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [66, 16, 349, 64]
                },
                {
                    cityCode: "shanxi",
                    cityData: "3416",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [20, 43, 569, 172]
                },
                {
                    cityCode: "neimeng",
                    cityData: "5189",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [58, 40, 864, 160]
                },
                {
                    cityCode: "liaoning",
                    cityData: "8388",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [138, 5, 1398, 20]
                },
                {
                    cityCode: "jilin",
                    cityData: "9265",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [159, 43, 1544, 172]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "2572",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [126, 20, 428, 80]
                },
                {
                    cityCode: "shanghai",
                    cityData: "8974",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [99, 50, 1495, 200]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "9118",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [73, 79, 1519, 316]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "3806",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [122, 56, 634, 224]
                },
                {
                    cityCode: "anhui",
                    cityData: "2041",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [75, 4, 340, 16]
                },
                {
                    cityCode: "fujian",
                    cityData: "454",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [143, 69, 75, 276]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "5860",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [77, 90, 976, 360]
                },
                {
                    cityCode: "shandong",
                    cityData: "6809",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [60, 48, 1134, 192]
                },
                {
                    cityCode: "henan",
                    cityData: "37",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [103, 97, 6, 388]
                },
                {
                    cityCode: "hubei",
                    cityData: "6776",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [163, 73, 1129, 292]
                },
                {
                    cityCode: "hunan",
                    cityData: "8644",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [78, 25, 1440, 100]
                },
                {
                    cityCode: "guangdong",
                    cityData: "7311",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [190, 21, 1218, 84]
                },
                {
                    cityCode: "guangxi",
                    cityData: "5881",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [172, 40, 980, 160]
                },
                {
                    cityCode: "hainan",
                    cityData: "17",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [33, 42, 2, 168]
                },
                {
                    cityCode: "chongqing",
                    cityData: "4822",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [101, 89, 803, 356]
                },
                {
                    cityCode: "sichuan",
                    cityData: "4013",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [179, 96, 668, 384]
                },
                {
                    cityCode: "guizhou",
                    cityData: "5615",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [32, 1, 935, 4]
                },
                {
                    cityCode: "yunnan",
                    cityData: "160",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [86, 97, 26, 388]
                },
                {
                    cityCode: "xizang",
                    cityData: "8963",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [101, 68, 1493, 272]
                },
                {
                    cityCode: "shanxi",
                    cityData: "9899",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [130, 4, 1649, 16]
                },
                {
                    cityCode: "gansu",
                    cityData: "1026",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [52, 85, 171, 340]
                },
                {
                    cityCode: "qinghai",
                    cityData: "7518",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [196, 23, 1253, 92]
                },
                {
                    cityCode: "ningxia",
                    cityData: "7307",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [88, 49, 1217, 196]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "9411",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [17, 49, 1568, 196]
                }

            ]
        },
        {
            "year": "2007",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "4414",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [199, 8, 735, 32]
                },
                {
                    cityCode: "tianjin",
                    cityData: "6928",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [59, 33, 1154, 132]
                },
                {
                    cityCode: "hebei",
                    cityData: "1376",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [171, 75, 229, 300]
                },
                {
                    cityCode: "shanxi",
                    cityData: "4280",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [172, 8, 713, 32]
                },
                {
                    cityCode: "neimeng",
                    cityData: "4885",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [50, 53, 814, 212]
                },
                {
                    cityCode: "liaoning",
                    cityData: "1011",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [147, 54, 168, 216]
                },
                {
                    cityCode: "jilin",
                    cityData: "8282",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [50, 35, 1380, 140]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "2543",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [83, 26, 423, 104]
                },
                {
                    cityCode: "shanghai",
                    cityData: "5810",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [58, 93, 968, 372]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "3608",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [124, 55, 601, 220]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "7407",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [88, 40, 1234, 160]
                },
                {
                    cityCode: "anhui",
                    cityData: "333",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [90, 35, 55, 140]
                },
                {
                    cityCode: "fujian",
                    cityData: "9232",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [174, 64, 1538, 256]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "1071",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [172, 85, 178, 340]
                },
                {
                    cityCode: "shandong",
                    cityData: "1650",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [183, 10, 275, 40]
                },
                {
                    cityCode: "henan",
                    cityData: "9055",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [159, 32, 1509, 128]
                },
                {
                    cityCode: "hubei",
                    cityData: "3395",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [139, 61, 565, 244]
                },
                {
                    cityCode: "hunan",
                    cityData: "521",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [163, 94, 86, 376]
                },
                {
                    cityCode: "guangdong",
                    cityData: "6166",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [159, 89, 1027, 356]
                },
                {
                    cityCode: "guangxi",
                    cityData: "9697",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [179, 71, 1616, 284]
                },
                {
                    cityCode: "hainan",
                    cityData: "8485",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [64, 88, 1414, 352]
                },
                {
                    cityCode: "chongqing",
                    cityData: "7902",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [126, 45, 1317, 180]
                },
                {
                    cityCode: "sichuan",
                    cityData: "3808",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [4, 0, 634, 0]
                },
                {
                    cityCode: "guizhou",
                    cityData: "4586",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [94, 16, 764, 64]
                },
                {
                    cityCode: "yunnan",
                    cityData: "8234",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [52, 87, 1372, 348]
                },
                {
                    cityCode: "xizang",
                    cityData: "8186",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [105, 64, 1364, 256]
                },
                {
                    cityCode: "shanxi",
                    cityData: "3888",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [95, 17, 648, 68]
                },
                {
                    cityCode: "gansu",
                    cityData: "6208",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [118, 66, 1034, 264]
                },
                {
                    cityCode: "qinghai",
                    cityData: "8855",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [186, 15, 1475, 60]
                },
                {
                    cityCode: "ningxia",
                    cityData: "740",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [29, 51, 123, 204]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "3889",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [4, 7, 648, 28]
                }

            ]
        },
        {
            "year": "2008",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "9501",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [48, 8, 1583, 32]
                },
                {
                    cityCode: "tianjin",
                    cityData: "7261",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [47, 39, 1210, 156]
                },
                {
                    cityCode: "hebei",
                    cityData: "6325",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [86, 43, 1054, 172]
                },
                {
                    cityCode: "shanxi",
                    cityData: "3110",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [57, 96, 518, 384]
                },
                {
                    cityCode: "neimeng",
                    cityData: "2236",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [37, 61, 372, 244]
                },
                {
                    cityCode: "liaoning",
                    cityData: "2720",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [143, 23, 453, 92]
                },
                {
                    cityCode: "jilin",
                    cityData: "7676",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [147, 32, 1279, 128]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "939",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [101, 2, 156, 8]
                },
                {
                    cityCode: "shanghai",
                    cityData: "8652",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [148, 67, 1442, 268]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "8660",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [135, 48, 1443, 192]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "5853",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [154, 76, 975, 304]
                },
                {
                    cityCode: "anhui",
                    cityData: "576",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [121, 37, 96, 148]
                },
                {
                    cityCode: "fujian",
                    cityData: "4512",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [188, 24, 752, 96]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "7817",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [167, 73, 1302, 292]
                },
                {
                    cityCode: "shandong",
                    cityData: "9039",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [199, 15, 1506, 60]
                },
                {
                    cityCode: "henan",
                    cityData: "3203",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [177, 52, 533, 208]
                },
                {
                    cityCode: "hubei",
                    cityData: "5393",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [165, 20, 898, 80]
                },
                {
                    cityCode: "hunan",
                    cityData: "6480",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [99, 5, 1080, 20]
                },
                {
                    cityCode: "guangdong",
                    cityData: "6491",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [115, 62, 1081, 248]
                },
                {
                    cityCode: "guangxi",
                    cityData: "3193",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [44, 68, 532, 272]
                },
                {
                    cityCode: "hainan",
                    cityData: "4146",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [52, 85, 691, 340]
                },
                {
                    cityCode: "chongqing",
                    cityData: "3932",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [169, 91, 655, 364]
                },
                {
                    cityCode: "sichuan",
                    cityData: "3153",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [158, 57, 525, 228]
                },
                {
                    cityCode: "guizhou",
                    cityData: "2473",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [109, 20, 412, 80]
                },
                {
                    cityCode: "yunnan",
                    cityData: "3047",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [78, 69, 507, 276]
                },
                {
                    cityCode: "xizang",
                    cityData: "6159",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [136, 20, 1026, 80]
                },
                {
                    cityCode: "shanxi",
                    cityData: "7340",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [101, 15, 1223, 60]
                },
                {
                    cityCode: "gansu",
                    cityData: "7557",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [142, 66, 1259, 264]
                },
                {
                    cityCode: "qinghai",
                    cityData: "3881",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [136, 78, 646, 312]
                },
                {
                    cityCode: "ningxia",
                    cityData: "5874",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [141, 53, 979, 212]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "2005",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [10, 39, 334, 156]
                }

            ]
        },
        {
            "year": "2009",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "589",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [178, 68, 98, 272]
                },
                {
                    cityCode: "tianjin",
                    cityData: "736",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [49, 62, 122, 248]
                },
                {
                    cityCode: "hebei",
                    cityData: "7314",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [170, 9, 1219, 36]
                },
                {
                    cityCode: "shanxi",
                    cityData: "8667",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [78, 23, 1444, 92]
                },
                {
                    cityCode: "neimeng",
                    cityData: "6153",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [11, 76, 1025, 304]
                },
                {
                    cityCode: "liaoning",
                    cityData: "8804",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [76, 0, 1467, 0]
                },
                {
                    cityCode: "jilin",
                    cityData: "2825",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [70, 90, 470, 360]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "2931",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [23, 13, 488, 52]
                },
                {
                    cityCode: "shanghai",
                    cityData: "2626",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [76, 9, 437, 36]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "9193",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [199, 43, 1532, 172]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "2421",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [95, 61, 403, 244]
                },
                {
                    cityCode: "anhui",
                    cityData: "5669",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [90, 94, 944, 376]
                },
                {
                    cityCode: "fujian",
                    cityData: "7327",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [72, 12, 1221, 48]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "8364",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [91, 30, 1394, 120]
                },
                {
                    cityCode: "shandong",
                    cityData: "2345",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [100, 44, 390, 176]
                },
                {
                    cityCode: "henan",
                    cityData: "1246",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [96, 62, 207, 248]
                },
                {
                    cityCode: "hubei",
                    cityData: "2858",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [101, 34, 476, 136]
                },
                {
                    cityCode: "hunan",
                    cityData: "4847",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [121, 67, 807, 268]
                },
                {
                    cityCode: "guangdong",
                    cityData: "7494",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [146, 98, 1249, 392]
                },
                {
                    cityCode: "guangxi",
                    cityData: "926",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [160, 10, 154, 40]
                },
                {
                    cityCode: "hainan",
                    cityData: "3739",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [199, 18, 623, 72]
                },
                {
                    cityCode: "chongqing",
                    cityData: "6978",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [190, 85, 1163, 340]
                },
                {
                    cityCode: "sichuan",
                    cityData: "1623",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [132, 32, 270, 128]
                },
                {
                    cityCode: "guizhou",
                    cityData: "864",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [83, 74, 144, 296]
                },
                {
                    cityCode: "yunnan",
                    cityData: "9619",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [171, 94, 1603, 376]
                },
                {
                    cityCode: "xizang",
                    cityData: "9678",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [168, 7, 1613, 28]
                },
                {
                    cityCode: "shanxi",
                    cityData: "3107",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [23, 66, 517, 264]
                },
                {
                    cityCode: "gansu",
                    cityData: "1479",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [67, 45, 246, 180]
                },
                {
                    cityCode: "qinghai",
                    cityData: "9266",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [126, 72, 1544, 288]
                },
                {
                    cityCode: "ningxia",
                    cityData: "7641",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [109, 75, 1273, 300]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "2331",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [102, 26, 388, 104]
                }

            ]
        },
        {
            "year": "2010",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "1454",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [114, 49, 242, 196]
                },
                {
                    cityCode: "tianjin",
                    cityData: "1857",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [151, 2, 309, 8]
                },
                {
                    cityCode: "hebei",
                    cityData: "9874",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [114, 15, 1645, 60]
                },
                {
                    cityCode: "shanxi",
                    cityData: "8706",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [193, 60, 1451, 240]
                },
                {
                    cityCode: "neimeng",
                    cityData: "7024",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [71, 87, 1170, 348]
                },
                {
                    cityCode: "liaoning",
                    cityData: "7569",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [6, 34, 1261, 136]
                },
                {
                    cityCode: "jilin",
                    cityData: "810",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [15, 30, 135, 120]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "371",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [45, 43, 61, 172]
                },
                {
                    cityCode: "shanghai",
                    cityData: "7858",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [174, 58, 1309, 232]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "8917",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [182, 35, 1486, 140]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "9160",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [150, 72, 1526, 288]
                },
                {
                    cityCode: "anhui",
                    cityData: "925",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [8, 77, 154, 308]
                },
                {
                    cityCode: "fujian",
                    cityData: "287",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [111, 97, 47, 388]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "7496",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [26, 67, 1249, 268]
                },
                {
                    cityCode: "shandong",
                    cityData: "5588",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [168, 18, 931, 72]
                },
                {
                    cityCode: "henan",
                    cityData: "4484",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [81, 41, 747, 164]
                },
                {
                    cityCode: "hubei",
                    cityData: "9696",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [23, 92, 1616, 368]
                },
                {
                    cityCode: "hunan",
                    cityData: "8967",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [181, 75, 1494, 300]
                },
                {
                    cityCode: "guangdong",
                    cityData: "4275",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [103, 86, 712, 344]
                },
                {
                    cityCode: "guangxi",
                    cityData: "3112",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [174, 43, 518, 172]
                },
                {
                    cityCode: "hainan",
                    cityData: "4265",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [99, 60, 710, 240]
                },
                {
                    cityCode: "chongqing",
                    cityData: "5085",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [13, 58, 847, 232]
                },
                {
                    cityCode: "sichuan",
                    cityData: "9450",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [188, 12, 1575, 48]
                },
                {
                    cityCode: "guizhou",
                    cityData: "6382",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [128, 90, 1063, 360]
                },
                {
                    cityCode: "yunnan",
                    cityData: "6142",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [86, 75, 1023, 300]
                },
                {
                    cityCode: "xizang",
                    cityData: "4965",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [196, 74, 827, 296]
                },
                {
                    cityCode: "shanxi",
                    cityData: "7901",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [70, 57, 1316, 228]
                },
                {
                    cityCode: "gansu",
                    cityData: "8741",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [122, 20, 1456, 80]
                },
                {
                    cityCode: "qinghai",
                    cityData: "2590",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [78, 29, 431, 116]
                },
                {
                    cityCode: "ningxia",
                    cityData: "2011",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [11, 0, 335, 0]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "3381",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [50, 47, 563, 188]
                }

            ]
        },
        {
            "year": "2011",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "8746",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [38, 93, 1457, 372]
                },
                {
                    cityCode: "tianjin",
                    cityData: "5931",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [135, 96, 988, 384]
                },
                {
                    cityCode: "hebei",
                    cityData: "3853",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [22, 58, 642, 232]
                },
                {
                    cityCode: "shanxi",
                    cityData: "2056",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [148, 67, 342, 268]
                },
                {
                    cityCode: "neimeng",
                    cityData: "1043",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [143, 20, 173, 80]
                },
                {
                    cityCode: "liaoning",
                    cityData: "4868",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [9, 90, 811, 360]
                },
                {
                    cityCode: "jilin",
                    cityData: "902",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [34, 73, 150, 292]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "346",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [111, 36, 57, 144]
                },
                {
                    cityCode: "shanghai",
                    cityData: "2042",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [147, 29, 340, 116]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "1874",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [148, 84, 312, 336]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "262",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [88, 93, 43, 372]
                },
                {
                    cityCode: "anhui",
                    cityData: "831",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [182, 5, 138, 20]
                },
                {
                    cityCode: "fujian",
                    cityData: "2092",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [57, 71, 348, 284]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "4281",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [157, 72, 713, 288]
                },
                {
                    cityCode: "shandong",
                    cityData: "6643",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [154, 13, 1107, 52]
                },
                {
                    cityCode: "henan",
                    cityData: "7389",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [158, 43, 1231, 172]
                },
                {
                    cityCode: "hubei",
                    cityData: "3787",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [102, 24, 631, 96]
                },
                {
                    cityCode: "hunan",
                    cityData: "2911",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [177, 91, 485, 364]
                },
                {
                    cityCode: "guangdong",
                    cityData: "250",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [46, 20, 41, 80]
                },
                {
                    cityCode: "guangxi",
                    cityData: "8189",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [181, 34, 1364, 136]
                },
                {
                    cityCode: "hainan",
                    cityData: "2953",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [165, 7, 492, 28]
                },
                {
                    cityCode: "chongqing",
                    cityData: "1711",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [5, 10, 285, 40]
                },
                {
                    cityCode: "sichuan",
                    cityData: "3305",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [190, 77, 550, 308]
                },
                {
                    cityCode: "guizhou",
                    cityData: "8235",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [30, 56, 1372, 224]
                },
                {
                    cityCode: "yunnan",
                    cityData: "2845",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [144, 21, 474, 84]
                },
                {
                    cityCode: "xizang",
                    cityData: "6600",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [114, 48, 1100, 192]
                },
                {
                    cityCode: "shanxi",
                    cityData: "5764",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [124, 54, 960, 216]
                },
                {
                    cityCode: "gansu",
                    cityData: "8316",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [125, 57, 1386, 228]
                },
                {
                    cityCode: "qinghai",
                    cityData: "1047",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [100, 96, 174, 384]
                },
                {
                    cityCode: "ningxia",
                    cityData: "566",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [163, 3, 94, 12]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "3874",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [67, 65, 645, 260]
                }

            ]
        },
        {
            "year": "2012",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "5596",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [53, 77, 932, 308]
                },
                {
                    cityCode: "tianjin",
                    cityData: "3907",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [165, 73, 651, 292]
                },
                {
                    cityCode: "hebei",
                    cityData: "9203",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [79, 19, 1533, 76]
                },
                {
                    cityCode: "shanxi",
                    cityData: "4185",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [72, 89, 697, 356]
                },
                {
                    cityCode: "neimeng",
                    cityData: "8149",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [146, 23, 1358, 92]
                },
                {
                    cityCode: "liaoning",
                    cityData: "8894",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [92, 73, 1482, 292]
                },
                {
                    cityCode: "jilin",
                    cityData: "7237",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [122, 55, 1206, 220]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "7627",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [172, 49, 1271, 196]
                },
                {
                    cityCode: "shanghai",
                    cityData: "1994",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [160, 19, 332, 76]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "8451",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [123, 74, 1408, 296]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "9542",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [63, 57, 1590, 228]
                },
                {
                    cityCode: "anhui",
                    cityData: "4166",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [140, 97, 694, 388]
                },
                {
                    cityCode: "fujian",
                    cityData: "3868",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [32, 28, 644, 112]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "1509",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [110, 23, 251, 92]
                },
                {
                    cityCode: "shandong",
                    cityData: "8307",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [68, 40, 1384, 160]
                },
                {
                    cityCode: "henan",
                    cityData: "2864",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [182, 57, 477, 228]
                },
                {
                    cityCode: "hubei",
                    cityData: "1001",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [48, 77, 166, 308]
                },
                {
                    cityCode: "hunan",
                    cityData: "806",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [106, 42, 134, 168]
                },
                {
                    cityCode: "guangdong",
                    cityData: "9265",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [156, 5, 1544, 20]
                },
                {
                    cityCode: "guangxi",
                    cityData: "450",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [36, 9, 75, 36]
                },
                {
                    cityCode: "hainan",
                    cityData: "9391",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [168, 65, 1565, 260]
                },
                {
                    cityCode: "chongqing",
                    cityData: "8368",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [27, 71, 1394, 284]
                },
                {
                    cityCode: "sichuan",
                    cityData: "6365",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [32, 81, 1060, 324]
                },
                {
                    cityCode: "guizhou",
                    cityData: "8506",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [76, 42, 1417, 168]
                },
                {
                    cityCode: "yunnan",
                    cityData: "2882",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [84, 61, 480, 244]
                },
                {
                    cityCode: "xizang",
                    cityData: "5171",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [24, 23, 861, 92]
                },
                {
                    cityCode: "shanxi",
                    cityData: "9521",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [43, 84, 1586, 336]
                },
                {
                    cityCode: "gansu",
                    cityData: "1627",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [181, 32, 271, 128]
                },
                {
                    cityCode: "qinghai",
                    cityData: "1419",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [174, 36, 236, 144]
                },
                {
                    cityCode: "ningxia",
                    cityData: "9360",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [125, 79, 1560, 316]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "9482",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [47, 37, 1580, 148]
                }

            ]
        },
        {
            "year": "2013",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "9194",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [192, 49, 1532, 196]
                },
                {
                    cityCode: "tianjin",
                    cityData: "3875",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [138, 71, 645, 284]
                },
                {
                    cityCode: "hebei",
                    cityData: "3143",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [86, 47, 523, 188]
                },
                {
                    cityCode: "shanxi",
                    cityData: "6352",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [31, 63, 1058, 252]
                },
                {
                    cityCode: "neimeng",
                    cityData: "8277",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [61, 79, 1379, 316]
                },
                {
                    cityCode: "liaoning",
                    cityData: "607",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [118, 88, 101, 352]
                },
                {
                    cityCode: "jilin",
                    cityData: "540",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [132, 13, 90, 52]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "5689",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [104, 86, 948, 344]
                },
                {
                    cityCode: "shanghai",
                    cityData: "6340",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [126, 21, 1056, 84]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "7617",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [189, 82, 1269, 328]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "8176",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [110, 78, 1362, 312]
                },
                {
                    cityCode: "anhui",
                    cityData: "7213",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [126, 70, 1202, 280]
                },
                {
                    cityCode: "fujian",
                    cityData: "6567",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [129, 53, 1094, 212]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "9677",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [65, 36, 1612, 144]
                },
                {
                    cityCode: "shandong",
                    cityData: "1552",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [151, 76, 258, 304]
                },
                {
                    cityCode: "henan",
                    cityData: "1075",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [38, 15, 179, 60]
                },
                {
                    cityCode: "hubei",
                    cityData: "2528",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [133, 29, 421, 116]
                },
                {
                    cityCode: "hunan",
                    cityData: "6126",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [150, 79, 1021, 316]
                },
                {
                    cityCode: "guangdong",
                    cityData: "2424",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [81, 2, 404, 8]
                },
                {
                    cityCode: "guangxi",
                    cityData: "2072",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [29, 1, 345, 4]
                },
                {
                    cityCode: "hainan",
                    cityData: "2580",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [86, 20, 430, 80]
                },
                {
                    cityCode: "chongqing",
                    cityData: "742",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [157, 65, 123, 260]
                },
                {
                    cityCode: "sichuan",
                    cityData: "3068",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [134, 19, 511, 76]
                },
                {
                    cityCode: "guizhou",
                    cityData: "8795",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [54, 60, 1465, 240]
                },
                {
                    cityCode: "yunnan",
                    cityData: "6786",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [162, 96, 1131, 384]
                },
                {
                    cityCode: "xizang",
                    cityData: "8671",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [72, 11, 1445, 44]
                },
                {
                    cityCode: "shanxi",
                    cityData: "5182",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [171, 35, 863, 140]
                },
                {
                    cityCode: "gansu",
                    cityData: "3040",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [21, 38, 506, 152]
                },
                {
                    cityCode: "qinghai",
                    cityData: "3795",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [50, 76, 632, 304]
                },
                {
                    cityCode: "ningxia",
                    cityData: "8333",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [58, 52, 1388, 208]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "3128",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [79, 48, 521, 192]
                }

            ]
        },
        {
            "year": "2014",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "2722",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [121, 92, 453, 368]
                },
                {
                    cityCode: "tianjin",
                    cityData: "1958",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [65, 73, 326, 292]
                },
                {
                    cityCode: "hebei",
                    cityData: "9219",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [163, 47, 1536, 188]
                },
                {
                    cityCode: "shanxi",
                    cityData: "1700",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [5, 87, 283, 348]
                },
                {
                    cityCode: "neimeng",
                    cityData: "6940",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [106, 65, 1156, 260]
                },
                {
                    cityCode: "liaoning",
                    cityData: "4126",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [149, 44, 687, 176]
                },
                {
                    cityCode: "jilin",
                    cityData: "2560",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [41, 97, 426, 388]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "1390",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [101, 60, 231, 240]
                },
                {
                    cityCode: "shanghai",
                    cityData: "3110",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [192, 62, 518, 248]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "4588",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [105, 50, 764, 200]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "7515",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [74, 78, 1252, 312]
                },
                {
                    cityCode: "anhui",
                    cityData: "4040",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [41, 35, 673, 140]
                },
                {
                    cityCode: "fujian",
                    cityData: "2449",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [6, 69, 408, 276]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "1829",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [149, 80, 304, 320]
                },
                {
                    cityCode: "shandong",
                    cityData: "3942",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [106, 52, 657, 208]
                },
                {
                    cityCode: "henan",
                    cityData: "2768",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [117, 97, 461, 388]
                },
                {
                    cityCode: "hubei",
                    cityData: "6595",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [108, 2, 1099, 8]
                },
                {
                    cityCode: "hunan",
                    cityData: "9166",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [62, 14, 1527, 56]
                },
                {
                    cityCode: "guangdong",
                    cityData: "9117",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [119, 47, 1519, 188]
                },
                {
                    cityCode: "guangxi",
                    cityData: "7496",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [35, 20, 1249, 80]
                },
                {
                    cityCode: "hainan",
                    cityData: "7844",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [13, 13, 1307, 52]
                },
                {
                    cityCode: "chongqing",
                    cityData: "7612",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [16, 49, 1268, 196]
                },
                {
                    cityCode: "sichuan",
                    cityData: "7364",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [121, 96, 1227, 384]
                },
                {
                    cityCode: "guizhou",
                    cityData: "3728",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [199, 42, 621, 168]
                },
                {
                    cityCode: "yunnan",
                    cityData: "1917",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [68, 7, 319, 28]
                },
                {
                    cityCode: "xizang",
                    cityData: "6260",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [18, 7, 1043, 28]
                },
                {
                    cityCode: "shanxi",
                    cityData: "2574",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [106, 55, 429, 220]
                },
                {
                    cityCode: "gansu",
                    cityData: "2705",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [140, 30, 450, 120]
                },
                {
                    cityCode: "qinghai",
                    cityData: "4132",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [168, 77, 688, 308]
                },
                {
                    cityCode: "ningxia",
                    cityData: "9355",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [198, 98, 1559, 392]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "1392",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [4, 25, 232, 100]
                }

            ]
        },
        {
            "year": "2015",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "8972",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [176, 96, 1495, 384]
                },
                {
                    cityCode: "tianjin",
                    cityData: "9726",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [138, 2, 1621, 8]
                },
                {
                    cityCode: "hebei",
                    cityData: "8201",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [172, 69, 1366, 276]
                },
                {
                    cityCode: "shanxi",
                    cityData: "2572",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [168, 52, 428, 208]
                },
                {
                    cityCode: "neimeng",
                    cityData: "8185",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [57, 67, 1364, 268]
                },
                {
                    cityCode: "liaoning",
                    cityData: "3042",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [82, 74, 507, 296]
                },
                {
                    cityCode: "jilin",
                    cityData: "9278",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [109, 6, 1546, 24]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "9747",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [190, 39, 1624, 156]
                },
                {
                    cityCode: "shanghai",
                    cityData: "7007",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [82, 1, 1167, 4]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "3626",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [83, 85, 604, 340]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "3578",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [105, 49, 596, 196]
                },
                {
                    cityCode: "anhui",
                    cityData: "5839",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [133, 43, 973, 172]
                },
                {
                    cityCode: "fujian",
                    cityData: "1546",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [130, 49, 257, 196]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "8955",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [109, 91, 1492, 364]
                },
                {
                    cityCode: "shandong",
                    cityData: "1904",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [138, 75, 317, 300]
                },
                {
                    cityCode: "henan",
                    cityData: "3695",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [14, 31, 615, 124]
                },
                {
                    cityCode: "hubei",
                    cityData: "3428",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [186, 90, 571, 360]
                },
                {
                    cityCode: "hunan",
                    cityData: "6577",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [19, 53, 1096, 212]
                },
                {
                    cityCode: "guangdong",
                    cityData: "9861",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [157, 44, 1643, 176]
                },
                {
                    cityCode: "guangxi",
                    cityData: "4872",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [119, 55, 812, 220]
                },
                {
                    cityCode: "hainan",
                    cityData: "8688",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [14, 43, 1448, 172]
                },
                {
                    cityCode: "chongqing",
                    cityData: "7139",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [21, 19, 1189, 76]
                },
                {
                    cityCode: "sichuan",
                    cityData: "5491",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [107, 36, 915, 144]
                },
                {
                    cityCode: "guizhou",
                    cityData: "9030",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [106, 14, 1505, 56]
                },
                {
                    cityCode: "yunnan",
                    cityData: "4640",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [2, 91, 773, 364]
                },
                {
                    cityCode: "xizang",
                    cityData: "5378",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [10, 89, 896, 356]
                },
                {
                    cityCode: "shanxi",
                    cityData: "1299",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [76, 98, 216, 392]
                },
                {
                    cityCode: "gansu",
                    cityData: "7229",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [75, 95, 1204, 380]
                },
                {
                    cityCode: "qinghai",
                    cityData: "6758",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [89, 85, 1126, 340]
                },
                {
                    cityCode: "ningxia",
                    cityData: "745",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [195, 50, 124, 200]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "7363",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [27, 84, 1227, 336]
                }

            ]
        },
        {
            "year": "2016",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "5767",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [196, 83, 961, 332]
                },
                {
                    cityCode: "tianjin",
                    cityData: "6721",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [115, 95, 1120, 380]
                },
                {
                    cityCode: "hebei",
                    cityData: "6020",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [180, 48, 1003, 192]
                },
                {
                    cityCode: "shanxi",
                    cityData: "6360",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [100, 29, 1060, 116]
                },
                {
                    cityCode: "neimeng",
                    cityData: "6605",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [173, 77, 1100, 308]
                },
                {
                    cityCode: "liaoning",
                    cityData: "6946",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [188, 66, 1157, 264]
                },
                {
                    cityCode: "jilin",
                    cityData: "5556",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [88, 87, 926, 348]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "729",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [72, 12, 121, 48]
                },
                {
                    cityCode: "shanghai",
                    cityData: "2149",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [89, 92, 358, 368]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "2202",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [12, 26, 367, 104]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "8680",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [58, 33, 1446, 132]
                },
                {
                    cityCode: "anhui",
                    cityData: "4346",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [169, 25, 724, 100]
                },
                {
                    cityCode: "fujian",
                    cityData: "8491",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [107, 62, 1415, 248]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "7449",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [176, 10, 1241, 40]
                },
                {
                    cityCode: "shandong",
                    cityData: "5034",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [186, 31, 839, 124]
                },
                {
                    cityCode: "henan",
                    cityData: "6623",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [192, 42, 1103, 168]
                },
                {
                    cityCode: "hubei",
                    cityData: "7135",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [103, 22, 1189, 88]
                },
                {
                    cityCode: "hunan",
                    cityData: "4565",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [9, 47, 760, 188]
                },
                {
                    cityCode: "guangdong",
                    cityData: "636",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [149, 19, 106, 76]
                },
                {
                    cityCode: "guangxi",
                    cityData: "3212",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [43, 45, 535, 180]
                },
                {
                    cityCode: "hainan",
                    cityData: "9540",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [192, 31, 1590, 124]
                },
                {
                    cityCode: "chongqing",
                    cityData: "3372",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [146, 78, 562, 312]
                },
                {
                    cityCode: "sichuan",
                    cityData: "3407",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [85, 25, 567, 100]
                },
                {
                    cityCode: "guizhou",
                    cityData: "4662",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [169, 66, 777, 264]
                },
                {
                    cityCode: "yunnan",
                    cityData: "1413",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [158, 45, 235, 180]
                },
                {
                    cityCode: "xizang",
                    cityData: "3589",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [184, 62, 598, 248]
                },
                {
                    cityCode: "shanxi",
                    cityData: "8459",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [72, 23, 1409, 92]
                },
                {
                    cityCode: "gansu",
                    cityData: "4372",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [53, 96, 728, 384]
                },
                {
                    cityCode: "qinghai",
                    cityData: "992",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [168, 71, 165, 284]
                },
                {
                    cityCode: "ningxia",
                    cityData: "9533",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [84, 46, 1588, 184]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "3483",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [33, 11, 580, 44]
                }

            ]
        },
        {
            "year": "2017",
            "citys": [{
                    cityCode: "beijing",
                    cityData: "3392",
                    coordinate: [116.402538, 39.90167],
                    cityName: "北京",
                    point: [
                        [116.9637, 40.652875],
                        [115.909013, 39.780413],
                        [116.9637, 40.385622]
                    ],
                    detail: [98, 51, 565, 204]
                },
                {
                    cityCode: "tianjin",
                    cityData: "6364",
                    coordinate: [117.210464, 39.13638],
                    cityName: "天津",
                    point: [
                        [117.447099, 39.407918],
                        [117.183427, 39.543603],
                        [117.534989, 38.999279]
                    ],
                    detail: [75, 38, 1060, 152]
                },
                {
                    cityCode: "hebei",
                    cityData: "9388",
                    coordinate: [114.790843, 38.046797],
                    cityName: "河北",
                    point: [
                        [114.414872, 36.608194],
                        [115.46956, 37.554754],
                        [117.271317, 41.649671]
                    ],
                    detail: [85, 62, 1564, 248]
                },
                {
                    cityCode: "shanxi",
                    cityData: "7486",
                    coordinate: [112.176097, 37.769416],
                    cityName: "山西",
                    point: [
                        [111.822099, 37.100478],
                        [111.822099, 37.100478],
                        [111.822099, 37.100478]
                    ],
                    detail: [159, 69, 1247, 276]
                },
                {
                    cityCode: "neimeng",
                    cityData: "797",
                    coordinate: [111.692699, 42.3086],
                    cityName: "内蒙",
                    point: [
                        [122.105302, 49.01747],
                        [116.30452, 43.812082],
                        [105.362138, 40.923212]
                    ],
                    detail: [42, 67, 132, 268]
                },
                {
                    cityCode: "liaoning",
                    cityData: "1090",
                    coordinate: [122.722972, 41.260056],
                    cityName: "辽宁",
                    point: [
                        [122.061356, 41.813646],
                        [123.863114, 40.85677],
                        [122.325028, 39.818396]
                    ],
                    detail: [79, 94, 181, 376]
                },
                {
                    cityCode: "jilin",
                    cityData: "1582",
                    coordinate: [125.93098, 43.722287],
                    cityName: "吉林",
                    point: [
                        [122.940263, 45.407463],
                        [126.367997, 44.22291],
                        [126.543778, 42.14034]
                    ],
                    detail: [132, 56, 263, 224]
                },
                {
                    cityCode: "heilongjiang",
                    cityData: "5030",
                    coordinate: [127.513011, 47.738218],
                    cityName: "黑龙江",
                    point: [
                        [123.24788, 52.810521],
                        [126.71956, 48.583282],
                        [133.223466, 46.748657]
                    ],
                    detail: [31, 19, 838, 76]
                },
                {
                    cityCode: "shanghai",
                    cityData: "124",
                    coordinate: [121.358231, 31.228476],
                    cityName: "上海",
                    point: [
                        [121.72078, 31.026279],
                        [121.39119, 30.960355],
                        [121.226395, 31.392737]
                    ],
                    detail: [84, 84, 20, 336]
                },
                {
                    cityCode: "jiangsu",
                    cityData: "3961",
                    coordinate: [119.369706, 33.5292],
                    cityName: "江苏",
                    point: [
                        [120.303544, 32.529849],
                        [120.347489, 33.341253],
                        [118.545731, 33.963121]
                    ],
                    detail: [74, 38, 660, 152]
                },
                {
                    cityCode: "zhejiang",
                    cityData: "9336",
                    coordinate: [119.940995, 29.100993],
                    cityName: "浙江",
                    point: [
                        [120.259599, 28.36403],
                        [120.611161, 28.827046],
                        [119.292802, 29.057787]
                    ],
                    detail: [193, 5, 1556, 20]
                },
                {
                    cityCode: "anhui",
                    cityData: "594",
                    coordinate: [116.952714, 32.645558],
                    cityName: "安徽",
                    point: [
                        [116.9637, 33.524621],
                        [116.21663, 31.636251],
                        [117.886552, 31.71105]
                    ],
                    detail: [29, 78, 99, 312]
                },
                {
                    cityCode: "fujian",
                    cityData: "1731",
                    coordinate: [117.875565, 26.457477],
                    cityName: "福建",
                    point: [
                        [118.457841, 27.080339],
                        [116.787919, 25.742196],
                        [118.545731, 25.266242]
                    ],
                    detail: [163, 93, 288, 372]
                },
                {
                    cityCode: "jiangxi",
                    cityData: "6337",
                    coordinate: [115.502519, 27.709485],
                    cityName: "江西",
                    point: [
                        [115.161942, 27.937815],
                        [115.293778, 25.544111],
                        [117.491044, 28.557201]
                    ],
                    detail: [121, 67, 1056, 268]
                },
                {
                    cityCode: "shandong",
                    cityData: "8413",
                    coordinate: [117.743729, 36.303336],
                    cityName: "山东",
                    point: [
                        [118.545731, 35.908348],
                        [118.194169, 36.475794],
                        [117.798661, 37.667894]
                    ],
                    detail: [65, 3, 1402, 12]
                },
                {
                    cityCode: "henan",
                    cityData: "72",
                    coordinate: [113.656815, 33.821767],
                    cityName: "河南",
                    point: [
                        [111.602372, 33.671037],
                        [114.502763, 34.035986],
                        [114.722489, 32.195774]
                    ],
                    detail: [148, 30, 12, 120]
                },
                {
                    cityCode: "hubei",
                    cityData: "1769",
                    coordinate: [111.986894, 31.115675],
                    cityName: "湖北",
                    point: [
                        [112.65706, 31.448989],
                        [110.67952, 30.507078],
                        [111.294755, 31.673658]
                    ],
                    detail: [110, 9, 294, 36]
                },
                {
                    cityCode: "hunan",
                    cityData: "2151",
                    coordinate: [111.767167, 27.514784],
                    cityName: "湖南",
                    point: [
                        [110.67952, 28.557201],
                        [110.67952, 28.36403],
                        [113.360185, 28.788539]
                    ],
                    detail: [81, 7, 358, 28]
                },
                {
                    cityCode: "guangdong",
                    cityData: "7168",
                    coordinate: [113.327226, 23.651251],
                    cityName: "广东",
                    point: [
                        [115.689286, 23.987943],
                        [114.414872, 23.384296],
                        [112.041825, 23.464943]
                    ],
                    detail: [97, 35, 1194, 140]
                },
                {
                    cityCode: "guangxi",
                    cityData: "6939",
                    coordinate: [109.196366, 23.61099],
                    cityName: "广西",
                    point: [
                        [108.482255, 24.468835],
                        [104.175614, 23.907618],
                        [99.956864, 22.575147]
                    ],
                    detail: [18, 56, 1156, 224]
                },
                {
                    cityCode: "hainan",
                    cityData: "4961",
                    coordinate: [109.811601, 19.193613],
                    cityName: "海南",
                    point: [
                        [109.668778, 19.209176],
                        [109.712724, 18.710444],
                        [109.756669, 19.209176]
                    ],
                    detail: [57, 63, 826, 252]
                },
                {
                    cityCode: "chongqing",
                    cityData: "4434",
                    coordinate: [107.174882, 29.579843],
                    cityName: "重庆",
                    point: [
                        [107.603349, 29.861306],
                        [108.218583, 29.402931],
                        [108.789872, 31.14859]
                    ],
                    detail: [68, 66, 739, 264]
                },
                {
                    cityCode: "sichuan",
                    cityData: "9978",
                    coordinate: [102.824296, 30.719817],
                    cityName: "四川",
                    point: [
                        [102.24202, 31.223779],
                        [101.670731, 27.976632],
                        [106.944169, 31.523938]
                    ],
                    detail: [120, 81, 1663, 324]
                },
                {
                    cityCode: "guizhou",
                    cityData: "4196",
                    coordinate: [106.955155, 27.143903],
                    cityName: "贵州",
                    point: [
                        [107.954911, 27.626779],
                        [105.977372, 25.742196],
                        [105.274247, 26.962895]
                    ],
                    detail: [81, 3, 699, 12]
                },
                {
                    cityCode: "yunnan",
                    cityData: "7998",
                    coordinate: [101.461991, 24.453834],
                    cityName: "云南",
                    point: [
                        [100.879716, 23.424626],
                        [99.209794, 24.468835],
                        [103.911942, 25.067373]
                    ],
                    detail: [43, 96, 1333, 384]
                },
                {
                    cityCode: "xizang",
                    cityData: "1483",
                    coordinate: [89.201249, 31.284827],
                    cityName: "西藏",
                    point: [
                        [96.61702, 29.937498],
                        [85.059403, 32.936481],
                        [89.278153, 31.261351]
                    ],
                    detail: [51, 39, 247, 156]
                },
                {
                    cityCode: "shanxi",
                    cityData: "3908",
                    coordinate: [109.240311, 35.430851],
                    cityName: "陕西",
                    point: [
                        [107.603349, 33.45132],
                        [109.800614, 36.405089],
                        [110.327958, 33.561248]
                    ],
                    detail: [12, 34, 651, 136]
                },
                {
                    cityCode: "gansu",
                    cityData: "3888",
                    coordinate: [99.87996, 38.965119],
                    cityName: "甘肃",
                    point: [
                        [104.834794, 34.544286],
                        [102.549638, 38.153292],
                        [95.606278, 40.364698]
                    ],
                    detail: [77, 70, 648, 280]
                },
                {
                    cityCode: "qinghai",
                    cityData: "1478",
                    coordinate: [96.144608, 35.823767],
                    cityName: "青海",
                    point: [
                        [92.705888, 37.667894],
                        [94.551591, 36.157112],
                        [95.738114, 32.936481]
                    ],
                    detail: [77, 32, 246, 128]
                },
                {
                    cityCode: "ningxia",
                    cityData: "9773",
                    coordinate: [106.098222, 37.20118],
                    cityName: "宁夏",
                    point: [
                        [106.724442, 37.772177],
                        [105.757645, 36.968928],
                        [106.153153, 35.908348]
                    ],
                    detail: [96, 22, 1628, 88]
                },
                {
                    cityCode: "xinjiang",
                    cityData: "3318",
                    coordinate: [84.938554, 41.101446],
                    cityName: "新疆",
                    point: [
                        [90.860185, 42.115896],
                        [82.862138, 40.096297],
                        [87.520341, 45.845397]
                    ],
                    detail: [176, 95, 553, 380]
                }
            ]
        }
    ],
    "titleData": ["滑坡", "崩塌", "泥石流", "其他"]
}

commonClass.init(dataMap);
var changeCityBarShape = function () {
    commonClass.changeCityBarShap();
};
// })
//用于使chart自适应高度和宽度
// window.onresize = function () {
//     //重置容器高宽
//     resizeWorldMapContainerOfcityBar();
//     resizeWorldMapContainerOfMain();
//     resizeWorldMapContainerOfTime();

// };