from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import messages
from django.db.models import Q
from .models import Item

# Create your views here.


def collection(request):
    """ A view to return the 'Community' page, view all items and search queries """

    items = Item.objects.all()
    query = None

    if request.GET:
        if 'q' in request.GET:
            query = request.GET['q']
            if not query:
                messages.error(request, "You didn't enter any search criteria!")
                return redirect(reverse('collection'))
            
            queries = Q(name__icontains=query) | Q(description__icontains=query)
            items = items.filter(queries)

    context = {
        'items': items,
        'search_term': query,
    }

    return render(request, 'collection/collection.html', context)


def item_detail(request, item_id):
    """ A view to return an individual item """

    item = get_object_or_404(Item, pk=item_id)

    context = {
        'item': item,
    }

    return render(request, 'collection/item_detail.html', context)
