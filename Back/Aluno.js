class Aluno{
    _id;
    _nome;
    _cr;

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;   
    }
    
    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }

    get cr() {
        return this._cr;
    }
    set cr(value) {
        this._cr = value;
    }

    constructor(pId, pNome, pCr){
        this.id = pId;
        this.nome = pNome;
        this.cr = pCr;
    }
}

export default Aluno;