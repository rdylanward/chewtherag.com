from django.shortcuts import render

# Create your views here.


def cart(request):
    """ A view to render the shopping cart page """

    return render(request, 'cart/cart.html')
