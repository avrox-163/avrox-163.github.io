import random
import threading
import time
import tkinter as tk

text = '你被绿了！！！'
times = 10


def boom():
    window = tk.Tk()
    width = window.winfo_screenwidth()
    height = window.winfo_screenheight()
    a = random.randrange(start=0, stop=width)
    b = random.randrange(start=0, stop=height)
    window.title(text)
    window.geometry("200x50" + "+" + str(a) + "+" + str(b))
    tk.Label(window, text=text, bg='green',
             font=('微软雅黑', 17), width=20, height=4).pack()
    window.mainloop()


threads = []
for i in range(times):
    t = threading.Thread(target=boom)
    threads.append(t)
    time.sleep(0.1)
    threads[i].start()
