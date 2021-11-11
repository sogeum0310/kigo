var form = document.querySelector('form')
var errors = document.getElementById('errors')

form.addEventListener('submit', handleSubmit)

async function handleSubmit(e) {
  e.preventDefault()
  errors.textContent = ''

  var formData = new FormData(form)

  var results = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
  }).then(obj => obj.text())
  
  if (results==='success') {
    return form.submit()
  } 

  for (error of JSON.parse(results)) {
    var li = document.createElement('li')
    li.textContent = error
    errors.appendChild(li)
  }
}