import pygame
import sys
from pygame.locals import *

pygame.init()
ventana = pygame.display.set_mode((800, 800))
pygame.display.set_caption("asteroid en python")
#colores
colorFondo = (100, 60, 120) #morado
colorLine = (40, 35, 150)
colorCirculo = (40, 110, 100)
colorFiguras = (200, 0, 60)
while True:
    ventana.fill(colorFondo)
    #lineas
    pygame.draw.line(ventana, colorLine, (20,20), (480, 20),10)
    pygame.draw.line(ventana, colorLine, (20,50), (480, 50),10)
    pygame.draw.line(ventana, colorLine, (20,70), (480, 70),10)
    #circulos
    pygame.draw.circle(ventana, colorCirculo, (400, 100), 100, 30)
    pygame.draw.circle(ventana, colorCirculo, (500, 150), 45, 10)
    #figuras
    pygame.draw.rect(ventana, colorFiguras, (100, 50, 50, 250))
    pygame.draw.polygon(ventana, colorFiguras,((400, 400),(30, 400), (500, 54), (20, 500)))
    for evento in pygame.event.get():
        if evento.type == QUIT:
            pygame.quit()
            sys.exit()
        pygame.display.update()
