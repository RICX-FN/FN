from kivymd.uix.screen import MDScreen


class MainScreen(MDScreen):
    def back_login_cli(self):
        self.manager.current = "login_screen_cli"

        
    