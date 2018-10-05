# 多人互联todolist

## 功能

- 登录、登出
- 注册账号
- 修改密码
- 通过手机号搜索并发送好友申请
- 同意好友申请
- 向好友发布任务（包含标题，备注，事件选择器，指定好友）
- 接受确认好友发来的任务，确认后任务会显示在自己的todolis里面
- 查看向好友发布的任务及自己的todolist各任务状态（待接收、进行中、已完成）

## 涉及技术

- 框架：VUE
- XHR异步请求：Axios（及请求拦截器interceptor过滤是否登录）
- 前端路由：VueRouter
- UI界面：mint-ui各标签组件，小部分mui样式
- 过滤器：时间格式处理(利用moment设置Vue过滤器)
- 打包工具：webpack

#### 后端：nodejs

- express
- express-session(处理session校验)
- body-parser(处理post请求体)、querystring（处理url）
- 数据库mongodb，操作数据库mongoose

