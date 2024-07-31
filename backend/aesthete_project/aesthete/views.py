from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import json
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.shortcuts import get_object_or_404
# from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from .models import User, Project, Review, MediaFile, Portfolio
from .serializers import UserSerializer, ProjectSerializer, ReviewSerializer, MediaFileSerializer, PortfolioSerializer
from rest_framework.permissions import AllowAny
# Create your views here.





#MediaFile Views
@method_decorator(ensure_csrf_cookie, name='dispatch')
class ListCreateMediaFiles(generics.ListCreateAPIView):
    queryset = MediaFile.objects.all()
    serializer_class = MediaFileSerializer
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['file']
        media_file = MediaFile(file=file)
        media_file.save()

        serializer = MediaFileSerializer(media_file)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

class MediaFileDetail(generics.RetrieveDestroyAPIView):
    queryset = MediaFile.objects.all()
    serializer_class = MediaFileSerializer
    # permission_classes = [IsAuthenticated]

#Portfolio Views
class PortfolioListCreate(generics.ListCreateAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    # permission_classes = [IsAuthenticated]

#User Views
class ListUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

class UserDetailByUsername(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        username = self.kwargs.get('username')
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound(detail="User not found.")
        
class GetUserIdByUsername(APIView):
    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
            return Response({'userId': user.id}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


#Project Views
class ListProjects(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.data.get('username') 
        serializer.save(user=user)


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    # permission_classes = [IsAuthenticated]
    
    

class CreateProjectView(generics.CreateAPIView):
    # serializer_class = ProjectSerializer
    # queryset = Project.objects.all()
    # permission_classes = [AllowAny]

    # def perform_create(self, serializer):
    #     user = self.kwargs['pk']
    #     user = get_object_or_404(User, user=user)
    #     serializer.save(user=user)

    # def get_serializer_context(self):
    #     context = super().get_serializer_context()
    #     context['user'] = self.kwargs['pk']
    #     return context 
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
# Review Views
class ListReviews(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    # permission_classes = [IsAuthenticated]

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    # permission_classes = [IsAuthenticated]
   


