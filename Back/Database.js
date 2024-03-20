import firebird from "node-firebird";

const dbOptions = {
    host: "127.0.0.1",
    port: 3050,
    database:"C:\\IFF\\CadastroAlunos-main\\Back\\Banco\\ALUNO.FDB",
    user:"SYSDBA",
    password:"masterkey",
    lowercase_keys: true,
    role: null,
    pageSize: 4096,
    enconding: "UTF-8",
    blobAsText: true
};

function connection(){
    firebird.attach(dbOptions, (err, db) => {
        if(err){
            console.log(err);
        }

        db.query("SELECT * FROM ALUNO",[], (err, result) => {
            db.detach();
            if(err){
                console.log(err);
            } else {
                console.log(result);
            }
        });      
        
    });
}

function executeQuery(sql, params, callback){

    firebird.attach(dbOptions, (err, db) => {
        if(err){
            console.log(err);
        }

        db.query(sql,params, (err, result) => {
            db.detach();
            if(err){
                return callback(err,[]);
            } else {
                return callback(undefined, result);
            }
        });      
        
    });

}

export {connection, executeQuery};
