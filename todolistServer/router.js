var express= require('express');
var router=express.Router();
var path=require('path');
var url=require('url');
var querystring=require('querystring');
var Mission=require('./models/mission.js');
var User=require('./models/user.js')

router.post('/mission',function(req,res){

	// console.log(req.body);
	var mission=new Mission({
		title:req.body.title,
		detail:req.body.detail,
		user_name:req.session.user.name,
		user_id:req.session.user._id,
		add_time:req.body.add_time||new Date(),
		finish_time:req.body.finish_time||'',
		goal_time:req.body.goal_time,
		to_user:req.body.to_user,
		to_user_id:req.body.to_user_id,
		mission_state:'0'
	})
	if(!mission.to_user_id){
		mission.to_user_id=req.session.user._id;
		mission.to_user=req.session.user.name;
		mission.mission_state='1';
	}
	mission.save(function(err,ret){
		if(err){
			console.log('保存失败');
			console.log(err);
		}else{
			console.log('保存成功');
			res.status(200).json({state:1});
		}
	})

});
router.get('/mission/0',function(req,res){
	var arg = url.parse(req.url).query;
	var params = querystring.parse(arg);
	var page=params.page?params.page-1:0;
	Mission.find({user_id:req.session.user._id,mission_state:'0'},null,{limit:20,skip:page*5},function(err,ret){
		if(err){
			console.log('查询失败')
		}else{
			console.log('查询成功');
			// console.log(ret);
			
			res.status(200).json(ret);
		}
	});
});
router.get('/mission/1',function(req,res){
	var arg = url.parse(req.url).query;
	var params = querystring.parse(arg);
	var page=params.page?params.page-1:0;
	Mission.find({user_id:req.session.user._id,mission_state:'1'},null,{limit:20,skip:page*5},function(err,ret){
		if(err){
			console.log('查询失败')
		}else{
			console.log('查询成功');
			// console.log(ret);
			
			res.status(200).json(ret);
		}
	});
});
router.get('/mission/2',function(req,res){
	var arg = url.parse(req.url).query;
	var params = querystring.parse(arg);
	var page=params.page?params.page-1:0;
	Mission.find({user_id:req.session.user._id,mission_state:'2'},null,{limit:20,skip:page*5},function(err,ret){
		if(err){
			console.log('查询失败')
		}else{
			console.log('查询成功');
			// console.log(ret);
			
			res.status(200).json(ret);
		}
	});
});
router.get('/mission/mine/toconfirm',function(req,res){
	var arg = url.parse(req.url).query;
	var params = querystring.parse(arg);
	var page=params.page?params.page-1:0;
	Mission.find({to_user_id:req.session.user._id,mission_state:"0"},null,{limit:20,skip:page*5},function(err,ret){
		if(err){
			console.log('查询失败')
		}else{
			console.log('查询成功');
			// console.log(ret);
			
			res.status(200).json(ret);
		}
	});
});
router.get('/mission/mine/todo',function(req,res){
	var arg = url.parse(req.url).query;
	var params = querystring.parse(arg);
	var page=params.page?params.page-1:0;
	Mission.find({to_user_id:req.session.user._id,mission_state:"1"},null,{limit:20,skip:page*5},function(err,ret){
		if(err){
			console.log('查询失败')
		}else{
			console.log('查询成功');
			// console.log(ret);
			
			res.status(200).json(ret);
		}
	});
});
router.get('/mission/mine/done',function(req,res){
	var arg = url.parse(req.url).query;
	var params = querystring.parse(arg);
	var page=params.page?params.page-1:0;
	Mission.find({to_user_id:req.session.user._id,mission_state:"2"},null,{limit:20,skip:page*5},function(err,ret){
		if(err){
			console.log('查询失败')
		}else{
			console.log('查询成功');
			// console.log(ret);
			
			res.status(200).json(ret);
		}
	});
});
router.post('/mission/edit',function(req,res){

	Mission.update({_id:req.body.mission_ID},{mission_state:req.body.mission_state},null,function(err,ret){
		if(err){
			console.log('更改失败');
			console.log(err);
		}else{
			console.log('更改成功');
			res.status(200).json({state:1});
		}
	})
});
//===============注册新用户==========================
router.post('/user/add',function(req,res){
	// console.log(req.body);
		User.findOne({name:req.body.username},function(err,ret){
			if(ret){
				res.status(200).json({state:-1});
			}else{
				User.findOne({phonenum:req.body.phonenum},function(err,ret){
					if(ret){
						res.status(200).json({state:0});
					}else{
						var user=new User({
							name:req.body.username,
							phonenum:req.body.phonenum,
							password:req.body.password
						});
						user.save(function(err,ret){
							if(err){
								console.log('保存失败');
								console.log(err);
							}else{
								console.log('保存成功');
								res.status(200).json({state:1});
							}
						})
					}
				})
			}
		})

});

