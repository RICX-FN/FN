from kivymd.uix.screen import MDScreen

from kivy.uix.screenmanager import Screen
from kivymd.uix.pickers import MDDatePicker

class PerfilEmp(MDScreen):
    def back_login_emp(self):
        self.manager.current = "login_screen_emp"

    
    def dados_login(self):
        pass
        #pegar os dados da tela de cadastro da empresa e preencher os campos na Tela Perfil-Emp
        
    