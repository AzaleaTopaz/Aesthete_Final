from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import ListUsers, UserDetail, UserDetailByUsername, ListProjects, ProjectDetail, ListReviews, ReviewDetail, ListCreateMediaFiles, MediaFileDetail,PortfolioListCreate, PortfolioDetail

urlpatterns = [
    path('media/', ListCreateMediaFiles.as_view(), name='list_create_media_files'),
    path('media/upload/', ListCreateMediaFiles.as_view(), name='media-upload'),
    path('media/<int:pk>/', MediaFileDetail.as_view(), name='media_file_detail'),
    
    path('users/', ListUsers.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('users/username/<str:username>/', UserDetailByUsername.as_view(), name='user-detail-by-username'),
   
    path('projects/', ListProjects.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetail.as_view(), name='project-detail'),

    path('portfolios/', PortfolioListCreate.as_view(), name='portfolio-list-create'),
    path('portfolios/<int:pk>/', PortfolioDetail.as_view(), name='portfolio-detail'),

    
    path('reviews/', ListReviews.as_view(), name='review-list'),
    path('reviews/<int:pk>/', ReviewDetail.as_view(), name='review-detail'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)