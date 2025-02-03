from flask import jsonify, request, Blueprint
from models import db, Attendance
from datetime import datetime

attendance_bp= Blueprint("attendance_bp", __name__)

@attendance_bp.route("/attendance", methods=["POST"])
def add_attendance():
    data = request.get_json()
    student = data['student']
    class_ref = data['class_ref']
    date = data['date']
    date_obj = datetime.strptime(date, '%Y-%m-%d').strftime('%d/%m/%Y')
    status = data['status']
    remarks = data.get('remarks', None)

    new_attendance = Attendance(student=student, class_ref=class_ref, date=date_obj, status=status, remarks=remarks)
    db.session.add(new_attendance)
    db.session.commit()
    return jsonify({"msg":"Attendance added successfully!"}), 201

# other routes...


@attendance_bp.route("/attendance/<int:attendance_id>", methods=["GET"])
def get_attendance(attendance_id):
    attendance = Attendance.query.get(attendance_id)
    if attendance:
        return jsonify({
            'id': attendance.id,
           'student': attendance.student,
            'class_ref': attendance.class_ref,
            'date': attendance.date,
            'status': attendance.status,
            'remarks': attendance.remarks
            }), 200
    else:
        return jsonify({"error":"Attendance not found"}), 404

@attendance_bp.route("/attendance/<int:attendance_id>", methods=["PUT"])
def update_attendance(attendance_id):
     
    data = request.get_json()

    date = data.get('date')
    date_obj = datetime.strptime(date,'%d/%m/%Y')
    attendance = Attendance.query.get(attendance_id)
    if attendance:
        data = request.get_json()
        attendance.student = data.get('student', attendance.student)
        attendance.class_ref = data.get('class_ref', attendance.class_ref)
        attendance.date = date_obj
        attendance.status = data.get('status', attendance.status)
        attendance.remarks = data.get('remarks', attendance.remarks)
        db.session.commit()
        return jsonify({"msg":"Attendance updated successfully!"}), 200
    else:
        return jsonify({"error":"Attendance not found"}), 404

@attendance_bp.route("/attendance/<int:attendance_id>", methods=["DELETE"])
def delete_attendance(attendance_id):
    attendance = Attendance.query.get(attendance_id)
    if attendance:
        db.session.delete(attendance)
        db.session.commit()
        return jsonify({"success":"Deleted successfully"}), 200
    else:
        return jsonify({"error":"Attendance not found"}), 404
    

