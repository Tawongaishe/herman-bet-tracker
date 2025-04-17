import os

class Config:
    # Base directory of the application
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    
    # SQLAlchemy settings
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(BASE_DIR, "instance", "database.db")}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Flask settings
    DEBUG = True
    SECRET_KEY = 'your-secret-key-here'  # Change this in production!
    
    # Ensure the instance folder exists
    @classmethod
    def init_app(cls, app):
        os.makedirs(os.path.join(app.root_path, 'instance'), exist_ok=True)