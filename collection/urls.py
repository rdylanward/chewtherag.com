from django.urls import path
from . import views

urlpatterns = [
    path('', views.collection, name='collection'),
    path('<item_id>', views.item_detail, name='item_detail'),
]
