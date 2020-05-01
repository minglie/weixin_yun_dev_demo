const db = wx.cloud.database()
const cb = u => console.log(u);
Page({
  data: {},
  insert: function () {
    db.collection("user").add({
      data: {
        name: 'jerry',
        age: 20
      },
      success: res => {
        console.log(res)
      },
      fail: e => {
        console.log(e)
      }

    })
  },
  update: function () {
    db.collection("user").doc("19762d645eac26cd003c971667d1cf3d").update({
      data: {
        name: 'jerry',
        age: 21
      },
      success: res => {
        console.log(res)
      },
      fail: e => {
        console.log(e)
      }
    })
  },
  select: function () {
    db.collection("user").where({
      name: "zx"
    }).get().then(cb).catch(cb)
  },
  delete: function () {
    db.collection("user").doc("19762d645eac26cd003c971667d1cf3d").remove().then(cb).catch(cb)
  },
  sum: function () {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 5,
        b: 7
      }
    }).then(cb).catch(cb)
  },
  getOpenCode: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(cb).catch(cb)
  },
  bantchDelete: function () {
    wx.cloud.callFunction({
      name: 'batchDelete'
    }).then(cb).catch(cb)
  },
  upload: function () {

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.cloud.uploadFile({
          cloudPath: 'example.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            db.collection("image").add({
              data: {
                fileID: res.fileID
              }
            }).then(cb).catch(cb)
          },
          fail: console.error
        })



      }
    })





  }








})