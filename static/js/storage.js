// Sistema de armazenamento com API como fonte principal e localStorage como cache

class StorageManager {
    constructor() {
        this.keys = {
            contas: 'contas_pagar',
            entradas: 'entradas_financeiras',
            config: 'configuracoes',
            cacheTimestamp: 'cache_timestamp'
        };
        
        // URL base da API (ajustar para porta correta)
        this.apiBaseUrl = window.location.origin;
        
        // Cache em minutos
        this.cacheDuration = 5;
    }

    // Verificar se o cache é válido
    isCacheValid() {
        const timestamp = localStorage.getItem(this.keys.cacheTimestamp);
        if (!timestamp) return false;
        
        const cacheAge = (Date.now() - parseInt(timestamp)) / (1000 * 60);
        return cacheAge < this.cacheDuration;
    }

    // Salvar timestamp do cache
    updateCacheTimestamp() {
        localStorage.setItem(this.keys.cacheTimestamp, Date.now().toString());
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

    // Carregar contas da API (com fallback para localStorage)
    async carregarContas() {
        try {
            // Tentar carregar da API primeiro
            const dados = await this.apiRequest('/dados');
            
            if (dados && dados.contas) {
                // Atualizar cache
                localStorage.setItem(this.keys.contas, JSON.stringify(dados.contas));
                this.updateCacheTimestamp();
                return dados.contas;
            }
        } catch (error) {
            console.warn('Falha ao carregar contas da API, usando cache local:', error);
        }

        // Fallback para localStorage
        try {
            const contas = localStorage.getItem(this.keys.contas);
            return contas ? JSON.parse(contas) : [];
        } catch (error) {
            console.error('Erro ao carregar contas do cache:', error);
            return [];
        }
    }

    // Salvar contas na API
    async salvarContas(contas) {
        try {
            // Salvar na API
            await this.apiRequest('/contas', 'POST', contas);
            
            // Atualizar cache local
            localStorage.setItem(this.keys.contas, JSON.stringify(contas));
            this.updateCacheTimestamp();
            
            return true;
        } catch (error) {
            console.error('Erro ao salvar contas na API, salvando apenas localmente:', error);
            
            // Fallback: salvar apenas no localStorage
            try {
                localStorage.setItem(this.keys.contas, JSON.stringify(contas));
                return true;
            } catch (localError) {
                console.error('Erro ao salvar contas localmente:', localError);
                return false;
            }
        }
    }

    // Carregar entradas da API (com fallback para localStorage)
    async carregarEntradas() {
        try {
            // Tentar carregar da API primeiro
            const dados = await this.apiRequest('/dados');
            
            if (dados && dados.entradas) {
                // Atualizar cache
                localStorage.setItem(this.keys.entradas, JSON.stringify(dados.entradas));
                this.updateCacheTimestamp();
                return dados.entradas;
            }
        } catch (error) {
            console.warn('Falha ao carregar entradas da API, usando cache local:', error);
        }

        // Fallback para localStorage
        try {
            const entradas = localStorage.getItem(this.keys.entradas);
            return entradas ? JSON.parse(entradas) : [];
        } catch (error) {
            console.error('Erro ao carregar entradas do cache:', error);
            return [];
        }
    }

    // Salvar entradas na API
    async salvarEntradas(entradas) {
        try {
            // Salvar na API
            await this.apiRequest('/entradas', 'POST', entradas);
            
            // Atualizar cache local
            localStorage.setItem(this.keys.entradas, JSON.stringify(entradas));
            this.updateCacheTimestamp();
            
            return true;
        } catch (error) {
            console.error('Erro ao salvar entradas na API, salvando apenas localmente:', error);
            
            // Fallback: salvar apenas no localStorage
            try {
                localStorage.setItem(this.keys.entradas, JSON.stringify(entradas));
                return true;
            } catch (localError) {
                console.error('Erro ao salvar entradas localmente:', localError);
                return false;
            }
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

    // Limpar todos os dados (API e localStorage)
    async limparDados() {
        try {
            // Limpar na API
            await this.apiRequest('/dados', 'POST', {
                contas: [],
                entradas: [],
                config: {},
                ultimaAtualizacao: new Date().toISOString()
            });
        } catch (error) {
            console.error('Erro ao limpar dados na API:', error);
        }

        // Limpar cache local
        try {
            localStorage.removeItem(this.keys.contas);
            localStorage.removeItem(this.keys.entradas);
            localStorage.removeItem(this.keys.config);
            localStorage.removeItem(this.keys.cacheTimestamp);
            return true;
        } catch (error) {
            console.error('Erro ao limpar cache local:', error);
            return false;
        }
    }

    // Exportar dados
    async exportarDados() {
        try {
            // Tentar obter da API primeiro
            const dados = await this.apiRequest('/dados');
            return {
                ...dados,
                dataExportacao: new Date().toISOString(),
                fonte: 'API'
            };
        } catch (error) {
            console.warn('Usando dados do cache para exportação:', error);
            
            // Fallback para localStorage
            return {
                contas: JSON.parse(localStorage.getItem(this.keys.contas) || '[]'),
                entradas: JSON.parse(localStorage.getItem(this.keys.entradas) || '[]'),
                config: JSON.parse(localStorage.getItem(this.keys.config) || '{}'),
                dataExportacao: new Date().toISOString(),
                fonte: 'Cache Local'
            };
        }
    }

    // Importar dados
    async importarDados(dados) {
        try {
            // Salvar na API
            await this.apiRequest('/dados', 'POST', dados);
            
            // Atualizar cache local
            if (dados.contas) {
                localStorage.setItem(this.keys.contas, JSON.stringify(dados.contas));
            }
            if (dados.entradas) {
                localStorage.setItem(this.keys.entradas, JSON.stringify(dados.entradas));
            }
            if (dados.config) {
                localStorage.setItem(this.keys.config, JSON.stringify(dados.config));
            }
            
            this.updateCacheTimestamp();
            return true;
        } catch (error) {
            console.error('Erro ao importar dados:', error);
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
                const dataVenc = new Date(c.dataVencimento);
                return dataVenc < dataAtual;
            });

            const totalContasAPagar = contasAPagar.reduce((sum, c) => sum + parseFloat(c.valor), 0);
            const totalContasPagas = contasPagas.reduce((sum, c) => sum + parseFloat(c.valor), 0);

            // Entradas do mês
            const entradasMes = entradas.filter(e => {
                const dataEntrada = new Date(e.dataEntrada);
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
            console.error('Erro ao obter estatísticas:', error);
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
