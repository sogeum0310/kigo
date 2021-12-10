var form = document.querySelector('form')

// For create or update the comment
function createItem(parent, id, bites, coc) {
  // Fill input in the form
  document.querySelector('#parent').value = parent
  document.querySelector('#id').value = id
  document.querySelector('#bites').value = bites
  document.querySelector('#coc').value = coc
  // Fill textarea in the form
  var content = document.querySelector('#content-' + id) ? document.querySelector('#content-' + id).textContent : ''
  document.querySelector('textarea').textContent = content
}

// For delete the comment
async function deleteItem(id) {
  var res = confirm('제출하시겠습니까?')
  if (res===false) {
    return; 
  }
  // Send to server
  var results = await fetch(deleteUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'id=' + id
  }).then(res => res.text())
  // Visually hidden
  document.getElementById('item-' + id).style.display = 'none'
}

// /community/comment/delete
// /estimate/review/delete
// /admin/qna/comment/delete
// /mypage/review/delete