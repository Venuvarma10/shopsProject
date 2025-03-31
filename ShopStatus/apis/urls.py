from OwnersOperations.views import (Registration, 
                                    Login, 
                                    ShopDetailsListCreateView, 
                                    # ShopImageListCreateView,
                                    ShopUpdateView,
                                    ShopUpdateDestroyRetriveView)
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('Register/',Registration.as_view()),
    path('login/',Login.as_view()),
    path('shop_create_view/',ShopDetailsListCreateView.as_view()),
    # path('shop_image_create_view/',ShopImageListCreateView.as_view()),
    path('shop_update/<int:pk>/',ShopUpdateView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login (get token)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
    path('shop_update_mixin/<int:pk>/',ShopUpdateDestroyRetriveView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
