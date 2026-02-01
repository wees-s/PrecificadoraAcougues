// Utilitários para manipulação de datas preservando fuso horário local

class DateUtils {
    // Obter data atual no formato YYYY-MM-DD (preserva fuso horário local)
    static getDataLocal() {
        const data = new Date();
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    // Obter data de um objeto Date no formato YYYY-MM-DD (preserva fuso horário local)
    static getDataLocalFromDate(date) {
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const dia = String(date.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    // Obter mês atual no formato YYYY-MM (preserva fuso horário local)
    static getMesLocal() {
        const data = new Date();
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        return `${ano}-${mes}`;
    }

    // Converter data string para formato brasileiro DD/MM/YYYY
    static formatarDataBrasil(dataString) {
        if (!dataString) return '';
        
        const data = new Date(dataString + 'T00:00:00'); // Adiciona hora para evitar problemas de fuso
        if (isNaN(data.getTime())) return dataString; // Retorna original se inválida
        
        return data.toLocaleDateString('pt-BR');
    }

    // Validar se a string está em formato de data válido
    static isValidDate(dataString) {
        if (!dataString) return false;
        
        const data = new Date(dataString + 'T00:00:00');
        return !isNaN(data.getTime());
    }

    // Obter primeiro dia do mês no formato YYYY-MM-DD
    static getPrimeiroDiaMes(ano, mes) {
        return `${ano}-${String(mes).padStart(2, '0')}-01`;
    }

    // Obter último dia do mês no formato YYYY-MM-DD
    static getUltimoDiaMes(ano, mes) {
        const ultimoDia = new Date(ano, mes, 0).getDate();
        return `${ano}-${String(mes).padStart(2, '0')}-${String(ultimoDia).padStart(2, '0')}`;
    }

    // Adicionar dias a uma data
    static adicionarDias(dataString, dias) {
        const data = new Date(dataString + 'T00:00:00');
        data.setDate(data.getDate() + dias);
        
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        
        return `${ano}-${mes}-${dia}`;
    }

    // Subtrair dias de uma data
    static subtrairDias(dataString, dias) {
        return this.adicionarDias(dataString, -dias);
    }

    // Verificar se uma data está no passado
    static isPassado(dataString) {
        const data = new Date(dataString + 'T00:00:00');
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        return data < hoje;
    }

    // Obter diferença em dias entre duas datas
    static diferencaDias(dataInicio, dataFim) {
        const inicio = new Date(dataInicio + 'T00:00:00');
        const fim = new Date(dataFim + 'T00:00:00');
        
        const diferencaMs = fim - inicio;
        return Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));
    }
}

// Disponibilizar globalmente
window.DateUtils = DateUtils;
