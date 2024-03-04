from django_bootstrap5.renderers import FieldRenderer as BaseFieldRenderer


class FieldRenderer(BaseFieldRenderer):
    def get_server_side_validation_classes(self):
        return "is-invalid" if self.field_errors else ""
