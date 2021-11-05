#### 浮动按钮
在头部右侧新增浮动按钮，可以配置不同的 `文本内容`，`类型（普通按钮、下拉菜单按钮等）`、`风格（颜色）`、`事件` 等等。
![](https://cdn.jsdelivr.net/gh/og-liu/image-host/20211029162157.png)

#### 搜索栏
搜索栏提供各种 `类型` 控件的搜索项，包括 `普通文本框`、`下拉菜单` 等等，点击 `查询按钮` 将会暴露出 `查询事件`，具体代码需要自行编写，点击重置则清空搜索栏。
![](https://cdn.jsdelivr.net/gh/og-liu/image-host/20211029163434.png)

#### 操作按钮
操作按钮可以获取当前行的数据做对应的操作，整个操作列在页面宽度不够的时候会固定展示在右侧，按钮细节均可单独配置。
![](https://cdn.jsdelivr.net/gh/og-liu/image-host/20211029171246.png)

#### 批量操作
列头出现勾选功能，表头上方则会出现 `当前已选项目`、`操作项`，点击 `操作项` 则会暴露出对应的事件。
![](https://cdn.jsdelivr.net/gh/og-liu/image-host/20211029164606.png)

#### 表格列筛选
启用表格筛选之后，末列表头旁边会出现 `筛选按钮`，点击按钮会展示当前所有列的表头，勾选则显示该列，去掉勾选则隐藏。
![](https://cdn.jsdelivr.net/gh/og-liu/image-host/20211029172224.png)


[comment]: <> (浮动按钮改造成可以定位，分页改造成注入)


[comment]: <> (在头部右侧新增浮动按钮，可以配置不同的 `文本内容`，`类型（普通按钮、下拉菜单按钮等）`、`风格（颜色）`、`事件` 等等。)

[comment]: <> (#### 按钮位置)

[comment]: <> (#### 普通按钮)

[comment]: <> (#### 下拉菜单按钮)

[comment]: <> (#### 普通文本框)

[comment]: <> (#### 下拉菜单)

[comment]: <> (## Event 事件)

[comment]: <> (### onSearch 点击搜索)

[comment]: <> (### currentChange 当前页码改变)

[comment]: <> (### sizeChange 每页展示数量改变)

[comment]: <> (### requested 获取数据成功时)

[comment]: <> (### requestFailure 获取数据失败时)
