from kivymd.uix.screen import MDScreen
from kivy.uix.screenmanager import ScreenManager, Screen, SlideTransition


class LoginScreenCli(MDScreen):
    def opc_login(self):
        self.manager.current = "main_screen"


    def login(self):
        self.manager.current = "login_cli"


    def back_choosescreen(self):
        self.manager.current = "choose_screen"
