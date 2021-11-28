from django.shortcuts import render, get_object_or_404
from .models import Item

# Create your views here.


def collection(request):
    """ A view to return the 'Community' page, view all items and search queries """

    items = Item.objects.all()

    context = {
        'items': items,
    }

    return render(request, 'collection/collection.html', context)


def item_detail(request, item_id):
    """ A view to return an individual item """

    item = get_object_or_404(Item, pk=item_id)

    context = {
        'item': item,
    }

    return render(request, 'collection/item_detail.html', context)
