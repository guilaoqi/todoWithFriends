import App from "./App.vue"
import Vue from 'vue'


//配置路由=============================================
import VueRouter from "vue-router"
Vue.use(VueRouter);

//axios请求
import Axios from 'axios';
// Axios.defaults.baseURL="http://localhost:3030/";
Axios.defaults.baseURL="http://47.100.203.109/";
Axios.defaults.withCredentials = true;

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    return config;
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.state===666){
    	console.log("没登录")
    	router.push({name:'login'});
    }

    return response;
  });
Vue.prototype.$axios = Axios;

//时间格式过滤器
import moment from 'moment';
Vue.filter('format',function(value){
	return moment(value).format('YYYY-MM-DD');
});





// import MintUI from 'mint-ui'
// Vue.use(MintUI)

import  Field  from 'mint-ui/lib/field';
Vue.component(Field.name, Field);
import { Navbar, TabItem } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import { TabContainer, TabContainerItem } from 'mint-ui';
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);
import { MessageBox } from 'mint-ui';
Vue.prototype.$messagebox=MessageBox;
import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);
import { CellSwipe } from 'mint-ui';
Vue.component(CellSwipe.name, CellSwipe);
import { Search } from 'mint-ui';
Vue.component(Search.name, Search);

import Header from 'mint-ui/lib/header';
import Switch from 'mint-ui/lib/switch';
import Lazyload from 'mint-ui/lib/lazyload';
import Loadmore from 'mint-ui/lib/loadmore';
import Indicator from 'mint-ui/lib/indicator';
import Button from 'mint-ui/lib/button';
Vue.component(Header.name, Header);
Vue.component(Switch.name, Switch);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);
Vue.use(Lazyload);


//引入css文件==========================================
import 'mint-ui/lib/style.css';
import './static/vendor/mui-master/dist/css/mui.css';
import './static/font/iconfont.css';
import './static/css/global.css';



const  Home =()=>import( './components/home/home.vue');
const  MyHeader =()=>import( './components/common/myHeader.vue');
const AddMission=()=>import('./components/addMission/addMission.vue');
const Personal=()=>import('./components/personal/personal.vue');
const Password=()=>import('./components/personal/password.vue');
const Partner=()=>import('./components/personal/partner.vue');
const Login=()=>import('./components/personal/login.vue');
const Register=()=>import('./components/personal/register.vue');
const PartnerAdd=()=>import('./components/personal/partneradd.vue');


Vue.component('myHeader',MyHeader); //my-header

let router=new VueRouter({
	linkActiveClass:"mui-active",
	routes:[
		{path:'/',redirect:{name:'home'}},
		{name:'home',path:'/home',component:Home},
		{name:'addMission',path:'/addMission',component:AddMission},
		{name:'personal',path:'/personal',component:Personal},
		{name:'password',path:'/password',component:Password},
		{name:'partner',path:'/partner',component:Partner},
		{name:'partneradd',path:'/partner/add',component:PartnerAdd},
		{name:'login',path:'/login',component:Login},
		{name:'register',path:'/register',component:Register}




	]
})

//主体================================================
new Vue({
	el:'#app',
	router:router,
	render:create=>create(App)
})