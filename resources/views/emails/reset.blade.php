<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

</head>

<main>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh; background-color: #00060d;">
        <form class="rounded shadow-lg text-white" style="width: 600px; background-color: #343a40;">
            <div class="loginTitle"
                style="display: flex; align-items: center; background-color: rgb(34,34,34); font-weight: 700; font-size: 16px; padding: 15px 16px;">
                <i class="fas fa-shield-alt" style="color: #0e9648; padding-right: 15px;"></i>
                <h5 style="margin: 0; color: white;">Ballers.gg Support</h5>
            </div>
            <div class="px-5 py-5">
                <h3 class="text-left text-white bolder w-90 mb-4"><strong>Hello there!</strong></h3>
                <p class="text-left text-light w-90 mb-4">We have received your password reset request. Click the
                    button below to reset your password.</p>
                <div class="d-flex justify-content-center" style="border: 1px solid #e9ecf; padding: 10px;">
                    <a href="{{ config('app.frontend_url') }}/reset-password/{{ $token }}?email={{ $email }}"
                        class="btn text-light border-0" style="background-color: rgb(14, 150, 72); width: 50%;">Reset
                        Password</a>
                </div>
                <p class="text-left text-light w-90 mt-4">If you did not request a password reset, please ignore this
                    email. </p>
                <p class="text-left text-light w-90 mt-4">Regards, <br> Your Ballers.gg Support Team</p>
                <hr color="white">
                <p>
                    <small class="text-left text-light w-90">
                        If you are having trouble clicking the "Reset Password" button, click or copy
                        paste the following URL into your web browser:
                        <a style="text-decoration: underline"
                            href="{{ config('app.frontend_url') }}/reset-password/{{ $token }}?email={{ $email }}">
                            {{ config('app.frontend_url') }}/reset-password/{{ $token }}?email={{ $email }}
                        </a>
                        <small />
                </p>
            </div>
        </form>
    </div>
</main>

</html>
