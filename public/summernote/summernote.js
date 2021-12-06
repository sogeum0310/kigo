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
  data = new FormData();
  data.append("file", file);

  $.ajax({
    url: "/admin/summernote_ajax", 
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    type: 'POST',

    success: function(data) {
      var image = $('<img>').attr('src', '' + data);
      $(image).attr('width','100%');
      $('#summernote').summernote("insertNode", image[0]); 
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + " " + errorThrown);
    }
  });
}