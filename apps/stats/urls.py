from django.urls import path

from . import views


app_name = "stats"

urlpatterns = [
    path(
        "provider-usage/<int:provider_id>/", views.provider_usage, name="provider-usage"
    ),
]
