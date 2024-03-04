from http import HTTPStatus

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.views.generic import (
    CreateView,
    ListView,
    UpdateView,
    DeleteView,
    DetailView,
)
from django_htmx.http import trigger_client_event


class UserRestrictedMixin:
    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(user=self.request.user)


class BaseListView(LoginRequiredMixin, UserRestrictedMixin, ListView):
    htmx_template_name = None

    def get_template_names(self):
        if self.request.htmx and self.htmx_template_name:
            return [self.htmx_template_name]

        return super().get_template_names()


class BaseDetailView(LoginRequiredMixin, UserRestrictedMixin, DetailView):
    pass


class ActionViewMixin:
    change_event_name = None
    success_message = "Success"

    def get_htmx_response(self):
        response = HttpResponse(status=HTTPStatus.NO_CONTENT)

        trigger_client_event(response, self.change_event_name)
        trigger_client_event(
            response, "show-message", {"message": self.success_message}
        )

        return response


class BaseCreateView(
    LoginRequiredMixin, UserRestrictedMixin, ActionViewMixin, CreateView
):
    def form_valid(self, form):
        form.instance.user = self.request.user

        if not self.request.htmx:
            return super().form_valid(form)

        form.save()
        return self.get_htmx_response()


class BaseUpdateView(
    LoginRequiredMixin, UserRestrictedMixin, ActionViewMixin, UpdateView
):
    def form_valid(self, form):
        response = super().form_valid(form)
        return response if not self.request.htmx else self.get_htmx_response()


class BaseDeleteView(
    LoginRequiredMixin, UserRestrictedMixin, ActionViewMixin, DeleteView
):
    def form_valid(self, form):
        if not self.request.htmx:
            return super().form_valid(form)

        super().form_valid(form)
        return self.get_htmx_response()
