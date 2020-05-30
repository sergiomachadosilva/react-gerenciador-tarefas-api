const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    listarTarefaId,
    listarTarefas,
    cadastrarTarefa,
    atualizarTarefa,
    removerTarefa,
    concluirTarefa
} = require('./controller/gerenciador-tarefas.js');

const app = express();
const port = 3001;

app.use(cors())
app.use(bodyParser.json());


app.get('/tarefas', listarTarefas);
app.get('/tarefas/:id', listarTarefaId);
app.post('/tarefas', cadastrarTarefa);
app.put('/tarefas/:id', atualizarTarefa);
app.delete('/tarefas/:id', removerTarefa);
app.put('/tarefas/:id/concluir', concluirTarefa);



app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));
