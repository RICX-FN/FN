import pygame #biblioteca usada para criação de toda logica e estrutura do jogo
import sys #biblioteca usada para usar algumas funções do windows
from pyamaze import maze #biblioteca usada para gerar labirintos ja feitos

# Configuração da tela e do labirinto
largura_celula = 40  # Tamanho da célula
largura_tela = altura_tela = 16 * largura_celula  # Labirinto 10x10

# Inicializar Pygame
pygame.init()
tela = pygame.display.set_mode((largura_tela, altura_tela))
pygame.display.set_caption("P.Estagio Labirinto")

# Configurações de cores
COR_FUNDO = (0, 0, 0)  # Preto
COR_JOGADOR = (255, 0, 127)  # Vermelho
COR_OBJETIVO = (0, 255, 0)  # Verde
COR_LINHA = (0, 255, 255)  # Preto para as paredes

# Função para desenhar o labirinto
def desenhar_labirinto(m):

    for x in range(1, m.rows + 1):
        for y in range(1, m.cols + 1):
            celula_x, celula_y = (y - 1) * largura_celula, (x - 1) * largura_celula
            if m.maze_map[(x, y)]['E'] == 0:
                pygame.draw.line(tela, COR_LINHA, (celula_x + largura_celula, celula_y), (celula_x + largura_celula, celula_y + largura_celula), 2)
            if m.maze_map[(x, y)]['W'] == 0:
                pygame.draw.line(tela, COR_LINHA, (celula_x, celula_y), (celula_x, celula_y + largura_celula), 2)
            if m.maze_map[(x, y)]['N'] == 0:
                pygame.draw.line(tela, COR_LINHA, (celula_x, celula_y), (celula_x + largura_celula, celula_y), 2)
            if m.maze_map[(x, y)]['S'] == 0:
                pygame.draw.line(tela, COR_LINHA, (celula_x, celula_y + largura_celula), (celula_x + largura_celula, celula_y + largura_celula), 2)

# Função principal para cada nível
def jogar_nivel(nivel):
    # Gerar um novo labirinto com Pyamaze
    m = maze(rows=16, cols=16)
    m.CreateMaze()
    
    # Posições iniciais
    pos_x, pos_y = 1, 1
    objetivo_x, objetivo_y = m.rows, m.cols

    clock = pygame.time.Clock()
    while True:
        tela.fill(COR_FUNDO)
        desenhar_labirinto(m)

        # Desenhar o objetivo (quadrado verde)
        pygame.draw.rect(tela, COR_OBJETIVO, ((objetivo_y - 1) * largura_celula, (objetivo_x - 1) * largura_celula, largura_celula, largura_celula))
        # Desenhar o jogador
        pygame.draw.rect(tela, COR_JOGADOR, ((pos_y - 1) * largura_celula + largura_celula // 4, (pos_x - 1) * largura_celula + largura_celula // 4, largura_celula // 2, largura_celula // 2))

        # Processar eventos
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        # Movimento do jogador com as teclas
        teclas = pygame.key.get_pressed()
        if teclas[pygame.K_LEFT] and m.maze_map[(pos_x, pos_y)]['W'] == 1:  # Esquerda
            pos_y -= 1
        if teclas[pygame.K_RIGHT] and m.maze_map[(pos_x, pos_y)]['E'] == 1:  # Direita
            pos_y += 1
        if teclas[pygame.K_UP] and m.maze_map[(pos_x, pos_y)]['N'] == 1:  # Cima
            pos_x -= 1
        if teclas[pygame.K_DOWN] and m.maze_map[(pos_x, pos_y)]['S'] == 1:  # Baixo
            pos_x += 1

        # Verificar se o jogador chegou ao objetivo
        if (pos_x, pos_y) == (objetivo_x, objetivo_y):
            print(f"Parabéns! Você completou o nível {nivel}")
            pygame.time.delay(1000)
            return  # Sair para o próximo nível

        # Atualizar a tela e o clock
        pygame.display.flip()
        clock.tick(30)  # Limitar a 30 FPS

# Loop para jogar todos os 8 níveis
for nivel in range(1, 9):
    jogar_nivel(nivel)
    print(f"Iniciando o nível {nivel + 1}..." if nivel < 8 else "Parabéns! Você completou todos os níveis!")
