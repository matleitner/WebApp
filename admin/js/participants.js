const renderParticipants = async () => {
    const urlBase = "https://fcawebbook.herokuapp.com"
    const tblParticipants = document.getElementById("tblParticipants")
    let strHtml = `
        <thread>
            <th>
                <th class="w-100 text-center bg-warning" colspan="4"></th>

            </th>
            <tr class="bg-info">
                <td class="w-2">#</td>
                <td class="w-50">Nome</td>
                <td class="w-38">E-mail</td>
                <td class="w-10">Ações</td>
            </tr>
        </trad><tbody>
    `
    const response = await fetch(`${urlBase}/helpdesk/1/participants`)
    const participants = await response.json()

    let i = 0
    for(const participant of participants){
        strHtml += `                   
            <tr>
                <td>${i}</td>
                <td>${participant.nomeParticipante}</td>
                <td>${participant.ifParticipant}</td>
                <td><i id="${participant.nomeParticipante}" clas="fas fa-trash-alt remove"></i></td>
            </tr>
        `
        i++
    }
    tblParticipants.innerHTML = strHtml  
}

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
                let participantID = btnDelete[i].getAttribute("id")
                try{
                    const response = await fetch(`${urlBase}/helpdesk/1/participants/${participantID}`, {method: "DELETE"})
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