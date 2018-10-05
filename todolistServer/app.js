var express=require('express');
var router=require('./router');
var session = require('express-session');


var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
    },
}));
app.use('/static',express.static('./static'));
app.use('/',express.static('./static/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8800");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if(!req.session.user&&!req.body.password){   //这样写是有漏洞的，有时间改一下；
  	res.status(200).json({state:666});
  	return ;
  };
  next();
});


app.use(router);



app.listen(80,function(){
	console.log('running...')
})