from django.urls import path

from apps.records.views import (
    RecordListView,
    RecordCreateView,
    RecordUpdateView,
    RecordPaymentView,
    RecordDeleteView,
)

app_name = "records"

urlpatterns = [
    path("create/", RecordCreateView.as_view(), name="create"),
    path("<int:pk>/edit/", RecordUpdateView.as_view(), name="edit"),
    path("<int:pk>/add-payment/", RecordPaymentView.as_view(), name="add-payment"),
    path("<int:pk>/delete/", RecordDeleteView.as_view(), name="delete"),
    path("", RecordListView.as_view(), name="index"),
]
