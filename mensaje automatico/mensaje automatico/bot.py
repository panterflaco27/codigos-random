from datetime import datetime
import pyautogui, webbrowser, datetime
from time import sleep
flag = 1

#def send():
 #   flag = 0
  #  webbrowser.open(f'http://web.whatsapp.com/send?phone=+522287775905') # aqui se pone el link del chat de whtasapp p messenger
    # para http://whatsapp es web.whatsapp.com/send?phone=(el codigo "+52, +33, etc")("numero de la persona")
    # para http://messenger es www.messenger.com/t/(el codigo de chat unico para cada usuario)
   # sleep(15)
    #pyautogui.typewrite("we lo de ia, que vas a hacer?, es mañana")
    #pyautogui.press("enter")
    #print("mensaje enviado alv")
    #return flag

#while flag:
 #   hora = datetime.datetime.now().strftime('%I:%M')
  #  if hora == '10:12':
   #     flag = send()
   
   
webbrowser.open('http://web.whatsapp.com/send?phone=+522287775905')
sleep(15)
for i in range(100):
    pyautogui.typewrite("we lo de ia, que vas a hacer?, es mañana")
    pyautogui.press("enter")
    print("mensaje enviado alv")

