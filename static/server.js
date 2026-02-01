// Servidor Node.js com persistência em banco de dados SQLite

const express = require('express');
const path = require('path');
const database = require('./database.js');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos e parsear JSON
app.use(express.static(__dirname));
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API ENDPOINTS PARA PERSISTÊNCIA DE DADOS COM SQLITE

// GET - Obter todos os dados
app.get('/api/dados', async (req, res) => {
    try {
        const dados = await database.getAllData();
        res.json(dados);
    } catch (error) {
        console.error('Erro ao ler dados do SQLite:', error);
        res.status(500).json({ error: 'Erro ao ler dados do banco de dados' });
    }
});

// GET - Obter apenas contas
app.get('/api/contas', async (req, res) => {
    try {
        const contas = await database.getContas();
        res.json(contas);
    } catch (error) {
        console.error('Erro ao ler contas do SQLite:', error);
        res.status(500).json({ error: 'Erro ao ler contas do banco de dados' });
    }
});

// POST - Salvar contas
app.post('/api/contas', async (req, res) => {
    try {
        await database.saveContas(req.body);
        res.json({ success: true, message: 'Contas salvas com sucesso no SQLite' });
    } catch (error) {
        console.error('Erro ao salvar contas no SQLite:', error);
        res.status(500).json({ error: 'Erro ao salvar contas no banco de dados' });
    }
});

// GET - Obter apenas entradas
app.get('/api/entradas', async (req, res) => {
    try {
        const entradas = await database.getEntradas();
        res.json(entradas);
    } catch (error) {
        console.error('Erro ao ler entradas do SQLite:', error);
        res.status(500).json({ error: 'Erro ao ler entradas do banco de dados' });
    }
});

// POST - Salvar entradas
app.post('/api/entradas', async (req, res) => {
    try {
        await database.saveEntradas(req.body);
        res.json({ success: true, message: 'Entradas salvas com sucesso no SQLite' });
    } catch (error) {
        console.error('Erro ao salvar entradas no SQLite:', error);
        res.status(500).json({ error: 'Erro ao salvar entradas no banco de dados' });
    }
});

// POST - Salvar todos os dados de uma vez
app.post('/api/dados', async (req, res) => {
    try {
        await database.saveAllData(req.body);
        res.json({ success: true, message: 'Dados salvos com sucesso no SQLite' });
    } catch (error) {
        console.error('Erro ao salvar dados no SQLite:', error);
        res.status(500).json({ error: 'Erro ao salvar dados no banco de dados' });
    }
});

// GET - Estatísticas do banco de dados
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await database.getStats();
        res.json(stats);
    } catch (error) {
        console.error('Erro ao obter estatísticas:', error);
        res.status(500).json({ error: 'Erro ao obter estatísticas do banco' });
    }
});

// POST - Backup do banco de dados
app.post('/api/backup', async (req, res) => {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(__dirname, `backup_${timestamp}.db`);
        
        await database.backup(backupPath);
        res.json({ 
            success: true, 
            message: 'Backup criado com sucesso',
            backupPath: backupPath
        });
    } catch (error) {
        console.error('Erro ao criar backup:', error);
        res.status(500).json({ error: 'Erro ao criar backup do banco' });
    }
});

// API endpoints existentes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        persistence: 'SQLite Database'
    });
});

app.get('/api/config', (req, res) => {
    res.json({
        appName: 'Controle Financeiro Comercial',
        version: '1.0.0',
        environment: 'development',
        persistence: 'SQLite Database',
        database: 'financeiro.db',
        features: {
            api: true,
            export: true,
            reports: true,
            backup: true,
            localStorage: 'disabled'
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
║    🚀 Servidor iniciado com persistência SQLite!            ║
║                                                              ║
║    Acesso local: http://localhost:${PORT}                      ║
║    Acesso na rede: http://SEU_IP_LOCAL:${PORT}              ║
║                                                              ║
║    📁 Banco de dados: financeiro.db                         ║
║    💾 Persistência: SQLite Database                          ║
║    🔒 Segurança: Dados persistem após limpar navegador       ║
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

// Tratamento para fechar o banco de dados ao encerrar o servidor
process.on('SIGINT', () => {
    console.log('\n📁 Fechando conexão com o banco de dados...');
    database.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n📁 Fechando conexão com o banco de dados...');
    database.close();
    process.exit(0);
});

// Exportar para uso em testes
module.exports = app;
