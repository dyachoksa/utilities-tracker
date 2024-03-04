from django.core.files.storage import storages
from django.contrib.staticfiles import finders
from django.http import FileResponse, HttpResponseNotFound
from django.views.decorators.cache import cache_control
from django.views.decorators.http import require_GET


@require_GET
@cache_control(max_age=60 * 60 * 24, immutable=True, public=True)
def favicon(request):
    staticfiles = storages["staticfiles"]

    if staticfiles.exists("favicon.ico"):
        return FileResponse(staticfiles.open("favicon.ico"))

    favicon_path = finders.find("favicon.ico")
    if favicon_path:
        return FileResponse(open(favicon_path, "rb"))

    return HttpResponseNotFound("No favicon")
