from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.views.generic import UpdateView

from .models import User


class UserUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = User
    fields = ("first_name", "last_name")
    template_name = "users/profile.html"
    success_url = reverse_lazy("users:profile")
    success_message = _("Your profile has been successfully updated")

    def get_object(self, queryset=None):
        return self.request.user
