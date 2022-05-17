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
  var date = new Date();
  date.setHours(23,59,59,99);
  var expires = "; expires="+date.toGMTString();
  document.cookie = 'username=' + userName + expires + '; path=/; Secure'
  console.log(userName)
}, false)



