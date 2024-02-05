<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'profile_picture' => $this->profile_picture,
            'team' => $this->team,
            'bio' => $this->bio,
            'birthday' => $this->birthday,
            'city' => $this->city,
            'main_role' => $this->main_role,
            'secondary_role' => $this->secondary_role,
            'preferred_foot' => $this->preferred_foot,
            'height' => $this->height,
        ];
    }
}
