var Model = require('../models/model')


// Community detail
exports.community_detail = async (req, res, next) => {
  try {
    var blog = await Model.Community.findById(req.params.id).populate('user')    
    var blog_comments = await Model.CommunityComment.find({ parent: req.params.id, coc: false }).populate('user')

    for (blog_comment of blog_comments) {
      blog_comment.comment = await Model.CommunityComment.find({ parent: blog_comment._id, coc: true }).populate('user').populate('bites')
    }

    res.render('community_detail', { title: 'Community detail', blog: blog, blog_comments: blog_comments })
  } catch (error) {
    res.render('error', { error: error })
  }
}
// Community-Comment create
exports.community_comment_create = async (req, res, next) => {
  try {
    if (!req.body.id) { // Create
      var bites = req.body.bites ? req.body.bites : null
      var blog_comment = new Model.CommunityComment({
        parent: req.body.parent,
        coc: req.body.coc,
        bites: bites,
        user: req.user.id,
        content: req.body.content
      })
      await blog_comment.save()
      res.redirect('/community/' + req.body.url)
    } else { // Update
      await Model.CommunityComment.findByIdAndUpdate(req.body.id, { content: req.body.content })
      res.redirect('/community/' + req.body.url)
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}
// Community-Comment delete
exports.community_comment_delete = async (req, res, next) => {
  try {
    await Model.CommunityComment.findByIdAndDelete(req.body.id)
    res.send('success')
  } catch (error) {
    res.render('error', { error: error })
  }
}


// Qna detail
exports.qna_detail = async (req, res, next) => {
  try {
    var blog = await Model.QnaQuestion.findById(req.params.id).populate('user')    
    var blog_comments = await Model.QnaAnswer.find({ parent: req.params.id, coc: false }).populate('user')

    for (blog_comment of blog_comments) {
      blog_comment.comment = await Model.QnaAnswer.find({ parent: blog_comment._id, coc: true }).populate('user').populate('bites')
    }

    res.render('admin/blog_detail', { title: 'Qna detail', blog: blog, blog_comments: blog_comments, url: 'qna' })
  } catch (error) {
    res.render('error', { error: error })
  }
}
// Qna-Answer create
exports.qna_comment_create = async (req, res, next) => {
  try {
    if (!req.body.id) { // Create
      var bites = req.body.bites ? req.body.bites : null
      var blog_comment = new Model.QnaAnswer({
        parent: req.body.parent,
        coc: req.body.coc,
        bites: bites,
        user: req.user.id,
        content: req.body.content
      })
      await blog_comment.save()
      res.redirect('/admin/qna/' + req.body.url)
    } else { // Update
      await Model.QnaAnswer.findByIdAndUpdate(req.body.id, { content: req.body.content })
      res.redirect('/admin/qna/' + req.body.url)
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}
// Qna-Answer delete
exports.qna_comment_delete = async (req, res, next) => {
  try {
    await Model.QnaAnswer.findByIdAndDelete(req.body.id)
    res.send('success')
  } catch (error) {
    res.render('error', { error: error })
  }
}


// Estimate-Response
exports.estimate_response_detail = async (req, res, next) => {
  try {
    var blog = await Model.EstimateResponse.findById(req.params.id).populate('user')    
    var blog_comments = await Model.Review.find({ parent: blog.user._id, coc: false }).populate('user')
    var files = await Model.File.find({ parent: blog.user })

    for (blog_comment of blog_comments) {
      blog_comment.comment = await Model.Review.find({ parent: blog_comment._id, coc: true }).populate('user').populate('bites')
    }
  
    res.render('estimate_response_detail', { title: 'Estimate response detail', blog: blog, files: files, blog_comments: blog_comments })
  } catch (error) {
    res.render('error', { error: error })
  }
}
// Review create
exports.estimate_review_create = async (req, res, next) => {
  try {
    if (!req.body.id) { // Create
      var bites = req.body.bites ? req.body.bites : null
      var blog_comment = new Model.Review({
        parent: req.body.parent,
        coc: req.body.coc,
        bites: bites,
        user: req.user.id,
        content: req.body.content,
        rating: req.body.rating
      })
      await blog_comment.save()

      res.redirect('/estimate/response/' + req.body.url)
    } else { // Update
      await Model.Review.findByIdAndUpdate(req.body.id, { content: req.body.content, rating: req.body.rating })
      res.redirect('/estimate/response/' + req.body.url)
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}
// Review delete
exports.estimate_review_delete = async (req, res, next) => {
  try {
    await Model.Review.findByIdAndDelete(req.body.id)
    res.send('success')
  } catch (error) {
    res.render('error', { error: error })
  }
}


// Mypage-Review
exports.mypage_review_list = async (req, res, next) => {
  try {
    var user = await Model.User.findById(req.user.id)
    
    if (user.account==='personal') {
      var blog_comments = await Model.Review.find({ user: user._id, coc: false }).populate('user')
    } 
    if (user.account==='business') {
      var blog_comments = await Model.Review.find({ parent: user._id, coc: false }).populate('user')
    }

    for (blog_comment of blog_comments) {
      blog_comment.comment = await Model.Review.find({ parent: blog_comment._id, coc: true }).populate('user').populate('bites')
    }

    res.render('user_review_list', { title: 'User review', blog_comments: blog_comments })
  } catch (error) {
    res.render('error', { error: error })
  }
}
// Review create
exports.mypage_review_create = async (req, res, next) => {
  try {
    if (!req.body.id) { // Create
      var bites = req.body.bites ? req.body.bites : null
      var blog_comment = new Model.Review({
        parent: req.body.parent,
        coc: req.body.coc,
        bites: bites,
        user: req.user.id,
        content: req.body.content
      })
      await blog_comment.save()
      res.redirect('/mypage/review/list')
    } else { // Update
      await Model.Review.findByIdAndUpdate(req.body.id, { content: req.body.content })
      res.redirect('/mypage/review/list')
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}
// Review delete
exports.mypage_review_delete = async (req, res, next) => {
  try {
    await Model.Review.findByIdAndDelete(req.body.id)
    res.send('success')
  } catch (error) {
    res.render('error', { error: error })
  }
}