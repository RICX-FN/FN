from kivymd.uix.screen import MDScreen


class LoginEmp(MDScreen):
    def opc_login(self):
        self.manager.current = "perfil_emp"


    def back_choosescreen(self):
        self.manager.current = "login_screen_emp"