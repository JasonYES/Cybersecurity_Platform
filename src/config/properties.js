var vname = {
    集合: "集合视图",
    各洲: "各洲独立视图",
    视图: "视图",
    评分: "评",
    name: "名称",
    nickname: "中文名",
    type: "类型",
    est: "成立时间",
    language: "语言",
    capital: "首都",
    population: "人口",
    area: "面积",
    economy: "GDP",
    other: "其他",
    continent: "大洲",
    weight: "权重",
    parent: "父指标",
    name1: "一级指标(英)",
    nickname1: "一级指标(中)",
    name2: "二级指标(英)",
    nickname2: "二级指标(中)",
    country: "国家",
    role: "权限",
    index1: "一级指标",
    index2: "二级指标",
    pid: "父指标",
    password: "密码",
    password2: "确认密码",
    countries: "包含国家",
    adminValidate: "管理员密码",
    is_active: "当前批次?",
    isactive: "当前批次?",
    date: "创建日期",
}

var continents = [
    "亚洲",
    "欧洲",
    "北美洲",
    "南美洲",
    "非洲",
    "大洋洲",
]

var num2role = {
    0: "普通用户",
    1: "评分员",
    2: "管理员"
}

var roleNums = Object.keys(num2role).map(str => parseInt(str))

export { vname, continents, num2role, roleNums }