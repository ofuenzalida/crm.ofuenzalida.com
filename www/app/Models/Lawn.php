<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Lawn
 * 
 * @property int $id
 * @property Carbon $date
 * @property string|null $description_work
 * @property string|null $description_tool
 * @property int $users_id
 * @property int $properties_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * 
 * @property Property $property
 * @property User $user
 *
 * @package App\Models
 */
class Lawn extends Model
{
	use SoftDeletes;
	protected $table = 'lawns';

	protected $casts = [
		'users_id' => 'int',
		'properties_id' => 'int'
	];

	protected $dates = [
		'date'
	];

	protected $fillable = [
		'date',
		'description_work',
		'description_tool',
		'users_id',
		'properties_id'
	];

	public function property()
	{
		return $this->belongsTo(Property::class, 'properties_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'users_id');
	}
}
