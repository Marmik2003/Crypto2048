from django.urls import path,include
from . import views
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage

urlpatterns = [
    path('', views.game, name='game'),
    path('fetch_api/', views.fetch_api, name='fetch_api'),
    path('get_item/', views.get_item, name='get_item'),
    path('set_item/', views.set_item, name='set_item'),
    path('get_cnt/', views.get_cnt, name='get_cnt'),
    path('set_cnt/', views.set_cnt, name='set_cnt'),
    path('remove_item/', views.remove_item, name='remove_item')
]
