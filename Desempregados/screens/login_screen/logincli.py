from kivymd.uix.screen import MDScreen
from kivy.uix.screenmanager import ScreenManager, Screen, SlideTransition


class LoginCli(MDScreen):
    def opc_login(self):
        self.manager.current = "main_screen"


    def back_choosescreen(self):
        self.manager.current = "login_screen_cli"
