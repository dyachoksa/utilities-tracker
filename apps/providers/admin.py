from django import forms
from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from .models import Category, Provider, PaymentPlan


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")

    search_fields = ("name",)

    list_display = ("id", "name", "color_badge", "user", "created_at")
    list_display_links = ("id", "name")
    list_filter = ("created_at", "user")
    list_select_related = ("user",)

    @admin.display(description=_("Color"), ordering="color")
    def color_badge(self, instance: "Category"):
        return format_html(
            "<span style='color: {0}; font-weight: 500'>{0}</span>", instance.color
        )

    def get_form(self, request, obj=None, change=False, **kwargs):
        kwargs["widgets"] = kwargs.get("widgets", {}) | {
            "color": forms.TextInput(attrs={"type": "color"})
        }

        return super().get_form(request, obj, change, **kwargs)


class PaymentPlanInline(admin.TabularInline):
    model = PaymentPlan
    extra = 1
    fields = ("amount", "start_date", "payment_type")

    def get_extra(self, request, obj=None, **kwargs):
        return self.extra if obj is None else 0


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")

    search_fields = ("name", "account_number")

    list_display = (
        "id",
        "name",
        "account_number",
        "home",
        "category",
        "has_counter",
        "user",
        "created_at",
    )
    list_display_links = ("id", "name")
    list_filter = ("created_at", "has_counter", "user")
    list_select_related = ("user", "home", "category")

    inlines = [PaymentPlanInline]

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)

        for instance in formset.deleted_objects:
            instance.delete()

        for instance in formset.new_objects:
            instance.user = form.instance.user
            instance.save()

        for instance in instances:
            instance.save()


@admin.register(PaymentPlan)
class PaymentPlanAdmin(admin.ModelAdmin):
    date_hierarchy = "start_date"

    ordering = ("-start_date", "provider__name")

    readonly_fields = ("created_at", "updated_at")

    list_display = (
        "id",
        "provider",
        "amount",
        "start_date",
        "payment_type",
        "user",
        "created_at",
    )
    list_display_links = ("id", "amount")
    list_filter = ("start_date", "created_at", "user")
    list_select_related = ("user", "provider")
