from django.urls import path
from .views import ListUsers, UserDetail, ListProjects, ProjectDetail, ListReviews, ReviewDetail

urlpatterns = [
    path('users/', ListUsers.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('projects/', ListProjects.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetail.as_view(), name='project-detail'),
    path('reviews/', ListReviews.as_view(), name='review-list'),
    path('reviews/<int:pk>/', ReviewDetail.as_view(), name='review-detail')
]
