$('#summernote').summernote({
  height: 400,
  lang : 'ko-KR',
  placeholder: '',

  callbacks: {
    onImageUpload: function(files, editor, welEditable) {
      console.log('image upload:', files);
      sendFile(files[0], editor, welEditable);
    },
  }
});

function sendFile(file, editor, welEditable) {
  var fileField = document.querySelector('input[type="file"][multiple]')

  var form_data = new FormData()
  for (file of fileField.files) {
    form_data.append('my_files', file)
  }

  $.ajax({
    url: "/admin/summernote_ajax", 
    data: form_data,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',

    success: function(data) {
      for (src of data) {
        var image = $('<img>').attr('src', '/files/blog/' + src);
      
        $(image).attr('width','100%');
        $('#summernote').summernote("insertNode", image[0]); 
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + " " + errorThrown);
    }
  });
}