<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <CboxOther @checked="checkedData"></CboxOther>
        </Card>
      </i-col>
    </Row>
    <Row type="flex" justify="center" style="margin-top: 20px">
      <i-col span="16">
        <Tablex :dataset="'orgs'"></Tablex>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { CboxOther, Tablex } from "_c/charts";
export default {
  name: "plain-scores-other",
  components: {
    CboxOther,
    Tablex
  },
  methods: {
    checkedData() {}
  },
  data() {
    return {
      columns: [
        {
          title: "Area",
          key: "area"
        },
        {
          title: "Score",
          key: "score",
          sortable: true
        },
        {
          title: "Legal",
          key: "legal",
          sortable: true
        },
        {
          title: "Technical",
          key: "technical",
          sortable: true
        },
        {
          title: "Organization",
          key: "organization",
          sortable: true
        },
        {
          title: "Capacity",
          key: "capacity",
          sortable: true
        },
        {
          title: "Cooperation",
          key: "cooperation",
          sortable: true
        }
      ],
      data: [
        {
          area: "亚洲",
          score: 0.92,
          legal: 0.95,
          technical: 0.96,
          organization: 0.88,
          capacity: 0.97,
          cooperation: 0.87
        },
        {
          area: "欧洲",
          score: 0.91,
          legal: 1,
          technical: 0.96,
          organization: 0.92,
          capacity: 1,
          cooperation: 0.73
        },
        {
          area: "大洋洲",
          score: 0.89,
          legal: 0.87,
          technical: 0.96,
          organization: 0.77,
          capacity: 1,
          cooperation: 0.87
        },
        {
          area: "非洲",
          score: 0.87,
          legal: 0.98,
          technical: 0.82,
          organization: 0.85,
          capacity: 0.95,
          cooperation: 0.75
        },
        {
          area: "拉丁美洲",
          score: 0.84,
          legal: 0.99,
          technical: 0.82,
          organization: 0.85,
          capacity: 0.94,
          cooperation: 0.64
        },
        {
          area: "北美洲",
          score: 0.82,
          legal: 0.85,
          technical: 0.96,
          organization: 0.74,
          capacity: 0.91,
          cooperation: 0.7
        }
      ]
    };
  }
};
</script>

