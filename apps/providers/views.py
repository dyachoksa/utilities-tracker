from django.db.models import Count
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django_htmx.http import HttpResponseClientRedirect

from utilities_tracker.core.views import (
    BaseCreateView,
    BaseListView,
    BaseUpdateView,
    BaseDeleteView,
    BaseDetailView,
)
from .forms import CategoryForm, PaymentPlanForm
from .models import Category, Provider, PaymentPlan, PaymentPlanType


class ProviderListView(BaseListView):
    model = Provider
    context_object_name = "providers"
    htmx_template_name = "providers/partials/providers.html"

    def get_queryset(self):
        qs = super().get_queryset()

        home_id = self.request.GET.get("home")
        if home_id is not None:
            qs = qs.filter(home_id=home_id)

        return qs.select_related("category", "home")

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)

        context["categories"] = (
            Category.objects.filter(user=self.request.user)
            .annotate(providers_count=Count("providers"))
            .all()
        )

        return context


class CategoryListView(BaseListView):
    model = Category
    context_object_name = "categories"
    htmx_template_name = "providers/partials/categories.html"

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.annotate(providers_count=Count("providers"))


class CategoryCreateView(BaseCreateView):
    model = Category
    form_class = CategoryForm
    success_message = _("Category has been successfully created")
    success_url = reverse_lazy("providers:index")
    change_event_name = "categories-changed"


class CategoryUpdateView(BaseUpdateView):
    model = Category
    form_class = CategoryForm
    success_message = _("Category has been successfully updated")
    success_url = reverse_lazy("providers:index")
    change_event_name = "categories-changed"


class CategoryDeleteView(BaseDeleteView):
    model = Category
    success_message = _("Category has been successfully deleted")
    success_url = reverse_lazy("providers:index")
    change_event_name = "categories-changed"


class ProviderDetailView(BaseDetailView):
    model = Provider

    def get_queryset(self):
        return super().get_queryset().select_related("home")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context["payment_plans"] = (
            PaymentPlan.objects.filter(user=self.request.user)
            .filter(provider=self.object)
            .order_by("-start_date")
        )

        return context


class ProviderCreateView(BaseCreateView):
    model = Provider
    fields = (
        "home",
        "category",
        "name",
        "account_number",
        "website_url",
        "has_counter",
    )
    success_message = _("Provider has been successfully created")
    success_url = reverse_lazy("providers:index")
    change_event_name = "providers-changed"

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()

        home_id = self.request.GET.get("home")
        if self.request.method == "GET" and home_id is not None:
            kwargs.update({"initial": {"home": home_id}})

        return kwargs


class ProviderUpdateView(BaseUpdateView):
    model = Provider
    fields = (
        "home",
        "category",
        "name",
        "account_number",
        "website_url",
        "has_counter",
    )
    success_message = _("Provider has been successfully updated")
    success_url = reverse_lazy("providers:index")
    change_event_name = "providers-changed"


class ProviderDeleteView(BaseDeleteView):
    model = Provider
    success_message = _("Provider has been successfully deleted")
    success_url = reverse_lazy("providers:index")
    change_event_name = "providers-changed"

    def get_htmx_response(self):
        return HttpResponseClientRedirect(self.get_success_url())


class PaymentPlanListView(BaseListView):
    model = PaymentPlan
    context_object_name = "payment_plans"
    htmx_template_name = "providers/partials/payment_plans.html"

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(provider_id=self.kwargs.get("provider_id"))


class PaymentPlanCreateView(BaseCreateView):
    model = PaymentPlan
    form_class = PaymentPlanForm
    context_object_name = "payment_plan"
    success_message = _("Payment plan has been successfully created")
    success_url = reverse_lazy("providers:index")
    change_event_name = "payment-plans-changed"

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()

        provider = Provider.objects.get(id=self.kwargs.get("provider_id"))
        if not provider.has_counter:
            kwargs.update({"initial": {"payment_type": PaymentPlanType.FIXED}})

        return kwargs

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(provider_id=self.kwargs.get("provider_id"))

    def form_valid(self, form):
        form.instance.provider_id = self.kwargs.get("provider_id")
        return super().form_valid(form)


class PaymentPlanUpdateView(BaseUpdateView):
    model = PaymentPlan
    form_class = PaymentPlanForm
    context_object_name = "payment_plan"
    success_message = _("Payment plan has been successfully updated")
    success_url = reverse_lazy("providers:index")
    change_event_name = "payment-plans-changed"

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(provider_id=self.kwargs.get("provider_id"))


class PaymentPlanDeleteView(BaseDeleteView):
    model = PaymentPlan
    context_object_name = "payment_plan"
    success_message = _("Payment plan has been successfully deleted")
    success_url = reverse_lazy("providers:index")
    change_event_name = "payment-plans-changed"

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(provider_id=self.kwargs.get("provider_id"))
