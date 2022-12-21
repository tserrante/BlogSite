const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
   console.log(req.query.title);
   const blogposts = await BlogPost.find()
   .or([{title: {$regex:req.query.title}},{body: {$regex:req.query.title}}])
   console.log(blogposts);
   
   if(!blogposts)
       res.redirect('/');
   else
       res.render('index', {blogposts});
};