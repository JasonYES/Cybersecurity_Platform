<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      title: {
          text: '多指标比较',
          subtext: '',
          x: 'center'
      },
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Score','Legal','Technical','Organization','Capacity','Cooperation']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '新加坡',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#2d8cf0'
          }},
          data: [0.92,0.95,0.96,0.88,0.97,0.87]
        },
        {
          name: '美国',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#10A6FF'
          }},
          data: [0.91,1,0.96,0.92,1,0.73]
        },
        {
          name: '马来西亚',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#0C17A6'
          }},
          data: [0.89,0.87,0.96,0.77,1,0.87]
        },
        {
          name: '阿曼',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {
            color: '#4608A6'
          }},
          data: [0.87,0.98,0.82,0.85,0.95,0.75]
        },
        {
          name: '爱沙尼亚',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {
            color: '#398DBF'
          }},
          data: [0.84,0.99,0.82,0.85,0.94,0.64]
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
