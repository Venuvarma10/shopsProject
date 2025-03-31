from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ShopDetails,ShopImages


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','password']

    
    def create(self,validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],            
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
# class UserSerializer(serializers.ModelSerializer):
#     full_name = serializers.SerializerMethodField()
#     class Meta:
#         model = User
#         fields = [ 'full_name']  
#     def get_full_name(self,obj):
#         return obj.get_full_name()

class ShopImageSerializer(serializers.ModelSerializer):
   class Meta:
        model=ShopImages
        fields='__all__'


class ShopDetailsSerializer(serializers.ModelSerializer):
    images = ShopImageSerializer(many=True, read_only=True)
    # owner = UserSerializer()
    owner_name=serializers.SerializerMethodField()

    class Meta:
        model=ShopDetails
        fields='__all__'
        extra_kwargs = {"owner": {'read_only':True}}
        # depth = 1
    
    def get_owner_name(self,obj):
        return obj.owner.get_full_name()