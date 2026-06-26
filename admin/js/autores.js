let isNew = true
const frmSpeaker = document.getElementById("frmSpeaker")
frmSpeaker.addEventListener("submit", async (event) => {
    const response = await fetch(`${urlBase}/speakers`, {
        headers: {"Content-Type" : "application/x-www-form-urlencoded"},
        method: "POST",
        body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twitter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}`
    })
    const isNewSpeaker = await response.json()
    const newSpeakerID = response.headers.get("Location")
    const newUrl = `${urlBase}/helpdesk/1/authors/${newSpeakerID}`

    const response2 = await fetch(newUrl, { 
        headers: {"Content-Type" : "application/x-www-urlencoded"},
        method : "POST"
        })
    const isNewSpeaker2 = await response2.json()
    swal('Remoção da Inscrição', isRemoved.message.pt, (isRemoved.success) ? 'success' : 'error')
})


const renderAuthors = async () => {
    const urlBase = "https://fcawebbook.herokuapp.com"
    const tblAuthors = document.getElementById("tblAuthors")
    let strHtml = `
        <thread>
            <th>
                <th class="w-100 text-center bg-warning" colspan="4"></th>

            </th>
            <tr class="bg-info">
                <td class="w-2">#</td>
                <td class="w-50">Nome</td>
                <td class="w-38">Cargo</td>
                <td class="w-10">Ações</td>
            </tr>
        </trad><tbody>
    `
    const response = await fetch(`${urlBase}/helpdesk/1/author`)
    const authors = await response.json()
    const btnEdit = document.getElementsByClassName("edit")
    for(let i = 0; i < btnEdit.length; i++){
        btnEdit[i].addEventListener("click", () => {
            isNew = false
            for(const author of authors){
                if(author.idAuthor == btnEdit[i].getAttribute("id")){
                    document.getElementById("txtAuthorId").value = author.idAuthor
                    document.getElementById("txtName").value = nome
                    document.getElementById("txtJob").value = cargo
                    document.getElementById("txtPhoto").value = author.foto
                    document.getElementById("txtFacebook").value = author.facebook
                    document.getElementById("txtTwitter").value = author.twitter
                    document.getElementById("txtLinkedin").value = author.linkedin
                    document.getElementById("txtBio").value = author.bio

                    

                }

            }
        })
    }
    
    let i = 0
    for(const author of authors){
        strHtml += `                   
            <tr>
                <td>${i}</td>
                <td>${author.nome}</td>
                <td>${author.cargo}</td>
                <td>
                    <i id="${author.idAuthor}" clas="fas fa-edit-alt edit"></i>
                    <i id="${author.idAuthor}" clas="fas fa-trash-alt remove"></i></td>
            </tr>
        `
        i++
    }
    tblAuthors.innerHTML = strHtml  

    const btnDelete = document.getElementsByClassName("remove")
    for(let i = 0; i < btnDelete.length; i++){
        btnDelete[i].addEventListener("click", () => {
            swal({
                title: "Tem a certeza?",
                text: "Não será possível reverter a remoção!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Remover'
            
            }).then(async (result) => {
                if(result.value)
                    let authorID = btnDelete[i].getAttribute("id")
                    try{
                        const response = await fetch(`${urlBase}/helpdesk/1/author/${authorID}`, {method: "DELETE"})
                        const isRemoved = await response.json()
                        swal('Remoção da Inscrição', isRemoved.message.pt, (isRemoved.success) ? 'success' : 'error')
                        renderParticipants()
                    }
                    catch(err) {
                        swal({type: 'error', title:'Remoção de Inscrição', text:err})
                    }
                })
            })
    }
    let txtAuthorId = document.getElementById("txtAuthorId") 
    if(isNew){
        const response = await fetch(`${urlBase}/speakers/${txtAuthorId}`, {
        headers: {"Content-Type" : "application/x-www-form-urlencoded"},
        method: "POST",
        body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twitter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}`
    })
    } else{
        const response = await fetch(`${urlBase}/speakers/${txtAuthorID}`, {
        headers: {"Content-Type" : "application/x-www-form-urlencoded"},
        method: "PUT",
        body: `nome=${txtName}&cargo=${txtJob}&foto=${txtPhoto}&facebook=${txtFacebook}&twitter=${txtTwitter}&linkedin=${txtLinkedin}&bio=${txtBio}`
    })
        const newAuthor = await response.json()
    }
}

const lougOutBtn = document.getElementById("logout")
lougOutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("token")


})