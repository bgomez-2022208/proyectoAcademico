const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.alumnosPath = '/api/alumnos';
        this.maestrosPath = '/api/maestros';
        this.cursoPath = '/api/curso';
        this.login = '/api/auth';
        this.joinPath = '/api/join';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.joinPath, require('../routes/join.routes'));
        this.app.use(this.alumnosPath, require('../routes/alum.routes'));
        this.app.use(this.maestrosPath, require('../routes/teach.routes'));
        this.app.use(this.cursoPath, require('../routes/curso.routes'));
        this.app.use(this.login, require('../routes/auth.routes'));

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose y esacuchando el puerto', this.port)
        });
    }
}

module.exports = Server;