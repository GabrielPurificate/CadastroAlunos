import express from "express";
import cors from "cors";
import {connection, executeQuery} from "./Database.js";

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());

let port = process.env.PORT || 3000;

app.get("/alunos", (req, res) => {
    executeQuery("SELECT * FROM ALUNO",[],(err, result) => {
        if(err){        
            console.log(err);
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

app.get("/alunos/:id", (req, res) => {
    executeQuery("SELECT * FROM ALUNO WHERE CODIGO =? ",[req.params.id],(err, result) => {
        if(err){        
            console.log(err);
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

app.post("/alunos", (req, res) => {
    let sql= "INSERT INTO ALUNO(NOME,CR) VALUES(?,?)";
    console.log(req.body)
  
    if(!req.body.id){   
        executeQuery(sql,[req.body.nome, req.body.cr], (err,result) =>{
            
            if(err){
                console.log(err)
                return res.status(500).json(err);
            }else{
                
                return res.status(201).send("OK")
            }
        } )
    }else{
        sql= "UPDATE ALUNO SET NOME=?, CR=? WHERE CODIGO=?"
        executeQuery(sql,[req.body.nome, req.body.cr, req.body.id], (err,result) =>{
            
            if(err){
                console.log(err)
                return res.status(500).json(err);
            }else{
                
                return res.status(201).send("OK")
            }
        } )

    }
});

app.delete("/alunos/:id", (req, res) => {
    executeQuery("DELETE FROM ALUNO WHERE CODIGO =? ",[req.params.id],(err, result) => {
       
        if(err){        
            console.log(err);
            return res.status(500).json(err);
        } else {
            return res.status(200).send("OK");
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
