from kivymd.uix.screen import MDScreen


class ChooseScreen(MDScreen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.imagem_atual = "img\\trabalhador.png"
        self.func_user = ''
        #selected_role = None

    def trocar_img(self):
        if self.imagem_atual == "img\\trabalhador.png":
            self.imagem_atual = "img\empresa.png"
            self.func_user = "Empresa"
        else:
            self.imagem_atual = "img\\trabalhador.png"
            self.func_user = "Cliente"

        # Atualiza a imagem e o texto
        self.ids.img.source = self.imagem_atual
        self.ids.img.reload()
        self.ids.funcao_user.text = self.func_user

    def voltar_img(self):
        if self.imagem_atual == "img\empresa.png":
            self.imagem_atual = "img\\trabalhador.png"
            self.func_user = "Cliente"
        else:
            self.imagem_atual = "img\empresa.png"
            self.func_user = "Empresa"

        # Atualiza a imagem e o texto
        self.ids.img.source = self.imagem_atual
        self.ids.img.reload()
        self.ids.funcao_user.text = self.func_user
        
    def opc_login(self):
        if self.ids.funcao_user.text == "Cliente":
            self.manager.current = "login_screen_cli"
        elif self.ids.funcao_user.text == "Empresa":
            self.manager.current = "login_screen_emp"
