# Controle Financeiro Comercial

Sistema de controle financeiro para estabelecimentos comerciais com **persistência em arquivo JSON** e calculadora de precificação.

## 🚀 Inicialização

### Opção 1: Node.js com Persistência JSON (Recomendado)
1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```

3. Acesse o sistema:
   - Local: http://localhost:3000
   - Rede: http://SEU_IP:3000

### Opção 2: Python (Sem persistência real)
```bash
python app.py
```
Acesse: http://localhost:5000

## 💾 Persistência de Dados

O sistema agora usa **arquivo JSON** como fonte principal de dados:

### Estrutura
- **Arquivo**: `static/data.json` (criado automaticamente)
- **Backup automático**: localStorage como cache (5 minutos)
- **API REST**: Endpoints completos para CRUD
- **Fallback**: Funciona offline com cache local

### API Endpoints

#### Leitura
- `GET /api/dados` - Todos os dados
- `GET /api/contas` - Apenas contas
- `GET /api/entradas` - Apenas entradas
- `GET /api/health` - Status do servidor

#### Escrita
- `POST /api/contas` - Salvar contas
- `POST /api/entradas` - Salvar entradas
- `POST /api/dados` - Salvar todos os dados

## 📋 Funcionalidades

### ✅ Controle Financeiro (Web)
- **Dashboard mensal**: Seleção de período e cálculos precisos
- **Contas à pagar**: Gestão completa com status
- **Entradas**: Registros com percentuais por tipo
- **Relatórios**: Exportação e análise
- **Persistência real**: Dados salvos permanentemente

### 🧮 Calculadora de Precificação (Tkinter)
- Cálculo para Coxão Bola, Dianteiro, Traseiro
- Parâmetros configuráveis (perdas, lucro)
- Interface desktop nativa

### 🎯 Regras de Percentuais (Entradas)
- **Voucher**: 88% do valor
- **Débito**: 98% do valor
- **Crédito**: 96.5% do valor
- **Pix**: 98% do valor
- **Dinheiro**: 99% do valor

## 🔄 Fluxo de Dados

```
Front-end → API REST → Arquivo JSON
    ↓         ↓           ↓
Cache ← localStorage ← Fallback
```

1. **Front-end** faz requisição à API
2. **API** lê/escreve no arquivo `data.json`
3. **Cache** atualizado automaticamente
4. **Fallback**: Se API falhar, usa cache local

## 🛠️ Estrutura do Projeto

```
├── static/
│   ├── server.js          # Servidor Node.js com API
│   ├── data.json          # Arquivo de dados (auto-criado)
│   ├── index.html         # Interface principal
│   ├── css/style.css      # Estilos personalizados
│   └── js/
│       ├── storage.js     # Gerenciamento (API + cache)
│       ├── contas.js      # Gestão de contas
│       ├── entradas.js    # Gestão de entradas
│       ├── dashboard.js   # Dashboard e gráficos
│       └── app.js         # Aplicação principal
├── app.py                 # Servidor Python (alternativa)
├── Calcdesossa.py         # Calculadora desktop
├── package.json           # Dependências Node.js
└── README.md              # Este arquivo
```

## 📝 Como Usar

### Controle Financeiro
1. **Dashboard**: Visualize resumo mensal e selecione períodos
2. **Contas**: Adicione contas à pagar com vencimento
3. **Entradas**: Registre vendas com percentuais automáticos
4. **Relatórios**: Exporte dados em CSV/JSON

### Calculadora
1. No menu, clique **Calculadora → Abrir calculadora**
2. Use a interface desktop para precificação

## 🐛 Troubleshooting

### Servidor Node.js não inicia
```bash
# Verifique Node.js
node --version

# Instale dependências
npm install

# Inicie manualmente
node static/server.js
```

### Dados não persistem
- Verifique permissões na pasta `static/`
- Confirme se servidor Node.js está rodando
- Teste API: `http://localhost:3000/api/health`

### Diferenças entre versões
- **Node.js**: Persistência real em JSON + API
- **Python**: Apenas localStorage (temporário)

## 📊 Base dos Cálculos

- Projeto original para estudo/comércio local
- **Média de perdas**: 27%
- **Média de lucro**: 40%
- Valores ajustáveis na calculadora

## 🔧 Desenvolvimento

### Adicionar Novos Endpoints
```javascript
// Em static/server.js
app.get('/api/novo', async (req, res) => {
    const dados = await lerDados();
    // Sua lógica
    res.json(resultado);
});
```

### Modificar Storage
```javascript
// Em static/js/storage.js
async novoMetodo() {
    try {
        return await this.apiRequest('/dados');
    } catch (error) {
        // Fallback localStorage
    }
}
```

## 📝 Notas Importantes

- **Dados persistem** após reiniciar servidor/navegador
- **Funciona offline** com cache local
- **Backup manual**: copie `static/data.json`
- **Cache expira** em 5 minutos (força atualização)
- **Segurança**: Sistema local, sem autenticação
