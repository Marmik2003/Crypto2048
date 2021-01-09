from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User

secret = "marine barely sweet outside bomb bronze column bacon knee merge kitten van"

def game(request):
    return render(request,'game.html')

@csrf_exempt
def set_item(request):
    if request.method == "POST":
        gameState = request.POST.get("gameState")
        wltaddr = request.POST.get("wltaddr")

        if(wltaddr != "0"):
            wltuser = User.objects.filter(wltaddr = str(wltaddr))
            if (wltuser.exists()):
                wltuser.update(gamestate=gameState)
            else:
                User.objects.create(wltaddr = wltaddr,gamestate=gameState)
            
    return HttpResponse("Saving some ")

@csrf_exempt
def fetch_api(request):
    if request.method == "POST":
        wltaddr = request.POST.get("wltaddr")
        if(wltaddr!=None):
            return HttpResponse(secret)
        else:
            return HttpResponse("Not logged in")
        
    return HttpResponse("fetchapi")

def get_item(request):
    if request.method == "GET":
        wltaddr = request.GET.get("wltaddr")
        if(wltaddr!="0"):
            wltuser = User.objects.filter(wltaddr = str(wltaddr))
            if(wltuser.exists()):
                gameState = wltuser[0].gamestate
                return HttpResponse(str(gameState))
            else:
                return HttpResponse("NoUser")
        
    return HttpResponse("get")

def remove_item(request):
    if request.method == "GET":
        wltaddr = request.GET.get("wltaddr")
        if(wltaddr!="0"):
            wltuser = User.objects.filter(wltaddr = str(wltaddr))
            if(wltuser.exists()):
                wltuser.update(gamestate="")
                return HttpResponse("Cleared")
            else:
                return HttpResponse("NoUser")
        
    return HttpResponse("remove") 
   


@csrf_exempt
def set_cnt(request):
    if request.method == "POST":
        counter = request.POST.get("counter")
        wltaddr = request.POST.get("wltaddr")
        
        
        print(counter,wltaddr)

        if(wltaddr != "0"):
            wltuser = User.objects.filter(wltaddr = str(wltaddr))
            
            if (wltuser.exists()):
                wltuser.update(counter=counter)
            else:
                User.objects.create(wltaddr = wltaddr,counter=counter)
            
    return HttpResponse("Saving counter ")

def get_cnt(request):
    if request.method == "GET":
        wltaddr = request.GET.get("wltaddr")
        
        if(wltaddr!="0"):
            wltuser = User.objects.filter(wltaddr = str(wltaddr))
            if(wltuser.exists()):
                counter = wltuser[0].counter
                return HttpResponse(str(counter))
            else:
                return HttpResponse("NoUser")
        
    return HttpResponse("get")