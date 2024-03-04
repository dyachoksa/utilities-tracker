from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)

    def __str__(self):
        return self.email

    def __repr__(self):
        return "<User id={} username={} email={} active={}>".format(
            self.id, self.username, self.email, self.is_active
        )

    def get_short_name(self):
        return self.first_name if self.first_name else self.username
