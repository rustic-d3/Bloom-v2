import datetime
from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView as SimpleJWTTokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import AvailabilitySerializer, ClassSessionSerializer, UserSerializer, NoteSerializer, ClassRoomSerializer, CustomTokenObtainPairSerializer, TeacherSerializer, ParentSerializer, ChildSerializer
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
        teacher = request.user.teacher

        data = request.data
        if not isinstance(data, list) or not data:
            return Response({"error": "Payload must be a non-empty list"}, status=status.HTTP_400_BAD_REQUEST)

        current_week_number = datetime.date.today().isocalendar()[1]  
        availabilities = []

        for slot in data:
            week_day = slot.get("week_day")
            start_time = slot.get("start_time")
            end_time = slot.get("end_time")

            if not week_day or not start_time or not end_time:
                return Response({"error": "Each slot must have week_day, start_time, end_time"},
                                status=status.HTTP_400_BAD_REQUEST)


            for i in range(4):
                week_number = (current_week_number + i - 1) % 53 + 1  
                availabilities.append(
                    Availability(
                        teacher=teacher,
                        week_number=week_number,
                        day_of_week=week_day,
                        start_time=start_time,
                        end_time=end_time
                    )
                )

        Availability.objects.bulk_create(availabilities, ignore_conflicts=True)

        return Response({"message": "Availabilities created for next 4 weeks"}, status=status.HTTP_201_CREATED)
      
      
class AvailabilityView(generics.ListAPIView):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer 
    permission_classes= [AllowAny] 

class AllTeachersView(generics.ListAPIView):
    serializer_class = TeacherSerializer
    permission_classes = [IsParentRole]
    
    def get_queryset(self):
        parent = self.request.user.parent
        return Teacher.objects.filter(
            classes__children__in=parent.children.all()
        ).distinct()
        
class AllChildClassroomView(generics.ListAPIView):
    serializer_class = ClassSessionSerializer
    permission_classes = [IsParentRole]

    def get_queryset(self):
        parent = self.request.user.parent  
        children = parent.children.all()   


        return ClassSession.objects.filter(
            classRoom__children__in=children
        ).order_by('date').distinct()
    
