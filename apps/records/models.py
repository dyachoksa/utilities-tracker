from datetime import date
from decimal import Decimal

from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class Record(models.Model):
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="records",
        verbose_name=_("user"),
    )
    home = models.ForeignKey(
        "homes.Home",
        on_delete=models.CASCADE,
        related_name="records",
        verbose_name=_("home"),
    )
    provider = models.ForeignKey(
        "providers.Provider",
        on_delete=models.CASCADE,
        related_name="records",
        verbose_name=_("provider"),
    )
    payment_plan = models.ForeignKey(
        "providers.PaymentPlan",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="records",
        verbose_name=_("payment plan"),
    )
    record_date = models.DateField(
        _("record date"),
        db_index=True,
        default=date.today,
        help_text=_("Any date in the period for which you are going to pay"),
    )
    prev_numbers = models.IntegerField(
        _("previous numbers"),
        help_text=_("The numbers on the counter at the end of the previous period"),
        default=0,
        blank=True,
    )
    current_numbers = models.IntegerField(
        _("current numbers"),
        help_text=_("The current numbers on the counter"),
        default=0,
        blank=True,
    )
    total_to_pay = models.DecimalField(
        _("total to pay"),
        max_digits=12,
        decimal_places=2,
        default=Decimal("0"),
        blank=True,
        help_text=_("Leave blank to auto-calculate"),
    )
    total_paid = models.DecimalField(
        _("total paid"),
        max_digits=12,
        decimal_places=2,
        default=Decimal("0"),
        blank=True,
    )
    is_paid = models.BooleanField(_("paid"), default=False, blank=True)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        verbose_name = _("record")
        verbose_name_plural = _("records")

    def __str__(self):
        return str(self.record_date)

    def __repr__(self):
        return "<Record id={} user={} provider={} date={}> total={}".format(
            self.id, self.user_id, self.provider_id, self.record_date, self.total_to_pay
        )

    def get_category_color(self):
        return self.provider.category.color

    def get_category_name(self):
        return self.provider.category.name

    def get_category_icon(self):
        return self.provider.category.icon

    def get_home_title(self):
        return self.provider.home.title

    def get_provider_name(self):
        return self.provider.name

    def get_edit_url(self):
        return reverse("records:edit", kwargs={"pk": self.id})

    def get_delete_url(self):
        return reverse("records:delete", kwargs={"pk": self.id})

    def get_add_payment_url(self):
        return reverse("records:add-payment", kwargs={"pk": self.id})
