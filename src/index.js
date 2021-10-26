BASE_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    getDogs();
});

function getDogs(){
    fetch(BASE_URL)
    .then(res=> res.json())
    .then(dogs=>showDogs(dogs))
}

function showDogs(dogs){
    console.log(dogs)
    dogs.forEach(dog => showDog(dog))
}

function showDog(dog){
    dogTable = document.getElementById('table-body')
    dogRow = document.createElement('tr')

    dogName = document.createElement('td')
    dogName.innerText = dog.name
    dogBreed = document.createElement('td')
    dogBreed.innerText = dog.breed
    dogSex = document.createElement('td')
    dogSex.innerText = dog.sex
    dogEdit = document.createElement('button')
    dogEdit.innerText = 'Edit Dog'
    dogEdit.addEventListener('click', event => {
        event.preventDefault()
        editDog(dog)
    })

    dogRow.appendChild(dogName)
    dogRow.appendChild(dogBreed)
    dogRow.appendChild(dogSex)
    dogRow.appendChild(dogEdit)
    dogTable.appendChild(dogRow)
}
// auto-populate form with dog info for editing
function editDog(dog){
    console.log(dog)
    const editName = document.forms[0].elements[0]
    editName.value = dog.name
    const editBreed = document.forms[0].elements[1]
    editBreed.value = dog.breed
    const editSex = document.forms[0].elements[2]
    editSex.value = dog.sex

    const dogForm = document.getElementById('dog-form')
    dogForm.addEventListener('submit', event => {
        event.preventDefault()
        updateDog(event, dog)
    })
}

function updateDog(event, dog){
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                dog_id: dog.id,
                name: event.target[0].value, 
                breed: event.target[1].value,
                sex: event.target[2].value,
            })
        })
        .then(res=>res.json())
        .then(fetchDog())
        .catch(err=>console.log(err))
}

function fetchDog(){
    fetch(BASE_URL, {
        method: "GET"
    })
    .then(res=>res.json())
    .then(dogs=>dogs.forEach(showDog))
    .catch(err=>console.log(err))
}