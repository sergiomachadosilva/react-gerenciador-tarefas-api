const { v4: uuidv4 } = require('uuid');

let tarefas = [
    { id: '1', nome: 'Aprender React', concluida: true },
    { id: '2', nome: 'Estudar padrões de projetos', concluida: false },
    { id: '3', nome: 'Aprender Javascript', concluida: false },
    { id: '4', nome: 'Estudar React usando hooks', concluida: false },
    { id: '5', nome: 'Estudar hooks', concluida: false },
    { id: '6', nome: 'Lavar o carro', concluida: false }
];

function listarTarefaId(req, res) {
    const id = req.params.id
    const tarefa = tarefas.filter(tarefa => tarefa.id === id);

    if (tarefa.length === 0) {
        res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    res.json(tarefa[0]);
}

function listarTarefas(req, res) {
    const pagina = req.query['page'] || 1;
    const ordem = req.query['order']; // ASC, DESC
    const filtroTarefa = req.query['filter'];
    const itenPorPagina = req.query['pagesize'] || 3;
    let tarefasRetornar = tarefas.slice(0); // cópia do array tarefas

    //filtrar
    if (filtroTarefa) {
        tarefasRetornar = tarefasRetornar.filter(
            t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) >= 0
        );
    }

    //ordenar
    if (ordem === 'ASC') {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);
    } else if (ordem === 'DESC') {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);
    }

    //retornar
    res.json({
        pagina: pagina,
        totalItens: tarefasRetornar.length,
        tarefas: tarefasRetornar.slice(0).splice((pagina - 1) * itenPorPagina, itenPorPagina)
    });
}

function cadastrarTarefa(req, res) {
    if (!req.body['nome'] && !req.body['concluida']) {
        res.status(400).json({ erro: 'Requisição inválida' })
    }

    // let maxId = tarefas.slice(0).reduce(function (a, b) {
    //     let maior = (a.id, b.id)
    //     return parseInt(maior) + 1;
    // });

    const tarefa = {
        id: uuidv4(),
        nome: req.body.nome,
        concluida: req.body.concluida
    }

    tarefas.push(tarefa)

    res.json({
        message: 'Tarefa cadastrada com sucesso',
        tarefa: tarefa
    })
}

function atualizarTarefa(req, res) {
    if (!req.body['nome'] && !req.body['concluida']) {
        res.status(400).json({ erro: 'Requisição inválida' });
    }

    const id = req.params.id;
    let tarefAtualizada = false;

    tarefa = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.nome = req.body['nome']
            tarefa.concluida = req.body['concluida']
            tarefAtualizada = true
        }
        return tarefa
    });

    if (!tarefAtualizada) {
        res.status(404).json({ erro: 'Tarefa não encontrada' })
    }

    res.json({
        message: 'Tarefa atualizada com sucesso',
        id: id,
        nome: req.body['nome'],
        concluida: req.body['concluida']
    })
}

function removerTarefa(req, res) {
    const id = req.params.id;
    const numTarefas = tarefas.length;
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    if (numTarefas === tarefas.length) {
        res.status(404).json({ erro: 'Tarefa não encontrada' })
    }
    res.json({ message: 'Tarefa removida com sucesso!' })
}

function concluirTarefa(req, res) {
    const id = req.params.id;
    let tarefaConcluida = false;
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.concluida = true;
            tarefaConcluida = true;
        }
        return tarefa;
    });
    if (!tarefaConcluida) {
        res.status(404).json({ erro: 'Tarefa não encontra.' })
    }

    res.json({message: 'Tarefa concluída com sucesso.'})
}

module.exports = {
    listarTarefaId,
    listarTarefas,
    cadastrarTarefa,
    atualizarTarefa,
    removerTarefa,
    concluirTarefa
}