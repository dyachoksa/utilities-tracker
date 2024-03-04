from django.urls import path

from .views import (
    CategoryListView,
    CategoryCreateView,
    CategoryUpdateView,
    CategoryDeleteView,
    ProviderListView,
    ProviderCreateView,
    ProviderUpdateView,
    ProviderDeleteView,
    ProviderDetailView,
    PaymentPlanListView,
    PaymentPlanCreateView,
    PaymentPlanUpdateView,
    PaymentPlanDeleteView,
)

app_name = "providers"

urlpatterns = [
    path("categories/create/", CategoryCreateView.as_view(), name="category-create"),
    path(
        "categories/<int:pk>/edit/",
        CategoryUpdateView.as_view(),
        name="category-edit",
    ),
    path(
        "categories/<int:pk>/delete/",
        CategoryDeleteView.as_view(),
        name="category-delete",
    ),
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("create/", ProviderCreateView.as_view(), name="create"),
    path(
        "<int:provider_id>/payment-plans/",
        PaymentPlanListView.as_view(),
        name="payment-plan-list",
    ),
    path(
        "<int:provider_id>/payment-plans/create/",
        PaymentPlanCreateView.as_view(),
        name="payment-plan-create",
    ),
    path(
        "<int:provider_id>/payment-plans/<int:pk>/edit/",
        PaymentPlanUpdateView.as_view(),
        name="payment-plan-edit",
    ),
    path(
        "<int:provider_id>/payment-plans/<int:pk>/delete/",
        PaymentPlanDeleteView.as_view(),
        name="payment-plan-delete",
    ),
    path("<int:pk>/edit/", ProviderUpdateView.as_view(), name="edit"),
    path("<int:pk>/delete/", ProviderDeleteView.as_view(), name="delete"),
    path("<int:pk>/", ProviderDetailView.as_view(), name="detail"),
    path("", ProviderListView.as_view(), name="index"),
]
