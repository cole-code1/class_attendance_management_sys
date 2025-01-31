from flask import jsonify, request, Blueprint
from models import db, Notification
from datetime import datetime


notification_bp= Blueprint("notification_bp", __name__)


# fetch notifications
@notification_bp.route("/notification", methods=["GET"])
def get_notifications():
    user_email = request.args.get('user_email')
    notifications = Notification.query.filter_by(user=user_email, status='unread').all()
    return jsonify([{'id': notification.id, 'message': notification.message, 'notification_date': notification.notification_date} for notification in notifications])

# update notification
@notification_bp.route("/notification/<int:notification_id>", methods=["PUT"])
def mark_notification_as_read(notification_id):
    notification = Notification.query.get(notification_id)
    if notification:
        notification.status = 'read'
        db.session.commit()
        return jsonify({"msg":"Notification marked as read successfully"}), 200
    else:
        return jsonify({"error":"Notification not found"}), 404
    
# post a notification
@notification_bp.route("/notification", methods=["POST"])
def create_notification():
    data = request.get_json()
    user_email = data.get('user_email')
    message = data.get('message')

    notification = Notification(user=user_email, message=message, notification_date=datetime.now(), status='unread')
    db.session.add(notification)
    db.session.commit()
    return jsonify({"msg":"Notification created successfully!"}), 201

# Delete
@notification_bp.route("/notification/<int:notification_id>", methods=["DELETE"])
def delete_notification(notification_id):
    notification = Notification.query.get(notification_id)
    if notification:
        db.session.delete(notification)
        db.session.commit()
        return jsonify({"msg":"Notification deleted successfully"}), 200
    else:
        return jsonify({"error":"Notification not found"}), 404