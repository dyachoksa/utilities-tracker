from django.contrib import admin
from django.urls import path, include, re_path

from .views import favicon

urlpatterns = [
    # dev implementation of /favicon.ico
    re_path(r"^favicon\.ico$", favicon),
    path("__debug__/", include("debug_toolbar.urls")),
    path("i18n/", include("django.conf.urls.i18n")),
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("accounts/", include("apps.users.urls")),
    path("dashboard/", include("apps.dashboard.urls")),
    path("homes/", include("apps.homes.urls")),
    path("providers/", include("apps.providers.urls")),
    path("records/", include("apps.records.urls")),
    path("stats/", include("apps.stats.urls")),
    path("", include("apps.pages.urls")),
]
