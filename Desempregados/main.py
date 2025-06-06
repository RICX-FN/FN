import os
from kivymd.app import MDApp
from kaki.app import App
from kivy.factory import Factory

#importando as telas
from screens.choose_screen.choosescreen import ChooseScreen
from screens.login_screen.loginscreencli import LoginScreenCli
from screens.login_screen.loginscreenemp import LoginScreenEmp
from screens.login_screen.logincli import LoginCli
from screens.login_screen.loginemp import LoginEmp
from screens.perfilemp.perfilemp import PerfilEmp
from screens.mainscreen.mainscreen import MainScreen



# main app class for kaki app with kivymd modules
class LiveApp(MDApp, App):
    """ Hi Windows users """

    DEBUG = 1 # set this to 0 make live app not working

    # acesso aos arquivos de tela pelo sistema
    KV_FILES = {
        os.path.join(os.getcwd(), "screens/screenmanager.kv"),
        os.path.join(os.getcwd(), "screens/choose_screen/choosescreen.kv"),
        os.path.join(os.getcwd(), "screens/login_screen/loginscreencli.kv"),
        os.path.join(os.getcwd(), "screens/login_screen/loginscreenemp.kv"),
        os.path.join(os.getcwd(), "screens/login_screen/logincli.kv"),
        os.path.join(os.getcwd(), "screens/login_screen/loginemp.kv"),
        os.path.join(os.getcwd(), "screens/perfilemp/perfilemp.kv"),
        os.path.join(os.getcwd(), "screens/mainscreen/mainscreen.kv"),
        
    }

    # caminho das classes das telas
    CLASSES = {
        "MainScreenManager": "screens.screenmanager",
        "ChooseScreen": "screens.choose_screen.choosescreen",
        "LoginScreenCli": "screens.login_screen.loginscreencli",
        "LoginScreenEmp": "screens.login_screen.loginscreenemp",
        "LoginCli": "screens.login_screen.logincli",
        "LoginEmp": "screens.login_screen.loginemp",
        "PerfilEmp": "screens.perfilemp.perfilemp",
        "MainScreen": "screens.mainscreen.mainscreen",
    }

    # auto reload path
    AUTORELOADER_PATHS = [
        (".", {"recursive": True}),
    ]


    def build_app(self):

        #thema dark definido com padrão
        self.theme_cls.theme_style = "Light"

        self.theme_cls.primary_palette = "Orange"
        #intensidade das cores primarias
        self.theme_cls.primary_hue = "300"

        self.screen_manager = Factory.MainScreenManager()

        self.screen_manager.add_widget(ChooseScreen(name="choose_screen"))
        self.screen_manager.add_widget(LoginScreenCli(name="login_screen_cli"))
        self.screen_manager.add_widget(LoginScreenEmp(name="login_screen_emp"))
        self.screen_manager.add_widget(LoginCli(name="login_cli"))
        self.screen_manager.add_widget(LoginEmp(name="login_emp"))
        self.screen_manager.add_widget(PerfilEmp(name="perfil_emp"))
        self.screen_manager.add_widget(MainScreen(name="main_screen"))

        return self.screen_manager


# roda a app
if __name__ == "__main__":
    LiveApp().run()