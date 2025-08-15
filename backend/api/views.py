import datetime
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView as SimpleJWTTokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import ClassSessionSerializer, UserSerializer, NoteSerializer, ClassRoomSerializer, CustomTokenObtainPairSerializer, TeacherSerializer, ParentSerializer, ChildSerializer
from .models import Availability, ClassSession, Note, ClassRoom, Teacher, Parent, Child
from .permissions import IsAdminRole, IsTeacherRole, IsParentRole
from .services import generate_meet_link, generate_session, makeCall


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

class CustomTokenObtainPairView(SimpleJWTTokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user  

        if hasattr(user, 'teacher'):
            classrooms = ClassRoom.objects.filter(teacher=user.teacher)
            for classroom in classrooms:
                if not classroom.sessions.exists():
                    print(f"Generating sessions for classroom {classroom.id}")
                    generate_session(classroom)

        response = super().post(request, *args, **kwargs)
        return response

    
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
    
class AssignChildToClass(APIView):
    def post(self, request):
        child_id = request.data.get('child_id')
        classroom_id = request.data.get('classroom_id')
        try:
            child = Child.objects.get(id=child_id)
            classroom = ClassRoom.objects.get(id=classroom_id)
        except(Child.DoesNotExist, ClassRoom.DoesNotExist):
            return Response({"error": "Child or Class not found"}, status=status.HTTP_404_NOT_FOUND)
        classroom.children.add(child)
        classroom.save()
        return Response({"message": f"Child '{child.name}' assigned to class '{classroom.title}'"})
    
    

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

class AllClassroomsView(generics.ListAPIView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer
    permission_classes = [IsAdminRole]
    
    
    

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

class SendNotification(APIView):
    def post(self, request):
        child_id = request.data.get('child_id')
        child = Child.objects.get(id = child_id)
        parent = child.parent_name
        print(parent.phone)
        makeCall(parent.phone)

        return Response({"message": f"Child '{child.name}' has a Parent with id '{parent}'"})


class AvailabilityCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            teacher = Teacher.objects.get(user=user)
        except Teacher.DoesNotExist:
            return Response({"error": "Teacher not found."}, status=status.HTTP_404_NOT_FOUND)

        start_time = request.data.get("start_time")
        end_time = request.data.get("end_time")
        day_of_week = request.data.get("day_of_week")

        if not all([start_time, end_time, day_of_week]):
            return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

        created_slots = []
        for week_number in range(1, 5):  
            exists = Availability.objects.filter(
                teacher=teacher,
                week_number=week_number,
                day_of_week=day_of_week,
                start_time=start_time,
                end_time=end_time
            ).exists()

            if not exists:
                slot = Availability.objects.create(
                    teacher=teacher,
                    week_number=week_number,
                    day_of_week=day_of_week,
                    start_time=start_time,
                    end_time=end_time
                )
                created_slots.append({
                    "week_number": week_number,
                    "day_of_week": day_of_week,
                    "start_time": start_time,
                    "end_time": end_time
                })

        return Response({
            "created_slots": created_slots,
            "message": f"{len(created_slots)} availability slots created for 4 weeks."
        }, status=status.HTTP_201_CREATED)