#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor Python com persistência em arquivos JSON
Sistema simples e robusto para controle financeiro
"""

import time
import webbrowser
import json
import os
import subprocess
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import threading

app = Flask(__name__)
CORS(app)

# Configuração
DATA_DIR = "data"
CONTAS_FILE = os.path.join(DATA_DIR, "contas.json")
ENTRADAS_FILE = os.path.join(DATA_DIR, "entradas.json")
CONFIG_FILE = os.path.join(DATA_DIR, "config.json")

# Garantir que o diretório de dados existe
os.makedirs(DATA_DIR, exist_ok=True)

def carregar_dados_arquivo(arquivo, dados_padrao=None):
    """Carrega dados de um arquivo JSON com fallback para dados padrão"""
    try:
        if os.path.exists(arquivo):
            with open(arquivo, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            # Criar arquivo com dados padrão
            salvar_dados_arquivo(arquivo, dados_padrao or [])
            return dados_padrao or []
    except Exception as e:
        print(f"Erro ao carregar {arquivo}: {e}")
        return dados_padrao or []

def salvar_dados_arquivo(arquivo, dados):
    """Salva dados em um arquivo JSON"""
    try:
        with open(arquivo, 'w', encoding='utf-8') as f:
            json.dump(dados, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Erro ao salvar {arquivo}: {e}")
        return False

def criar_backup():
    """Cria um backup dos dados com timestamp"""
    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_dir = os.path.join(DATA_DIR, f"backup_{timestamp}")
        os.makedirs(backup_dir, exist_ok=True)
        
        # Copiar arquivos de dados
        if os.path.exists(CONTAS_FILE):
            with open(CONTAS_FILE, 'r', encoding='utf-8') as src:
                with open(os.path.join(backup_dir, "contas.json"), 'w', encoding='utf-8') as dst:
                    dst.write(src.read())
        
        if os.path.exists(ENTRADAS_FILE):
            with open(ENTRADAS_FILE, 'r', encoding='utf-8') as src:
                with open(os.path.join(backup_dir, "entradas.json"), 'w', encoding='utf-8') as dst:
                    dst.write(src.read())
        
        return backup_dir
    except Exception as e:
        print(f"Erro ao criar backup: {e}")
        return None

# Rotas da API (devem vir antes das rotas estáticas)
@app.route('/api/health')
def health_check():
    """Verificação de saúde da API"""
    return jsonify({
        'status': 'OK',
        'timestamp': datetime.now().isoformat(),
        'version': '2.0.0',
        'persistence': 'JSON Files',
        'data_directory': DATA_DIR
    })

@app.route('/api/config')
def get_config():
    """Configuração do sistema"""
    return jsonify({
        'appName': 'Controle Financeiro Comercial',
        'version': '2.0.0',
        'environment': 'development',
        'persistence': 'JSON Files',
        'data_directory': DATA_DIR,
        'features': {
            'api': True,
            'export': True,
            'reports': True,
            'backup': True,
            'localStorage': 'disabled'
        }
    })

@app.route('/api/contas', methods=['GET'])
def get_contas():
    """Obter todas as contas"""
    try:
        contas = carregar_dados_arquivo(CONTAS_FILE, [])
        return jsonify(contas)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contas', methods=['POST'])
def save_contas():
    """Salvar contas"""
    try:
        contas = request.json
        if salvar_dados_arquivo(CONTAS_FILE, contas):
            return jsonify({
                'success': True, 
                'message': 'Contas salvas com sucesso',
                'total': len(contas)
            })
        else:
            return jsonify({'error': 'Falha ao salvar contas'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/entradas', methods=['GET'])
def get_entradas():
    """Obter todas as entradas"""
    try:
        entradas = carregar_dados_arquivo(ENTRADAS_FILE, [])
        return jsonify(entradas)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/entradas', methods=['POST'])
def save_entradas():
    """Salvar entradas"""
    try:
        entradas = request.json
        if salvar_dados_arquivo(ENTRADAS_FILE, entradas):
            return jsonify({
                'success': True, 
                'message': 'Entradas salvas com sucesso',
                'total': len(entradas)
            })
        else:
            return jsonify({'error': 'Falha ao salvar entradas'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dados', methods=['GET'])
def get_all_data():
    """Obter todos os dados"""
    try:
        contas = carregar_dados_arquivo(CONTAS_FILE, [])
        entradas = carregar_dados_arquivo(ENTRADAS_FILE, [])
        config = carregar_dados_arquivo(CONFIG_FILE, {})
        
        return jsonify({
            'contas': contas,
            'entradas': entradas,
            'config': config,
            'ultimaAtualizacao': datetime.now().isoformat(),
            'fonte': 'JSON Files'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dados', methods=['POST'])
def save_all_data():
    """Salvar todos os dados"""
    try:
        dados = request.json
        
        success = True
        success &= salvar_dados_arquivo(CONTAS_FILE, dados.get('contas', []))
        success &= salvar_dados_arquivo(ENTRADAS_FILE, dados.get('entradas', []))
        success &= salvar_dados_arquivo(CONFIG_FILE, dados.get('config', {}))
        
        if success:
            return jsonify({
                'success': True, 
                'message': 'Dados salvos com sucesso'
            })
        else:
            return jsonify({'error': 'Falha ao salvar dados'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Obter estatísticas do sistema"""
    try:
        contas = carregar_dados_arquivo(CONTAS_FILE, [])
        entradas = carregar_dados_arquivo(ENTRADAS_FILE, [])
        
        # Estatísticas de contas
        total_contas = len(contas)
        contas_pagar = len([c for c in contas if c.get('status') == 'à pagar'])
        contas_pagas = len([c for c in contas if c.get('status') == 'pago'])
        
        # Estatísticas de entradas
        total_entradas = len(entradas)
        
        return jsonify([
            {
                'tabela': 'contas',
                'total': total_contas,
                'pagas': contas_pagas,
                'a_pagar': contas_pagar
            },
            {
                'tabela': 'entradas',
                'total': total_entradas,
                'pagas': 0,
                'a_pagar': 0
            }
        ])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/backup', methods=['POST'])
