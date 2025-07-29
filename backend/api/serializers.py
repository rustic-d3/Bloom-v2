from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Note, CustomUser, Teacher, Child, ClassRoom, Admin
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "role"]
        extra_kwargs = {
            "password": {"write_only": True}
        }
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {
            "author": {"read_only": True}
        }


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ["id", "user", "name", "subject"]
        extra_kwargs = {
            "user": {"read_only": True}
        }

class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = ["id", "user", "name", "age", "personal_id"]
        extra_kwargs = {
            "user": {"read_only": True}
        }

class ClassRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ["id", "title", "type", "teacher", "children", "start_date", "end_date", "start_time", "end_time"]
        extra_kwargs = {
            "teacher": {"read_only": True},
            "children": {"required": False}
        }

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ["id", "user"]
        extra_kwargs = {
            "user": {"read_only": True}
        }