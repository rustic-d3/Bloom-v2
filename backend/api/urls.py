from django.urls import path
from . import views


urlpatterns = [
    path('classrooms/', views.CreateClassRoomview.as_view(), name='create_classroom'),
    path('classrooms/<int:pl>/', views.DeleteClassRoomView.as_view(), name='delete_classroom'),

]