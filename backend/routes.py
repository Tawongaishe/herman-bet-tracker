from flask import Blueprint, request, jsonify
from models import db, Bet
from datetime import datetime

# Create a Blueprint for the API routes
api = Blueprint('api', __name__, url_prefix='/api')

#hello world 
@api.route('/', methods=['GET'])
def index():
    """Return a simple welcome message."""
    return {'message': 'Welcome to the Herman & You Betting Tracker API'}

@api.route('/bets', methods=['GET'])
def get_bets():
    """Get all bets."""
    bets = Bet.query.order_by(Bet.date.desc()).all()
    return jsonify([bet.to_dict() for bet in bets])

@api.route('/bets', methods=['POST'])
def add_bet():
    """Add a new bet."""
    data = request.json
    
    # Validate required fields
    required_fields = ['description', 'amount', 'person']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Parse the date if provided
    date = None
    if 'date' in data and data['date']:
        try:
            date = datetime.fromisoformat(data['date'])
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use ISO format.'}), 400
    
    # Create and save the bet
    bet = Bet(
        description=data['description'],
        amount=float(data['amount']),
        person=data['person'],
        date=date
    )
    
    db.session.add(bet)
    db.session.commit()
    
    return jsonify(bet.to_dict()), 201

@api.route('/summary', methods=['GET'])
def get_summary():
    """Get a summary of what each person owes."""
    summary = Bet.get_summary()
    return jsonify(summary)

@api.route('/bets/<int:bet_id>', methods=['DELETE'])
def delete_bet(bet_id):
    """Delete a bet by its ID."""
    bet = Bet.query.get_or_404(bet_id)
    db.session.delete(bet)
    db.session.commit()
    return jsonify({'message': f'Bet {bet_id} deleted successfully'}), 200

@api.route('/bets/<int:bet_id>', methods=['PUT'])
def update_bet(bet_id):
    """Update a bet by its ID."""
    bet = Bet.query.get_or_404(bet_id)
    data = request.json
    
    # Update fields if provided
    if 'description' in data:
        bet.description = data['description']
    if 'amount' in data:
        bet.amount = float(data['amount'])
    if 'person' in data:
        bet.person = data['person']
    if 'date' in data and data['date']:
        try:
            bet.date = datetime.fromisoformat(data['date'])
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use ISO format.'}), 400
    
    db.session.commit()
    return jsonify(bet.to_dict())