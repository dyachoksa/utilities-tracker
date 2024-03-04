from django import forms
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

from apps.homes.models import Home
from apps.providers.models import Provider
from .models import Record


class RecordForm(forms.ModelForm):
    home = forms.ModelChoiceField(
        queryset=Home.objects.none(),
        widget=forms.Select(
            attrs={
                "class": "form-select",
                "data-include": "true",
                "hx-get": reverse_lazy("records:create"),
                "hx-target": "#dialog",
                "hx-include": "[data-include]",
            }
        ),
    )
    provider = forms.ModelChoiceField(
        queryset=Provider.objects.none(),
        widget=forms.Select(
            attrs={
                "class": "form-select",
                "data-include": "true",
                "hx-get": reverse_lazy("records:create"),
                "hx-target": "#dialog",
                "hx-include": "[data-include]",
            }
        ),
    )
    record_date = forms.DateField(
        widget=forms.TextInput(attrs={"type": "date", "data-include": "true"}),
        help_text=_("Any date in the period for which you are going to pay"),
    )
    total_to_pay = forms.DecimalField(
        initial="",
        min_value=0,
        max_digits=12,
        decimal_places=2,
        required=False,
        help_text=_("Leave blank to auto-calculate"),
    )

    class Meta:
        model = Record
        fields = (
            "home",
            "provider",
            "record_date",
            "prev_numbers",
            "current_numbers",
            "total_to_pay",
            "total_paid",
            "is_paid",
        )

    def __init__(self, *args, request=None, **kwargs):
        super().__init__(*args, **kwargs)

        if request is None:
            return

        self.fields["home"].queryset = Home.objects.filter(user=request.user)

        home_id = request.POST.get("home") or request.GET.get("home")
        if home_id:
            provider_qs = Provider.objects.filter(user=request.user).filter(
                home=home_id
            )
        else:
            provider_qs = Provider.objects.none()

        self.fields["provider"].queryset = provider_qs


class RecordUpdateForm(forms.ModelForm):
    home = forms.ModelChoiceField(queryset=Home.objects.none(), disabled=True)
    provider = forms.ModelChoiceField(queryset=Provider.objects.none(), disabled=True)
    record_date = forms.DateField(disabled=True)

    total_to_pay = forms.DecimalField(
        initial="", min_value=0, max_digits=12, decimal_places=2, required=False
    )

    class Meta:
        model = Record
        fields = (
            "home",
            "provider",
            "record_date",
            "prev_numbers",
            "current_numbers",
            "total_to_pay",
            "total_paid",
            "is_paid",
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        instance = kwargs.get("instance")

        self.fields["home"].queryset = Home.objects.filter(
            user_id=instance.user_id
        ).filter(id=instance.home_id)
        self.fields["provider"].queryset = Provider.objects.filter(
            user_id=instance.user_id
        ).filter(id=instance.provider_id)
