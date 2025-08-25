"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import AllAvailabilitiesView, AllChildClassroomView, AllClassroomsView, AllSessionsView, AllTeachersView, AssignChildToClass, AvailabilityCreateAPIView, AvailabilityView, ChildClassroomsView, ChildDeleteview, ChildUpdateview, ChildrenOfParentView, ChildrenOfTeacherView, CreateUserView, FeedbackCreateView, FeedbackForChildView, FeedbackListView, GetChildView, ParentDeleteview, ParentObtainView, ParentUpdateview, SendNotification, TeacherClassroomsView, TeacherDeleteview, TeacherObtainIdView, TeacherObtainView, TeacherSessionsView, TeacherUpdateview, ListUserView, TeacherListView, ParentListView, CreateChildView, Childview
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import CustomTokenObtainPairView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path('api/user/register/child/', CreateChildView.as_view(), name="child_register"),
    path('api/user/list/', ListUserView.as_view(), name="list_users"),
    path('api/user/teachers/list/', TeacherListView.as_view(), name="list_teachers"),
    path('api/user/parents/list/', ParentListView.as_view(), name="list_parents"),
    path('api/children/list/', Childview.as_view(), name= 'get_children'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('api-auth/', include("rest_framework.urls")),
    path('api/', include('api.urls')),
    path('api/update/parent/<int:pk>/', ParentUpdateview.as_view(), name='update parent'),
    path('api/update/child/<int:pk>/', ChildUpdateview.as_view(), name='update child'),
    path('api/update/teacher/<int:pk>/', TeacherUpdateview.as_view(), name='update teacher'),
    path('api/delete/teacher/<int:pk>/', TeacherDeleteview.as_view(), name='delete teacher'),
    path('api/delete/parent/<int:pk>/', ParentDeleteview.as_view(), name='delete parent'),
    path('api/delete/child/<int:pk>/', ChildDeleteview.as_view(), name='delete child'),
    path('api/get/teacher/<int:user_id>/', TeacherObtainView.as_view(), name='get teacher'),
    path('api/get/teacher-id/<int:user_id>/', TeacherObtainIdView.as_view(), name='get-teacher-with-id'),
    path('api/get/parent/<int:user_id>/', ParentObtainView.as_view(), name='get parent'),
    path('api/get/classrooms/', TeacherSessionsView.as_view(), name='get classrooms'),
    path('api/assign-child-to-class/', AssignChildToClass.as_view(), name='assign child to class'),
    path('api/get/all-classrooms/', AllClassroomsView.as_view(), name='get all classrooms'),
    path('api/sendNotification/', SendNotification.as_view(), name="Send Notification"),
    path('api/availabilities/create/', AvailabilityCreateAPIView.as_view(), name='create-availabilities'),
    path('api/availabilities/view/', AvailabilityView.as_view(), name='view-availabilities'),
    path('api/allTeachers/view/', AllTeachersView.as_view(), name='view-all-teachers'),
    path('api/get/children/classrooms/', AllChildClassroomView.as_view(), name='view-all-session-for-children'),
    path('api/get/allSessions/', AllSessionsView.as_view(), name='view-all-sessions'),
    path('api/get/allAvailabilities/<int:teacher_id>', AllAvailabilitiesView.as_view(), name='view-all-availabilities'),
    path('api/get/children/', ChildrenOfParentView.as_view(), name='view-all-children-of-parent-id'),
    path('api/get/children/courses/', ChildClassroomsView.as_view(), name='view-all-children-classrooms'),
    path('api/get/teacher/children/', ChildrenOfTeacherView.as_view(), name='view-all-children-of-teacher' ),
    path('api/get/teacher/classrooms/', TeacherClassroomsView.as_view(), name='view-all-classrooms-of-teacher' ),
    path('api/get/feedbacks/', FeedbackListView.as_view(), name='get-feedback' ),
    path('api/create/feedback/', FeedbackCreateView.as_view(), name='create-feedback' ),
    path('api/get/feedback/child/<int:child_id>', FeedbackForChildView.as_view(), name='get-feedback-for a child' ),
    path('api/get/child/<int:pk>/', GetChildView.as_view(), name='get-child-with-id' ),
    
]
