from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=60, unique=True)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=128)
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    location = models.CharField(max_length=500)
    image_url = models.URLField(max_length=700, null=True)
    portfolio = models.URLField(max_length=700, null=True)


    class Meta: 
        db_table = 'users'

    def __str__(self):
        return self.name
        
class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=400, default='no name')
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    inspiration = models.URLField(max_length=700, null=True)
    description = models.TextField(max_length=800, default='no description')

    class Meta: 
        db_table = 'projects'

    def __str__(self):
        return self.name

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=400)
    review_text = models.TextField(max_length=900)
    recommend = models.BooleanField(default=False)
    date = models.DateField(blank=True)

    class Meta: 
        db_table = 'reviews'

    def __str__(self):
        return self.name
    

class MediaFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='media_files', null=True, blank=True)
    file = models.FileField(upload_to='media/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'media_files'

    def __str__(self):
        return f'{self.file.name} uploaded at {self.uploaded_at}'
    
class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='portfolios')
    title = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField(max_length=600)
    photo = models.URLField(max_length=600)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'portfolios'

    def __str__(self):
        return self.title
