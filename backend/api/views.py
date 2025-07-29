from django.shortcuts import render

from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, NoteSerializer, ClassRoomSerializer, CustomTokenObtainPairSerializer
from .models import Note, ClassRoom
from .permissions import IsAdminRole


User = get_user_model()
admin = User.objects.filter(role='admin').first()
print(admin.username if admin else "No admin user found")

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminRole]  

class TokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CreateNoteView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)
    

class CreateClassRoomview(generics.ListCreateAPIView):
    serializer_class = ClassRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        teacher = user.teacher if hasattr(user, 'teacher') else None
        return ClassRoom.objects.filter(teacher = teacher)
    def perform_create(self, serializer):
        user = self.request.user
        teacher = user.teacher if hasattr(user, 'teacher') else None

        if serializer.is_valid():
            serializer.save(teacher=teacher)
        else:
            print(serializer.errors)

class DeleteClassRoomView(generics.DestroyAPIView):
    serializer_class = ClassRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        teacher = user.teacher if hasattr(user, 'teacher') else None
        return ClassRoom.objects.filter(teacher = teacher)