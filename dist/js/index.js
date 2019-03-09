"use strict";

$(function () {
  init(); // js一加载就执行的 方法 入口

  function init() {
    swiperdata();
    catitems();
    goodslist();
  } // 获取首页轮播图的数据


  function swiperdata() {
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
      success: function success(result) {
        // console.log(result);
        //  判断请求成功
        if (result.meta.status === 200) {
          // 获取渲染的数据
          var data = result.data;
          console.log(data); //  生成要渲染的html标签

          var html = template('swiperTp1', {
            arr: data
          }); //  把标签插入到轮播图的div中

          $('.pyg_slide').html(html); //获得slider插件对象

          var gallery = mui('.mui-slider');
          gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；

          });
        } else {
          console.log('请求失败', result);
        }
      }
    });
  } // 获取首页分类菜单数据


  function catitems() {
    $.ajax({
      type: "get",
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/catitems",
      success: function success(result) {
        // console.log(result);
        //  判断请求成功
        if (result.meta.status === 200) {
          // 要渲染的数据
          var data = result.data; // 要渲染的结构

          var html = ''; // 遍历数组,生成结构

          for (var i = 0; i < data.length; i++) {
            var tempHtml = "\n              <a href=\"javascript:;\">\n              <img src=\"".concat(data[i].image_src, "\" alt=\"\"/>\n              </a>\n              ");
            html += tempHtml;
          } // 把结构放到标签去


          $('.pyg_cates').html(html);
        } else {
          console.log('请求失败', result);
        }
      }
    });
  }

  function goodslist() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/goodslist", function (result) {
      //  判断请求成功
      if (result.meta.status === 200) {
        // 要渲染的数据
        var data = result.data; //  生成要渲染的html标签

        var html = template('listTpl', {
          arr: data
        }); // 导入数据

        $('.pyg_goodslist').html(html);
      } else {}
    });
  }
});
//# sourceMappingURL=index.js.map
