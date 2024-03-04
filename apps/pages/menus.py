from django.urls import reverse
from django.utils.translation import gettext_lazy as _, pgettext_lazy as pgettext
from simple_menu import Menu, MenuItem


Menu.add_item("main", MenuItem(_("Dashboard"), url=reverse("dashboard:index")))
Menu.add_item("main", MenuItem(_("Homes & Apartments"), url=reverse("homes:index")))
Menu.add_item("main", MenuItem(_("Providers"), url=reverse("providers:index")))
Menu.add_item("main", MenuItem(_("Records"), url=reverse("records:index")))

Menu.add_item(
    "guest",
    MenuItem(pgettext("menu", "Home"), url=reverse("pages:index"), exact_url=True),
)
Menu.add_item("guest", MenuItem(_("About us"), url=reverse("pages:about")))
