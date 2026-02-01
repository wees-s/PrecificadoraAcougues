// Sistema de armazenamento com API Python e arquivos JSON

class StorageManager {
    constructor() {
        // URL base da API (porta 5000 para Python)
        this.apiBaseUrl = window.location.origin.includes(':3000') 
            ? 'http://localhost:5000' 
            : window.location.origin;
        
        // Cache temporário em memória (não persiste)
        this.memoryCache = {
            contas: null,
            entradas: null,
            timestamp: null
        };
        
        // Cache duration em milissegundos (2 minutos)
        this.cacheDuration = 2 * 60 * 1000;
    }

    // Verificar se o cache em memória é válido
    isCacheValid() {
        return this.memoryCache.timestamp && 
               (Date.now() - this.memoryCache.timestamp) < this.cacheDuration;
    }

    // Atualizar cache em memória
    updateMemoryCache(contas, entradas) {
        this.memoryCache = {
            contas: contas,
            entradas: entradas,
            timestamp: Date.now()
        };
    }

    // Função genérica para fazer requisições à API
    async apiRequest(endpoint, method = 'GET', data = null) {
        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            if (data && method !== 'GET') {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(`${this.apiBaseUrl}/api${endpoint}`, options);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição API ${endpoint}:`, error);
            throw error;
        }
    }

    // Carregar contas da API (com cache em memória)
    async carregarContas() {
        try {
            // Tentar usar cache em memória primeiro
            if (this.isCacheValid() && this.memoryCache.contas) {
                console.log('📋 Usando cache em memória para contas');
                return this.memoryCache.contas;
            }

            // Carregar da API
            console.log('🔄 Carregando contas da API JSON...');
            const contas = await this.apiRequest('/contas');
            
            // Atualizar cache
            if (this.isCacheValid()) {
                this.memoryCache.contas = contas;
            }
            
            return contas;
        } catch (error) {
            console.error('❌ Falha ao carregar contas da API:', error);
            
            // Tentar usar cache antigo se disponível
            if (this.memoryCache.contas) {
                console.warn('⚠️ Usando cache antigo de contas (offline)');
                return this.memoryCache.contas;
            }
            
            // Retornar array vazio se não houver cache
            console.warn('📭 Nenhum dado disponível, retornando array vazio');
            return [];
        }
    }

    // Salvar contas na API
    async salvarContas(contas) {
        try {
            console.log('💾 Salvando contas em arquivos JSON...');
            const resultado = await this.apiRequest('/contas', 'POST', contas);
            
            // Atualizar cache em memória
            if (this.isCacheValid()) {
                this.memoryCache.contas = contas;
            }
            
            console.log('✅ Contas salvas com sucesso em JSON');
            return true;
        } catch (error) {
            console.error('❌ Erro ao salvar contas em JSON:', error);
            return false;
        }
    }

    // Carregar entradas da API (com cache em memória)
    async carregarEntradas() {
        try {
            // Tentar usar cache em memória primeiro
            if (this.isCacheValid() && this.memoryCache.entradas) {
                console.log('💰 Usando cache em memória para entradas');
                return this.memoryCache.entradas;
            }

            // Carregar da API
            console.log('🔄 Carregando entradas da API JSON...');
            const entradas = await this.apiRequest('/entradas');
            
            // Atualizar cache
            if (this.isCacheValid()) {
                this.memoryCache.entradas = entradas;
            }
            
            return entradas;
        } catch (error) {
            console.error('❌ Falha ao carregar entradas da API:', error);
            
            // Tentar usar cache antigo se disponível
            if (this.memoryCache.entradas) {
                console.warn('⚠️ Usando cache antigo de entradas (offline)');
                return this.memoryCache.entradas;
            }
            
            // Retornar array vazio se não houver cache
            console.warn('📭 Nenhum dado disponível, retornando array vazio');
            return [];
        }
    }

    // Salvar entradas na API
    async salvarEntradas(entradas) {
        try {
            console.log('💾 Salvando entradas em arquivos JSON...');
            const resultado = await this.apiRequest('/entradas', 'POST', entradas);
            
            // Atualizar cache em memória
            if (this.isCacheValid()) {
                this.memoryCache.entradas = entradas;
            }
            
            console.log('✅ Entradas salvas com sucesso em JSON');
            return true;
        } catch (error) {
            console.error('❌ Erro ao salvar entradas em JSON:', error);
            return false;
        }
    }

    // Adicionar uma conta
    async adicionarConta(conta) {
        const contas = await this.carregarContas();
        conta.id = this.gerarId();
        conta.dataCriacao = new Date().toISOString();
        contas.push(conta);
        
        const salvo = await this.salvarContas(contas);
        return salvo ? conta : null;
    }

    // Adicionar uma entrada
    async adicionarEntrada(entrada) {
        const entradas = await this.carregarEntradas();
        entrada.id = this.gerarId();
        entrada.dataCriacao = new Date().toISOString();
        entradas.push(entrada);
        
        const salvo = await this.salvarEntradas(entradas);
        return salvo ? entrada : null;
    }

    // Atualizar conta
    async atualizarConta(id, dadosAtualizados) {
        const contas = await this.carregarContas();
        const index = contas.findIndex(conta => conta.id === id);
        if (index !== -1) {
            contas[index] = { ...contas[index], ...dadosAtualizados };
            const salvo = await this.salvarContas(contas);
            return salvo ? contas[index] : null;
        }
        return null;
    }

    // Atualizar entrada
    async atualizarEntrada(id, dadosAtualizados) {
        const entradas = await this.carregarEntradas();
        const index = entradas.findIndex(entrada => entrada.id === id);
        if (index !== -1) {
            entradas[index] = { ...entradas[index], ...dadosAtualizados };
            const salvo = await this.salvarEntradas(entradas);
            return salvo ? entradas[index] : null;
        }
        return null;
    }

    // Excluir conta
    async excluirConta(id) {
        const contas = await this.carregarContas();
        const contasFiltradas = contas.filter(conta => conta.id !== id);
        const salvo = await this.salvarContas(contasFiltradas);
        return salvo && contas.length !== contasFiltradas.length;
    }

    // Excluir entrada
    async excluirEntrada(id) {
        const entradas = await this.carregarEntradas();
        const entradasFiltradas = entradas.filter(entrada => entrada.id !== id);
        const salvo = await this.salvarEntradas(entradasFiltradas);
        return salvo && entradas.length !== entradasFiltradas.length;
    }

    // Gerar ID único
    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Limpar todos os dados (API JSON)
    async limparDados() {
        try {
            await Promise.all([
                this.salvarContas([]),
                this.salvarEntradas([])
            ]);
            
            // Limpar cache em memória
            this.memoryCache = {
                contas: null,
                entradas: null,
                timestamp: null
            };
            
            console.log('🗑️ Todos os dados foram limpos dos arquivos JSON');
            return true;
        } catch (error) {
            console.error('❌ Erro ao limpar dados:', error);
            return false;
        }
    }

    // Exportar dados
    async exportarDados() {
        try {
            const dados = await this.apiRequest('/dados');
            return {
                ...dados,
                dataExportacao: new Date().toISOString(),
                fonte: 'JSON Files'
            };
        } catch (error) {
            console.error('❌ Erro ao exportar dados:', error);
            
            // Retornar dados do cache se disponível
            return {
                contas: this.memoryCache.contas || [],
                entradas: this.memoryCache.entradas || [],
                dataExportacao: new Date().toISOString(),
                fonte: 'Memory Cache (Offline)'
            };
        }
    }

    // Importar dados
    async importarDados(dados) {
        try {
            await this.apiRequest('/dados', 'POST', dados);
            
            // Limpar cache para forçar recarregamento
            this.memoryCache = {
                contas: null,
                entradas: null,
                timestamp: null
            };
            
            console.log('📥 Dados importados com sucesso para arquivos JSON');
            return true;
        } catch (error) {
            console.error('❌ Erro ao importar dados:', error);
            return false;
        }
    }

    // Verificar status da conexão com API
    async verificarConexaoAPI() {
        try {
            await this.apiRequest('/health');
            return true;
        } catch (error) {
            return false;
        }
    }

    // Obter estatísticas do banco
    async obterEstatisticasBD() {
        try {
            return await this.apiRequest('/stats');
        } catch (error) {
            console.error('❌ Erro ao obter estatísticas:', error);
            return null;
        }
    }

    // Criar backup do banco
    async criarBackup() {
        try {
            return await this.apiRequest('/backup', 'POST');
        } catch (error) {
            console.error('❌ Erro ao criar backup:', error);
            throw error;
        }
    }

    // Obter estatísticas (mantido para compatibilidade)
    async obterEstatisticas() {
        try {
            const dados = await this.apiRequest('/dados');
            const contas = dados.contas || [];
            const entradas = dados.entradas || [];
            
            const dataAtual = new Date();
            const mesAtual = dataAtual.getMonth();
            const anoAtual = dataAtual.getFullYear();

            // Contas à pagar
            const contasAPagar = contas.filter(c => c.status === 'à pagar');
            const contasPagas = contas.filter(c => c.status === 'pago');
            const contasVencidas = contas.filter(c => {
                if (c.status === 'pago') return false;
                if (!DateUtils.isValidDate(c.dataVencimento)) return false;
                
                const dataVenc = new Date(c.dataVencimento + 'T00:00:00');
                return dataVenc < dataAtual;
            });

            const totalContasAPagar = contasAPagar.reduce((sum, c) => sum + parseFloat(c.valor), 0);
            const totalContasPagas = contasPagas.reduce((sum, c) => sum + parseFloat(c.valor), 0);

            // Entradas do mês
            const entradasMes = entradas.filter(e => {
                if (!DateUtils.isValidDate(e.dataEntrada)) return false;
                
                const dataEntrada = new Date(e.dataEntrada + 'T00:00:00');
                return dataEntrada.getMonth() === mesAtual && dataEntrada.getFullYear() === anoAtual;
            });

            const totalEntradasMes = entradasMes.reduce((sum, e) => sum + parseFloat(e.valorCalculado || e.valor), 0);

            // Agrupar entradas por tipo
            const entradasPorTipo = {};
            entradasMes.forEach(entrada => {
                if (!entradasPorTipo[entrada.tipoEntrada]) {
                    entradasPorTipo[entrada.tipoEntrada] = 0;
                }
                entradasPorTipo[entrada.tipoEntrada] += parseFloat(entrada.valorCalculado || entrada.valor);
            });

            return {
                contas: {
                    total: contas.length,
                    aPagar: contasAPagar.length,
                    pagas: contasPagas.length,
                    vencidas: contasVencidas.length,
                    valorAPagar: totalContasAPagar,
                    valorPago: totalContasPagas
                },
                entradas: {
                    totalMes: entradasMes.length,
                    valorMes: totalEntradasMes,
                    mediaDiaria: entradasMes.length > 0 ? totalEntradasMes / 30 : 0,
                    porTipo: entradasPorTipo
                },
                saldo: totalEntradasMes - totalContasAPagar
            };
        } catch (error) {
            console.error('❌ Erro ao obter estatísticas:', error);
            return {
                contas: { total: 0, aPagar: 0, pagas: 0, vencidas: 0, valorAPagar: 0, valorPago: 0 },
                entradas: { totalMes: 0, valorMes: 0, mediaDiaria: 0, porTipo: {} },
                saldo: 0
            };
        }
    }
}

// Instância global do storage
const storage = new StorageManager();
