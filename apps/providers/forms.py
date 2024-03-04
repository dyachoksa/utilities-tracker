from django import forms

from .models import Category, PaymentPlan


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ("name", "color", "icon")
        widgets = {
            "color": forms.TextInput(attrs={"type": "color"}),
        }


class PaymentPlanForm(forms.ModelForm):
    start_date = forms.DateField(widget=forms.TextInput(attrs={"type": "date"}))

    class Meta:
        model = PaymentPlan
        fields = ("amount", "start_date", "payment_type")
