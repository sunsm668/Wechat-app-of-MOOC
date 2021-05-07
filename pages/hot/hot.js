Page({
  listData:{},
  data: {
    ranktype: undefined,
    ranktypes:[
      {title : '实战排名',
        type : 'project'
      },
      {title : '路径排名',
        type : 'path'
      }
    ],
    rankperiod: undefined,
    rankperiods:[
      { title : '周',
        value : 'week'
      },
      { title : '月',
        value : 'month'
      }
    ],
    currentList :[]
  },
  onLoad(){
    wx.request({
      url: 'https://www.fastmock.site/mock/ebc6c47027174db3408974bc201e5424/weixin/api/getRecommend',
      success:(res) => {
        const { data : { data }}=res;
        this.listData = data;
        const rankperiod = wx.getStorageSync('rankperiod' || 'week');
        const ranktype = wx.getStorageSync('ranktype' || 'project');
        this.setData( {ranktype, rankperiod});
        this.changeCurrentList( ranktype, rankperiod);
      }
    })
  },
  changeCurrentList( ranktype, rankperiod){
    let currentList = [];
    if(   ranktype === 'project' &&  rankperiod === 'week'){
      currentList = this.listData.projectWeek;  
    }else if( ranktype === 'path' &&  rankperiod === 'week'){
      currentList = this.listData.pathWeek;  
    }else if( ranktype === 'project' &&  rankperiod === 'month'){
      currentList = this.listData. projectMonth;
    }else{
      currentList = this.listData.pathMonth;  
    }
    this.setData({ currentList });
  },
  handleTabChange( e ){
    const ranktype = e.currentTarget.dataset.type;
    const{ rankperiod } = this.data;
    this.setData({ranktype});
    wx.setStorage({
      data: ranktype,
      key: 'ranktype',
    });
    this.changeCurrentList(ranktype, rankperiod);
  },
  handleperiodChange( e ){
    const rankperiod = e.currentTarget.dataset.type;
    const{ ranktype } = this.data;
    this.setData({ rankperiod });
    wx.setStorage({
      data: rankperiod,
      key: 'rankperiod',
    });
    this.changeCurrentList(ranktype, rankperiod);
  }

})