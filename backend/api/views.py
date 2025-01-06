from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer

# Get all todos
@api_view(['GET'])
def get_all_todos(request):
    todos = Todo.objects.all()
    todos = TodoSerializer(todos, many=True)
    return Response(todos.data)


# Create a new todo
@api_view(['POST'])
def create_todo(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors.get_json())

# Update a todo
@api_view(['PUT'])
def update_todo(request, id):
    todo = Todo.objects.get(id=id)
    if not todo:
        return Response("Todo not found")
    
    serializer = TodoSerializer(instance=todo, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors.get_json())

# Delete a todo
@api_view(['DELETE'])
def delete_todo(request, id):
    todo = Todo.objects.get(id=id)
    if not todo:
        return Response("Todo not found")
    
    todo.delete()
    return Response("Todo deleted")