import datetime
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import ClassSessionSerializer, UserSerializer, NoteSerializer, ClassRoomSerializer, CustomTokenObtainPairSerializer, TeacherSerializer, ParentSerializer, ChildSerializer
from .models import ClassSession, Note, ClassRoom, Teacher, Parent, Child
from .permissions import IsAdminRole, IsTeacherRole, IsParentRole
from .services import generate_meet_link, generate_session


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

class TeacherClassroomsView(generics.ListAPIView):
    serializer_class = ClassRoomSerializer
    permission_classes = [IsTeacherRole]
    
    def get_queryset(self):
        teacher = self.request.user.teacher
        return teacher.classes.all()

    
    
    

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
    
    def perform_create(self, serializer):
        classroom = serializer.save()
        generate_session(classroom)
    
    
class TeacherSessionsView(generics.ListAPIView):
    serializer_class = ClassSessionSerializer
    permission_classes = [IsTeacherRole]

    def get_queryset(self):
        user = self.request.user
        return ClassSession.objects.filter(
            classRoom__teacher=user.teacher,
        ).order_by('date')

class ClassRoomView(generics.ListAPIView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer
    permission_classes = [IsAdminRole]

    # def get_queryset(self):
    #     ClassRoom.objects.filter(end_time__lt = datetime.date.today()).delete()
    #     return ClassRoom.objects.all()


