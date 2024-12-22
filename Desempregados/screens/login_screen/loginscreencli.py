from kivymd.uix.screen import MDScreen


class LoginScreenCli(MDScreen):
    def opc_login(self):
        self.manager.current = "#"


    def back_choosescreen(self):
        self.manager.current = "choose_screen"