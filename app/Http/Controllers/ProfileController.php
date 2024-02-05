<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountDeleteRequest;
use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\ProfileShowRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show(ProfileShowRequest $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function update(ProfileUpdateRequest $request)
    {
        $user = Auth::user();

        $validatedData = $request->validated();

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('public/profile_pictures');
            $validatedData['profile_picture'] = str_replace('public/', 'storage/', $path);
        }

        $user->update($validatedData);

        $user->refresh();

        return response()->json($user);
    }
    
    public function checkPassword(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);
    
        $currentPassword = $request->input('password');
        $user = Auth::user();
    
        if (Hash::check($currentPassword, $user->password)) {
            return response(['message' => 'Current password is correct']);
        } else {
            return response(['error' => 'Current password is incorrect'], 422);
        }
    }
    public function updatePassword(PasswordUpdateRequest $request)
    {
        // Validate the request
        $validatedData = $request->validated();

        // Check if the user is authenticated
        if (Auth::check()) {
            // If authenticated, update the password for the authenticated user
            $user = Auth::user();
            $user->password = bcrypt($validatedData['password']);
            $user->save();

            return response()->json(['message' => 'Password updated successfully']);
        } else {
            // If not authenticated, handle the password reset logic for the user with token, email, etc.
            $email = $validatedData['email']; // You may need to adjust this based on your actual request structure

            // Retrieve the user by email (you may need to adjust this based on your user model)
            $user = User::where('email', $email)->first();

            if ($user) {
                // Update the password for the user
                $user->password = bcrypt($validatedData['password']);
                $user->save();

                return response()->json(['message' => 'Password updated successfully']);
            } else {
                return response()->json(['error' => 'User not found'], 404);
            }
        }
    }


       public function delete(AccountDeleteRequest $request)
   {
       $user = Auth::user();

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
   }

}