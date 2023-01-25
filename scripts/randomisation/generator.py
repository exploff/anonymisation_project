from faker import Faker
import random

def get_fake_name(number):
    fake = Faker('en_US')
    name = list(fake.unique.last_name() for i in range(number))
    fake.unique.clear()
    return name

def get_fake_fullname(number):
    fake = Faker('en_US')
    firstname = list(fake.unique.first_name() for i in range(number))
    lastname = list(fake.unique.last_name() for i in range(number))
    name = []
    for i in range(number):
        name.append(firstname[i] + " " + lastname[i])
    fake.unique.clear()
    return name

def get_fake_email(number):
    fake = Faker('en_US')
    email = list(fake.unique.ascii_company_email() for i in range(number))
    fake.unique.clear()
    return email

def get_fake_address(number):
    fake = Faker('en_US')
    address = list(fake.address() for i in range(number))
    fake.unique.clear()
    return address

def get_fake_city(number):
    fake = Faker('en_US')
    city = list(fake.city() for i in range(number))
    fake.unique.clear()
    return city

def get_fake_zip(number):
    fake = Faker('en_US')
    postcode = list(fake.postcode() for i in range(number))
    fake.unique.clear()
    return postcode

def get_fake_country(number):
    fake = Faker('en_US')
    country = list(fake.country() for i in range(number))
    fake.unique.clear()
    return country

def get_fake_number(number):
    number = list(random.randint(0,10000) for i in range(number))
    return number

def get_fake_text(number):
    fake = Faker('en_US')
    text = list(fake.text(50) for i in range(number))
    fake.unique.clear()
    return text