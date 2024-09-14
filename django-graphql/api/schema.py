import graphene
from graphene_django.types import DjangoObjectType
from .models import Employee, Department
from graphene_django.filter import DjangoFilterConnectionField
from graphene import relay
from graphql_relay import from_global_id
from graphql_jwt.decorators import login_required

class EmployeesNode(DjangoObjectType):
    class Meta:
        model = Employee
        filter_fields = {
            "name": ["exact", "icontains"],
            "join_year": ["exact", "icontains"],
            "department": ["icontains"],
        }
        interfaces = (relay.Node,)

class DepartmentNode(DjangoObjectType):
    class Meta:
        model = Department
        filter_fields = {
            "employees": ["exact"],
            "dept_name": ["exact"]
        }
        interfaces = (relay.Node,)

class Query(graphene.ObjectType):
    employees = graphene.Field(EmployeesNode, id=graphene.NonNull(graphene.ID))
    all_employees = DjangoFilterConnectionField(EmployeesNode)
    all_departments = DjangoFilterConnectionField(DepartmentNode)

    @login_required# jwt認証を行う
    def resolve_employee(self, info, **kwargs):
        id = kwargs.get("id")
        if id is not None:
            # idは文字列なので、from_global_idでintegerに変換
            return Employee.objects.get(id=from_global_id(id)[1])

    @login_required
    def resolve_all_employees(self, info, **kwargs):
        return Employee.objects.all()

    @login_required
    def resolve_all_departments(self, info, **kwargs):
        return Department.objects.all()
