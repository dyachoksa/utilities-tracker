from decimal import Decimal

from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.shortcuts import render
import pendulum as dates

from apps.providers.models import Category
from apps.records.models import Record
from apps.stats.utils import generate_month_series_dict


@login_required
def index(request):
    today = dates.today().date()
    start_date = today.subtract(months=1).start_of("month")
    end_date = today.subtract(months=1).end_of("month")

    totals = (
        Record.objects.filter(user=request.user)
        .filter(record_date__range=(start_date, end_date))
        .aggregate(
            total_to_pay=Sum("total_to_pay", default=Decimal("0")),
            total_paid=Sum("total_paid", default=Decimal("0")),
        )
    )

    # This month categories stats
    qs = (
        Record.objects.filter(user=request.user)
        .filter(record_date__range=(start_date, end_date))
        .values("provider__category__name", "provider__category__color")
        .annotate(total_paid=Sum("total_paid", default=Decimal("0")))
    )
    this_month_by_category = dict(
        map(
            lambda r: (
                r["provider__category__name"],
                {
                    "category": r["provider__category__name"],
                    "color": r["provider__category__color"],
                    "total_paid": r["total_paid"],
                },
            ),
            qs,
        ),
    )
    categories = list(
        Category.objects.filter(user=request.user).values("name", "color")
    )
    series = {
        category["name"]: {
            "category": category["name"],
            "color": category["color"],
            "total_paid": Decimal("0"),
        }
        for category in categories
    }
    total_by_category_data = list((series | this_month_by_category).values())

    # Last 12-month payments
    today = dates.today()
    start_date = today.start_of("month").subtract(months=12)
    end_date = today.start_of("month").subtract(months=1).end_of("month")

    series = generate_month_series_dict(
        {"total_paid": Decimal("0"), "total_to_pay": Decimal("0")},
        start_date=start_date,
        end_date=end_date,
    )
    qs = (
        Record.objects.filter(user=request.user)
        .filter(record_date__range=(start_date, end_date))
        .annotate(period=TruncMonth("record_date"))
        .values("period")
        .annotate(total_paid=Sum("total_paid"))
        .annotate(total_to_pay=Sum("total_to_pay"))
        .order_by("period")
    )
    usage = dict(
        map(
            lambda r: (
                r["period"].isoformat(),
                {
                    "period": dates.instance(r["period"]),
                    "label": r["period"].strftime("%b, %Y"),
                    "total_paid": round(r["total_paid"], 2),
                    "total_to_pay": round(r["total_to_pay"], 2),
                },
            ),
            qs,
        )
    )
    usage_data = list((series | usage).values())

    # Latest 5 records
    latest_records = (
        Record.objects.filter(user=request.user)
        .select_related("provider", "provider__category", "provider__home")
        .order_by("-record_date")[:5]
    )

    context = {
        "total_to_pay": totals["total_to_pay"],
        "total_paid": totals["total_paid"],
        "paid_percent": int(
            (totals["total_paid"] / (totals["total_to_pay"] or 1)) * 100
        ),
        "usage_data": usage_data,
        "total_by_category_data": total_by_category_data,
        "latest_records": latest_records,
    }
    return render(request, "dashboard/index.html", context=context)
