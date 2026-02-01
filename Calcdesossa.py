from tkinter import *
from tkinter import ttk, messagebox
import math

def calcular_coxao_bola(peso, preco, media_perdas, media_lucro):
    valortotal = peso * preco
    
    #peças
    patinho_e_coxao_mole = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.09)
    coxao_duro_e_lagarto = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.05)
    musculo = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 - 0.10)

    #lucro por peça  
    lpatinho = preco * (peso * 0.13)
    lcoxaomole = preco * (peso * 0.27)
    lcoxaoduro = preco * (peso * 0.15)
    llagarto = preco * (peso * 0.08)
    lmusculo = preco * (peso * 0.13)
    
    #calculo do lucro total
    lucro = valortotal - (lpatinho + lcoxaomole + lcoxaoduro + llagarto + lmusculo)
    if preco <= 12:
        return {
            "\n==== Preços para venda ====\n"
            f"Patinho e Coxão Mole": math.ceil(round(patinho_e_coxao_mole, 2)+1),
            "Coxão Duro e Lagarto": math.ceil(round(coxao_duro_e_lagarto, 2)),
            "Músculo": math.ceil(round(musculo, 2)),
            "Lucro Aproximado na peça": math.ceil(round(lucro, 2)),
            "\n==== Peso estimado por peça ====\n"
            "Patinho ": peso * 0.13,
            "Coxão Mole ": peso * 0.27,
            "Coxão Duro ": peso * 0.15,
            "Lagarto ": peso * 0.08,
            "Músculo ": peso * 0.13
        }

    return {
        "\n==== Preços para venda ====\n"
        f"Patinho e Coxão Mole R$":math.ceil(round(patinho_e_coxao_mole, 2)),
        "Coxão Duro e Lagarto R$":math.ceil(round(coxao_duro_e_lagarto, 2)),
        "Músculo R$":math.ceil(round(musculo, 2)),
        "Lucro Aproximado na peça R$":math.ceil(round(lucro, 2)),
        "\n==== Peso estimado por peça ====\n"
        "Patinho KG":peso*0.13,
        "Coxão Mole KG":peso*0.27,
        "Coxão Duro KG":peso*0.15,
        "Lagarto KG":peso*0.08,
        "Músculo KG":peso*0.13
    }

def calcular_dianteiro(peso, preco, media_perdas, media_lucro):
    valortotal = peso * preco

    #peças
    paleta = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.05)
    peixinho = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.10)
    musculo = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 - 0.06)
    costela_gaucha = (preco * (media_lucro / 100 + 1 + 0.10))
    acem = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1)

    #lucro por peça
    lpaleta = preco * (peso * 0.2422)
    lpeixinho = preco * (peso * 0.03)
    lmusculo = preco * (peso * 0.0571)
    lcostela = preco * (peso * 0.1982)
    lacem = preco * (peso * 0.2963)

    #calculo do lucro total
    lucro = valortotal - (lpaleta + lpeixinho + lmusculo + lcostela + lacem)

    return {
    "\n==== Preços para venda ====\n"
    "Paleta R$": math.ceil(round(paleta, 2)),
    "Peixinho R$": math.ceil(round(peixinho, 2)),
    "Musculo R$": math.ceil(round(musculo, 2)),
    "Costela Gaúcha R$": math.ceil(round(costela_gaucha, 2)),
    "Acém R$": math.ceil(round(acem, 2)),
    "Lucro Aproximado na peça": math.ceil(round(lucro, 2)),
    "\n==== Peso estimado por peça ====\n"
    "Paleta KG": peso * 0.2422,
    "Peixinho KG": peso * 0.03,
    "Músculo KG": peso * 0.0571,
    "Costla Gaúcha KG": peso * 0.1982,
    "Acém KG": peso * 0.2963
    }

