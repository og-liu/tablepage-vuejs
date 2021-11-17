# TablePage VueComponent <small>gbcloud-admin</small>

>  为了避免大批量的重复代码，将使用频率极高的表格列表页面封装成一个组件

- 它是一个大型组件，由多个小组件组成
- 将包含所有此类型页面所需功能，根据不同配置实现多个页面的区别展示

<div>
  <span>Created on 2021-07-01 Made with ❤️ by </span>
  <a href="https://github.com/og-liu" target="_blank" style="text-decoration: none; color: #015a9c;">og-liu</a>
</div>

<div id="highlights">
  <div class="inner">
    <div class="point">
      <h2>浮动按钮</h2>
      <p>可点击的按钮<br/>可配置多个、多种控件类型<br />按钮类型(颜色)</p>
    </div>
    <div class="point">
      <h2>搜索栏</h2>
      <p>表格上方的搜索栏<br />可以配置多个、多种控件类型<br />高级搜索</p>
    </div>
    <div class="point">
      <h2>表格</h2>
      <p>可配置每列数据、自定义列<br />提供批量操作及数据筛选功能<br />末列各类型操作按钮</p>
    </div>
  </div>
  <div class="inner">
    <div class="point">
      <h2>分页（吸底导航）</h2>
      <p>可配置每页页码、展示数量<br />提供翻页事件、固定吸底功能<br />也可以配置浮动按钮</p>
    </div>
  </div>
</div>

<style>
/*body {*/
/*  !*background: linear-gradient(to left bottom, hsl(101, 100%, 85%) 0%,hsl(19, 100%, 85%) 100%);*!*/
/*  !*background: linear-gradient(to left bottom, hsl(73, 100%, 85%) 0%,hsl(221, 100%, 85%) 100%);*!*/
/*}*/
#highlights {
  padding-bottom: 70px;
}
#highlights .inner {
  display: flex;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
#highlights .point {
  width: 33%;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 2em;
}
#highlights .point h2 {
  color: #42b983;
  font-size: 1.5em;
  font-weight: 400;
  margin: 0;
  padding: 0.5em 0;
}
#highlights .point p {
  color: #4f5959;
}
#highlights .point {
  display: block;
  margin: 0 auto;
  width: 300px;
  padding: 0 40px 30px;
}
section.cover.has-mask .mask {opacity: 0.86;}
</style>

[GitHub](https://github.com/docsifyjs/docsify/)
[Get Started](#快速上手)

![](https://cdn.jsdelivr.net/gh/og-liu/image-host/20211117155017.jpg)
