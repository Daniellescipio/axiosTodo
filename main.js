axios.get("https://api.vschool.io/dscipio/todo")
    .then(response => {
        getJson(response)})
    .catch(error => console.log(error))


const htmlDoc = document.getElementsByTagName("body")[0]
htmlDoc.style.textAlign = "center"
htmlDoc.style.backgroundColor = "#66ff33"
const gridContainer = document.getElementById("listContainer")
const heading = document.createElement("h1")
const form = document.todoList
gridContainer.append(heading)
heading.textContent = "Your Todo List"

function getJson(arr){
    for(let i = 0; i < arr.data.length; i++){
        //const listItems = document.createElement("li")
        const listContainer = document.createElement("div")
        listContainer.style.display = "block"
        listContainer.style.border = "solid"
        listContainer.style.margin = "20px"
        listContainer.style.backgroundColor = "#00ccff"
        listContainer.style.textAlign = "center"
        htmlDoc.append(listContainer)
        const checkbox = checkboxFunction(listContainer, arr.data[i])
        const label = createLabel(listContainer, arr.data[i])
        const img = createImg(listContainer, arr.data[i])
        const price = displayPrice(listContainer, arr.data[i])
        const description = displayDescription(listContainer, arr.data[i])
        //htmlDoc.append(listItems)
        if(arr.data[i].completed === true){  
            listContainer.style.textDecoration = "line-through"
            checkbox.checked = true
         }
         
        const editButton = createEdit(listContainer)
        const deleteButton = createDelete(listContainer, arr)
    
        deleteButton.addEventListener("click", function(e){
            axios.delete(`https://api.vschool.io/dscipio/todo/${checkbox.name}`)
        })

        editButton.addEventListener("click", function(e){
            const arrayOfElements = []
            arrayOfElements.push(checkbox, label, img, price, description)
            for(let i = 0; i < 5; i++){
                const savedValues = arrayOfElements[i].id
                arrayOfElements[i].style.display = "none"
                arrayOfElements[i] = document.createElement("input")
                arrayOfElements[i].type = "textbox"
                arrayOfElements[i].value = savedValues
                listContainer.append(arrayOfElements[i])
                console.log(arrayOfElements[i])
            }
            const anotherEditButton = createanotherEdit()
            listContainer.append(anotherEditButton)
            
            anotherEditButton.addEventListener("click", function(e){
                e.preventDefault()
                const updatedTodo = {
                    title : arrayOfElements[1].value,
                    description : arrayOfElements[4].value,
                    price : arrayOfElements[3].value,
                    imgUrl : arrayOfElements[2].value,
                    completed : arrayOfElements[0].value
                    } 
                 axios.put(`https://api.vschool.io/dscipio/todo/${arr.data[i]._id}`, updatedTodo)
                     .then(response => {
                         getJson(response)
                         console.log(response)

                     })
                     .catch(error => console.log(error + arr.data[i]._id))
            })

        })

    
        checkbox.addEventListener("change", function(e){
            if(checkbox.checked){
            const updates = {
                completed : true
            }
            axios.put(`https://api.vschool.io/dscipio/todo/${checkbox.name}`, updates)
                .then(response => {
                    getJson(response)
                })
            }else{
            const updates = {
                completed : false
            }
            axios.put(`https://api.vschool.io/dscipio/todo/${checkbox.name}`, updates)
                .then(response => {
                    getJson(response)
                 })
            }

        })


        // const listItems = document.createElement("li")
        // const spotForImg = document.createElement("img")
        // htmlDoc.append(listItems)
        // htmlDoc.append(spotForImg)
        // listItems.textContent = arr.data[i].title
        // spotForImg.src = arr.data[i].imgUrl
        // spotForImg.height = "100"
        // spotForImg.width = "100"

   

    }

}


form.submit.addEventListener("click", function(e){
   const newTodo = {
       title : form.title.value,
       description : form.description.value,
       price : form.price.value,
       imgUrl : form.imgUrl.value

} 
    axios.post("https://api.vschool.io/dscipio/todo", newTodo)
        .then(results => {
            getJson(results)
        })
        .catch(error => console.log(error))
})




function displayPrice(htmlElement, todo){
        const todoPrice = document.createElement('p')
        todoPrice.textContent = `Price: ${todo.price}`
        todoPrice.id = todo.price
        htmlElement.append(todoPrice)
        todoPrice.style.position = "relative"
        todoPrice.style.top = "10px"
        //todoPrice.style.left = "10%"
        todoPrice.style.margin = "20px"
        return todoPrice
}

function displayDescription(htmlElement, arr){
    const todoDescription = document.createElement('p')
    todoDescription.textContent = `Description: ${arr.description}`
    todoDescription.id = arr.description
    htmlElement.append(todoDescription)
    return todoDescription
}

function checkboxFunction(htmlElement, arr){
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.id = arr.completed
    checkbox.name = arr._id
    htmlElement.append(checkbox)
    checkbox.style.position = "relative"
    checkbox.style.right = "20%"
    return checkbox

}
function createLabel(htmlElement, arr){
    const label = document.createElement("label")
    label.id = arr.title
    label.htmlFor = arr.completed
    label.appendChild(document.createTextNode(arr.title))
    htmlElement.append(label)
    label.style.fontSize = "30px"
    label.style.position = "relative"
    label.style.top = "-100px"
    label.style.left = "5%"
    label.style.margin = "20px"
    //label.style.right = "20%"
    return label
}

function createImg(htmlElement, arr){
    const spotForImg = document.createElement("img")
    spotForImg.src = arr.imgUrl
    spotForImgid = arr.imgUrl
    spotForImg.height = "100"
    spotForImg.width = "100"
    htmlElement.append(spotForImg)
    spotForImg.style.position = "relative"
    spotForImg.style.top = "50px"
    spotForImg.style.right = "10%"
    spotForImg.style.margin = "20px"
    return spotForImg
}
function createDelete(htmlElement, secondHTMLElement){
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "X"
    htmlElement.append(deleteButton)
    return deleteButton

}

function createEdit(htmlElement){
    const editButton = document.createElement("button")
    editButton.textContent = "EDIT"
    htmlElement.append(editButton)
    return editButton
}
function createanotherEdit(htmlElement, arr){
    const anotherEditButton = document.createElement("button")
    anotherEditButton.textContent = "CHANGE"
    return anotherEditButton
}




