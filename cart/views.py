from django.shortcuts import render, redirect, reverse, HttpResponse

# Create your views here.


def cart(request):
    """ A view to render the shopping cart page """

    return render(request, 'cart/cart.html')


def add_to_cart(request, item_id):
    """ Add an item and quantity to the shopping cart """

    quantity = int(request.POST.get('quantity'))
    redirect_url = request.POST.get('redirect_url')
    size = None
    if 'item_size' in request.POST:
        size = request.POST['item_size']
    cart = request.session.get('cart', {})

    if size:
        if item_id in list(cart.keys()):
            if size in cart[item_id]['items_by_size'].keys():
                cart[item_id]['items_by_size'][size] += quantity
            else:
                cart[item_id]['items_by_size'][size] = quantity
        else:
            cart[item_id] = {'items_by_size': {size: quantity}}
    else:
        if item_id in list(cart.keys()):
            cart[item_id] += quantity
        else:
            cart[item_id] = quantity

    request.session['cart'] = cart
    return redirect(redirect_url)


def update_cart(request, item_id):
    """ Update the quantity of cart item """

    quantity = int(request.POST.get('quantity'))
    size = None
    if 'item_size' in request.POST:
        size = request.POST['item_size']
    cart = request.session.get('cart', {})

    if size:
        cart[item_id]['items_by_size'][size] = quantity
    else:
        cart[item_id] = quantity

    request.session['cart'] = cart
    return redirect(reverse('cart'))


def remove_from_cart(request, item_id):
    """ Update the quantity of cart item """

    try:
        size = None
        if 'item_size' in request.POST:
            size = request.POST['item_size']
        cart = request.session.get('cart', {})

        if size:
            del cart[item_id]['items_by_size'][size]
            if not cart[item_id]['items_by_size']:
                cart.pop(item_id)
        else:
            cart.pop(item_id)

        request.session['cart'] = cart
        return HttpResponse(status=200)

    except Exception as e:
        return HttpResponse(status=500)
