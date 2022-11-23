from django.urls import path
from . import views, viewsets

app_name = 'accounts'

urlpatterns = [
    path('login/token/', views.AdminAuthToken.as_view())
]
