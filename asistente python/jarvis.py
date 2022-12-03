import speech_recognition as sr
import pyttsx3, pyautogui, pywhatkit, datetime, webbrowser
from time import sleep
from datetime import datetime

name = 'alexo'
listener = sr.Recognizer()
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

def talk(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    try:
        with sr.Microphone() as source:
            print("escuchando...")
            voice = listener.listen(source)
            rec = listener.recognize_google(voice)
            rec = rec.lower()
            if name in rec:
                rec = rec.replace(name, '')
                print(rec)
    except:
        pass
    return rec

def run():
    rec = listen()
    if 'reproduce' in rec:
        music = rec.replace('reproduce', '')
        talk('reproduciendo ' + music)
        pywhatkit.playonyt(music)

    elif 'hora' in rec:
        hora = datetime.datetime().now().strftime('%H:%M')
        talk("son las " + hora)

    elif 'busca' in rec:
        buscar = rec.replace('busca', '')
        talk('buscando ' + buscar)
        webbrowser.open_new('http://www.google.com')
        sleep(10)
        pyautogui.typewrite(buscar)
        pyautogui.press('enter')
        talk("estos son los resultados para " + buscar)
engine.say("chinga tu madre rugal")
run()