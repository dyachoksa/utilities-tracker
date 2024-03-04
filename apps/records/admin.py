from django.contrib import admin

from .models import Record


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    date_hierarchy = "record_date"

    readonly_fields = ("created_at", "updated_at")

    list_display = (
        "id",
        "provider",
        "record_date",
        "prev_numbers",
        "current_numbers",
        "total_to_pay",
        "total_paid",
        "is_paid",
        "created_at",
        "updated_at",
    )
    list_display_links = ("id", "record_date")
    list_filter = ("user", "record_date", "is_paid", "created_at", "updated_at")
    list_select_related = ("provider",)
