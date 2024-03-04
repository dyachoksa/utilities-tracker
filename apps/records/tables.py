from django.utils.translation import gettext_lazy as _
from django_tables2 import columns, tables

from .models import Record


class RecordTable(tables.Table):
    actions = columns.TemplateColumn(
        template_name="records/tables/actions.html",
        orderable=False,
        verbose_name="",
        attrs={
            "td": {
                "class": "text-end",
            },
        },
    )

    class Meta:
        empty_text = _("There are no records at this moment")
        model = Record
        fields = (
            "home",
            "provider",
            "record_date",
            "total_to_pay",
            "total_paid",
            "is_paid",
        )
        attrs = {
            "thead": {
                "class": "table-primary",
            },
        }
