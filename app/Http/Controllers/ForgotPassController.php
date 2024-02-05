<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ForgotPassController extends Controller
{
    public function forgotPassword(Request $request)
    {
        // Validate the request data
        $request->validate(['email' => 'required|email']);

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'We can\'t find a user with that email address.'], 404);
        }

        // Create a password reset token
        $token = Str::random(60);
        $hashedToken = Hash::make($token);

        DB::table('password_resets')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $hashedToken, 'created_at' => Carbon::now()]
        );

        // Send the email
        Mail::send('emails.reset', ['token' => $token, 'email' => $request->email], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject("Reset Password");
        });

        // Output plain and hashed tokens for debugging
        dump("Plain Token: $token", "Hashed Token: $hashedToken");

        return response()->json(['message' => 'We have emailed your password reset link!'], 200);
    }

    // public function resetPassword(Request $request)
    // {
    //     // Validate the request data
    //     $request->validate([
    //         'email' => 'required|email',
    //         'token' => 'required',
    //         'password' => 'required|confirmed',
    //     ]);

    //     // Find the user by email
    //     $user = User::where('email', $request->email)->first();

    //     // Check if the user exists
    //     if (!$user) {
    //         return response()->json(['error' => 'User not found'], 404);
    //     }

    //     // Check if the provided token matches the stored token
    //     $passwordReset = DB::table('password_resets')
    //         ->where('email', $request->email)
    //         ->first();

    //     // Output plain and hashed tokens for debugging
    //     dump("Request Token: {$request->token}", "Hashed Token (DB): {$passwordReset->token}");

    //     if (!$passwordReset || !Hash::check($request->token, $passwordReset->token)) {
    //         return response()->json(['error' => 'Invalid token'], 400);
    //     }

    //     // Use Password facade to reset the password
    //     $response = Password::reset(
    //         $request->only('email', 'password', 'password_confirmation', 'token'),
    //         function ($user, $password) {
    //             // Reset the user's password
    //             $user->password = Hash::make($password);
    //             $user->save();
    //         }
    //     );

    //     // Check the response from the Password facade
    //     if ($response != Password::PASSWORD_RESET) {
    //         return response()->json(['error' => trans($response)], 400);
    //     }

    //     // Remove the used password reset record
    //     DB::table('password_resets')->where('email', $request->email)->delete();

    //     return response()->json(['message' => 'Your password has been reset successfully!'], 200);
    // }
}
