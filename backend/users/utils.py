from django.contrib.sites.models import Site
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail



def send_password_reset_otp_email(user, otp):
    message = Mail(
        from_email=settings.DEFAULT_FROM_EMAIL,
        to_emails=[user.email],
        subject='Password Reset OTP',
        html_content='Your OTP: %s' % otp)
    try:
        sg = SendGridAPIClient(settings.EMAIL_HOST_PASSWORD)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)


def send_user_credentials(user, password):
    current_site = Site.objects.get(id=settings.SITE_ID)
    subject = 'Account Credentials'
    to = user.email
    from_email = settings.DEFAULT_FROM_EMAIL
    text_content = ""
    data = {'user': user, 'site': current_site, 'password': password}
    html_content = render_to_string('users/emails/email_credentials.html', data)
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    return msg.send()
