from django.urls import path
from .views import ShopDetailsView,SearchByCategory,ShopRetriveView

urlpatterns = [
    path('list_of_shops/',ShopDetailsView.as_view()),
    path('search-shop/',SearchByCategory.as_view()),
    path('single_shop/<int:pk>/',ShopRetriveView.as_view()),
]
