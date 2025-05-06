from rest_framework.serializers import ModelSerializer
from backpuntodj.models.user import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "roles"]