def create_backup():
    """Criar backup dos dados"""
    try:
        backup_dir = criar_backup()
        if backup_dir:
            return jsonify({
                'success': True,
                'message': 'Backup criado com sucesso',
                'backupPath': backup_dir
            })
        else:
            return jsonify({'error': 'Falha ao criar backup'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rota para abrir calculadora
@app.route('/calcular')
def calcular():
    """Abre a calculadora desktop"""
    try:
        subprocess.Popen(["python", "Calcdesossa.py"])
        return "Calculadora aberta com sucesso!"
    except Exception as e:
        return f"Erro ao abrir calculadora: {str(e)}", 500

# Rotas estáticas (devem vir depois das rotas da API)
@app.route('/')
def index():
    """Serve a página principal"""
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    """Serve arquivos estáticos"""
    # Ignorar rotas da API e calculadora
    if path.startswith('api/') or path == 'calcular':
        return "Endpoint not found", 404
    
    # Log para debug
    print(f"Requisitando arquivo estático: {path}")
    
    # Tentar servir da pasta static
    static_path = os.path.join('static', path)
    if os.path.exists(static_path):
        print(f"Servindo de: {static_path}")
        return send_from_directory('static', path)
    else:
        print(f"Arquivo não encontrado: {static_path}")
        return "Arquivo não encontrado", 404

def print_banner():
    """Exibe banner de inicialização"""
    print("""
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    🚀 Servidor Python com Persistência JSON!              ║
║                                                              ║
║    Acesso local: http://localhost:5000                      ║
║    Acesso na rede: http://SEU_IP_LOCAL:5000                ║
║                                                              ║
║    📁 Diretório de dados: data/                             ║
║    💾 Persistência: Arquivos JSON                           ║
║    🔒 Segurança: Dados persistem após limpar navegador       ║
║                                                              ║
║    Arquivos criados:                                         ║
║    - data/contas.json                                        ║
║    - data/entradas.json                                      ║
║    - data/config.json                                        ║
║    - data/backup_YYYYMMDD_HHMMSS/ (backups)                 ║
║                                                              ║
║    Pressione Ctrl+C para parar o servidor                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    """)

if __name__ == '__main__':
    print_banner()
    
    # Verificar se os arquivos de dados existem
    print("📋 Verificando arquivos de dados...")
    contas = carregar_dados_arquivo(CONTAS_FILE, [])
    entradas = carregar_dados_arquivo(ENTRADAS_FILE, [])
    print(f"   ✅ Contas: {len(contas)} registros")
    print(f"   ✅ Entradas: {len(entradas)} registros")
    print("   ✅ Sistema pronto para uso!")
    print()
    
    webbrowser.open("http://localhost:5000")
    # Iniciar servidor
    app.run(host='0.0.0.0', port=5000, debug=False)
