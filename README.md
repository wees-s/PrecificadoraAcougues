# PrecificadoraAcouguesV3

Aplicação local para:

1. **Controle financeiro comercial** (interface web via navegador)
2. **Calculadora de precificação de desossa** (Python/Tkinter)

## Visão geral

- **Interface Web**: fica em `static/` e abre no navegador.
- **Servidor Local (Flask)**: `app.py` serve a interface e expõe a rota `/calcular`.
- **Calculadora (Tkinter)**: ao acessar `/calcular`, o Flask executa `Calcdesossa.py` e abre a calculadora.

## Funcionalidades principais

### Controle Financeiro (Web)

- Dashboard
- Contas a pagar
- Entradas
- Relatórios
- Persistência via `LocalStorage`

### Calculadora de Precificação (Tkinter)

- Cálculo para:
  - Coxão Bola
  - Dianteiro
  - Traseiro
- Parâmetros configuráveis:
  - Média de perdas (%)
  - Média de lucro (%)
- Saída padronizada exibindo:
  - Valores com sufixo **`R$`**
  - Pesos com sufixo **`KG`**

## Requisitos

- Python 3
- Pip

Dependências Python:

- `flask`

## Como executar (recomendado)

1. Instale as dependências:

   ```bash
   pip install flask
   ```

2. Inicie o servidor:

   ```bash
   python app.py
   ```

3. Acesse:

- `http://127.0.0.1:5000`

## Como usar a Calculadora pelo navegador

1. No menu, abra a seção **Calculadora**.
2. Clique em **Abrir calculadora**.

Isso faz um `fetch` para `/calcular`, e o servidor executa `Calcdesossa.py` (abrindo a janela do Tkinter).

## Observações importantes

- O Flask está configurado para servir a pasta `static/` na raiz (por isso os assets funcionam como `/css/...` e `/js/...`).
- O sistema é **local** e pensado para uso em máquina pessoal/na rede local (ambiente de desenvolvimento).

## Base dos cálculos

- Projeto inicialmente feito para estudo.
- A base de cálculos médios usada no projeto é de **27% de perdas** e **40% de lucro bruto**.
- É possível inserir seus próprios valores para flexibilizar conforme a necessidade.

## Estrutura do projeto

```
PrecificadoraAcougues/
├── app.py
├── Calcdesossa.py
├── static/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── README.md
└── README.md
```
