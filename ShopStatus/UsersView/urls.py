from django.urls import path
from .views import ShopDetailsView,SearchByCategory

urlpatterns = [
    path('list_of_shops/',ShopDetailsView.as_view()),
    path('search-shop/',SearchByCategory.as_view())
]
