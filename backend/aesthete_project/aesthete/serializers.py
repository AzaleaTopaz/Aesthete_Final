from rest_framework import serializers
from .models import User, Project, Review, MediaFile, Portfolio


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Project
        fields = ['username', 'name', 'start_date', 'end_date', 'inspiration', 'description']
        extra_kwargs = {
            'user': {'required': False}
        }

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
        if instance.user is None:
            representation['user'] = None
        return representation
            
class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = '__all__'