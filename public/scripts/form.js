var form = document.querySelector('form')
var errors = document.getElementById('errors')

form.addEventListener('submit', handleSubmit)

async function handleSubmit(e) {
  e.preventDefault()
  errors.textContent = ''

  var formData = new FormData(form)

  if (document.getElementById('file_portfolio')) {
    var files = document.getElementById('file_portfolio').files
    
    for (file of files) {
      if (file.size > 5000000) {
        return alert('5MB 이하의 파일만 업로드할 수 있습니다.')
      } 
    }
  }

  var results = await fetch('/validity', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
  }).then(obj => obj.json())
  
  if (results.errors===null) {
    return form.submit()
  } 

  for (error of results.errors) {
    var li = document.createElement('li')
    li.textContent = error
    errors.appendChild(li)
    window.scrollTo(0,0)
  }
}
