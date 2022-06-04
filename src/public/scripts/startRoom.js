const joinGameBtn = document.getElementById('joinGameBtn')
const APIcode = 0
const APIinput = 0

joinGameBtn.addEventListener('click', function () {
  fetch('/api/userCode')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
    })
    .then(function (data) {
      APIinput = data
    })
    .catch(function (e) {
      console.log(e)
    })

  fetch('/api/Codes')
    .then(function (response) {
      if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
    })
    .then(function (data) {
      APIcode = data
    })
    .catch(function (e) {
      console.log(e)
    })

  if (APIinput === APIcode) {
    window.location.replace('/lobby')
    console.log(APIinput)
    console.log(APIcode)
  } else {
    alert('incorrect code:' + String(code))
  }
})
