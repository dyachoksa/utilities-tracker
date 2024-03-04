from decimal import Decimal

from django.contrib.auth.decorators import login_required
from django.db.models import Sum, F
from django.db.models.functions import TruncMonth
from django.shortcuts import render, get_object_or_404

import pendulum as dates

from apps.providers.models import Provider
from apps.records.models import Record
from apps.stats.utils import generate_month_series_dict


@login_required
def provider_usage(request, provider_id):
    provider = get_object_or_404(Provider, id=provider_id)

    # 0. Common vars
    interval_length = 12  # latest 12 months usage
    today = dates.today()
    start_date = today.start_of("month").subtract(months=interval_length)
    end_date = today.start_of("month").subtract(months=1).end_of("month")

    empty_value = {
        "total": Decimal("0"),
        "expected_total": Decimal("0"),
        "usage": 0,
        "period": None,
        "label": None,
    }

    # 1. Generate series
    series = generate_month_series_dict(
        empty_value, length=interval_length, start_date=start_date, end_date=end_date
    )

    # 2. Get usage from database
    qs = (
        Record.objects.filter(user=request.user, provider=provider)
        .filter(record_date__range=(start_date, end_date))
        .annotate(period=TruncMonth("record_date"))
        .values("period")
        .annotate(total=Sum("total_paid"))
        .annotate(expected_total=Sum("total_to_pay"))
        .annotate(usage=Sum(F("current_numbers") - F("prev_numbers")))
        .order_by("period")
    )
    results = dict(
        map(
            lambda r: (
                r["period"].isoformat(),
                {
                    "period": dates.instance(r["period"]),
                    "label": r["period"].strftime("%b, %Y"),
                    "total": round(r["total"], 2),
                    "expected_total": round(r["expected_total"], 2),
                    "usage": r["usage"],
                },
            ),
            list(qs),
        )
    )

    context = {
        "data": list((series | results).values()),
        "provider": provider,
    }

    return render(request, "stats/provider_usage.html", context=context)
