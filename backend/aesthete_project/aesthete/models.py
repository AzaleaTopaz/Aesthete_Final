from django.db import models

# Create your models here.

class User(models.Model):
    Name = models.CharField(max_length=200)
    Email = models.CharField(max_length=200)
    Phone = models.CharField(max_length=200)
    location = models.CharField(max_length=500)
    Image_url = models.URLField(max_length=700, null=True)
    Portfolio = models.FileField()

    class Meta: 
        db_table = 'users'

    def __str__(self):
        return self.Name
        
class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    Name = models.CharField(max_length=400, default='no name')
    Start_date = models.DateField(blank=True, null=True)
    End_Date = models.DateField(blank=True, null=True)
    Content = models.FileField(default = 'no content')
    Description = models.TextField(max_length=800, default='no description')

    class Meta: 
        db_table = 'projects'

    def __str__(self):
        return self.Name
