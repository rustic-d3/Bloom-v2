import datetime
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, NoteSerializer, ClassRoomSerializer, CustomTokenObtainPairSerializer, TeacherSerializer, ParentSerializer, ChildSerializer
from .models import Note, ClassRoom, Teacher, Parent, Child
from .permissions import IsAdminRole, IsTeacherRole, IsParentRole


User = get_user_model()
print(datetime.date.today().strftime('%Y-%m-%d'))

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  

class ListUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminRole]

class ParentListView(generics.ListAPIView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_classes = [AllowAny]

class TeacherListView(generics.ListAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAdminRole]

class TokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    
class CreateChildView(generics.CreateAPIView):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer
    permission_classes = [IsAdminRole]

class Childview(generics.ListAPIView):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer
    permission_classes = [IsAdminRole]
    
class ChildUpdateview(generics.RetrieveUpdateDestroyAPIView):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer
    permission_classes = [AllowAny]

class ParentUpdateview(generics.RetrieveUpdateDestroyAPIView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_classes = [AllowAny]

class TeacherUpdateview(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAdminRole]

class TeacherDeleteview(generics.DestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAdminRole]
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = instance.user
        self.perform_destroy(instance)
        user.delete()  
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TeacherObtainView(generics.RetrieveAPIView):
    serializer_class = TeacherSerializer
    permission_classes = [IsTeacherRole]
    
    def get_queryset(self):
        return Teacher.objects.all()
    
    def get_object(self):
        user_id = self.kwargs['user_id'];
        
        return self.get_queryset().get(user__id=user_id)
    
    

class ParentDeleteview(generics.DestroyAPIView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_classes = [IsAdminRole]
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = instance.user
        self.perform_destroy(instance)
        user.delete()  
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ChildDeleteview(generics.DestroyAPIView):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer
    permission_classes = [IsAdminRole]

class CreateClassRoomview(generics.ListCreateAPIView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer
    permission_classes = [IsAdminRole]
    
    

class ClassRoomView(generics.ListAPIView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer
    permission_classes = [IsAdminRole]

    # def get_queryset(self):
    #     ClassRoom.objects.filter(end_time__lt = datetime.date.today()).delete()
    #     return ClassRoom.objects.all()


