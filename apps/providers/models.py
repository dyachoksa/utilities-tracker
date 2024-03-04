from datetime import date
from decimal import Decimal

import randomcolor
from django.db import models
from django.urls import reverse
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _


def generate_random_color():
    rand_color = randomcolor.RandomColor()
    return rand_color.generate(luminosity="bright", format_="hex")[0]


class CategoryIcon(models.TextChoices):
    DEFAULT = "fa-solid fa-gear", _("&#xf013; - Default icon")
    ENERGY = "fa-solid fa-lightbulb", _("&#xf0eb; - Energy")
    WATER = "fa-solid fa-droplet", _("&#xf043; - Water")
    NATURAL_GAS = "fa-solid fa-fire-flame-simple", _("&#xf46a; - Natural gas")
    HEATING = "fa-solid fa-temperature-arrow-up", _("&#xe040; - Heating")
    MAINTENANCE = "fa-solid fa-screwdriver-wrench", _("&#xf7d9; - Maintenance")


class Category(models.Model):
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="categories",
        verbose_name=_("user"),
    )
    name = models.CharField(_("name"), max_length=100)
    color = models.CharField(
        _("color"), max_length=25, db_default="#be4af5", default=generate_random_color
    )
    icon = models.CharField(
        _("category icon"),
        max_length=50,
        default=CategoryIcon.DEFAULT,
        choices=CategoryIcon.choices,
    )
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        ordering = ("name",)
        verbose_name = _("category")
        verbose_name_plural = _("categories")

    def __str__(self):
        return self.name

    def __repr__(self):
        return "<Category id={} user={} name={}>".format(
            self.id, self.user_id, self.name
        )

    def get_edit_url(self):
        return reverse("providers:category-edit", kwargs={"pk": self.pk})

    def get_delete_url(self):
        return reverse("providers:category-delete", kwargs={"pk": self.pk})


class Provider(models.Model):
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="providers",
        verbose_name=_("user"),
    )
    home = models.ForeignKey(
        "homes.Home",
        on_delete=models.CASCADE,
        related_name="providers",
        verbose_name=_("home/apartment"),
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.RESTRICT,
        related_name="providers",
        verbose_name=_("category"),
    )
    name = models.CharField(_("name"), max_length=100)
    account_number = models.CharField(
        _("account number"), max_length=50, blank=True, null=True
    )
    website_url = models.URLField(_("website url"), blank=True, null=True)
    has_counter = models.BooleanField(_("has counter"), default=True)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        ordering = ("name",)
        verbose_name = _("provider")
        verbose_name_plural = _("providers")

    def __str__(self):
        return self.name

    def __repr__(self):
        return "<Provider id={} user={} home={} category={} name={}>".format(
            self.pk, self.user_id, self.home_id, self.category_id, self.name
        )

    @property
    def color(self):
        return self.category.color

    @cached_property
    def latest_record(self):
        return self.get_latest_record()

    @cached_property
    def current_plan(self):
        return self.get_active_plan_for_date(date.today())

    def get_latest_record(self, exclude_after=None):
        qs = self.records.order_by("-record_date")

        if exclude_after:
            qs = qs.filter(record_date__lt=exclude_after)

        return qs.first()

    def get_active_plan_for_date(self, value: date):
        return (
            self.payment_plans.filter(start_date__lte=value)
            .order_by("-start_date")
            .first()
        )

    def get_absolute_url(self):
        return reverse("providers:detail", kwargs={"pk": self.pk})

    def get_edit_url(self):
        return reverse("providers:edit", kwargs={"pk": self.pk})

    def get_delete_url(self):
        return reverse("providers:delete", kwargs={"pk": self.pk})


class PaymentPlanType(models.TextChoices):
    DEFAULT = "default", _("Default")
    AREA_BASED = "area_based", _("Area based payments")
    FIXED = "fixed", _("Fixed monthly payments")


class PaymentPlan(models.Model):
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="payment_plans",
        verbose_name=_("user"),
    )
    provider = models.ForeignKey(
        Provider,
        on_delete=models.CASCADE,
        related_name="payment_plans",
        verbose_name=_("provider"),
    )
    amount = models.DecimalField(
        _("amount"),
        max_digits=12,
        decimal_places=4,
        default=Decimal("0"),
        db_default="0",
    )
    start_date = models.DateField(_("start date"), default=date.today)
    payment_type = models.CharField(
        _("payment type"),
        max_length=12,
        choices=PaymentPlanType.choices,
        default=PaymentPlanType.DEFAULT,
        db_default=PaymentPlanType.DEFAULT.value,
    )
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        ordering = ("-start_date",)
        verbose_name = _("payment plan")
        verbose_name_plural = _("payment plans")

    def __str__(self):
        return f"{self.amount} / {self.start_date}"

    def __repr__(self):
        return (
            "<PaymentPlan id={} user={} provider={} amount={} start={} type={}>".format(
                self.pk,
                self.user_id,
                self.provider_id,
                self.amount,
                self.start_date,
                self.payment_type,
            )
        )

    @property
    def is_upcoming(self):
        return self.start_date > date.today()

    @cached_property
    def is_active(self):
        return (
            not PaymentPlan.objects.filter(user_id=self.user_id)
            .filter(provider_id=self.provider_id)
            .filter(start_date__range=(self.start_date, date.today()))
            .exclude(pk=self.pk)
            .exists()
        )

    @property
    def is_archived(self):
        return not self.is_active and not self.is_upcoming

    def calculate_total_amount(self, prev_numbers: int = 0, current_numbers: int = 0):
        if self.payment_type == PaymentPlanType.FIXED:
            return self.amount

        if self.payment_type == PaymentPlanType.AREA_BASED:
            from apps.homes.models import Home

            area = (
                Home.objects.filter(user_id=self.user_id)
                .filter(providers__in=[self.provider_id])
                .values_list("area", flat=True)
                .get()
            ) or Decimal("0")

            return self.amount * area

        return self.amount * Decimal(current_numbers - prev_numbers)

    def get_edit_url(self):
        return reverse(
            "providers:payment-plan-edit",
            kwargs={"pk": self.pk, "provider_id": self.provider_id},
        )

    def get_delete_url(self):
        return reverse(
            "providers:payment-plan-delete",
            kwargs={"pk": self.pk, "provider_id": self.provider_id},
        )
