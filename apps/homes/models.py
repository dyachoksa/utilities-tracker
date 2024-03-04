from decimal import Decimal

from django.db import models
from django.urls import reverse
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _


class Home(models.Model):
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="homes",
        verbose_name=_("user"),
    )
    title = models.CharField(_("title"), max_length=150)
    location = models.CharField(
        _("location"),
        max_length=300,
        blank=True,
        null=True,
        help_text=_(
            "The location of the home/apartment. Usually, "
            "geographical location, post address or similar."
        ),
    )
    area = models.DecimalField(
        _("area"),
        max_digits=12,
        decimal_places=2,
        default=Decimal("0"),
        help_text=_(
            "The area of the home or apartment in the square meters, fts, etc."
        ),
    )
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        ordering = ("title",)
        verbose_name = _("home")
        verbose_name_plural = _("homes")

    def __str__(self):
        return self.title

    def __repr__(self):
        return "<Home id={} user={} title={}>".format(self.pk, self.user_id, self.title)

    @property
    def full_label(self):
        return "{} / {} ({} m2)".format(
            self.title, self.location or "-", self.area or "-"
        )

    @property
    def full_label_html(self):
        return format_html(
            "{} / {} ({} m<sup>2</sup>)",
            self.title,
            self.location or "-",
            self.area or "-",
        )

    def get_absolute_url(self):
        return reverse("homes:detail", kwargs={"pk": self.pk})

    def get_edit_url(self):
        return reverse("homes:edit", kwargs={"pk": self.pk})

    def get_delete_url(self):
        return reverse("homes:delete", kwargs={"pk": self.pk})
