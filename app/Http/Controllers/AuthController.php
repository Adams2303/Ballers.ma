<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request; 
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Str;


class AuthController extends Controller{
public function signup(SignupRequest $request) {

  $data = $request->validated();

  $user = User::create([
    'name' => $data['name'],
    'email' => $data['email'],
    'password' => bcrypt($data['password']),
  ]);
  $token = $user->createToken('main')->plainTextToken;
  event(new Registered($user));
  // $user->sendEmailVerificationNotification();

  return response([
    'user' => $user,
    'token' => $token
    ]);
}

function login(LoginRequest $request) {
    $credentials = $request->validated();
    $remember = $credentials['remember'] ?? false;
    unset($credentials['remember']);

    if (!Auth::attempt($credentials, $remember)) {
        return response([
            'error' => 'The Provided credentials are not correct'
        ], 422);
    }
    
    // $user = Auth::user();
    // $token = $user->createToken('main')->plainTextToken;

    return response([
        'user' => Auth::user(),
        'token' => Auth::user()->createToken('main')->plainTextToken
    ]);
}

public function logout(Request $request){
   
    $user = Auth::user();
    $user->currentAccessToken()->delete();

  return response([
      'success' => true
  ]); 
}
}