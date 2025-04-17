from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import api

def create_app(config_class=Config):
    """
    Create and configure the Flask application.
    """
    # Create the Flask app
    app = Flask(__name__)
    app.config.from_object(config_class)
    config_class.init_app(app)
    
    # Initialize extensions
    db.init_app(app)
    
    # Configure CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(api)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Add a simple index route
    @app.route('/')
    def index():
        return {'message': 'Welcome to the Herman & You Betting Tracker API'}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=app.config['DEBUG'], port=5000)

