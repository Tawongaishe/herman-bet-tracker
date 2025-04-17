from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

class Bet(db.Model):
    """Model representing a bet in the system."""
    
    __tablename__ = 'bets'
    
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    person = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __init__(self, description, amount, person, date=None):
        self.description = description
        self.amount = amount
        self.person = person
        if date:
            self.date = date
    
    def to_dict(self):
        """Convert the Bet object to a dictionary."""
        return {
            'id': self.id,
            'description': self.description,
            'amount': self.amount,
            'person': self.person,
            'date': self.date.isoformat() if self.date else None
        }
    
    @classmethod
    def get_summary(cls):
        """Get a summary of what each person owes."""
        from sqlalchemy import func
        
        # Get sum for you
        you_total_query = db.session.query(func.sum(cls.amount)).filter(cls.person == 'you')
        you_total = you_total_query.scalar() or 0.0
        
        # Get sum for herman
        herman_total_query = db.session.query(func.sum(cls.amount)).filter(cls.person == 'herman')
        herman_total = herman_total_query.scalar() or 0.0
        
        # Calculate the difference (positive means herman owes you, negative means you owe herman)
        difference = herman_total - you_total
        
        return {
            "you": you_total,
            "herman": herman_total,
            "difference": difference
        }