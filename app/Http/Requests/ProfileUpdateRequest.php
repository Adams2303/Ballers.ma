<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
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
            'profile_picture' => ['sometimes','image','mimes:jpeg,png,jpg,gif,svg','max:2048'],
            'team' => 'nullable|max:55',
            'name' => ['nullable','string','max:55'],
            'username' => ['nullable','max:55','string', 'regex:/^[\w\-\.]+$/i'],
            'email' => ['required','string','lowercase','email','max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'bio' => 'nullable|max:500',
            'birthday' => 'nullable|date',
            'city' => 'nullable|max:255',
            'main_role' => 'nullable|max:255',
            'secondary_role' => 'nullable|max:255',
            'preferred_foot' => 'nullable|max:255',
            'height' => 'nullable|integer',
        ];
    }

    public function messages(){

        return [
            'username.regex' => 'The username may only contain alphanumeric characters, dashes (-), and dots (.)',
            'profile_picture.required' => 'The profile picture is required.',
            'profile_picture.image' => 'The profile picture must be an image.',
            'profile_picture.mimes' => 'The profile picture must be a file of type: jpeg, png, jpg, gif, svg.',
            'profile_picture.max' => 'The profile picture may not be greater than 2 MB.',
        ];
    }
}
