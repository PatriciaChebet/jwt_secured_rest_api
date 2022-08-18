const RetrievePosts = require('./middlewares/retrieve.posts.data')

exports.postsConfig = function(app){

    app.get("/posts/public", [
        RetrievePosts.getPublicPosts
    ]);

    app.get("/posts/private", [
        RetrievePosts.checkAuth,
        RetrievePosts.getPrivatePosts
    ]);

}