
/**
 * app入口
 */

    var express   = require('express'),
        partials  = require('express-partials'),
        routes    = require('./routes'),
        user      = require('./routes/user'),
        meeting   = require('./routes/meeting'),
        admin     = require('./routes/admin'),
        http      = require('http'),
        path      = require('path'),
        util      = require('util'),
        events    = require('events')
        EventEmitter = events.EventEmitter;

var MongoStore = require('connect-mongo')(express);
var settings   = require('./settings');

//express实例
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(8080);

//配置
app.configure(function(){

    //端口号
    app.set('port', process.env.PORT || 3000);

    //视图路径
    app.set('views', __dirname + '/views');

    //视图引擎
    app.set('view engine', 'ejs');

    //视图片段
    app.use(partials());

    //
    app.use(express.favicon());

    //日志记录器
    app.use(express.logger('dev'));

    //解析客户端请求中间件，主要用于post
    app.use(express.bodyParser());

    //支持定制的HTTP方法中间件
    app.use(express.methodOverride());

    //cookie-将解析和存储 cookie 数据于 req.cookies
    app.use(express.cookieParser());

    //sesstion
    app.use(express.session({
        secret: settings.cookieSecret,
        store: new MongoStore({
            db: settings.db 
        })
    }));

    //路由控制器
    app.use(app.router);

    //静态文件支持
    app.use(express.static(path.join(__dirname, 'public')));
});

//开发模式
app.configure('development', function(){

    //错误控制器
    app.use(express.errorHandler());
});

/* web socket */
var MyEvent = function(){
    events.EventEmitter.call(this);
};
util.inherits(MyEvent, EventEmitter);

global._ws = new MyEvent();
global._ws._e = {};

var _once = false;

io.sockets.on('connection', function (socket) {

    if ( !_once ) {
        _once = true;

        (function(ws, socket){

            //会议添加用户
            ws.on('meetingAddUser', function() {
                console.log('meeting-add-user');
                if ( ws._e['meetingAddUser'] ) {
                    ws._e['meetingAddUser'](socket);
                } 
            });

            //会议删除用户
            ws.on('meetingDelUser', function() {
                console.log('meeting-del-user');
                if ( ws._e['meetingDelUser'] ) {
                    ws._e['meetingDelUser'](socket);
                } 
            });

            //会议更新
            ws.on('updateMeeting', function() {
                console.log('update-meeting');
                if ( ws._e['updateMeeting'] ) {
                    ws._e['updateMeeting'](socket);
                } 
            });

            //新建会议
            ws.on('addNewMeeting', function() {
                if ( ws._e['addNewMeeting'] ) {
                    ws._e['addNewMeeting'](socket);
                } 
            });

        })(global._ws, socket);
    }

});


/* 
* 路由状态转换 后台
*/
app.get('/admin', admin.index);
app.get('/adminlogin', admin.login);
app.post('/adminlogin', admin.doLogin);
app.get('/adminloginout', admin.loginout);

app.all(/^\/user.*|^\/meeting.*/i, function(req, res, next) {
    if ( !req.session.user ) {
        res.redirect('/adminlogin');
    } else {
        next();
    }
});

//用户
app.get('/userlist', user.list);
app.post('/useradd', user.addUser);
app.post('/userdelete', user.deleteUser);
app.post('/userdeleteall', user.deleteAllUsers);
app.post('/userupdate', user.updateUser);
app.post('/userupdateps', user.updatePS);
app.post('/usergetby', user.getUserBy);
app.post('/usersgetby', user.getUsersBy);
app.post('/useraddmeeting', user.addMeeting);
app.post('/userdelmeeting', user.delMeeting);

//会议
app.get('/meetinglist', meeting.list);
app.post('/meetingadd', meeting.add);
app.post('/meetingdelete', meeting.deleteMeeting);
app.post('/meetingdeleteall', meeting.deleteAllMeetings);
app.post('/meetingupdate', function(req, res){
    meeting.updateMeeting(req, res, io);
});
app.post('/meetingaddusers', function(req, res) {
    meeting.addMeetingUsers(req, res); 
});
app.post('/meetingdelusers', function(req, res) {
    meeting.delMeetingUsers(req, res, io);
});
app.post('/meetinggetbyuser', meeting.getByUser);
app.post('/meetinggetbyname', meeting.getByName);


/* 
* 路由状态转换 前台 
*/
app.get('/', routes.index);
app.get('/logout', user.logout);
app.get('/person', user.person);
app.get('/square', meeting.square);

app.post('/reg', user.doReg);
app.post('/login', user.doLogin);
app.post('/getmeeting', meeting.getDep);
app.post('/addnewmeeting', function(req, res){
    user.addNewMeeting(req, res, io);    
});

//启动服务
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
