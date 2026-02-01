// Servidor Node.js com persistência em arquivo JSON

const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const PORT = process.env.PORT || 3000;

// Nome do arquivo de dados
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware para servir arquivos estáticos e parsear JSON
app.use(express.static(__dirname));
app.use(express.json());

// Função para ler dados do arquivo JSON
async function lerDados() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Se arquivo não existe, cria estrutura inicial
        if (error.code === 'ENOENT') {
            const dadosIniciais = {
                contas: [],
                entradas: [],
                config: {},
                ultimaAtualizacao: new Date().toISOString()
            };
            await salvarDados(dadosIniciais);
            return dadosIniciais;
        }
        throw error;
    }
}

// Função para salvar dados no arquivo JSON
async function salvarDados(dados) {
    dados.ultimaAtualizacao = new Date().toISOString();
    await fs.writeFile(DATA_FILE, JSON.stringify(dados, null, 2), 'utf8');
}

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API ENDPOINTS PARA PERSISTÊNCIA DE DADOS

// GET - Obter todos os dados
app.get('/api/dados', async (req, res) => {
    try {
        const dados = await lerDados();
        res.json(dados);
    } catch (error) {
        console.error('Erro ao ler dados:', error);
        res.status(500).json({ error: 'Erro ao ler dados' });
    }
});

// GET - Obter apenas contas
app.get('/api/contas', async (req, res) => {
    try {
        const dados = await lerDados();
        res.json(dados.contas || []);
    } catch (error) {
        console.error('Erro ao ler contas:', error);
        res.status(500).json({ error: 'Erro ao ler contas' });
    }
});

// POST - Salvar contas
app.post('/api/contas', async (req, res) => {
    try {
        const dados = await lerDados();
        dados.contas = req.body;
        await salvarDados(dados);
        res.json({ success: true, message: 'Contas salvas com sucesso' });
    } catch (error) {
        console.error('Erro ao salvar contas:', error);
        res.status(500).json({ error: 'Erro ao salvar contas' });
    }
});

// GET - Obter apenas entradas
app.get('/api/entradas', async (req, res) => {
    try {
        const dados = await lerDados();
        res.json(dados.entradas || []);
    } catch (error) {
        console.error('Erro ao ler entradas:', error);
        res.status(500).json({ error: 'Erro ao ler entradas' });
    }
});

// POST - Salvar entradas
app.post('/api/entradas', async (req, res) => {
    try {
        const dados = await lerDados();
        dados.entradas = req.body;
        await salvarDados(dados);
        res.json({ success: true, message: 'Entradas salvas com sucesso' });
    } catch (error) {
        console.error('Erro ao salvar entradas:', error);
        res.status(500).json({ error: 'Erro ao salvar entradas' });
    }
});

// POST - Salvar todos os dados de uma vez
app.post('/api/dados', async (req, res) => {
    try {
        await salvarDados(req.body);
        res.json({ success: true, message: 'Dados salvos com sucesso' });
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        res.status(500).json({ error: 'Erro ao salvar dados' });
    }
});

// API endpoints existentes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        persistence: 'JSON file'
    });
});

app.get('/api/config', (req, res) => {
    res.json({
        appName: 'Controle Financeiro Comercial',
        version: '1.0.0',
        environment: 'development',
        persistence: 'JSON file',
        features: {
            api: true,
            export: true,
            reports: true,
            localStorage: 'cache'
        }
    });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    🚀 Servidor iniciado com persistência JSON!              ║
║                                                              ║
║    Acesso local: http://localhost:${PORT}                      ║
║    Acesso na rede: http://SEU_IP_LOCAL:${PORT}              ║
║                                                              ║
║    📁 Arquivo de dados: data.json                           ║
║    💾 Persistência: Arquivo JSON                             ║
║                                                              ║
║    Para descobrir seu IP local:                             ║
║    Windows: ipconfig                                        ║
║    Linux/Mac: ifconfig ou ip addr                           ║
║                                                              ║
║    Pressione Ctrl+C para parar o servidor                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
});

// Exportar para uso em testes
module.exports = app;
