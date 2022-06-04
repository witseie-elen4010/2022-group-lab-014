const newGameBtn = document.getElementById('newGameBtn')
const joinGameBtn = document.getElementById('joinGameBtn')
let APIcode = 0
let APIinput=0

// fetch('/api/gameCode')
//   .then(function (response) {
//     if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
//   })
//   .then(function (data) {
//     code = data
//   })
//   .catch(function (e) {
//     console.log(e)
//     // alert(e)
//     })

newGameBtn.addEventListener('click', function () {
    window.location.replace('/lobby')
})


//apinput =0
//apicode = 0
//not sure whjy 
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
      // alert(e)
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
      // alert(e)
    })

    if(APIinput==APIcode){
        window.location.replace('/lobby')
        console.log(APIinput)
        console.log(APIcode)
    }
    else{
    alert("incorrect code:"+String(code))
    }

})
  