from django.urls import path, include
from . import views, viewsets

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', viewsets.UserListViewset)

app_name = 'users'

urlpatterns = [
    path('', include(router.urls)),
]