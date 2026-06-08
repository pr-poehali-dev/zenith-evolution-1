import json
import os
import urllib.request
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает заявку на заказ сумки и отправляет уведомление в Telegram и на email."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": {"error": "Invalid JSON"}}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    description = body.get("description", "").strip()
    bag_type = body.get("bag_type", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": {"error": "Имя и телефон обязательны"},
        }

    message = (
        f"🛍 *Новая заявка на сумку — Dark Craft*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}\n"
        f"🎨 *Тип сумки:* {bag_type or 'не указан'}\n"
        f"📝 *Описание:* {description or 'не указано'}"
    )

    _send_telegram(message)
    _send_email(name, phone, bag_type, description)

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": {"success": True, "message": "Заявка принята!"},
    }


def _send_telegram(text: str):
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")
    if not token or not chat_id:
        return
    payload = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "Markdown"}).encode()
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    try:
        urllib.request.urlopen(req, timeout=10)
    except Exception:
        pass


def _send_email(name: str, phone: str, bag_type: str, description: str):
    to_email = os.environ.get("NOTIFY_EMAIL", "")
    if not to_email:
        return

    subject = f"Новая заявка Dark Craft от {name}"
    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #1a1a1a;">🛍 Новая заявка на авторскую сумку</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 480px;">
        <tr><td style="padding: 8px; font-weight: bold;">Имя</td><td style="padding: 8px;">{name}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding: 8px; font-weight: bold;">Телефон</td><td style="padding: 8px;">{phone}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Тип сумки</td><td style="padding: 8px;">{bag_type or "не указан"}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding: 8px; font-weight: bold;">Описание</td><td style="padding: 8px;">{description or "не указано"}</td></tr>
      </table>
      <p style="color: #888; font-size: 12px; margin-top: 24px;">Dark Craft — авторские сумки ручной работы</p>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = "noreply@poehali.dev"
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP("smtp.poehali.dev", 587, timeout=10) as server:
            server.sendmail("noreply@poehali.dev", to_email, msg.as_string())
    except Exception:
        pass