from django.shortcuts import render

# Create your views here.


def community(request):
    """ A view to return the 'Community' page """

    return render(request, 'community/community.html')
