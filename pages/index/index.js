//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    img_unknow_url: '/image/unknow.png',
    img_select_url: '/image/unknow.png',
    result: '',
    winNum: 0,
    currentIndex: 0,
    enableSelect: true,
    timer: null,
    imgs: [
      '/image/jiandao.png',
      '/image/shitou.png',
      '/image/bu.png'
    ]
  },
  onLoad: function () {
    this.data.winNum = this.getWinNum()
    this.setData({
      winNum: this.data.winNum
    })
   this.run()
  },
  run: function(e) {
    this.data.timer = setInterval(() => {
      this.setData({
        currentIndex: this.data.currentIndex+1
      })
      console.log(this.data.currentIndex)
    }, 80);
  },
  select: function(e) {
    if (!this.data.enableSelect) {
      return
    }
      this.data.enableSelect = false

    let img_url = e.target.dataset.img
    
    clearInterval(this.data.timer)
    this.data.timer = null

    let ai = this.getGesture(this.data.imgs[this.data.currentIndex % 3])
    console.log(ai);
    
    let my = this.getGesture(img_url)
    console.log(my);
    let result = '你输了'

    if ((my === 'shitou' && ai === 'jiandao') ||
    (my === 'jiandao' && ai === 'bu') ||
    (my === 'bu' && ai === 'shitou')) {
      result = '你赢了'
      this.saveWinNum()
    }

    if (my === ai) {
      result = '平局'
    }

    this.setData({
      result: result,
      winNum: this.data.winNum,
      img_select_url: img_url
    })
  },
  restart: function(e) {
    if (this.data.timer) {
      return
    }
    this.data.enableSelect = true
    this.setData({
      result: '',
      currentIndex: 0,
      img_select_url: this.data.img_unknow_url
    })
    this.run()
  },
  getGesture: function(img_url) {
    console.log(img_url);
    
    return /image\/(.*?)\.png/.exec(img_url)[1]
  },
  saveWinNum: function() {
    this.data.winNum = parseInt(this.data.winNum) + 1
    wx.setStorageSync('winnum', this.data.winNum)
  },
  getWinNum: function() {
    let num = wx.getStorageSync('winnum')
    return num != null ?  num : 0
  }
})
