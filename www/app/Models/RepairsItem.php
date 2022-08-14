<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class RepairsItem
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int $repairs_id
 * @property int $users_id
 * @property int $properties_id
 * @property int|null $priorities_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property int|null $quantity
 * @property int|null $users_id_responsible
 * 
 * @property Priority|null $priority
 * @property Property $property
 * @property Repair $repair
 * @property User|null $user
 *
 * @package App\Models
 */
class RepairsItem extends Model
{
	use SoftDeletes;
	protected $table = 'repairs_items';

	protected $casts = [
		'repairs_id' => 'int',
		'users_id' => 'int',
		'properties_id' => 'int',
		'priorities_id' => 'int',
		'quantity' => 'int',
		'users_id_responsible' => 'int'
	];

	protected $fillable = [
		'name',
		'description',
		'repairs_id',
		'users_id',
		'properties_id',
		'priorities_id',
		'quantity',
		'users_id_responsible'
	];

	public function priority()
	{
		return $this->belongsTo(Priority::class, 'priorities_id');
	}

	public function property()
	{
		return $this->belongsTo(Property::class, 'properties_id');
	}

	public function repair()
	{
		return $this->belongsTo(Repair::class, 'repairs_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'users_id_responsible');
	}
}
