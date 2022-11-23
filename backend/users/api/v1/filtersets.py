from django_filters import rest_framework as filters

from users.models import User


class UserFilterSet(filters.FilterSet):
    date_joined_range = filters.DateFromToRangeFilter(field_name='date_joined')
    username = filters.CharFilter(field_name='username', lookup_expr='icontains', label='Username')
    first_name = filters.CharFilter(field_name='first_name', lookup_expr='icontains', label='First Name')
    last_name = filters.CharFilter(field_name='last_name', lookup_expr='icontains', label='Last Name')
    email = filters.CharFilter(field_name='email', lookup_expr='icontains', label='Email')
    location = filters.CharFilter(field_name='user_profile__location', lookup_expr='icontains', label='Location')
    mobile_number = filters.CharFilter(field_name='user_mobile_number__mobile_number', lookup_expr='icontains',
                                       label='Mobile Number')
    date_of_birth = filters.DateFilter(field_name='user_profile__date_of_birth', label='Date of Birth')

    date_of_birth_range = filters.DateFromToRangeFilter(field_name='user_profile__date_of_birth',
                                                        label='Date of Birth Range')

    class Meta:
        model = User
        # fields = '__all__'
        exclude = ['password', 'profile_picture', 'user_permissions', 'groups', 'is_staff', 'is_superuser']
