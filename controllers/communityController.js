const Model = require('../models/model')


// Community list
exports.community_list = async (req, res, next) => {
  try {
    var blogs = await Model.Community.find()
    res.render('community_list', { title: 'Community list', blogs: blogs })
  } catch (error) {
    console.log(error)
  }
}

// Community create
exports.community_create_get = async (req, res, next) => {
  try {
    res.render('community_form', { title: 'Community create' })
  } catch (error) {
    console.log(error)
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

    var message = 'successfully posted'
    var url = '/community/list'
    res.redirect(`/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    console.log(error)
  }
}

// Community update
exports.community_update_get = async (req, res, next) => {
  try {
    var blog = await Model.Community.findById(req.params.id)
    res.render('community_form', { title: 'Community form update', blog: blog })
  } catch (error) {
    console.log(error)
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

    var message = 'successfully updated'
    var url = '/community/' + req.params.id
    res.redirect(`/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    console.log(error)
  }
}
