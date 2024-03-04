from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.views.generic import (
    DetailView,
    ListView,
    CreateView,
    UpdateView,
    DeleteView,
)
from django_htmx.http import (
    trigger_client_event,
    HttpResponseClientRefresh,
    HttpResponseClientRedirect,
)

from utilities_tracker.core.views import UserRestrictedMixin, BaseDetailView
from .models import Home


class HomeListView(LoginRequiredMixin, UserRestrictedMixin, ListView):
    model = Home
    context_object_name = "homes"

    def get_template_names(self):
        if self.request.htmx:
            return ["homes/partials/homes.html"]

        return super().get_template_names()


class HomeDetailView(BaseDetailView):
    model = Home
    context_object_name = "home"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context["providers"] = self.object.providers.select_related("category").all()

        return context


class HomeCreateView(
    LoginRequiredMixin, SuccessMessageMixin, UserRestrictedMixin, CreateView
):
    model = Home
    fields = ("title", "location", "area")
    success_message = _("Home/apartment has been successfully added")

    def form_valid(self, form):
        form.instance.user = self.request.user

        if not self.request.htmx:
            return super().form_valid(form)

        form.save()

        response = HttpResponse(status=204)

        trigger_client_event(response, "home-list-changed")
        trigger_client_event(
            response,
            "show-message",
            {"message": self.get_success_message(form.cleaned_data)},
        )

        return response


class HomeUpdateView(
    LoginRequiredMixin, SuccessMessageMixin, UserRestrictedMixin, UpdateView
):
    model = Home
    fields = ("title", "location", "area")
    success_message = _("Home/apartment has been successfully updated")

    def form_valid(self, form):
        response = super().form_valid(form)

        if self.request.htmx:
            return HttpResponseClientRefresh()

        return response


class HomeDeleteView(
    LoginRequiredMixin, SuccessMessageMixin, UserRestrictedMixin, DeleteView
):
    model = Home
    success_url = reverse_lazy("homes:index")

    def form_valid(self, form):
        response = super().form_valid(form)

        if not self.request.htmx:
            return response

        return HttpResponseClientRedirect(response.url)
