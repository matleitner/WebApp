const urlBase = "naosei.com"

window.onload = function(){

    // através do SeetAlert2 fazer uma espécie de pool de inscrição
    const btnregister = document.getElementById("btnRegister")
    if(btnregister){
            btnregister.addEventListener('click', () => {
            swal({
            title: "Incrição WebConference",
            html: '<input id="txtName" class="swal2-input" placeholder="name">'+ 
            '<input id="txtEmail" class="swal2-input" placeholder="e-mail">' ,
            
            showCancelButton: true,
            confirmButtonText: "Inscrever",
            cancelButtonText:"Cancelar",
            showLoaderOnConfirm: true,
            preConfirm:  async () => {
                const name= document.getElementById('txtName').value
                const email= document.getElementById('txtEmail').value
                const url_base = 'https://fcawebbook.herokuapp.com'
                return fetch(`${url_base}/conferences/1/participants/${email}`,{
                    headers: {"Content-Type" : "application/x-www-form-urlencoded"},
                    method: "POST",
                    body: `nomeparticipant=${name}`
                }).then(response => {
                    if(!response.ok){
                        throw new Error(response.statusText)
                    }
                    return response.json()
                    
                })
                .catch(error => {
                    swal.showValidationError(`Pedido falhou ${error}`)
                });
            },        
            allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
            if (result.value) {
                swal({title: "Inscrição feita com sucesso"})
            } else {
                swal({title : `${result.value.err_message}`})
            }
        });
    })
} 

// Auto preenchimento de Identificação de trabalhadores / colaboradores
(async () => {
    const renderAuthors = document.getElementById("renderAuthors")
    let txtAuthors = ""
    const response = await fetch(`${urlBase}/contributers/1/authors`)
    const authors = await response.json()
    
        for(const author of authors) {
            txtAuthors += `
                <div class="col-sm-4">
                    <div class="team-member">
                        <img src="${author.photo}" id="${author.idAuthor}" alt="" class="mx-auto rounded-circle viewAuthor">
                        <h4>${author.name}</h4>
                        <p class="text-muted">${author.job}</p>
                        <ul class="list-inline social-buttons">`
            if(author.twitter !==null){
                txtAuthors+= `
                <li class="list-inline-item"><a href="${author.twitter}"><i class="fab fa-twitter"></i></a></li>
                `
                } 
            if(author.facebook !==null){
                txtAuthors+= `
                <li class="list-inline-item"><a href="${author.facebook}"><i class="fab fa-facebook"></i></a></li>
                `
                } 
            if(author.linkedin !==null){
                txtAuthors+= `
                <li class="list-inline-item"><a href="${author.linkedin}"><i class="fab fa-linkedin"></i></a></li>
                `
                } 
                    
            txtAuthors+=  `</ul>
                </div>
            </div>`
    
        }
        renderAuthors.innerHTML = txtAuthors
        const btnView = document.getElementsByClassName("viewAuthor")
        for(let i = 0; i < btnView.length; i++){
            btnView[i].addEventListener("click", () => {
                console.log("NIGGER")
                for(const author of authors){
                    if(author.idAuthor == btnView[i].getAttribute("id")){
                        // Janela Modal 
                        swal({
                            title: author.name,
                            text: author.bio,
                            imageUrl: author.photo,
                            imageWidth: 400,
                            imageHeight: 400,
                            imageAlt: 'Foto do autor',
                            animation:false
                        })
                    }
                }
            })
        }
    })()
    

    // Sponsors 
    (async () => {
            const renderSponsors = document.getElementById("renderSponsors")
            let txtSponsors = ""
            const response = await fetch(`${urlBase}/contributers/1/sponsors`)
            const sponsors = await response.json()
        
            for(const sponsor of sponsors) {
                txtSponsors += `
                    <div class="col-sm-4">
                        <a href="${sponsor.link}" target="_blank">
                            <img class="img-fluid d-block mx-auto" src="${sponsor.logo}" alt="${sponsor.name}">
                        </a>
                    </div>
                    `
            
            }
            renderSponsors.innerHTML = txtSponsors
    }) ()


    // Envio de Mensagem 
    const constactForm = document.getElementById("contactForm")
    constactForm.addEventListener("submit", async () => {
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
        const response = await fetch(`${urlBase}/contacts/emails`, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            body: `email=${email}&name=${name}&subject=${message}`
        })
        const result = await response.json()
        if(result.value.success) {
            swal('Envio de mensagem', result.value.message.pt, 'success')
        } else {
            swal({title:'Envio de mensagem', text:'Mensagem não enviada', icon:'error'})
        }
    })
}

