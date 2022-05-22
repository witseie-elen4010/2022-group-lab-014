let userName = ''

document.getElementById('user').addEventListener('input', function (e) {
  if ((e.data === null) && (userName.length !== 0)) {
    userName = userName.slice(0, -1)
  } else {
    userName = userName.concat(e.data)
  }
})

const button = document.getElementById('enter')

button.addEventListener('click', function () {
  const date = new Date()
  date.setHours(23, 59, 59, 99)
  const expires = '; expires=' + date.toGMTString()
  document.cookie = 'username=' + userName + expires + '; path=/; Secure'
  console.log(userName)
  window.location.replace('/')
}, false)
