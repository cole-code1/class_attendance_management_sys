from flask import jsonify, request, Blueprint
from models import db, AttendanceReport


attendance_report_bp= Blueprint("attendance_report_bp", __name__)


@attendance_report_bp.route("/attendance_report", methods=["POST"])
def create_attendance_report():
    data = request.get_json()
    user = data['user']
    class_ref = data['class_ref']
    start_date = data['start_date']
    end_date = data['end_date']

    total_classes = AttendanceReport.query.filter(AttendanceReport.class_ref == class_ref, AttendanceReport.date.between(start_date, end_date)).count()
    total_attended = AttendanceReport.query.filter(AttendanceReport.class_ref == class_ref, AttendanceReport.date.between(start_date, end_date), AttendanceReport.status == 'present').count()
    attendance_percentage = (total_attended / total_classes) * 100
    new_attendance_report = AttendanceReport(user=user, class_ref=class_ref, start_date=start_date, end_date=end_date, total_classes=total_classes, total_attended=total_attended, attendance_percentage=attendance_percentage)
    db.session.add(new_attendance_report)
    db.session.commit()
    return jsonify({"msg":"AttendanceReport report created successfully!"}), 201

@attendance_report_bp.route("/attendance_report/<int:attendance_report_id>", methods=["GET"])
def get_attendance_report(attendance_report_id):
    attendance_report = AttendanceReport.query.get(attendance_report_id)
    if attendance_report:
        return jsonify({
            'id': attendance_report.id,
            'user': attendance_report.user,
            'class_ref': attendance_report.class_ref,
           'start_date': attendance_report.start_date,
            'end_date': attendance_report.end_date,
            'total_classes': attendance_report.total_classes,
            'total_attended': attendance_report.total_attended,
            'attendance_percentage': attendance_report.attendance_percentage
            }), 200
    else:
        return jsonify({"error":"AttendanceReport report not found"}), 404
    

@attendance_report_bp.route("/attendance_report/<int:attendance_report_id>", methods=["PUT"])
def update_attendance_report(attendance_report_id):
    attendance_report = AttendanceReport.query.get(attendance_report_id)
    if attendance_report:
        data = request.get_json()
        attendance_report.user = data.get('user', attendance_report.user)
        attendance_report.class_ref = data.get('class_ref', attendance_report.class_ref)
        attendance_report.start_date = data.get('start_date', attendance_report.start_date)
        attendance_report.end_date = data.get('end_date', attendance_report.end_date)
        db.session.commit()
        return jsonify({"success":"Updated successfully"}), 201
    else:
        return jsonify({"error":"AttendanceReport report not found"}), 404
    

@attendance_report_bp.route("/attendance_report/<int:attendance_report_id>", methods=["DELETE"])
def delete_attendance_report(attendance_report_id):
    attendance_report = AttendanceReport.query.get(attendance_report_id)
    if attendance_report:
        db.session.delete(attendance_report)
        db.session.commit()
        return jsonify({"success":"Deleted successfully"}), 200
    else:
        return jsonify({"error":"AttendanceReport report not found"}), 404
