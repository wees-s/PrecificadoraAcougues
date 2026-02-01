# 💰 Controle Financeiro Comercial - Python + JSON

Sistema simples e robusto de controle financeiro com **persistência em arquivos JSON**.

## 🚀 Inicialização Rápida

### Opção 1: Executar Script Automático
```bash
iniciar_python.bat
```

### Opção 2: Manual
```bash
# Instalar dependências
pip install -r requirements.txt

# Iniciar servidor
python servidor_json.py
```

### Acesso
- **Local**: http://localhost:5000
- **Rede**: http://SEU_IP:5000

## 💾 Persistência de Dados

### 🔒 **Arquivos JSON (Máxima Simplicidade)**
- **Localização**: Pasta `data/`
- **Arquivos**:
  - `data/contas.json` - Contas à pagar
  - `data/entradas.json` - Entradas financeiras
  - `data/config.json` - Configurações
  - `data/backup_YYYYMMDD_HHMMSS/` - Backups automáticos

### ✅ **Vantagens**
- **Simples**: Apenas arquivos JSON, sem banco de dados complexo
- **Seguro**: Dados persistem após limpar navegador/reiniciar servidor
- **Backup**: Automático com timestamp
- **Portátil**: Copie a pasta `data/` para backup completo
- **Offline**: Funciona sem internet
- **Leve**: Sem dependências pesadas

## 📋 Funcionalidades

### ✅ Controle Financeiro
- Dashboard mensal com seleção de período
- Gestão de contas à pagar
- Registro de entradas com percentuais automáticos
- Relatórios e exportação
- Backup automático via API

### 🧮 Calculadora de Precificação
- Interface desktop (Tkinter)
- Cálculos para diferentes cortes de carne
- Parâmetros configuráveis

## 🌐 API Endpoints

### Leitura
- `GET /api/dados` - Todos os dados
- `GET /api/contas` - Contas
- `GET /api/entradas` - Entradas
- `GET /api/stats` - Estatísticas
- `GET /api/health` - Status

### Escrita
- `POST /api/contas` - Salvar contas
- `POST /api/entradas` - Salvar entradas
- `POST /api/dados` - Salvar tudo
- `POST /api/backup` - Criar backup

## 📁 Estrutura do Projeto

```
├── servidor_json.py       # Servidor Python com Flask
├── iniciar_python.bat     # Script de inicialização
├── requirements.txt       # Dependências Python
├── data/                  # Diretório de dados (criado auto)
│   ├── contas.json        # Contas à pagar
│   ├── entradas.json      # Entradas financeiras
│   ├── config.json        # Configurações
│   └── backup_*/          # Backups automáticos
├── static/                # Arquivos web
│   ├── index.html         # Interface principal
│   ├── css/style.css      # Estilos
│   └── js/                # JavaScript
│       ├── storage.js     # Gerenciamento de dados
│       ├── contas.js      # Gestão de contas
│       ├── entradas.js    # Gestão de entradas
│       ├── dashboard.js   # Dashboard
│       ├── app.js         # Aplicação principal
│       └── dateUtils.js   # Utilitários de data
├── Calcdesossa.py         # Calculadora desktop
└── README.md              # Este arquivo
```

## 🔧 Como Usar

### 1. Iniciar o Sistema
```bash
# Execute o script automático
iniciar_python.bat

# Ou manualmente
pip install -r requirements.txt
python servidor_json.py
```

### 2. Acessar a Interface
Abra o navegador e acesse: http://localhost:5000

### 3. Usar as Funcionalidades
- **Dashboard**: Visualize resumo financeiro
- **Contas**: Adicione contas à pagar
- **Entradas**: Registre vendas diárias
- **Relatórios**: Exporte dados
- **Calculadora**: Use a interface desktop

## 💾 Backup e Restauração

### Backup Automático
```bash
# Via API
POST /api/backup
```

### Backup Manual
```bash
# Copie a pasta data/
cp -r data/ backup_manual_$(date +%Y%m%d_%H%M%S)/
```

### Restauração
```bash
# Pare o servidor
# Restaure os arquivos JSON na pasta data/
# Reinicie o servidor
```

## 🐛 Troubleshooting

### Python não encontrado
- Instale Python em: https://python.org/
- Marque "Add Python to PATH" durante instalação

### Porta em uso
- Mude a porta em `servidor_json.py`:
  ```python
  app.run(host='0.0.0.0', port=5001, debug=False)
  ```

### Permissões negadas
- Execute como administrador
- Verifique permissões da pasta

### Dados não salvam
- Verifique se a pasta `data/` existe
- Verifique permissões de escrita
- Confirme se o servidor está rodando

## 📊 Regras de Percentuais (Entradas)

| Tipo | Percentual | Descrição |
|------|------------|-----------|
| Voucher | 88% | Taxa administrativa |
| Débito | 98% | Taxa baixa |
| Crédito | 96.5% | Taxa média |
| Pix | 98% | Taxa baixa |
| Dinheiro | 99% | Taxa mínima |

## 🔄 Fluxo de Dados

```
Front-end → API Flask → Arquivos JSON
    ↓         ↓           ↓
Cache ← Memória ← Backup Automático
```

1. **Interface** faz requisições HTTP
2. **API** lê/escreve arquivos JSON
3. **Cache** temporário em memória (2 min)
4. **Backup** automático com timestamp
5. **Persistência** total e segura

## 📈 Estatísticas

O sistema mantém estatísticas detalhadas:
- Total de contas e entradas
- Valores por período
- Contas vencidas
- Médias diárias
- Distribuição por tipo

Acesse via `GET /api/stats` ou use o dashboard.

## 🎯 Vantagens sobre Outras Soluções

| localStorage | Arquivos JSON |
|-------------|---------------|
| ❌ Perdido ao limpar navegador | ✅ Persiste para sempre |
| ❌ Sem backup automático | ✅ Backup com timestamp |
| ❌ Limitado a 5-10MB | ✅ Ilimitado |
| ❌ Sem integridade | ✅ JSON validado |
| ❌ Apenas no navegador | ✅ Multiplataforma |

## 📞 Suporte

Sistema desenvolvido para uso local com máxima simplicidade. Para dúvidas:
1. Verifique o console do navegador
2. Confirme se o servidor Python está rodando
3. Teste a API: http://localhost:5000/api/health

---

**Versão**: 2.0.0 - Python + JSON Edition  
**Persistência**: Arquivos JSON  
**Simplicidade**: Máxima
