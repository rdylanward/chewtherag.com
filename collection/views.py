from django.shortcuts import render
from .models import Item

# Create your views here.


def collection(request):
    """ A view to return the 'Community' page, view all items and search queries """

    items = Item.objects.all()

    context = {
        'items': items,
    }

    return render(request, 'collection/collection.html', context)
