from django.urls import path

from . import views

app_name = "pages"

urlpatterns = [
    path("about-us/", views.about, name="about"),
    path("", views.index, name="index"),
]
