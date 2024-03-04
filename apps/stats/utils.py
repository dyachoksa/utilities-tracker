import pendulum as dates


def generate_month_series_dict(empty_value, start_date=None, end_date=None, length=12):
    """
    Generates a dictionary with numbers of keys equal to 'length' and 'empty_value' as
    a base value for the 'length' months interval. The month will be added to the value
    as a date object under the key 'period'.
    """
    today = dates.today()

    if start_date is None:
        start_date = today.start_of("month").subtract(months=length)

    if end_date is None:
        end_date = today.start_of("month").subtract(months=1).end_of("month")

    interval = dates.interval(start_date, end_date)
    return dict(
        map(
            lambda d: (
                d.to_date_string(),
                empty_value | {"period": d.date(), "label": d.format("MMM, YYYY")},
            ),
            interval.range("months"),
        )
    )
