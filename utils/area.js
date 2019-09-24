var AreaJson = [
  {
    "name": "陕西省",
    "city": [
      {
        "name": "西安市",
        "area": [
          "莲湖区",
          "新城区",
          "碑林区",
          "雁塔区",
          "灞桥区",
          "未央区",
          "阎良区",
          "临潼区",
          "长安区",
          "高陵县",
          "蓝田县",
          "户县",
          "周至县",
          "杨凌农业示范区",
          "其他"
        ]
      },
    ]
  }
];



/**
 * 获取所有省份
 */
function getProvinces(){
  var provinces = [];
  for (var i = 0; i < AreaJson.length;i++){
    provinces.push(AreaJson[i].name);
  }
  return provinces;
}


/**
 * 获取省对应的所有城市
 */
function getCitys(provinceIndex){
  var citys = [];
  for (var i = 0; i < AreaJson[provinceIndex].city.length;i++){
    citys.push(AreaJson[provinceIndex].city[i].name);
  }
  return citys;
}

/**
 * 获取省市对应的所有地区
 */
function getAreas(provinceIndex,cityIndex){
  var areas = [];
  areas = AreaJson[provinceIndex].city[cityIndex].area;
  return areas;
}

module.exports = {
  getProvinces: getProvinces,
  getCitys: getCitys,
  getAreas: getAreas
}



