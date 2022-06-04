let allValid = []

fetch('/api/isValid')
.then(function (response) {
  if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
})
.then(function (data) {
  allValid = allValid.concat(data)
})
.catch(function (e) {
  console.log(e)
  // alert(e)
})

function isValid (word) {
  console.log(answer)
  return allValid.includes(word.toLowerCase())
}

let word=""
const enter=document.getElementById('enter')

// enter.addEventListener('click',function(){
fetch('/api/fetchGuessWord')
.then(function (response) {
  if (response.ok) { return response.json() } else { throw 'Failed to retrieve word: response code invalid!' }
})
.then(function (data) {
  word = data
  console.log(word)
  if (isValid(word)) {
    console.log(word)
  } else {
    alert('Your word is invalid.')
  }
})
.catch(function (e) {
  console.log(e)
})

