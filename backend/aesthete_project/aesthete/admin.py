from django.contrib import admin
from .models import User, Project, Review, MediaFile, Portfolio
# Register your models here.
admin.site.register(User)
admin.site.register(Project)
admin.site.register(Review)
admin.site.register(MediaFile)
admin.site.register(Portfolio)