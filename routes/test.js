  // Convert the genre to an array.
(req, res, next) => {
  if(!(req.body.genre instanceof Array)){
      if(typeof req.body.genre==='undefined')
      req.body.genre=[];
      else
      req.body.genre=new Array(req.body.genre);
  }
  next();
},

// Process request after validation and sanitization.
(req, res, next) => {
      
  // Create a Book object with escaped and trimmed data.
  var book = new Book(
    { title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
      });

  // Data from form is valid. Save book.
  book.save(function (err) {
      if (err) { return next(err); }
          // Successful - redirect to new book record.
          res.redirect(book.url);
      });

}





// Convert the genre to an array.
(req, res, next) => {
    if(!(req.body.genre instanceof Array)){
        if(typeof req.body.genre==='undefined')
        req.body.genre=[];
        else
        req.body.genre=new Array(req.body.genre);
    }
    next();
},
// Process request after validation and sanitization.
(req, res, next) => {

// Create a Book object with escaped/trimmed data and old id.
var book = new Book(
  { title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
    _id:req.params.id // This is required, or a new ID will be assigned!
    });

    // Data from form is valid. Update the record.
    Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
        if (err) { return next(err); }
            // Successful - redirect to book detail page.
            res.redirect(thebook.url);
        });

}
