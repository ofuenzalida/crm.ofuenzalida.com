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
 * @property int $hour
 * @property int $usd
 * @property bool $paid
 * @property Carbon $date
 * @property string|null $description_work
 * @property string|null $description_tool
 * @property int $users_id
 * @property int $properties_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property Carbon|null $paid_date
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
		'hour' => 'int',
		'usd' => 'int',
		'paid' => 'bool',
		'users_id' => 'int',
		'properties_id' => 'int'
	];

	protected $dates = [
		'date',
		'paid_date'
	];

	protected $fillable = [
		'hour',
		'usd',
		'paid',
		'date',
		'description_work',
		'description_tool',
		'users_id',
		'properties_id',
		'paid_date'
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
