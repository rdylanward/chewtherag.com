from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import messages
from django.db.models import Q
from django.db.models.functions import Lower
from .models import Item, Collection

# Create your views here.


def collection(request):
    """ A view to return the 'Community' page, view all items and search queries """

    items = Item.objects.all()
    query = None
    collections = None
    sort = None
    direction = None

    if request.GET:
        if 'sort' in request.GET:
            sortkey = request.GET['sort']
            sort = sortkey
            if sortkey == 'name':
                sortkey = 'lower_name'
                items = items.annotate(lower_name=Lower('name'))
            if sortkey == 'collection':
                sortkey = 'collection__name'
            if 'direction' in request.GET:
                direction = request.GET['direction']
                if direction == 'desc':
                    sortkey = f'-{sortkey}'
            items = items.order_by(sortkey)

        if 'collection' in request.GET:
            collections = request.GET['collection'].split(',')
            items = items.filter(collection__name__in=collections)
            collections = Collection.objects.filter(name__in=collections)

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
        'current_collections': collections,
    }

    return render(request, 'collection/collection.html', context)


def item_detail(request, item_id):
    """ A view to return an individual item """

    item = get_object_or_404(Item, pk=item_id)

    context = {
        'item': item,
    }

    return render(request, 'collection/item_detail.html', context)
