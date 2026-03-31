# 🧩 Django Simple Form App (POST & GET)

This is a basic Django project demonstrating:

- ✅ **POST (Create Data)** – Submit form and save to database
- ✅ **GET (Fetch Data)** – Retrieve and display stored data

---

# 🚀 Project Setup

```bash
django-admin startproject myproject
cd myproject
python manage.py startapp myapp
```

Add app in `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'myapp',
]
```

---

# 🧱 Model

```python
# myapp/models.py

from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()

    def __str__(self):
        return self.name
```

Run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

# 🟩 POST (Create / Insert Data)

## 🔹 Form

```python
# myapp/forms.py

from django import forms
from .models import Student

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['name', 'email', 'age']
```

---

## 🔹 View (POST)

```python
# myapp/views.py

from django.shortcuts import render, redirect
from .forms import StudentForm

def add_student(request):
    if request.method == "POST":
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()   # ✅ saves data to DB
            return redirect('success')
    else:
        form = StudentForm()

    return render(request, 'form.html', {'form': form})
```

---

## 🔹 Template (POST)

```html
<!-- templates/form.html -->

<h2>Add Student</h2>

<form method="POST">
  {% csrf_token %} {{ form.as_p }}
  <button type="submit">Submit</button>
</form>
```

---

## 🔹 Flow (POST)

```
User → HTML Form → POST Request → View → Form Validation → save() → Database
```

---

# 🟦 GET (Fetch / Read Data)

## 🔹 View (GET)

```python
# myapp/views.py

from .models import Student

def student_list(request):
    students = Student.objects.all()   # ✅ fetch data
    return render(request, 'list.html', {'students': students})
```

---

## 🔹 Template (GET)

```html
<!-- templates/list.html -->

<h2>Student List</h2>

<table border="1">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Age</th>
  </tr>

  {% for student in students %}
  <tr>
    <td>{{ student.name }}</td>
    <td>{{ student.email }}</td>
    <td>{{ student.age }}</td>
  </tr>
  {% endfor %}
</table>
```

---

## 🔹 Flow (GET)

```
User → URL → View → ORM Query → Data → Template → Display
```

---

# 🌐 URLs

```python
# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.add_student, name='add_student'),
    path('students/', views.student_list, name='student_list'),
]
```

```python
# myproject/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),
]
```

---

# ▶️ Run Project

```bash
python manage.py runserver
```

- Form (POST): http://127.0.0.1:8000/
- Data List (GET): http://127.0.0.1:8000/students/

---

# 🧠 Key Difference

| Operation | Code                                               |
| --------- | -------------------------------------------------- |
| POST      | `form = StudentForm(request.POST)` → `form.save()` |
| GET       | `Student.objects.all()`                            |

---

# ✅ Summary

- **POST** → creates new data
- **GET** → reads existing data
- Django ORM handles DB operations cleanly

---

# 🚀 Next Steps

- Update (PUT)
- Delete (DELETE)
- Convert to API (Django REST Framework)

---
