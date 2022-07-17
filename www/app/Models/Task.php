<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Task
 * 
 * @property int $id
 * @property int $hours
 * @property int $usd
 * @property string|null $description
 * @property string|null $tools
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
class Task extends Model
{
	use SoftDeletes;
	protected $table = 'task';

	protected $casts = [
		'hours' => 'int',
		'usd' => 'int',
		'users_id' => 'int',
		'properties_id' => 'int'
	];

	protected $fillable = [
		'hours',
		'usd',
		'description',
		'tools',
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
