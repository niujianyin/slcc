var echarts = window.echarts;

var log = function (msg) {
  if (typeof console !== 'undefined') {
    console && console.error && console.error(msg);
  }
};
if (!echarts) {
  log('ECharts is not Loaded');
} else {
  echarts.registerTheme('xp', {
    "color": [
      "#f23b1e",
      "#49a6f1",
      "#FFE598"
    ],
    "backgroundColor": "rgba(0,0,0,0)",
    "textStyle": {},
    "title": {
      "textStyle": {
        "color": "#333333"
      },
      "subtextStyle": {
        "color": "#5d6061"
      }
    },
    "line": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": 2
        }
      },
      "symbolSize": 5,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "radar": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": 2
        }
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "bar": {
      "itemStyle": {
        "normal": {
          "barBorderWidth": 0,
          "barBorderColor": "#ccc"
        },
        "emphasis": {
          "barBorderWidth": 0,
          "barBorderColor": "#ccc"
        }
      }
    },
    "pie": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "scatter": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "boxplot": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "parallel": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "sankey": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "funnel": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "gauge": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "candlestick": {
      "itemStyle": {
        "normal": {
          "color": "#c23531",
          "color0": "#314656",
          "borderColor": "#c23531",
          "borderColor0": "#314656",
          "borderWidth": 1
        }
      }
    },
    "graph": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      },
      "lineStyle": {
        "normal": {
          "width": 1,
          "color": "#aaa"
        }
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false,
      "color": [
        "#f23b1e",
        "#49a6f1"
      ],
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eee"
          }
        }
      }
    },
    "map": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "geo": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "categoryAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "valueAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ebf0f1"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "logAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "timeAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "toolbox": {
      "iconStyle": {
        "normal": {
          "borderColor": "#999"
        },
        "emphasis": {
          "borderColor": "#666"
        }
      }
    },
    "legend": {
      "textStyle": {
        "color": "#333"
      }
    },
    "tooltip": {
      "axisPointer": {
        "lineStyle": {
          "color": "#ccc",
          "width": 1
        },
        "crossStyle": {
          "color": "#ccc",
          "width": 1
        }
      }
    },
    "timeline": {
      "lineStyle": {
        "color": "#293c55",
        "width": 1
      },
      "itemStyle": {
        "normal": {
          "color": "#293c55",
          "borderWidth": 1
        },
        "emphasis": {
          "color": "#a9334c"
        }
      },
      "controlStyle": {
        "normal": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        },
        "emphasis": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        }
      },
      "checkpointStyle": {
        "color": "#e43c59",
        "borderColor": "rgba(194,53,49, 0.5)"
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#293c55"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#293c55"
          }
        }
      }
    },
    "visualMap": {
      "color": [
        "#bf444c",
        "#d88273",
        "#f6efa6"
      ]
    },
    "dataZoom": {
      "backgroundColor": "rgba(47,69,84,0)",
      "dataBackgroundColor": "rgba(47,69,84,0.3)",
      "fillerColor": "rgba(167,183,204,0.4)",
      "handleColor": "#a7b7cc",
      "handleSize": "100%",
      "textStyle": {
        "color": "#333"
      }
    },
    "markPoint": {
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eee"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#eee"
          }
        }
      }
    }
  });

  echarts.registerTheme('xp1', {
    "color": [
      "#f23b1e",
      "#fccc45",
      "#49a6f1"
    ],
    "backgroundColor": "rgba(0,0,0,0)",
    "textStyle": {},
    "title": {
      "textStyle": {
        "color": "#333333"
      },
      "subtextStyle": {
        "color": "#5d6061"
      }
    },
    "line": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": 2
        }
      },
      "symbolSize": 5,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "radar": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": 2
        }
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "bar": {
      "itemStyle": {
        "normal": {
          "barBorderWidth": 0,
          "barBorderColor": "#ccc"
        },
        "emphasis": {
          "barBorderWidth": 0,
          "barBorderColor": "#ccc"
        }
      }
    },
    "pie": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "scatter": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "boxplot": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "parallel": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "sankey": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "funnel": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "gauge": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "candlestick": {
      "itemStyle": {
        "normal": {
          "color": "#c23531",
          "color0": "#314656",
          "borderColor": "#c23531",
          "borderColor0": "#314656",
          "borderWidth": 1
        }
      }
    },
    "graph": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      },
      "lineStyle": {
        "normal": {
          "width": 1,
          "color": "#aaa"
        }
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false,
      "color": [
        "#f23b1e",
        "#49a6f1"
      ],
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eee"
          }
        }
      }
    },
    "map": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "geo": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "categoryAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "valueAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ebf0f1"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "logAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "timeAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "toolbox": {
      "iconStyle": {
        "normal": {
          "borderColor": "#999"
        },
        "emphasis": {
          "borderColor": "#666"
        }
      }
    },
    "legend": {
      "textStyle": {
        "color": "#333"
      }
    },
    "tooltip": {
      "axisPointer": {
        "lineStyle": {
          "color": "#ccc",
          "width": 1
        },
        "crossStyle": {
          "color": "#ccc",
          "width": 1
        }
      }
    },
    "timeline": {
      "lineStyle": {
        "color": "#293c55",
        "width": 1
      },
      "itemStyle": {
        "normal": {
          "color": "#293c55",
          "borderWidth": 1
        },
        "emphasis": {
          "color": "#a9334c"
        }
      },
      "controlStyle": {
        "normal": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        },
        "emphasis": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        }
      },
      "checkpointStyle": {
        "color": "#e43c59",
        "borderColor": "rgba(194,53,49, 0.5)"
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#293c55"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#293c55"
          }
        }
      }
    },
    "visualMap": {
      "color": [
        "#bf444c",
        "#d88273",
        "#f6efa6"
      ]
    },
    "dataZoom": {
      "backgroundColor": "rgba(47,69,84,0)",
      "dataBackgroundColor": "rgba(47,69,84,0.3)",
      "fillerColor": "rgba(167,183,204,0.4)",
      "handleColor": "#a7b7cc",
      "handleSize": "100%",
      "textStyle": {
        "color": "#333"
      }
    },
    "markPoint": {
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eee"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#eee"
          }
        }
      }
    }
  });

  echarts.registerTheme('xp2', {
    "color": [
      "#F23B1E",
      "#37EDB5",
      "#49A6F1"
    ],
    "backgroundColor": "rgba(0,0,0,0)",
    "textStyle": {},
    "title": {
      "textStyle": {
        "color": "#333333"
      },
      "subtextStyle": {
        "color": "#5d6061"
      }
    },
    "line": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": 2
        }
      },
      "symbolSize": 5,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "radar": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": 2
        }
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "bar": {
      "itemStyle": {
        "normal": {
          "barBorderWidth": 0,
          "barBorderColor": "#ccc"
        },
        "emphasis": {
          "barBorderWidth": 0,
          "barBorderColor": "#ccc"
        }
      }
    },
    "pie": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "scatter": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "boxplot": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "parallel": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "sankey": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "funnel": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "gauge": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "candlestick": {
      "itemStyle": {
        "normal": {
          "color": "#c23531",
          "color0": "#314656",
          "borderColor": "#c23531",
          "borderColor0": "#314656",
          "borderWidth": 1
        }
      }
    },
    "graph": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      },
      "lineStyle": {
        "normal": {
          "width": 1,
          "color": "#aaa"
        }
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false,
      "color": [
        "#f23b1e",
        "#49a6f1"
      ],
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eee"
          }
        }
      }
    },
    "map": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "geo": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "categoryAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "valueAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#ebf0f1"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ebf0f1"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "logAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "timeAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "toolbox": {
      "iconStyle": {
        "normal": {
          "borderColor": "#999"
        },
        "emphasis": {
          "borderColor": "#666"
        }
      }
    },
    "legend": {
      "textStyle": {
        "color": "#333"
      }
    },
    "tooltip": {
      "axisPointer": {
        "lineStyle": {
          "color": "#ccc",
          "width": 1
        },
        "crossStyle": {
          "color": "#ccc",
          "width": 1
        }
      }
    },
    "timeline": {
      "lineStyle": {
        "color": "#293c55",
        "width": 1
      },
      "itemStyle": {
        "normal": {
          "color": "#293c55",
          "borderWidth": 1
        },
        "emphasis": {
          "color": "#a9334c"
        }
      },
      "controlStyle": {
        "normal": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        },
        "emphasis": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        }
      },
      "checkpointStyle": {
        "color": "#e43c59",
        "borderColor": "rgba(194,53,49, 0.5)"
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#293c55"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#293c55"
          }
        }
      }
    },
    "visualMap": {
      "color": [
        "#bf444c",
        "#d88273",
        "#f6efa6"
      ]
    },
    "dataZoom": {
      "backgroundColor": "rgba(47,69,84,0)",
      "dataBackgroundColor": "rgba(47,69,84,0.3)",
      "fillerColor": "rgba(167,183,204,0.4)",
      "handleColor": "#a7b7cc",
      "handleSize": "100%",
      "textStyle": {
        "color": "#333"
      }
    },
    "markPoint": {
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eee"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#eee"
          }
        }
      }
    }
  });
}

