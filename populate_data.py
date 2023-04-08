import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoProject.settings')

django.setup()

from Fruit.models import Fruit

if __name__ == "__main__":
    from faker import Faker
    from faker_food import FoodProvider
    import random

    fake = Faker()
    fake.add_provider(FoodProvider)

    fruit_name = fake.fruit()

    print(fruit_name)
    n = 100
    for _ in range(n):
        print(fake.fruit())
        print(round(random.uniform(0, 100), 2))
        Fruit.objects.create(name=fake.fruit(),price=round(random.uniform(0, 100), 2))