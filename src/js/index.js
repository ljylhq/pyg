$(function () {
  init()
  // js一加载就执行的 方法 入口
  function init() {
    swiperdata()
    catitems()
    goodslist()
  }
  // 获取首页轮播图的数据
  function swiperdata() {
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
      success: function (result) {
        // console.log(result);
        //  判断请求成功
        if (result.meta.status === 200) {
          // 获取渲染的数据
          let data = result.data;
          console.log(data);
          //  生成要渲染的html标签
          let html = template('swiperTp1', {
            arr: data
          })
          //  把标签插入到轮播图的div中
          $('.pyg_slide').html(html)
          //获得slider插件对象
          var gallery = mui('.mui-slider');
          gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
          });
        } else {
          console.log('请求失败', result)
        }
      }
    });
  }

  // 获取首页分类菜单数据
  function catitems() {
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/catitems",
      success: function (result) {
        // console.log(result);
        //  判断请求成功
        if (result.meta.status === 200) {
          // 要渲染的数据
          let data = result.data
          // 要渲染的结构
          let html = '';
          // 遍历数组,生成结构
          for (let i = 0; i < data.length; i++) {
            let tempHtml =
              `
              <a href="javascript:;">
              <img src="${data[i].image_src}" alt=""/>
              </a>
              `;
            html += tempHtml
          }
          // 把结构放到标签去
          $('.pyg_cates').html(html)
        } else {
          console.log('请求失败', result)
        }
      }
    });
  }


  function goodslist() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/goodslist", (result) => {
      //  判断请求成功
      if (result.meta.status === 200) {
        // 要渲染的数据
        let data = result.data;
        //  生成要渲染的html标签
        let html = template('listTpl', { arr: data })
        // 导入数据
        $('.pyg_goodslist').html(html)
      } else {

      }
    })
  }

})