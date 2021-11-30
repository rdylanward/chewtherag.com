from django.shortcuts import render

# Create your views here.


def shopping_cart(request):
    """ A view to render the shopping cart page """

    return render(request, 'cart/cart.html')
