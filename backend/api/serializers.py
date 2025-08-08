from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import ClassSession, Note, CustomUser, Teacher, Child, ClassRoom, Admin, Parent
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(required=False)
    lastName = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    phone = serializers.CharField(required=False)
    name = serializers.CharField(required=False)
    class Meta:
        model = User
        fields = ["id", "username", "password", "role", "firstName", "lastName", "email", "phone", "name"]
        extra_kwargs = {
            "password": {"write_only": True}
        }
    def create(self, validated_data):
        user_data = {
        'username': validated_data.get('username'),
        'password': validated_data.get('password'),
        'role': validated_data.get('role'),
        'email': validated_data.get('email')
        }
        user = User.objects.create_user(**user_data)
        
        
        role = validated_data.get('role')
        if role == 'teacher':
            Teacher.objects.create(user=user, name=validated_data.get('name'))
        if role == 'parent':
            Parent.objects.create(
                firstName=validated_data.get('firstName'),
                lastName=validated_data.get('lastName'),
                phone= validated_data.get('phone'),
                user=user)  

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

class ParentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    class Meta:
        model = Parent
        fields = ["id", "firstName", "lastName", "email", "phone"]
        extra_kwargs = {
            "phone": {"required": True, "allow_blank": False}
        }

class TeacherSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    class Meta:
        model = Teacher
        fields = ["id", "user", "name", 'email']
        extra_kwargs = {
            "user": {"read_only": True}
        }

class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = ["id", "name", "age", "personal_id", "parent_name"]
        

class ClassRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ["id", "title", "subject", "type", "teacher", "children", "start_date", "end_date", "start_time", "end_time", "repeat_days"]
        
class ClassRoomMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ['id', 'title', 'subject', "type", 'start_time', 'end_time']

class ClassSessionSerializer(serializers.ModelSerializer):
    classRoom = ClassRoomMiniSerializer()

    class Meta:
        model = ClassSession
        fields = ['id', 'classRoom', 'date', 'meetUrl', 'isCanceled']
        
        

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ["id", "user"]
        extra_kwargs = {
            "user": {"read_only": True}
        }