<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'profile_picture' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'team' => 'nullable|max:55',
            'name' => 'nullable|max:55',
            'email' => 'nullable|email|max:255',
            'bio' => 'nullable|max:500',
            'birthday' => 'nullable|date',
            'city' => 'nullable|max:255',
            'main_role' => 'nullable|max:255',
            'secondary_role' => 'nullable|max:255',
            'preferred_foot' => 'nullable|max:255',
            'height' => 'nullable|integer',
        ];
    }
}
