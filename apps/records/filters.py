from django import forms
from django.utils.translation import gettext_lazy as _
from django_filters import filters, FilterSet

from .models import Record


def homes_qs(request):
    return request.user.homes.all()


def providers_qs(request):
    qs = request.user.providers.all()

    if request.GET.get("home"):
        qs = qs.filter(home=request.GET.get("home"))

    return qs


class BooleanWidget(forms.Select):
    """
    Convert true/false values into the internal Python True/False.
    This can be used for AJAX queries that pass true/false from JavaScript's
    internal types through.

    Note: we need to basically have a copy of the original filter as there is no way
        currently to update choice labels
    """

    def __init__(self, attrs=None):
        choices = (
            ("", _("All records")),
            ("true", _("Paid")),
            ("false", _("Unpaid")),
        )
        super().__init__(attrs, choices)

    def render(self, name, value, attrs=None, renderer=None):
        try:
            value = {True: "true", False: "false", "1": "true", "0": "false"}[value]
        except KeyError:
            value = ""
        return super().render(name, value, attrs, renderer=renderer)

    def value_from_datadict(self, data, files, name):
        value = data.get(name, None)
        if isinstance(value, str):
            value = value.lower()

        return {
            "1": True,
            "0": False,
            "true": True,
            "false": False,
            True: True,
            False: False,
        }.get(value, None)


class RecordFilterSet(FilterSet):
    home = filters.ModelChoiceFilter(queryset=homes_qs, empty_label=_("All homes"))
    provider = filters.ModelChoiceFilter(
        queryset=providers_qs, empty_label=_("All providers")
    )
    is_paid = filters.BooleanFilter(widget=BooleanWidget())

    class Meta:
        model = Record
        fields = ("home", "provider", "is_paid")
