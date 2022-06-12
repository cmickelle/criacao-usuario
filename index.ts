// importacao de bibliotecas
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile } from 'fs';

// Definicao de porta
const port = 5000

const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    const urlparse = url.parse(request.url ? request.url : '', true)

    var resposta;

    // Receber informacoes do usuario
    const params = parse(urlparse.search ? urlparse.search : '');

    // Criar - atualizar usuario
    if(urlparse.pathname == '/criar-atualizar-usuario'){
    
        // Salvar informações 
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
        if (err) throw err;
            console.log('Saved!');

            resposta  = 'Usuario criado com sucesso'

            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end(resposta);
        });
  }
});

// Execucao
server.listen( port, () =>{
    console.log(`Server runnig on ${port}`)
}

);

//localhost:5000/criar-atualizar-usuario?id=1&nome=teste