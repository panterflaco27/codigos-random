import pygame
import random

from pygame.constants import K_RIGHT, K_a
class cuerpo:
    def __init__(self, ventana):
        self.x = 0
        self.y = 0
        self.dir = 0
        self.ventana = ventana

    def dibujar(self):
        pygame.draw.rect(self.ventana, (255, 255, 255), (self.x, self.y, 10, 10))

    def moverse(self):
        if self.dir == 0:
            self.x += 10
        elif self.dir == 1:
            self.x -= 10;
        elif self.dir == 2:
            self.y += 10
        elif self.dir == 3:
            self.y -= 10

def refrescar(ventana):
    ventana.fill((0,0,0))
    comida.dibujar()
    for i in range(len(serpiente)):
        serpiente[i].dibujar()

def seguir_cabeza():
    for i in range(len(serpiente) - 1):
        serpiente[len(serpiente) - i - 1].x = serpiente[len(serpiente) - i -2].x
        serpiente[len(serpiente) - i - 1].y = serpiente[len(serpiente) - i -2].y

class manzanas:
    def __init__(self, ventana):
        self.x = random.randrange(40)*10
        self.y = random.randrange(40)*10
        self.ventana = ventana

    def dibujar(self):
        pygame.draw.rect(self.ventana, (255, 0, 0), (self.x, self.y, 10, 10))
    
    def nueva_manzana(self):
        self.x = random.randrange(40)*10
        self.y = random.randrange(40)*10
        
    
def main():
    global serpiente, comida
    puntos = 0
    ventana = pygame.display.set_mode((400,400))
    ventana.fill((0,0,0))
    comida = manzanas(ventana)
    serpiente = [cuerpo(ventana)]
    run = True
    while run:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RIGHT:
                    serpiente[0].dir = 0
                if event.key == pygame.K_LEFT:
                    serpiente[0].dir = 1
                if event.key == pygame.K_DOWN:
                    serpiente[0].dir = 2
                if event.key == pygame.K_UP:
                    serpiente[0].dir = 3
        serpiente[0].moverse()        
        refrescar(ventana)
        pygame.display.update()
        pygame.time.delay(100)
        if serpiente[0].x ==comida.x and serpiente[0].y == comida.y:
            puntos += 1
            comida.nueva_manzana()
            serpiente.append(cuerpo(ventana))
        seguir_cabeza()
        if serpiente[0].x >= 400:
            serpiente[0].x = 0
        elif serpiente[0].x < 0:
            serpiente[0].x = 390
        elif serpiente[0].y >= 400:
            serpiente[0].y = 0
        elif serpiente[0].y < 0:
            serpiente[0].y = 390
        for i in range(len(serpiente) - 2):
            if serpiente[len(serpiente) - i - 1].x == serpiente[0].x and serpiente[len(serpiente) - i - 1].y == serpiente[0].y:
                print("\n\n    = #### #### #   # ####   ##  #   # #### ###  =\n   == #    #  # ## ## #     #  # #   # #    #  # ==\n  === # ## #### # # # ###   #  # #   # ###  ###  ===\n ==== #  # #  # #   # #     #  #  # #  #    # #  ====\n===== #### #  # #   # ####   ##    #   #### #  # =====\n\n")
                print("manzanas comidas: ", puntos)
                pygame.time.delay(20000)
                run = False

if __name__ == '__main__':
    main()
    pygame.quit()