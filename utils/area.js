var AreaJson = [
  {
    "name": "陕西省",
    "city": [
      {
        "name": "西安市",
        "area": [
          {
            "name": "莲湖区",
            "village": [
              "暂不选择",
              "青年路街道",
              "北院门街道",
              "北关街道",
              "红庙坡街道",
              "环城西路街道",
              "西关街道",
              "土门街道",
              "桃园路街道",
              "枣园街道"
            ]
          },
          {
            "name": "新城区",
            "village": [
              "暂不选择",
              "长乐西路街道",
              "长乐中路街道",
              "韩森寨街道",
              "胡家庙街道",
              "解放门街道",
              "太华路街道",
              "西一路街道",
              "中山门街道",
              "自强路街道"
            ]
          },
          {
            "name": "碑林区",
            "village": [
              "暂不选择",
              "柏树林街道",
              "长安路街道",
              "长乐坊街道",
              "东关南街街道",
              "南院门街道",
              "太乙路街道",
              "文艺路街道",
              "张家村街道"
            ]
          },
          {
            "name": "灞桥区",
            "village": [
              "暂不选择",
              "灞桥街道",
              "狄寨街道",
              "纺织城街道",
              "红旗街道",
              "洪庆街道",
              "十里铺街道",
              "席王街道",
              "新合街道",
              "新筑街道"
            ]
          },
          {
            "name": "未央区",
            "village": [
              "暂不选择",
              "草滩街道",
              "大明宫街道",
              "汉城街道",
              "建章路街道",
              "六村堡街道",
              "三桥街道",
              "谭家街道",
              "未央宫街道",
              "未央湖街道",
              "辛家庙街道",
              "徐家湾街道",
              "张家堡街道"
            ]
          },
          {
            "name": "长安区",
            "village": [
              "暂不选择",
              "大兆街道",
              "东大街道",
              "斗门街道",
              "杜曲街道",
              "高桥街道",
              "郭杜街道",
              "黄良街道",
              "灵沼街道",
              "滦镇街道",
              "马王街道",
              "鸣犊街道",
              "炮里街道",
              "太乙宫街道",
              "王莽街道",
              "王曲街道",
              "王寺街道",
              "韦曲街道",
              "魏寨街道",
              "五台街道",
              "五星街道",
              "细柳街道",
              "兴隆街道",
              "杨庄街道",
              "引镇街道",
              "子午街道"
            ]
          },
          {
            "name": "雁塔区",
            "village": [
              "暂不选择",
              "长延堡街道",
              "大雁塔街道",
              "等驾坡街道",
              "电子城街道",
              "曲江街道",
              "小寨路街道",
              "鱼化寨街道",
              "丈八沟街道"

            ]
          },
          {
            "name": "高陵区",
            "village": [
              "暂不选择",
              "县城内",
              "耿镇",
              "通远镇",
              "湾子镇",
              "榆楚镇",
              "张卜镇",
              "泾渭街道",
              "崇皇街道",
              "鹿苑街道"
            ]
          },
          {
            "name": "鄠邑区",
            "village": [
              "暂不选择",
              "县城内",
              "甘亭街道",
              "苍游镇",
              "草堂镇",
              "大王镇",
              "甘河镇",
              "蒋村镇",
              "涝店镇",
              "庞光镇",
              "秦渡镇",
              "石井镇",
              "天桥镇",
              "渭丰镇",
              "五竹镇",
              "余下镇",
              "玉蝉镇",
              "祖庵镇"
            ]
          },
        ]
      },
      {
        "name": "咸阳市",
        "area": [
          {
            "name": "秦都区",
            "village": [
              "暂不选择",
              "城区",
              "陈杨寨街道",
              "钓台街道",
              "沣东街道",
              "古渡街道",
              "马泉街道",
              "马庄街道",
              "人民路街道",
              "双照街道",
              "渭滨街道",
              "渭阳西路街道",
              "吴家堡街道",
              "西兰路街道"
            ]
          },
          {
            "name": "渭城区",
            "village": [
              "暂不选择",
              "北社街道",
              "城区",
              "底张街道",
              "渭阳街道",
              "文汇路街道",
              "新兴街道",
              "窑店街道",
              "正阳街道",
              "中山街道",
              "周陵街道"
            ]
          }
        ]
      },
      {
        "name": "渭南市",
        "area": [
          {
            "name": "韩城市",
            "village": [
              "暂不选择",
              "城区"
            ]
          }

        ]
      },
      
    ]
  }
];



/**
 * 获取所有省份
 */
function getProvinces() {
  var provinces = [];
  for (var i = 0; i < AreaJson.length; i++) {
    provinces.push(AreaJson[i].name);
  }
  return provinces;
}


/**
 * 获取省对应的所有城市
 */
function getCitys(provinceIndex) {
  var citys = [];
  for (var i = 0; i < AreaJson[provinceIndex].city.length; i++) {
    citys.push(AreaJson[provinceIndex].city[i].name);
  }
  return citys;
}

/**
 * 获取省市对应的所有地区
 */
function getAreas(provinceIndex, cityIndex) {
  var areas = [];
  for (var i = 0; i < AreaJson[provinceIndex].city[cityIndex].area.length; i++) {
    areas.push(AreaJson[provinceIndex].city[cityIndex].area[i].name);
  }
  return areas;
}

// 获取镇
function getVillage(provinceIndex, cityIndex, areaIndex) {
  // debugger
  var villages = [];
  villages = AreaJson[provinceIndex].city[cityIndex].area[areaIndex].village;
  return villages;
}


module.exports = {
  getProvinces: getProvinces,
  getCitys: getCitys,
  getAreas: getAreas,
  getVillage: getVillage
}



