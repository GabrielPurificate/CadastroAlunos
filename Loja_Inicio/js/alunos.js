import {BASEURL}from "./const.js";

function rowAluno(pAluno){
    return`
        <tr> 
            <td>${pAluno.id}</td>
            <td>${pAluno.nome} </td>
            <td>${pAluno.cr} </td>
            <td><button type="button" class="btn btn-primary btn-alterar" data-id=${pAluno.id}>Alterar</button> 
            <button type="button" class="btn btn-danger btn-excluir" data-id= ${pAluno.id}>Excluir</button></td>
        </tr>
    `;
}

function carregaAlunos(){
    const tabAluno= document.querySelector("tbody");
    tabAluno.innerHTML= "";
    fetch(`${BASEURL}/alunos`)
    .then(resultado =>resultado.json())
    .then(alunos => {
        alunos.forEach(aluno => {
            aluno.id=aluno.codigo;
            console.log(aluno)
            tabAluno.innerHTML+= rowAluno(aluno);
        });
       
        associaEventos();

    });
}

function associaEventos(){
    const frmAluno= document.querySelector("#frmAluno");
    frmAluno.onsubmit= async (e)=>{
        e.preventDefault();
        let formData= new FormData(e.target);
        let aluno= {}

        formData.forEach((value,key) => aluno[key]=value);
        if(frmAluno.dataset.id){
            aluno.id= frmAluno.dataset.id;
        }
        let dados= JSON.stringify(aluno);

        fetch(`${BASEURL}/alunos`,{
            headers:{
                "Content-Type" : "application/json"
            },
            method: "post",
            body:dados

        })
        .then(request => request.text())
        .then(resp => {
            if(resp.toUpperCase()== "OK"){
                window.location.reload();
                carregaAlunos();
            }else{
                alert("Erro ao enviar formulario"+resp);
            }   
        })
        
    }
    let btnsAlterar= document.querySelectorAll(".btn-alterar")
    btnsAlterar.forEach(btn=>{
        btn.onclick= (e) =>{
            let id= e.target.dataset.id;
            fetch(`${BASEURL}/alunos/${id}`)
            .then(res => res.json())
            .then(alunos =>{
                console.log(alunos[0])
                let aluno= alunos[0];
                let frmAluno= document.querySelector("#frmAluno");
                frmAluno.querySelector("#inpNome").value= aluno.nome;
                frmAluno.querySelector("#inpCR").value= aluno.cr;
                frmAluno.dataset.id=aluno.codigo;
                let cadastroAluno= document.querySelector("#frmCadastroAluno");
                $(cadastroAluno).modal("show");
 
            });
        }
    });
    let btnsExcluir= document.querySelectorAll(".btn-excluir");

    btnsExcluir.forEach(btn=>{
        btn.onclick= (e) =>{
            let id= e.target.dataset.id;
            let btnsExcluirModal=document.querySelector("#btnExcluirModal");
            btnsExcluirModal.dataset.id= e.target.dataset.id
            $("#frmExcluirAluno").modal("show");
            btnsExcluirModal.onclick=(e)=>{ 
                fetch(`${BASEURL}/alunos/${id}`,
                {
                 headers: {
                     "Content-Type": "application/json"
                 },
                 method: "DELETE"
                })
                .then(request => request.text())
                .then(resp=> {
                 if(resp.toUpperCase() =="OK"){
                     $("#frmExcluirAluno").modal("hide");
                     window.location.reload();
                 }

                })

            }
        }
    });

    

}

carregaAlunos();