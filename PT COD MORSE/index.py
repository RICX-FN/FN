# Bibliotecas importadas
import tkinter as tk
import time

# Função para converter a frase em código Morse
def frase_para_morse(frase):

    # Dicionario em morse
    morse_dic = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
        'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
        'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
        'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....',
        '7': '--...', '8': '---..', '9': '----.', ' ': ' ', '/': '/'
    }
    return ' '.join(morse_dic.get(letra.upper(), '') for letra in frase)

# Função que cria a janela que mostra o pisca
def piscamento_tk(morse_code_alf):
    root = tk.Tk()
    root.title("Piscador Morse")

    canvas = tk.Canvas(root, width=200, height=200,background='black', )
    canvas.pack()

    esfera = canvas.create_oval(50, 50, 150, 150, fill="black") # Esfera que simula o pisca

# Função que cria o pisca da conversão
    def piscar():
        for letra in morse_code_alf:
            if letra == ".":
                canvas.itemconfig(esfera, fill="white")
                root.update()
                time.sleep(0.2)
                canvas.itemconfig(esfera, fill="black")
                root.update()
                time.sleep(0.2)
            elif letra == "-":
                canvas.itemconfig(esfera, fill="white")
                root.update()
                time.sleep(0.6)
                canvas.itemconfig(esfera, fill="black")
                root.update()
                time.sleep(0.2)
            elif letra == " ":
                time.sleep(0.6)  # Pausa entre letras
            elif letra == "/":
                time.sleep(1.2)  # Pausa entre palavras
        root.destroy()  # Fecha a janela ao terminar

    root.after(1000, piscar)  # Espera 1 segundo antes de começar a piscar
    root.mainloop()
#Função para criar PlaceHolder no Entry:

class PlaceholderEntry(tk.Entry):
    def __init__(self, master=None, placeholder="Digite aqui...", color="grey", *args, **kwargs):
        super().__init__(master, *args, **kwargs)
        self.placeholder = placeholder
        self.placeholder_color = color
        self.default_fg_color = self['fg']

        self.bind("<FocusIn>", self._clear_placeholder)
        self.bind("<FocusOut>", self._add_placeholder)

        self._add_placeholder()


    def _clear_placeholder(self, event=None):
        if self['fg'] == self.placeholder_color:
            self.delete(0, "end")
            self['fg'] = self.default_fg_color


    def _add_placeholder(self, event=None):
        if not self.get():
            self.insert(0, self.placeholder)
            self['fg'] = self.placeholder_color

# Função para iniciar a conversão de uma frase para código Morse e exibir a representação visual

def iniciar_conversao():
    frase = entrada.get()
    conversao = frase_para_morse(frase)
    resultado_label.config(text=f'Código Morse: {conversao}')

    # Define o atraso em milissegundos (2 segundos) antes de abrir a janela
    delay = 2000
    # Espera o delay em milissegundos antes de abrir a janela
    root.after(delay, piscamento_tk, conversao) 

# Configuração da janela principal
root = tk.Tk()
root.title("Conversor de Morse")

# Entrada de texto
entrada = PlaceholderEntry(root, width=100, placeholder="Digite a frase para converter...")
entrada.pack(padx=50, pady=10)

# Botão para iniciar a conversão
botao = tk.Button(root, text="Converter", command=iniciar_conversao)
botao.pack(pady=10)

# Label para mostrar o resultado
resultado_label = tk.Label(root, text="", font=("Arial", 16, "bold"))
resultado_label.pack(pady=10)

root.mainloop()