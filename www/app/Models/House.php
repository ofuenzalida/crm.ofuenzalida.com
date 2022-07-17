<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class House
 * 
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $latitude
 * @property string $longitude
 * @property string|null $polygon
 * @property int $users_id
 * @property int $offices_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Office $office
 * @property User $user
 *
 * @package App\Models
 */
class House extends Model
{
	use SoftDeletes;
	protected $table = 'houses';

	protected $casts = [
		'users_id' => 'int',
		'offices_id' => 'int'
	];

	protected $fillable = [
		'name',
		'address',
		'latitude',
		'longitude',
		'polygon',
		'users_id',
		'offices_id'
	];

	public function office()
	{
		return $this->belongsTo(Office::class, 'offices_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'users_id');
	}
}