def calcular_traseiro(peso, preco, media_perdas, media_lucro):
    valortotal = peso * preco

    #peças
    contra_file = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.10)
    picanha = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.4)
    mignon = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.35)
    musculo = (preco * (media_perdas / 100 + 1 + 0.10))
    coxao_duro_e_lagarto = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 - 0.05)
    maminha = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1)
    alcatra = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.0655)
    patinho_e_coxao_mole = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 - 0.02)

    #lucro por peça
    lcontra = preco * (peso * 0.17)
    lpicanha = preco * (peso * 0.0178)
    lmignon = preco * (peso * 0.0454)
    lmusculo = preco * (peso * 0.069)
    lcoxao = preco * (peso * 0.1014)
    llagarto = preco * (peso * 0.0487)
    lmaminha = preco * (peso * 0.025)
    lalcatra = preco * (peso * 0.0595)
    lpatinho = preco * (peso * 0.0923)
    lmole = preco * (peso * 0.1544)
    
    #calculo do lucro total
    lucro = valortotal - (lcontra + lpicanha + lmignon + lmusculo + lcoxao + llagarto + lmaminha + lalcatra + lpatinho + lmole)
    return{
    "\n==== Preços para venda ====\n"
    "Contra File R$": math.ceil(round(contra_file, 2)),
    "Picanha R$": math.ceil(round(picanha, 2)),
    "Mignon R$": math.ceil(round(mignon, 2)),
    "Musculo R$": math.ceil(round(musculo, 2)),
    "Coxão Duro e Lagarto R$": math.ceil(round(coxao_duro_e_lagarto, 2)),
    "Maminha R$": math.ceil(round(maminha, 2)),
    "Alcatra R$": math.ceil(round(alcatra, 2)),
    "Patinho e Coxão Mole": math.ceil(round(patinho_e_coxao_mole, 2)),
    "Lucro Aproximado na peça": math.ceil(round(lucro, 2)),
    "\n==== Peso estimado por peça ====\n"
    "Contra File KG": peso * 0.17,
    "Picanha KG": peso * 0.0178,
    "Mignon KG": peso * 0.0454,
    "Musculo KG": peso * 0.069,
    "Coxão Duro KG": peso * 0.1014,
    "Lagarto KG": peso * 0.0487,
    "Maminha KG": peso * 0.025,
    "Alcatra KG": peso * 0.0595,
    "Patinho KG": peso * 0.0923,
    "Coxão Mole KG": peso * 0.1544
    }

def calcular():
    try:
        peso = float(entry_peso.get())
        preco = float(entry_preco.get())
        media_perdas = int(entry_perdas.get())
        media_lucro = int(entry_lucro.get())

        # Seleciona o tipo de cálculo
        tipo = combo_peca.get()
        if tipo == "Coxão Bola":
            resultados = calcular_coxao_bola(peso, preco, media_perdas, media_lucro)
            exibir_resultados(resultados)
        elif tipo == "Dianteiro":
            resultados = calcular_dianteiro(peso, preco, media_perdas, media_lucro)
            exibir_resultados(resultados)
        elif tipo == "Traseiro":
            resultados = calcular_traseiro(peso, preco, media_perdas, media_lucro)
            exibir_resultados(resultados)
        else:
            messagebox.showinfo("Atenção", "Cálculo para esta peça ainda não foi implementado.")
    except ValueError:
        messagebox.showerror("Erro", "Por favor, insira valores válidos.")


def exibir_resultados(resultados):
    output_text.delete(1.0, END)
    for item, valor in resultados.items():
        output_text.insert(END, f"{item}: {valor:.2f}\n")


# Configurações da interface
root = Tk()
root.title("Precificação de Desossas (açougues)")
root.geometry("400x400")

frame_inputs = Frame(root)
frame_inputs.pack(pady=10)

Label(frame_inputs, text="Peso (kg):").grid(row=0, column=0, padx=5, pady=5, sticky=W)
entry_peso = Entry(frame_inputs)
entry_peso.grid(row=0, column=1, padx=5, pady=5)

Label(frame_inputs, text="Preço (R$/kg):").grid(row=1, column=0, padx=5, pady=5, sticky=W)
entry_preco = Entry(frame_inputs)
entry_preco.grid(row=1, column=1, padx=5, pady=5)

Label(frame_inputs, text="Média de Perdas (%):").grid(row=2, column=0, padx=5, pady=5, sticky=W)
entry_perdas = Entry(frame_inputs)
entry_perdas.insert(0, "27")  # Sugestão padrão
entry_perdas.grid(row=2, column=1, padx=5, pady=5)

Label(frame_inputs, text="Média de Lucro (%):").grid(row=3, column=0, padx=5, pady=5, sticky=W)
entry_lucro = Entry(frame_inputs)
entry_lucro.insert(0, "40")  # Sugestão padrão
entry_lucro.grid(row=3, column=1, padx=5, pady=5)

Label(frame_inputs, text="Peça:").grid(row=4, column=0, padx=5, pady=5, sticky=W)
combo_peca = ttk.Combobox(frame_inputs, values=["Coxão Bola", "Dianteiro", "Traseiro"], state="readonly")
combo_peca.grid(row=4, column=1, padx=5, pady=5)
combo_peca.set("Coxão Bola")  # Seleção padrão

button_calcular = Button(root, text="Calcular", command=calcular)
button_calcular.pack(pady=10)

Label(root, text="Resultados:").pack()
output_text = Text(root, height=10, width=40, state="normal")
output_text.pack(pady=10)

# Inicia o loop principal
root.mainloop()
