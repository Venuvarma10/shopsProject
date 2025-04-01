from django.shortcuts import render
from rest_framework.views import APIView  #,generics
from rest_framework.response import Response
from .serializers import RegistrationSerializer, ShopDetailsSerializer, ShopImageSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import generics
from .models import ShopDetails, ShopImages
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser,IsAuthenticated, AllowAny



class Registration(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        data = request.data
        user_data={
            "first_name":data["firstName"],
            "last_name":data["lastName"],
            "username":data["mobileNumber"],
            "password":data["password"]
        }
        serializer = RegistrationSerializer(data=user_data)
        if serializer.is_valid():
            user = serializer.save()
            # token = Token.objects.create(user=user)
            # token.save()
            return Response({
                # "user": {
                #     "name": serializer.data['first_name'] + " " + serializer.data['last_name'],
                #     # "token": token.key,
                #     "id":serializer.data['id']
                # }
                "message":"Successfully Registered","name": user.get_full_name()
                }, status=201)
        return Response(serializer.errors, status=400)


class Login(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        username = request.data.get('mobileNumber')
        password = request.data.get('password')
        try :
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"detail": "Invalid mobiel number"}, status=400)
        if user.check_password(password):
            # token, created = Token.objects.get_or_create(user=user)
            return Response({"name": user.get_full_name(),
                            #  "token": token.key
                             }, status=202)
        return Response({"detail": "Invalid password"}, status=401)


class ShopDetailsListCreateView(generics.ListCreateAPIView):
    # queryset = ShopDetails.objects.all()
    # permission_classes=[AllowAny]
    permission_classes = [IsAuthenticated]
    serializer_class = ShopDetailsSerializer
    
    
    def get_queryset(self):
        # print('user',self.request.user)
        details =ShopDetails.objects.filter(owner=self.request.user)
        serializer = ShopDetailsSerializer(details,many=True)
        # print(serializer.data)
        return details
    
    def create(self, request, *args, **kwargs):
        """Custom create method to handle multiple image uploads"""
        # print(request.data)
        shop_serializer = ShopDetailsSerializer(data=request.data)
        if shop_serializer.is_valid():
            shop = shop_serializer.save(owner=self.request.user)  # Save shop details
             # Handle multiple image uploads
            images = request.data['images']  
            print(images)
            for image in images:
                ShopImages.objects.create(shop=shop, image=image)
            return Response({"message": "Shop and images added successfully"}, status=201)
        return Response(shop_serializer.errors, status=401)


class ShopUpdateView(generics.UpdateAPIView):
    permission_classes = [ IsAuthenticated,IsAdminUser]
    # queryset = ShopDetails.objects.all()
    serializer_class = ShopDetailsSerializer
    lookup_field = 'pk'  

    def get_queryset(self):
        return ShopDetails.objects.filter(owner=self.request.user)


class ShopUpdateDestroyRetriveView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ShopDetailsSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        return ShopDetails.objects.filter(owner=self.request.user)
   

# class ShopImageListCreateView(generics.ListCreateAPIView):
#     queryset = ShopImages.objects.all()
#     serializer_class = ShopImageSerializer

    

#     def create(self, request, *args, **kwargs):
#         """Custom create method to allow multiple images upload"""
#         shop_id = request.data.get('shop')
#         images = request.FILES.getlist('images')
#         if not shop_id:
#             return Response({"error": "Shop ID is required"}, status=400)

#         try:
#             shop = ShopDetails.objects.get(id=shop_id)
#             for image in images:
#                 ShopImages.objects.create(shop=shop, image=image)
#             return Response({"message": "Images uploaded successfully"}, status=201)
#         except ShopDetails.DoesNotExist:
#             return Response({"error": "Shop not found"}, status=404)
