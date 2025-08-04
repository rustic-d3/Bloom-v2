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
from api.views import ChildUpdateview, CreateUserView, ParentUpdateview, TeacherDeleteview, TeacherUpdateview, TokenObtainPairView, ListUserView, TeacherListView, ParentListView, CreateChildView, Childview
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path('api/user/register/child/', CreateChildView.as_view(), name="child_register"),
    path('api/user/list/', ListUserView.as_view(), name="list_users"),
    path('api/user/teachers/list/', TeacherListView.as_view(), name="list_teachers"),
    path('api/user/parents/list/', ParentListView.as_view(), name="list_parents"),
    path('api/children/list/', Childview.as_view(), name= 'get_children'),
    path('api/token/', TokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('api-auth/', include("rest_framework.urls")),
    path('api/', include('api.urls')),
    path('api/update/parent/<int:pk>/', ParentUpdateview.as_view(), name='update parent'),
    path('api/update/child/<int:pk>/', ChildUpdateview.as_view(), name='update child'),
    path('api/update/teacher/<int:pk>/', TeacherUpdateview.as_view(), name='update teacher'),
    path('api/delete/teacher/<int:pk>/', TeacherDeleteview.as_view(), name='delete teacher')
    
]
