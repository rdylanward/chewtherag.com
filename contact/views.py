from django.shortcuts import render

# Create your views here.


def contact(request):
    """ A view to return the 'Contact' page """

    return render(request, 'contact/contact.html')
