from django.shortcuts import render

# Create your views here.


def collection(request):
    """ A view to return the 'Community' page """

    return render(request, 'collection/collection.html')
