var baseUrl = '/api'

// 今日新闻
var news = baseUrl + '/api/4/news/latest'

// 过往新闻
var oldNews = baseUrl + '/api/4/news/before'

// 长评论
var longComment = baseUrl + '/api/4/story'

// 短评论
var shortComment = baseUrl + '/api/4/story/'

// 内容详情
var newsDetails = baseUrl + '/api/4/news'

// 额外消息
var extraNews = baseUrl +'/api/4/story-extra'
export default {
    news,
    oldNews,
    newsDetails,
    longComment,
    shortComment,
    extraNews
}