from django.urls import include, path
from . import views

urlpatterns = [
    path("get_all_todos", views.get_all_todos),
    path("create_todo", views.create_todo),
    path('update_todo/<int:id>', views.update_todo),
    path('delete_todo/<int:id>', views.delete_todo),
]