router.get('/update',function(req,res){
	User.findOne({_id:req.session.user._id},function(err,ret){
		if(ret){
					req.session.user = ret;
					res.status(200).json({state:1,newfriends:ret.newfriends||[],friendlist:ret.friendlist||[],waitfriends:ret.waitfriends||[],username:ret.name,userid:ret._id});
				}
	})
})





//============登录==========================
router.post('/login',function(req,res){
	if(!req.body.value){
		User.findOne({name:req.body.username,password:req.body.password},function(err,ret){
			if(err){
				console.log('查询失败');
			}else{
				console.log('查询成功');
				
				if(ret){
					req.session.user = ret;
					res.status(200).json({state:1,newfriends:ret.newfriends||[],friendlist:ret.friendlist||[],waitfriends:ret.waitfriends||[],username:ret.name,userid:ret._id});

				}else{
					res.status(200).json({state:0});
				}
			}
		});
	}else{
		User.findOne({phonenum:req.body.phonenum,password:req.body.password},function(err,ret){
			if(err){
				console.log('查询失败');
			}else{
				console.log('查询成功');
				if(ret){
					req.session.user = ret;
					res.status(200).json({state:1,newfriends:ret.newfriends||[],friendlist:ret.friendlist||[],waitfriends:ret.waitfriends||[],username:ret.name,userid:ret._id});

				}else{
					res.status(200).json({state:0});
				}
			}
		});
	}
});
//=================退出=====================
router.get('/logout',function(req,res){
	req.session.user = null;
	res.status(200).json({state:1});
	
});
//==================修改密码=====================
router.post('/UpdatePass',function(req,res){
	User.update({_id:req.session.user._id,password:req.body.passpre},{password:req.body.passnew},null,function(err,ret){
		if(err){
			console.log('修改密码出错');
			console.log(err);
		}else{
			if(ret.nModified!=0){
				res.status(200).json({state:1});
			}else{
				res.status(200).json({state:0});
			};
			
		}
	});
});
router.post('/searchUser',function(req,res){
	User.findOne({phonenum:req.body.phonenum},function(err,ret){
			if(err){
				console.log('查询失败')
			}else{
				console.log('查询成功');
				if(ret){
					res.status(200).json({state:1,username:ret.name,userid:ret._id,phonenum:ret.phonenum});

				}else{
					res.status(200).json({state:0});
				}
			}
		});
});
//====================发送好友请求=====================
router.post('/sendRequest',function(req,res){
	User.update({_id:req.body.userid},{$push:{newfriends:{id:req.session.user._id,name:req.session.user.name,phonenum:req.session.user.phonenum}}},null,function(err,ret){
		if(err){
			console.log('好友请求发送失败');
			console.log(err);
		}else{
			console.log('好友请求发送成功');
			User.update({_id:req.session.user._id},{$push:{waitfriends:{id:req.body.userid,name:req.body.username}}},null,function(err,ret){
				res.status(200).json({state:1});
			});
			
		}
	});
});
router.post('/confirmRequest',function(req,res){
	// console.log(req.session.user._id);
	// console.log(req.body.userid);
	User.findOne({_id:req.session.user._id},function(err,ret){
		User.update({_id:req.body.userid},{$pull:{waitfriends:{id:req.body.userid}},$push:{friendlist:{name:ret.name,id:ret._id,phonenum:ret.phonenum}}},null,function(err,ret){
			if(err){
				console.log('好友请求确认失败');
				console.log(err);
			}else{
				console.log('好友请求确认成功');
			}
		});
	});
	User.findOne({_id:req.body.userid},function(err,ret){
		console.log(ret);
		User.update({_id:req.session.user._id},{$pull:{newfriends:{id:req.body.userid}},$push:{friendlist:{name:ret.name,id:ret._id,phonenum:ret.phonenum}}},null,function(err,ret){
			if(err){
				console.log('好友请求确认失败');
				console.log(err);
			}else{
				console.log('好友请求确认成功');
				res.status(200).json({state:1});
			}
		});
	});

});
module.exports=router;