from django.urls import path
from . import views


urlpatterns = [
    path('create/classrooms/', views.CreateClassRoomview.as_view(), name='create_classroom'),
    path('classrooms/', views.ClassRoomView.as_view(), name='view_classrooms'),

]