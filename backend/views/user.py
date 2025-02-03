from flask import jsonify, request, Blueprint
from models import db, User
from werkzeug.security import generate_password_hash


user_bp= Blueprint("user_bp", __name__)


# Fetch all users
@user_bp.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'email': user.email, 'full_name': user.full_name, 'role': user.role, 'class_id': user.class_id} for user in users])

# Fetch user by email
@user_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user = User.query.filter_by(user_id=user_id).first()
    if user:
        return jsonify({'id': user.id, 'email': user.email, 'full_name': user.full_name, 'role': user.role, 'class_id': user.class_id})
    else:
        return jsonify({"error":"User not found"}), 404


@user_bp.route('/users', methods=['POST'])
def add_users():
    data = request.get_json()

    # Check for required fields - provide defaults or handle missing data
    full_name = data.get('full_name')
    email = data.get('email')
    password = generate_password_hash(data.get('password'))
    role = data.get('role', 'user')  # Default role to 'user'
    class_id = data.get('class_id')  # Assuming this field should be handled

    if not full_name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400
    
    # Check if class_id is required in your application logic
    if class_id is None:
        return jsonify({"error": "class_id is required"}), 400
    
    
    user = User(email=email, password=password, full_name=full_name, role=role, class_id=class_id)
    db.session.add(user)
    db.session.commit()
    return jsonify({"success":"User created successfully!"}), 201

# Update
@user_bp.route("/users/<int:user_id>", methods=["PATCH"])
def update_users(user_id):
    user = User.query.get(user_id)

    if user:
        data = request.get_json()
        email = data.get('email', user.email)
        password = data.get('password', user.password)
        full_name = data.get('full_name',user.full_name)
        role = data.get('role',user.role)
        class_id = data.get('class_id',user.class_id)

        check_full_name = User.query.filter_by(full_name=full_name and id!=user.id).first()
        check_email = User.query.filter_by(email=email and id!=user.id).first()

    
        if check_full_name or check_email:
            return jsonify({"error":"name/email exists"}),406

        else:
            user.email=email
            user.password=password
            user.full_name=full_name  # Update full_name only if provided in the request.get_json()
            user.role=role
            user.class_id=class_id
          
            db.session.commit()
            return jsonify({"success":"Updated successfully"}), 201

    else:
        return jsonify({"error":"User doesn't exist!"}),406

# Delete
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_users(user_id):
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success":"Deleted successfully"}), 200

    else:
        return jsonify({"error":"User your are trying to delete doesn't exist!"}),406
