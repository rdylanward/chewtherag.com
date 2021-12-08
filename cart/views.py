from django.shortcuts import render, redirect, reverse, HttpResponse, get_object_or_404
from django.contrib import messages
from collection.models import Item

# Create your views here.


def cart(request):
    """ A view to render the shopping cart page """

    return render(request, 'cart/cart.html')


def add_to_cart(request, item_id):
    """ Add an item and quantity to the shopping cart """

    item = get_object_or_404(Item, pk=item_id)
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
                messages.success(request, f'Updated {item.name} quantity, size {size.upper()}, to {cart[item_id]["items_by_size"][size]}.', extra_tags='Added Item')
            else:
                cart[item_id]['items_by_size'][size] = quantity
                messages.success(request, f'Added {item.name}, size {size.upper()}, to your cart.', extra_tags='Added Item')
        else:
            cart[item_id] = {'items_by_size': {size: quantity}}
            messages.success(request, f'Added {item.name}, size {size.upper()}, to your cart.', extra_tags='Added Item')
    else:
        if item_id in list(cart.keys()):
            cart[item_id] += quantity
            messages.success(request, f'Updated {item.name} quantity to {cart[item_id]}.', extra_tags='Updated Item')
        else:
            cart[item_id] = quantity
            messages.success(request, f'Added {item.name} to your cart.', extra_tags='Added Item')

    request.session['cart'] = cart
    return redirect(redirect_url)


def update_cart(request, item_id):
    """ Update the quantity of cart item """

    item = get_object_or_404(Item, pk=item_id)
    quantity = int(request.POST.get('quantity'))
    size = None
    if 'item_size' in request.POST:
        size = request.POST['item_size']
    cart = request.session.get('cart', {})

    if size:
        cart[item_id]['items_by_size'][size] = quantity
        messages.success(request, f'Updated {item.name},  size {size.upper()}, quantity to {cart[item_id]["items_by_size"][size]}.', extra_tags='Updated Quantity')
    else:
        cart[item_id] = quantity
        messages.success(request, f'Updated {item.name} quantity to {cart[item_id]}.', extra_tags='Updated Quantity')

    request.session['cart'] = cart
    return redirect(reverse('cart'))


def remove_from_cart(request, item_id):
    """ Update the quantity of cart item """

    try:
        item = get_object_or_404(Item, pk=item_id)
        size = None
        if 'item_size' in request.POST:
            size = request.POST['item_size']
        cart = request.session.get('cart', {})

        if size:
            del cart[item_id]['items_by_size'][size]
            if not cart[item_id]['items_by_size']:
                cart.pop(item_id)
            messages.success(request, f'Removed {item.name}, size {size.upper()}, from your cart.', extra_tags='Removed Item')
        else:
            cart.pop(item_id)
            messages.success(request, f'Removed {item.name} from your cart.', extra_tags='Removed Item')

        request.session['cart'] = cart
        return HttpResponse(status=200)

    except Exception as e:
        messages.error(request, f'Error removing item: {e}')
        return HttpResponse(status=500)
