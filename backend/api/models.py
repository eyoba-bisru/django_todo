from django.db import models


class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

# Todo Model
class Todo(TimeStampModel):
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title
