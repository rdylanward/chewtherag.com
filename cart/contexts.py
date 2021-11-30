from decimal import Decimal
from django.conf import settings


def cart_contents(request):

    cart_items = []
    total = 0
    items_reserved = 0

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
