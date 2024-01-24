let tHead = document.getElementById('tHead')
let tBody = document.getElementById('tBody')
let inputForm = document.getElementById('inputForm')
let editForm = document.getElementById('editForm')
let printDataBtn = document.getElementById('printData')
let loginBtn = document.getElementById('loginBtn')
let loginDiv = document.getElementById('loginDiv')
let searchBar = document.getElementById('searchBar')
let printSearchData = document.getElementById('printSearchData')

searchBar.addEventListener('input',async() => {
    let searchString = searchBar.value
    const getProducts = await fetch('http://localhost:3001/products')
    const allProducts = await getProducts.json()
    
    printSearchData.innerHTML = ''
    for(i in allProducts){
        if(allProducts[i]['product_name'].startsWith(searchString)){
            let listItem = document.createElement('li')
            for(key in allProducts[i]){
                listItem.innerHTML += allProducts[i][key]
            }
            printSearchData.appendChild(listItem)
        }
    }
})

printDataBtn.addEventListener('click',() => {

    tHead.innerHTML = ''
    tBody.innerHTML = ''
    inputForm.innerHTML = ''
    getAllProducts()
})

async function getAllProducts(){

    const getProducts = await fetch('http://localhost:3001/products')
    const allProducts = await getProducts.json()
    printTableData(allProducts)
    printInputForm(allProducts)
}

function printTableHeader(data){
    let tRow = document.createElement('tr')
    for(key in data[0]){
        let tH = document.createElement('th')
        tH.style.paddingLeft = '20px'
        tH.innerHTML = key 
        tRow.appendChild(tH)     
    }
    let editTh = document.createElement('th')
    editTh.innerHTML = 'Action' 
    editTh.style.paddingLeft = '20px'
    tRow.appendChild(editTh) 
    tHead.appendChild(tRow)
}

function printTableData(data){
    printTableHeader(data)
    for(i in data){
        let tRow = document.createElement('tr')
        for(key in data[i]){
            let td = document.createElement('td')
            td.style.paddingLeft = '20px'
            td.innerHTML = data[i][key]
            tRow.appendChild(td)
        }
        let editBtn = document.createElement('button')
        editBtn.innerHTML = 'Edit'
        editBtn.id =data[i]['id']
        //console.log(data[i])
        editBtn.addEventListener('click',() => { 
            for(i in data){
                if(data[i]['id'] == editBtn.id){
                    printEditForm(data[i])
                }
            }
        })
        tRow.appendChild(editBtn)
        let deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = 'Delete'
        deleteBtn.id =data[i]['id']
        //console.log(data[i])
        deleteBtn.addEventListener('click',() => { 
            deleteElement(deleteBtn.id)
        })
        tRow.appendChild(deleteBtn)
        tBody.appendChild(tRow)
    }
}

function printInputForm(data){

    for(key in data[0]){
        if(key !== 'id' && key !== 'createdAt' && key !== 'updatedAt'){
            let label = document.createElement('label')
            label.innerHTML = key
            let input = document.createElement('input')
            input.type = typeof(key)
            input.name = key
            input.id = key
            let br = document.createElement('br')
            inputForm.appendChild(label)
            inputForm.appendChild(input)
            inputForm.appendChild(br)
        }
        
    }
    let button = document.createElement('button')
    button.type = 'submit'
    button.innerHTML = 'Submit'
    inputForm.appendChild(button)
    inputForm.addEventListener('submit',(e) => {
        e.preventDefault()
        insertData()
    })
}

async function insertData(){
    const obj = {}
    for(let i = 0; i < inputForm.elements.length -1; i++){
        //console.log(inputForm.elements[i].id)
        let data = document.getElementById(inputForm.elements[i].id).value
        if(typeof(data) !== 'object'){
            obj[inputForm.elements[i].id] = data
        }  
    }

    try {
        const sendData = await fetch('http://localhost:3001/products',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(obj)
        })
        console.log(sendData)
    } catch (error) {
        console.log(error)
    }  
}

function printEditForm(data){

    for(key in data){
        if(key !== 'createdAt' && key !== 'updatedAt'){
            let label = document.createElement('label')
            label.innerHTML = key
            let input = document.createElement('input')
            input.type = typeof(key)
            input.name = key
            // if(key === 'id'){
            //     input.disabled = true
            // }
            input.value = data[key]
            input.id = key
            let br = document.createElement('br')
            editForm.appendChild(label)
            editForm.appendChild(input)
            editForm.appendChild(br)
        }
        
    }
    let button = document.createElement('button')
    button.type = 'submit'
    button.innerHTML = 'Submit'
    editForm.appendChild(button)
    editForm.addEventListener('submit',(e) => {
        e.preventDefault()
        insertEditData()
    })
}

async function insertEditData(){
    const formData = new FormData(editForm)
    newData = {}
    for([key,value] of formData){
        newData[key] = value
    }
    console.log(newData)

    try {
        const sendData = await fetch('http://localhost:3001/products',{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newData)
        })
        console.log(sendData)
        printTableData()
    } catch (error) {
        console.log(error)
    }  
}

async function deleteElement(id){
    let obj = {'id':id}
    try {
        const deleteReq = await fetch('http://localhost:3001/products',{
            method : 'DELETE',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(obj)
        })
        printTableData()
    } catch (error) {
        console.log(error)
    }
}
