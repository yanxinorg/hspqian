/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://672888040.gdccc.cc';


var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        appid: `wx7a773e814eaaed00`,
        secret: `250305d3bfbf592916a118cfeab78545`,


        host,
        //得到推荐
        getRecommendUrl: `${host}/weapp/getRecommend`,
        //添加点击记录
        UserOffArticleUrl:`${host}/weapp/UserOffArticle`,
        //注册医生
        registdoctorUrl:`${host}/weapp/registdoctor`,
        //得到文章
        getArticleInfoUrl: `${host}/weapp/getArticleInfo`,
        //得到文章分类
        getArticleStyleUrl:`${host}/weapp/getArticleStyle`,
        //得到文章列表
        getArticlesUrl: `${host}/weapp/getArticles`,
        //删除问题
        delQuestionUrl:`${host}/weapp/delQuestion`,
        //得到科目列表
        getSubjectUrl: `${host}/weapp/getSubject`,
        //得到我的问题
        getMyQuestionUrl: `${host}/weapp/getMyQuestion`,
        //提交用户
        postUsertUrl: `${host}/weapp/postUser`,
        //
        update_picUrl: `${host}/weapp/update_pic`,
        //发生答复
        sendAnswerUrl: `${host}/weapp/sendAnswer`,
        //登录医生
        LogindoctorUrl: `${host}/weapp/Logindoctor`,
        //获取答复
        getAnswersUrl: `${host}/weapp/getAnswers`,
        //获取医生
        getDoctorUrl: `${host}/weapp/getdoctor`,

        // 增加问题
        addquestionUrl: `${host}/weapp/addquestion`,

        // 得到问题
        getquestionUrl: `${host}/weapp/getquestion`,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;
