const Model = require('../models/model')


exports.community_list = async (req, res, next) => {
  var blogs = await Model.Community.find()
  res.render('community_list', { title: 'Community list', blogs: blogs })
}

exports.community_create_get = async (req, res, next) => {
  res.render('community_form', { title: 'Community create' })
}

exports.community_create_post = async (req, res, next) => {
  var blog = new Model.Community({
    user: req.session.user._id,
    title: req.body.title,
    content: req.body.content
  })
  await blog.save()

  var message = 'successfully posted'
  var url = '/community/list'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}

exports.community_detail = async (req, res, next) => {
  try {
  var blog = await Model.Community.findById(req.params.id)
  var blog_comments = await Model.CommunityComment.find({ parent: req.params.id })
  res.render('community_detail', { title: 'Community detail', blog: blog, blog_comments: blog_comments })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.community_update_get = async (req, res, next) => {
  var blog = await Model.Community.findById(req.params.id)
  res.render('community_form', { title: 'Community form update', blog: blog })
}

exports.community_update_post = async (req, res, next) => {
  var blog = new Model.Community({
    title: req.body.title,
    content: req.body.content,
    _id: req.params.id
  })
  await Model.Community.findByIdAndUpdate(req.params.id, blog)

  var message = 'successfully updated'
  var url = '/community/' + req.params.id
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}

// Community comments
exports.blog_comment_create = async (req, res, next) => {
  try {
    var blog_comment = new Model.CommunityComment({
      parent: req.body.blog,
      user: req.session.user._id,
      content: req.body.content
    })

    await blog_comment.save()

    res.redirect('/community/' + req.body.blog)
  } catch (error) {
    console.log(error)
  }
}

exports.blog_comment_update = async (req, res, next) => {
  try {
    await Model.CommunityComment.findByIdAndUpdate(req.body.id, { content: req.body.content })
    res.send(req.body.content)
  } catch (error) {
    console.log(error)
  }
}

exports.blog_comment_delete = async (req, res, next) => {
  try {
    await Model.CommunityComment.findByIdAndDelete(req.body.id)
    res.send('success')
  } catch (error) {
    console.log(error)
  }
}