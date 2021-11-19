const Model = require('../models/model')


// Community list
exports.community_list = async (req, res, next) => {
  try {
    var blogs = await Model.Community.find()
    res.render('community_list', { title: 'Community list', blogs: blogs })
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Community create
exports.community_create_get = async (req, res, next) => {
  try {
    res.render('community_form', { title: 'Community create' })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.community_create_post = async (req, res, next) => {
  try {
    var blog = new Model.Community({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content
    })
    await blog.save()

    res.redirect('/community/' + blog._id)
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Community update
exports.community_update_get = async (req, res, next) => {
  try {
    var blog = await Model.Community.findById(req.params.id)
    res.render('community_form', { title: 'Community form update', blog: blog })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.community_update_post = async (req, res, next) => {
  try {
    var blog = new Model.Community({
      title: req.body.title,
      content: req.body.content,
      _id: req.params.id
    })
    await Model.Community.findByIdAndUpdate(req.params.id, blog)

    res.redirect('/community/' + req.params.id)
  } catch (error) {
    res.render('error', { error: error })
  }
}
