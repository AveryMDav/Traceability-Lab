const submitBttn = document.querySelector('#submit-button');

submitBttn.addEventListener('click', submitAnimal);

function submitAnimal (){
    axios.post("http://localhost:4000/api/animals")
    .then(console.log('animal submitted'))
    .catch(err => console.log(err))
}