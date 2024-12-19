from kivymd.uix.screen import MDScreen


class PerfilEmp(MDScreen):
    def back_login_emp(self):
        self.manager.current = "login_screen_emp"