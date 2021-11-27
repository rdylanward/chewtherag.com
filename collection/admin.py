from django.contrib import admin
from .models import Item, Collection


# Register your models here.

class ItemAdmin(admin.ModelAdmin):
    list_display = (
        'sku',
        'name',
        'collection',
        'price',
        'rating',
        'image',
    )

    ordering = ('sku',)

class CollectionAdmin(admin.ModelAdmin):
    list_display = (
        'friendly_name',
        'name',
    )

admin.site.register(Item, ItemAdmin)
admin.site.register(Collection, CollectionAdmin)
