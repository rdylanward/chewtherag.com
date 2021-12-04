from decimal import Decimal
from django.conf import settings
from django.shortcuts import get_object_or_404
from collection.models import Item


def cart_contents(request):

    cart_items = []
    total = 0
    items_reserved = 0
    cart = request.session.get('cart', {})

    for item_id, item_data in cart.items():
        if isinstance(item_data, int):
            item = get_object_or_404(Item, pk=item_id)
            subtotal = item_data * item.price
            total += item_data * item.price
            items_reserved += item_data
            cart_items.append({
                'item_id': item_id,
                'quantity': item_data[1],
                'item': item,
                'subtotal': subtotal,
            })
        else:
            item = get_object_or_404(Item, pk=item_id)
            for size, quantity in item_data['items_by_size'].items():
                subtotal = quantity * item.price
                total += quantity * item.price
                items_reserved += quantity
                cart_items.append({
                    'item_id': item_id,
                    'quantity': quantity,
                    'item': item,
                    'subtotal': subtotal,
                    'size': size,
                })

    if total < settings.FREE_SHIPPING_GOAL:
        shipping = total * Decimal(settings.STANDARD_SHIPPING_CHARGE / 100)
        remaining_til_goal = settings.FREE_SHIPPING_GOAL - total
    else:
        shipping = 0
        remaining_til_goal = 0
    
    cart_total = shipping + total
    
    context = {
        'cart_items': cart_items,
        'total': total,
        'items_reserved': items_reserved,
        'shipping': shipping,
        'remaining_til_goal': remaining_til_goal,
        'free_shipping_goal': settings.FREE_SHIPPING_GOAL,
        'cart_total': cart_total,
    }

    return context
