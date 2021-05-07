Page({
  data: {
    showIcon: true,
    swiperList: [],
    courses: [],
    searchList: null,
    type: 'recommend',
    tabs: [
      {name: '推荐', type: 'recommend'},
      {name: '路径', type: 'path'},
      {name: '实战', type: 'project'},
      {name: '活动', type: 'activity'},
    ],
    activity:[]
  },
  onLoad() {
    wx.request({
      url: 'https://www.fastmock.site/mock/ebc6c47027174db3408974bc201e5424/weixin/api/getData',
      success:(res) => {
        const { data: { data } } = res;
        const { swiperList, courses, activity } = data;
        this.setData({
          swiperList,
          courses,
          activity
        })
      }
    })
  },
  handleInputChange(e) {
    const value = e.detail.value;
    let searchList = null;
    if(value) {
      searchList = this.data.courses.filter(item => item.title.indexOf(value) > -1)
    }
    this.setData({
      showIcon: value? false: true,
      searchList
    })
  },
  changeType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ type });
  },
  handleCourseTap( e ){
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detall/detall?id=${id}`,

    })
  }
})