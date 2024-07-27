from rest_framework import serializers
from .models import User, Project, Review, MediaFile, Portfolio


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = '__all__'

        def to_representation(self, instance):
            representation = super().to_representation(instance)
        # Ensure user field can be null or handle accordingly
            if instance.user is None:
                representation['user'] = None
                return representation
            
class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = '__all__'