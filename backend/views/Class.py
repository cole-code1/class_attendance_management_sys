
from flask import jsonify, request, Blueprint
from models import db, Class


class_bp= Blueprint("class_bp", __name__)


# add
@class_bp.route("/class", methods=["POST"])
def create_class():
    data = request.get_json()
    name = data['name']
    subject = data['subject']
    teacher = data['teacher']
    class_time = data['class_time']
    total_sessions = data['total_sessions']
    new_class = Class(name=name, subject=subject, teacher=teacher, class_time=class_time, total_sessions=total_sessions)
    db.session.add(new_class)
    db.session.commit()
    return jsonify({"msg":"Class created successfully!"}), 201

# Update
@class_bp.route("/class/<int:class_id>", methods=["PUT"])
def update_class(class_id):
    class_ = Class.query.get(class_id)
    if class_:
        data = request.get_json()
        class_.name = data.get('name', class_.name)
        class_.subject = data.get('subject', class_.subject)
        class_.teacher = data.get('teacher', class_.teacher)

        db.session.commit()
        return jsonify({"success":"Updated successfully"}), 201
    else:
        return jsonify({"error":"Class not found"}), 404
    
# delete
@class_bp.route("/class/<int:class_id>", methods=["DELETE"])
def delete_class(class_id):
    class_ = Class.query.get(class_id)
    if class_:
        db.session.delete(class_)
        db.session.commit()
        return jsonify({"success":"Deleted successfully"}), 200
    else:
        return jsonify({"error":"Class not found"}), 404
    
# fetch all
@class_bp.route("/class", methods=["GET"])
def get_classes():
    classes = Class.query.all()
    return jsonify([{'id': class_.id, 'name': class_.name,'subject': class_.subject, 'teacher': class_.teacher, 'class_time': class_.class_time, 'total_sessions': class_.total_sessions} for class_ in classes])
# fetch
@class_bp.route("/class/<int:class_id>", methods=["GET"])
def get_class(class_id):
    class_ = Class.query.get(class_id)
    if class_:
        return jsonify({'id': class_.id, 'name': class_.name,'subject': class_.subject, 'teacher': class_.teacher, 'class_time': class_.class_time, 'total_sessions': class_.total_sessions})
    else:
        return jsonify({"error":"Class not found"}), 404
