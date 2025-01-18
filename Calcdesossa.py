from tkinter import *
from tkinter import ttk, messagebox
import math

def calcular_coxao_bola(peso, preco, media_perdas, media_lucro):
    valortotal = peso * preco
    patinho_e_coxao_mole = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.09)
    coxao_duro_e_lagarto = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.05)
    musculo = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 - 0.10)
    lpatinho, lcoxaomole, lcoxaoduro, llagarto, lmusculo = (
    preco * (peso * 0.13), preco * (peso * 0.27), preco * (peso * 0.15), preco * (peso * 0.08), preco * (peso * 0.13))
    lucro = valortotal - (lpatinho + lcoxaomole + lcoxaoduro + llagarto + lmusculo)
    return {
        "Patinho e Coxão Mole": math.ceil(round(patinho_e_coxao_mole, 2)),
        "Coxão Duro e Lagarto": math.ceil(round(coxao_duro_e_lagarto, 2)),
        "Músculo": math.ceil(round(musculo, 2)),
        "Lucro Aproximado na peça": math.ceil(round(lucro, 2))
    }
def calcular_dianteiro(peso, preco, media_perdas, media_lucro):
    valortotal = peso * preco
    paleta, peixinho, musculo, costela_gaucha, acem = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.05), (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.10), (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 - 0.06), (preco * (media_lucro / 100 + 1 + 0.10)), (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1)
    lpaleta, lpeixinho, lmusculo, lcostela, lacem = preco * (peso * 0.2422), preco * (peso * 0.03), preco * (peso * 0.0571), preco * (peso * 0.1982), preco * (peso * 0.2963)
    lucro = valortotal - (lpaleta + lpeixinho + lmusculo + lcostela + lacem)
    return {
    "Paleta": math.ceil(round(paleta, 2)),
    "Peixinho": math.ceil(round(peixinho, 2)),
    "Musculo": math.ceil(round(musculo, 2)),
    "Costela Gaúcha": math.ceil(round(costela_gaucha, 2)),
    "Acém": math.ceil(round(acem, 2)),
    "Lucro Aproximado na peça": math.ceil(round(lucro, 2))
    }
def calcular_traseiro(peso, preco, media_perdas, media_lucro):
    valortotal = peso * preco
    contra_file, picanha, mignon, musculo, coxao_duro_e_lagarto, maminha, alcatra, patinho_e_coxao_mole = (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.07), (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.4), (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.35), (preco * (media_perdas / 100 + 1 - 0.20)), (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 - 0.05), (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1), (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 + 0.05), (preco * (media_perdas / 100 + 1)) * (media_lucro / 100 + 1 - 0.02)
    lcontra, lpicanha, lmignon, lmusculo, lcoxao, llagarto, lmaminha, lalcatra, lpatinho, lmole = preco * (peso * 0.17), preco * (peso * 0.0178), preco * (peso * 0.0454), preco * (peso * 0.069), preco * (peso * 0.1014), preco * (peso * 0.025), preco * (peso * 0.0595), preco * (peso * 0.0923), preco * (peso * 0.1544), preco * (peso * 0.0487)
    lucro = valortotal - (lcontra + lpicanha + lmignon + lmusculo + lcoxao + llagarto + lmaminha + lalcatra + lpatinho + lmole)
    return{
    "Contra File": math.ceil(round(contra_file, 2)),
    "Picanha": math.ceil(round(picanha, 2)),
    "Mignon": math.ceil(round(mignon, 2)),
    "Musculo": math.ceil(round(musculo, 2)),
    "Coxão Duro e Lagarto": math.ceil(round(coxao_duro_e_lagarto, 2)),
    "Maminha": math.ceil(round(maminha, 2)),
    "Alcatra": math.ceil(round(alcatra, 2)),
    "Patinho e Coxão Mole": math.ceil(round(patinho_e_coxao_mole, 2)),
    "Lucro Aproximado na peça": math.ceil(round(lucro, 2))
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
        output_text.insert(END, f"{item}: R${valor:.2f}\n")


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
