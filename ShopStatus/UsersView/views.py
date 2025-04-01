from django.shortcuts import render
from rest_framework import generics,filters
from OwnersOperations.models import ShopDetails
from OwnersOperations.serializers import ShopDetailsSerializer
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q


class ShopDetailsView(generics.ListAPIView):
    permission_classes=[AllowAny]
    queryset = ShopDetails.objects.all()
    serializer_class = ShopDetailsSerializer

    # def create(self, request, *args, **kwargs):
    #     """Custom create method to handle multiple image uploads"""
    #     shop_serializer = ShopDetailsSerializer(data=request.data)
    #     if shop_serializer.is_valid():
    #         shop = shop_serializer.save()  # Save shop details

    #         # Handle multiple image uploads
    #         images = request.FILES.getlist('images')  # Get multiple images
    #         for image in images:
    #             ShopImages.objects.create(shop=shop, image=image)

    #         return Response({"message": "Shop and images added successfully"}, status=201)
    #     return Response(shop_serializer.errors, status=401)
class ShopRetriveView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShopDetailsSerializer
    lookup_field = 'pk'


class SearchByCategory(generics.ListAPIView):
    permission_classes=[AllowAny]
    # queryset = ShopDetails.objects.all()
    serializer_class = ShopDetailsSerializer
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    # filterset_fields =['category', 'pincode'] #{'category': ['exact'], 'pincode': ['exact']}
    # search_fields = ['category', 'pincode'] 

    def get_queryset(self):
        queryset = ShopDetails.objects.all()
        category = self.request.query_params.get('category',None)
        pincode = self.request.query_params.get('pincode',None)
        if category and pincode:
            return queryset.filter(Q(category=category) & Q(pincode=pincode)) or queryset.filter(Q(category=category) | Q(pincode=pincode))
        elif category:
            return queryset.filter(category=category)
        elif pincode:
            return queryset.filter(pincode=pincode)
        return queryset
    