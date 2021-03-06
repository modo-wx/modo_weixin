let ports = require('../../utils/ports.js');
let util = require('../../utils/util.js');
Page({
  data: {
    isComePersonal: false,
    listsObj:null,
    chosenIndex:-1,
    hidden: false,
    nodata:false,
    chosenID:"",
  },
  onLoad(options) {
    this.setData({
      isComePersonal: options.isComePersonal ? options.isComePersonal:false,
      chosenID: options.chosenID,
    })
    this.getLists();
  },
  getLists() {
    let _this = this;
    let UserID = util.getStorage("userID");
    wx.request({
      url: ports.modoHttp + "API/WeChatMiniProgram/GetUserValidVoucher?UserID=" + UserID,
      method: 'get',
      success: function (res) {
        _this.setData({
          listsObj: res.data,
          hidden: true,
          nodata: true,
        })
      },
    })
  },
  chosenFun(e){
    let index = e.currentTarget.dataset.index;
    if (!this.data.isComePersonal){
      if (index || index==0){
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; // 上一级页面
        prevPage.setData({
          couponObj: index==-1?null:this.data.listsObj[index],
        });
      }
      wx.navigateBack({ changed: true });
    }
  },
  
})