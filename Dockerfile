ARG PYTHON_VERSION=3.10-slim

FROM python:${PYTHON_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
    gettext \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /code

WORKDIR /code

RUN pip install -U pip wheel
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code

COPY .env.example .env
RUN python manage.py collectstatic --noinput
RUN python manage.py compilemessages

RUN rm -f .env

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "utilities_tracker.wsgi"]
