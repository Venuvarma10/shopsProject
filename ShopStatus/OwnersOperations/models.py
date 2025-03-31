from django.db import models

from django.contrib.auth.models import User

# Create your models here.

class ShopDetails(models.Model):
    name = models.TextField()
    address = models.TextField()
    state = models.TextField()
    city = models.TextField()
    country = models.TextField()
    pincode = models.TextField()
    category = models.TextField()
    # services=models.JSONField(default=list,null=True)
    owner=models.ForeignKey(User,on_delete=models.CASCADE)
    openingtime=models.TextField()
    closingtime=models.TextField()
    Status=models.BooleanField(default=False)
    worikingdays=models.JSONField(null=True)
    # location = models.PointField()
   


class ShopImages(models.Model):
    shop = models.ForeignKey(ShopDetails, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="shop_images/")





# from django.contrib.gis.measure import D
# from django.contrib.gis.db.models.functions import Distance
# from django.contrib.gis.geos import Point
# from .models import Place

# user_location = Point(77.5946, 12.9716)  # (longitude, latitude)

# nearby_places = Place.objects.annotate(
#     distance=Distance('location', user_location)
# ).filter(distance__lte=D(km=10))  # Finds places within 10 km