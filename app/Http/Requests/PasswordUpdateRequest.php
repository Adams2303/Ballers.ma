<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'password' => ['required','confirmed'],
            'email' => ['sometimes','email'],
            'token' => ['sometimes'],
        ];
    }
}