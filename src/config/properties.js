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
    capital: "人类发展指数",
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
    country: "国家/地区",
    score: "分数",
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
    "": "",
    detail: "详情",
    index: "指标",
    indexname: "指标名",
    status: "状态",
    "亚洲": "亚洲",
    "欧洲": "欧洲",
    "北美洲": "北美洲",
    "南美洲": "南美洲",
    "非洲": "非洲",
    "大洋洲": "大洋洲",
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
    0: "游客",
    1: "评分员",
    2: "审核员"
}

var roleNums = Object.keys(num2role).map(str => parseInt(str))

var reportText = {
    title: "2019年度安全报告",
    summary: `2018年全球网络安全市场规模有望达到956亿美元（约合人民币5951.3亿元），并且在未来5年，年复合增长率达到10.3%，到2019年，这一数据有望触及1557.4亿美元（约合人民币9695.1亿元）其中，到2019年，全球无线网络安全市场规模将达到155.5亿美元（约合人民币969.3亿元），年复合增长率约12.94%。从行业来看，航空航天、国防等领域仍将是网络安全市场的主要推动力量。从地区收益来看，北美地区将是最大的市场。同时，亚太地区、中东和非洲地区有望在一定的时机呈现更大的增长速度。报告中指出，云服务的快速普及、无线通讯、公共事业行业的网络犯罪增加以及严格的政府监管措施出台都是这一市场发展的主要因素。因此，今后批准的网络安全解决方案将不断增加以防范和打击专业对手创造的先进和复杂的威胁。此外，由于网络犯罪逐渐增长导致智力及金融资产的损失，并可能损害国家的基础设施和经济，因此云服务提供商和垂直行业，如能源，石油和天然气等都将加大网络安全解决方案的投入。从网络运行和管理者角度说，希望对本地网络信息的访问、读写等操作受到保护和控制，避免出现“陷门”、病毒、非法存取、拒绝服务和网络资源非法占用和非法控制等威胁，制止和防御网络黑客的攻击。对安全保密部门来说，他们希望对非法的、有害的或涉及国家机密的信息进行过滤和防堵，避免机要信息泄露，避免对社会产生危害，对国家造成巨大损失。随着计算机技术的迅速发展，在计算机上处理的业务也由基于单机的数学运算、文件处理，基于简单连接的内部网络的内部业务处理、办公自动化等发展到基于复杂的内部网（Intranet）、企业外部网（Extranet）、全球互联网（Internet）的企业级计算机处理系统和世界范围内的信息共享和业务处理。在系统处理能力提高的同时，系统的连接能力也在不断的提高。但在连接能力信息、流通能力提高的同时，基于网络连接的安全问题也日益突出，整体的网络安全主要表现在以下几个方面：网络的物理安全、网络拓扑结构安全、网络系统安全、应用系统安全和网络管理的安全等。`,
    map: `2018年全球网络安全市场规模有望达到956亿美元（约合人民币5951.3亿元），并且在未来5年，年复合增长率达到10.3%，到2019年，这一数据有望触及1557.4亿美元（约合人民币9695.1亿元）其中，到2019年，全球无线网络安全市场规模将达到155.5亿美元（约合人民币969.3亿元），年复合增长率约12.94%。从行业来看，航空航天、国防等领域仍将是网络安全市场的主要推动力量。从地区收益来看，北美地区将是最大的市场。同时，亚太地区、中东和非洲地区有望在一定的时机呈现更大的增长速度。报告中指出，云服务的快速普及、无线通讯、公共事业行业的网络犯罪增加以及严格的政府监管措施出台都是这一市场发展的主要因素。因此，今后批准的网络安全解决方案将不断增加以防范和打击专业对手创造的先进和复杂的威胁。此外，由于网络犯罪逐渐增长导致智力及金融资产的损失，并可能损害国家的基础设施和经济，因此云服务提供商和垂直行业，如能源，石油和天然气等都将加大网络安全解决方案的投入。`,
    table: "",
    pie: `2018年全球网络安全市场规模有望达到956亿美元（约合人民币5951.3亿元），并且在未来5年，年复合增长率达到10.3%，到2019年，这一数据有望触及1557.4亿美元（约合人民币9695.1亿元）其中，到2019年，全球无线网络安全市场规模将达到155.5亿美元（约合人民币969.3亿元），年复合增长率约12.94%。从行业来看，航空航天、国防等领域仍将是网络安全市场的主要推动力量。从地区收益来看，北美地区将是最大的市场。同时，亚太地区、中东和非洲地区有望在一定的时机呈现更大的增长速度。报告中指出，云服务的快速普及、无线通讯、公共事业行业的网络犯罪增加以及严格的政府监管措施出台都是这一市场发展的主要因素。因此，今后批准的网络安全解决方案将不断增加以防范和打击专业对手创造的先进和复杂的威胁。此外，由于网络犯罪逐渐增长导致智力及金融资产的损失，并可能损害国家的基础设施和经济，因此云服务提供商和垂直行业，如能源，石油和天然气等都将加大网络安全解决方案的投入。`,
    final: `2018年全球网络安全市场规模有望达到956亿美元（约合人民币5951.3亿元），并且在未来5年，年复合增长率达到10.3%，到2019年，这一数据有望触及1557.4亿美元（约合人民币9695.1亿元）其中，到2019年，全球无线网络安全市场规模将达到155.5亿美元（约合人民币969.3亿元），年复合增长率约12.94%。从行业来看，航空航天、国防等领域仍将是网络安全市场的主要推动力量。从地区收益来看，北美地区将是最大的市场。同时，亚太地区、中东和非洲地区有望在一定的时机呈现更大的增长速度。报告中指出，云服务的快速普及、无线通讯、公共事业行业的网络犯罪增加以及严格的政府监管措施出台都是这一市场发展的主要因素。因此，今后批准的网络安全解决方案将不断增加以防范和打击专业对手创造的先进和复杂的威胁。此外，由于网络犯罪逐渐增长导致智力及金融资产的损失，并可能损害国家的基础设施和经济，因此云服务提供商和垂直行业，如能源，石油和天然气等都将加大网络安全解决方案的投入。从网络运行和管理者角度说，希望对本地网络信息的访问、读写等操作受到保护和控制，避免出现“陷门”、病毒、非法存取、拒绝服务和网络资源非法占用和非法控制等威胁，制止和防御网络黑客的攻击。对安全保密部门来说，他们希望对非法的、有害的或涉及国家机密的信息进行过滤和防堵，避免机要信息泄露，避免对社会产生危害，对国家造成巨大损失。随着计算机技术的迅速发展，在计算机上处理的业务也由基于单机的数学运算、文件处理，基于简单连接的内部网络的内部业务处理、办公自动化等发展到基于复杂的内部网（Intranet）、企业外部网（Extranet）、全球互联网（Internet）的企业级计算机处理系统和世界范围内的信息共享和业务处理。在系统处理能力提高的同时，系统的连接能力也在不断的提高。但在连接能力信息、流通能力提高的同时，基于网络连接的安全问题也日益突出，整体的网络安全主要表现在以下几个方面：网络的物理安全、网络拓扑结构安全、网络系统安全、应用系统安全和网络管理的安全等。`,
}
export { vname, continents, num2role, roleNums, reportText }


