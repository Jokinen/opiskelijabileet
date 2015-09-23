### This repository is private and should not be accessed without explicit permission

# Opiskelijabileet fi

This repository consists of two application infrastructures, which have been glued together  

 - Django
 - Angular

The process for setting them up is separate. Starting a Django application is not as straight forward as with many other frameworks.

## Installation
(these instructions are for OS X where Windows isn't explicitly specified)

**Requirements**  
You should make sure that your development environment has the following tools. Please search for the installation instructions from Google if some or all are missing.

 - python (2.7)
 - pip
 - virtualenv
 - nodejs
 - npm

**(1) Clone this repository**  
Clone this repository to a location on your machine of your own choosing
```bash
git clone *repo url*
``

**(2) Set up virtualenv and activate it**  
A virtual environment will hold all your development dependencies for Python code. By separating it this way, it's easier to manage projects with different dependencies.

The location for the virtual environment doesn't matter.

**Create env**  
```bash
virtualenv *env name*
```

**Activate it**  
```bash
source *path_to_env*/bin/activate
```  
Windows  
```
*path_to_env*/scripts/activate
```

**(3) Install Python dependencies**  
With your terminal, navigate into the opiskelijabileet/server directory and run

```bash
pip install -r requirements.txt
```

**(4) Initialize the database**  

```bash
python manage.py makemigrations
python manage.py migrate
```

Create admin user  
```bash
python manage.py createsuperuser
```

*Nice job, now we've set up Django. Next up; Angular*

**(1) Install Angular dependencies**  
Navigate to opiskelijabileet webapp with your terminal and run
```bash
npm install
```

To see it in action, navigate to opiskelijabileet/server and run
```bash
python manage.py runserver
```

The server will start and be accessible in the address 127.0.0.1:8000

If you navigate to 127.0.0.1:8000/admin you can login with the superuser credentials and create mock data.


