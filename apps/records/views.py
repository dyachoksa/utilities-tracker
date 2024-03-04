from typing import Optional

from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django_filters.views import FilterMixin
from django_tables2.views import SingleTableMixin

import pendulum as dates

from utilities_tracker.core.views import (
    BaseListView,
    BaseCreateView,
    BaseUpdateView,
    BaseDeleteView,
)
from apps.providers.models import Provider
from .filters import RecordFilterSet
from .forms import RecordForm, RecordUpdateForm, RecordPaymentForm
from .models import Record
from .tables import RecordTable


class RecordListView(SingleTableMixin, FilterMixin, BaseListView):
    model = Record
    context_object_name = "records"
    htmx_template_name = "records/record_table.html"
    filterset_class = RecordFilterSet
    table_class = RecordTable
    paginate_by = 25
    ordering = ("-record_date",)

    def get_paginate_by(self, table_data) -> Optional[int]:
        if self.request.GET.get("limit"):
            limit = int(self.request.GET.get("limit", 0))
            return limit if limit > 0 else None

        return super().get_paginate_by(table_data)

    def get_queryset(self):
        return super().get_queryset().select_related("home", "provider")

    def get_context_data(self, **kwargs):
        self.object_list = self.get_queryset()

        filterset_class = self.get_filterset_class()
        self.filterset = self.get_filterset(filterset_class)

        if self.filterset.is_valid():
            self.object_list = self.filterset.qs

        exclude = self.request.GET.get("exclude", "").split(",")
        show_filters = "filters" not in exclude

        return super().get_context_data(
            filter=self.filterset, show_filters=show_filters, **kwargs
        )


class RecordCreateUpdateMixin:
    model = Record
    form_class = RecordForm
    change_event_name = "records-changed"
    context_object_name = "record"
    success_url = reverse_lazy("records:index")

    def form_valid(self, form):
        payment_plan = form.instance.provider.get_active_plan_for_date(
            form.instance.record_date
        )
        if payment_plan and form.cleaned_data["total_to_pay"] is None:
            form.instance.total_to_pay = payment_plan.calculate_total_amount(
                form.cleaned_data["prev_numbers"] or 0,
                form.cleaned_data["current_numbers"] or 0,
            )
        else:
            form.instance.total_to_pay = form.cleaned_data["total_to_pay"] or 0

        form.instance.total_paid = form.cleaned_data["total_paid"] or 0
        form.instance.payment_plan = payment_plan

        return super().form_valid(form)


class RecordCreateView(RecordCreateUpdateMixin, BaseCreateView):
    success_message = _("Record has been successfully created")

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()

        kwargs["request"] = self.request
        kwargs["initial"] = {
            "home": self.request.GET.get("home"),
            "provider": self.request.GET.get("provider"),
            "record_date": self.request.GET.get("record_date")
            or dates.today().start_of("month").subtract(months=1).date(),
        }

        return kwargs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        provider_id = self.request.POST.get("provider") or self.request.GET.get(
            "provider"
        )
        provider = (
            Provider.objects.filter(user=self.request.user)
            .filter(id=provider_id)
            .first()
            if provider_id
            else None
        )
        context["provider"] = provider
        context["latest_record"] = provider.latest_record if provider else None

        return context


class RecordUpdateView(RecordCreateUpdateMixin, BaseUpdateView):
    form_class = RecordUpdateForm
    success_message = _("Record has been successfully updated")

    def get_queryset(self):
        return super().get_queryset().select_related("home", "provider")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        provider = self.object.provider

        context["provider"] = provider
        context["latest_record"] = provider.get_latest_record(self.object.record_date)
        return context


class RecordPaymentView(BaseUpdateView):
    model = Record
    form_class = RecordPaymentForm
    template_name = "records/record_payment_form.html"
    change_event_name = "records-changed"
    context_object_name = "record"
    success_url = reverse_lazy("records:index")
    success_message = _("Payment has been successfully added")


class RecordDeleteView(BaseDeleteView):
    model = Record
    change_event_name = "records-changed"
    success_message = _("Record has been successfully deleted")
    success_url = reverse_lazy("records:index")
