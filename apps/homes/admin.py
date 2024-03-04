from django.contrib import admin

from .models import Home


@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    search_fields = ("title", "location")

    list_display = ("id", "title", "location", "area", "user", "created_at")
    list_display_links = ("id", "title")
    list_filter = ("created_at", "user")
    list_select_related = ("user",)
