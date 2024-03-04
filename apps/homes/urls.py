from django.urls import path

from .views import (
    HomeListView,
    HomeDetailView,
    HomeCreateView,
    HomeUpdateView,
    HomeDeleteView,
)

app_name = "homes"

urlpatterns = [
    path("create/", HomeCreateView.as_view(), name="create"),
    path("<int:pk>/edit/", HomeUpdateView.as_view(), name="edit"),
    path("<int:pk>/delete/", HomeDeleteView.as_view(), name="delete"),
    path("<int:pk>/", HomeDetailView.as_view(), name="detail"),
    path("", HomeListView.as_view(), name="index"),
]
