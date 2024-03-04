from django.urls import path

from .views import UserUpdateView

app_name = "users"

urlpatterns = [
    path("profile/", UserUpdateView.as_view(), name="profile"),
]
