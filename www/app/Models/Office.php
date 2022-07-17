<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Office
 * 
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $latitude
 * @property string $longitude
 * @property string|null $polygon
 * @property int $users_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property User $user
 * @property Collection|House[] $houses
 * @property Collection|Property[] $properties
 *
 * @package App\Models
 */
class Office extends Model
{
	use SoftDeletes;
	protected $table = 'offices';

	protected $casts = [
		'users_id' => 'int'
	];

	protected $fillable = [
		'name',
		'address',
		'latitude',
		'longitude',
		'polygon',
		'users_id'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'users_id');
	}

	public function houses()
	{
		return $this->hasMany(House::class, 'offices_id');
	}

	public function properties()
	{
		return $this->hasMany(Property::class, 'offices_id');
	}
}
